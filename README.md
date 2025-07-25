# AI-Powered Resume Builder

A modern, full-stack resume builder application built with Next.js, React, Tailwind CSS, and OpenAI integration. Create professional resumes with AI-powered content generation and export to PDF.

## 🚀 Features

- **Multi-step Form**: Clean, intuitive form interface for entering resume data
- **AI Content Generation**: OpenAI integration for generating professional bullet points and summaries
- **Live Preview**: Real-time resume preview as you build
- **PDF Export**: Download your resume as a professional PDF
- **Dark/Light Mode**: Theme switcher for user preference
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Data Persistence**: Resume data is saved locally in browser storage

## 🛠️ Tech Stack

- **Frontend**: React, Next.js, TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Form Handling**: React Hook Form with Zod validation
- **PDF Generation**: @react-pdf/renderer
- **AI Integration**: OpenAI API (GPT-4o mini)
- **Deployment**: Docker, GitHub Actions

## 📦 Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- OpenAI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/resume-builder.git
   cd resume-builder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Add your OpenAI API key to `.env.local`:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🐳 Docker Deployment

### Using Docker Compose

1. **Build and run with Docker Compose**
   ```bash
   docker-compose up --build
   ```

### Manual Docker Build

1. **Build the Docker image**
   ```bash
   docker build -t resume-builder .
   ```

2. **Run the container**
   ```bash
   docker run -p 3000:3000 -e OPENAI_API_KEY=your_api_key resume-builder
   ```

## 🚀 CI/CD with GitHub Actions

The project includes a GitHub Actions workflow for automated deployment:

1. **Set up repository secrets**:
   - `OPENAI_API_KEY`: Your OpenAI API key
   - `HOST`: Your server IP address
   - `USERNAME`: SSH username for your server
   - `SSH_KEY`: Private SSH key for deployment
   - `PORT`: SSH port (usually 22)

2. **Push to main branch** to trigger automatic deployment

## 📝 Usage

1. **Personal Information**: Start by filling out your basic contact details
2. **Work Experience**: Add your employment history with AI-generated bullet points
3. **Education**: Include your educational background
4. **Skills**: Organize your skills by category
5. **Preview & Export**: Review your resume and download as PDF

### AI Features

- **Smart Bullet Points**: Generate professional achievement statements for work experience
- **Professional Summary**: Auto-generate compelling profile summaries based on your data
- **Content Optimization**: AI helps create impactful, ATS-friendly content

## 🎨 Customization

### Themes
- Toggle between light and dark modes
- Customize colors in `tailwind.config.js`

### PDF Styling
- Modify PDF layout in `components/ResumePDF.tsx`
- Adjust fonts, spacing, and formatting

### Form Validation
- Update validation rules in form components using Zod schemas

## 📊 Project Structure

```
resume-builder/
├── components/
│   ├── forms/           # Form components for each section
│   ├── Layout.tsx       # Main layout with navigation
│   ├── ResumePreview.tsx # Live preview component
│   ├── ResumePDF.tsx    # PDF generation component
│   └── ThemeToggle.tsx  # Dark/light mode switcher
├── lib/
│   └── openai.ts        # OpenAI integration utilities
├── pages/
│   ├── api/             # API routes for AI features
│   ├── _app.tsx         # App configuration
│   └── index.tsx        # Main application page
├── store/
│   └── resumeStore.ts   # Zustand state management
├── styles/
│   └── globals.css      # Global styles and Tailwind imports
├── Dockerfile           # Docker configuration
├── docker-compose.yml   # Docker Compose setup
└── .github/workflows/   # GitHub Actions CI/CD
```

## 🔧 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENAI_API_KEY` | Your OpenAI API key for AI features | Yes |
| `NODE_ENV` | Environment (development/production) | No |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- OpenAI for providing the GPT API
- React PDF team for the excellent PDF generation library
- Tailwind CSS for the utility-first CSS framework
- Next.js team for the amazing React framework

## 📞 Support

If you have any questions or run into issues, please [open an issue](https://github.com/your-username/resume-builder/issues) on GitHub.

---

**Happy resume building! 🎉** 