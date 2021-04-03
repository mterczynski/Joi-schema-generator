import { generateSchemaFrom } from "../src";

describe('generateSchemaFrom', () => {
    describe('most basic scenarios', () => {
        it('should generate "Joi.number()" for numbers', () => {
            const input = 5;

            expect(generateSchemaFrom(input)).toEqual(`Joi.number().required()`)
        })

        it('should generate "Joi.string()" for strings', () => {
            const input = 'test';

            expect(generateSchemaFrom(input)).toEqual(`Joi.string().required()`)
        })

        it('should generate "Joi.object()" for empty objects', () => {
            const input = {};

            expect(generateSchemaFrom(input)).toEqual(`Joi.object({}).required()`)
        });

        it('should generate "Joi.array()" for empty arrays', () => {
            const input = [];

            expect(generateSchemaFrom(input)).toEqual(`Joi.array().required()`)
        })
    });

    describe('standard scenarios', () => {
        it('should generate Joi.object with correct keys', () => {

        })
    })

})
