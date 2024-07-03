import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../ngb-config";
/**
 * A configuration service for the [`NgbAccordionDirective`](#/components/accordion/api#NgbAccordionDirective).
 *
 * You can inject this service, typically in your root component, and customize its properties
 * to provide default values for all accordions used in the application.
 */
class NgbAccordionConfig {
    constructor(_ngbConfig) {
        this._ngbConfig = _ngbConfig;
        this.closeOthers = false;
        this.destroyOnHide = true;
    }
    get animation() {
        return this._animation === undefined ? this._ngbConfig.animation : this._animation;
    }
    set animation(animation) {
        this._animation = animation;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbAccordionConfig, deps: [{ token: i1.NgbConfig }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbAccordionConfig, providedIn: 'root' }); }
}
export { NgbAccordionConfig };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbAccordionConfig, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.NgbConfig }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3JkaW9uLWNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hY2NvcmRpb24vYWNjb3JkaW9uLWNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7QUFHM0M7Ozs7O0dBS0c7QUFDSCxNQUNhLGtCQUFrQjtJQVc5QixZQUFvQixVQUFxQjtRQUFyQixlQUFVLEdBQVYsVUFBVSxDQUFXO1FBVnpDLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLGtCQUFhLEdBQUcsSUFBSSxDQUFDO0lBU3VCLENBQUM7SUFFN0MsSUFBSSxTQUFTO1FBQ1osT0FBTyxJQUFJLENBQUMsVUFBVSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDcEYsQ0FBQztJQUNELElBQUksU0FBUyxDQUFDLFNBQWtCO1FBQy9CLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO0lBQzdCLENBQUM7OEdBbEJXLGtCQUFrQjtrSEFBbEIsa0JBQWtCLGNBREwsTUFBTTs7U0FDbkIsa0JBQWtCOzJGQUFsQixrQkFBa0I7a0JBRDlCLFVBQVU7bUJBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmdiQ29uZmlnIH0gZnJvbSAnLi4vbmdiLWNvbmZpZyc7XG5cbi8qKlxuICogQSBjb25maWd1cmF0aW9uIHNlcnZpY2UgZm9yIHRoZSBbYE5nYkFjY29yZGlvbkRpcmVjdGl2ZWBdKCMvY29tcG9uZW50cy9hY2NvcmRpb24vYXBpI05nYkFjY29yZGlvbkRpcmVjdGl2ZSkuXG4gKlxuICogWW91IGNhbiBpbmplY3QgdGhpcyBzZXJ2aWNlLCB0eXBpY2FsbHkgaW4geW91ciByb290IGNvbXBvbmVudCwgYW5kIGN1c3RvbWl6ZSBpdHMgcHJvcGVydGllc1xuICogdG8gcHJvdmlkZSBkZWZhdWx0IHZhbHVlcyBmb3IgYWxsIGFjY29yZGlvbnMgdXNlZCBpbiB0aGUgYXBwbGljYXRpb24uXG4gKi9cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgTmdiQWNjb3JkaW9uQ29uZmlnIHtcblx0Y2xvc2VPdGhlcnMgPSBmYWxzZTtcblx0ZGVzdHJveU9uSGlkZSA9IHRydWU7XG5cblx0LyoqXG5cdCAqIEBkZXByZWNhdGVkIDE0LjEuMFxuXHQgKi9cblx0dHlwZTogc3RyaW5nO1xuXG5cdHByaXZhdGUgX2FuaW1hdGlvbjogYm9vbGVhbjtcblxuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIF9uZ2JDb25maWc6IE5nYkNvbmZpZykge31cblxuXHRnZXQgYW5pbWF0aW9uKCk6IGJvb2xlYW4ge1xuXHRcdHJldHVybiB0aGlzLl9hbmltYXRpb24gPT09IHVuZGVmaW5lZCA/IHRoaXMuX25nYkNvbmZpZy5hbmltYXRpb24gOiB0aGlzLl9hbmltYXRpb247XG5cdH1cblx0c2V0IGFuaW1hdGlvbihhbmltYXRpb246IGJvb2xlYW4pIHtcblx0XHR0aGlzLl9hbmltYXRpb24gPSBhbmltYXRpb247XG5cdH1cbn1cbiJdfQ==