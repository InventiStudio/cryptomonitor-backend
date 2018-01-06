import bcrypt from 'bcryptjs'
import moment from 'moment'
import router from '@/lib/router'
import error from '@/lib/error'
import Session from '@/models/session'
import User from '@/models/user'
import validate from '@/utils/validate'

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
      const { body } = ctx.request
      validate
        .run(body, { password: { type: 'string', minLength: 6, optional: true } })
        .throwIfInvalid()
      User.sanitize(body)
      User.validate(body).throwIfInvalid()
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
