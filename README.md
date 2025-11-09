# 💎 Siyara Jewellery

A modern, elegant e-commerce web application for browsing and exploring luxury jewellery collections built with React, TypeScript, and Vite.

## 🚀 Features

- **Product Catalog**: Browse through an extensive collection of jewellery items
- **Advanced Filtering**: Filter products by category, price range, and other attributes
- **Product Search**: Quick search functionality to find specific items
- **Wishlist**: Save your favorite items for later
- **Responsive Design**: Optimized for desktop and mobile devices
- **Modern UI**: Built with Radix UI components and Tailwind CSS

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher)
- **npm** or **yarn** package manager

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/cyberscorpion/siyara-jewellery.git
   cd siyara-jewellery
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   or if you're using yarn:
   ```bash
   yarn install
   ```

## 🎯 Running the Application

### Development Mode

Start the development server with hot-reload:

```bash
npm run dev
```

The application will be available at `http://localhost:5173/`

### Production Build

Create an optimized production build:

```bash
npm run build
```

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run optimize` - Optimize Vite dependencies
- `npm run deploy` - Deploy to GitHub Pages

## 🏗️ Project Structure

```
siyara-jewellery/
├── src/
│   ├── components/       # React components
│   │   ├── ui/          # Reusable UI components
│   │   ├── Header.tsx
│   │   ├── ProductCard.tsx
│   │   └── ...
│   ├── data/            # Static data and mock data
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions and types
│   ├── styles/          # Global styles and theme
│   ├── App.tsx          # Main application component
│   └── main.tsx         # Application entry point
├── public/              # Static assets
└── package.json         # Project dependencies
```

## 🎨 Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Framer Motion** - Animation library
- **React Hook Form** - Form handling
- **Lucide React** - Icon library

## 🌐 Deployment

The project is configured for deployment to GitHub Pages:

```bash
npm run deploy
```

This will build the project and deploy it to the `gh-pages` branch.

## 📝 License

This project is licensed under the MIT License.

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

For any inquiries or issues, please open an issue on GitHub.
