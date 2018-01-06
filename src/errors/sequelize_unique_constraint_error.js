import error from '@/lib/error'

export default function (ctx, err) {
  return error.render(ctx, 409, err.errors && err.errors.length > 0
    ? err.errors.reduce((acc, val) => {
      acc[val.path] = [val.message]
      return acc
    }, {})
    : err.toString(),
  )
}
