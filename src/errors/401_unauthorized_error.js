import error from '@/lib/error'

export default function (ctx) {
  return error.render(ctx, 401, 'Invalid email or password.')
}
