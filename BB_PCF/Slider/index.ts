import { IInputs, IOutputs } from "./generated/ManifestTypes";

// Color constants matching the three slider zones
const COLOR_RED = "#e74c3c";
const COLOR_BLUE = "#3498db";
const COLOR_GREEN = "#2ecc71";

export class Slider
    implements ComponentFramework.StandardControl<IInputs, IOutputs>
{
    private _container: HTMLDivElement;
    private _sliderInput: HTMLInputElement;
    private _valueBadge: HTMLSpanElement;
    private _notifyOutputChanged: () => void;
    private _currentValue: number;

    constructor() {
        // Empty
    }

    // ------------------------------------------------------------------ init
    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        _state: ComponentFramework.Dictionary,
        container: HTMLDivElement
    ): void {
        this._notifyOutputChanged = notifyOutputChanged;
        this._currentValue = context.parameters.sliderValue.raw ?? 50;
        this._container = container;

        // --- Build DOM ---
        const wrapper = document.createElement("div");
        wrapper.classList.add("bb-slider-container");

        // Value badge
        const valueDisplay = document.createElement("div");
        valueDisplay.classList.add("bb-slider-value-display");
        this._valueBadge = document.createElement("span");
        this._valueBadge.classList.add("bb-slider-value-badge");
        valueDisplay.appendChild(this._valueBadge);

        // Track + range input
        const trackWrapper = document.createElement("div");
        trackWrapper.classList.add("bb-slider-track-wrapper");

        this._sliderInput = document.createElement("input");
        this._sliderInput.type = "range";
        this._sliderInput.min = "0";
        this._sliderInput.max = "100";
        this._sliderInput.step = "1";
        this._sliderInput.value = String(this._currentValue);
        this._sliderInput.classList.add("bb-slider-input");
        this._sliderInput.addEventListener("input", this.onSliderChange.bind(this));

        trackWrapper.appendChild(this._sliderInput);

        // Labels
        const labels = document.createElement("div");
        labels.classList.add("bb-slider-labels");
        labels.innerHTML = `
            <span class="bb-slider-label-red">0 — Red (0-35)</span>
            <span class="bb-slider-label-blue">Blue (35-70)</span>
            <span class="bb-slider-label-green">Green (70-100) — 100</span>
        `;

        wrapper.appendChild(valueDisplay);
        wrapper.appendChild(trackWrapper);
        wrapper.appendChild(labels);
        this._container.appendChild(wrapper);

        this.refreshUI();
    }

    // ---------------------------------------------------- slider input handler
    private onSliderChange(event: Event): void {
        const target = event.target as HTMLInputElement;
        this._currentValue = parseInt(target.value, 10);
        this.refreshUI();
        this._notifyOutputChanged();
    }

    // ---------------------------------------------------- colour helper
    private getColorForValue(value: number): string {
        if (value < 35) return COLOR_RED;
        if (value < 70) return COLOR_BLUE;
        return COLOR_GREEN;
    }

    // ---------------------------------------------------- refresh badge colour
    private refreshUI(): void {
        const color = this.getColorForValue(this._currentValue);
        this._valueBadge.textContent = String(this._currentValue);
        this._valueBadge.style.backgroundColor = color;
    }

    // --------------------------------------------------------------- updateView
    public updateView(context: ComponentFramework.Context<IInputs>): void {
        const incoming = context.parameters.sliderValue.raw ?? 50;
        if (incoming !== this._currentValue) {
            this._currentValue = incoming;
            this._sliderInput.value = String(incoming);
            this.refreshUI();
        }
    }

    // --------------------------------------------------------------- getOutputs
    public getOutputs(): IOutputs {
        return {
            sliderValue: this._currentValue,
        };
    }

    // --------------------------------------------------------------- destroy
    public destroy(): void {
        this._sliderInput.removeEventListener("input", this.onSliderChange);
    }
}
