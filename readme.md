

# ⚡ Toolzy AI

### All-in-One AI-Powered SaaS Platform

**Generate articles, create images, remove backgrounds, erase objects, review resumes — all powered by cutting-edge AI models.**


---

## 📖 What is Toolzy AI?

Toolzy AI is a full-stack SaaS application that brings together multiple AI capabilities under one roof. Users can sign up for free and immediately start generating content, or upgrade to a premium plan to unlock powerful image processing and resume review features.

The platform is built with a clean two-tier architecture — a **React + Vite** frontend and an **Express.js** backend — connected to a serverless **PostgreSQL** database on Neon, with **Cloudinary** handling all image storage and transformations.

---

## ✨ Features

### 🆓 Free Plan
| Feature | Description |
|---|---|
| ✍️ **Write Article** | Generate full-length articles in short, medium, or long format using LLaMA 3.3 70B via Groq. Choose your topic and length, get a well-structured article instantly. |
| 📝 **Blog Title Generator** | Stuck on a title? Enter your topic and get multiple catchy, SEO-friendly blog title suggestions. |
| 📊 **Dashboard** | View all your past creations in one place. See your total creation count and current active plan. |
| 🌐 **Community** | Browse AI-generated images shared publicly by other users. Like your favorites — the like count updates in real time. |

> Free plan users get **10 requests** before being prompted to upgrade.

### 💎 Premium Plan
| Feature | Description |
|---|---|
| 🖼️ **Generate Images** | Describe any scene and generate stunning images using **Stable Diffusion XL** via Hugging Face. Choose from 8 styles: Realistic, Ghibli, Anime, Cartoon, Fantasy, 3D, Portrait, and more. Optionally publish to the community. |
| 🧹 **Remove Background** | Upload any image and get a clean, background-free version in seconds using Cloudinary's AI background removal. |
| 🪄 **Remove Object** | Upload an image and specify a single object to remove. The AI will erase it and return a clean result. |
| � **Review Resume** | Upload your PDF resume (up to 5MB). The AI extracts the text, analyzes it, and returns detailed feedback on strengths, weaknesses, and areas for improvement — rendered as formatted markdown. |

---

## 🧱 Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| **React 19** | UI framework |
| **Vite 7** | Build tool & dev server |
| **Tailwind CSS v4** | Utility-first styling |
| **React Router DOM v7** | Client-side routing |
| **Clerk React** | Authentication, user management & pricing table |
| **Axios** | HTTP requests to the backend |
| **React Hot Toast** | Toast notifications |
| **React Markdown** | Render AI-generated markdown content |
| **Lucide React** | Icon library |

### Backend
| Technology | Purpose |
|---|---|
| **Node.js + Express v5** | REST API server |
| **Clerk Express** | JWT verification & plan checking middleware |
| **Neon (PostgreSQL)** | Serverless database for storing creations |
| **Cloudinary** | Image upload, storage & AI background removal |
| **Multer** | Multipart form data / file upload handling |
| **Groq API** (LLaMA 3.3 70B) | Text generation for articles, blog titles, resume review |
| **Hugging Face Inference API** (SDXL) | AI image generation |
| **pdf-parse** | Extract text from uploaded PDF resumes |
| **dotenv** | Environment variable management |

---

## 📁 Project Structure

