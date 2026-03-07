<script setup>
import { useRoute, useRouter } from "vue-router";
import { computed } from "vue";
import { doctors, patients } from "@/services/data";

const route = useRoute();
const router = useRouter();

const patientId = Number(route.params.id);

// Cherche le patient par ID
const patient = computed(() =>
  patients.value.find(p => p.id === patientId)
);

const goBack = () => {
  router.back();
};

// Modifier le patient
const editPatient = () => {
  localStorage.setItem("patientToEdit", JSON.stringify(patient.value));
  router.push("/patients/formulaire");
};
</script>

<template>
  <section class="details-page" v-if="patient">
    <nav class="top-nav">
      <button class="btn-icon-back" @click="goBack">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Retour
      </button>
      <div class="nav-actions">
        <button class="btn-edit" @click="editPatient">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path
              d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.121 2.121 0 113 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
          Modifier le dossier
        </button>
      </div>
    </nav>

    <header class="patient-hero">
      <div class="hero-content">
        <div class="patient-avatar-large">
          {{ patient.firstName[0] }}{{ patient.lastName[0] }}
        </div>
        <div class="patient-meta">
          <div class="name-row">
            <h1>{{ patient.firstName }} {{ patient.lastName }}</h1>
            <span :class="['status-pill', patient.status]">
              <span class="dot"></span>
              {{ patient.status.replace("_", " ") }}
            </span>
          </div>
          <p class="patient-id">ID Dossier: #{{ patient.id.toString().slice(0, 8).toUpperCase() }} • Admis le {{
            patient.createdAt || 'N/A' }}</p>
        </div>
      </div>
    </header>

    <div class="details-grid">
      <div class="info-column">
        <div class="card-section">
          <div class="section-title">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Informations Personnelles
          </div>
          <div class="data-grid">
            <div class="data-item">
              <label>Genre</label>
              <p>{{ patient.gender || "Non précisé" }}</p>
            </div>
            <div class="data-item">
              <label>Groupe Sanguin</label>
              <p class="blood-type">{{ patient.bloodGroup || "Inconnu" }}</p>
            </div>
            <div class="data-item full">
              <label>Contact Téléphonique</label>
              <p>{{ patient.phone || "-" }}</p>
            </div>
          </div>
        </div>

        <div class="card-section">
          <div class="section-title">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path
                d="M21 10.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
            </svg>
            Besoin Médical
          </div>
          <div class="medical-note">
            {{ patient.besoinMedical || "Aucune note médicale spécifique renseignée pour ce patient." }}
          </div>
        </div>
      </div>

      <div class="info-column">
        <div class="card-section highlight">
          <div class="section-title">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            Suivi du patient
          </div>
          <div class="tracking-list">
            <div class="track-item">
              <div class="track-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <line x1="9" y1="3" x2="9" y2="21" />
                </svg></div>
              <div class="track-content">
                <label>Chambre assignée</label>
                <span>{{ patient.roomId ? 'Unité ' + patient.roomId : 'Non assigné' }}</span>
              </div>
            </div>
            <div class="track-item">
              <div class="track-icon doctor"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  stroke-width="2">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg></div>
              <div class="track-content">
                <label>Médecin Responsable</label>
                <span>Dr. {{ doctors.find(d=> d.id = patient.doctorId)?.name || "En attente d'assignation" }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- <div class="card-section vitals-preview">
          <div class="section-title">Aperçu Constantes</div>
          <div class="vitals-placeholder">
            <svg viewBox="0 0 100 30" class="ecg-wave">
              <polyline points="0,15 10,15 12,5 15,25 18,15 40,15 42,2 45,28 48,15 70,15 72,10 75,20 78,15 100,15"
                fill="none" stroke="#0d9488" stroke-width="1" />
            </svg>
            <p>Monitoring patient actif</p>
          </div>
        </div> -->
      </div>
    </div>
  </section>

  <div v-else class="not-found">
    <div class="not-found-content">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
      <h2>Dossier introuvable</h2>
      <p>Le patient que vous recherchez n'existe pas ou a été archivé.</p>
      <button class="btn-edit" @click="goBack">Retour au registre</button>
    </div>
  </div>
</template>

<style scoped>
.details-page {
  max-width: 1100px;
  margin: 40px auto;
  padding: 0 20px;
  font-family: 'Inter', system-ui, sans-serif;
  color: #0f172a;
}

/* NAVIGATION */
.top-nav {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
}

.btn-icon-back {
  display: flex;
  align-items: center;
  gap: 8px;
  background: white;
  border: 1px solid #e2e8f0;
  padding: 10px 18px;
  border-radius: 12px;
  font-weight: 700;
  color: #64748b;
  cursor: pointer;
  transition: 0.2s;
}

.btn-icon-back:hover {
  background: #f8fafc;
  color: #0f172a;
}

.btn-icon-back svg {
  width: 18px;
}

.btn-edit {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #0f172a;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: 0.3s;
}

.btn-edit:hover {
  background: #1e293b;
  transform: translateY(-2px);
}

.btn-edit svg {
  width: 18px;
}

/* HERO SECTION */
.patient-hero {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 24px;
  padding: 32px;
  margin-bottom: 30px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
}

.hero-content {
  display: flex;
  align-items: center;
  gap: 28px;
}

.patient-avatar-large {
  width: 90px;
  height: 90px;
  background: #f0fdfa;
  color: #0d9488;
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.2rem;
  font-weight: 800;
  border: 2px solid #ccfbf1;
}

.name-row {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 8px;
}

.name-row h1 {
  font-size: 2rem;
  font-weight: 800;
  margin: 0;
  letter-spacing: -0.02em;
}

.patient-id {
  color: #64748b;
  margin: 0;
  font-weight: 500;
  font-family: monospace;
}

/* STATUS PILLS */
.status-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 16px;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: currentColor;
}

