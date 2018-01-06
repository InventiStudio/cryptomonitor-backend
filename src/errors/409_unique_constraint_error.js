import error from '@/lib/error'

export default function (ctx, err) {
  return error.render(ctx, 409, err.data)
}
