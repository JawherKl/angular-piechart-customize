import { ApplicationRef, ComponentFactoryResolver, Inject, Injectable, Injector, NgZone } from '@angular/core';
import { ComponentLoader } from './component-loader.class';
import { PositioningService } from 'ngx-bootstrap/positioning';
import { DOCUMENT } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "ngx-bootstrap/positioning";
export class ComponentLoaderFactory {
    constructor(_componentFactoryResolver, _ngZone, _injector, _posService, _applicationRef, _document) {
        this._componentFactoryResolver = _componentFactoryResolver;
        this._ngZone = _ngZone;
        this._injector = _injector;
        this._posService = _posService;
        this._applicationRef = _applicationRef;
        this._document = _document;
    }
    /**
     *
     * @param _elementRef
     * @param _viewContainerRef
     * @param _renderer
     */
    createLoader(_elementRef, _viewContainerRef, _renderer) {
        return new ComponentLoader(_viewContainerRef, _renderer, _elementRef, this._injector, this._componentFactoryResolver, this._ngZone, this._applicationRef, this._posService, this._document);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.1.4", ngImport: i0, type: ComponentLoaderFactory, deps: [{ token: i0.ComponentFactoryResolver }, { token: i0.NgZone }, { token: i0.Injector }, { token: i1.PositioningService }, { token: i0.ApplicationRef }, { token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.1.4", ngImport: i0, type: ComponentLoaderFactory, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.1.4", ngImport: i0, type: ComponentLoaderFactory, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i0.ComponentFactoryResolver }, { type: i0.NgZone }, { type: i0.Injector }, { type: i1.PositioningService }, { type: i0.ApplicationRef }, { type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50LWxvYWRlci5mYWN0b3J5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NvbXBvbmVudC1sb2FkZXIvY29tcG9uZW50LWxvYWRlci5mYWN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxjQUFjLEVBQUUsd0JBQXdCLEVBQWMsTUFBTSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQ2xGLE1BQU0sRUFDUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDM0QsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDL0QsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDOzs7QUFHM0MsTUFBTSxPQUFPLHNCQUFzQjtJQUNqQyxZQUFvQix5QkFBbUQsRUFDbkQsT0FBZSxFQUNmLFNBQW1CLEVBQ25CLFdBQStCLEVBQy9CLGVBQStCLEVBQ2IsU0FBbUI7UUFMckMsOEJBQXlCLEdBQXpCLHlCQUF5QixDQUEwQjtRQUNuRCxZQUFPLEdBQVAsT0FBTyxDQUFRO1FBQ2YsY0FBUyxHQUFULFNBQVMsQ0FBVTtRQUNuQixnQkFBVyxHQUFYLFdBQVcsQ0FBb0I7UUFDL0Isb0JBQWUsR0FBZixlQUFlLENBQWdCO1FBQ2IsY0FBUyxHQUFULFNBQVMsQ0FBVTtJQUN0RCxDQUFDO0lBRUo7Ozs7O09BS0c7SUFDSCxZQUFZLENBQW1CLFdBQXdCLEVBQ3ZDLGlCQUFvQyxFQUNwQyxTQUFxQjtRQUVuQyxPQUFPLElBQUksZUFBZSxDQUN4QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFdBQVcsRUFDWCxJQUFJLENBQUMsU0FBUyxFQUNkLElBQUksQ0FBQyx5QkFBeUIsRUFDOUIsSUFBSSxDQUFDLE9BQU8sRUFDWixJQUFJLENBQUMsZUFBZSxFQUNwQixJQUFJLENBQUMsV0FBVyxFQUNoQixJQUFJLENBQUMsU0FBUyxDQUNmLENBQUM7SUFDSixDQUFDOzhHQTlCVSxzQkFBc0Isd0tBTWIsUUFBUTtrSEFOakIsc0JBQXNCLGNBRFYsTUFBTTs7MkZBQ2xCLHNCQUFzQjtrQkFEbEMsVUFBVTttQkFBQyxFQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUM7OzBCQU9qQixNQUFNOzJCQUFDLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBcHBsaWNhdGlvblJlZiwgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBFbGVtZW50UmVmLCBJbmplY3QsIEluamVjdGFibGUsIEluamVjdG9yLFxuICBOZ1pvbmUsIFJlbmRlcmVyMiwgVmlld0NvbnRhaW5lclJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbXBvbmVudExvYWRlciB9IGZyb20gJy4vY29tcG9uZW50LWxvYWRlci5jbGFzcyc7XG5pbXBvcnQgeyBQb3NpdGlvbmluZ1NlcnZpY2UgfSBmcm9tICduZ3gtYm9vdHN0cmFwL3Bvc2l0aW9uaW5nJztcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46ICdyb290J30pXG5leHBvcnQgY2xhc3MgQ29tcG9uZW50TG9hZGVyRmFjdG9yeSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2NvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgICAgICAgICAgICBwcml2YXRlIF9uZ1pvbmU6IE5nWm9uZSxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfaW5qZWN0b3I6IEluamVjdG9yLFxuICAgICAgICAgICAgICBwcml2YXRlIF9wb3NTZXJ2aWNlOiBQb3NpdGlvbmluZ1NlcnZpY2UsXG4gICAgICAgICAgICAgIHByaXZhdGUgX2FwcGxpY2F0aW9uUmVmOiBBcHBsaWNhdGlvblJlZixcbiAgICAgICAgICAgICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBfZG9jdW1lbnQ6IERvY3VtZW50XG4gICkge31cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIF9lbGVtZW50UmVmXG4gICAqIEBwYXJhbSBfdmlld0NvbnRhaW5lclJlZlxuICAgKiBAcGFyYW0gX3JlbmRlcmVyXG4gICAqL1xuICBjcmVhdGVMb2FkZXI8VCBleHRlbmRzIG9iamVjdD4oX2VsZW1lbnRSZWY/OiBFbGVtZW50UmVmLFxuICAgICAgICAgICAgICAgICAgX3ZpZXdDb250YWluZXJSZWY/OiBWaWV3Q29udGFpbmVyUmVmLFxuICAgICAgICAgICAgICAgICAgX3JlbmRlcmVyPzogUmVuZGVyZXIyLFxuICApOiBDb21wb25lbnRMb2FkZXI8VD4ge1xuICAgIHJldHVybiBuZXcgQ29tcG9uZW50TG9hZGVyPFQ+KFxuICAgICAgX3ZpZXdDb250YWluZXJSZWYsXG4gICAgICBfcmVuZGVyZXIsXG4gICAgICBfZWxlbWVudFJlZixcbiAgICAgIHRoaXMuX2luamVjdG9yLFxuICAgICAgdGhpcy5fY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgICAgdGhpcy5fbmdab25lLFxuICAgICAgdGhpcy5fYXBwbGljYXRpb25SZWYsXG4gICAgICB0aGlzLl9wb3NTZXJ2aWNlLFxuICAgICAgdGhpcy5fZG9jdW1lbnRcbiAgICApO1xuICB9XG59XG4iXX0=