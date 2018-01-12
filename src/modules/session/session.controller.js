import bcrypt from 'bcryptjs'
import moment from 'moment'
import router from '@/lib/router'
import error from '@/lib/error'
import Session from '@/modules/session/session.model'
import User from '@/modules/user/user.model'
import validate from '@/utils/validate'
import using from '@inventistudio/using-js'

export default router.controller('/sessions', (ctrl) => {
  ctrl

    .param('token', async (token, ctx, next) => {
      await validate
        .run({ token }, { token: validate.preset('uuid') })
        .throwIfInvalid('NotFoundError')
        .otherwise(next)
    })

    /**
     * @apiGroup Session
     * @api {get} /sessions/:token GET session
     * @apiParam {uuid} token Session's token
     * @apiDescription Useful when you want to validate token
     * @apiSuccess {Object} session
     */
    .get('/:token', async (ctx, next) => {
      const session = await Session
        .findOne({ where: { id: ctx.params.token } })
        .throwIfNotFound('UnauthorizedError')
      ctx
        .render(session)
        .setHeader('Access-Control-Expose-Headers', 'X-Auth-Token')
        .setHeader('X-Auth-Token', session.id)
        .then(await next)
    })

    /**
     * @apiGroup Session
     * @api {post} /sessions/ POST Session
     */
    .post('/', async (ctx, next) => {
      const passwordValidation = { password: { type: 'string', minLength: 6, optional: true } }
      const body = using(ctx.request.body)
        .do(b => validate.run(b, passwordValidation).throwIfInvalid().value())
        .do(User.sanitize)
        .do(b => User.validate(b).throwIfInvalid().value())
        .value()
      const user = await User
        .findOne({ where: { email: body.email } })
        .throwIfNotFound('UnauthorizedError')
      const isPasswordCorrect = await bcrypt.compare(body.password, user.hash)
      if (!isPasswordCorrect) error.throw({ name: 'UnauthorizedError' })
      const session = await Session.create({
        expiresAt: moment().add(30, 'days').format(),
        userId: user.id,
      })
      ctx
        .render(session)
        .setHeader('Access-Control-Expose-Headers', 'X-Auth-Token')
        .setHeader('X-Auth-Token', session.id)
        .then(await next)
    })

    /**
     * @apiGroup Session
     * @api {delete} /sessions/:token DELETE Session
     */
    .delete('/:token', async (ctx, next) => {
      const session = await Session
        .destroy({ where: { id: ctx.params.token } })
        .parseDestroy()
        .throwIfNotFound()
      ctx
        .render(session)
        .then(await next)
    })
})
