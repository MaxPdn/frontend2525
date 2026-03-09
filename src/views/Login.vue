<script setup>
import { ref, watch, onMounted } from "vue";
import { useRouter } from "vue-router";
import { users } from "@/services/data";
import { login } from "@/services/auth";

const router = useRouter();
const err = ref();
const username = ref("");
const mdp = ref("");

async function verify() {
  err.value = "";
  if (!username.value || !mdp.value) {
    showError("Veuillez remplir tous les champs");
    return;
  }

  const success = await login(username.value, mdp.value);
  if (!success) {
    showError("Identifiants incorrects");
    return;
  }
  const currUser = users.value.find(
    (u) => u.username.toLowerCase() === username.value.toLowerCase(),
  );
  console.log(currUser);
  
  if (!currUser) {
    showError("Utilisateur introuvable");
    return;
  }

  const routes = {
    admin: "/admindash",
    doctor: "/doctordash",
    recept: "/receptdash",
  };
  router.push(routes[currUser.role] || "/");
}

function showError(message, duration = 3000) {
  err.value = message;
  setTimeout(() => {
    err.value = "";
  }, duration);
}

watch(users, (newValue) => {
  console.log("Users changé:", newValue);
});
</script>

<template>
  <div class="login-wrapper">
    <div class="bg-decoration">
      <div class="circle c1"></div>
      <div class="circle c2"></div>
    </div>

    <form @submit.prevent="verify" class="login-card">
      <div class="card-header">
        <div class="brand-badge">+</div>
        <h1>Hospit<span>Manage</span></h1>
        <p>Portail Sécurisé du Personnel</p>
      </div>

      <div class="form-body">
        <div class="input-field">
          <label>Identifiant</label>
          <input
            type="text"
            v-model="username"
            placeholder="Entrez votre ID"
            autocomplete="username"
          />
        </div>

        <div class="input-field">
          <label>Mot de passe</label>
          <input
            type="password"
            v-model="mdp"
            placeholder="••••••••"
            autocomplete="current-password"
          />
        </div>

        <Transition name="slide-up">
          <div v-if="err" class="error-box">
            {{ err }}
          </div>
        </Transition>

        <button type="submit" class="btn-submit">
          Se connecter à l'espace santé
        </button>
      </div>

      <div class="card-footer">
        <p>© 2026 Système de Gestion Hospitalière</p>
        <div class="footer-links">
          <a href="#">Assistance</a>
          <span>•</span>
          <a href="#">Sécurité</a>
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped>
.login-wrapper {
  min-height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background: radial-gradient(circle at top right, #f0fdfa, #f8fafc);
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
}

.bg-decoration .circle {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  z-index: 0;
}

.c1 {
  width: 400px;
  height: 400px;
  background: rgba(13, 148, 136, 0.1);
  top: -100px;
  right: -100px;
}

.c2 {
  width: 300px;
  height: 300px;
  background: rgba(59, 130, 246, 0.05);
  bottom: -50px;
  left: -50px;
}

.login-card {
  position: relative;
  z-index: 1;
  background: #ffffff;
  width: 100%;
  max-width: 440px;
  padding: 3rem;
  border-radius: 32px;
  box-shadow:
    0 10px 1px rgba(13, 148, 136, 0.02),
    0 20px 40px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(226, 232, 240, 0.8);
}

.card-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.brand-badge {
  background: #0d9488;
  color: white;
  width: 48px;
  height: 48px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: bold;
  margin: 0 auto 1rem;
}

h1 {
  font-size: 1.8rem;
  color: #0f172a;
  font-weight: 800;
  letter-spacing: -0.5px;
}

h1 span {
  color: #0d9488;
}

.card-header p {
  color: #64748b;
  font-size: 0.95rem;
  font-weight: 500;
}

.form-body {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.input-field {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

label {
  font-size: 0.8rem;
  font-weight: 700;
  color: #475569;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding-left: 4px;
}

input {
  padding: 1rem 1.2rem;
  border: 2px solid #f1f5f9;
  border-radius: 16px;
  background: #f8fafc;
  font-size: 1rem;
  color: #1e293b;
  transition: all 0.3s ease;
}

input:focus {
  outline: none;
  border-color: #0d9488;
  background: #ffffff;
  box-shadow: 0 0 0 5px rgba(13, 148, 136, 0.08);
}

.btn-submit {
  background: #0d9488;
  color: white;
  padding: 1.1rem;
  border: none;
  border-radius: 16px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 0.5rem;
}

.btn-submit:hover {
  background: #0f766e;
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(13, 148, 136, 0.2);
}

.error-box {
  background: #fff1f2;
  color: #be123c;
  padding: 0.9rem;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 600;
  text-align: center;
  border: 1px solid #fecdd3;
}

.card-footer {
  margin-top: 3rem;
  text-align: center;
  font-size: 0.75rem;
  color: #94a3b8;
}

.footer-links {
  margin-top: 0.8rem;
  display: flex;
  justify-content: center;
  gap: 10px;
}

.footer-links a {
  color: #64748b;
  text-decoration: none;
  transition: color 0.2s;
}

.footer-links a:hover {
  color: #0d9488;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.4s ease;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

@media (max-width: 480px) {
  .login-card {
    padding: 2rem 1.5rem;
    border-radius: 0;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}
</style>
