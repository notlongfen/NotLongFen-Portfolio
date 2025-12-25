# NotLongFen Portfolio

A dual-edition portfolio showcasing blockchain/Web3 development expertise with two distinct visual themes: Cyberpunk Terminal and Editorial Magazine.

## 🎨 Editions

### Cyberpunk Terminal (`/cyberpunk`)
- Dark theme with blockchain aesthetics
- Terminal-style navigation and interactions
- 3D React Three Fiber canvas with custom shaders
- Command-line interface contact system

### Editorial Magazine (`/magazine`)
- Light theme with clean typography
- Smooth scroll animations and parallax effects
- Video backgrounds and elegant transitions
- Traditional contact form

## 🚀 Features

### ✅ Completed
- [x] Dual-edition architecture with theme switching
- [x] Immersive transition animations between editions
- [x] Responsive design for all screen sizes
- [x] Project showcase with cursor-following tooltips
- [x] Centralized contact information system
- [x] Performance optimizations (code-split 3D canvas)
- [x] SEO-friendly routing structure

### 🔄 Current Status
- **Live URL**: [http://localhost:3000](http://localhost:3000)
- **Landing Page**: Split-screen edition selector
- **Contact Info**: Real email and social links configured
- **Project Data**: 4 sample projects with placeholder content

## 📋 Next Priority Tasks

### 🔥 Priority 1: Replace Placeholder Content
- [ ] Add real project videos to `/public/videos/`
  - Replace Coverr.co placeholder URLs
  - Create project-specific video content
  - Optimize video formats and sizes
- [ ] Add project images/thumbnails
  - Screenshots for each project
  - Hero images for project detail pages
  - Optimize with Next.js Image component

### 🔧 Priority 2: Implement Contact Forms
- [ ] Cyberpunk terminal form submission
  - Connect EMAIL command to actual mail service
  - Add form validation and feedback
  - Implement spam protection
- [ ] Magazine contact form backend
  - Choose service: EmailJS, Formspree, or custom API
  - Add form validation and success/error states
  - Implement proper form submission handling

### 🎯 Priority 3: Add SEO & Performance
- [ ] Generate metadata for project pages
  - Add `generateMetadata` to project detail routes
  - Dynamic Open Graph images
  - Structured data for projects
- [ ] Performance optimizations
  - Replace `<img>` with Next.js `<Image>` components
  - Add loading states and skeleton screens
  - Implement error boundaries
  - Add proper lazy loading

### ✨ Priority 4: Polish & Production-Ready
- [ ] Create themed 404 pages
  - Cyberpunk 404 with terminal aesthetics
  - Magazine 404 with editorial design
- [ ] Add analytics and tracking
  - Google Analytics 4 or Vercel Analytics
  - Track edition usage and user behavior
- [ ] Accessibility improvements
  - Add proper ARIA labels
  - Keyboard navigation support
  - Screen reader compatibility
- [ ] Update README with real project information

### 🎨 Priority 5: Content & Features
- [ ] Decide on About section parity
  - Add About section to Cyberpunk OR remove from Magazine
  - Ensure consistent content across editions
- [ ] Enhance project case studies
  - Add more detailed project descriptions
  - Include technical challenges and solutions
  - Add project metrics and outcomes
- [ ] Add micro-interactions
  - Scroll-triggered animations
  - Hover effects and transitions
  - Interactive elements

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **3D Graphics**: React Three Fiber + Three.js
- **Fonts**: Custom font loading (Unbounded, Playfair Display, Geist)
- **TypeScript**: Full type safety
- **Performance**: Code splitting, lazy loading, optimized images

## 📁 Project Structure

```
portfolio/
├── app/                          # Next.js App Router
│   ├── (cyberpunk)/             # Cyberpunk edition routes
│   ├── (magazine)/              # Magazine edition routes
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Landing page with edition selector
├── components/                  # Reusable components
│   ├── sections/                # Page sections (Hero, Work, Contact)
│   ├── b/                       # Magazine-specific components
│   ├── canvas/                  # 3D graphics components
│   ├── dom/                     # DOM manipulation components
│   └── EditionSelector.tsx      # Theme switcher component
├── lib/                         # Utilities and constants
│   ├── contact.ts               # Centralized contact information
│   ├── projects.ts              # Project data and types
│   └── theme-*.ts               # Theme management (future)
├── public/                      # Static assets
│   └── videos/                  # Project videos (to be added)
└── styles/                      # Global styles
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- pnpm (recommended) or npm/yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd portfolio

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

### Available Scripts
```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm type-check   # Run TypeScript checks
```

## 📧 Contact Form Setup

The portfolio includes a functional contact form powered by EmailJS for secure, client-side email delivery.

### Prerequisites
- An EmailJS account ([sign up at emailjs.com](https://www.emailjs.com/))
- Gmail account (for receiving emails)

### Configuration
1. **Create EmailJS Account & Service**:
   - Sign up at [EmailJS](https://www.emailjs.com/)
   - Create a new email service (Gmail recommended)
   - Connect your Gmail account and grant permissions

2. **Create Email Template**:
   - In EmailJS dashboard, create a new email template
   - Use these template variables:
     ```
     Subject: New Contact Form Submission
     To Email: {{to_email}}
     From Email: {{from_email}}
     Message: {{message}}
     ```
   - Customize the email design as needed

3. **Get API Credentials**:
   - Copy your Service ID, Template ID, and Public Key from EmailJS dashboard

4. **Environment Variables**:
   - Create/update `.env.local` in the project root:
     ```env
     NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id_here
     NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id_here
     NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key_here
     ```

### Features
- **Form Validation**: Client-side validation for required fields and email format
- **GDPR Compliance**: Consent checkbox for data processing
- **User Feedback**: Loading states, success/error messages with professional tone
- **Spam Protection**: Basic validation and consent requirements
- **Responsive Design**: Works across all device sizes
- **Error Handling**: Graceful error messages for network issues or API failures

### Testing
- Fill out the contact form with valid data to verify email delivery
- Test validation by submitting empty or invalid forms
- Check email receipt in your Gmail inbox
- Verify error handling by temporarily disabling internet connection

### Troubleshooting
- **Emails not sending?** Double-check your EmailJS credentials and Gmail permissions
- **Form not validating?** Ensure all required fields are filled and consent is checked
- **CORS errors?** EmailJS handles CORS automatically; check your service configuration
- **Rate limits?** EmailJS has usage limits; upgrade your plan for high-traffic sites

For more help, visit the [EmailJS documentation](https://www.emailjs.com/docs/).

## 🎯 Development Guidelines

### Adding New Projects
1. Update `lib/projects.ts` with new project data
2. Add project images to `/public/images/projects/`
3. Add project videos to `/public/videos/`
4. Test both editions for consistency

### Contact Information Updates
1. Edit `lib/contact.ts` (single source of truth)
2. Changes automatically apply to both editions
3. Test terminal commands and form links

### Theme Consistency
- Cyberpunk: Dark backgrounds, cyan accents, terminal aesthetics
- Magazine: Light backgrounds, serif fonts, smooth animations
- Maintain visual consistency across both editions

## 📊 Performance Metrics

- **Lighthouse Score**: Target 90+ on all metrics
- **Bundle Size**: Monitor with `pnpm build --analyze`
- **Core Web Vitals**: Optimize for real user metrics
- **3D Canvas**: Code-split to prevent blocking initial load

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
pnpm add -g vercel

# Deploy
vercel --prod
```

### Environment Variables
```env
# Add to .env.local for local development
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id
CONTACT_FORM_API_KEY=your_form_api_key
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

## 👨‍💻 Author

**Long Phan (NotLongFen)**
- Email: phannguyenhoanglong@gmail.com
- GitHub: [@notlongfen](https://github.com/notlongfen)
- LinkedIn: [Long Phan](https://www.linkedin.com/in/long-phan-3a992a266/)

---

*Built with ❤️ using Next.js, React, and modern web technologies*
