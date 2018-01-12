import Session from './session/session.model'
import User from './user/user.model'

User.hasMany(Session)
Session.belongsTo(User)
