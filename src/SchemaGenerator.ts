import { generateSchemaForBoolean } from "./generators/generateSchemaForBoolean";
import { generateSchemaForNumber } from "./generators/generateSchemaForNumber";
import { generateSchemaForString } from "./generators/generateSchemaForString";

interface SchemaGenerationOptions {
    makeFieldsRequired: boolean;
}

const defaultSchemaGenerationOptions: SchemaGenerationOptions = {
    makeFieldsRequired: true
};

export class SchemaGenerator {
    private readonly INDENT_SIZE = 4;

    generateSchemaFrom(
        data: string | [] | object | number | boolean,
        nestLevel = 0,
        options: SchemaGenerationOptions = defaultSchemaGenerationOptions
    ) {
        if(typeof data === 'string') {
            return generateSchemaForString({makeFieldsRequired: options.makeFieldsRequired});
        } else if(typeof data === 'number') {
            return generateSchemaForNumber({makeFieldsRequired: options.makeFieldsRequired});
        } else if(typeof data === 'boolean') {
            return generateSchemaForBoolean({makeFieldsRequired: options.makeFieldsRequired});
        } else if(Array.isArray(data)) {
            if(data.length === 0) {
                return `Joi.array().required()`
            }

            const itemsSchema = this.generateSchemaFrom(data[0], nestLevel + 1, {
                makeFieldsRequired: false
            });

            return `Joi.array().items(
${this.getPadding(nestLevel)}${itemsSchema}
${this.getPadding(nestLevel-1)}).required()`;
        } else if(typeof data === 'object') {
            if(Object.keys(data).length === 0) {
                return `Joi.object({}).required()`;
            }

            const schemasOfEntries = Object.entries(data).map(([key, value]) =>
                `${key}: ${this.generateSchemaFrom(value, nestLevel + 1)}`)
                .join(`,\n${this.getPadding(nestLevel)}`);

        return `Joi.object({
${this.getPadding(nestLevel)}${schemasOfEntries}
${this.getPadding(nestLevel-1)}}).required()`;
        }
    }

    private getPadding(nestLevel: number): string {
        return ' '.repeat((nestLevel + 1) * this.INDENT_SIZE);
    }
}
