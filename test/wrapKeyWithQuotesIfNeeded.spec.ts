import {wrapKeyWithQuotesIfNeeded} from '../src/wrapKeyWithQuotesIfNeeded';

describe('wrapKeyWithQuotesIfNeeded', () => {
    describe('should return passed key if quotes are not needed around the key', () => {
        const validKeys = [
            'a',
            'a123',
            'a_21',
            '_23'
        ];

        validKeys.forEach((key) => {
            it(`works for key ${key}`, () => {
                expect(wrapKeyWithQuotesIfNeeded(key)).toEqual(key);
            })
        });
    });

    describe('should return passed key wrapped with quotes if they are needed', () => {
        const keysThatMustBeWrapped = [
            'a!',
            'a@',
            'a#',
            '#',
            '%',
            '123dd',
            '_2_2)',
            '[_2_2)]',
            '',
        ];

        keysThatMustBeWrapped.forEach((key) => {
            it(`works for key ${key}`, () => {
                expect(wrapKeyWithQuotesIfNeeded(key)).toEqual(`"${key}"`);
            })
        });
    });
})
