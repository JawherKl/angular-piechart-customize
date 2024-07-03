import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../ngb-config";
/**
 * A configuration service for the [`NgbNav`](#/components/nav/api#NgbNav) component.
 *
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the navs used in the application.
 *
 * @since 5.2.0
 */
class NgbNavConfig {
    constructor(_ngbConfig) {
        this._ngbConfig = _ngbConfig;
        this.destroyOnHide = true;
        this.orientation = 'horizontal';
        this.roles = 'tablist';
        this.keyboard = false;
    }
    get animation() {
        return this._animation === undefined ? this._ngbConfig.animation : this._animation;
    }
    set animation(animation) {
        this._animation = animation;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbNavConfig, deps: [{ token: i1.NgbConfig }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbNavConfig, providedIn: 'root' }); }
}
export { NgbNavConfig };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbNavConfig, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.NgbConfig }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2LWNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9uYXYvbmF2LWNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7QUFHM0M7Ozs7Ozs7R0FPRztBQUNILE1BQ2EsWUFBWTtJQVF4QixZQUFvQixVQUFxQjtRQUFyQixlQUFVLEdBQVYsVUFBVSxDQUFXO1FBUHpDLGtCQUFhLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLGdCQUFXLEdBQThCLFlBQVksQ0FBQztRQUN0RCxVQUFLLEdBQXNCLFNBQVMsQ0FBQztRQUNyQyxhQUFRLEdBQWlDLEtBQUssQ0FBQztJQUlILENBQUM7SUFFN0MsSUFBSSxTQUFTO1FBQ1osT0FBTyxJQUFJLENBQUMsVUFBVSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDcEYsQ0FBQztJQUNELElBQUksU0FBUyxDQUFDLFNBQWtCO1FBQy9CLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO0lBQzdCLENBQUM7OEdBZlcsWUFBWTtrSEFBWixZQUFZLGNBREMsTUFBTTs7U0FDbkIsWUFBWTsyRkFBWixZQUFZO2tCQUR4QixVQUFVO21CQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5nYkNvbmZpZyB9IGZyb20gJy4uL25nYi1jb25maWcnO1xuXG4vKipcbiAqIEEgY29uZmlndXJhdGlvbiBzZXJ2aWNlIGZvciB0aGUgW2BOZ2JOYXZgXSgjL2NvbXBvbmVudHMvbmF2L2FwaSNOZ2JOYXYpIGNvbXBvbmVudC5cbiAqXG4gKiBZb3UgY2FuIGluamVjdCB0aGlzIHNlcnZpY2UsIHR5cGljYWxseSBpbiB5b3VyIHJvb3QgY29tcG9uZW50LCBhbmQgY3VzdG9taXplIHRoZSB2YWx1ZXMgb2YgaXRzIHByb3BlcnRpZXMgaW5cbiAqIG9yZGVyIHRvIHByb3ZpZGUgZGVmYXVsdCB2YWx1ZXMgZm9yIGFsbCB0aGUgbmF2cyB1c2VkIGluIHRoZSBhcHBsaWNhdGlvbi5cbiAqXG4gKiBAc2luY2UgNS4yLjBcbiAqL1xuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBOZ2JOYXZDb25maWcge1xuXHRkZXN0cm95T25IaWRlID0gdHJ1ZTtcblx0b3JpZW50YXRpb246ICdob3Jpem9udGFsJyB8ICd2ZXJ0aWNhbCcgPSAnaG9yaXpvbnRhbCc7XG5cdHJvbGVzOiAndGFibGlzdCcgfCBmYWxzZSA9ICd0YWJsaXN0Jztcblx0a2V5Ym9hcmQ6IGJvb2xlYW4gfCAnY2hhbmdlV2l0aEFycm93cycgPSBmYWxzZTtcblxuXHRwcml2YXRlIF9hbmltYXRpb246IGJvb2xlYW47XG5cblx0Y29uc3RydWN0b3IocHJpdmF0ZSBfbmdiQ29uZmlnOiBOZ2JDb25maWcpIHt9XG5cblx0Z2V0IGFuaW1hdGlvbigpOiBib29sZWFuIHtcblx0XHRyZXR1cm4gdGhpcy5fYW5pbWF0aW9uID09PSB1bmRlZmluZWQgPyB0aGlzLl9uZ2JDb25maWcuYW5pbWF0aW9uIDogdGhpcy5fYW5pbWF0aW9uO1xuXHR9XG5cdHNldCBhbmltYXRpb24oYW5pbWF0aW9uOiBib29sZWFuKSB7XG5cdFx0dGhpcy5fYW5pbWF0aW9uID0gYW5pbWF0aW9uO1xuXHR9XG59XG4iXX0=