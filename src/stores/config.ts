import axios from 'axios'
import { defineStore } from 'pinia'

export const useConfigStore = defineStore('quiz', {
  state: () => ({
    screenWidth: document.documentElement.clientWidth,
    screenHeight: document.documentElement.clientHeight,
    countries: [] as {
      code: string
      name: string
      normalizedName: string
      frenchName: string
      normalizedFrenchName: string
    }[],
    codes: [] as string[],
    countryCode: ''
  }),
  getters: {
    country(state) {
      return state.countries.find((country) => country.code === this.countryCode)
    }
  },
  actions: {
    async initCountries() {
      try {
        const response = await fetch('https://flagcdn.com/en/codes.json')
        const data = await response.json()
        this.countries = data
      } catch (error) {
        console.error('Error fetching data:', error)
      }

      // convert with axios
      const { data: mainCountries } = await axios.get<Record<string, string>>(
        'https://flagcdn.com/en/codes.json'
      )

      const { data: allCountries } = await axios.get<
        {
          cca2: string
          name: { common: string }
          translations: { fra: { common: string } }
        }[]
      >('https://restcountries.com/v3.1/all')

      const blacklist = ['st', 'sh', 'nf', 'hm']
      const codes = Object.keys(mainCountries).filter(
        (code) => !code.includes('us-') && !blacklist.includes(code)
      )

      this.codes = codes

      const countries = allCountries
        .filter((country) => {
          return codes.includes(country.cca2.toLowerCase())
        })
        .map((country) => {
          return {
            code: country.cca2.toLowerCase(),
            name: country.name.common,
            normalizedName: normalize(country.name.common),
            frenchName: country.translations.fra.common,
            normalizedFrenchName: normalize(country.translations.fra.common)
          }
        })

      this.countries = countries
    },
    nextCountry() {
      const index = Math.floor(Math.random() * this.codes.length)

      this.countryCode = this.codes[index]
    }
  },
  persist: {
    key: `md-quiz`
  },
  share: {
    enable: false
  }
})
