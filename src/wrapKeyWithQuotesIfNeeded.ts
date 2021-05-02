export function wrapKeyWithQuotesIfNeeded(key: string): string {
    const startsWithNumber = key.match(/^\d/);
    const hasCharsOtherThanLettersOrUnderscoresOrNumbers = key.match(/[^_\d\w]/);
    const isEmptyString = key.length === 0;

    if(isEmptyString || startsWithNumber || hasCharsOtherThanLettersOrUnderscoresOrNumbers) {
        return `"${key}"`;
    }

    return key;
}
