import { generateSchemaForBoolean } from "./generators/generateSchemaForBoolean";
import { generateSchemaForNumber } from "./generators/generateSchemaForNumber";
import { generateSchemaForString } from "./generators/generateSchemaForString";
import { wrapKeyWithQuotesIfNeeded } from "./wrapKeyWithQuotesIfNeeded";

export interface SchemaGenerationSettings {
    makeFieldsRequired: boolean;
    useTrailingCommas: boolean;
}

const defaultSchemaGenerationSettings: SchemaGenerationSettings = {
    makeFieldsRequired: true,
    useTrailingCommas: false,
};

export class SchemaGenerator {
    private readonly INDENT_SIZE = 4;
    private settings = defaultSchemaGenerationSettings;

    generateSchemaFrom(
        data: string | [] | object | number | boolean,
        nestLevel = 0,
        options: SchemaGenerationSettings = this.settings
    ): string {
        if (typeof data === "string") {
            return generateSchemaForString(data, {
                makeFieldsRequired: options.makeFieldsRequired,
            });
        } else if (typeof data === "number") {
            return generateSchemaForNumber(data, {
                makeFieldsRequired: options.makeFieldsRequired,
            });
        } else if (typeof data === "boolean") {
            return generateSchemaForBoolean(data, {
                makeFieldsRequired: options.makeFieldsRequired,
            });
        } else if (Array.isArray(data)) {
            if (data.length === 0) {
                return `Joi.array()${this.getRequiredString(
                    options.makeFieldsRequired
                )}`;
            }

            const itemsSchema = this.generateSchemaFrom(
                data[0],
                nestLevel + 1,
                {
                    ...options,
                    makeFieldsRequired: false,
                }
            );

            return `Joi.array().items(
${this.getPadding(nestLevel)}${itemsSchema}${
                options.useTrailingCommas ? "," : ""
            }
${this.getPadding(nestLevel - 1)})${this.getRequiredString(
                options.makeFieldsRequired
            )}`;
        } else if (typeof data === "object") {
            if (Object.keys(data).length === 0) {
                return `Joi.object({})${this.getRequiredString(
                    options.makeFieldsRequired
                )}`;
            }

            const schemasOfEntries =
                Object.entries(data)
                    .map(
                        ([key, value]) =>
                            `${wrapKeyWithQuotesIfNeeded(
                                key
                            )}: ${this.generateSchemaFrom(
                                value,
                                nestLevel + 1
                            )}`
                    )
                    .join(`,\n${this.getPadding(nestLevel)}`) +
                (options.useTrailingCommas ? "," : "");

            return `Joi.object({
${this.getPadding(nestLevel)}${schemasOfEntries}
${this.getPadding(nestLevel - 1)}})${this.getRequiredString(
                options.makeFieldsRequired
            )}`;
        }

        return "Joi.any()";
    }

    applySettings(settings: Partial<SchemaGenerationSettings>) {
        this.settings = { ...this.settings, ...settings };
    }

    resetSettings() {
        this.settings = defaultSchemaGenerationSettings;
    }

    private getPadding(nestLevel: number): string {
        return " ".repeat((nestLevel + 1) * this.INDENT_SIZE);
    }

    private getRequiredString(makeFieldsRequired: boolean) {
        return makeFieldsRequired ? ".required()" : "";
    }
}
