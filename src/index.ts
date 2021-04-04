import { SchemaGenerator } from "./SchemaGenerator";

function updateOutputValue() {
    try {
       const output = schemaGenerator.generateSchemaFrom(JSON.parse(inputTextArea.value));
       outputElement.innerHTML = output;
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
