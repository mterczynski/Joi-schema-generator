import { SchemaGenerator } from "../src/SchemaGenerator";


describe('SchemaGenerator', () => {
    const schemaGenerator = new SchemaGenerator();

    describe('most basic scenarios', () => {
        describe('strings', () => {
            it('should generate "Joi.string()" for strings', () => {
                const input = 'test';

                expect(schemaGenerator.generateSchemaFrom(input)).toEqual(`Joi.string().required()`)
            });

            it('should generate "Joi.string().uuid()" for uuids', () => {
                const input = '53c59574-af2e-450f-b4df-70ac6f5c63f1';

                expect(schemaGenerator.generateSchemaFrom(input)).toEqual(`Joi.string().uuid().required()`)
            });

            it('should generate "Joi.string().email()" for emails', () => {
                const input = 'test@example.com';

                expect(schemaGenerator.generateSchemaFrom(input)).toEqual(`Joi.string().email().required()`)
            });

            describe('should generate Joi.string().ip() if data is ip v4 or ip v6 string', () => {
                it('works for ipv4', () => {
                    const input = '192.168.0.1';

                    expect(schemaGenerator.generateSchemaFrom(input)).toEqual(`Joi.string().ip().required()`);
                });

                it('works for ipv6', () => {
                    const input = '1:2:3:4:5:6:7:8';

                    expect(schemaGenerator.generateSchemaFrom(input)).toEqual(`Joi.string().ip().required()`);
                });
            });

            it('should generate Joi.string().isoDate() for iso date strings', () => {
                const input = '2018-11-28T18:25:32+00:00';

                expect(schemaGenerator.generateSchemaFrom(input)).toEqual(`Joi.string().isoDate().required()`);
            });
        });

        it('should generate "Joi.number()" for numbers', () => {
            const input = 5;

            expect(schemaGenerator.generateSchemaFrom(input)).toEqual(`Joi.number().required()`)
        })

        it('should generate "Joi.boolean()" for booleans', () => {
            const input = false;

            expect(schemaGenerator.generateSchemaFrom(input)).toEqual(`Joi.boolean().required()`)
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
                c: false,
                "dash-key": 1,
            }

            expect(schemaGenerator.generateSchemaFrom(input)).toEqual(
`Joi.object({
    a: Joi.number().required(),
    b: Joi.string().required(),
    c: Joi.boolean().required(),
    "dash-key": Joi.number().required()
}).required()`)

        });

        describe('arrays', () => {
            it('should generate Joi.array with correct items for string arrays', () => {
                const input = ['id1', 'id2'];
                const result = schemaGenerator.generateSchemaFrom(input);

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
    )
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
    )
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
    )
).required()`);
            })
        })

        describe('nest level=2', () => {
            it('should work for number arrays inside an array', () => {
                const input = [
                    [
                        [1,2]
                    ],
                    [
                        [1,2],
                        [1,2]
                    ],
                    [
                        [1]
                    ]
                ];

                expect(schemaGenerator.generateSchemaFrom(input)).toEqual(
`Joi.array().items(
    Joi.array().items(
        Joi.array().items(
            Joi.number()
        )
    )
).required()`);
            })
        })
    })

    describe('nested arrays and objects', () => {
        it('should work for array of objects', () => {
            const input = [
                {a: 5, b: '6'},
                {a: 5, b: '6'},
            ];

            expect(schemaGenerator.generateSchemaFrom(input)).toEqual(
`Joi.array().items(
    Joi.object({
        a: Joi.number().required(),
        b: Joi.string().required()
    })
).required()`)
        })
    });

    it('should work for arrays and objects nested multiple times', () => {
        const input = {
            patients: [
                {
                    id: '1312323',
                    name: 'John',
                    visits: [
                        {
                            date: '03-04-2020',
                            tests: [
                                {
                                    id: '12312332',
                                    type: 'sugar blood test'
                                },
                                {
                                    id: '50238482',
                                    type: 'sight test'
                                },
                            ]
                        }
                    ]
                }
            ]
        }

        expect(schemaGenerator.generateSchemaFrom(input)).toEqual(
`Joi.object({
    patients: Joi.array().items(
        Joi.object({
            id: Joi.string().required(),
            name: Joi.string().required(),
            visits: Joi.array().items(
                Joi.object({
                    date: Joi.string().required(),
                    tests: Joi.array().items(
                        Joi.object({
                            id: Joi.string().required(),
                            type: Joi.string().required()
                        })
                    ).required()
                })
            ).required()
        })
    ).required()
}).required()`)
    })
});
