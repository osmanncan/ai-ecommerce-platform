<div align="center">

# ✦ AURA — AI-First E-Commerce Platform

**AI-powered, next-generation luxury fashion e-commerce platform.**

Next.js · React Native (Expo) · Supabase · Groq AI · TypeScript

---

</div>

## 📖 About the Project

**AURA** is a luxury fashion-oriented platform that places artificial intelligence technologies at the heart of e-commerce. It consists of two main components: a web store and a mobile admin panel.

- 🌐 **Web Store** — Customer-facing shopping experience featuring AI-powered style consultants, mood-based product discovery, cart, wishlist, and a full-scale e-commerce experience.
- 📱 **Mobile Admin Panel** — Specialized iOS/Android application for store owners to manage orders and products.

---

## 🖼️ Screenshots

### 📱 Mobile Admin Panel

<div align="center">

| Dashboard | Product Management | Order Management |
|:---------:|:-------------:|:----------------:|
| <img src="https://github.com/user-attachments/assets/6d74a34a-a7ba-4a89-8398-5d4d31c86dd7" width="250"/> | <img src="https://github.com/user-attachments/assets/12008ccb-1a53-4547-83d9-c02d7d94c478" width="250"/> | <img src="https://github.com/user-attachments/assets/30f843e3-0d2d-4db7-87bd-cba6f1dc1e1d" width="250"/>

</div>

---

## 🛠️ Technology Stack

| Layer | Technology |
|--------|-----------|
| **Web Frontend** | Next.js 15, React 19, TailwindCSS |
| **Mobile App** | React Native (Expo SDK 54) |
| **Database & Auth** | Supabase (PostgreSQL + Auth + Storage) |
| **AI / LLM** | Groq SDK — Llama 3.3 70B Versatile |
| **Vector Search** | pgvector (Supabase) |
| **Language** | TypeScript |
| **Monorepo** | npm Workspaces |

---

## 📂 Project Structure

```
AURA/
├── apps/
│   ├── web/                          # Next.js Web Store
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── (info)/           # Corporate pages (about, faq, careers...)
│   │   │   │   ├── admin/            # Web admin panel
│   │   │   │   ├── api/chat/         # AI Stylist API endpoint
│   │   │   │   ├── auth/             # Login / Registration page
│   │   │   │   ├── checkout/         # Checkout page
│   │   │   │   ├── product/[id]/     # Product details page
│   │   │   │   ├── stylist/          # AI Stylist page
│   │   │   │   └── page.tsx          # Home page
│   │   │   ├── components/           # UI components (Navbar, Cart, Search...)
│   │   │   ├── context/              # Global state (AppContext)
│   │   │   ├── i18n/                 # Multi-language support (TR / EN)
│   │   │   └── lib/                  # Supabase client
│   │   └── .env.example              # Environment variables template
│   │
│   └── mobile/                       # React Native Admin Panel
│       ├── App.tsx                   # App entry point
│       ├── src/
│       │   ├── navigation/           # Screen routing
│       │   │   └── RootNavigator.tsx
│       │   ├── screens/
│       │   │   ├── auth/
│       │   │   │   └── LoginScreen.tsx   # Admin login screen
│       │   │   └── admin/
│       │   │       ├── AdminDashboard.tsx # Dashboard (sales, orders, customer stats)
│       │   │       ├── AdminOrders.tsx    # Order management
│       │   │       └── AdminProducts.tsx  # Product management
│       │   └── lib/
│       │       └── supabase.ts       # Supabase client
│       └── .env.example              # Environment variables template
│
├── shared/                           # Shared code (constants, types)
│   ├── constants.ts                  # Mock products and constants
│   └── index.ts                      # Export point
│
├── supabase/
│   └── migrations/                   # Database schema
│       └── 20240307000000_init_schema.sql
│
├── docs/screenshots/                 # Screenshots
└── package.json                      # Monorepo root
```

---

## ✨ Features

### 🌐 Web Store
- **AI Stylist** — Personalized style recommendations using Groq (Llama 3.3 70B)
- **Mood-Based Discovery** — Style modes such as Minimalist, Bold, Romantic, Avant-Garde
- **Product Catalog** — Real-time product fetching from Supabase with Mock fallback
- **Vector Similarity Search** — AI-powered product matching with pgvector
- **Cart & Wishlist** — Fully functional shopping cart and wishlist
- **Multi-Language** — Turkish and English language support
- **Dark / Light Mode** — Theme switching
- **Authentication** — Registration/Login via Supabase Auth
- **Corporate Pages** — About Us, FAQ, Contact, Careers, Privacy, Returns, Shipping, Sustainability, Terms of Service
- **Web Admin Panel** — Manage products, orders, customers, and settings
- **Merchant Panel** — Allow sellers to manage their own products
- **Responsive Design** — Fully compatible with mobile, tablet, and desktop

### 📱 Mobile Admin Panel
- **Login Screen** — Supabase Auth + Developer quick access
- **Dashboard** — Statistics for total sales, order count, new customers, and return rate
- **Order Management** — Search, filter, and track order status (Preparing, Paid, Shipped, Completed)
- **Product Management** — Product list, stock status, category views, and status tags (Active, Low Stock, Out of Stock)
- **Secure Logout** — Confirmation-based logout
- **Multi-Language** — Turkish and English support

---

## 🚀 Installation

### Requirements

- **Node.js** 18+
- **npm** 9+
- **Expo Go** app (for mobile testing)
- **Supabase** account

### 1. Clone the project

```bash
git clone https://github.com/osmanncan/ai-first-ecommerce.git
cd ai-first-ecommerce
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

**For Web:**
```bash
cp apps/web/.env.example apps/web/.env.local
```
Edit `apps/web/.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
GROQ_API_KEY=your-groq-api-key
```

**For Mobile:**
```bash
cp apps/mobile/.env.example apps/mobile/.env
```
Edit `apps/mobile/.env`:
```env
EXPO_PUBLIC_SUPABASE_URL=your-supabase-url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 4. Create the database

Go to the SQL Editor in your Supabase Dashboard and run the SQL provided in `supabase/migrations/20240307000000_init_schema.sql`.

### 5. Run the apps

**Web:**
```bash
npm run web
```

**Mobile:**
```bash
cd apps/mobile
npx expo start
```

---

## 🗄️ Database Schema

| Table | Description |
|-------|----------|
| `products` | Products (name, price, stock, category, vector embedding) |
| `profiles` | User profiles (linked with Supabase Auth) |
| `orders` | Orders (user, total, status) |

**Custom Function:** `match_products()` — Provides AI-powered product matching by performing vector similarity search using pgvector.

---

## 🔒 Security

- ✅ API keys are stored in `.env` files, NOT hardcoded in source code.
- ✅ `.env` files are excluded from GitHub via `.gitignore`.
- ✅ `.env.example` templates provided for easy setup.
- ✅ Support for Supabase Row Level Security (RLS).
- ✅ Authentication handled by Supabase Auth.

---

## 📜 License

This project was developed for portfolio purposes.

---

<div align="center">

**Experience the future of fashion with AURA.** ✦

*Developed by Osmancan.*

</div>
