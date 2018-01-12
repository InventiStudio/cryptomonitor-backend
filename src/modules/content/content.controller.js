import router   from '@/lib/router'
import Content  from '@/modules/content/content.model'
import Language from '@/modules/language/language.model'

export default router.controller('/contents', (ctrl) => {
  ctrl
    .get('/', async (ctx, next) => {
      ctx
        .render(await Content.findAll())
        .then(await next)
    })

    .get('/:languageSlug/:key', async (ctx, next) => {
      const result = await Content
        .findOne({ where: ctx.params })
        .throwIfNotFound()
      ctx
        .render(result)
        .then(await next)
    })

    .post('/', async (ctx, next) => {
      await Language
        .findOne({ where: { slug: ctx.request.body.languageSlug } })
        .throwIfNotFound()
      ctx
        .render(await Content.create(ctx.request.body))
        .then(await next)
    })

    .patch('/:languageSlug/:key', async (ctx, next) => {
      if (ctx.request.body.languageSlug) {
        await Language
          .findOne({ where: { slug: ctx.request.body.languageSlug } })
          .throwIfNotFound()
      }
      const result = await Content
        .update(ctx.request.body, { where: ctx.params, returning: true })
        .parseUpdate()
        .throwIfNotFound()
      ctx
        .render(result)
        .then(await next)
    })

    .delete('/:languageSlug/:key', async (ctx, next) => {
      const result = await Content
        .destroy({ where: ctx.params })
        .parseDestroy()
        .throwIfNotFound()
      ctx
        .render(result)
        .then(await next)
    })
})
