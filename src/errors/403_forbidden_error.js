import error from '@/lib/error'

export default function (ctx) {
  return error.render(ctx, 403, 'You don\'t have permission for this action.')
}
