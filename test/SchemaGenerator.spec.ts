import { SchemaGenerator } from "../src/SchemaGenerator";


describe('SchemaGenerator', () => {
    const schemaGenerator = new SchemaGenerator();

    describe('most basic scenarios', () => {
        it('should generate "Joi.number()" for numbers', () => {
            const input = 5;

            expect(schemaGenerator.generateSchemaFrom(input)).toEqual(`Joi.number().required()`)
        })

        it('should generate "Joi.boolean()" for booleans', () => {
            const input = false;

            expect(schemaGenerator.generateSchemaFrom(input)).toEqual(`Joi.boolean().required()`)
        })

        it('should generate "Joi.string()" for strings', () => {
            const input = 'test';

            expect(schemaGenerator.generateSchemaFrom(input)).toEqual(`Joi.string().required()`)
        })

        it('should generate "Joi.object()" for empty objects', () => {
            const input = {};

            expect(schemaGenerator.generateSchemaFrom(input)).toEqual(`Joi.object({}).required()`)
        });

        it('should generate "Joi.array()" for empty arrays', () => {
            const input = [];

            expect(schemaGenerator.generateSchemaFrom(input)).toEqual(`Joi.array().required()`)
        })
    });

    describe('standard scenarios', () => {
        it('should generate Joi.object with correct keys', () => {
            const input = {
                a: 5,
                b: '6',
                c: false
            }

            expect(schemaGenerator.generateSchemaFrom(input)).toEqual(
`Joi.object({
    a: Joi.number().required(),
    b: Joi.string().required(),
    c: Joi.boolean().required()
}).required()`)

        });

        describe('arrays', () => {
            it('should generate Joi.array with correct items for string arrays', () => {
                const input = ['id1', 'id2'];
                const result = schemaGenerator.generateSchemaFrom(input);

                debugger;

                expect(result).toEqual(
`Joi.array().items(
    Joi.string()
).required()`
                );
            })

            it('should generate Joi.array with correct items for boolean arrays', () => {
                const input = [false, true];

                expect(schemaGenerator.generateSchemaFrom(input)).toEqual(
`Joi.array().items(
    Joi.boolean()
).required()`);
            })

            it('should generate Joi.array with correct items for number arrays', () => {
                const input = [1, 2];

                expect(schemaGenerator.generateSchemaFrom(input)).toEqual(
`Joi.array().items(
    Joi.number()
).required()`);
            });
        });
    });

    describe('nested objects', () => {
        const input = {
            a: 5,
            b: '6',
            c: false,
            d: {
                a: 5,
                b: '6',
                c: false,
                d: {
                    a: 5,
                    b: {}
                }
            }
        }

        expect(schemaGenerator.generateSchemaFrom(input)).toEqual(
`Joi.object({
    a: Joi.number().required(),
    b: Joi.string().required(),
    c: Joi.boolean().required(),
    d: Joi.object({
        a: Joi.number().required(),
        b: Joi.string().required(),
        c: Joi.boolean().required(),
        d: Joi.object({
            a: Joi.number().required(),
            b: Joi.object({}).required()
        }).required()
    }).required()
}).required()`)

    })

    describe('nested arrays', () => {
        describe('nest level = 1', () => {
            it('should work for number arrays inside an array', () => {
                const input = [
                    [1,2,3],
                    [1,2],
                    [1]
                ];

                expect(schemaGenerator.generateSchemaFrom(input)).toEqual(
`Joi.array().items(
    Joi.array().items(
        Joi.number()
    ).required()
).required()`);
            })

            it('should work for boolean arrays inside an array', () => {
                const input = [
                    [false,true,false],
                    [false,true],
                    [false]
                ];
                expect(schemaGenerator.generateSchemaFrom(input)).toEqual(
`Joi.array().items(
    Joi.array().items(
        Joi.boolean()
    ).required()
).required()`);
            })

            it('should work for string arrays inside an array', () => {
                const input = [
                    ['1','2','3'],
                    ['1','2'],
                    ['1']
                ];

                expect(schemaGenerator.generateSchemaFrom(input)).toEqual(
`Joi.array().items(
    Joi.array().items(
        Joi.string()
    ).required()
).required()`);
            })
        })

//         describe('nest level=2', () => {
//             describe('it should work for number arrays inside an array', () => {
//                 const input = [
//                     [],
//                     [
//                         [1,2],
//                         [1,2]
//                     ],
//                     [
//                         [1]
//                     ]
//                 ];

//                 expect(schemaGenerator.generateSchemaFrom(input)).toEqual(
// `Joi.array().items(
//     Joi.array().items(
//         Joi.number()
//     )
// ).required()`);
//             })
//         })
    })

    describe('nested arrays and objects', () => {

    })
});
