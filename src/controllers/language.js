import router from '@/lib/router'
import Language from '@/models/language'
import Contents from '@/models/content'

export default router.controller('/languages', (ctrl) => {
  ctrl
    .get('/', async (ctx, next) => {
      ctx
        .render(await Language.findAll().throwIfNotFound())
        .then(await next)
    })

    .get('/:slug', async (ctx, next) => {
      const result = await Language
        .findOne({ where: { slug: ctx.params.slug } })
        .throwIfNotFound()
      ctx
        .render(result)
        .then(await next)
    })

    .get('/:slug/contents', async (ctx, next) => {
      const result = await Contents
        .findAll({ where: { languageSlug: ctx.params.slug } })
        .throwIfNotFound()
      ctx
        .render(result)
        .then(await next)
    })

    .post('/', async (ctx, next) => {
      ctx
        .render(await Language.create(ctx.request.body))
        .then(await next)
    })

    .patch('/:slug', async (ctx, next) => {
      const result = await Language
        .update(ctx.request.body, { where: { slug: ctx.params.slug }, returning: true })
        .parseUpdate()
        .throwIfNotFound()
      ctx
        .render(result)
        .then(await next)
    })

    .delete('/:slug', async (ctx, next) => {
      const result = await Language
        .destroy({ where: { slug: ctx.params.slug } })
        .parseDestroy()
        .throwIfNotFound()
      ctx
        .render(result)
        .then(await next)
    })
})
