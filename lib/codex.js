const { _, log } = require('basd')
const Registry = require('@basd/registry')
const Factory = require('./codex-factory')
const Model = require('./codex-model')
const Field = require('./codex-field')

/**
 * Main class for handling models and fields.
 */
class Codex {
  static get Codex() { return Codex }
  static get Model() { return Model }
  static get Field() { return Field }
  static get Factory() { return Factory }
  static get classes() { return {
    'model.default': Model,
    'field.string': Field.String,
    'field.number': Field.Number,
    'field.foreign': Field.Foreign,
  }}
  /**
   * Constructs a new Codex.
   * @param {object} models - Initial set of models.
   * @param {object} opts - Options for the codex.
   * @param {object} assign - Additional properties to assign.
   */
  constructor(models = {}, opts = {}, assign = {}) {
    opts = _.merge({ classes: {
      'model.default': Model,
      'field.string': Field.String,
      'field.number': Field.Number,
      'field.foreign': Field.Foreign,
    }}, opts)
    _.objProp(this, 'registry', Registry.get(opts), { show: false })
    _.objProp(this, 'factory', opts.factory || new Factory(this.registry), { show: false })
    _.objProp(this, 'opts', _.defaults(opts, {
      strict: true,
      required: true,
    }))
    _.objProp(this, 'models', {}, { show: true })
    _.objProps(this, assign, { show: false })
    this.addModels(this.parseModels(models))
    // this.validModels()
  }

  /**
   * Parses the provided models.
   * @param {Object} models - The models to parse.
   * @param {Object} [opts={}] - Additional options.
   * @returns {Object} - The parsed models.
   */
  parseModels(models) {
    models = models || this.models
    return this.constructor.parseModels(models, this.opts)
  }

  /**
   * Parse provided models into a structured format.
   * @param {Object} models - The models to be parsed.
   * @param {Object} [opts={}] - Additional options for parsing.
   * @returns {Object} The parsed models.
   * @static
   */
  static parseModels(models, opts = {}) {
    models = _.cloneDeep(models)
    for (const [type, config] of _.entries(models)) {
      const model = this.parseModel(type, config, opts)
      models[model.type] = model
    }
    return models
  }

  /**
   * Parse a model configuration into a structured format.
   * @param {string} type - The type of the model.
   * @param {Object} config - The model configuration.
   * @param {Object} [opts={}] - Additional options for parsing.
   * @returns {Object} The parsed model.
   * @static
   */
  static parseModel(type, config, opts = {}) {
    if (!config)
      [type, config] = [null, type]
    if (!config.fields)
      config = { fields: config }
    type = type || config?.type
    if (!type)
      throw new Error(`Model requires a type property`)
    const { fields, ...extra } = config
    for (const [key, field] of _.entries(fields))
      fields[key] = this.parseField(key, field, opts)
    return { type, fields, ...extra }
  }

  /**
   * Parse a field configuration into a structured format.
   * @param {string} key - The key of the field.
   * @param {Object|string} config - The field configuration or type.
   * @param {Object} [opts={}] - Additional options for parsing.
   * @returns {Object} The parsed field.
   * @static
   */
  static parseField(key, config, opts = {}) {
    if (_.isString(config))
      config = { type: config }
    let { type = 'string', required = !!opts.required } = config
    if (opts.parseField) {
      type = opts.parseField(type, config)
    } else {
      if (_.isString(config.list) && !config.type) {
        type = config.list
        config.list = true
      }
    }
    if (type.startsWith('*')) {
      type = type.slice(1)
      required = true
    } else if (type.startsWith('~')) {
      type = type.slice(1)
      required = false
    }
    config.type = type
    config.required = required
    return { type, required, ...config }
  }

  /**
   * Validates the provided models.
   * @param {Object} [models={}] - The models to validate.
   * @returns {boolean} - True if all models are valid, otherwise false.
   */
  validModels(models) {
    models = models || this.models
    return this.constructor.validModels(models, this.registry)
  }

  /**
   * Validate the provided models against the registered types.
   * @param {Object} [models={}] - The models to be validated.
   * @param {Object} registry - The registry of valid field types.
   * @param {boolean} [throwError=true] - Determines whether to throw an error on validation failure.
   * @returns {boolean} True if all models are valid, false otherwise.
   * @static
   */
  static validModels(models = {}, registry, throwError = true) {
    for (const [type, model] of _.entries(models)) {
      for (const [key, field] of _.entries(model.fields)) {
        if (registry.has(['field', field.type]))
          continue
        const exists = !!models[field.type]
        if (!exists && throwError)
          throw new Error(`Invalid field type "${field.type}"`)
        else if (!exists)
          return false
      }
    }
    return true
  }

  /**
   * Adds multiple models to the Codex instance.
   * @param {Object} models - The models to add.
   */
  addModels(models) {
    for (let [type, config] of _.entries(models))
      this.addModel(type, config)
  }

  /**
   * Adds a single model to the Codex instance.
   * @param {string} type - The type of the model.
   * @param {Object} config - The configuration for the model.
   * @returns {Model} - The added model.
   */
  addModel(type, config) {
    config = this.constructor.parseModel(type, config)
    const model = this.factory.createModel(type, config, this)
    this.models[model.type] = model
    return model
  }

  /**
   * Retrieves a model from the Codex instance by its type.
   * @param {string|Model} type - The type of the model or the model itself.
   * @param {boolean} [throwError=true] - Indicates whether to throw an error if the model is not found.
   * @returns {Model|null} - The model if found, otherwise null.
   */
  getModel(type, throwError = true) {
    if (type instanceof Model)
      return type
    const model = this.models[type] || null
    if (!model && throwError)
      throw new Error(`Model type "${type}" could not be found`)
    return model
  }

  /**
   * Creates an entity of a specific model type.
   * @param {string} type - The type of the model.
   * @param {Object} data - The data for the entity.
   * @param {boolean} throwError - Indicates whether to throw an error if the data is invalid.
   * @returns {Object} - The created entity.
   */
  create(type, data, throwError) {
    return this.getModel(type).create(data, throwError)
  }

  /**
   * Validates an entity of a specific model type.
   * @param {string} type - The type of the model.
   * @param {Object} data - The data to validate.
   * @param {boolean} throwError - Indicates whether to throw an error if the data is invalid.
   * @returns {boolean} - True if the entity is valid, otherwise false.
   */
  valid(type, data, throwError) {
    return this.getModel(type).valid(data, throwError)
  }
}

module.exports = Codex
