<template>
  <div class="register-container">
    <div class="register-box">
      <h2>📝 Register New User</h2>
      <form @submit.prevent="register">
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Password" required />
        <button type="submit">Register</button>
      </form>
      <p class="error" v-if="error">{{ error }}</p>
      <p class="success" v-if="success">{{ success }}</p>
      <p class="link">
        Already have an account?
        <router-link to="/">Login</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import api from '../axios';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const error = ref('');
const success = ref('');
const router = useRouter();

const register = async () => {
  try {
    await api.post('/auth/signup', {
      email: email.value,
      password: password.value,
    });
    success.value = '🎉 Registration successful! You can now log in.';
    error.value = '';
    // Optionally auto-redirect:
    setTimeout(() => router.push('/'), 2000);
  } catch (err) {
    error.value = '⚠️ Registration failed (maybe user already exists)';
    success.value = '';
  }
};
</script>

<style scoped>
.register-container {
  background: linear-gradient(to right, #fc5c7d, #6a82fb);
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Segoe UI", sans-serif;
}

.register-box {
  background-color: #ffffff;
  padding: 2rem 3rem;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  text-align: center;
  width: 350px;
}

.register-box h2 {
  margin-bottom: 1.5rem;
  font-size: 24px;
  color: #333;
}

.register-box input {
  display: block;
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
}

.register-box button {
  background-color: #6a82fb;
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

.register-box button:hover {
  background-color: #4a63d6;
}

.error {
  color: red;
  margin-top: 10px;
}
.success {
  color: green;
  margin-top: 10px;
}
.link {
  margin-top: 1rem;
  font-size: 14px;
}
</style>
