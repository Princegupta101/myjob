
# Myjobb AI Full Stack Developer Intern Assignment

This is a full-stack dashboard application built with Next.js, TypeScript, Node.js, and MongoDB as part of the myjobb AI Full Stack Developer Intern assignment.

## Features

- Email OTP-based authentication system
- Responsive email templates using react-email
- Dashboard with sidebar navigation (using shadcn/ui components)
- Product data display from https://dummyjson.com/products API
- Analytics visualization for product category distribution
- TypeScript for type safety
- TailwindCSS for styling
- MongoDB for user data storage

## Prerequisites

- Node.js (v18 or higher)
- MongoDB
- Resend

## Setup Instructions

1. **Clone the Repository**

   ```bash
   git clone git@github.com:Princegupta101/myjob.git
   cd myjob
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Configure Environment Variables**

   Create a `.env.local` file in the root directory and add the following:

   ```env
   MONGODB_URI=mongodb://localhost:27017/myjobb-ai
   JWT_SECRET=your_jwt_secret
   RESEND_API_KEY=
   ```

Replace <username>, <password>, and <cluster> with your MongoDB Atlas credentials or use mongodb://localhost:27017/myjobb-ai for a local MongoDB instance.
Generate a secure JWT_SECRET (e.g., a random 32-character string).
Obtain a RESEND_API_KEY from Resend.

4. **Run MongoDB**

   Ensure MongoDB is running locally or provide a valid MongoDB URI in the `.env.local` file.

5. **Run the Development Server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

The application is deployed on Vercel. Access it at: [Live URL]

## Project Structure

- `src/app/`: Next.js App Router with API routes and pages
- `src/components/`: Reusable React components
- `src/lib/`: Utility functions for authentication, database, and email
- `src/emails/`: React-email templates
- `src/types/`: TypeScript type definitions

## How to Use

1. **Login**: Navigate to the homepage and click "Login". Enter your email to receive an OTP.
2. **Verify OTP**: Enter the OTP sent to your email. You can resend the OTP if needed.
3. **Dashboard**: Upon successful verification, you'll be redirected to the dashboard displaying product data and analytics.

