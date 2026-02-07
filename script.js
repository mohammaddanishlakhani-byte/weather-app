// API Configuration - ONLY OpenWeatherMap
const API_KEY = '61ada554e45a274de44c94a30a55bcc8'; // Your active OpenWeatherMap API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// DOM Elements
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const locationBtn = document.getElementById('location-btn');
const cityName = document.getElementById('city-name');
const temperature = document.getElementById('temperature');
const weatherDescription = document.getElementById('weather-description');
const weatherIcon = document.getElementById('weather-icon');
const feelsLike = document.getElementById('feels-like');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');
const pressure = document.getElementById('pressure');
const forecastContainer = document.getElementById('forecast-container');
const errorMessage = document.getElementById('error-message');
const errorText = document.getElementById('error-text');
const loadingOverlay = document.getElementById('loading-overlay');
const unitButtons = document.querySelectorAll('.unit-btn');
const tempUnit = document.querySelector('.temp-unit');
const updateTime = document.getElementById('update-time');
const apiStatusText = document.getElementById('api-status-text');

// Global Variables
let currentUnit = 'metric';
let currentCity = 'London';

// Weather Icon Mapping for OpenWeatherMap
const weatherIcons = {
    // Day icons
    '01d': 'wi-day-sunny',
    '02d': 'wi-day-cloudy',
    '03d': 'wi-cloud',
    '04d': 'wi-cloudy',
    '09d': 'wi-rain',
    '10d': 'wi-day-rain',
    '11d': 'wi-thunderstorm',
    '13d': 'wi-snow',
    '50d': 'wi-fog',
    // Night icons
    '01n': 'wi-night-clear',
    '02n': 'wi-night-cloudy',
    '03n': 'wi-cloud',
    '04n': 'wi-cloudy',
    '09n': 'wi-rain',
    '10n': 'wi-night-rain',
    '11n': 'wi-thunderstorm',
    '13n': 'wi-snow',
    '50n': 'wi-fog'
};

// Initialize the app
function init() {
    console.log('Weather App Initializing...');
    console.log('API Key:', API_KEY ? '✓ Loaded' : '✗ Missing');
    
    // Test API connection
    testAPIConnection();
    
    // Load default city weather
    getWeatherByCity(currentCity);
    
    // Setup event listeners
    setupEventListeners();
    
    // Update API status
    updateAPIStatus('Connected to OpenWeatherMap');
}

// Test API connection
async function testAPIConnection() {
    try {
        const response = await fetch(`${BASE_URL}/weather?q=London&appid=${API_KEY}`);
        if (response.ok) {
            console.log('✓ OpenWeatherMap API is working');
            updateAPIStatus('Connected to OpenWeatherMap');
        } else {
            console.error('✗ API Error:', response.status);
            updateAPIStatus('API Error - Check Connection', 'error');
        }
    } catch (error) {
        console.error('✗ API Connection Failed:', error);
        updateAPIStatus('Connection Failed', 'error');
    }
}

// Update API status display
function updateAPIStatus(status, type = 'success') {
    if (apiStatusText) {
        apiStatusText.textContent = status;
        apiStatusText.className = type === 'error' ? 'api-status-error' : '';
    }
}

// Setup event listeners
function setupEventListeners() {
    // Search button
    searchBtn.addEventListener('click', handleSearch);
    
    // Enter key in input
    cityInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });
    
    // Location button
    locationBtn.addEventListener('click', getWeatherByLocation);
    
    // Unit toggle buttons
    unitButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            unitButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Update unit
            currentUnit = btn.dataset.unit;
            tempUnit.textContent = currentUnit === 'metric' ? '°C' : '°F';
            
            // Reload weather with new unit
            if (currentCity) {
                getWeatherByCity(currentCity);
            }
        });
    });
    
    // Input focus
    cityInput.addEventListener('focus', function() {
        this.select();
    });
}

