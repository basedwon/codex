const { _, log } = require('basd')
const ERRORS = require('./codex-errors')

/**
 * Represents the structure of a model.
 */
class Model {
  /**
   * Constructs a new Model.
   * @param {string} type - Model type.
   * @param {object} fields - Fields for the model.
   * @param {object} config - Additional configuration for the model.
   * @param {object} codex - Reference to the codex.
   */
  constructor(type, fields, config, codex) {
    _.objProp(this, 'codex', codex)
    this.type = type
    this.fields = {}
    for (const [key, field] of _.entries(fields))
      this.addField(key, field)
    _.assign(this, config)
  }

  /**
   * Adds a new field to the model.
   * @param {string} key - The key for the field.
   * @param {Object} config - The configuration for the field.
   * @returns {Field} - The added field.
   */
  addField(key, config) {
    const field = this.codex.factory.createField(key, config, this)
    this.fields[field.name] = field
    return field
  }

  /**
   * Retrieves a field from the model by its key.
   * @param {string|Field} key - The key of the field or the field itself.
   * @param {boolean} [throwError=true] - Indicates whether to throw an error if the field is not found.
   * @returns {Field|null} - The field if found, otherwise null.
   */
  getField(key, throwError = true) {
    if (key instanceof Field)
      return key
    const field = this.fields[key] || null
    if (!field && throwError)
      throw new Error(`Field with key "${key}" could not be found`)
    return field
  }

  /**
   * Creates an entity based on the model definition.
   * @param {Object} data - The data for the entity.
   * @param {boolean} [throwError=true] - Indicates whether to throw an error if the data is invalid.
   * @returns {Object} - The created entity.
   */
  create(data, throwError = true) {
    const entity = {}
    for (const [prop, field] of _.entries(this.fields)) {
      let value = _.get(data, prop)
      if (field.list) {
        if (_.isNil(value)) value = []
        value = value.map(v => {
          if (!field.valid(v, false))
            throw new Error(ERRORS.INVALID_FIELD_ITEM(prop, this.type))
          return field.create(v)
        })
      } else {
        if (!field.valid(value, false))
          throw new Error(ERRORS.INVALID_FIELD_ITEM(prop, this.type))
        if (!_.isNil(value) && field.required)
          value = field.create(value)
      }
      _.setWith(entity, prop, value, Object)
    }
    this.valid(entity, throwError)
    return entity
  }

  /**
   * Determines if the provided data has errors based on the model definition.
   * @param {Object} data - The data to validate.
   * @returns {string|number} - The error message if there's an error, otherwise 0.
   */
  hasError(data) {
    for (const [prop, field] of Object.entries(this.fields)) {
      const value = _.get(data, prop)
      if (field.list) {
        if (field.required && (_.isNil(value) || _.isEmpty(value)))
          return ERRORS.REQUIRED_LIST_FIELD(prop, field.type)
        if (!_.isArray(value))
          return ERRORS.INVALID_LIST_FIELD(prop)
        for (const val of value)
          if (!field.valid(val))
            return ERRORS.INVALID_FIELD_TYPE(field.type, typeof val, val)
      } else {
        if (_.isNil(value) && field.required)
          return ERRORS.REQUIRED_FIELD(prop, field.type)
        if (!field.valid(value))
          return ERRORS.INVALID_FIELD_TYPE(field.type, typeof value, value)
      }
    }
    return 0
  }

  /**
   * Validates the provided data based on the model definition.
   * @param {Object} data - The data to validate.
   * @param {boolean} [throwError=true] - Indicates whether to throw an error if the data is invalid.
   * @returns {boolean} - True if the data is valid, otherwise false.
   */
  valid(data, throwError = true) {
    const error = this.hasError(data)
    if (error && throwError) throw new Error(error)
    else if (error) return false
    return true
  }
}

module.exports = Model
