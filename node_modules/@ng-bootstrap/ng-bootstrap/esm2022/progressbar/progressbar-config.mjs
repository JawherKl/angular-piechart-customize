import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * A configuration service for the [`NgbProgressbar`](#/components/progressbar/api#NgbProgressbar) component.
 *
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the progress bars used in the application.
 */
class NgbProgressbarConfig {
    constructor() {
        this.max = 100;
        this.animated = false;
        this.ariaLabel = 'progress bar';
        this.striped = false;
        this.showValue = false;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbProgressbarConfig, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbProgressbarConfig, providedIn: 'root' }); }
}
export { NgbProgressbarConfig };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbProgressbarConfig, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3Jlc3NiYXItY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3Byb2dyZXNzYmFyL3Byb2dyZXNzYmFyLWNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUUzQzs7Ozs7R0FLRztBQUNILE1BQ2Esb0JBQW9CO0lBRGpDO1FBRUMsUUFBRyxHQUFHLEdBQUcsQ0FBQztRQUNWLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFDakIsY0FBUyxHQUFHLGNBQWMsQ0FBQztRQUMzQixZQUFPLEdBQUcsS0FBSyxDQUFDO1FBR2hCLGNBQVMsR0FBRyxLQUFLLENBQUM7S0FFbEI7OEdBVFksb0JBQW9CO2tIQUFwQixvQkFBb0IsY0FEUCxNQUFNOztTQUNuQixvQkFBb0I7MkZBQXBCLG9CQUFvQjtrQkFEaEMsVUFBVTttQkFBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKlxuICogQSBjb25maWd1cmF0aW9uIHNlcnZpY2UgZm9yIHRoZSBbYE5nYlByb2dyZXNzYmFyYF0oIy9jb21wb25lbnRzL3Byb2dyZXNzYmFyL2FwaSNOZ2JQcm9ncmVzc2JhcikgY29tcG9uZW50LlxuICpcbiAqIFlvdSBjYW4gaW5qZWN0IHRoaXMgc2VydmljZSwgdHlwaWNhbGx5IGluIHlvdXIgcm9vdCBjb21wb25lbnQsIGFuZCBjdXN0b21pemUgdGhlIHZhbHVlcyBvZiBpdHMgcHJvcGVydGllcyBpblxuICogb3JkZXIgdG8gcHJvdmlkZSBkZWZhdWx0IHZhbHVlcyBmb3IgYWxsIHRoZSBwcm9ncmVzcyBiYXJzIHVzZWQgaW4gdGhlIGFwcGxpY2F0aW9uLlxuICovXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIE5nYlByb2dyZXNzYmFyQ29uZmlnIHtcblx0bWF4ID0gMTAwO1xuXHRhbmltYXRlZCA9IGZhbHNlO1xuXHRhcmlhTGFiZWwgPSAncHJvZ3Jlc3MgYmFyJztcblx0c3RyaXBlZCA9IGZhbHNlO1xuXHR0ZXh0VHlwZTogc3RyaW5nO1xuXHR0eXBlOiBzdHJpbmc7XG5cdHNob3dWYWx1ZSA9IGZhbHNlO1xuXHRoZWlnaHQ6IHN0cmluZztcbn1cbiJdfQ==