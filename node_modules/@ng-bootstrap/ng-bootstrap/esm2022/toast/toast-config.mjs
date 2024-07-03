import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../ngb-config";
/**
 * Configuration service for the NgbToast component. You can inject this service, typically in your root component,
 * and customize the values of its properties in order to provide default values for all the toasts used in the
 * application.
 *
 * @since 5.0.0
 */
class NgbToastConfig {
    constructor(_ngbConfig) {
        this._ngbConfig = _ngbConfig;
        this.autohide = true;
        this.delay = 5000;
        this.ariaLive = 'polite';
    }
    get animation() {
        return this._animation === undefined ? this._ngbConfig.animation : this._animation;
    }
    set animation(animation) {
        this._animation = animation;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbToastConfig, deps: [{ token: i1.NgbConfig }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbToastConfig, providedIn: 'root' }); }
}
export { NgbToastConfig };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbToastConfig, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.NgbConfig }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9hc3QtY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3RvYXN0L3RvYXN0LWNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7QUE4QjNDOzs7Ozs7R0FNRztBQUNILE1BQ2EsY0FBYztJQU8xQixZQUFvQixVQUFxQjtRQUFyQixlQUFVLEdBQVYsVUFBVSxDQUFXO1FBTnpDLGFBQVEsR0FBRyxJQUFJLENBQUM7UUFDaEIsVUFBSyxHQUFHLElBQUksQ0FBQztRQUNiLGFBQVEsR0FBdUIsUUFBUSxDQUFDO0lBSUksQ0FBQztJQUU3QyxJQUFJLFNBQVM7UUFDWixPQUFPLElBQUksQ0FBQyxVQUFVLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUNwRixDQUFDO0lBQ0QsSUFBSSxTQUFTLENBQUMsU0FBa0I7UUFDL0IsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7SUFDN0IsQ0FBQzs4R0FkVyxjQUFjO2tIQUFkLGNBQWMsY0FERCxNQUFNOztTQUNuQixjQUFjOzJGQUFkLGNBQWM7a0JBRDFCLFVBQVU7bUJBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmdiQ29uZmlnIH0gZnJvbSAnLi4vbmdiLWNvbmZpZyc7XG5cbi8qKlxuICogSW50ZXJmYWNlIHVzZWQgdG8gdHlwZSBhbGwgdG9hc3QgY29uZmlnIG9wdGlvbnMuIFNlZSBgTmdiVG9hc3RDb25maWdgLlxuICpcbiAqIEBzaW5jZSA1LjAuMFxuICovXG5leHBvcnQgaW50ZXJmYWNlIE5nYlRvYXN0T3B0aW9ucyB7XG5cdC8qKlxuXHQgKiBTcGVjaWZ5IGlmIHRoZSB0b2FzdCBjb21wb25lbnQgc2hvdWxkIGVtaXQgdGhlIGBoaWRlKClgIG91dHB1dFxuXHQgKiBhZnRlciBhIGNlcnRhaW4gYGRlbGF5YCBpbiBtcy5cblx0ICovXG5cdGF1dG9oaWRlPzogYm9vbGVhbjtcblxuXHQvKipcblx0ICogRGVsYXkgaW4gbXMgYWZ0ZXIgd2hpY2ggdGhlIGBoaWRlKClgIG91dHB1dCBzaG91bGQgYmUgZW1pdHRlZC5cblx0ICovXG5cdGRlbGF5PzogbnVtYmVyO1xuXG5cdC8qKlxuXHQgKiBUeXBlIG9mIGFyaWEtbGl2ZSBhdHRyaWJ1dGUgdG8gYmUgdXNlZC5cblx0ICpcblx0ICogQ291bGQgYmUgb25lIG9mIHRoZXNlIDIgdmFsdWVzIChhcyBzdHJpbmcpOlxuXHQgKiAtIGBwb2xpdGVgIChkZWZhdWx0KVxuXHQgKiAtIGBhbGVydGBcblx0ICovXG5cdGFyaWFMaXZlPzogJ3BvbGl0ZScgfCAnYWxlcnQnO1xufVxuXG4vKipcbiAqIENvbmZpZ3VyYXRpb24gc2VydmljZSBmb3IgdGhlIE5nYlRvYXN0IGNvbXBvbmVudC4gWW91IGNhbiBpbmplY3QgdGhpcyBzZXJ2aWNlLCB0eXBpY2FsbHkgaW4geW91ciByb290IGNvbXBvbmVudCxcbiAqIGFuZCBjdXN0b21pemUgdGhlIHZhbHVlcyBvZiBpdHMgcHJvcGVydGllcyBpbiBvcmRlciB0byBwcm92aWRlIGRlZmF1bHQgdmFsdWVzIGZvciBhbGwgdGhlIHRvYXN0cyB1c2VkIGluIHRoZVxuICogYXBwbGljYXRpb24uXG4gKlxuICogQHNpbmNlIDUuMC4wXG4gKi9cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgTmdiVG9hc3RDb25maWcgaW1wbGVtZW50cyBOZ2JUb2FzdE9wdGlvbnMge1xuXHRhdXRvaGlkZSA9IHRydWU7XG5cdGRlbGF5ID0gNTAwMDtcblx0YXJpYUxpdmU6ICdwb2xpdGUnIHwgJ2FsZXJ0JyA9ICdwb2xpdGUnO1xuXG5cdHByaXZhdGUgX2FuaW1hdGlvbjogYm9vbGVhbjtcblxuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIF9uZ2JDb25maWc6IE5nYkNvbmZpZykge31cblxuXHRnZXQgYW5pbWF0aW9uKCk6IGJvb2xlYW4ge1xuXHRcdHJldHVybiB0aGlzLl9hbmltYXRpb24gPT09IHVuZGVmaW5lZCA/IHRoaXMuX25nYkNvbmZpZy5hbmltYXRpb24gOiB0aGlzLl9hbmltYXRpb247XG5cdH1cblx0c2V0IGFuaW1hdGlvbihhbmltYXRpb246IGJvb2xlYW4pIHtcblx0XHR0aGlzLl9hbmltYXRpb24gPSBhbmltYXRpb247XG5cdH1cbn1cbiJdfQ==