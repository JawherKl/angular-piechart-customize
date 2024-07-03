import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./modal-stack";
import * as i2 from "./modal-config";
/**
 * A service for opening modal windows.
 *
 * Creating a modal is straightforward: create a component or a template and pass it as an argument to
 * the `.open()` method.
 */
class NgbModal {
    constructor(_injector, _modalStack, _config) {
        this._injector = _injector;
        this._modalStack = _modalStack;
        this._config = _config;
    }
    /**
     * Opens a new modal window with the specified content and supplied options.
     *
     * Content can be provided as a `TemplateRef` or a component type. If you pass a component type as content,
     * then instances of those components can be injected with an instance of the `NgbActiveModal` class. You can then
     * use `NgbActiveModal` methods to close / dismiss modals from "inside" of your component.
     *
     * Also see the [`NgbModalOptions`](#/components/modal/api#NgbModalOptions) for the list of supported options.
     */
    open(content, options = {}) {
        const combinedOptions = { ...this._config, animation: this._config.animation, ...options };
        return this._modalStack.open(this._injector, content, combinedOptions);
    }
    /**
     * Returns an observable that holds the active modal instances.
     */
    get activeInstances() {
        return this._modalStack.activeInstances;
    }
    /**
     * Dismisses all currently displayed modal windows with the supplied reason.
     *
     * @since 3.1.0
     */
    dismissAll(reason) {
        this._modalStack.dismissAll(reason);
    }
    /**
     * Indicates if there are currently any open modal windows in the application.
     *
     * @since 3.3.0
     */
    hasOpenModals() {
        return this._modalStack.hasOpenModals();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbModal, deps: [{ token: i0.Injector }, { token: i1.NgbModalStack }, { token: i2.NgbModalConfig }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbModal, providedIn: 'root' }); }
}
export { NgbModal };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbModal, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i0.Injector }, { type: i1.NgbModalStack }, { type: i2.NgbModalConfig }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbW9kYWwvbW9kYWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBWSxNQUFNLGVBQWUsQ0FBQzs7OztBQU1yRDs7Ozs7R0FLRztBQUNILE1BQ2EsUUFBUTtJQUNwQixZQUFvQixTQUFtQixFQUFVLFdBQTBCLEVBQVUsT0FBdUI7UUFBeEYsY0FBUyxHQUFULFNBQVMsQ0FBVTtRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFlO1FBQVUsWUFBTyxHQUFQLE9BQU8sQ0FBZ0I7SUFBRyxDQUFDO0lBRWhIOzs7Ozs7OztPQVFHO0lBQ0gsSUFBSSxDQUFDLE9BQVksRUFBRSxVQUEyQixFQUFFO1FBQy9DLE1BQU0sZUFBZSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxHQUFHLE9BQU8sRUFBRSxDQUFDO1FBQzNGLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxPQUFPLEVBQUUsZUFBZSxDQUFDLENBQUM7SUFDeEUsQ0FBQztJQUVEOztPQUVHO0lBQ0gsSUFBSSxlQUFlO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUM7SUFDekMsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxVQUFVLENBQUMsTUFBWTtRQUN0QixJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILGFBQWE7UUFDWixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDekMsQ0FBQzs4R0F4Q1csUUFBUTtrSEFBUixRQUFRLGNBREssTUFBTTs7U0FDbkIsUUFBUTsyRkFBUixRQUFRO2tCQURwQixVQUFVO21CQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE5nYk1vZGFsT3B0aW9ucywgTmdiTW9kYWxDb25maWcgfSBmcm9tICcuL21vZGFsLWNvbmZpZyc7XG5pbXBvcnQgeyBOZ2JNb2RhbFJlZiB9IGZyb20gJy4vbW9kYWwtcmVmJztcbmltcG9ydCB7IE5nYk1vZGFsU3RhY2sgfSBmcm9tICcuL21vZGFsLXN0YWNrJztcblxuLyoqXG4gKiBBIHNlcnZpY2UgZm9yIG9wZW5pbmcgbW9kYWwgd2luZG93cy5cbiAqXG4gKiBDcmVhdGluZyBhIG1vZGFsIGlzIHN0cmFpZ2h0Zm9yd2FyZDogY3JlYXRlIGEgY29tcG9uZW50IG9yIGEgdGVtcGxhdGUgYW5kIHBhc3MgaXQgYXMgYW4gYXJndW1lbnQgdG9cbiAqIHRoZSBgLm9wZW4oKWAgbWV0aG9kLlxuICovXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIE5nYk1vZGFsIHtcblx0Y29uc3RydWN0b3IocHJpdmF0ZSBfaW5qZWN0b3I6IEluamVjdG9yLCBwcml2YXRlIF9tb2RhbFN0YWNrOiBOZ2JNb2RhbFN0YWNrLCBwcml2YXRlIF9jb25maWc6IE5nYk1vZGFsQ29uZmlnKSB7fVxuXG5cdC8qKlxuXHQgKiBPcGVucyBhIG5ldyBtb2RhbCB3aW5kb3cgd2l0aCB0aGUgc3BlY2lmaWVkIGNvbnRlbnQgYW5kIHN1cHBsaWVkIG9wdGlvbnMuXG5cdCAqXG5cdCAqIENvbnRlbnQgY2FuIGJlIHByb3ZpZGVkIGFzIGEgYFRlbXBsYXRlUmVmYCBvciBhIGNvbXBvbmVudCB0eXBlLiBJZiB5b3UgcGFzcyBhIGNvbXBvbmVudCB0eXBlIGFzIGNvbnRlbnQsXG5cdCAqIHRoZW4gaW5zdGFuY2VzIG9mIHRob3NlIGNvbXBvbmVudHMgY2FuIGJlIGluamVjdGVkIHdpdGggYW4gaW5zdGFuY2Ugb2YgdGhlIGBOZ2JBY3RpdmVNb2RhbGAgY2xhc3MuIFlvdSBjYW4gdGhlblxuXHQgKiB1c2UgYE5nYkFjdGl2ZU1vZGFsYCBtZXRob2RzIHRvIGNsb3NlIC8gZGlzbWlzcyBtb2RhbHMgZnJvbSBcImluc2lkZVwiIG9mIHlvdXIgY29tcG9uZW50LlxuXHQgKlxuXHQgKiBBbHNvIHNlZSB0aGUgW2BOZ2JNb2RhbE9wdGlvbnNgXSgjL2NvbXBvbmVudHMvbW9kYWwvYXBpI05nYk1vZGFsT3B0aW9ucykgZm9yIHRoZSBsaXN0IG9mIHN1cHBvcnRlZCBvcHRpb25zLlxuXHQgKi9cblx0b3Blbihjb250ZW50OiBhbnksIG9wdGlvbnM6IE5nYk1vZGFsT3B0aW9ucyA9IHt9KTogTmdiTW9kYWxSZWYge1xuXHRcdGNvbnN0IGNvbWJpbmVkT3B0aW9ucyA9IHsgLi4udGhpcy5fY29uZmlnLCBhbmltYXRpb246IHRoaXMuX2NvbmZpZy5hbmltYXRpb24sIC4uLm9wdGlvbnMgfTtcblx0XHRyZXR1cm4gdGhpcy5fbW9kYWxTdGFjay5vcGVuKHRoaXMuX2luamVjdG9yLCBjb250ZW50LCBjb21iaW5lZE9wdGlvbnMpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgYW4gb2JzZXJ2YWJsZSB0aGF0IGhvbGRzIHRoZSBhY3RpdmUgbW9kYWwgaW5zdGFuY2VzLlxuXHQgKi9cblx0Z2V0IGFjdGl2ZUluc3RhbmNlcygpIHtcblx0XHRyZXR1cm4gdGhpcy5fbW9kYWxTdGFjay5hY3RpdmVJbnN0YW5jZXM7XG5cdH1cblxuXHQvKipcblx0ICogRGlzbWlzc2VzIGFsbCBjdXJyZW50bHkgZGlzcGxheWVkIG1vZGFsIHdpbmRvd3Mgd2l0aCB0aGUgc3VwcGxpZWQgcmVhc29uLlxuXHQgKlxuXHQgKiBAc2luY2UgMy4xLjBcblx0ICovXG5cdGRpc21pc3NBbGwocmVhc29uPzogYW55KSB7XG5cdFx0dGhpcy5fbW9kYWxTdGFjay5kaXNtaXNzQWxsKHJlYXNvbik7XG5cdH1cblxuXHQvKipcblx0ICogSW5kaWNhdGVzIGlmIHRoZXJlIGFyZSBjdXJyZW50bHkgYW55IG9wZW4gbW9kYWwgd2luZG93cyBpbiB0aGUgYXBwbGljYXRpb24uXG5cdCAqXG5cdCAqIEBzaW5jZSAzLjMuMFxuXHQgKi9cblx0aGFzT3Blbk1vZGFscygpOiBib29sZWFuIHtcblx0XHRyZXR1cm4gdGhpcy5fbW9kYWxTdGFjay5oYXNPcGVuTW9kYWxzKCk7XG5cdH1cbn1cbiJdfQ==