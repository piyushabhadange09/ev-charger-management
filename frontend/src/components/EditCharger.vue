<template>
  <div class="edit-container">
    <div class="form-box">
      <h2>✏️ Edit Charger</h2>
      <form @submit.prevent="updateCharger" class="charger-form">
        <input v-model="form.name" placeholder="Charger Name" required />
        <input v-model.number="form.location.lat" placeholder="Latitude" required />
        <input v-model.number="form.location.lng" placeholder="Longitude" required />
        <select v-model="form.status" required>
          <option>Active</option>
          <option>Inactive</option>
        </select>
        <input v-model.number="form.powerOutput" placeholder="Power Output (kW)" required />
        <input v-model="form.connectorType" placeholder="Connector Type" required />
        <button type="submit">Update</button>
        <router-link to="/chargers">
          <button type="button" class="cancel">Cancel</button>
        </router-link>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import api from '../axios';

const route = useRoute();
const router = useRouter();

const form = reactive({
  name: '',
  location: { lat: '', lng: '' },
  status: 'Active',
  powerOutput: '',
  connectorType: ''
});

onMounted(async () => {
  const { id } = route.params;
  const { data } = await api.get(`/stations/${id}`);

  // ✅ Directly assign to reactive object
  form.name = data.name || '';
  form.location.lat = data.location?.lat ?? '';
  form.location.lng = data.location?.lng ?? '';
  form.status = data.status || 'Active';
  form.powerOutput = data.powerOutput ?? '';
  form.connectorType = data.connectorType || '';
});

const updateCharger = async () => {
  const { id } = route.params;
  await api.put(`/stations/${id}`, form);
  router.push('/chargers');
};
</script>

<style scoped>
.edit-container {
  background: linear-gradient(to right, #fddb92, #d1fdff);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Segoe UI", sans-serif;
}

.form-box {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  width: 90%;
  max-width: 600px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
}

.form-box h2 {
  text-align: center;
  margin-bottom: 1rem;
}

.charger-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.charger-form input,
.charger-form select {
  padding: 0.6rem;
  border-radius: 6px;
  border: 1px solid #ccc;
}

.charger-form button {
  padding: 0.7rem;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
}

button[type="submit"] {
  background-color: #007bff;
  color: white;
}

button.cancel {
  background-color: #6c757d;
  color: white;
  margin-top: 0.5rem;
}
</style>
