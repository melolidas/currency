<template>
  <div class="home">
    <h1>Курсы валют</h1>
    <div v-if="loading">Загрузка данных...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else class="rates">
      <div v-for="(rate, currency) in rates" :key="currency" class="rate-item">
        1 {{ currency }} = {{ rate.toFixed(2) }} {{ baseCurrency }}
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useCurrencyStore } from '../stores/currency'

export default {
  setup() {
    const currencyStore = useCurrencyStore()
    const { fetchRates, loading, error } = currencyStore

    onMounted(() => {
      fetchRates()
    })

    return {
      rates: computed(() => currencyStore.rates),
      baseCurrency: computed(() => currencyStore.baseCurrency),
      loading,
      error,
    }
  },
}
</script>

<style scoped>
.home {
  padding: 2rem;
}

.rates {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
}

.rate-item {
  padding: 1rem;
  background-color: #f5f5f5;
  border-radius: 4px;
}

.error {
  color: red;
  padding: 1rem;
  background-color: #ffeeee;
  border-radius: 4px;
}
</style>
