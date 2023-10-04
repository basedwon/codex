const { _, log } = require('basd')

/**
 * Base class for fields.
 */
class Field {
  static get String() { return StringField }
  static get Number() { return NumberField }
  static get Foreign() { return ForeignField }
  static get type() { return null }
  /**
   * Constructs a new Field.
   * @param {string} key - Field key.
   * @param {object} config - Configuration for the field.
   * @param {Model} model - Reference to the model.
   */
  constructor(key, config, model) {
    this.name = key
    this.type = config.type
    this.required = !!config.required
    if (!this._validType())
      throw new Error(`Invalid field "${this.type}"`)
    _.assign(this, config)
    _.objProp(this, '_model', model)
  }

  /**
   * Determines if the type of the field is valid.
   * @returns {boolean} - True if the type is valid, otherwise false.
   */
  _validType() {
    return this.type === this.constructor.type
  }

  /**
   * Creates a new field instance.
   * @param {*} value - The value for the field.
   * @param {...*} args - Additional arguments.
   * @returns {*} - The created field value.
   */
  create(value = null, ...args) {
    if (_.isNil(value) && !_.isNil(this.default))
      value = _.isFunction(this.default) ? this.default() : this.default
    return this._create(value, ...args)
  }

  /**
   * Process the value and return a created instance for the given value.
   * @param {any} value - The value to be processed.
   * @returns {any} The created instance of the value.
   * @private
   */
  _create(value) {
    return value
  }

  /**
   * Validates the value of the field.
   * @param {*} value - The value to validate.
   * @param {...*} args - Additional arguments.
   * @returns {boolean} - True if the value is valid, otherwise false.
   */
  valid(value, ...args) {
    if (_.isNil(value) && !this.required)
      return true
    return this._valid(value, ...args)
  }

  /**
   * Validate the provided value against the expected type.
   * @param {any} value - The value to be validated.
   * @returns {boolean} True if the value is valid, false otherwise.
   * @private
   */
  _valid(value) {
    return typeof value === this.type
  }
}

/**
 * Field type for strings.
 */
class StringField extends Field {
  static get type() { return 'string' }
  _create(value) {
    return String(value)
  }
  _valid(value) {
    return typeof value === 'string'
  }
}

/**
 * Field type for numbers.
 */
class NumberField extends Field {
  static get type() { return 'number' }
  _create(value) {
    return Number(value)
  }
  _valid(value) {
    return typeof value === 'number'
  }
}

/**
 * Field type for foreign relationships.
 */
class ForeignField extends Field {
  static get type() { return 'foreign' }
  _validType() {
    return true
  }
  _create(value, throwError) {
    return this._model.codex.getModel(this.type).create(value, throwError)
  }
  _valid(value, throwError) {
    return this._model.codex.getModel(this.type).valid(value, throwError)
  }
}

module.exports = Field
