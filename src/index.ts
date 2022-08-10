import { SchemaGenerator } from "./SchemaGenerator";
import Prism from "prismjs";

function updateOutputValue(): void {
    const invalidTextareaClass = "input-textarea-invalid";
    try {
        const inputValue = getInputValue();

        const output = schemaGenerator.generateSchemaFrom(inputValue);
        const prismHtml = Prism.highlight(
            output,
            Prism.languages.javascript,
            "javascript"
        );

        outputElement.innerHTML = prismHtml;
        inputTextArea.classList.remove(invalidTextareaClass);
        isValidInput = true;
    } catch (error) {
        inputTextArea.classList.add(invalidTextareaClass);
        isValidInput = false;
    }
}

function getInputValue(): any {
    try {
        return JSON.parse(inputTextArea.value);
    } catch {
        return eval("(" + inputTextArea.value + ")");
    }
}

function updateCopyButtonState() {
    if (isValidInput) {
        copyToClipboardButton.removeAttribute("disabled");
    } else {
        copyToClipboardButton.setAttribute("disabled", "disabled");
    }
}

const inputTextArea = document.getElementById(
    "input-textarea"
) as HTMLTextAreaElement;
const outputElement = document.getElementById("output") as HTMLDivElement;
const copyToClipboardButton = document.getElementById(
    "copy-to-clipboard-button"
) as HTMLButtonElement;
const schemaGenerator = new SchemaGenerator();

let isValidInput = true;
let copyButtonTextChangeTimeout;

updateOutputValue();
inputTextArea.focus();

inputTextArea.addEventListener("input", (event) => {
    updateOutputValue();
    updateCopyButtonState();
});

copyToClipboardButton.addEventListener("click", () => {
    clearTimeout(copyButtonTextChangeTimeout);
    navigator.clipboard.writeText(outputElement.innerText);
    copyToClipboardButton.innerText = "Copied!";

    copyButtonTextChangeTimeout = setTimeout(() => {
        copyToClipboardButton.innerText = "Copy to clipboard";
    }, 2000);
});
