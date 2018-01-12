import moment from 'moment'
import error from '@/lib/error'
import Session from '@/modules/session/session.model'

/*
 * TODO BOILER: Auth should be done a bit different. We have a couple of cases we have to address:
 * GET,     user is not logged in                     - 401 Unauthenticated
 * GET,     user is logged in, but has no permission  - 403 Unauthorized
 * GET,     user is logged in, and has permission     - 200 OK
 * GET/:id, user is not logged in                     - 401 Unauthenticated
 * GET/:id, user is logged in, but has no permission  - 404 Not Found
 *   (we don't want to indicate that resource does exist)
 * GET/:id, user is logged in, and has permission     - 200 OK
 */

// TODO: Also, this could mutate `ctx`, so that we don't need to make additional requests
// for user's data in controllers.
export async function isLoggedIn(ctx) {
  const token = ctx.request.header['x-auth-token']
  if (!token) return false
  const session = await Session.findOne({ where: { id: token } })
  if (!session) return false
  const isSessionExpired = moment(session.expiresAt).diff(moment()) < 0
  if (isSessionExpired) return false
  return true
}

export default async function auth(ctx, next) {
  if (!await isLoggedIn(ctx)) error.throw({ name: 'ForbiddenError' })
  await next()
}
