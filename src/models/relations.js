import Session from './session'
import User from './user'
import Content from './content'
import Language from './language'

User.hasMany(Session)
Session.belongsTo(User)

Language.hasMany(Content, { foreignKey: 'languageSlug' })
Content.belongsTo(Language, { foreignKey: 'languageSlug' })
