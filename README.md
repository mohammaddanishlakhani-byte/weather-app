# 🌤️ Weather Forecast App

A modern, responsive **Weather Forecast Web Application** that provides real-time weather information and a 5-day forecast using the **OpenWeatherMap API**. This project is designed to be fast, lightweight, user-friendly, and visually appealing, making it suitable for learning, portfolios, and real-world use.

---

## 🚀 Live Demo

🌐 **Deployed on GitHub Pages**
👉 [https://mohammaddanishlakhani-byte.github.io/weather-app/](https://mohammaddanishlakhani-byte.github.io/weather-app/)

---

## ✨ Key Features

* 🌡️ **Current Weather Data**
  Displays temperature, weather condition, humidity, wind speed, and atmospheric pressure.

* 📅 **5-Day Weather Forecast**
  Shows upcoming weather predictions with icons and temperature trends.

* 📍 **Location-Based Weather**
  Automatically fetches weather data using the user’s current GPS location.

* 🔄 **Unit Conversion**
  Toggle between **Celsius (°C)** and **Fahrenheit (°F)**.

* 📱 **Fully Responsive Design**
  Optimized for desktop, tablet, and mobile devices.

* ⚠️ **Robust Error Handling**
  Handles invalid city names, network issues, API errors, and location permission denial.

* 🎨 **Modern UI & Animations**
  Clean layout with gradients, cards, smooth transitions, and glass-morphism effects.

---

## 🛠️ Technologies Used

* **HTML5** – Semantic structure
* **CSS3** – Flexbox, Grid, animations, responsive design
* **JavaScript (ES6+)** – Logic and API integration
* **OpenWeatherMap API** – Real-time weather data
* **Font Awesome** – UI icons
* **Weather Icons** – Weather-specific icons

---

## 📦 Installation & Setup

### Option 1: Run Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/mohammaddanishlakhani-byte/weather-app.git
   ```
2. Navigate to the project folder:

   ```bash
   cd weather-app
   ```
3. Open `index.html` in your browser.

➡️ The application will load immediately (London weather is displayed by default).

---

### Option 2: Deploy Online

1. Upload all project files to any static hosting service (GitHub Pages, Netlify, Vercel, etc.)
2. Access the app via your hosted URL
3. No backend or build process required

---

## 🔑 API Configuration

This project uses the **OpenWeatherMap API**. The API key is already configured inside `script.js`:

```javascript
const API_KEY = '61ada554e45a274de44c94a30a55bcc8';
```

### 🔐 Getting Your Own API Key (Recommended for Public Projects)

1. Visit **OpenWeatherMap**
2. Create a free account
3. Generate an API key from the dashboard
4. Replace the existing key in `script.js`

---

## 📱 How to Use the App

* 🔍 **Search City**: Enter any city name and press Enter or click the search button
* 📍 **Use Current Location**: Click the location button to fetch weather via GPS
* 🌡️ **Switch Units**: Toggle between °C and °F
* 📊 **View Forecast**: Scroll down to see the 5-day forecast section

---

## 📁 Project Structure

```text
weather-app/
├── index.html          # Main HTML file
├── style.css           # Styling and responsive design
├── script.js           # JavaScript logic & API handling
├── README.md           # Project documentation
└── assets/             # Images/icons (optional)
```

---

## 🌐 API Endpoints Used

* **Current Weather API**
  `https://api.openweathermap.org/data/2.5/weather`

* **5-Day Forecast API**
  `https://api.openweathermap.org/data/2.5/forecast`

---

## ✅ Browser Compatibility

* Chrome 60+
* Firefox 55+
* Safari 10.1+
* Edge 79+
* Mobile browsers (Android & iOS)

---

## 🎨 UI & Design Highlights

* 🌈 Gradient background
* 🧊 Glass-morphism card design
* 🧩 Card-based layout
* 📐 Responsive grid system
* ✨ Smooth hover and fade-in animations

---

## 🛡️ Error Handling Scenarios

* Invalid or misspelled city names
* Network connectivity issues
* API key or rate-limit errors
* Location permission denial
* Unsupported browser features

---

## 📊 API Limitations (Free Tier)

* 60 API calls per minute
* Access to current weather & 5-day forecast
* No historical weather data
* Suitable for educational and personal projects

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a new feature branch
3. Commit your changes
4. Push to your branch
5. Open a Pull Request

---

## 📄 License

This project is created for **educational and learning purposes**.

Usage of the OpenWeatherMap API is subject to their official **Terms of Service**.

---

## 🙏 Credits

* Weather data provided by **OpenWeatherMap**
* Icons by **Font Awesome** and **Weather Icons**
* UI inspiration from modern weather applications

---

## 📬 Contact

For suggestions, issues, or improvements, please open an **issue** in this repository.

---

### ⭐ If you found this project helpful, consider giving it a star on GitHub!

Made with ❤️ by **Mohammad Danish Lakhani**
