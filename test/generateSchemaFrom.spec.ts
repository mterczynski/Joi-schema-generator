import { generateSchemaFrom } from "../src";

describe('generateSchemaFrom', () => {
    describe('most basic scenarios', () => {
        it('should generate "Joi.number()" for numbers', () => {
            const input = 5;

            expect(generateSchemaFrom(input)).toEqual(`Joi.number().required()`)
        })

        it('should generate "Joi.boolean()" for booleans', () => {
            const input = false;

            expect(generateSchemaFrom(input)).toEqual(`Joi.boolean().required()`)
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
            const input = {
                a: 5,
                b: '6',
                c: false
            }

            expect(generateSchemaFrom(input)).toEqual(
`Joi.object({
    a: Joi.number().required(),
    b: Joi.string().required(),
    c: Joi.boolean().required()
}).required()`)

        })
    });

})
