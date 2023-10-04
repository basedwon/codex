const { _, log } = require('basd')
const Model = require('./codex-model')
const Field = require('./codex-field')

/**
 * Class responsible for creating models and fields.
 */
class Factory {
  /**
   * Constructs a new Factory.
   * @param {object} registry - The registry to lookup classes.
   */
  constructor(registry) {
    this.registry = registry
  }

  /**
   * Creates a model instance.
   * @param {string} type - The model type.
   * @param {object} config - Configuration for the model.
   * @param {object} codex - Reference to the codex.
   * @returns {Model} - Created model instance.
   */
  createModel(type, config, codex) {
    if (!type)
      throw new Error(`Model requires a type property`)
    const { fields, ...extra } = config
    let modelClass = this.registry.get(['model', type])
    if (!modelClass)
      modelClass = this.registry.get('model.default')
    if (!this.registry.isValidClass(modelClass, Model) && modelClass !== Model)
      throw new Error(`Invalid model class`)
    return _.nameExtend(_.ucf(type), modelClass, type, fields, extra, codex)
  }

  /**
   * Creates a field instance.
   * @param {string} key - Field key.
   * @param {object} config - Configuration for the field.
   * @param {Model} model - Reference to the model.
   * @returns {Field} - Created field instance.
   */
  createField(key, config, model) {
    let fieldClass = this.registry.get(['field', config.type])
    if (!fieldClass)
      fieldClass = this.registry.get('field.foreign')
    if (!this.registry.isValidClass(fieldClass, Field))
      throw new Error(`Invalid field class`)
    return new fieldClass(key, config, model)
  }
}

module.exports = Factory