// Handle search
function handleSearch() {
    const city = cityInput.value.trim();
    if (city) {
        getWeatherByCity(city);
        cityInput.value = '';
    } else {
        showError('Please enter a city name');
    }
}

// Show loading spinner
function showLoading() {
    loadingOverlay.classList.remove('hidden');
}

// Hide loading spinner
function hideLoading() {
    loadingOverlay.classList.add('hidden');
}

// Show error message
function showError(message) {
    errorText.textContent = message;
    errorMessage.classList.remove('hidden');
    
    // Hide error after 5 seconds
    setTimeout(() => {
        errorMessage.classList.add('hidden');
    }, 5000);
}

// Get weather by city name
async function getWeatherByCity(city) {
    showLoading();
    currentCity = city;
    
    try {
        // Fetch current weather
        const weatherData = await fetchWeather(city);
        
        // Fetch forecast
        const forecastData = await fetchForecast(city);
        
        // Update display
        updateWeatherDisplay(weatherData, forecastData);
        updateUpdateTime();
        
        hideLoading();
        
    } catch (error) {
        hideLoading();
        console.error('Error:', error);
        
        if (error.message.includes('404')) {
            showError('City not found. Please check the spelling and try again.');
        } else if (error.message.includes('401')) {
            showError('API key error. Please check your OpenWeatherMap API key.');
            updateAPIStatus('API Key Error', 'error');
        } else if (error.message.includes('network')) {
            showError('Network error. Please check your internet connection.');
        } else {
            showError('Unable to fetch weather data. Please try again.');
        }
    }
}

// Fetch current weather
async function fetchWeather(city) {
    const response = await fetch(
        `${BASE_URL}/weather?q=${encodeURIComponent(city)}&units=${currentUnit}&appid=${API_KEY}`
    );
    
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }
    
    return await response.json();
}

// Fetch 5-day forecast
async function fetchForecast(city) {
    const response = await fetch(
        `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&units=${currentUnit}&appid=${API_KEY}`
    );
    
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }
    
    return await response.json();
}

// Get weather by user's location
async function getWeatherByLocation() {
    if (!navigator.geolocation) {
        showError('Geolocation is not supported by your browser');
        return;
    }
    
    showLoading();
    
    try {
        // Get current position
        const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            });
        });
        
        const { latitude, longitude } = position.coords;
        
        // Fetch weather by coordinates
        const weatherResponse = await fetch(
            `${BASE_URL}/weather?lat=${latitude}&lon=${longitude}&units=${currentUnit}&appid=${API_KEY}`
        );
        
        if (!weatherResponse.ok) {
            throw new Error(`HTTP ${weatherResponse.status}`);
        }
        
        const weatherData = await weatherResponse.json();
        
        // Fetch forecast by coordinates
        const forecastResponse = await fetch(
            `${BASE_URL}/forecast?lat=${latitude}&lon=${longitude}&units=${currentUnit}&appid=${API_KEY}`
        );
        
        let forecastData = null;
        if (forecastResponse.ok) {
            forecastData = await forecastResponse.json();
        }
        
        // Update display
        updateWeatherDisplay(weatherData, forecastData);
        updateUpdateTime();
        
        hideLoading();
        
    } catch (error) {
        hideLoading();
        console.error('Location Error:', error);
        
        if (error.code === error.PERMISSION_DENIED) {
            showError('Location access was denied. Please allow location access.');
        } else if (error.code === error.POSITION_UNAVAILABLE) {
            showError('Location information is unavailable.');
        } else if (error.code === error.TIMEOUT) {
            showError('Location request timed out. Please try again.');
        } else {
            showError('Unable to get your location. Please search for a city instead.');
        }
    }
}

