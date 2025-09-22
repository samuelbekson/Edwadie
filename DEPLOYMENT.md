# gBay Deployment Guide

This guide will help you deploy the gBay application to a production environment.

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Supabase project (https://supabase.com/)
- A hosting provider (Vercel, Netlify, etc.)

## Environment Setup

1. Copy the example environment file and update it with your Supabase credentials:
   ```bash
   cp .env.example .env
   ```

2. Update the `.env` file with your Supabase project details:
   ```env
   VITE_SUPABASE_URL=your-supabase-project-url
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   VITE_APP_ENV=production
   ```

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

## Building for Production

1. Create a production build:
   ```bash
   npm run build
   ```

2. Preview the production build locally:
   ```bash
   npm run preview
   ```

## Deployment

### Vercel (Recommended)

1. Install Vercel CLI (if not installed):
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```
   or
   ```bash
   vercel --prod
   ```

### Netlify

1. Install Netlify CLI (if not installed):
   ```bash
   npm install -g netlify-cli
   ```

2. Deploy:
   ```bash
   netlify deploy --prod
   ```

## Environment Variables in Production

Make sure to set the following environment variables in your hosting platform:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_APP_ENV=production`

## Post-Deployment

1. Verify your site is running correctly
2. Check the browser console for any errors
3. Test all major features (authentication, database operations, etc.)

## Troubleshooting

- If you get CORS errors, check your Supabase CORS settings
- If the build fails, check the error logs and ensure all environment variables are set
- For Vite-specific issues, refer to the [Vite documentation](https://vitejs.dev/guide/)

## Monitoring

Consider setting up:
- Error tracking (Sentry, LogRocket)
- Analytics (Google Analytics, Plausible)
- Uptime monitoring (UptimeRobot, Better Stack)
