import OpenAI from "openai";
import sql from "../configs/db.js";
import { clerkClient } from "@clerk/express";
import axios from "axios";
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const { PDFParse } = require("pdf-parse");

const pdfParse = async (buffer) => {
  const parser = new PDFParse({ data: buffer });
  const result = await parser.getText();
  return result;
};

const AI = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1"
});

export const generateArticle = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt, length } = req.body;

    if (!prompt) {
      return res.json({ success: false, message: "Please provide a prompt" });
    }

    const plan = req.plan;
    const free_usage = req.free_usage || 0;

    if (plan !== "premium" && free_usage >= 10) {
      return res.json({
        success: false,
        message: "Limit reached. Upgrade to continue"
      });
    }

    const maxTokens = parseInt(length, 10) || 500;

    const response = await AI.chat.completions.create({
      model: "qwen/qwen3.8-27b",
      messages: [
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: maxTokens
    });

    const content = response.choices[0].message.content;

    await sql`
      INSERT INTO creations (user_id,prompt,content,type)
      VALUES (${userId},${prompt},${content},'article')
    `;

    if (plan !== "premium") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: free_usage + 1
        }
      });
    }

    res.json({ success: true, content });

  } catch (error) {
    console.error('generateArticle error:', error.message);
    const message = error.status === 429
      ? "API rate limit exceeded. Please wait a moment and try again."
      : error.message;
    res.json({ success: false, message });
  }
};

export const generateBlogTitle = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt } = req.body;

    if (!prompt) {
      return res.json({ success: false, message: "Please provide a prompt" });
    }

    const plan = req.plan;
    const free_usage = req.free_usage || 0;

    if (plan !== "premium" && free_usage >= 10) {
      return res.json({
        success: false,
        message: "Limit reached. Upgrade to continue"
      });
    }

    const response = await AI.chat.completions.create({
      model: "qwen/qwen3.8-27b",
      messages: [
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 150,
    });

    const content = response.choices[0].message.content;

    await sql`
      INSERT INTO creations (user_id,prompt,content,type)
      VALUES (${userId},${prompt},${content},'blog-title')
    `;

    if (plan !== "premium") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: free_usage + 1
        }
      });
    }

    res.json({ success: true, content });

  } catch (error) {
    console.error('generateBlogTitle error:', error.message);
    res.json({ success: false, message: error.message });
  }
};

export const generateImage = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt, publish } = req.body;
    const plan = req.plan;

    if (plan !== "premium") {
      return res.json({
        success: false,
        message: "This Feature is only available for premium Subscriptions"
      });
    }

    if (!prompt) {
      return res.json({ success: false, message: "Please provide a prompt" });
    }

    const response = await axios.post(
      "https://router.huggingface.co/hf-inference/models/stabilityai/stable-diffusion-3-medium-diffusers",
      { inputs: prompt },
      {
        headers: { 
          Authorization: `Bearer ${process.env.HF_API_KEY.trim()}`,
          Accept: "image/png",
          "Content-Type": "application/json"
        },
        responseType: "arraybuffer",
        timeout: 60000
      }
    );

    const base64Image = `data:image/png;base64,${Buffer.from(response.data).toString('base64')}`;

    const { secure_url } = await cloudinary.uploader.upload(base64Image);
    
    await sql`
      INSERT INTO creations (user_id,prompt,content,type,publish)
      VALUES (${userId},${prompt},${secure_url},'image',${publish ?? false})
    `;

    res.json({ success: true, content: secure_url });

  } catch (error) {
    const errMsg = error.response?.data ? Buffer.from(error.response.data).toString() : error.message;
    console.error('generateImage error:', errMsg);
    res.json({ success: false, message: errMsg });
  }
};

