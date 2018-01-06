import sequelizeValidationError             from './sequelize_validation_error'
import sequelizeUniqueConstraintError       from './sequelize_unique_constraint_error'
import sequelizeForeignKeyConstraintError   from './sequelize_foreign_key_constraint-error'
import validationError                      from './validation_error'
import notFoundError                        from './not_found_error'
import unauthorizedError                    from './401_unauthorized_error'
import forbiddenError                       from './403_forbidden_error'
import uniqueConstraintError                from './409_unique_constraint_error'
import unprocessableEntityError             from './422_unprocessable_entity_error'

export default function (ctx, err) {
  switch (err.name) {
    // Sequalize
    case 'SequelizeValidationError':            return sequelizeValidationError(ctx, err)
    case 'SequelizeUniqueConstraintError':      return sequelizeUniqueConstraintError(ctx, err)
    case 'SequelizeForeignKeyConstraintError':  return sequelizeForeignKeyConstraintError(ctx, err)
    // Schema-inspector
    case 'ValidationError':                     return validationError(ctx, err)
    // 4xx
    case 'UnauthorizedError':                   return unauthorizedError(ctx, err)
    case 'ForbiddenError':                      return forbiddenError(ctx, err)
    case 'NotFoundError':                       return notFoundError(ctx, err)
    case 'UniqueConstraintError':               return uniqueConstraintError(ctx, err)
    case 'UnprocessableEntityError':            return unprocessableEntityError(ctx, err)
    default:                                    throw err
  }
}
