import CryptoService from '@/services/crypto'
import Currency from '@/modules/currency/currency.model'
import config from '@/lib/config'

async function removeOlderThan24Hours() {
  return Currency.destroy({
    where: { createdAt: {
      $lt: new Date(new Date() - (config.settings.remove_older_than_hours * 60 * 60 * 1000)),
    } },
  })
}

async function fetchNewValues() {
  const response = await CryptoService.get()
  Currency.bulkCreate(response)
  return response
}

export default async function fetchCrypto(log) {
  const added = await fetchNewValues()
  await removeOlderThan24Hours()
  log(`Done. Fetched currencies ${added.length}`)
}
