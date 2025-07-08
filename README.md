# ForumGabes

ForumGabes is a web application for managing and requesting car-related services, including custom quote requests, appointments, and more. The platform is designed for users to easily interact with car dealerships and service providers in Gabes, Tunisia.

## Features

- Request custom car quotes (devis personnalisés)
- Book appointments
- Contact form and newsletter subscription
- Browse car brands, models, and versions
- Gallery and showroom sections
- Responsive and modern UI

## Tech Stack

- Next.js (App Router)
- React
- Tailwind CSS
- Supabase (for backend/database)
- Framer Motion (animations)

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- pnpm (or npm/yarn)

### Installation

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd ForumGabes
   ```
2. Install dependencies:
   ```bash
   pnpm install
   # or
   npm install
   # or
   yarn install
   ```
3. Configure environment variables:

   - Copy `.env.example` to `.env.local` and fill in your Supabase and other required keys.

4. Run the development server:
   ```bash
   pnpm dev
   # or
   npm run dev
   # or
   yarn dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) to view the app.

## Project Structure

- `app/` - Next.js app directory (pages, API routes)
- `components/` - Reusable React components
- `data/` - Static data (e.g., cars.json)
- `lib/` - Utility libraries (e.g., Supabase client)
- `public/` - Static assets (images, logos)
- `styles/` - Global styles

## API Endpoints

- `/api/custom-devis-request` - Submit a custom quote request
- `/api/appointment-request` - Book an appointment
- `/api/contact-request` - Contact form
- ...and more

## License

This project is licensed under the MIT License.