```
Toolzy-AI/
│
├── Client/                          # React + Vite Frontend
│   ├── public/
│   │   ├── favicon.svg
│   │   ├── gradientBackground.png
│   │   └── icons.svg
│   │
│   ├── src/
│   │   ├── assets/                  # Static assets & dummy data
│   │   │   └── assets.js
│   │   │
│   │   ├── components/              # Reusable UI components
│   │   │   ├── NavBar.jsx           # Top navigation bar
│   │   │   ├── Sidebar.jsx          # Dashboard sidebar navigation
│   │   │   ├── Hero.jsx             # Landing page hero section
│   │   │   ├── AiTools.jsx          # AI tools showcase section
│   │   │   ├── Plan.jsx             # Clerk PricingTable component
│   │   │   ├── Testimonial.jsx      # User testimonials section
│   │   │   ├── Footer.jsx           # Site footer
│   │   │   └── CreationItem.jsx     # Single creation card in dashboard
│   │   │
│   │   ├── pages/                   # Route-level page components
│   │   │   ├── Home.jsx             # Public landing page
│   │   │   ├── Layout.jsx           # Dashboard shell with sidebar
│   │   │   ├── Dashboard.jsx        # User stats & recent creations
│   │   │   ├── WriteArticle.jsx     # Article generator page
│   │   │   ├── BlogTitles.jsx       # Blog title generator page
│   │   │   ├── GenerateImages.jsx   # Image generation page
│   │   │   ├── RemoveBackground.jsx # Background removal page
│   │   │   ├── RemoveObject.jsx     # Object removal page
│   │   │   ├── ReviewResume.jsx     # Resume review page
│   │   │   └── Community.jsx        # Public image gallery with likes
│   │   │
│   │   ├── App.jsx                  # Root component with routes
│   │   ├── main.jsx                 # React entry point
│   │   └── index.css                # Global styles
│   │
│   ├── .env                         # Frontend environment variables
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── Server/                          # Express.js Backend
    ├── configs/
    │   ├── db.js                    # Neon PostgreSQL connection
    │   ├── cloudinary.js            # Cloudinary SDK setup
    │   └── multer.js                # File upload configuration
    │
    ├── controllers/
    │   ├── aiController.js          # All AI feature handlers
    │   └── userController.js        # User data & like system
    │
    ├── middleware/
    │   └── auth.js                  # Clerk auth + plan injection middleware
    │
    ├── routes/
    │   ├── aiRoutes.js              # /api/ai/* routes
    │   └── userRoutes.js            # /api/user/* routes
    │
    ├── .env                         # Backend environment variables
    ├── server.js                    # Express app entry point
    └── package.json
```

---

## ⚙️ Local Setup & Installation

### Prerequisites

Make sure you have the following before starting:

