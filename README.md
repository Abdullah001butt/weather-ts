# 🌤️ Weather TypeScript App

A modern, responsive weather application built with TypeScript and Vite, providing real-time weather information using the OpenWeather API.

## ✨ Features

- 🌡️ Real-time weather data
- 🔍 Search weather by city name
- 📱 Responsive design for all devices
- ⚡ Fast and lightweight with Vite
- 🎨 Modern UI/UX design
- 🌍 Global weather coverage
- 📊 Detailed weather metrics

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager
- OpenWeather API key

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Abdullah001butt/weather-ts.git
```

2. **Navigate to project directory**
```bash
cd weather-ts
```

3. **Install dependencies**
```bash
npm install
```

4. **Environment Setup**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_OPENWEATHER_API_KEY=your_api_key_here
   ```
   
   > 🔑 Get your free API key from [OpenWeather](https://openweathermap.org/api)

5. **Start development server**
```bash
npm run dev
```

## 🛠️ Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run type-check` | Run TypeScript compiler check |

## 🏗️ Tech Stack

- **Frontend Framework**: Vite + TypeScript
- **Styling**: CSS3 / SCSS (or your preferred styling solution)
- **API**: OpenWeather API
- **Build Tool**: Vite
- **Package Manager**: npm

## 📁 Project Structure

```
weather-ts/
├── public/
│   ├── favicon.ico
│   └── index.html
├── src/
│   ├── components/
│   │   ├── WeatherCard/
│   │   ├── SearchBar/
│   │   └── LoadingSpinner/
│   ├── services/
│   │   └── weatherApi.ts
│   ├── types/
│   │   └── weather.ts
│   ├── utils/
│   ├── styles/
│   ├── App.tsx
│   └── main.tsx
├── .env
├── .gitignore
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🌐 API Integration

This application uses the OpenWeather API to fetch weather data. The API provides:

- Current weather conditions
- Temperature, humidity, and pressure
- Wind speed and direction
- Weather descriptions and icons
- Sunrise and sunset times

### API Endpoints Used

- **Current Weather**: `https://api.openweathermap.org/data/2.5/weather`
- **5-Day Forecast**: `https://api.openweathermap.org/data/2.5/forecast`

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Vercel

```bash
npm install -g vercel
vercel --prod
```

### Deploy to Netlify

```bash
npm run build
# Upload dist/ folder to Netlify
```

### Environment Variables for Production

Make sure to set the following environment variable in your deployment platform:

```
VITE_OPENWEATHER_API_KEY=your_production_api_key
```

## 🔧 Configuration

### Vite Configuration

The project uses Vite for fast development and optimized builds. Configuration can be found in `vite.config.ts`.

### TypeScript Configuration

TypeScript settings are configured in `tsconfig.json` for strict type checking and modern JavaScript features.

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed


## 👨‍💻 Author

**Abdullah Butt**
- GitHub: [@Abdullah001butt](https://github.com/Abdullah001butt)

## 🙏 Acknowledgments

- [OpenWeather](https://openweathermap.org/) for providing the weather API
- [Vite](https://vitejs.dev/) for the amazing build tool
- [TypeScript](https://www.typescriptlang.org/) for type safety

---

<div align="center">
  <p>Made with ❤️ by Abdullah Butt</p>
  <p>⭐ Star this repo if you found it helpful!</p>
</div>
