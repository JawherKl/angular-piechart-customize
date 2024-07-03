import { Injectable } from '@angular/core';
import { defaultProcessChanges } from './scrollspy.utils';
import * as i0 from "@angular/core";
/**
 * A configuration service for the [`NgbScrollSpyService`](#/components/scrollspy/api#NgbScrollSpyService).
 *
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all scrollspies used in the application.
 *
 * @since 15.1.0
 */
class NgbScrollSpyConfig {
    constructor() {
        this.scrollBehavior = 'smooth';
        this.processChanges = defaultProcessChanges;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbScrollSpyConfig, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbScrollSpyConfig, providedIn: 'root' }); }
}
export { NgbScrollSpyConfig };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbScrollSpyConfig, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsc3B5LWNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zY3JvbGxzcHkvc2Nyb2xsc3B5LWNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLG1CQUFtQixDQUFDOztBQUUxRDs7Ozs7OztHQU9HO0FBQ0gsTUFDYSxrQkFBa0I7SUFEL0I7UUFFQyxtQkFBYyxHQUFzQixRQUFRLENBQUM7UUFDN0MsbUJBQWMsR0FBK0IscUJBQXFCLENBQUM7S0FDbkU7OEdBSFksa0JBQWtCO2tIQUFsQixrQkFBa0IsY0FETCxNQUFNOztTQUNuQixrQkFBa0I7MkZBQWxCLGtCQUFrQjtrQkFEOUIsVUFBVTttQkFBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ2JTY3JvbGxTcHlQcm9jZXNzQ2hhbmdlcyB9IGZyb20gJy4vc2Nyb2xsc3B5LnNlcnZpY2UnO1xuaW1wb3J0IHsgZGVmYXVsdFByb2Nlc3NDaGFuZ2VzIH0gZnJvbSAnLi9zY3JvbGxzcHkudXRpbHMnO1xuXG4vKipcbiAqIEEgY29uZmlndXJhdGlvbiBzZXJ2aWNlIGZvciB0aGUgW2BOZ2JTY3JvbGxTcHlTZXJ2aWNlYF0oIy9jb21wb25lbnRzL3Njcm9sbHNweS9hcGkjTmdiU2Nyb2xsU3B5U2VydmljZSkuXG4gKlxuICogWW91IGNhbiBpbmplY3QgdGhpcyBzZXJ2aWNlLCB0eXBpY2FsbHkgaW4geW91ciByb290IGNvbXBvbmVudCwgYW5kIGN1c3RvbWl6ZSB0aGUgdmFsdWVzIG9mIGl0cyBwcm9wZXJ0aWVzIGluXG4gKiBvcmRlciB0byBwcm92aWRlIGRlZmF1bHQgdmFsdWVzIGZvciBhbGwgc2Nyb2xsc3BpZXMgdXNlZCBpbiB0aGUgYXBwbGljYXRpb24uXG4gKlxuICogQHNpbmNlIDE1LjEuMFxuICovXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIE5nYlNjcm9sbFNweUNvbmZpZyB7XG5cdHNjcm9sbEJlaGF2aW9yOiAnYXV0bycgfCAnc21vb3RoJyA9ICdzbW9vdGgnO1xuXHRwcm9jZXNzQ2hhbmdlczogTmdiU2Nyb2xsU3B5UHJvY2Vzc0NoYW5nZXMgPSBkZWZhdWx0UHJvY2Vzc0NoYW5nZXM7XG59XG4iXX0=