<template>
  <div class="convert">
    <h1>Конвертация валют</h1>
    <div v-if="loading">Загрузка данных...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <form v-else @submit.prevent>
      <div class="converter-row">
        <input
          type="number"
          v-model="amount1"
          @input="convertFromFirst"
          :class="{ 'input-error': amount1Error }"
        />
        <select v-model="currency1" @change="convertFromFirst">
          <option v-for="currency in currencies" :key="currency" :value="currency">
            {{ currency }}
          </option>
        </select>
      </div>
      <div class="converter-row">
        <input
          type="number"
          v-model="amount2"
          @input="convertFromSecond"
          :class="{ 'input-error': amount2Error }"
        />
        <select v-model="currency2" @change="convertFromFirst">
          <option v-for="currency in currencies" :key="currency" :value="currency">
            {{ currency }}
          </option>
        </select>
      </div>
      <div v-if="amount1Error || amount2Error" class="error-message">
        Пожалуйста, введите корректное числовое значение
      </div>
    </form>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue'
import { useCurrencyStore } from '../stores/currency'

export default {
  setup() {
    const currencyStore = useCurrencyStore()
    const currencies = ['USD', 'EUR', 'RUB']
    const currency1 = ref('USD')
    const currency2 = ref('RUB')
    const amount1 = ref(null)
    const amount2 = ref(null)
    const amount1Error = ref(false)
    const amount2Error = ref(false)

    const rates = computed(() => currencyStore.rates)
    const loading = computed(() => currencyStore.loading)
    const error = computed(() => currencyStore.error)

    const convertFromFirst = () => {
      amount1Error.value = false

      if (amount1.value === null || amount1.value === '') {
        amount2.value = null
        return
      }

      if (isNaN(amount1.value)) {
        amount1Error.value = true
        return
      }

      if (currency1.value === currency2.value) {
        amount2.value = amount1.value
        return
      }

      const rate1 = rates.value[currency1.value] || 1
      const rate2 = rates.value[currency2.value] || 1
      amount2.value = parseFloat(((amount1.value * rate1) / rate2).toFixed(2))
    }

    const convertFromSecond = () => {
      amount2Error.value = false

      if (amount2.value === null || amount2.value === '') {
        amount1.value = null
        return
      }

      if (isNaN(amount2.value)) {
        amount2Error.value = true
        return
      }

      if (currency1.value === currency2.value) {
        amount1.value = amount2.value
        return
      }

      const rate1 = rates.value[currency1.value] || 1
      const rate2 = rates.value[currency2.value] || 1
      amount1.value = parseFloat(((amount2.value * rate2) / rate1).toFixed(2))
    }

    watch([currency1, currency2], () => {
      if (amount1.value !== null && amount1.value !== '') {
        convertFromFirst()
      }
    })

    return {
      currencies,
      currency1,
      currency2,
      amount1,
      amount2,
      amount1Error,
      amount2Error,
      rates,
      loading,
      error,
      convertFromFirst,
      convertFromSecond,
    }
  },
}
</script>

<style scoped>
.convert {
  padding: 2rem;
}

.converter-row {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  align-items: center;
}

input {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 200px;
}

select {
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ddd;
}

.input-error {
  border-color: red;
}

.error-message {
  color: red;
  margin-top: 0.5rem;
}
</style>
