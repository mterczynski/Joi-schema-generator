import Joi from "joi";

export function isIsoDate(value: string): boolean {
    try {
        Joi.attempt(value, Joi.string().isoDate().required()) ? `.isoDate()` : '';
        return true;
    } catch {
        return false;
    }
}
