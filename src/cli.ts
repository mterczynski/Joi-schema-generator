#!/usr/bin/env node

import { SchemaGenerator } from "./SchemaGenerator";
import { Command } from "commander";
import * as fs from "fs";

const program = new Command();

program
    .name("joi-schema-generator")
    .description("CLI tool to generate Joi schemas from JSON/JS objects")
    .version("1.0.0")
    .option("-i, --input <file>", "Input file containing JSON/JS object")
    .option(
        "-r, --required",
        "Make all fields required (default: true)",
        true
    )
    .option(
        "--no-required",
        "Do not make fields required"
    )
    .option(
        "-t, --trailing-commas",
        "Use trailing commas in generated schema",
        false
    )
    .parse(process.argv);

const options = program.opts();

const schemaGenerator = new SchemaGenerator();

// Apply settings
schemaGenerator.applySettings({
    makeFieldsRequired: options.required,
    useTrailingCommas: options.trailingCommas,
});

let inputData: string;

// Read input from file or stdin
if (options.input) {
    try {
        inputData = fs.readFileSync(options.input, "utf8");
    } catch (error) {
        console.error(`Error reading file: ${error.message}`);
        process.exit(1);
    }
} else {
    // Read from stdin
    inputData = fs.readFileSync(0, "utf8");
}

// Parse the input
let parsedInput: any;
try {
    // Try JSON first
    parsedInput = JSON.parse(inputData);
} catch {
    try {
        // Try eval as fallback for JS objects (e.g., {key: "value"} without quotes)
        // Note: This is safe for a local CLI tool where the user controls the input
        // and matches the behavior of the web version
        parsedInput = eval("(" + inputData + ")");
    } catch (error) {
        console.error(`Error parsing input: ${error.message}`);
        process.exit(1);
    }
}

// Generate schema
try {
    const schema = schemaGenerator.generateSchemaFrom(parsedInput);
    console.log(schema);
} catch (error) {
    console.error(`Error generating schema: ${error.message}`);
    process.exit(1);
}
