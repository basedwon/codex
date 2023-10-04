/**
 * Error messages for invalid configurations.
 */
const ERRORS = {
  INVALID_FIELD_TYPE: (expected, actual, value) =>
    `Invalid field type, expected ${expected} and got ${actual} "${JSON.stringify(value)}"`,
  REQUIRED_FIELD: (prop, type) => 
    `The field "${prop}" is required and should be a "${type}"`,
  REQUIRED_LIST_FIELD: (prop, type) => 
    `The field "${prop}" is required and should be a list of "${type}"`,
  INVALID_LIST_FIELD: (prop) => 
    `Field ${prop} should be an array`,
  INVALID_FIELD_ITEM: (prop, type) => 
    `Invalid field item for "${prop}" for model type "${type}"`,
  INVALID_FOREIGN_FIELD: (type) => 
    `Invalid foreign field "${type}"`,
}

module.exports = ERRORS