// Update weather display
function updateWeatherDisplay(weatherData, forecastData) {
    // Update city name
    cityName.textContent = `${weatherData.name}, ${weatherData.sys.country}`;
    
    // Update temperature
    temperature.textContent = Math.round(weatherData.main.temp);
    
    // Update weather description
    const description = weatherData.weather[0].description;
    weatherDescription.textContent = description.charAt(0).toUpperCase() + description.slice(1);
    
    // Update weather icon
    const iconCode = weatherData.weather[0].icon;
    weatherIcon.className = `wi ${weatherIcons[iconCode] || 'wi-day-sunny'}`;
    
    // Update weather details
    feelsLike.textContent = `${Math.round(weatherData.main.feels_like)}${currentUnit === 'metric' ? '°C' : '°F'}`;
    humidity.textContent = `${weatherData.main.humidity}%`;
    windSpeed.textContent = `${weatherData.wind.speed} ${currentUnit === 'metric' ? 'm/s' : 'mph'}`;
    pressure.textContent = `${weatherData.main.pressure} hPa`;
    
    // Update forecast
    if (forecastData) {
        updateForecastDisplay(forecastData);
    }
}

// Update forecast display
function updateForecastDisplay(forecastData) {
    // Clear previous forecast
    forecastContainer.innerHTML = '';
    
    // Group forecast by day
    const dailyForecasts = {};
    
    forecastData.list.forEach(item => {
        const date = new Date(item.dt * 1000);
        const dateString = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
        const dayKey = date.toLocaleDateString('en-US', { weekday: 'long' });
        
        if (!dailyForecasts[dayKey]) {
            dailyForecasts[dayKey] = {
                date: dateString,
                temps: [],
                icons: [],
                descriptions: []
            };
        }
        
        // Only consider forecasts around noon (12 PM) for daily representation
        const hour = date.getHours();
        if (hour >= 11 && hour <= 13) {
            dailyForecasts[dayKey].temps.push(item.main.temp);
            dailyForecasts[dayKey].icons.push(item.weather[0].icon);
            dailyForecasts[dayKey].descriptions.push(item.weather[0].description);
        }
    });
    
    // Get next 5 days
    const days = Object.keys(dailyForecasts).slice(0, 5);
    
    // Create forecast elements
    days.forEach(dayKey => {
        const dayData = dailyForecasts[dayKey];
        
        if (dayData.temps.length > 0) {
            // Calculate average temperature
            const avgTemp = dayData.temps.reduce((a, b) => a + b, 0) / dayData.temps.length;
            
            // Get most common icon and description
            const mostCommonIcon = getMostCommon(dayData.icons);
            const mostCommonDesc = getMostCommon(dayData.descriptions);
            
            const forecastElement = document.createElement('div');
            forecastElement.className = 'forecast-day';
            forecastElement.innerHTML = `
                <div class="forecast-date">${dayKey}<br>${dayData.date}</div>
                <div class="forecast-icon">
                    <i class="wi ${weatherIcons[mostCommonIcon] || 'wi-day-sunny'}"></i>
                </div>
                <div class="forecast-temp">${Math.round(avgTemp)}${currentUnit === 'metric' ? '°C' : '°F'}</div>
                <div class="forecast-desc">${mostCommonDesc.charAt(0).toUpperCase() + mostCommonDesc.slice(1)}</div>
            `;
            
            forecastContainer.appendChild(forecastElement);
        }
    });
    
    // If no forecast days, show placeholder
    if (forecastContainer.children.length === 0) {
        forecastContainer.innerHTML = `
            <div class="forecast-placeholder">
                <i class="fas fa-cloud-sun"></i>
                <p>5-day forecast not available for this location</p>
            </div>
        `;
    }
}

// Get most common item in array
function getMostCommon(arr) {
    const frequency = {};
    let maxFreq = 0;
    let mostCommon = arr[0];
    
    arr.forEach(item => {
        frequency[item] = (frequency[item] || 0) + 1;
        if (frequency[item] > maxFreq) {
            maxFreq = frequency[item];
            mostCommon = item;
        }
    });
    
    return mostCommon;
}

// Update time display
function updateUpdateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
    });
    updateTime.textContent = `Updated: ${timeString}`;
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);