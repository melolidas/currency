<template>
  <header>
    <nav>
      <router-link to="/">Главная</router-link> |
      <router-link to="/convert">Конвертация</router-link>
    </nav>
    <div class="base-currency">
      <label>Основная валюта:</label>
      <select v-model="baseCurrency" @change="updateBaseCurrency">
        <option v-for="currency in currencies" :key="currency" :value="currency">
          {{ currency }}
        </option>
      </select>
    </div>
  </header>
</template>

<script>
import { useCurrencyStore } from '../stores/currency'
import { ref } from 'vue'

export default {
  setup() {
    const currencyStore = useCurrencyStore()
    const currencies = ['USD', 'EUR', 'RUB']
    const baseCurrency = ref(currencyStore.baseCurrency)

    const updateBaseCurrency = () => {
      currencyStore.setBaseCurrency(baseCurrency.value)
    }

    return {
      currencies,
      baseCurrency,
      updateBaseCurrency,
    }
  },
}
</script>

<style scoped>
header {
  background-color: #42b983;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

nav a {
  color: white;
  text-decoration: none;
  margin: 0 0.5rem;
}

.base-currency {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

select {
  padding: 0.3rem;
  border-radius: 4px;
  border: 1px solid #ddd;
}
</style>
