import Session from './session/session.model'
import User from './user/user.model'
import Content from './content/content.model'
import Language from './language/language.model'

User.hasMany(Session)
Session.belongsTo(User)

Language.hasMany(Content, { foreignKey: 'languageSlug' })
Content.belongsTo(Language, { foreignKey: 'languageSlug' })
