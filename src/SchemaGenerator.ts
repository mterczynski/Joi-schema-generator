export class SchemaGenerator {
    private readonly INDENT_SIZE = 4;

    generateSchemaFrom(data: string | [] | object | number | boolean, nestLevel = 0) {
        if(typeof data === 'string') {
            return `Joi.string().required()`
        } else if(typeof data === 'number') {
            return `Joi.number().required()`
        } else if(typeof data === 'boolean') {
            return `Joi.boolean().required()`
        } else if(Array.isArray(data)) {
            if(data.length === 0) {
                return `Joi.array().required()`
            }

            const firstValue = data[0];
            return `Joi.array().items(Joi.${this.getJoiTypeForValue(firstValue)}()).required()`;
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

    private getJoiTypeForValue(value: string | number) {
        if(typeof value === 'string') {
            return 'string';
        } else if(typeof value === 'number') {
            return 'number';
        } else if(typeof value === 'boolean') {
            return 'boolean';
        }
    }

    private getPadding(nestLevel: number): string {
        return ' '.repeat((nestLevel + 1) * this.INDENT_SIZE);
    }
}
