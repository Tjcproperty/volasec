Volasec (React + Vite)

Volasec is a conversion-focused security consulting website built with React + Vite.
The project emphasizes performance, clarity, and an enterprise-grade presentation.

TECH STACK

- React (Vite)
- Tailwind CSS
- shadcn/ui
- Framer Motion
- react-helmet-async (SEO)
- EmailJS (contact form handling)
- Cal.com React package (booking / scheduling)
- Resend (serverless email API)
- Vercel (deployment)

APPLICATION OVERVIEW
Pages / routes:

- / (Index)
- /contact
- 404 (Not Found)

Layout:

- Global Header and Footer
- Layout applied at the app level

API:

- Resend used for email delivery
- Serverless functions stored in /api

Assets:

- Static images stored in /public

HOW TO RUN THE APP

1. Clone the repository
   git clone https://github.com/your-username/your-repo-name
   cd your-repo-name

2. Install dependencies
   npm install

3. Set up environment variables (.env)
   VOLASEC_CAL_URL=your_cal_link
   VOLASEC_CONTACT_TO=your_email
   VITE_VOLASEC_CAL_URL=your_cal_link
   RESEND_API_KEY=your_resend_api_key

4. Start development server
   npm run dev

5. Build for production
   npm run build

6. Preview production build (optional)
   npm run preview

PROJECT STRUCTURE

- public/ (images)
- api/ (Resend serverless functions)
- src/
  - pages/
  - components/
  - layout/
  - lib/cn.js

UTILITY
cn.js combines clsx and tailwind-merge for class handling.
