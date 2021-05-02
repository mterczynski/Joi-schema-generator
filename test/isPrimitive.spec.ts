import { isPrimitive } from "../src/isPrimitive";

describe('isPrimitive', () => {
    describe('positive scenarios', () => {
        it('should return true for booleans', () => {
            expect(isPrimitive(false)).toBe(true);
        });

        it('should return true for numbers', () => {
            expect(isPrimitive(2)).toBe(true);
        });

        it('should return true for strings', () => {
            expect(isPrimitive('string')).toBe(true);
        });

        it('should return true for undefineds', () => {
            expect(isPrimitive(undefined)).toBe(true);
        });

        it('should return true for nulls', () => {
            expect(isPrimitive(null)).toBe(true);
        });
    })

    describe('negative scenarios', () => {
        it('should return false for arrays', () => {
            expect(isPrimitive([])).toBe(false);
        });

        it('should return false for objects', () => {
            expect(isPrimitive({})).toBe(false);
        });
    });
});
