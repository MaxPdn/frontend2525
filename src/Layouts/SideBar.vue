<script setup>
import { computed } from "vue";
import { currentId } from "@/services/auth";
import { users } from "@/services/data";

const currentUser = computed(() => {
  return users.value.find((u) => u.id === currentId.value.id) || null;
});
</script>

<template>
  <aside class="sidebar">
    <div class="sidebar-header">
      <div class="status-indicator">
        <span class="dot"></span>
        <span class="status-text">Système Actif</span>
      </div>
    </div>

    <div class="sidebar-section">
      <small class="section-title">Menu Principal</small>
      <RouterLink to="/admindash" class="nav-item">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <rect x="3" y="3" width="7" height="7"></rect>
          <rect x="14" y="3" width="7" height="7"></rect>
          <rect x="14" y="14" width="7" height="7"></rect>
          <rect x="3" y="14" width="7" height="7"></rect>
        </svg>
        <span>Tableau de bord</span>
      </RouterLink>
    </div>

    <div class="sidebar-section">
      <small class="section-title">Gestion Patients</small>

      <RouterLink to="/patients" class="nav-item">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
        <span>Registre Patients</span>
      </RouterLink>

      <RouterLink to="/rdv" class="nav-item">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
        <span>Rendez-vous</span>
      </RouterLink>
    </div>

    <div class="sidebar-section">
      <small class="section-title">Infrastructure</small>

      <RouterLink
        to="/doctors"
        class="nav-item"
        v-if="currentUser?.role === 'admin'"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="m12 14 4-4"></path>
          <path d="M3.34 19a10 10 0 1 1 17.32 0"></path>
        </svg>
        <span>Corps Médical</span>
      </RouterLink>

      <RouterLink
        to="/rooms"
        class="nav-item"
        v-if="currentUser?.role === 'admin' || currentUser?.role === 'recept'"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M2 20V9a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v11"></path>
          <path d="M2 17h20"></path>
          <path d="M6 17v4"></path>
          <path d="M18 17v4"></path>
        </svg>
        <span>Gestion Chambres</span>
      </RouterLink>
    </div>

    <div class="sidebar-section admin-zone" v-if="currentUser?.role === 'admin'">
      <small class="section-title">Administration</small>
      <RouterLink to="/users" class="nav-item special-link">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <line x1="19" y1="8" x2="19" y2="14"></line>
          <line x1="22" y1="11" x2="16" y2="11"></line>
        </svg>
        <span>Nouveau Personnel</span>
      </RouterLink>
    </div>

    <div class="sidebar-footer">
      <div class="version-tag">Hospit Manage <span>v1.0</span></div>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  /* width: 280px; */
  background-color: #ffffff;
  border-right: 1px solid #f1f5f9;
  /* min-height: 100vh; */
  padding: 2rem 1.2rem;
  gap: 1.8rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.sidebar-header {
  padding: 0 0.8rem;
  margin-bottom: 0.5rem;
}

.status-indicator {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #f0fdf4;
  padding: 6px 12px;
  border-radius: 20px;
  width: fit-content;
}

.dot {
  width: 8px;
  height: 8px;
  background-color: #22c55e;
  border-radius: 50%;
  box-shadow: 0 0 8px rgba(34, 197, 94, 0.5);
}

.status-text {
  font-size: 0.7rem;
  font-weight: 700;
  color: #166534;
  text-transform: uppercase;
}

.sidebar-section {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.section-title {
  font-size: 0.65rem;
  text-transform: uppercase;
  color: #94a3b8;
  font-weight: 800;
  letter-spacing: 0.05em;
  margin-bottom: 0.6rem;
  padding-left: 0.8rem;
}

.nav-item {
  position: relative;
  display: flex;
  align-items: center;
  gap: 14px;
  text-decoration: none;
  color: #64748b;
  font-weight: 600;
  font-size: 0.92rem;
  padding: 0.85rem 1rem;
  border-radius: 12px;
  transition: all 0.25s ease;
}

.icon {
  width: 20px;
  height: 20px;
  transition: transform 0.2s ease;
}

.nav-item:hover {
  background-color: #f8fafc;
  color: #0d9488;
}

.nav-item:hover .icon {
  transform: translateX(3px);
}

/* ÉTAT ACTIF PREMIUM */
.router-link-active {
  background: linear-gradient(to right, #f0fdfa, #ffffff) !important;
  color: #0d9488 !important;
  box-shadow: inset 4px 0 0 #0d9488;
}

.router-link-active .icon {
  color: #0d9488;
}

/* LIEN SPÉCIAL ADMIN */
.special-link {
  border: 1px dashed #cbd5e1;
  margin-top: 5px;
}

.special-link:hover {
  border-style: solid;
  background-color: #eff6ff;
  color: #2563eb;
}

.sidebar-footer {
  margin-top: auto;
  padding: 1rem 0.8rem;
  border-top: 1px solid #f1f5f9;
}

.version-tag {
  font-size: 0.7rem;
  color: #94a3b8;
  font-weight: 500;
}

.version-tag span {
  background: #f1f5f9;
  padding: 2px 6px;
  border-radius: 4px;
  color: #64748b;
}

/* RESPONSIVE */
@media (max-width: 1024px) {
  .sidebar {
    width: 88px;
    padding: 2rem 0.6rem;
    align-items: center;
  }

  .section-title,
  .status-text,
  .sidebar-footer,
  .nav-item span {
    display: none;
  }

  .status-indicator {
    padding: 8px;
  }

  .nav-item {
    justify-content: center;
    width: 54px;
    height: 54px;
    padding: 0;
  }

  .nav-item:hover .icon {
    transform: scale(1.1);
  }

  .router-link-active {
    box-shadow: none;
    border: 2px solid #0d9488;
  }
}
</style>
