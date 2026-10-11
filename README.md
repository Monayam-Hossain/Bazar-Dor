# 🛒 বাজার দর | BazarDor

> **প্রয়োজনীয় পণ্যের দাম এক নজরে** — A real-time Bangladeshi daily market price tracker built with Next.js.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38B2AC?style=for-the-badge&logo=tailwind-css)
![DaisyUI](https://img.shields.io/badge/DaisyUI-4-5A0EF8?style=for-the-badge)
![BetterAuth](https://img.shields.io/badge/BetterAuth-Auth-000?style=for-the-badge)

---

## 📖 About

**BazarDor (বাজার দর)** is a modern, responsive web application that helps users stay updated with the daily prices of essential commodities in Bangladesh — such as rice, vegetables, fish, eggs, and spices. It highlights which products are rising or falling in price, provides market-wise price comparisons, and offers a smooth, localized experience with full Bengali numeral support.

The project was built as part of a technical assessment, following a Figma design and consuming a custom REST API.

---

## ✨ Key Features

1. **📈 Live Price Ticker (Marquee)**
   An infinite-scrolling marquee strip below the navbar showing emoji, product name, current price, and percentage change (▲/▼) — giving users a quick market snapshot.

2. **🔝 Smart Product Sections**
   The home page is divided into three focused sections:
   - **আজ দাম বেড়েছে ▲** — Top 6 price risers
   - **আজ দাম কমেছে ▼** — Top 6 price fallers
   - **সব পণ্য** — Full product grid with responsive layout

3. **🏪 Market-wise Price Comparison**
   On each product detail page, users can see minimum, maximum, and average prices along with a breakdown of today's price across different local markets (বাজারভিত্তিক আজকের দাম).

4. **🔐 Secure Authentication**
   Powered by **BetterAuth**, supporting email/password login, Google OAuth, and GitHub OAuth — with toast notifications, protected routes, and a profile update page.

5. **🇧🇩 Full Bengali Localization & Sorting**
   All prices, units, and UI text are displayed in Bengali with proper Bengali numerals (e.g., ১৪৮ টাকা). Category pages include a smart sort dropdown (ডিফল্ট / কম→বেশি / বেশি→কম) that correctly handles numeric sorting.

---

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| **Next.js 15** (App Router) | UI framework & routing |
| **TypeScript** | Type-safe development |
| **Tailwind CSS** | Utility-first styling |
| **DaisyUI** | Component library for Tailwind |
| **React Icons** | Icon set (emojis & UI icons) |
| **React Toastify** | Toast notifications for auth & actions |
| **React Marquee Text** | Infinite scrolling price ticker |
| **BetterAuth** | Authentication (Email/Password + Google + GitHub) |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/Monayam-Hossain/Bazar-Dor.git
cd Bazar-Dor

# Install dependencies
npm install

# Set up environment variables
# Create a .env.local file with your BetterAuth + OAuth credentials

# Run the development server
npm run dev
```


---

## 📂 Project Structure

```
bazardor/
├── app/
│   ├── (auth)/          # Sign in & Sign up pages
│   ├── (main)/          # Home, Category, Product detail pages
│   ├── profile/         # User profile & update info
│   ├── layout.tsx       # Root layout with Navbar & Footer
│   └── not-found.tsx    # Custom 404 page
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── PriceTicker.tsx
│   ├── ProductCard.tsx
│   └── ...
├── lib/
│   └── auth-client.ts   # BetterAuth client setup
└── public/
```

---

## 🎨 Design

The UI is built to match the provided **Figma** design, with:
- Fully responsive layout (mobile, tablet, desktop)
- Skeleton loaders during data fetching
- Friendly 404 page with "হোম পেজে ফিরে যান" CTA
- Highlighted active category in the navbar

---