<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { fetchData } from '@/services/api.js';

const router = useRouter();

// FORM STATE
const nom = ref("");
const prenom = ref("");
const age = ref("");
const email = ref("");
const number = ref("");
const role = ref("admin");
const password = ref('')
const showToast = ref(false);
const rolesDisponibles = ref([
  { id: "admin", label: "Administrateur", icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" },
  { id: "recept", label: "Réceptionniste", icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" },
  { id: "Doctor", label: "Médecin / Expert", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" }
]);



async function addUsers() {
  if (!nom.value || !prenom.value || !email.value) return;

  const url = 'http://localhost:3000/api/users';
  const m = "POST";
  const body = {
    username: prenom.value,
    firstname: nom.value,
    role: role.value,
    password: password.value,
    telephone: number.value,
    email: email.value,
    age: age.value,
  }

  const data = await fetchData(url, m, body);
  console.log(data);
  

  // Reset
  nom.value = prenom.value = age.value = email.value = number.value = "";
  role.value = "admin";
  password.value = "";

  showToast.value = true;
  setTimeout(() => { showToast.value = false; }, 3000);
}

const goBack = () => router.push('/users');
</script>

<template>
  <div class="page-container">
    <Transition name="slide-down">
      <div v-if="showToast" class="modern-toast">
        <div class="toast-content">
          <div class="toast-icon-wrapper">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
              <path d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <span>Profil créé avec succès</span>
        </div>
      </div>
    </Transition>

    <div class="form-shell">
      <header class="form-header">
        <button @click="goBack" class="back-link">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div class="header-text">
          <h1>Nouveau Collaborateur</h1>
          <p>Remplissez les informations d'accès</p>
        </div>
      </header>

      <form @submit.prevent="addUsers" class="main-form">
        <div class="form-section">
          <div class="section-title">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <h3>Identité</h3>
          </div>

          <div class="grid-2">
            <div class="input-box">
              <label>Nom</label>
              <input v-model="nom" type="text" placeholder="ex: Koulibaly" required>
            </div>
            <div class="input-box">
              <label>Prénom</label>
              <input v-model="prenom" type="text" placeholder="ex: Jean" required>
            </div>
          </div>

          <div class="grid-2 mt">
            <div class="input-box">
              <label>Âge</label>
              <input v-model="age" type="number" placeholder="25">
            </div>
            <div class="input-box">
              <label>Rôle Système</label>
              <div class="select-wrapper">
                <select v-model="role">
                  <option v-for="r in rolesDisponibles" :key="r.id" :value="r.id">{{ r.label }}</option>
                </select>
                <svg class="select-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div class="form-section">
          <div class="section-title">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <h3>Coordonnées</h3>
          </div>

          <div class="input-box">
            <label>Email Professionnel</label>
            <input v-model="email" type="email" placeholder="nom@hopital.com" required>
          </div>

          <div class="input-box mt">
            <label>Téléphone</label>
            <input v-model="number" type="number" placeholder="+229 -- -- -- --">
          </div>
          <div class="input-box mt">
            <label>Mot de passe</label>
            <input v-model="password" type="password" placeholder="••••••••" required>
          </div>
        </div>

        <div class="form-footer">
          <button type="submit" class="btn-submit">
            <span>Enregistrer le profil</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.page-container {
  min-height: 100vh;
  background-color: #f8fafc;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
  font-family: 'Inter', sans-serif;
}

.form-shell {
  background: white;
  width: 100%;
  max-width: 600px;
  border-radius: 24px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

/* --- HEADER --- */
.form-header {
  padding: 32px;
  background: #0f172a;
  color: white;
  display: flex;
  align-items: center;
  gap: 20px;
}

.back-link {
  background: rgba(255, 255, 255, 0.1);
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.2s;
}

.back-link:hover {
  background: rgba(255, 255, 255, 0.2);
}

.back-link svg {
  width: 18px;
}

.header-text h1 {
  font-size: 1.25rem;
  font-weight: 800;
  margin: 0;
}

.header-text p {
  font-size: 0.85rem;
  color: #94a3b8;
  margin: 4px 0 0;
}

/* --- FORM SECTIONS --- */
.main-form {
  padding: 32px;
}

.form-section {
  margin-bottom: 32px;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  color: #64748b;
}

.section-title svg {
  width: 18px;
}

.section-title h3 {
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin: 0;
}

.grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.mt {
  margin-top: 16px;
}

/* --- INPUTS --- */
.input-box {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.input-box label {
  font-size: 0.85rem;
  font-weight: 700;
  color: #1e293b;
}

input,
select {
  background: #f8fafc;
  border: 1.5px solid #e2e8f0;
  padding: 12px 16px;
  border-radius: 12px;
  font-size: 0.95rem;
  color: #0f172a;
  transition: all 0.2s;
}

input:focus,
select:focus {
  outline: none;
  border-color: #0d9488;
  background: white;
  box-shadow: 0 0 0 4px rgba(13, 148, 136, 0.1);
}

.select-wrapper {
  position: relative;
}

.select-arrow {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 14px;
  color: #94a3b8;
  pointer-events: none;
}

select {
  appearance: none;
  width: 100%;
}

/* --- FOOTER & BUTTON --- */
.form-footer {
  margin-top: 40px;
}

.btn-submit {
  width: 100%;
  background: #0d9488;
  color: white;
  border: none;
  padding: 16px;
  border-radius: 16px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  transition: all 0.3s;
}

.btn-submit:hover {
  background: #0f766e;
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(13, 148, 136, 0.3);
}

.btn-submit svg {
  width: 18px;
  transition: transform 0.2s;
}

.btn-submit:hover svg {
  transform: translateX(4px);
}

/* --- TOAST --- */
.modern-toast {
  position: fixed;
  top: 24px;
  left: 50%;
  transform: translateX(-50%);
  background: #1e293b;
  color: white;
  padding: 12px 20px;
  border-radius: 100px;
  z-index: 1000;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2);
}

.toast-content {
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 600;
  font-size: 0.9rem;
}

.toast-icon-wrapper {
  background: #10b981;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.toast-icon-wrapper svg {
  width: 14px;
}

/* ANIMATIONS */
.slide-down-enter-active {
  animation: slideIn 0.4s ease-out;
}

@keyframes slideIn {
  from {
    transform: translate(-50%, -100%);
    opacity: 0;
  }

  to {
    transform: translate(-50%, 0);
    opacity: 1;
  }
}

@media (max-width: 500px) {
  .grid-2 {
    grid-template-columns: 1fr;
  }
}
</style>