import { expect } from 'chai'
import User from '@/models/user'
import { createUser } from '#/helpers/users'
import { John } from '#/fixtures/user'

describe('models/user', () => {
  let userJohn

  beforeEach(async () => {
    await clean()
    userJohn = await createUser(John)
  })

  it('exists', () => {
    expect(userJohn).to.be.ok()
  })

  it('throws a validation error when \'allowNull: false\' properties are nulls', () => {
    [
      {},
      { email: null, hash: null },
      { email: 'john.doe@mail.com', hash: null },
      { email: null, hash: '$2a$10$IoVyq5pzSuXypOdFW324Ve9A5ZFYY4pgtpklwYrVvRto4bXw1NiOm' },
    ]
      .forEach((useCase) => {
        expect(User.build(useCase).validate()).to.be.rejected()
      })
  })
})
