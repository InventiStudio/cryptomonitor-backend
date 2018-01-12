import CryptoService from '@/services/crypto'

export default async function fetchCrypto(log) {
  const response = await CryptoService.get()
  console.log(response)
  log('Done. Fetched currencies')
}
