declare module '@basd/codex' {
  type Errors = {
    INVALID_FIELD_TYPE: (expected: string, actual: string, value: any) => string;
    REQUIRED_FIELD: (prop: string, type: string) => string;
    REQUIRED_LIST_FIELD: (prop: string, type: string) => string;
    INVALID_LIST_FIELD: (prop: string) => string;
    INVALID_FIELD_ITEM: (prop: string, type: string) => string;
    INVALID_FOREIGN_FIELD: (type: string) => string;
  };

  type FieldConfig = {
    type: string;
    required?: boolean;
    [key: string]: any;
  };

  type ModelConfig = {
    type?: string;
    fields: Record<string, FieldConfig | string>;
    [key: string]: any;
  };

  class Factory {
    constructor(registry: any);
    createModel(type: string, config: ModelConfig, codex: Codex): Model;
    createField(key: string, config: FieldConfig, model: Model): Field;
  }

  class Field {
    static type: string | null;
    constructor(key: string, config: FieldConfig, model: Model);
    create(value?: any, ...args: any[]): any;
    valid(value: any, ...args: any[]): boolean;
  }

  class StringField extends Field {
    static type: 'string';
  }

  class NumberField extends Field {
    static type: 'number';
  }

  class ForeignField extends Field {
    static type: 'foreign';
  }

  class Model {
    constructor(type: string, fields: Record<string, FieldConfig>, config: any, codex: Codex);
    addField(key: string, config: FieldConfig): Field;
    getField(key: string | Field, throwError?: boolean): Field;
    create(data: any, throwError?: boolean): any;
    hasError(data: any): string | 0;
    valid(data: any, throwError?: boolean): boolean;
  }

  class Codex {
    static Model: typeof Model;
    static Field: typeof Field;
    static Factory: typeof Factory;
    constructor(models?: Record<string, ModelConfig>, opts?: any, assign?: any);
    parseModels(models?: Record<string, ModelConfig>): Record<string, ModelConfig>;
    validModels(models?: Record<string, ModelConfig>): boolean;
    addModels(models: Record<string, ModelConfig>): void;
    addModel(type: string, config: ModelConfig): Model;
    getModel(type: string | Model, throwError?: boolean): Model;
    create(type: string | Model, data: any, throwError?: boolean): any;
    valid(type: string | Model, data: any, throwError?: boolean): boolean;
  }
}
