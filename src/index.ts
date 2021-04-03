export function generateSchemaFrom(data: string | [] | object | number | boolean) {
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
        return `Joi.array().items(Joi.${getJoiTypeForValue(firstValue)}().required()).required()`;
    } else if(typeof data === 'object') {
        if(Object.keys(data).length === 0) {
            return `Joi.object({}).required()`;
        }

        const schemasOfEntries = Object.entries(data).map(([key, value]) =>
            `${key}: Joi.${getJoiTypeForValue(value)}().required()`)
            .join(`,\n    `);

        return `Joi.object({
    ${schemasOfEntries}
}).required()`;
    }
}


function getJoiTypeForValue(value: string | number) {
    if(typeof value === 'string') {
        return 'string';
    } else if(typeof value === 'number') {
        return 'number';
    } else if(typeof value === 'boolean') {
        return 'boolean';
    }
}
