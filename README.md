# SATforge - AI-Powered SAT Practice Platform

An intelligent SAT preparation platform with **1000+ official SAT practice questions**, AI-powered tutoring, and comprehensive analytics.

## 🎯 Features

- **1000+ Practice Questions** covering all four SAT domains:
  - Reading & Writing (40%)
  - Heart of Algebra (20%)
  - Advanced Math (25%)
  - Problem Solving & Data Analysis (15%)

- **Flexible Practice Modes**
  - Filter by topic and difficulty level
  - Search questions by keyword
  - Paginated question browsing (20 per page)

- **Timed Test Mode**
  - Full-length practice tests with time limits
  - Randomized question selection
  - Instant scoring and performance tracking

- **AI Tutor** (Anthropic API)
  - Ask questions and get instant, detailed explanations
  - Topic-specific guidance

- **Analytics Dashboard**
  - Track accuracy rates across all practice
  - Topic-by-topic performance breakdown
  - Progress visualization

- **Study Planner**
  - Organize your prep schedule
  - Set weekly study goals

## 🛠 Tech Stack

- **Frontend**: React 18
- **Build Tool**: Vite 5
- **API**: Anthropic (Claude) for AI Tutoring
- **Hosting**: GitHub Pages
- **Fonts**: Google Fonts (Syne, IBM Plex Sans)

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm (or yarn/pnpm)
- Git
- GitHub account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/satforge.git
   cd satforge
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the project root:
   ```
   VITE_ANTHROPIC_API_KEY=your_api_key_here
   ```
   
   Get your API key from [Anthropic Console](https://console.anthropic.com)

4. **Run the development server**
   ```bash
   npm run dev
   ```
   The app will open automatically at `http://localhost:5173`

5. **Build for production**
   ```bash
   npm run build
   ```

## 📦 Project Structure

```
satforge/
├── public/
│   └── index.html              # Main HTML template
├── src/
│   ├── App.jsx                 # Main React application
│   ├── main.jsx                # Entry point
│   ├── questions.json          # 1000+ SAT questions database
│   └── .env.example            # Environment variables template
├── package.json                # Dependencies and scripts
├── vite.config.js              # Vite configuration
├── .gitignore                  # Git ignore rules
└── README.md                   # This file
```

## 🌐 Deployment

### Deploy to GitHub Pages

1. **Update the repository name** in `vite.config.js`:
   ```javascript
   base: '/satforge/',  // or your repo name
   ```

2. **Create a GitHub repository** named `satforge`

3. **Push your code**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/your-username/satforge.git
   git push -u origin main
   ```

4. **Enable GitHub Pages**
   - Go to your repository settings
   - Select "Pages" from the sidebar
   - Choose "GitHub Actions" as the source

5. **Deploy**
   ```bash
   npm run deploy
   ```

The app will be live at `https://your-username.github.io/satforge`

### Alternative: Deploy to Vercel

1. Connect your GitHub repository to [Vercel](https://vercel.com)
2. Vercel will automatically detect Vite and deploy
3. No additional configuration needed!

## 📊 Question Data Format

Each question in `questions.json` has this structure:

```json
{
  "id": 1,
  "topic": "Heart of Algebra",
  "subtopic": "Linear Equations",
  "points": 10,
  "question": "Solve for x: 2x + 5 = 15",
  "choices": ["5", "10", "15", "20"],
  "correct": 0,
  "explanation": "2x + 5 = 15 → 2x = 10 → x = 5",
  "trap": "Students might forget to subtract 5 before dividing by 2."
}
```

- **points**: Difficulty weight (10=easy, 15=medium, 20=hard, 25=very hard)
- **correct**: Zero-indexed position of correct answer
- **explanation**: Full worked solution
- **trap**: Most common student mistake

## 🔑 API Keys

### Anthropic API Setup

1. Sign up at [Anthropic Console](https://console.anthropic.com)
2. Create an API key
3. Add to `.env` file as `VITE_ANTHROPIC_API_KEY`

**Note**: Keep your API key private. Never commit `.env` to Git.

## 📝 Usage

### Practice Mode
1. Select a topic filter (optional)
2. Choose a difficulty level (optional)
3. Search for specific questions (optional)
4. Click "Show Explanation" after answering
5. Use pagination to browse more questions

### Test Mode
1. Click "Start Test" to begin a timed practice test
2. Answer questions one by one
3. Use Previous/Next to navigate
4. Submit when complete to see your score

### Analytics
- View your overall accuracy
- See topic-by-topic breakdown
- Track total questions practiced

### AI Tutor
- Ask questions about SAT topics
- Get AI-generated explanations
- Receive personalized guidance

## 🐛 Troubleshooting

### Port Already in Use
```bash
npm run dev -- --port 3000
```

### Build Errors
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### GitHub Pages Not Showing
- Ensure `base` in `vite.config.js` matches your repo name
- Check that GitHub Pages is enabled in repository settings
- Wait 1-2 minutes for the deployment to complete

## 📄 License

MIT License - feel free to use this project for your own SAT prep!

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For issues, questions, or suggestions, please open an issue on GitHub.

---

**Happy studying! Ace that SAT! 🚀**
