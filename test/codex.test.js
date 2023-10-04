const Registry = require('@basd/registry')
const Codex = require('../lib/codex')
const Factory = require('../lib/codex-factory')
const Model = require('../lib/codex-model')
const Field = require('../lib/codex-field')
const { String: StringField, Number: NumberField, Foreign: ForeignField } = Field

describe('Factory', () => {
  const factory = new Factory(Registry.get(Codex))
  
  it('should create a model', () => {
    const modelConfig = { fields: {} }
    const model = factory.createModel('TestModel', modelConfig)
    expect(model).to.be.instanceOf(Model)
    expect(model.type).to.equal('TestModel')
  })
})

describe('Field', () => {
  it('should validate a string field correctly', () => {
    const stringField = new StringField('name', { type: 'string' })
    
    expect(stringField.valid('Hello')).to.be.true
    expect(stringField.valid(123)).to.be.false
  })

  it('should validate a number field correctly', () => {
    const numberField = new NumberField('age', { type: 'number' })
    
    expect(numberField.valid(25)).to.be.true
    expect(numberField.valid('25')).to.be.false
  })
})

describe('Model', () => {
  let codex = new Codex()
  codex.addModel('Person', {
    fields: {
      name: 'string',
      age: 'number'
    }
  })

  it('should create an entity correctly', () => {
    let entity = codex.create('Person', { name: 'Alice', age: 30 })
    expect(entity).to.deep.equal({ name: 'Alice', age: 30 })
  })

  it('should throw error for invalid field', () => {
    expect(() => {
      codex.create('Person', { name: 'Alice', age: '30' })
    }).to.throw(Error)
  })
})

describe('Codex Integration Tests', () => {

  describe('Model Creation and Validation', () => {

    let codex

    beforeEach(() => {
      codex = new Codex({
        User: {
          name: '*string',
          age: 'number',
          friend: '~User'
        }
      })
    })

    it('should create a valid User entity', () => {
      const userData = { name: 'Alice', age: 25, friend: undefined }
      const user = codex.create('User', userData)
      expect(user).to.deep.equal(userData)
    })

    it('should throw error for invalid User entity due to missing required field', () => {
      const userData = { age: 25 }
      expect(() => codex.create('User', userData)).to.throw()
    })

    it('should validate a User with another User as friend', () => {
      const friend = codex.create('User', { name: 'Bob', age: 30 })
      const userData = { name: 'Alice', age: 25, friend }
      const user = codex.create('User', userData)
      expect(user.friend).to.deep.equal(friend)
    })

    it('should throw error for invalid friend field in User entity', () => {
      const friend = { name: 'Bob' }
      const userData = { name: 'Alice', age: 25, friend }
      expect(() => codex.create('User', userData)).to.throw()
    })
  })

  describe('Foreign Field Model Interactions', () => {

    let codex

    beforeEach(() => {
      codex = new Codex({
        User: {
          name: '*string',
          book: '~Book'
        },
        Book: {
          title: '*string',
          author: 'string'
        }
      })
    })

    it('should create a User with a Book as a foreign field', () => {
      const bookData = { title: 'Stalking the Wild Pendulum', author: 'Itzhak Bentov' }
      const book = codex.create('Book', bookData)
      const userData = { name: 'Alice', book }
      const user = codex.create('User', userData)
      expect(user.book).to.deep.equal(bookData)
    })

    it('should throw error for invalid Book in User entity', () => {
      const bookData = { author: 'Itzhak Bentov' }
      const userData = { name: 'Alice', book: bookData }
      expect(() => codex.create('User', userData)).to.throw()
    })
  })
})
