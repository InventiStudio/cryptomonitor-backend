import error from '@/lib/error'

export default function (ctx) {
  return error.render(ctx, 404)
}
