# Codex

[![npm](https://img.shields.io/npm/v/@basd/codex?style=flat&logo=npm)](https://www.npmjs.com/package/@basd/codex)
[![pipeline](https://gitlab.com/frenware/core/codex/badges/master/pipeline.svg)](https://gitlab.com/frenware/core/codex/-/pipelines)
[![license](https://img.shields.io/npm/l/@basd/codex)](https://gitlab.com/frenware/core/codex/-/blob/master/LICENSE)
[![downloads](https://img.shields.io/npm/dw/@basd/codex)](https://www.npmjs.com/package/@basd/codex) 

[![Gitlab](https://img.shields.io/badge/Gitlab%20-%20?logo=gitlab&color=%23383a40)](https://gitlab.com/frenware/core/codex)
[![Github](https://img.shields.io/badge/Github%20-%20?logo=github&color=%23383a40)](https://github.com/basedwon/codex)
[![Twitter](https://img.shields.io/badge/@basdwon%20-%20?logo=twitter&color=%23383a40)](https://twitter.com/basdwon)
[![Discord](https://img.shields.io/badge/Basedwon%20-%20?logo=discord&color=%23383a40)](https://discordapp.com/users/basedwon)

A flexible and robust package that provides a system for managing models, fields, and their validations. Designed to be highly extensible, it provides a solid structure for working with different types of data structures.

## Features

- Define and manage complex data models.
- Field validation for models.
- Extendable with custom fields.
- Supports foreign keys and relationships.
- Easy integration with other systems.

## Installation

Install the package with:

```bash
npm install @basd/codex
```

## Usage

First, import the `Codex` library.

```js
import Codex from '@basd/codex'
```
or
```js
const Codex = require('@basd/codex')
```

### Defining Models

```js
const codex = new Codex({
  user: {
    name: '*string',
    age: 'number',
    friend: '~user'
  }
})

const userModel = codex.getModel('user')
const userInstance = userModel.create({ name: 'John', age: 30 })
```

The above example defines a `user` model with a name, age, and an optional recursive friend relationship.

### Field Validation

Fields are automatically validated upon creation:

```js
const invalidUser = userModel.create({ name: 123, age: 'thirty' })  // This will throw an error
```

Or you can manually validate:

```js
const isValid = codex.valid('user', { username: 'JohnDoe', age: 'twenty five' }) // returns false
```

### Using Custom Fields

```js
class CustomField extends Field {
  // Custom implementation
}
// Add to registry (assuming registry instance is available)
registry.set('field.custom', CustomField)

const customModel = new Model({
  customField: 'custom'
})
```

### Extending Field Types

The library is designed with extensibility in mind. You can easily extend built-in field types or create your own.

For example, to extend the `StringField`:

```js
class CapitalizedStringField extends StringField {
  _create(value) {
    const strValue = super._create(value)
    return strValue.charAt(0).toUpperCase() + strValue.slice(1)
  }
}
```

## Documentation

- [API Reference](/docs/api.md)

### API Reference

- `Field`: The base class for all field types.
- `StringField`, `NumberField`, `ForeignField`: Field types provided by default.
- `Model`: Class to define and manage data models.
- `Factory`: A helper class to create models and fields.
- `Codex`: Main entry point to define and manage the whole system.

For each class and method, refer to the code documentation for detailed usage.

### Extending

You can extend default classes to introduce custom behavior or implement additional field types. Use the Factory class to register and manage custom implementations.

### Error Handling

The library comes with a predefined set of error messages that are thrown when validation fails. You can easily capture these and handle them in your application.

## Tests

In order to run the test suite, simply clone the repository and install its dependencies:

```bash
git clone https://gitlab.com/frenware/core/codex.git
cd codex
npm install
```

To run the tests:

```bash
npm test
```

## Contributing

Thank you! Please see our [contributing guidelines](/docs/contributing.md) for details.

## Donations

If you find this project useful and want to help support further development, please send us some coin. We greatly appreciate any and all contributions. Thank you!

**Bitcoin (BTC):**
```
1JUb1yNFH6wjGekRUW6Dfgyg4J4h6wKKdF
```

**Monero (XMR):**
```
46uV2fMZT3EWkBrGUgszJCcbqFqEvqrB4bZBJwsbx7yA8e2WBakXzJSUK8aqT4GoqERzbg4oKT2SiPeCgjzVH6VpSQ5y7KQ
```

## License

@basd/codex is [MIT licensed](https://gitlab.com/frenware/core/codex/-/blob/master/LICENSE).
