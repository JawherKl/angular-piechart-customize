import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { toString } from '../util/util';
import { NgbHighlight } from './highlight';
import { NgFor, NgTemplateOutlet } from '@angular/common';
import * as i0 from "@angular/core";
class NgbTypeaheadWindow {
    constructor() {
        this.activeIdx = 0;
        /**
         * Flag indicating if the first row should be active initially
         */
        this.focusFirst = true;
        /**
         * A function used to format a given result before display. This function should return a formatted string without any
         * HTML markup
         */
        this.formatter = toString;
        /**
         * Event raised when user selects a particular result row
         */
        this.selectEvent = new EventEmitter();
        this.activeChangeEvent = new EventEmitter();
    }
    hasActive() {
        return this.activeIdx > -1 && this.activeIdx < this.results.length;
    }
    getActive() {
        return this.results[this.activeIdx];
    }
    markActive(activeIdx) {
        this.activeIdx = activeIdx;
        this._activeChanged();
    }
    next() {
        if (this.activeIdx === this.results.length - 1) {
            this.activeIdx = this.focusFirst ? (this.activeIdx + 1) % this.results.length : -1;
        }
        else {
            this.activeIdx++;
        }
        this._activeChanged();
    }
    prev() {
        if (this.activeIdx < 0) {
            this.activeIdx = this.results.length - 1;
        }
        else if (this.activeIdx === 0) {
            this.activeIdx = this.focusFirst ? this.results.length - 1 : -1;
        }
        else {
            this.activeIdx--;
        }
        this._activeChanged();
    }
    resetActive() {
        this.activeIdx = this.focusFirst ? 0 : -1;
        this._activeChanged();
    }
    select(item) {
        this.selectEvent.emit(item);
    }
    ngOnInit() {
        this.resetActive();
    }
    _activeChanged() {
        this.activeChangeEvent.emit(this.activeIdx >= 0 ? this.id + '-' + this.activeIdx : undefined);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbTypeaheadWindow, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.6", type: NgbTypeaheadWindow, isStandalone: true, selector: "ngb-typeahead-window", inputs: { id: "id", focusFirst: "focusFirst", results: "results", term: "term", formatter: "formatter", resultTemplate: "resultTemplate", popupClass: "popupClass" }, outputs: { selectEvent: "select", activeChangeEvent: "activeChange" }, host: { attributes: { "role": "listbox" }, listeners: { "mousedown": "$event.preventDefault()" }, properties: { "class": "\"dropdown-menu show\" + (popupClass ? \" \" + popupClass : \"\")", "id": "id" } }, exportAs: ["ngbTypeaheadWindow"], ngImport: i0, template: `
		<ng-template #rt let-result="result" let-term="term" let-formatter="formatter">
			<ngb-highlight [result]="formatter(result)" [term]="term"></ngb-highlight>
		</ng-template>
		<ng-template ngFor [ngForOf]="results" let-result let-idx="index">
			<button
				type="button"
				class="dropdown-item"
				role="option"
				[id]="id + '-' + idx"
				[class.active]="idx === activeIdx"
				(mouseenter)="markActive(idx)"
				(click)="select(result)"
			>
				<ng-template
					[ngTemplateOutlet]="resultTemplate || rt"
					[ngTemplateOutletContext]="{ result: result, term: term, formatter: formatter }"
				></ng-template>
			</button>
		</ng-template>
	`, isInline: true, dependencies: [{ kind: "component", type: NgbHighlight, selector: "ngb-highlight", inputs: ["highlightClass", "result", "term", "accentSensitive"] }, { kind: "directive", type: NgFor, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }], encapsulation: i0.ViewEncapsulation.None }); }
}
export { NgbTypeaheadWindow };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbTypeaheadWindow, decorators: [{
            type: Component,
            args: [{
                    selector: 'ngb-typeahead-window',
                    exportAs: 'ngbTypeaheadWindow',
                    standalone: true,
                    imports: [NgbHighlight, NgFor, NgTemplateOutlet],
                    encapsulation: ViewEncapsulation.None,
                    host: {
                        '(mousedown)': '$event.preventDefault()',
                        '[class]': '"dropdown-menu show" + (popupClass ? " " + popupClass : "")',
                        role: 'listbox',
                        '[id]': 'id',
                    },
                    template: `
		<ng-template #rt let-result="result" let-term="term" let-formatter="formatter">
			<ngb-highlight [result]="formatter(result)" [term]="term"></ngb-highlight>
		</ng-template>
		<ng-template ngFor [ngForOf]="results" let-result let-idx="index">
			<button
				type="button"
				class="dropdown-item"
				role="option"
				[id]="id + '-' + idx"
				[class.active]="idx === activeIdx"
				(mouseenter)="markActive(idx)"
				(click)="select(result)"
			>
				<ng-template
					[ngTemplateOutlet]="resultTemplate || rt"
					[ngTemplateOutletContext]="{ result: result, term: term, formatter: formatter }"
				></ng-template>
			</button>
		</ng-template>
	`,
                }]
        }], propDecorators: { id: [{
                type: Input
            }], focusFirst: [{
                type: Input
            }], results: [{
                type: Input
            }], term: [{
                type: Input
            }], formatter: [{
                type: Input
            }], resultTemplate: [{
                type: Input
            }], popupClass: [{
                type: Input
            }], selectEvent: [{
                type: Output,
                args: ['select']
            }], activeChangeEvent: [{
                type: Output,
                args: ['activeChange']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZWFoZWFkLXdpbmRvdy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy90eXBlYWhlYWQvdHlwZWFoZWFkLXdpbmRvdy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFlLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRS9HLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDeEMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUMzQyxPQUFPLEVBQUUsS0FBSyxFQUFFLGdCQUFnQixFQUFFLE1BQU0saUJBQWlCLENBQUM7O0FBc0IxRCxNQWtDYSxrQkFBa0I7SUFsQy9CO1FBbUNDLGNBQVMsR0FBRyxDQUFDLENBQUM7UUFRZDs7V0FFRztRQUNNLGVBQVUsR0FBRyxJQUFJLENBQUM7UUFZM0I7OztXQUdHO1FBQ00sY0FBUyxHQUFHLFFBQVEsQ0FBQztRQWM5Qjs7V0FFRztRQUNlLGdCQUFXLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUUzQixzQkFBaUIsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO0tBbUQvRDtJQWpEQSxTQUFTO1FBQ1IsT0FBTyxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7SUFDcEUsQ0FBQztJQUVELFNBQVM7UUFDUixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFRCxVQUFVLENBQUMsU0FBaUI7UUFDM0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFDM0IsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxJQUFJO1FBQ0gsSUFBSSxJQUFJLENB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YyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXQsIFRlbXBsYXRlUmVmLCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyB0b1N0cmluZyB9IGZyb20gJy4uL3V0aWwvdXRpbCc7XG5pbXBvcnQgeyBOZ2JIaWdobGlnaHQgfSBmcm9tICcuL2hpZ2hsaWdodCc7XG5pbXBvcnQgeyBOZ0ZvciwgTmdUZW1wbGF0ZU91dGxldCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbi8qKlxuICogVGhlIGNvbnRleHQgZm9yIHRoZSB0eXBlYWhlYWQgcmVzdWx0IHRlbXBsYXRlIGluIGNhc2UgeW91IHdhbnQgdG8gb3ZlcnJpZGUgdGhlIGRlZmF1bHQgb25lLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFJlc3VsdFRlbXBsYXRlQ29udGV4dCB7XG5cdC8qKlxuXHQgKiBZb3VyIHR5cGVhaGVhZCByZXN1bHQgaXRlbS5cblx0ICovXG5cdHJlc3VsdDogYW55O1xuXG5cdC8qKlxuXHQgKiBTZWFyY2ggdGVybSBmcm9tIHRoZSBgPGlucHV0PmAgdXNlZCB0byBnZXQgY3VycmVudCByZXN1bHQuXG5cdCAqL1xuXHR0ZXJtOiBzdHJpbmc7XG5cblx0LyoqXG5cdCAqIFRoZSBmdW5jdGlvbiB3aGljaCB0cmFuc2Zvcm1zIHRoZSByZXN1bHQgaW50byBhIHN0cmluZ1xuXHQgKi9cblx0Zm9ybWF0dGVyOiAocmVzdWx0OiBhbnkpID0+IHN0cmluZztcbn1cblxuQENvbXBvbmVudCh7XG5cdHNlbGVjdG9yOiAnbmdiLXR5cGVhaGVhZC13aW5kb3cnLFxuXHRleHBvcnRBczogJ25nYlR5cGVhaGVhZFdpbmRvdycsXG5cdHN0YW5kYWxvbmU6IHRydWUsXG5cdGltcG9ydHM6IFtOZ2JIaWdobGlnaHQsIE5nRm9yLCBOZ1RlbXBsYXRlT3V0bGV0XSxcblx0ZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcblx0aG9zdDoge1xuXHRcdCcobW91c2Vkb3duKSc6ICckZXZlbnQucHJldmVudERlZmF1bHQoKScsXG5cdFx0J1tjbGFzc10nOiAnXCJkcm9wZG93bi1tZW51IHNob3dcIiArIChwb3B1cENsYXNzID8gXCIgXCIgKyBwb3B1cENsYXNzIDogXCJcIiknLFxuXHRcdHJvbGU6ICdsaXN0Ym94Jyxcblx0XHQnW2lkXSc6ICdpZCcsXG5cdH0sXG5cdHRlbXBsYXRlOiBgXG5cdFx0PG5nLXRlbXBsYXRlICNydCBsZXQtcmVzdWx0PVwicmVzdWx0XCIgbGV0LXRlcm09XCJ0ZXJtXCIgbGV0LWZvcm1hdHRlcj1cImZvcm1hdHRlclwiPlxuXHRcdFx0PG5nYi1oaWdobGlnaHQgW3Jlc3VsdF09XCJmb3JtYXR0ZXIocmVzdWx0KVwiIFt0ZXJtXT1cInRlcm1cIj48L25nYi1oaWdobGlnaHQ+XG5cdFx0PC9uZy10ZW1wbGF0ZT5cblx0XHQ8bmctdGVtcGxhdGUgbmdGb3IgW25nRm9yT2ZdPVwicmVzdWx0c1wiIGxldC1yZXN1bHQgbGV0LWlkeD1cImluZGV4XCI+XG5cdFx0XHQ8YnV0dG9uXG5cdFx0XHRcdHR5cGU9XCJidXR0b25cIlxuXHRcdFx0XHRjbGFzcz1cImRyb3Bkb3duLWl0ZW1cIlxuXHRcdFx0XHRyb2xlPVwib3B0aW9uXCJcblx0XHRcdFx0W2lkXT1cImlkICsgJy0nICsgaWR4XCJcblx0XHRcdFx0W2NsYXNzLmFjdGl2ZV09XCJpZHggPT09IGFjdGl2ZUlkeFwiXG5cdFx0XHRcdChtb3VzZWVudGVyKT1cIm1hcmtBY3RpdmUoaWR4KVwiXG5cdFx0XHRcdChjbGljayk9XCJzZWxlY3QocmVzdWx0KVwiXG5cdFx0XHQ+XG5cdFx0XHRcdDxuZy10ZW1wbGF0ZVxuXHRcdFx0XHRcdFtuZ1RlbXBsYXRlT3V0bGV0XT1cInJlc3VsdFRlbXBsYXRlIHx8IHJ0XCJcblx0XHRcdFx0XHRbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwieyByZXN1bHQ6IHJlc3VsdCwgdGVybTogdGVybSwgZm9ybWF0dGVyOiBmb3JtYXR0ZXIgfVwiXG5cdFx0XHRcdD48L25nLXRlbXBsYXRlPlxuXHRcdFx0PC9idXR0b24+XG5cdFx0PC9uZy10ZW1wbGF0ZT5cblx0YCxcbn0pXG5leHBvcnQgY2xhc3MgTmdiVHlwZWFoZWFkV2luZG93IGltcGxlbWVudHMgT25Jbml0IHtcblx0YWN0aXZlSWR4ID0gMDtcblxuXHQvKipcblx0ICogIFRoZSBpZCBmb3IgdGhlIHR5cGVhaGVhZCB3aW5kb3cuIFRoZSBpZCBzaG91bGQgYmUgdW5pcXVlIGFuZCB0aGUgc2FtZVxuXHQgKiAgYXMgdGhlIGFzc29jaWF0ZWQgdHlwZWFoZWFkJ3MgaWQuXG5cdCAqL1xuXHRASW5wdXQoKSBpZDogc3RyaW5nO1xuXG5cdC8qKlxuXHQgKiBGbGFnIGluZGljYXRpbmcgaWYgdGhlIGZpcnN0IHJvdyBzaG91bGQgYmUgYWN0aXZlIGluaXRpYWxseVxuXHQgKi9cblx0QElucHV0KCkgZm9jdXNGaXJzdCA9IHRydWU7XG5cblx0LyoqXG5cdCAqIFR5cGVhaGVhZCBtYXRjaCByZXN1bHRzIHRvIGJlIGRpc3BsYXllZFxuXHQgKi9cblx0QElucHV0KCkgcmVzdWx0cztcblxuXHQvKipcblx0ICogU2VhcmNoIHRlcm0gdXNlZCB0byBnZXQgY3VycmVudCByZXN1bHRzXG5cdCAqL1xuXHRASW5wdXQoKSB0ZXJtOiBzdHJpbmc7XG5cblx0LyoqXG5cdCAqIEEgZnVuY3Rpb24gdXNlZCB0byBmb3JtYXQgYSBnaXZlbiByZXN1bHQgYmVmb3JlIGRpc3BsYXkuIFRoaXMgZnVuY3Rpb24gc2hvdWxkIHJldHVybiBhIGZvcm1hdHRlZCBzdHJpbmcgd2l0aG91dCBhbnlcblx0ICogSFRNTCBtYXJrdXBcblx0ICovXG5cdEBJbnB1dCgpIGZvcm1hdHRlciA9IHRvU3RyaW5nO1xuXG5cdC8qKlxuXHQgKiBBIHRlbXBsYXRlIHRvIG92ZXJyaWRlIGEgbWF0Y2hpbmcgcmVzdWx0IGRlZmF1bHQgZGlzcGxheVxuXHQgKi9cblx0QElucHV0KCkgcmVzdWx0VGVtcGxhdGU6IFRlbXBsYXRlUmVmPFJlc3VsdFRlbXBsYXRlQ29udGV4dD47XG5cblx0LyoqXG5cdCAqIEEgY3VzdG9tIGNsYXNzIHRvIGFwcGVuZCB0byB0aGUgdHlwZWFoZWFkIHdpbmRvd1xuXHQgKlxuXHQgKiBAc2luY2UgOS4xLjBcblx0ICovXG5cdEBJbnB1dCgpIHBvcHVwQ2xhc3M6IHN0cmluZztcblxuXHQvKipcblx0ICogRXZlbnQgcmFpc2VkIHdoZW4gdXNlciBzZWxlY3RzIGEgcGFydGljdWxhciByZXN1bHQgcm93XG5cdCAqL1xuXHRAT3V0cHV0KCdzZWxlY3QnKSBzZWxlY3RFdmVudCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuXHRAT3V0cHV0KCdhY3RpdmVDaGFuZ2UnKSBhY3RpdmVDaGFuZ2VFdmVudCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuXHRoYXNBY3RpdmUoKSB7XG5cdFx0cmV0dXJuIHRoaXMuYWN0aXZlSWR4ID4gLTEgJiYgdGhpcy5hY3RpdmVJZHggPCB0aGlzLnJlc3VsdHMubGVuZ3RoO1xuXHR9XG5cblx0Z2V0QWN0aXZlKCkge1xuXHRcdHJldHVybiB0aGlzLnJlc3VsdHNbdGhpcy5hY3RpdmVJZHhdO1xuXHR9XG5cblx0bWFya0FjdGl2ZShhY3RpdmVJZHg6IG51bWJlcikge1xuXHRcdHRoaXMuYWN0aXZlSWR4ID0gYWN0aXZlSWR4O1xuXHRcdHRoaXMuX2FjdGl2ZUNoYW5nZWQoKTtcblx0fVxuXG5cdG5leHQoKSB7XG5cdFx0aWYgKHRoaXMuYWN0aXZlSWR4ID09PSB0aGlzLnJlc3VsdHMubGVuZ3RoIC0gMSkge1xuXHRcdFx0dGhpcy5hY3RpdmVJZHggPSB0aGlzLmZvY3VzRmlyc3QgPyAodGhpcy5hY3RpdmVJZHggKyAxKSAlIHRoaXMucmVzdWx0cy5sZW5ndGggOiAtMTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5hY3RpdmVJZHgrKztcblx0XHR9XG5cdFx0dGhpcy5fYWN0aXZlQ2hhbmdlZCgpO1xuXHR9XG5cblx0cHJldigpIHtcblx0XHRpZiAodGhpcy5hY3RpdmVJZHggPCAwKSB7XG5cdFx0XHR0aGlzLmFjdGl2ZUlkeCA9IHRoaXMucmVzdWx0cy5sZW5ndGggLSAxO1xuXHRcdH0gZWxzZSBpZiAodGhpcy5hY3RpdmVJZHggPT09IDApIHtcblx0XHRcdHRoaXMuYWN0aXZlSWR4ID0gdGhpcy5mb2N1c0ZpcnN0ID8gdGhpcy5yZXN1bHRzLmxlbmd0aCAtIDEgOiAtMTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5hY3RpdmVJZHgtLTtcblx0XHR9XG5cdFx0dGhpcy5fYWN0aXZlQ2hhbmdlZCgpO1xuXHR9XG5cblx0cmVzZXRBY3RpdmUoKSB7XG5cdFx0dGhpcy5hY3RpdmVJZHggPSB0aGlzLmZvY3VzRmlyc3QgPyAwIDogLTE7XG5cdFx0dGhpcy5fYWN0aXZlQ2hhbmdlZCgpO1xuXHR9XG5cblx0c2VsZWN0KGl0ZW0pIHtcblx0XHR0aGlzLnNlbGVjdEV2ZW50LmVtaXQoaXRlbSk7XG5cdH1cblxuXHRuZ09uSW5pdCgpIHtcblx0XHR0aGlzLnJlc2V0QWN0aXZlKCk7XG5cdH1cblxuXHRwcml2YXRlIF9hY3RpdmVDaGFuZ2VkKCkge1xuXHRcdHRoaXMuYWN0aXZlQ2hhbmdlRXZlbnQuZW1pdCh0aGlzLmFjdGl2ZUlkeCA+PSAwID8gdGhpcy5pZCArICctJyArIHRoaXMuYWN0aXZlSWR4IDogdW5kZWZpbmVkKTtcblx0fVxufVxuIl19