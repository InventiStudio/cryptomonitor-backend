import CryptoService from '@/services/crypto'
import Currency from '@/modules/currency/currency.model'
import config from '@/lib/config'
import socket from '@/modules/socket/socket.controller'

async function removeOlderThan24Hours() {
  const where = { createdAt: {
    $lt: new Date(new Date() - (config.settings.remove_older_than_hours * 60 * 60 * 1000)),
  } }
  const result = await Currency.findAll({ where })
  await Currency.destroy({ where })
  return result.map(({ id }) => id)
}

async function fetchNewValues() {
  const response = await CryptoService.get()
  return Currency.bulkCreate(response, { returning: true })
}

async function broadcastNewValues(values) {
  socket.broadcast('NEW_CURRENCY_VALUES', values)
}

async function broadcastRemovedCurrencies(values) {
  socket.broadcast('REMOVED_CURRENCY_IDS', values)
}

export default async function fetchCrypto(log) {
  const added   = await fetchNewValues()
  const removed = await removeOlderThan24Hours()
  await broadcastNewValues(added)
  await broadcastRemovedCurrencies(removed)
  log(`Done. Fetched currencies ${added.length} and removed ${removed.length}`)
}