.consultation {
  background: #eff6ff;
  color: #1d4ed8;
}

.hospitalise {
  background: #fff1f2;
  color: #e11d48;
}

.transfere {
  background: #fffbeb;
  color: #d97706;
}

.sorti {
  background: #f0fdf4;
  color: #15803d;
}

/* GRID DETAILS */
.details-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 24px;
}

.card-section {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  padding: 24px;
  margin-bottom: 24px;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 800;
  font-size: 1.1rem;
  margin-bottom: 20px;
  color: #334155;
}

.section-title svg {
  width: 20px;
  color: #0d9488;
}

.data-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.data-item label {
  display: block;
  font-size: 0.75rem;
  font-weight: 700;
  color: #94a3b8;
  text-transform: uppercase;
  margin-bottom: 6px;
}

.data-item p {
  margin: 0;
  font-weight: 700;
  font-size: 1.05rem;
  color: #1e293b;
}

.data-item.full {
  grid-column: span 2;
}

.blood-type {
  color: #ef4444 !important;
}

.medical-note {
  background: #f8fafc;
  padding: 18px;
  border-radius: 14px;
  line-height: 1.6;
  color: #475569;
  font-style: italic;
}

/* TRACKING RIGHT COLUMN */
.card-section.highlight {
  background: #f8fafc;
  border-color: #0d9488;
}

.track-item {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
}

.track-icon {
  width: 44px;
  height: 44px;
  background: white;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
}

.track-icon svg {
  width: 22px;
  color: #0d9488;
}

.track-icon.doctor svg {
  color: #6366f1;
}

.track-content label {
  display: block;
  font-size: 0.7rem;
  color: #64748b;
  font-weight: 700;
  text-transform: uppercase;
}

.track-content span {
  font-weight: 700;
  color: #0f172a;
}

.vitals-placeholder {
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #111827;
  border-radius: 14px;
  color: #10b981;
}

.ecg-wave {
  width: 80%;
  opacity: 0.6;
}

.vitals-placeholder p {
  font-size: 0.7rem;
  font-weight: 800;
  text-transform: uppercase;
  margin-top: 10px;
}

/* NOT FOUND */
.not-found {
  height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.not-found-content {
  text-align: center;
  max-width: 400px;
}

.not-found-content svg {
  width: 60px;
  color: #94a3b8;
  margin-bottom: 20px;
}

.not-found-content h2 {
  font-weight: 800;
  color: #1e293b;
}

.not-found-content p {
  color: #64748b;
  margin-bottom: 24px;
}

@media (max-width: 900px) {
  .details-grid {
    grid-template-columns: 1fr;
  }

  .hero-content {
    flex-direction: column;
    text-align: center;
  }

  .name-row {
    justify-content: center;
    flex-wrap: wrap;
  }
}
</style>