import axios from 'axios'
import config from '@/lib/config'
import _ from 'lodash'

const API_URL =                 'https://min-api.cryptocompare.com/data/pricemulti'
const defaultCryptoCurrencies = config.settings.crypto_currencies_list
const defaultCurrencies =       config.settings.currencies_list

function transformResponseToDBData(data) {
  return _(data)
    .map((v, cryptocurrency) => _.map(v, (value, currency) => ({
      cryptocurrency,
      currency,
      value,
    })))
    .flatten()
    .value()
}

export default {
  transformResponseToDBData,
  get(fsyms = defaultCryptoCurrencies, tsyms = defaultCurrencies) {
    return axios.get(API_URL, { params: {
      fsyms: fsyms.join(','),
      tsyms: tsyms.join(','),
    } })
      .then(({ data }) => transformResponseToDBData(data))
  },
}
