# Advika IVF & Fertility Centre

A modern, highly premium, single-page web application built for **Advika IVF Centre** in Ambala. The platform features responsive layouts, sleek dark modes and warm aesthetics (Kumkum crimson + Kesar saffron gold palette), micro-animations, an interactive 3D time-lapse embryonic growth timeline, an intelligent AI Assistant chatbot, and a fully protected administrative dashboard panel connected to a MongoDB backend database.

---

## 🛠️ Technology Stack

### Frontend
* **Core**: React 18, Vite (Fast Hot Module Replacement)
* **Animation & Rendering**: Framer Motion (premium page transition states), Three.js (custom 3D Embryology scene)
* **Styling**: Vanilla CSS (highly customizable custom HSL variables declared inside `globals.css`)
* **Routing**: React Router DOM

### Backend Server
* **Engine**: Node.js, Express.js
* **Database**: MongoDB (Client connectivity via official `mongodb` driver)
* **Authentication**: JSON Web Tokens (`jwt`) & `bcryptjs` encryption
* **Security & CORS**: Secure header middleware, CORS proxy config, Express secure object authorization

---

## 📂 Project Architecture

```bash
advika/
├── server/                    # Node/Express Backend Server
│   ├── middleware/            # Security & verifyToken Middleware
│   ├── routes/                # Protected API Routes (REST)
│   │   ├── auth.js            # JWT login endpoints
│   │   ├── doctors.js         # Specialists management
│   │   ├── gallery.js         # Hospital photo management
│   │   ├── testimonials.js    # Patient success reviews
│   │   └── faqs.js            # FAQ directory management
│   ├── index.js               # Express entry point
│   ├── create_admin.js        # Seed administrator credentials script
│   └── package.json           # Backend dependency configuration
├── src/                       # React Frontend Application
│   ├── assets/                # Local graphic assets
│   ├── components/            # UI Components & Landing Sections
│   │   ├── 3d/                # Three.js 3D Canvas rendering files
│   │   ├── sections/          # Modular sections (Hero, Journey, WhyUs, etc.)
│   │   ├── AIAssistant.jsx    # Diagnostic chatbot helper
│   │   ├── Navbar.jsx         # Global Navigation & Sticky Banner
│   │   └── Footer.jsx         # Hospital Footer links
│   ├── pages/                 # Routing Pages
│   │   ├── Home.jsx           # Main Landing Page
│   │   ├── FAQ.jsx            # Dynamic FAQ Directory
│   │   └── Admin.jsx          # Protected Management Portal
│   ├── styles/                # CSS Stylesheets
│   │   └── globals.css        # Core color variables & typography styles
│   ├── utils/                 # Frontend helpers & REST wrappers
│   │   ├── api.js             # Base fetch config with proxy compatibility
│   │   └── apiWrapper.js      # CRUD API abstraction calls
│   ├── App.jsx                # Router config & components shell
│   └── main.jsx               # React virtual DOM entry point
├── public/                    # Static Assets (Real SVGs & images)
├── vite.config.js             # Vite configurations & CORS development proxy
└── package.json               # Frontend dependency configuration
```

---

## 🚀 Installation & Local Setup

### 1. Prerequisites
Ensure you have the following software installed locally:
* **Node.js** (v18.0.0 or higher)
* **MongoDB Server** (Running locally or a cloud-hosted MongoDB Atlas URI string)

### 2. Database & Environment Configuration
In the root directory of the `server/` directory, create a `.env` file containing the following variables:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/advika
JWT_SECRET=your_super_secret_jwt_signature_key
```

### 3. Backend Server Setup
From the project root folder, navigate to the server and install packages:
```bash
cd server
npm install
```
Seed the database with default administrator login credentials:
```bash
node create_admin.js
```
Start the local server dev instance:
```bash
npm start
```
The server will boot and connect to MongoDB on `http://localhost:5000`.

### 4. Frontend Application Setup
Open a new terminal shell inside the main project directory and install packages:
```bash
npm install
```
Start the local Vite dev server:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🔒 Security Best Practices Implemented

1. **Vite Development Proxy**: Replaced absolute endpoint links in the frontend with relative endpoints handled through a dev server proxy inside `vite.config.js`. This eliminates CORS issues and hides backend port destinations from public inspection.
2. **Server-Side Token Authentication**: Applied `verifyToken` JWT authorization validation inside all write operations in Express router layers (`POST`, `PUT`, `DELETE`). Only valid admin keys are authorized to edit database documents.
3. **Data Normalization**: Normalized MongoDB `_id` elements to standard `id` items during transit to prevent mapping exceptions inside React states.
