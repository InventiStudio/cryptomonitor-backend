import IO     from 'koa-socket'
import server from '@/lib/server'

const io = new IO()

io.attach(server)

export default io
