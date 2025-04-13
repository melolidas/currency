import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

export const useCurrencyStore = defineStore('currency', () => {
  const baseCurrency = ref('RUB')
  const rates = ref({})
  const loading = ref(false)
  const error = ref(null)
  const lastUpdated = ref(null)

  const currencies = ['USD', 'EUR', 'RUB']

  const fetchRates = async () => {
    if (lastUpdated.value && Date.now() - lastUpdated.value < 5 * 60 * 1000) {
      return
    }

    loading.value = true
    error.value = null
    try {
      const response = await axios.get('https://status.neuralgeneration.com/api/currency')

      rates.value = {
        USD: response.data.USD || 91.45,
        EUR: response.data.EUR || 101.74,
        RUB: 1,
      }
      lastUpdated.value = Date.now()
    } catch (err) {
      console.error('Ошибка при загрузке курсов валют:', err)
      error.value = {
        message: 'Не удалось загрузить курсы валют',
        details: err.message,
      }

      rates.value = {
        USD: 91.45,
        EUR: 101.74,
        RUB: 1,
      }
    } finally {
      loading.value = false
    }
  }

  const setBaseCurrency = (currency) => {
    if (!currencies.includes(currency)) {
      console.warn(`Попытка установить недопустимую валюту: ${currency}`)
      return
    }
    baseCurrency.value = currency
    fetchRates()
  }

  const rateValues = computed(() => {
    return Object.entries(rates.value).map(([currency, rate]) => ({
      currency,
      rate,
    }))
  })

  return {
    baseCurrency,
    rates,
    loading,
    error,
    currencies,
    rateValues,
    lastUpdated,
    fetchRates,
    setBaseCurrency,
  }
})
