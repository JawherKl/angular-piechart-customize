import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./offcanvas-stack";
import * as i2 from "./offcanvas-config";
/**
 * A service for opening an offcanvas.
 *
 * Creating an offcanvas is straightforward: create a component or a template and pass it as an argument to
 * the `.open()` method.
 *
 * @since 12.1.0
 */
class NgbOffcanvas {
    constructor(_injector, _offcanvasStack, _config) {
        this._injector = _injector;
        this._offcanvasStack = _offcanvasStack;
        this._config = _config;
    }
    /**
     * Opens a new offcanvas panel with the specified content and supplied options.
     *
     * Content can be provided as a `TemplateRef` or a component type. If you pass a component type as content,
     * then instances of those components can be injected with an instance of the `NgbActiveOffcanvas` class. You can then
     * use `NgbActiveOffcanvas` methods to close / dismiss offcanvas from "inside" of your component.
     *
     * Also see the [`NgbOffcanvasOptions`](#/components/offcanvas/api#NgbOffcanvasOptions) for the list of supported
     * options.
     */
    open(content, options = {}) {
        const combinedOptions = { ...this._config, animation: this._config.animation, ...options };
        return this._offcanvasStack.open(this._injector, content, combinedOptions);
    }
    /**
     * Returns an observable that holds the active offcanvas instance.
     */
    get activeInstance() {
        return this._offcanvasStack.activeInstance;
    }
    /**
     * Dismisses the currently displayed offcanvas with the supplied reason.
     */
    dismiss(reason) {
        this._offcanvasStack.dismiss(reason);
    }
    /**
     * Indicates if there is currently an open offcanvas in the application.
     */
    hasOpenOffcanvas() {
        return this._offcanvasStack.hasOpenOffcanvas();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbOffcanvas, deps: [{ token: i0.Injector }, { token: i1.NgbOffcanvasStack }, { token: i2.NgbOffcanvasConfig }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbOffcanvas, providedIn: 'root' }); }
}
export { NgbOffcanvas };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbOffcanvas, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i0.Injector }, { type: i1.NgbOffcanvasStack }, { type: i2.NgbOffcanvasConfig }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2ZmY2FudmFzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL29mZmNhbnZhcy9vZmZjYW52YXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBWSxNQUFNLGVBQWUsQ0FBQzs7OztBQUtyRDs7Ozs7OztHQU9HO0FBQ0gsTUFDYSxZQUFZO0lBQ3hCLFlBQ1MsU0FBbUIsRUFDbkIsZUFBa0MsRUFDbEMsT0FBMkI7UUFGM0IsY0FBUyxHQUFULFNBQVMsQ0FBVTtRQUNuQixvQkFBZSxHQUFmLGVBQWUsQ0FBbUI7UUFDbEMsWUFBTyxHQUFQLE9BQU8sQ0FBb0I7SUFDakMsQ0FBQztJQUVKOzs7Ozs7Ozs7T0FTRztJQUNILElBQUksQ0FBQyxPQUFZLEVBQUUsVUFBK0IsRUFBRTtRQUNuRCxNQUFNLGVBQWUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsR0FBRyxPQUFPLEVBQUUsQ0FBQztRQUMzRixPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsT0FBTyxFQUFFLGVBQWUsQ0FBQyxDQUFDO0lBQzVFLENBQUM7SUFFRDs7T0FFRztJQUNILElBQUksY0FBYztRQUNqQixPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsY0FBYyxDQUFDO0lBQzVDLENBQUM7SUFFRDs7T0FFRztJQUNILE9BQU8sQ0FBQyxNQUFZO1FBQ25CLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFFRDs7T0FFRztJQUNILGdCQUFnQjtRQUNmLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0lBQ2hELENBQUM7OEdBekNXLFlBQVk7a0hBQVosWUFBWSxjQURDLE1BQU07O1NBQ25CLFlBQVk7MkZBQVosWUFBWTtrQkFEeEIsVUFBVTttQkFBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3RvciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmdiT2ZmY2FudmFzQ29uZmlnLCBOZ2JPZmZjYW52YXNPcHRpb25zIH0gZnJvbSAnLi9vZmZjYW52YXMtY29uZmlnJztcbmltcG9ydCB7IE5nYk9mZmNhbnZhc1JlZiB9IGZyb20gJy4vb2ZmY2FudmFzLXJlZic7XG5pbXBvcnQgeyBOZ2JPZmZjYW52YXNTdGFjayB9IGZyb20gJy4vb2ZmY2FudmFzLXN0YWNrJztcblxuLyoqXG4gKiBBIHNlcnZpY2UgZm9yIG9wZW5pbmcgYW4gb2ZmY2FudmFzLlxuICpcbiAqIENyZWF0aW5nIGFuIG9mZmNhbnZhcyBpcyBzdHJhaWdodGZvcndhcmQ6IGNyZWF0ZSBhIGNvbXBvbmVudCBvciBhIHRlbXBsYXRlIGFuZCBwYXNzIGl0IGFzIGFuIGFyZ3VtZW50IHRvXG4gKiB0aGUgYC5vcGVuKClgIG1ldGhvZC5cbiAqXG4gKiBAc2luY2UgMTIuMS4wXG4gKi9cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgTmdiT2ZmY2FudmFzIHtcblx0Y29uc3RydWN0b3IoXG5cdFx0cHJpdmF0ZSBfaW5qZWN0b3I6IEluamVjdG9yLFxuXHRcdHByaXZhdGUgX29mZmNhbnZhc1N0YWNrOiBOZ2JPZmZjYW52YXNTdGFjayxcblx0XHRwcml2YXRlIF9jb25maWc6IE5nYk9mZmNhbnZhc0NvbmZpZyxcblx0KSB7fVxuXG5cdC8qKlxuXHQgKiBPcGVucyBhIG5ldyBvZmZjYW52YXMgcGFuZWwgd2l0aCB0aGUgc3BlY2lmaWVkIGNvbnRlbnQgYW5kIHN1cHBsaWVkIG9wdGlvbnMuXG5cdCAqXG5cdCAqIENvbnRlbnQgY2FuIGJlIHByb3ZpZGVkIGFzIGEgYFRlbXBsYXRlUmVmYCBvciBhIGNvbXBvbmVudCB0eXBlLiBJZiB5b3UgcGFzcyBhIGNvbXBvbmVudCB0eXBlIGFzIGNvbnRlbnQsXG5cdCAqIHRoZW4gaW5zdGFuY2VzIG9mIHRob3NlIGNvbXBvbmVudHMgY2FuIGJlIGluamVjdGVkIHdpdGggYW4gaW5zdGFuY2Ugb2YgdGhlIGBOZ2JBY3RpdmVPZmZjYW52YXNgIGNsYXNzLiBZb3UgY2FuIHRoZW5cblx0ICogdXNlIGBOZ2JBY3RpdmVPZmZjYW52YXNgIG1ldGhvZHMgdG8gY2xvc2UgLyBkaXNtaXNzIG9mZmNhbnZhcyBmcm9tIFwiaW5zaWRlXCIgb2YgeW91ciBjb21wb25lbnQuXG5cdCAqXG5cdCAqIEFsc28gc2VlIHRoZSBbYE5nYk9mZmNhbnZhc09wdGlvbnNgXSgjL2NvbXBvbmVudHMvb2ZmY2FudmFzL2FwaSNOZ2JPZmZjYW52YXNPcHRpb25zKSBmb3IgdGhlIGxpc3Qgb2Ygc3VwcG9ydGVkXG5cdCAqIG9wdGlvbnMuXG5cdCAqL1xuXHRvcGVuKGNvbnRlbnQ6IGFueSwgb3B0aW9uczogTmdiT2ZmY2FudmFzT3B0aW9ucyA9IHt9KTogTmdiT2ZmY2FudmFzUmVmIHtcblx0XHRjb25zdCBjb21iaW5lZE9wdGlvbnMgPSB7IC4uLnRoaXMuX2NvbmZpZywgYW5pbWF0aW9uOiB0aGlzLl9jb25maWcuYW5pbWF0aW9uLCAuLi5vcHRpb25zIH07XG5cdFx0cmV0dXJuIHRoaXMuX29mZmNhbnZhc1N0YWNrLm9wZW4odGhpcy5faW5qZWN0b3IsIGNvbnRlbnQsIGNvbWJpbmVkT3B0aW9ucyk7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyBhbiBvYnNlcnZhYmxlIHRoYXQgaG9sZHMgdGhlIGFjdGl2ZSBvZmZjYW52YXMgaW5zdGFuY2UuXG5cdCAqL1xuXHRnZXQgYWN0aXZlSW5zdGFuY2UoKSB7XG5cdFx0cmV0dXJuIHRoaXMuX29mZmNhbnZhc1N0YWNrLmFjdGl2ZUluc3RhbmNlO1xuXHR9XG5cblx0LyoqXG5cdCAqIERpc21pc3NlcyB0aGUgY3VycmVudGx5IGRpc3BsYXllZCBvZmZjYW52YXMgd2l0aCB0aGUgc3VwcGxpZWQgcmVhc29uLlxuXHQgKi9cblx0ZGlzbWlzcyhyZWFzb24/OiBhbnkpIHtcblx0XHR0aGlzLl9vZmZjYW52YXNTdGFjay5kaXNtaXNzKHJlYXNvbik7XG5cdH1cblxuXHQvKipcblx0ICogSW5kaWNhdGVzIGlmIHRoZXJlIGlzIGN1cnJlbnRseSBhbiBvcGVuIG9mZmNhbnZhcyBpbiB0aGUgYXBwbGljYXRpb24uXG5cdCAqL1xuXHRoYXNPcGVuT2ZmY2FudmFzKCk6IGJvb2xlYW4ge1xuXHRcdHJldHVybiB0aGlzLl9vZmZjYW52YXNTdGFjay5oYXNPcGVuT2ZmY2FudmFzKCk7XG5cdH1cbn1cbiJdfQ==