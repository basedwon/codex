## Classes

<dl>
<dt><a href="#Factory">Factory</a></dt>
<dd><p>Class responsible for creating models and fields.</p>
</dd>
<dt><a href="#Field">Field</a></dt>
<dd><p>Base class for fields.</p>
</dd>
<dt><a href="#StringField">StringField</a></dt>
<dd><p>Field type for strings.</p>
</dd>
<dt><a href="#NumberField">NumberField</a></dt>
<dd><p>Field type for numbers.</p>
</dd>
<dt><a href="#ForeignField">ForeignField</a></dt>
<dd><p>Field type for foreign relationships.</p>
</dd>
<dt><a href="#Model">Model</a></dt>
<dd><p>Represents the structure of a model.</p>
</dd>
<dt><a href="#Codex">Codex</a></dt>
<dd><p>Main class for handling models and fields.</p>
</dd>
</dl>

## Constants

<dl>
<dt><a href="#ERRORS">ERRORS</a></dt>
<dd><p>Error messages for invalid configurations.</p>
</dd>
</dl>

<a name="Factory"></a>

## Factory
Class responsible for creating models and fields.

**Kind**: global class  

* [Factory](#Factory)
    * [new Factory(registry)](#new_Factory_new)
    * [.createModel(type, config, codex)](#Factory+createModel) ⇒ [<code>Model</code>](#Model)
    * [.createField(key, config, model)](#Factory+createField) ⇒ [<code>Field</code>](#Field)

<a name="new_Factory_new"></a>

### new Factory(registry)
Constructs a new Factory.


| Param | Type | Description |
| --- | --- | --- |
| registry | <code>object</code> | The registry to lookup classes. |

<a name="Factory+createModel"></a>

### factory.createModel(type, config, codex) ⇒ [<code>Model</code>](#Model)
Creates a model instance.

**Kind**: instance method of [<code>Factory</code>](#Factory)  
**Returns**: [<code>Model</code>](#Model) - - Created model instance.  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | The model type. |
| config | <code>object</code> | Configuration for the model. |
| codex | <code>object</code> | Reference to the codex. |

<a name="Factory+createField"></a>

### factory.createField(key, config, model) ⇒ [<code>Field</code>](#Field)
Creates a field instance.

**Kind**: instance method of [<code>Factory</code>](#Factory)  
**Returns**: [<code>Field</code>](#Field) - - Created field instance.  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Field key. |
| config | <code>object</code> | Configuration for the field. |
| model | [<code>Model</code>](#Model) | Reference to the model. |

<a name="Field"></a>

## Field
Base class for fields.

**Kind**: global class  

* [Field](#Field)
    * [new Field(key, config, model)](#new_Field_new)
    * [._validType()](#Field+_validType) ⇒ <code>boolean</code>
    * [.create(value, ...args)](#Field+create) ⇒ <code>\*</code>
    * [.valid(value, ...args)](#Field+valid) ⇒ <code>boolean</code>

<a name="new_Field_new"></a>

### new Field(key, config, model)
Constructs a new Field.


| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Field key. |
| config | <code>object</code> | Configuration for the field. |
| model | [<code>Model</code>](#Model) | Reference to the model. |

<a name="Field+_validType"></a>

### field.\_validType() ⇒ <code>boolean</code>
Determines if the type of the field is valid.

**Kind**: instance method of [<code>Field</code>](#Field)  
**Returns**: <code>boolean</code> - - True if the type is valid, otherwise false.  
<a name="Field+create"></a>

### field.create(value, ...args) ⇒ <code>\*</code>
Creates a new field instance.

**Kind**: instance method of [<code>Field</code>](#Field)  
**Returns**: <code>\*</code> - - The created field value.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| value | <code>\*</code> | <code></code> | The value for the field. |
| ...args | <code>\*</code> |  | Additional arguments. |

<a name="Field+valid"></a>

### field.valid(value, ...args) ⇒ <code>boolean</code>
Validates the value of the field.

**Kind**: instance method of [<code>Field</code>](#Field)  
**Returns**: <code>boolean</code> - - True if the value is valid, otherwise false.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The value to validate. |
| ...args | <code>\*</code> | Additional arguments. |

<a name="StringField"></a>

## StringField
Field type for strings.

**Kind**: global class  
<a name="NumberField"></a>

## NumberField
Field type for numbers.

**Kind**: global class  
<a name="ForeignField"></a>

## ForeignField
Field type for foreign relationships.

**Kind**: global class  
<a name="Model"></a>

## Model
Represents the structure of a model.

**Kind**: global class  

* [Model](#Model)
    * [new Model(type, fields, config, codex)](#new_Model_new)
    * [.addField(key, config)](#Model+addField) ⇒ [<code>Field</code>](#Field)
    * [.getField(key, [throwError])](#Model+getField) ⇒ [<code>Field</code>](#Field) \| <code>null</code>
    * [.create(data, [throwError])](#Model+create) ⇒ <code>Object</code>
    * [.hasError(data)](#Model+hasError) ⇒ <code>string</code> \| <code>number</code>
    * [.valid(data, [throwError])](#Model+valid) ⇒ <code>boolean</code>

<a name="new_Model_new"></a>

### new Model(type, fields, config, codex)
Constructs a new Model.


| Param | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | Model type. |
| fields | <code>object</code> | Fields for the model. |
| config | <code>object</code> | Additional configuration for the model. |
| codex | <code>object</code> | Reference to the codex. |

<a name="Model+addField"></a>

### model.addField(key, config) ⇒ [<code>Field</code>](#Field)
Adds a new field to the model.

**Kind**: instance method of [<code>Model</code>](#Model)  
**Returns**: [<code>Field</code>](#Field) - - The added field.  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | The key for the field. |
| config | <code>Object</code> | The configuration for the field. |

<a name="Model+getField"></a>

### model.getField(key, [throwError]) ⇒ [<code>Field</code>](#Field) \| <code>null</code>
Retrieves a field from the model by its key.

**Kind**: instance method of [<code>Model</code>](#Model)  
**Returns**: [<code>Field</code>](#Field) \| <code>null</code> - - The field if found, otherwise null.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| key | <code>string</code> \| [<code>Field</code>](#Field) |  | The key of the field or the field itself. |
| [throwError] | <code>boolean</code> | <code>true</code> | Indicates whether to throw an error if the field is not found. |

<a name="Model+create"></a>

### model.create(data, [throwError]) ⇒ <code>Object</code>
Creates an entity based on the model definition.

**Kind**: instance method of [<code>Model</code>](#Model)  
**Returns**: <code>Object</code> - - The created entity.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| data | <code>Object</code> |  | The data for the entity. |
| [throwError] | <code>boolean</code> | <code>true</code> | Indicates whether to throw an error if the data is invalid. |

<a name="Model+hasError"></a>

### model.hasError(data) ⇒ <code>string</code> \| <code>number</code>
Determines if the provided data has errors based on the model definition.

**Kind**: instance method of [<code>Model</code>](#Model)  
**Returns**: <code>string</code> \| <code>number</code> - - The error message if there's an error, otherwise 0.  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | The data to validate. |

<a name="Model+valid"></a>

### model.valid(data, [throwError]) ⇒ <code>boolean</code>
Validates the provided data based on the model definition.

**Kind**: instance method of [<code>Model</code>](#Model)  
**Returns**: <code>boolean</code> - - True if the data is valid, otherwise false.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| data | <code>Object</code> |  | The data to validate. |
| [throwError] | <code>boolean</code> | <code>true</code> | Indicates whether to throw an error if the data is invalid. |

<a name="Codex"></a>

## Codex
Main class for handling models and fields.

**Kind**: global class  

* [Codex](#Codex)
    * [new Codex(models, opts, assign)](#new_Codex_new)
    * _instance_
        * [.parseModels(models, [opts])](#Codex+parseModels) ⇒ <code>Object</code>
        * [.validModels([models])](#Codex+validModels) ⇒ <code>boolean</code>
        * [.addModels(models)](#Codex+addModels)
        * [.addModel(type, config)](#Codex+addModel) ⇒ [<code>Model</code>](#Model)
        * [.getModel(type, [throwError])](#Codex+getModel) ⇒ [<code>Model</code>](#Model) \| <code>null</code>
        * [.create(type, data, throwError)](#Codex+create) ⇒ <code>Object</code>
        * [.valid(type, data, throwError)](#Codex+valid) ⇒ <code>boolean</code>
    * _static_
        * [.parseModels(models, [opts])](#Codex.parseModels) ⇒ <code>Object</code>
        * [.parseModel(type, config, [opts])](#Codex.parseModel) ⇒ <code>Object</code>
        * [.parseField(key, config, [opts])](#Codex.parseField) ⇒ <code>Object</code>
        * [.validModels([models], registry, [throwError])](#Codex.validModels) ⇒ <code>boolean</code>

<a name="new_Codex_new"></a>

### new Codex(models, opts, assign)
Constructs a new Codex.


| Param | Type | Description |
| --- | --- | --- |
| models | <code>object</code> | Initial set of models. |
| opts | <code>object</code> | Options for the codex. |
| assign | <code>object</code> | Additional properties to assign. |

<a name="Codex+parseModels"></a>

### codex.parseModels(models, [opts]) ⇒ <code>Object</code>
Parses the provided models.

**Kind**: instance method of [<code>Codex</code>](#Codex)  
**Returns**: <code>Object</code> - - The parsed models.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| models | <code>Object</code> |  | The models to parse. |
| [opts] | <code>Object</code> | <code>{}</code> | Additional options. |

<a name="Codex+validModels"></a>

### codex.validModels([models]) ⇒ <code>boolean</code>
Validates the provided models.

**Kind**: instance method of [<code>Codex</code>](#Codex)  
**Returns**: <code>boolean</code> - - True if all models are valid, otherwise false.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [models] | <code>Object</code> | <code>{}</code> | The models to validate. |

<a name="Codex+addModels"></a>

### codex.addModels(models)
Adds multiple models to the Codex instance.

**Kind**: instance method of [<code>Codex</code>](#Codex)  

| Param | Type | Description |
| --- | --- | --- |
| models | <code>Object</code> | The models to add. |

<a name="Codex+addModel"></a>

### codex.addModel(type, config) ⇒ [<code>Model</code>](#Model)
Adds a single model to the Codex instance.

**Kind**: instance method of [<code>Codex</code>](#Codex)  
**Returns**: [<code>Model</code>](#Model) - - The added model.  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | The type of the model. |
| config | <code>Object</code> | The configuration for the model. |

<a name="Codex+getModel"></a>

### codex.getModel(type, [throwError]) ⇒ [<code>Model</code>](#Model) \| <code>null</code>
Retrieves a model from the Codex instance by its type.

**Kind**: instance method of [<code>Codex</code>](#Codex)  
**Returns**: [<code>Model</code>](#Model) \| <code>null</code> - - The model if found, otherwise null.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| type | <code>string</code> \| [<code>Model</code>](#Model) |  | The type of the model or the model itself. |
| [throwError] | <code>boolean</code> | <code>true</code> | Indicates whether to throw an error if the model is not found. |

<a name="Codex+create"></a>

### codex.create(type, data, throwError) ⇒ <code>Object</code>
Creates an entity of a specific model type.

**Kind**: instance method of [<code>Codex</code>](#Codex)  
**Returns**: <code>Object</code> - - The created entity.  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | The type of the model. |
| data | <code>Object</code> | The data for the entity. |
| throwError | <code>boolean</code> | Indicates whether to throw an error if the data is invalid. |

<a name="Codex+valid"></a>

### codex.valid(type, data, throwError) ⇒ <code>boolean</code>
Validates an entity of a specific model type.

**Kind**: instance method of [<code>Codex</code>](#Codex)  
**Returns**: <code>boolean</code> - - True if the entity is valid, otherwise false.  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | The type of the model. |
| data | <code>Object</code> | The data to validate. |
| throwError | <code>boolean</code> | Indicates whether to throw an error if the data is invalid. |

<a name="Codex.parseModels"></a>

### Codex.parseModels(models, [opts]) ⇒ <code>Object</code>
Parse provided models into a structured format.

**Kind**: static method of [<code>Codex</code>](#Codex)  
**Returns**: <code>Object</code> - The parsed models.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| models | <code>Object</code> |  | The models to be parsed. |
| [opts] | <code>Object</code> | <code>{}</code> | Additional options for parsing. |

<a name="Codex.parseModel"></a>

### Codex.parseModel(type, config, [opts]) ⇒ <code>Object</code>
Parse a model configuration into a structured format.

**Kind**: static method of [<code>Codex</code>](#Codex)  
**Returns**: <code>Object</code> - The parsed model.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| type | <code>string</code> |  | The type of the model. |
| config | <code>Object</code> |  | The model configuration. |
| [opts] | <code>Object</code> | <code>{}</code> | Additional options for parsing. |

<a name="Codex.parseField"></a>

### Codex.parseField(key, config, [opts]) ⇒ <code>Object</code>
Parse a field configuration into a structured format.

**Kind**: static method of [<code>Codex</code>](#Codex)  
**Returns**: <code>Object</code> - The parsed field.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| key | <code>string</code> |  | The key of the field. |
| config | <code>Object</code> \| <code>string</code> |  | The field configuration or type. |
| [opts] | <code>Object</code> | <code>{}</code> | Additional options for parsing. |

<a name="Codex.validModels"></a>

### Codex.validModels([models], registry, [throwError]) ⇒ <code>boolean</code>
Validate the provided models against the registered types.

**Kind**: static method of [<code>Codex</code>](#Codex)  
**Returns**: <code>boolean</code> - True if all models are valid, false otherwise.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [models] | <code>Object</code> | <code>{}</code> | The models to be validated. |
| registry | <code>Object</code> |  | The registry of valid field types. |
| [throwError] | <code>boolean</code> | <code>true</code> | Determines whether to throw an error on validation failure. |

<a name="ERRORS"></a>

## ERRORS
Error messages for invalid configurations.

**Kind**: global constant  
