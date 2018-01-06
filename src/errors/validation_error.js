import error from '@/lib/error'

export default function (ctx, err) {
  return error.render(ctx, 422, err.data.error.reduce((acc, e) => {
    e.property = e.property.replace('@.', '')
    if (!acc[e.property]) acc[e.property] = []
    acc[e.property].push(e.message)
    return acc
  }, {}))
}
