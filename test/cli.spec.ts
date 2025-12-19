import { execSync } from "child_process";
import * as fs from "fs";
import * as path from "path";
import * as os from "os";

describe("CLI", () => {
    const cliPath = path.join(__dirname, "../dist/cli.js");
    let tempDir: string;
    let tempFile: string;

    beforeAll(() => {
        // Ensure CLI is built
        if (!fs.existsSync(cliPath)) {
            execSync("npm run build:cli", { cwd: path.join(__dirname, "..") });
        }
    });

    beforeEach(() => {
        // Create a temp directory for test files
        tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "joi-cli-test-"));
    });

    afterEach(() => {
        // Clean up temp directory
        if (fs.existsSync(tempDir)) {
            fs.rmSync(tempDir, { recursive: true, force: true });
        }
    });

    describe("stdin input", () => {
        it("should generate schema from JSON input via stdin", () => {
            const input = JSON.stringify({ name: "John", age: 30 });
            const result = execSync(`echo '${input}' | node ${cliPath}`, {
                encoding: "utf-8",
            });

            expect(result).toContain("Joi.object({");
            expect(result).toContain("name: Joi.string().required()");
            expect(result).toContain("age: Joi.number().required()");
        });

        it("should handle --no-required flag", () => {
            const input = JSON.stringify({ name: "John" });
            const result = execSync(
                `echo '${input}' | node ${cliPath} --no-required`,
                { encoding: "utf-8" }
            );

            expect(result).toContain("Joi.string()");
            expect(result).not.toContain(".required()");
        });

        it("should handle --trailing-commas flag", () => {
            const input = JSON.stringify({ name: "John" });
            const result = execSync(
                `echo '${input}' | node ${cliPath} --trailing-commas`,
                { encoding: "utf-8" }
            );

            expect(result).toContain("name: Joi.string().required(),");
        });
    });

    describe("file input", () => {
        it("should generate schema from JSON file", () => {
            const testData = { name: "John", age: 30 };
            tempFile = path.join(tempDir, "test-input.json");
            fs.writeFileSync(tempFile, JSON.stringify(testData));

            const result = execSync(`node ${cliPath} --input ${tempFile}`, {
                encoding: "utf-8",
            });

            expect(result).toContain("Joi.object({");
            expect(result).toContain("name: Joi.string().required()");
            expect(result).toContain("age: Joi.number().required()");
        });

        it("should handle nested objects", () => {
            const testData = {
                user: {
                    name: "John",
                    email: "test@example.com",
                },
            };
            tempFile = path.join(tempDir, "nested.json");
            fs.writeFileSync(tempFile, JSON.stringify(testData));

            const result = execSync(`node ${cliPath} --input ${tempFile}`, {
                encoding: "utf-8",
            });

            expect(result).toContain("user: Joi.object({");
            expect(result).toContain("name: Joi.string().required()");
            expect(result).toContain("email: Joi.string().email().required()");
        });

        it("should handle arrays", () => {
            const testData = {
                items: ["item1", "item2"],
            };
            tempFile = path.join(tempDir, "array.json");
            fs.writeFileSync(tempFile, JSON.stringify(testData));

            const result = execSync(`node ${cliPath} --input ${tempFile}`, {
                encoding: "utf-8",
            });

            expect(result).toContain("items: Joi.array().items(");
            expect(result).toContain("Joi.string()");
        });
    });

    describe("error handling", () => {
        it("should handle invalid JSON input", () => {
            expect(() => {
                execSync(`echo 'invalid json' | node ${cliPath}`, {
                    encoding: "utf-8",
                });
            }).toThrow();
        });

        it("should handle non-existent file", () => {
            expect(() => {
                execSync(`node ${cliPath} --input /nonexistent/file.json`, {
                    encoding: "utf-8",
                });
            }).toThrow();
        });
    });

    describe("help and version", () => {
        it("should display help message", () => {
            const result = execSync(`node ${cliPath} --help`, {
                encoding: "utf-8",
            });

            expect(result).toContain("Usage:");
            expect(result).toContain("CLI tool to generate Joi schemas");
        });

        it("should display version", () => {
            const result = execSync(`node ${cliPath} --version`, {
                encoding: "utf-8",
            });

            expect(result).toContain("1.0.0");
        });
    });
});
