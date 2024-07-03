import { Injectable } from '@angular/core';
import { environment } from './environment';
import * as i0 from "@angular/core";
/**
 * Global ng-bootstrap config
 *
 * @since 8.0.0
 */
class NgbConfig {
    constructor() {
        this.animation = environment.animation;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbConfig, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbConfig, providedIn: 'root' }); }
}
export { NgbConfig };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbConfig, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdiLWNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9uZ2ItY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFFNUM7Ozs7R0FJRztBQUNILE1BQ2EsU0FBUztJQUR0QjtRQUVDLGNBQVMsR0FBRyxXQUFXLENBQUMsU0FBUyxDQUFDO0tBQ2xDOzhHQUZZLFNBQVM7a0hBQVQsU0FBUyxjQURJLE1BQU07O1NBQ25CLFNBQVM7MkZBQVQsU0FBUztrQkFEckIsVUFBVTttQkFBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBlbnZpcm9ubWVudCB9IGZyb20gJy4vZW52aXJvbm1lbnQnO1xuXG4vKipcbiAqIEdsb2JhbCBuZy1ib290c3RyYXAgY29uZmlnXG4gKlxuICogQHNpbmNlIDguMC4wXG4gKi9cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgTmdiQ29uZmlnIHtcblx0YW5pbWF0aW9uID0gZW52aXJvbm1lbnQuYW5pbWF0aW9uO1xufVxuIl19