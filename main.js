import { cities } from './components/cities.js';

const map = L.map('map').setView([30.3753, 69.3451], 5);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

const apiKey = "de5775e7e73a0a3b04828838b3393916";

cities.forEach(async (city) => {
  try {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${apiKey}&units=metric`);
    const data = await res.json();
    const popupText = `
      <strong>${city.name}</strong><br>
      Temp: ${data.main.temp}°C<br>
      Humidity: ${data.main.humidity}%<br>
      Wind: ${data.wind.speed} m/s<br>
      Weather: ${data.weather[0].main}
    `;
    L.marker([city.lat, city.lon]).addTo(map).bindPopup(popupText);
  } catch (err) {
    console.error("Weather error for", city.name, err);
  }
});
