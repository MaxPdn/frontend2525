<script setup>
import { users } from '@/services/data';
import { auThis, currentId, logout } from '@/services/auth';
import { computed, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

const id = currentId.value?.id
watch(
    currentId,
    (newValue) => {
        localStorage.setItem('userId', JSON.stringify(newValue))
    },
    { deep: true }
)
const currentUser = computed(() => {
  return users.value?.find(u => u.id === id) || null;
})

function logoutt() {
    logout()
    router.push('/')
}
</script>

<template>
  <header class="navbar-header">
    <div class="nav-container">
      <div class="logo">
        <div class="logo-wrapper">
          <svg class="medical-cross" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 4V20M4 12H20" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
            <path d="M8 8L16 16M16 8L8 16" stroke="currentColor" stroke-width="1.5" stroke-opacity="0.3" stroke-linecap="round"/>
          </svg>
        </div>
        <div class="logo-text">Hospit<span> Manage</span></div>
      </div>

      <nav v-if="auThis" class="nav-main">
        <div class="user-profile-card">
          <div class="user-avatar">
            {{ currentUser?.firstname?.charAt(0) || 'P' }}
          </div>
          <div class="user-details">
            <span class="user-name">{{ currentUser?.firstname }}</span>
            <div class="badge-row">
              <span class="user-badge" :class="currentUser?.role?.toLowerCase()">
                {{ currentUser?.role || 'Personnel' }}
              </span>
              <span class="user-id">#{{ currentUser?.username }}</span>
            </div>
          </div>
        </div>
        
        <button @click="logoutt" class="btn-logout">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
          <span>Quitter</span>
        </button>
      </nav>

      <nav v-else class="nav-main">
        <div class="nav-links">
          <RouterLink to="/" class="nav-link">
            <span>Accueil</span>
          </RouterLink>
        </div>
        <RouterLink to="/login" class="btn-login">
          Accès Personnel
        </RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
/* VARIABLES DE DESIGN */
:root {
  --primary-med: #0d9488;
  --primary-light: #f0fdfa;
  --text-main: #1e293b;
  --text-muted: #64748b;
  --glass-bg: rgba(255, 255, 255, 0.85);
  --shadow-sm: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
}

.navbar-header {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: var(--glass-bg);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(13, 148, 136, 0.15);
  padding: 0.75rem 2rem;
  transition: all 0.3s ease;
}

.nav-container {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* LOGO STYLE */
.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
}

.logo-wrapper {
  background: linear-gradient(135deg, #0d9488 0%, #0f766e 100%);
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  color: white;
  box-shadow: 0 4px 12px rgba(13, 148, 136, 0.3);
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.logo:hover .logo-wrapper {
  transform: rotate(90deg) scale(1.05);
}

.medical-cross {
  width: 22px;
  height: 22px;
}

.logo-text {
  font-size: 1.35rem;
  font-weight: 800;
  color: #0f172a;
  letter-spacing: -0.02em;
}

.logo-text span {
  color: #0d9488;
  font-weight: 400;
}

/* USER PROFILE CARD */
.user-profile-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 6px 12px;
  background: #f8fafc;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}

.user-avatar {
  width: 34px;
  height: 34px;
  background: #0d9488;
  color: white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.9rem;
}

.user-details {
  display: flex;
  flex-direction: column;
}

.user-name {
  font-size: 0.9rem;
  font-weight: 700;
  color: #1e293b;
  line-height: 1.2;
}

.badge-row {
  display: flex;
  align-items: center;
  gap: 6px;
}

.user-badge {
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  padding: 2px 6px;
  border-radius: 4px;
  background: #e2e8f0;
  color: #475569;
}

.user-badge.admin {
  background: #dcfce7;
  color: #15803d;
}

.user-id {
  font-size: 0.65rem;
  color: #94a3b8;
}

/* NAVIGATION LINKS */
.nav-main {
  display: flex;
  align-items: center;
  gap: 1.2rem;
}

.nav-link {
  text-decoration: none;
  color: #64748b;
  font-weight: 600;
  font-size: 0.95rem;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.nav-link:hover {
  color: #0d9488;
  background: #f0fdfa;
}

/* BOUTONS */
.btn-login {
  background: #0d9488;
  color: white;
  padding: 0.7rem 1.5rem;
  border-radius: 10px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  box-shadow: 0 4px 14px 0 rgba(13, 148, 136, 0.3);
  transition: all 0.3s ease;
}

.btn-login:hover {
  background: #0f766e;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px 0 rgba(13, 148, 136, 0.4);
}

.btn-logout {
  display: flex;
  align-items: center;
  gap: 8px;
  background: white;
  border: 1.5px solid #fee2e2;
  color: #ef4444;
  padding: 0.6rem 1.2rem;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 700;
  font-size: 0.85rem;
  transition: all 0.2s ease;
}

.btn-logout:hover {
  background: #fef2f2;
  border-color: #fecaca;
  transform: scale(0.98);
}

/* RESPONSIVE DESIGN */
@media (max-width: 768px) {
  .navbar-header {
    padding: 0.6rem 1rem;
  }
  
  .user-details, .nav-links {
    display: none;
  }

  .logo-text {
    font-size: 1.1rem;
  }
  
  .user-profile-card {
    padding: 4px;
    background: transparent;
    border: none;
  }
  
  .btn-logout span {
    display: none;
  }
  
  .btn-logout {
    padding: 0.6rem;
  }
}
</style>