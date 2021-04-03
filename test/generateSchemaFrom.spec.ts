import { generateSchemaFrom } from "../src";

describe('generateSchemaFrom', () => {
    it('should generate "Joi.string()" from string', () => {
        const input = 'test';

        expect(generateSchemaFrom(input)).toEqual(`Joi.string().required()`)
    })

    it('should generate "Joi.object()" from empty  object', () => {
        const input = {};

        expect(generateSchemaFrom(input)).toEqual(`Joi.object({}).required()`)
    })

    it('should generate "Joi.array()" from empty array', () => {
        const input = [];

        expect(generateSchemaFrom(input)).toEqual(`Joi.array().required()`)
    })
})
