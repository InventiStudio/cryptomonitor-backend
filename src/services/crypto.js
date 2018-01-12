import axios from 'axios'
import config from '@/lib/config'

const API_URL =                 'https://min-api.cryptocompare.com/data/pricemulti'
const defaultCryptoCurrencies = config.settings.crypto_currencies_list
const defaultCurrencies =       config.settings.currencies_list

export default {
  get(fsyms = defaultCryptoCurrencies, tsyms = defaultCurrencies) {
    return axios.get(API_URL, { params: {
      fsyms: fsyms.join(','),
      tsyms: tsyms.join(','),
    } })
      .then(({ data }) => data)
  },
}
