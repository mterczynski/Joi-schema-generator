import { generateSchemaFrom } from "../src";

describe('generateSchemaFrom', () => {
    it('should generate "Joi.string()" from string', () => {
        const input = 'test';

        expect(generateSchemaFrom(input)).toEqual(`Joi.string().requred()`)
    })
})