# JN Window Tint - Professional Window Tinting Website

A modern, responsive static website for JN Window Tint, showcasing professional window tinting services for automotive, residential, and commercial applications.

## 🚀 Tech Stack

- **Framework**: Next.js 14 (React-based static site generator)
- **Styling**: Tailwind CSS (utility-first CSS framework)
- **Language**: TypeScript (type safety)
- **Icons**: Lucide React (modern icon library)
- **Animations**: Framer Motion (smooth animations)
- **UI Components**: Headless UI (accessible components)
- **Deployment**: Vercel/Netlify (static hosting)

## 📁 Project Structure

```
jn-window-tint/
├── app/                    # Next.js 13+ app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── services/          # Services page
│   ├── gallery/           # Gallery page
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   └── quote/             # Quote page
├── components/            # Reusable React components
├── public/               # Static assets
├── styles/               # Global styles
└── types/                # TypeScript type definitions
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd jn-window-tint
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 Customization

### Colors
The color scheme is defined in `tailwind.config.js`:
- **Primary**: Blue gradient (professional, trustworthy)
- **Dark**: Gray scale (modern, clean)

### Content
Update content in the respective page components:
- Service descriptions and pricing
- Contact information
- Company details
- Gallery images

## 📱 Features

- **Responsive Design**: Mobile-first approach
- **SEO Optimized**: Meta tags, structured data
- **Fast Loading**: Static generation, image optimization
- **Accessible**: WCAG compliant components
- **Modern UI**: Clean, professional design
- **Contact Forms**: Lead generation
- **Quote Calculator**: Interactive pricing tool

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically

### Netlify
1. Build the project: `npm run build`
2. Upload the `out/` folder to Netlify

## 📞 Support

For questions or support, contact the development team.

---

Built with ❤️ for JN Window Tint 