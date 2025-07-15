mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

const cities = [
  { name: "Lahore", lat: 31.5204, lon: 74.3587 },
  { name: "Karachi", lat: 24.8607, lon: 67.0011 },
  { name: "Islamabad", lat: 33.6844, lon: 73.0479 },
  { name: "Quetta", lat: 30.1798, lon: 66.9750 },
  { name: "Peshawar", lat: 34.0151, lon: 71.5249 }
];

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/light-v10',
  center: [69.3451, 30.3753],
  zoom: 4.5
});

cities.forEach(async (city) => {
  try {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${import.meta.env.VITE_OPENWEATHER_KEY}&units=metric`);
    const data = await res.json();
    const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
      `<strong>${city.name}</strong><br>Temp: ${data.main.temp}°C<br>Condition: ${data.weather[0].main}`
    );

    new mapboxgl.Marker().setLngLat([city.lon, city.lat]).setPopup(popup).addTo(map);
  } catch (err) {
    console.error("Weather error for", city.name, err);
  }
});
