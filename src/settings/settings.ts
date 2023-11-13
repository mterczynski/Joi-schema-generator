import type { SchemaGenerator } from "../SchemaGenerator";

const localStorageSettingsKey = "settings";
const makePropertiesRequiredInput = document.getElementById(
    "setting-make-properties-required"
) as HTMLInputElement;
const useTrailingCommasInput = document.getElementById(
    "setting-use-trailing-commas"
) as HTMLInputElement;
const settingsButton = document.getElementById(
    "settings-button"
) as HTMLButtonElement;
const settingsModalOverlay = document.getElementById(
    "settings-modal-overlay"
) as HTMLDivElement;
const settingsCancelButton = document.getElementById(
    "settings-cancel-button"
) as HTMLButtonElement;

export interface SchemaGenerationSettings {
    makeFieldsRequired: boolean;
    useTrailingCommas: boolean;
}

export function openSettingsModal() {
    settingsModalOverlay.classList.remove("modal-hidden");
}

export function hideSettingsModal() {
    settingsModalOverlay.classList.add("modal-hidden");
}

export function applyNewSettings(schemaGenerator: SchemaGenerator) {
    const makeFieldsRequired = makePropertiesRequiredInput.checked;
    const useTrailingCommas = useTrailingCommasInput.checked;

    const settings: SchemaGenerationSettings = {
        makeFieldsRequired,
        useTrailingCommas,
    };

    schemaGenerator.applySettings(settings);
    localStorage.setItem(localStorageSettingsKey, JSON.stringify(settings));
}

export function loadSettings(schemaGenerator: SchemaGenerator) {
    const savedSettings = localStorage.getItem(localStorageSettingsKey);

    if (savedSettings) {
        const settings = JSON.parse(savedSettings) as SchemaGenerationSettings;
        schemaGenerator.applySettings(settings);

        makePropertiesRequiredInput.checked = settings.makeFieldsRequired;
        useTrailingCommasInput.checked = settings.useTrailingCommas;
    }
}

settingsButton.addEventListener("click", () => {
    openSettingsModal();
});

settingsModalOverlay.addEventListener("click", (event) => {
    if (event.target === settingsModalOverlay) {
        hideSettingsModal();
    }
});

settingsCancelButton.addEventListener("click", () => {
    hideSettingsModal();
});