export const removeImageBackground = async (req, res) => {
  try {
    const { userId } = req.auth();
    const image = req.file;
    const plan = req.plan;

    if (plan !== "premium") {
      if (image?.path && fs.existsSync(image.path)) fs.unlinkSync(image.path);
      return res.json({
        success: false,
        message: "This Feature is only available for premium Subscriptions"
      });
    }

    if (!image) {
      return res.json({ success: false, message: "Please upload an image" });
    }

    const { secure_url } = await cloudinary.uploader.upload(image.path, {
      transformation: [
        {
          effect: 'background_removal',
          background_removal: 'remove_the_background'
        }
      ]
    });

    if (fs.existsSync(image.path)) {
      fs.unlinkSync(image.path);
    }
    
    await sql`
      INSERT INTO creations (user_id,prompt,content,type)
      VALUES (${userId},'Remove background from image',${secure_url},'image')`;

    res.json({ success: true, content: secure_url });

  } catch (error) {
    if (req.file?.path && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    console.error('removeImageBackground error:', error.message);
    res.json({ success: false, message: error.message });
  }
};

export const removeImageObject = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { object } = req.body;
    const image = req.file;
    const plan = req.plan;

    if (plan !== "premium") {
      if (image?.path && fs.existsSync(image.path)) fs.unlinkSync(image.path);
      return res.json({
        success: false,
        message: "This Feature is only available for premium Subscriptions"
      });
    }

    if (!image) {
      return res.json({ success: false, message: "Please upload an image" });
    }

    if (!object || !object.trim()) {
      if (fs.existsSync(image.path)) fs.unlinkSync(image.path);
      return res.json({ success: false, message: "Please specify an object to remove" });
    }

    const targetObject = object.trim().split(' ')[0];

    // Using Cloudinary AI Generative Remove directly
    const { secure_url: resultUrl } = await cloudinary.uploader.upload(image.path, {
      transformation: [
        {
          effect: `gen_remove:prompt_${targetObject}`
        }
      ]
    });

    if (fs.existsSync(image.path)) {
      fs.unlinkSync(image.path);
    }

    await sql`
      INSERT INTO creations (user_id,prompt,content,type)
      VALUES (${userId},${`Removed ${targetObject} from image`},${resultUrl},'image')`;

    res.json({ success: true, content: resultUrl });

  } catch (error) {
    if (req.file?.path && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    console.error('removeImageObject error:', error.message);
    res.json({ success: false, message: error.message });
  }
};

export const resumeReview = async (req, res) => {
  try {
    const { userId } = req.auth();
    const resume = req.file;
    const plan = req.plan;

    if (plan !== "premium") {
      if (resume?.path && fs.existsSync(resume.path)) fs.unlinkSync(resume.path);
      return res.json({
        success: false,
        message: "This Feature is only available for premium Subscriptions"
      });
    }

    if (!resume) {
      return res.json({ success: false, message: "Please upload a resume" });
    }
    
    if (resume.size > 5 * 1024 * 1024) {
      if (fs.existsSync(resume.path)) fs.unlinkSync(resume.path);
      return res.json({ success: false, message: "Resume file size exceeds allowed size (5MB)." });
    }

    const dataBuffer = fs.readFileSync(resume.path);
    if (fs.existsSync(resume.path)) {
      fs.unlinkSync(resume.path);
    }

    const pdfData = await pdfParse(dataBuffer);

    if (!pdfData || !pdfData.text || !pdfData.text.trim()) {
      return res.json({ success: false, message: "Could not extract text from the provided PDF." });
    }

    const prompt = `Review the following resume and provide constructive feedback on its strengths, weaknesses and areas for improvement.
Resume Content:\n\n ${pdfData.text.slice(0, 4000)}`;

    const response = await AI.chat.completions.create({
      model: "qwen/qwen3.8-27b",
      messages: [
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const content = response.choices[0].message.content;

    await sql`
      INSERT INTO creations (user_id,prompt,content,type)
      VALUES (${userId},'Review the Uploaded resume',${content},'resume-review')`;

    res.json({ success: true, content });

  } catch (error) {
    if (req.file?.path && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    console.error('resumeReview error:', error.message);
    res.json({ success: false, message: error.message });
  }
};