- **Node.js** v18 or higher
- **npm** v9 or higher
- A [Clerk](https://clerk.com) account — for authentication and plan management
- A [Neon](https://neon.tech) account — for the PostgreSQL database
- A [Cloudinary](https://cloudinary.com) account — for image storage
- A [Groq](https://console.groq.com) API key — for text generation
- A [Hugging Face](https://huggingface.co) API key — for image generation

---

### Step 1 — Clone the Repository

```bash
git clone https://github.com/shivakewat1/toolzy-ai.git
cd toolzy-ai
```

---

### Step 2 — Create the Database

Log in to your [Neon console](https://console.neon.tech) and run the following SQL to create the required table:

```sql
CREATE TABLE creations (
  id           SERIAL PRIMARY KEY,
  user_id      TEXT NOT NULL,
  prompt       TEXT NOT NULL,
  content      TEXT NOT NULL,
  type         TEXT NOT NULL,
  publish      BOOLEAN DEFAULT FALSE,
  likes        TEXT[] DEFAULT '{}',
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);
```

**Column breakdown:**
- `user_id` — Clerk user ID of the creator
- `prompt` — The input prompt used to generate the content
- `content` — The generated output (text or Cloudinary image URL)
- `type` — One of: `article`, `blog-title`, `image`, `resume-review`
- `publish` — Whether the image is visible in the Community feed
- `likes` — Array of user IDs who liked this creation

---

### Step 3 — Configure Clerk

1. Go to [clerk.com](https://clerk.com) and create a new application
2. In your Clerk dashboard, set up a **Free** and **Premium** plan under **Billing → Plans**
3. Copy your **Publishable Key** and **Secret Key**

---

### Step 4 — Setup the Server

```bash
cd Server
npm install
```

Create a `.env` file inside the `Server/` folder:

```env
# Neon PostgreSQL
DATABASE_URL=postgresql://user:password@host/dbname?sslmode=require

# Clerk
CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxx
CLERK_SECRET_KEY=sk_test_xxxxxxxxxxxx

# Groq (LLaMA 3.3 70B)
GROQ_API_KEY=gsk_xxxxxxxxxxxx

# Hugging Face (Stable Diffusion XL)
HF_API_KEY=hf_xxxxxxxxxxxx

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Start the server:

```bash
npm run server    # Development with nodemon (auto-restart)
npm start         # Production
```

> Server runs on `http://localhost:3000`

---

### Step 5 — Setup the Client

```bash
cd Client
npm install
```

Create a `.env` file inside the `Client/` folder:

```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxx
VITE_BASE_URL=http://localhost:3000
```

Start the client:

```bash
npm run dev
```

> Client runs on `http://localhost:5173`

---

## 🔌 API Reference

All routes require a valid Clerk JWT token in the `Authorization: Bearer <token>` header.

### AI Routes — `/api/ai`

| Method | Endpoint | Body / File | Description | Plan |
|---|---|---|---|---|
| `POST` | `/generate-article` | `{ prompt, length }` | Generate a full article using LLaMA 3.3 70B | Free |
| `POST` | `/generate-blog-title` | `{ prompt }` | Generate blog title suggestions | Free |
| `POST` | `/generate-image` | `{ prompt, publish }` | Generate image via Stable Diffusion XL | Premium |
| `POST` | `/remove-image-background` | `FormData: image` | Remove background from uploaded image | Premium |
| `POST` | `/remove-image-object` | `FormData: image, object` | Remove a named object from image | Premium |
| `POST` | `/resume-review` | `FormData: resume (PDF)` | Extract text from PDF and get AI feedback | Premium |

### User Routes — `/api/user`

| Method | Endpoint | Body | Description |
|---|---|---|---|
| `GET` | `/get-user-creations` | — | Fetch all creations for the logged-in user |
| `GET` | `/get-published-creations` | — | Fetch all publicly published community images |
| `POST` | `/toggle-like-creation` | `{ id }` | Toggle like/unlike on a creation |

---

## 🔐 Authentication & Authorization Flow

Toolzy AI uses **Clerk** for all authentication. Here's how it works end-to-end:

1. **User signs in** via Clerk on the frontend (email, Google, etc.)
2. **Frontend** calls `getToken()` from `useAuth()` and attaches it as a Bearer token to every API request
3. **Backend** uses `clerkMiddleware()` and `requireAuth()` from `@clerk/express` to verify the JWT on every request
4. The custom `auth` middleware then:
   - Calls `req.auth()` to get the `userId`
   - Calls `has({ plan: 'premium' })` to check the user's subscription
   - Fetches `privateMetadata.free_usage` from Clerk to track free tier usage
   - Injects `req.plan` and `req.free_usage` into the request for controllers to use
5. **Controllers** check `req.plan` and enforce limits accordingly

```
Client → Bearer Token → clerkMiddleware → requireAuth → auth middleware → controller
                                                              ↓
                                                    req.plan = 'free' | 'premium'
                                                    req.free_usage = number
```

---

## 🗺️ Application Routes

| Path | Component | Description |
|---|---|---|
| `/` | `Home.jsx` | Public landing page with hero, features, pricing, testimonials |
| `/ai` | `Dashboard.jsx` | User dashboard — creation stats and history |
| `/ai/write-article` | `WriteArticle.jsx` | Article generator with length selector |
| `/ai/blog-titles` | `BlogTitles.jsx` | Blog title idea generator |
| `/ai/generate-images` | `GenerateImages.jsx` | Text-to-image with style selector |
| `/ai/remove-background` | `RemoveBackground.jsx` | Upload image → get background removed |
| `/ai/remove-object` | `RemoveObject.jsx` | Upload image + object name → get object removed |
| `/ai/review-resume` | `ReviewResume.jsx` | Upload PDF → get AI resume feedback |
| `/ai/community` | `Community.jsx` | Public gallery with like/unlike system |

---

## 🚀 Deployment

### Deploy the Server

You can deploy the Express server to any Node.js-compatible platform:

**Railway / Render / Fly.io:**
1. Connect your GitHub repo
2. Set the root directory to `Server/`
3. Add all environment variables from `Server/.env`
4. Set start command to `npm start`

### Deploy the Client

**Vercel (recommended):**
1. Connect your GitHub repo
2. Set the root directory to `Client/`
3. Add environment variables:
   - `VITE_CLERK_PUBLISHABLE_KEY`
   - `VITE_BASE_URL` → your deployed server URL (e.g. `https://toolzy-api.railway.app`)
4. Build command: `npm run build`
5. Output directory: `dist`

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — you are free to use, modify, and distribute it for personal or commercial purposes.

---

<div align="center">

Made with ❤️ using React, Express, Groq & Hugging Face

</div>
