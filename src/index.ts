import { SchemaGenerator } from "./SchemaGenerator";
import Prism from 'prismjs';

function updateOutputValue(): void {
    try {
        const output = schemaGenerator.generateSchemaFrom(JSON.parse(inputTextArea.value));
        const prismHtml = Prism.highlight(output, Prism.languages.javascript, 'javascript');

        outputElement.innerHTML = prismHtml;
    } catch(error) {
       console.log('invalid input')
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
