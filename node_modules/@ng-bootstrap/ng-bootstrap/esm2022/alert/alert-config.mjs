import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../ngb-config";
/**
 * A configuration service for the [NgbAlert](#/components/alert/api#NgbAlert) component.
 *
 * You can inject this service, typically in your root component, and customize its properties
 * to provide default values for all alerts used in the application.
 */
class NgbAlertConfig {
    constructor(_ngbConfig) {
        this._ngbConfig = _ngbConfig;
        this.dismissible = true;
        this.type = 'warning';
    }
    get animation() {
        return this._animation === undefined ? this._ngbConfig.animation : this._animation;
    }
    set animation(animation) {
        this._animation = animation;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbAlertConfig, deps: [{ token: i1.NgbConfig }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbAlertConfig, providedIn: 'root' }); }
}
export { NgbAlertConfig };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbAlertConfig, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.NgbConfig }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxlcnQtY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FsZXJ0L2FsZXJ0LWNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7QUFHM0M7Ozs7O0dBS0c7QUFDSCxNQUNhLGNBQWM7SUFNMUIsWUFBb0IsVUFBcUI7UUFBckIsZUFBVSxHQUFWLFVBQVUsQ0FBVztRQUx6QyxnQkFBVyxHQUFHLElBQUksQ0FBQztRQUNuQixTQUFJLEdBQUcsU0FBUyxDQUFDO0lBSTJCLENBQUM7SUFFN0MsSUFBSSxTQUFTO1FBQ1osT0FBTyxJQUFJLENBQUMsVUFBVSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDcEYsQ0FBQztJQUNELElBQUksU0FBUyxDQUFDLFNBQWtCO1FBQy9CLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO0lBQzdCLENBQUM7OEdBYlcsY0FBYztrSEFBZCxjQUFjLGNBREQsTUFBTTs7U0FDbkIsY0FBYzsyRkFBZCxjQUFjO2tCQUQxQixVQUFVO21CQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5nYkNvbmZpZyB9IGZyb20gJy4uL25nYi1jb25maWcnO1xuXG4vKipcbiAqIEEgY29uZmlndXJhdGlvbiBzZXJ2aWNlIGZvciB0aGUgW05nYkFsZXJ0XSgjL2NvbXBvbmVudHMvYWxlcnQvYXBpI05nYkFsZXJ0KSBjb21wb25lbnQuXG4gKlxuICogWW91IGNhbiBpbmplY3QgdGhpcyBzZXJ2aWNlLCB0eXBpY2FsbHkgaW4geW91ciByb290IGNvbXBvbmVudCwgYW5kIGN1c3RvbWl6ZSBpdHMgcHJvcGVydGllc1xuICogdG8gcHJvdmlkZSBkZWZhdWx0IHZhbHVlcyBmb3IgYWxsIGFsZXJ0cyB1c2VkIGluIHRoZSBhcHBsaWNhdGlvbi5cbiAqL1xuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBOZ2JBbGVydENvbmZpZyB7XG5cdGRpc21pc3NpYmxlID0gdHJ1ZTtcblx0dHlwZSA9ICd3YXJuaW5nJztcblxuXHRwcml2YXRlIF9hbmltYXRpb246IGJvb2xlYW47XG5cblx0Y29uc3RydWN0b3IocHJpdmF0ZSBfbmdiQ29uZmlnOiBOZ2JDb25maWcpIHt9XG5cblx0Z2V0IGFuaW1hdGlvbigpOiBib29sZWFuIHtcblx0XHRyZXR1cm4gdGhpcy5fYW5pbWF0aW9uID09PSB1bmRlZmluZWQgPyB0aGlzLl9uZ2JDb25maWcuYW5pbWF0aW9uIDogdGhpcy5fYW5pbWF0aW9uO1xuXHR9XG5cdHNldCBhbmltYXRpb24oYW5pbWF0aW9uOiBib29sZWFuKSB7XG5cdFx0dGhpcy5fYW5pbWF0aW9uID0gYW5pbWF0aW9uO1xuXHR9XG59XG4iXX0=