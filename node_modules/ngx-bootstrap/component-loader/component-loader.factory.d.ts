import { ApplicationRef, ComponentFactoryResolver, ElementRef, Injector, NgZone, Renderer2, ViewContainerRef } from '@angular/core';
import { ComponentLoader } from './component-loader.class';
import { PositioningService } from 'ngx-bootstrap/positioning';
import * as i0 from "@angular/core";
export declare class ComponentLoaderFactory {
    private _componentFactoryResolver;
    private _ngZone;
    private _injector;
    private _posService;
    private _applicationRef;
    private _document;
    constructor(_componentFactoryResolver: ComponentFactoryResolver, _ngZone: NgZone, _injector: Injector, _posService: PositioningService, _applicationRef: ApplicationRef, _document: Document);
    /**
     *
     * @param _elementRef
     * @param _viewContainerRef
     * @param _renderer
     */
    createLoader<T extends object>(_elementRef?: ElementRef, _viewContainerRef?: ViewContainerRef, _renderer?: Renderer2): ComponentLoader<T>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ComponentLoaderFactory, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ComponentLoaderFactory>;
}
