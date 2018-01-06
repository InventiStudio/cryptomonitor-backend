## Modules
Module | Description
------ | -----------
[utils/macros](#markdown-header-utilsmacros) | Macros that helps with sequelize queries
[utils/slug](#markdown-header-utilsslug) | Simple function that generate slug
[utils/validate](#markdown-header-utilsvalidate) | Validation utility

## utils/macros
Macros that helps with sequelize queries


* [utils/macros](#markdown-header-utilsmacros)
    * [.whereId(value)](#markdown-header-utilsmacroswhereidvalue-where) ⇒ Where
    * [.where(value, [key])](#markdown-header-utilsmacroswherevalue-key-where) ⇒ Where

### utils/macros.whereId(value) ⇒ Where
**Kind**: static method of [utils/macros](#markdown-header-utilsmacros)  
**Returns**: Where - Where query  

| Param | Type | Description |
| --- | --- | --- |
| value | * | Search id |

**Example**  
```js
{ ...whereId(10) }
```
### utils/macros.where(value, [key]) ⇒ Where
**Kind**: static method of [utils/macros](#markdown-header-utilsmacros)  
**Returns**: Where - Where query  
**Todo**

- [ ] This should be rather: where(obj) {
return { where: { [Object.keys(obj)[0]]: obj[Object.keys(obj[0])] } } }


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| value | * |  | Search value |
| [key] | String | `id` | Search key |

## utils/slug
Simple function that generate slug

**Example**  
```js
import slug from '@/utils/slug'
```
### utils/slug._default ⇒ String
**Kind**: static property of [utils/slug](#markdown-header-utilsslug)  
**Returns**: String - slug  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| text | String |  | input value |
| [config] | Object |  |  |
| [config.replacement] | String | `-` | Separator |
| [config.lower] | Blolean | `true` | True if slug should be lowercase. |

## utils/validate
Validation utility

**Example**  
```js
import validate from '@/utils/validate'
```

* [utils/validate](#markdown-header-utilsvalidate)
    * _static_
        * [.run(data, schema, [options])](#markdown-header-utilsvalidaterundata-schema-options-wrapper) ⇒ Wrapper
        * [.preset(data)](#markdown-header-utilsvalidatepresetdata)
    * _inner_
        * [~Wrapper](#markdown-header-utilsvalidatewrapper) ↩︎
            * [.throwIfInvalid([name])](#markdown-header-wrapperthrowifinvalidname-wrapper) ⇒ Wrapper
            * [.get()](#markdown-header-wrapperget-object) ⇒ Object
            * [.otherwise()](#markdown-header-wrapperotherwise)

### utils/validate.run(data, schema, [options]) ⇒ [Wrapper](#markdown-header-utilsvalidatewrapper)
It runs validation

**Kind**: static method of [utils/validate](#markdown-header-utilsvalidate)  
**Returns**: Wrapper - Wrapped result of validation  

| Param | Type | Description |
| --- | --- | --- |
| data | Object | object that should be validated |
| schema | Object | validation schema |
| [options] | Object | Options passed to schema-inspector validator |

### utils/validate.preset(data)
Runs validation

**Kind**: static method of [utils/validate](#markdown-header-utilsvalidate)  

| Param | Type | Description |
| --- | --- | --- |
| data | Object | object that should be validated |

### utils/validate~Wrapper ↩︎
**Kind**: inner typedef of [utils/validate](#markdown-header-utilsvalidate)  
**Chainable**  

* [~Wrapper](#markdown-header-utilsvalidatewrapper) ↩︎
    * [.throwIfInvalid([name])](#markdown-header-wrapperthrowifinvalidname-wrapper) ⇒ Wrapper
    * [.get()](#markdown-header-wrapperget-object) ⇒ Object
    * [.otherwise()](#markdown-header-wrapperotherwise)

#### Wrapper.throwIfInvalid([name]) ⇒ Wrapper
**Kind**: static method of Wrapper  
**Returns**: Wrapper - Wrapper if no errors  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [name] | String | `ValidationError` | Name of error that should be thrown |

#### Wrapper.get() ⇒ Object
**Kind**: static method of Wrapper  
**Returns**: Object - Error data  
#### Wrapper.otherwise()
Let's you call next if no errors

**Kind**: static method of Wrapper  
