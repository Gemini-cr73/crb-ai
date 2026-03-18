# 🌐 CRB AI Portfolio — Skill Graph + Evidence Ledger

🚀 A production-grade AI, Data, and Cloud engineering portfolio designed around **proof, not claims**.

👉 Live: https://crbdev.com

## 🧠 Core Concept

This portfolio is built on a unique idea:

> **Skills should be demonstrated through evidence, not just listed.**

Instead of static resumes or project lists, this platform introduces:

### 🔗 Skill Graph
- Interactive visualization of technical capabilities  
- Shows relationships across AI, ML, Data, Cloud, and Backend systems  
- Highlights how skills connect in real-world architectures  

### 📂 Evidence Ledger
- Every skill is backed by **real, shipped projects**  
- Includes:
  - Case studies  
  - Live demos  
  - GitHub repositories  
  - API documentation  

👉 This creates a **transparent, verifiable engineering profile**

## 🚀 What This Portfolio Demonstrates

- Building **production-grade ML & LLM systems**
- Designing **end-to-end data pipelines**
- Deploying **containerized applications to the cloud**
- Creating **AI systems with real-world usability**
- Connecting **skills → projects → outcomes**

## 🧠 Featured Systems

### 🏗️ AI Architecture Designer (ML-First)
- ML-driven decision support for system architecture  
- Algorithms: Logistic Regression, Random Forest, SVM  
- Designed for reproducible evaluation and model comparison  
- Optional LLM layer (Groq) for explanation (ML-first system)

### 📊 Agentic SQL RAG
- Grounded AI retrieval system combining:
  - Full-Text Search (PostgreSQL)
  - Vector Embeddings (pgvector)
- Hybrid ranking + deterministic ordering  
- Evidence-based responses with citations  

### 🎯 AI Interview Coach
- Structured interview practice system  
- Real-time feedback + scoring engine  
- LLM-assisted coaching with reproducible evaluation  

### 📈 AI Market Coach
- Risk-first crypto & forex analysis system  
- Focus on:
  - Safe entry strategies  
  - Market awareness  
  - Decision discipline  

### 🛡️ Decision-Fragility Simulator
- Behavioral risk modeling system  
- Tracks and evaluates decision patterns  
- Generates fragility scores and reports  

## 🧱 Tech Stack

### 🎨 Frontend
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion

### ⚙️ Backend / APIs
- FastAPI (Python)
- RESTful API design
- Modular service architecture

### 🧠 Machine Learning & Data
- Scikit-learn (ML models)
- Pandas / NumPy
- Feature engineering pipelines
- Model evaluation & comparison

### 🗄️ Data Systems
- PostgreSQL
- pgvector (vector search)
- Full-Text Search (FTS)

### ☁️ Cloud & DevOps
- Vercel (Frontend hosting)
- Azure App Service (Containers)
- Docker & Docker Compose
- Cloudflare (DNS, SSL, CDN)

## 🧩 Key Differentiators

- ✅ **Evidence-first portfolio design**
- ✅ **ML-first systems (not LLM-only wrappers)**
- ✅ **Production-style architecture**
- ✅ **Hybrid retrieval (FTS + vector search)**
- ✅ **Cloud-native deployment pipelines**
- ✅ **Clear separation of ML vs LLM responsibilities**

## 📁 Project Structure

```bash
crb-ai/
│
├── public/                # Static assets (images, icons)
├── src/
│   ├── app/               # Next.js App Router pages
│   │   ├── page.tsx       # Home page
│   │   ├── projects/      # Projects page
│   │   ├── skills/        # Skill Graph + Evidence Ledger
│   │   ├── about/         # About page
│   │   └── contact/       # Contact page
│   │
│   ├── components/        # Reusable UI components
│   ├── lib/               # Graph logic, ranking, filters
│   ├── data/              # Structured project + skill data
│   └── styles/            # Global styles
│
├── package.json
├── next.config.js
├── tsconfig.json
└── README.md
