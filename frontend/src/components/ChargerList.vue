<template>
  <div class="chargers-container">
    <div class="header">
      <h2>⚡ Charger Management</h2>
      <div class="header-buttons">
        <button class="logout" @click="logout">Logout</button>
        <router-link to="/map">
          <button class="map-button">View Map</button>
        </router-link>
      </div>
    </div>

    <div class="form-section">
      <h3>Add Charger</h3>
      <form @submit.prevent="saveCharger" class="charger-form">
        <input v-model="form.name" placeholder="Charger Name (e.g., Central Station)" required />
        <input v-model.number="form.location.lat" :placeholder="'Latitude (e.g., 37.7749)'" required />
        <input v-model.number="form.location.lng" :placeholder="'Longitude (e.g., -122.4194)'" required />
        <select v-model="form.status" required>
          <option disabled value="">Select Status</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>
        <input v-model.number="form.powerOutput" placeholder="Power Output in kW (e.g., 50)" required />
        <input v-model="form.connectorType" placeholder="Connector Type (e.g., CCS, Type2)" required />
        <button type="submit">{{ editing ? 'Update' : 'Save' }}</button>
      </form>
    </div>

    <div class="filter-section">
      <h3>🔍 Filter Chargers</h3>
      <div class="filter-form">
        <select v-model="filters.status">
          <option value="">All Statuses</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>
        <input v-model.number="filters.minPower" type="number" placeholder="Min Power Output" />
        <input v-model="filters.connector" type="text" placeholder="Connector Type" />
        <button class="clear-filter" @click="resetFilters">Clear</button>
      </div>
    </div>

    <div class="list-section">
      <h3>📋 Charger List</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Lat</th>
            <th>Lng</th>
            <th>Status</th>
            <th>Power</th>
            <th>Connector</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="c in filteredChargers" :key="c._id">
            <td>{{ c.name }}</td>
            <td>{{ c.location.lat }}</td>
            <td>{{ c.location.lng }}</td>
            <td>{{ c.status }}</td>
            <td>{{ c.powerOutput }} kW</td>
            <td>{{ c.connectorType }}</td>
            <td>
              <router-link :to="`/edit/${c._id}`">
                <button class="edit">Edit</button>
              </router-link>
              <button class="delete" @click="deleteCharger(c._id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import api from '../axios';

export default {
  data() {
    return {
      chargers: [],
      form: {
        name: '',
        location: { lat: '', lng: '' },
        status: '',
        powerOutput: '',
        connectorType: ''
      },
      filters: {
        status: '',
        minPower: 0,
        connector: ''
      }
    };
  },
  async mounted() {
    await this.loadChargers();
  },
  computed: {
    filteredChargers() {
      return this.chargers.filter((c) => {
        const matchesStatus = !this.filters.status || c.status === this.filters.status;
        const matchesPower = c.powerOutput >= this.filters.minPower;
        const matchesConnector = c.connectorType
          .toLowerCase()
          .includes(this.filters.connector.toLowerCase());
        return matchesStatus && matchesPower && matchesConnector;
      });
    }
  },
  methods: {
    async loadChargers() {
      const res = await api.get('/stations');
      this.chargers = res.data;
    },
    async saveCharger() {
      await api.post('/stations', this.form);
      this.resetForm();
      this.loadChargers();
    },
    async deleteCharger(id) {
      await api.delete(`/stations/${id}`);
      this.loadChargers();
    },
    resetForm() {
      this.form = {
        name: '',
        location: { lat: '', lng: '' },
        status: '',
        powerOutput: '',
        connectorType: ''
      };
    },
    resetFilters() {
      this.filters = {
        status: '',
        minPower: 0,
        connector: ''
      };
    },
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
/* ✅ Styling remains the same, unchanged */
.chargers-container {
  background: linear-gradient(to right, #d4fc79, #96e6a1);
  min-height: 100vh;
  padding: 2rem;
  font-family: 'Segoe UI', sans-serif;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.header h2 {
  color: #222;
  font-size: 28px;
}

.header-buttons {
  display: flex;
  gap: 1rem;
}

.logout {
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 0.6rem 1rem;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
}

.logout:hover {
  background-color: #cc0000;
}

.map-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.6rem 1rem;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
}

.map-button:hover {
  background-color: #0056b3;
}

.form-section,
.filter-section,
.list-section {
  background-color: white;
  padding: 1.5rem;
  border-radius: 10px;
  margin-bottom: 2rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.charger-form,
.filter-form {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
}

.charger-form input,
.charger-form select,
.filter-form input,
.filter-form select {
  flex: 1 1 200px;
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid #ccc;
}

.charger-form button {
  padding: 0.5rem 1rem;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
}

.charger-form button:hover {
  background-color: #218838;
}

.clear-filter {
  background-color: #6c757d;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
}

.clear-filter:hover {
  background-color: #5a6268;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

th,
td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f2f2f2;
  font-weight: 600;
}

.edit {
  background-color: #ffc107;
  border: none;
  color: #333;
  padding: 0.4rem 0.7rem;
  margin-right: 5px;
  border-radius: 5px;
  cursor: pointer;
}

.delete {
  background-color: #dc3545;
  border: none;
  color: white;
  padding: 0.4rem 0.7rem;
  border-radius: 5px;
  cursor: pointer;
}
</style>
