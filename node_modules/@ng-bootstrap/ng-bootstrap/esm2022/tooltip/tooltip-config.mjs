import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../ngb-config";
/**
 * A configuration service for the [`NgbTooltip`](#/components/tooltip/api#NgbTooltip) component.
 *
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the tooltips used in the application.
 */
class NgbTooltipConfig {
    constructor(_ngbConfig) {
        this._ngbConfig = _ngbConfig;
        this.autoClose = true;
        this.placement = 'auto';
        this.popperOptions = (options) => options;
        this.triggers = 'hover focus';
        this.disableTooltip = false;
        this.openDelay = 0;
        this.closeDelay = 0;
    }
    get animation() {
        return this._animation === undefined ? this._ngbConfig.animation : this._animation;
    }
    set animation(animation) {
        this._animation = animation;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbTooltipConfig, deps: [{ token: i1.NgbConfig }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbTooltipConfig, providedIn: 'root' }); }
}
export { NgbTooltipConfig };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbTooltipConfig, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.NgbConfig }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC1jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvdG9vbHRpcC90b29sdGlwLWNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7QUFLM0M7Ozs7O0dBS0c7QUFDSCxNQUNhLGdCQUFnQjtJQWE1QixZQUFvQixVQUFxQjtRQUFyQixlQUFVLEdBQVYsVUFBVSxDQUFXO1FBWnpDLGNBQVMsR0FBbUMsSUFBSSxDQUFDO1FBQ2pELGNBQVMsR0FBbUIsTUFBTSxDQUFDO1FBQ25DLGtCQUFhLEdBQUcsQ0FBQyxPQUF5QixFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUM7UUFDdkQsYUFBUSxHQUFHLGFBQWEsQ0FBQztRQUV6QixtQkFBYyxHQUFHLEtBQUssQ0FBQztRQUV2QixjQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ2QsZUFBVSxHQUFHLENBQUMsQ0FBQztJQUk2QixDQUFDO0lBRTdDLElBQUksU0FBUztRQUNaLE9BQU8sSUFBSSxDQUFDLFVBQVUsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQ3BGLENBQUM7SUFDRCxJQUFJLFNBQVMsQ0FBQyxTQUFrQjtRQUMvQixJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztJQUM3QixDQUFDOzhHQXBCVyxnQkFBZ0I7a0hBQWhCLGdCQUFnQixjQURILE1BQU07O1NBQ25CLGdCQUFnQjsyRkFBaEIsZ0JBQWdCO2tCQUQ1QixVQUFVO21CQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFBsYWNlbWVudEFycmF5IH0gZnJvbSAnLi4vdXRpbC9wb3NpdGlvbmluZyc7XG5pbXBvcnQgeyBOZ2JDb25maWcgfSBmcm9tICcuLi9uZ2ItY29uZmlnJztcbmltcG9ydCB7IE9wdGlvbnMgfSBmcm9tICdAcG9wcGVyanMvY29yZSc7XG5cbi8qKlxuICogQSBjb25maWd1cmF0aW9uIHNlcnZpY2UgZm9yIHRoZSBbYE5nYlRvb2x0aXBgXSgjL2NvbXBvbmVudHMvdG9vbHRpcC9hcGkjTmdiVG9vbHRpcCkgY29tcG9uZW50LlxuICpcbiAqIFlvdSBjYW4gaW5qZWN0IHRoaXMgc2VydmljZSwgdHlwaWNhbGx5IGluIHlvdXIgcm9vdCBjb21wb25lbnQsIGFuZCBjdXN0b21pemUgdGhlIHZhbHVlcyBvZiBpdHMgcHJvcGVydGllcyBpblxuICogb3JkZXIgdG8gcHJvdmlkZSBkZWZhdWx0IHZhbHVlcyBmb3IgYWxsIHRoZSB0b29sdGlwcyB1c2VkIGluIHRoZSBhcHBsaWNhdGlvbi5cbiAqL1xuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBOZ2JUb29sdGlwQ29uZmlnIHtcblx0YXV0b0Nsb3NlOiBib29sZWFuIHwgJ2luc2lkZScgfCAnb3V0c2lkZScgPSB0cnVlO1xuXHRwbGFjZW1lbnQ6IFBsYWNlbWVudEFycmF5ID0gJ2F1dG8nO1xuXHRwb3BwZXJPcHRpb25zID0gKG9wdGlvbnM6IFBhcnRpYWw8T3B0aW9ucz4pID0+IG9wdGlvbnM7XG5cdHRyaWdnZXJzID0gJ2hvdmVyIGZvY3VzJztcblx0Y29udGFpbmVyOiBzdHJpbmc7XG5cdGRpc2FibGVUb29sdGlwID0gZmFsc2U7XG5cdHRvb2x0aXBDbGFzczogc3RyaW5nO1xuXHRvcGVuRGVsYXkgPSAwO1xuXHRjbG9zZURlbGF5ID0gMDtcblxuXHRwcml2YXRlIF9hbmltYXRpb246IGJvb2xlYW47XG5cblx0Y29uc3RydWN0b3IocHJpdmF0ZSBfbmdiQ29uZmlnOiBOZ2JDb25maWcpIHt9XG5cblx0Z2V0IGFuaW1hdGlvbigpOiBib29sZWFuIHtcblx0XHRyZXR1cm4gdGhpcy5fYW5pbWF0aW9uID09PSB1bmRlZmluZWQgPyB0aGlzLl9uZ2JDb25maWcuYW5pbWF0aW9uIDogdGhpcy5fYW5pbWF0aW9uO1xuXHR9XG5cdHNldCBhbmltYXRpb24oYW5pbWF0aW9uOiBib29sZWFuKSB7XG5cdFx0dGhpcy5fYW5pbWF0aW9uID0gYW5pbWF0aW9uO1xuXHR9XG59XG4iXX0=