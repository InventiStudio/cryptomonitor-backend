import router from '@/lib/router'
import Currency from '@/modules/currency/currency.model'

export default router.controller('/currencies', (ctrl) => {
  ctrl
    /**
     * @apiGroup Currency
     * @api {get} /currencies GET all currencies
     * @apiDescription Get all currencies in database
     * @apiSuccess Array currencies
     */
    .get('/', async (ctx, next) => {
      ctx
        .render(await Currency.findAll().throwIfNotFound())
        .then(await next)
    })

    /**
     * @apiGroup Currency
     * @api {get} /currencies/:currency GET all currencies for currency name
     * @apiParam {currency} Currency e.g. USD
     * @apiDescription Get all currencies in database for currency name
     * @apiSuccess Array currencies
     */
    .get('/:currency', async (ctx, next) => {
      const result = await Currency
        .findAll({ where: { currency: ctx.params.currency }, order: [['createdAt', 'DESC']] })
        .throwIfNotFound()
      ctx
        .render(result)
        .then(await next)
    })

    /**
     * @apiGroup Currency
     * @api {get} /currencies/:currency/:cryptocurrency GET all currencies for crypto name
     * @apiParam {currency} Currency e.g. USD
     * @apiParam {cryptocurrency} Cryptocurrency e.g. ETH
     * @apiDescription Get all currencies in database for crypto name
     * @apiSuccess Array currencies
     */
    .get('/:currency/:cryptocurrency', async (ctx, next) => {
      const result = await Currency
        .findAll({ where: {
          currency: ctx.params.currency,
          cryptocurrency: ctx.params.cryptocurrency,
        } })
        .throwIfNotFound()
      ctx
        .render(result)
        .then(await next)
    })
})
