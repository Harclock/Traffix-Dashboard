<template>
  <div class="prizes-page">
    <header class="prizes-header">
      <div>
        <h1>🎁 Gestione Catalogo Premi</h1>
        <p>Configura i premi riscattabili e la loro validità.</p>
      </div>
      <button @click="apriModale()" class="btn-primary">+ Aggiungi Nuovo Premio</button>
    </header>

    <div class="prizes-grid">
      <div v-for="p in premi" :key="p.id" class="prize-card" :class="{ 'inactive': !p.attivo }">
        <div class="status-badge" :class="p.attivo ? 'active' : 'off'">
          {{ p.attivo ? 'Attivo' : 'Non Attivo' }}
        </div>
        
        <div class="prize-info">
          <h3>{{ p.nome }}</h3>
          <p class="desc">{{ p.descrizione }}</p>
          <div class="stats">
            <div class="stat">
              <span class="label">Costo</span>
              <span class="val">{{ p.costo }} pt</span>
            </div>
            <div class="stat">
              <span class="label">Validità</span>
              <span class="val">{{ p.durataGiorni }} gg</span>
            </div>
          </div>
        </div>

        <div class="prize-actions">
          <button @click="apriModale(p)" class="btn-edit">Modifica</button>
          <button @click="eliminaPremio(p.id)" class="btn-delete">Elimina</button>
        </div>
      </div>
    </div>

    <div v-if="mostraModale" class="modal-overlay">
      <div class="modal-content">
        <h2>{{ premioEdit.id ? 'Modifica Premio' : 'Nuovo Premio' }}</h2>
        
        <div class="form-group">
          <label>Nome Premio</label>
          <input v-model="premioEdit.nome" placeholder="es: Sconto Carsharing">
        </div>

        <div class="form-group">
          <label>Descrizione</label>
          <textarea v-model="premioEdit.descrizione" rows="3"></textarea>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Costo (Punti)</label>
            <input type="number" v-model.number="premioEdit.costo">
          </div>
          <div class="form-group">
            <label>Durata (Giorni dalla riscossione)</label>
            <input type="number" v-model.number="premioEdit.durataGiorni">
          </div>
        </div>

        <div class="form-group check">
          <input type="checkbox" v-model="premioEdit.attivo" id="attivo">
          <label for="attivo">Rendi il premio disponibile subito</label>
        </div>

        <div class="modal-actions">
          <button @click="chiudiModale" class="btn-cancel">Annulla</button>
          <button @click="salvaPremio" class="btn-save">Salva Premio</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import '@/assets/styles/CSS/base.css'
import '@/assets/styles/CSS/modules/gestione-premi.css'

import { ref, computed, onMounted } from 'vue'

// --- STATO DATI PREMI ---
const premi = ref([]);
const caricamento = ref(false);
const mostraModale = ref(false);

// Stato per il form (Nuovo o Modifica)
const premioEdit = ref({
  id: null,
  nome: '',
  descrizione: '',
  costo: 0,
  attivo: true,
  durataGiorni: 30
});

// --- LOGICA API ---
const fetchPremi = async () => {
  caricamento.value = true;
  // Simulo caricamento API
  premi.value = [
    { id: 1, nome: "Buono Caffè", descrizione: "Un caffè omaggio presso i bar convenzionati", costo: 50, attivo: true, durataGiorni: 7 },
    { id: 2, nome: "Abbonamento Bus Mensile", descrizione: "Sconto del 50% sull'abbonamento urbano", costo: 500, attivo: true, durataGiorni: 30 },
    { id: 3, nome: "Kit Mobilità Sostenibile", descrizione: "Zaino e borraccia termica", costo: 1200, attivo: false, durataGiorni: 0 }
  ];
  caricamento.value = false;
};

const salvaPremio = async () => {
  if (premioEdit.value.id) {
    // API: PUT /api/premi/id
    const index = premi.value.findIndex(p => p.id === premioEdit.value.id);
    premi.value[index] = { ...premioEdit.value };
  } else {
    // API: POST /api/premi
    const nuovo = { ...premioEdit.value, id: Date.now() };
    premi.value.push(nuovo);
  }
  chiudiModale();
};

const eliminaPremio = (id) => {
  if (confirm("Sei sicuro di voler eliminare questo premio?")) {
    premi.value = premi.value.filter(p => p.id !== id);
  }
};

// --- GESTIONE UI ---
const apriModale = (premio = null) => {
  if (premio) {
    premioEdit.value = { ...premio };
  } else {
    premioEdit.value = { id: null, nome: '', descrizione: '', costo: 0, attivo: true, durataGiorni: 30 };
  }
  mostraModale.value = true;
};

const chiudiModale = () => { mostraModale.value = false; };

onMounted(fetchPremi);
</script>