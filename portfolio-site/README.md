# Portfolio Website

A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🎨 Modern, responsive design with dark/light mode
- 📱 Mobile-first approach
- 🔐 Admin panel for content management
- 📄 Resume and certificate downloads
- ⚡ Fast performance with Next.js 14
- 🎭 Smooth animations with Framer Motion
- 🔒 Secure admin authentication

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Admin Panel

Access the admin panel at [http://localhost:3000/admin](http://localhost:3000/admin)

**Default credentials:**
- Password: `password`

**Important:** Change the admin password in production by:
1. Generate a new hash: `node -e "console.log(require('bcryptjs').hashSync('your-new-password', 10))"`
2. Update `ADMIN_PASSWORD_HASH` in `.env.local`

### Configuration

#### Environment Variables

Create a `.env.local` file:

```env
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
ADMIN_PASSWORD_HASH=$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi
```

#### Portfolio Data

Edit `data/portfolio.json` to update your information, or use the admin panel.

### File Uploads

- Resume: Place in `public/uploads/`
- Certificates: Upload through admin panel or place in `public/uploads/`

### Deployment

#### Vercel (Recommended)

1. Push to GitHub
2. Connect to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

#### Other Platforms

1. Build the project: `npm run build`
2. Start production server: `npm start`

### Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Authentication:** JWT + bcrypt
- **File Storage:** Local filesystem

### Project Structure

```
portfolio-site/
├── src/
│   ├── app/
│   │   ├── admin/          # Admin panel
│   │   ├── api/            # API routes
│   │   └── page.tsx        # Main page
│   ├── components/         # React components
│   └── lib/               # Utilities
├── data/
│   └── portfolio.json     # Portfolio data
├── public/
│   └── uploads/          # File uploads
└── README.md
```

### Customization

#### Colors

Edit `tailwind.config.js` to change the color scheme:

```js
theme: {
  extend: {
    colors: {
      primary: {
        50: '#eff6ff',
        500: '#3b82f6',
        600: '#2563eb',
        700: '#1d4ed8',
      }
    }
  }
}
```

#### Content

Use the admin panel at `/admin` to update:
- Personal information
- Work experience
- Skills
- Projects
- Certificates

### Security Notes

- Change default admin password
- Use strong JWT secret
- Enable HTTPS in production
- Consider rate limiting for admin endpoints

### Support

For issues or questions, please check the documentation or create an issue in the repository.