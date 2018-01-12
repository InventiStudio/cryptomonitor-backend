import scheduler from '@/lib/scheduler'
import config from '@/lib/config'
import fetchCrypto from './jobs/fetch_crypto_and_spread_it'

export default async function () {
  scheduler.schedule(
    'fetch-crypto-and-spread-it',
    fetchCrypto,
    config.settings.currencies_fetch_cron,
  )

  scheduler.start({
    'fetch-crypto-and-spread-it': true,
  })
}
