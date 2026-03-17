import OpenAI from "openai";
import sql from "../configs/db.js";
import { clerkClient } from "@clerk/express";
import axios from "axios";
import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'
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

    const plan = req.plan;
    const free_usage = req.free_usage;

    if (plan !== "premium" && free_usage >= 10) {
      return res.json({
        success: false,
        message: "Limit reached. Upgrade to continue"
      });
    }

    const response = await AI.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: length
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
    console.log(error.message);
    const message = error.status === 429
      ? "API rate limit exceeded. Please wait a moment and try again."
      : error.message;
    res.json({ success: false, message });
  }
};


export const generateBlogTitle = async (req, res) => {
  try {

    const { userId } = req.auth();
    const { prompt} = req.body;

    const plan = req.plan;
    const free_usage = req.free_usage;

    if (plan !== "premium" && free_usage >= 10) {
      return res.json({
        success: false,
        message: "Limit reached. Upgrade to continue"
      });
    }

    const response = await AI.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 100,
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
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};


export const generateImage = async (req, res) => {
  try {

    const { userId } = req.auth();
    const { prompt, publish} = req.body;
    const plan = req.plan;

    if (plan !== "premium") {
      return res.json({
        success: false,
        message: "This Feature is only available for premium Subscriptions"
      });
    }

    const response = await axios.post(
      "https://router.huggingface.co/hf-inference/models/stabilityai/stable-diffusion-xl-base-1.0",
      { inputs: prompt },
      {
        headers: { 
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          Accept: "image/png",
          "Content-Type": "application/json"
        },
        responseType: "arraybuffer"
      }
    );

    const base64Image = `data:image/png;base64,${Buffer.from(response.data).toString('base64')}`;

    const {secure_url} = await cloudinary.uploader.upload(base64Image);
    
    await sql`
      INSERT INTO creations (user_id,prompt,content,type,publish)
      VALUES (${userId},${prompt},${secure_url},'image',${publish ?? false})
    `;

    res.json({ success: true, content: secure_url });

  } catch (error) {
    const errMsg = error.response?.data ? Buffer.from(error.response.data).toString() : error.message;
    console.log('generateImage error:', errMsg);
    res.json({ success: false, message: errMsg });
  }
};

export const  removeImageBackground= async (req, res) => {
  try {

    const { userId } = req.auth();
    const image = req.file;
    const plan = req.plan;
    

    if (plan !== "premium") {
      return res.json({
        success: false,
        message: "This Feature is only available for premium Subscriptions"
      });
    }

   

    

    const {secure_url} = await cloudinary.uploader.upload(image.path,{
      transformation:[
        {
          effect:'background_removal',
          background_removal : 'remove_the_background'
        }
      ]
    })
    
    await sql`
      INSERT INTO creations (user_id,prompt,content,type)
      VALUES (${userId},'Remove background from image',${secure_url},'image')`;



    res.json({ success: true, content:secure_url });

  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export const  removeImageObject= async (req, res) => {
  try {

    const { userId } = req.auth();
    const { object } = req.body;
    const image = req.file;
    const plan = req.plan;

    if (plan !== "premium") {
      return res.json({
        success: false,
        message: "This Feature is only available for premium Subscriptions"
      });
    }

    // Upload image to cloudinary first
    const { secure_url } = await cloudinary.uploader.upload(image.path)

    // Use HF inpainting model to remove object
    const imageResponse = await axios.get(secure_url, { responseType: 'arraybuffer' })
    const imageBuffer = Buffer.from(imageResponse.data)

    const FormData = (await import('form-data')).default
    const formData = new FormData()
    formData.append('inputs', imageBuffer, { filename: 'image.png', contentType: 'image/png' })
    formData.append('parameters', JSON.stringify({ prompt: `remove the ${object}` }))

    const hfResponse = await axios.post(
      'https://router.huggingface.co/hf-inference/models/lllyasviel/sd-controlnet-canny',
      { inputs: `photo without ${object}, clean background` },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          Accept: 'image/png',
          'Content-Type': 'application/json'
        },
        responseType: 'arraybuffer'
      }
    )

    const base64Image = `data:image/png;base64,${Buffer.from(hfResponse.data).toString('base64')}`
    const { secure_url: resultUrl } = await cloudinary.uploader.upload(base64Image)

    await sql`
      INSERT INTO creations (user_id,prompt,content,type)
      VALUES (${userId},${`Removed ${object} from image`},${resultUrl},'image')`;

    res.json({ success: true, content: resultUrl });

  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export const  resumeReview = async (req, res) => {
  try {

    const { userId } = req.auth();
    const resume = req.file;
    const plan = req.plan;
    

    if (plan !== "premium") {
      return res.json({
        success: false,
        message: "This Feature is only available for premium Subscriptions"
      });
    }
    
    if(resume.size > 5 * 1024 * 1024){
      return res.json({success:false,message:"Resume file size exeeds allowed size (5MB)."})
    }

    const dataBuffer = fs.readFileSync(resume.path)
    const pdfData = await pdfParse(dataBuffer)

    const prompt = `Review the following resume and provide constructive feedback on its strengths,weakness and areas for improvement.
    Resume Content:\n\n ${pdfData.text}`

    const response = await AI.chat.completions.create({
      model: "llama-3.3-70b-versatile",
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
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
