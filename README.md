# Medium Clone – Serverless Blogging Platform

A Medium-inspired blogging platform that allows users to securely write, publish, and read articles. The application is built using **React for the frontend** and **Hono with Cloudflare Workers for the backend**, leveraging **JWT-based authentication** and **serverless deployment** for scalability and performance.

This project is designed as a **full-stack learning and demo application**, focusing on authentication, CRUD functionality, and modern serverless architecture.

---

## 🚀 Features

- User authentication using **JWT (JSON Web Tokens)**  
- Secure login and protected API routes  
- Create blog posts (authenticated users)  
- Read and browse published articles  
- RESTful APIs built with Hono  
- Serverless backend deployed on Cloudflare Workers  
- Clean and responsive UI  

---

## 🛠 Tech Stack

### Frontend
- React  
- Tailwind CSS  
- Fetch-based API integration  

### Backend
- Hono  
- JWT-based authentication  
- Cloudflare Workers (serverless runtime)  

---

## 🔐 Authentication (JWT)

- Users authenticate via login/signup endpoints  
- Backend issues a **JWT** upon successful authentication  
- JWT is used to protect private routes (post creation, editing, deletion)  
- Token is verified on each request using middleware  

This stateless authentication model is well-suited for serverless environments.

---

## 🌐 Serverless Backend

- Backend APIs are built using **Hono**  
- Deployed on **Cloudflare Workers**  
- Stateless architecture using JWT  
- Low-latency, globally distributed execution  

---

## 🔗 Links

- **GitHub Repository:** https://github.com/Rvaindra7330/medium-clone  
- **Live Demo:** https://medium-clone-xi-snowy.vercel.app/ 

---

## 🧠 Learning Outcomes

- Implementing JWT authentication in a serverless environment  
- Building secure REST APIs with Hono  
- Designing full-stack applications with React  
- Using Cloudflare Workers for scalable backend deployment  
- Managing protected routes and authentication flows  

---

## ⚙️ Getting Started Locally

### Prerequisites
- Node.js (v18+ recommended)
- npm or pnpm
- Cloudflare account (for Workers deployment)

### Installation

```bash
git clone https://github.com/Rvaindra7330/medium-clone.git
cd medium-clone
