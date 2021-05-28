import { SchemaGenerator } from "./SchemaGenerator";
import Prism from 'prismjs';

const invalidTextareaClass = 'input-textarea-invalid';

function updateOutputValue(): void {
    try {
        const inputValue = getInputValue();

        const output = schemaGenerator.generateSchemaFrom(inputValue);
        const prismHtml = Prism.highlight(output, Prism.languages.javascript, 'javascript');

        outputElement.innerHTML = prismHtml;
        inputTextArea.classList.remove(invalidTextareaClass);
    } catch(error) {
        inputTextArea.classList.add(invalidTextareaClass);
    }
}

function getInputValue(): any {
    try {
        return JSON.parse(inputTextArea.value);
    } catch {
        return eval("(" + inputTextArea.value + ")");
    }
}

const inputTextArea = document.getElementById('input-textarea') as HTMLTextAreaElement;
const outputElement = document.getElementById('output') as HTMLDivElement;
const schemaGenerator = new SchemaGenerator();

updateOutputValue();
inputTextArea.focus();

inputTextArea.addEventListener('input', (event) => {
    updateOutputValue();
});
