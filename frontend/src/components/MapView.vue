<!-- <template>
  <div class="map-page">
    <h2>🗺️ Charger Map View</h2>
    <div ref="mapContainer" id="map" class="map-wrapper"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import api from '../axios';

const mapContainer = ref(null);

onMounted(async () => {
  await nextTick(); // ensure DOM is ready

  const res = await api.get('/stations');

  const map = L.map(mapContainer.value).setView([20, 78], 5);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
  }).addTo(map);

  setTimeout(() => {
    map.invalidateSize(); // fix map rendering
  }, 300);

  res.data.forEach(station => {
    const { lat, lng } = station.location;
    const popupContent = `
      <div style="font-size: 14px; line-height: 1.5;">
        <strong>${station.name}</strong><br/>
        📍 <b>Location:</b> ${lat}, ${lng}<br/>
        ⚡ <b>Power:</b> ${station.powerOutput} kW<br/>
        🔌 <b>Connector:</b> ${station.connectorType}<br/>
        🔄 <b>Status:</b> ${station.status}
      </div>
    `;
    L.marker([lat, lng]).addTo(map).bindPopup(popupContent);
  });
});
</script>

<style scoped>
@import "leaflet/dist/leaflet.css";

.map-page {
  min-height: 100vh;
  padding: 2rem;
  font-family: "Segoe UI", sans-serif;
  background: linear-gradient(to right, #654ea3, #eaafc8);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.map-page h2 {
  color: #333;
  margin-bottom: 1rem;
  font-size: 24px;
}

.map-wrapper {
  height: 500px;
  width: 100%;
  max-width: 900px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  border: 2px solid #ddd;
}
</style> -->

<template>
  <div class="map-page">
    <h2>🗺️ Charger Map View</h2>
    <div id="map" class="map-wrapper"></div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import api from '../axios';

onMounted(async () => {
  const map = L.map('map').setView([20, 78], 5);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
  }).addTo(map);

  // Fetch chargers
  try {
    const res = await api.get('/stations');

    res.data.forEach(station => {
      const { lat, lng } = station.location;

      if (!lat || !lng) return;

      const popupContent = `
        <div>
          <strong>${station.name}</strong><br />
          Status: ${station.status}<br />
          Power: ${station.powerOutput} kW<br />
          Connector: ${station.connectorType}<br />
          Lat: ${lat}, Lng: ${lng}
        </div>
      `;

      L.marker([lat, lng])
        .addTo(map)
        .bindPopup(popupContent);
    });

    // Fix layout glitch
    setTimeout(() => map.invalidateSize(), 200);
  } catch (err) {
    console.error('Failed to load chargers:', err);
  }
});
</script>

<style scoped>
@import "leaflet/dist/leaflet.css";

.map-page {
  background: linear-gradient(to right, #654ea3, #eaafc8);
  min-height: 100vh;
  padding: 2rem;
  font-family: "Segoe UI", sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.map-page h2 {
  color: #333;
  font-size: 24px;
  margin-bottom: 1rem;
}

.map-wrapper {
  height: 500px;
  width: 100%;
  max-width: 900px;
  border: 2px solid #ccc;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
</style>
