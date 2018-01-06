import error from '@/lib/error'

export default function (ctx, err) {
  return error.render(ctx, 422, err.data)
}
