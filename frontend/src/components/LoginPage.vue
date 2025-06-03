<template>
  <div class="login-container">
    <div class="login-box">
      <h2>🔌 EV Charger Login</h2>
      <form @submit.prevent="login">
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
      <p class="error" v-if="error">{{ error }}</p>
      <p class="link">
        Don't have an account?
        <router-link to="/register">Register here</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '../axios';

const email = ref('');
const password = ref('');
const error = ref('');
const router = useRouter();

const login = async () => {
  try {
    const res = await api.post('/auth/login', {
      email: email.value,
      password: password.value,
    });
    localStorage.setItem('token', res.data.token);
    router.push('/chargers');
  } catch (err) {
    error.value = '❌ Invalid credentials or server error';
  }
};
</script>

<style scoped>
.login-container {
  background: linear-gradient(to right, #4facfe, #00f2fe);
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Segoe UI", sans-serif;
}

.login-box {
  background-color: #ffffff;
  padding: 2rem 3rem;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  text-align: center;
  width: 350px;
}

.login-box h2 {
  margin-bottom: 1.5rem;
  font-size: 24px;
  color: #333;
}

.login-box input {
  display: block;
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
}

.login-box button {
  background-color: #0077ff;
  color: white;
  border: none;
  padding: 0.75rem;
  width: 100%;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s ease;
}

.login-box button:hover {
  background-color: #005cd4;
}

.error {
  color: red;
  margin-top: 10px;
}

.link {
  margin-top: 1rem;
  font-size: 14px;
}
</style>
