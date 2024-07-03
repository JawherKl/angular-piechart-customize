import { ChangeDetectorRef, ContentChildren, DestroyRef, Directive, ElementRef, inject, Input, Output, } from '@angular/core';
import { NgbScrollSpyService } from './scrollspy.service';
import { isString } from '../util/util';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import * as i0 from "@angular/core";
/**
 * A helper directive to that links menu items and fragments together.
 *
 * It will automatically add the `.active` class to the menu item when the associated fragment becomes active.
 *
 * @since 15.1.0
 */
class NgbScrollSpyItem {
    constructor() {
        this._changeDetector = inject(ChangeDetectorRef);
        this._scrollSpyMenu = inject(NgbScrollSpyMenu, { optional: true });
        this._scrollSpyAPI = this._scrollSpyMenu ?? inject(NgbScrollSpyService);
        this._destroyRef = inject(DestroyRef);
        this._isActive = false;
    }
    /**
     * References the scroll spy directive, the id of the associated fragment and the parent menu item.
     *
     * Can be used like:
     *  - `ngbScrollSpyItem="fragmentId"`
     *  - `[ngbScrollSpyItem]="scrollSpy" fragment="fragmentId"
     *  - `[ngbScrollSpyItem]="[scrollSpy, 'fragmentId']"` parent="parentId"`
     *  - `[ngbScrollSpyItem]="[scrollSpy, 'fragmentId', 'parentId']"`
     *
     *  As well as together with `[fragment]` and `[parent]` inputs.
     */
    set data(data) {
        if (Array.isArray(data)) {
            this._scrollSpyAPI = data[0];
            this.fragment = data[1];
            this.parent ??= data[2];
        }
        else if (data instanceof NgbScrollSpy) {
            this._scrollSpyAPI = data;
        }
        else if (isString(data)) {
            this.fragment = data;
        }
    }
    ngOnInit() {
        // if it is not a part of a bigger menu, it should handle activation itself
        if (!this._scrollSpyMenu) {
            this._scrollSpyAPI.active$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe((active) => {
                if (active === this.fragment) {
                    this._activate();
                }
                else {
                    this._deactivate();
                }
                this._changeDetector.markForCheck();
            });
        }
    }
    /**
     * @internal
     */
    _activate() {
        this._isActive = true;
        if (this._scrollSpyMenu) {
            this._scrollSpyMenu.getItem(this.parent ?? '')?._activate();
        }
    }
    /**
     * @internal
     */
    _deactivate() {
        this._isActive = false;
        if (this._scrollSpyMenu) {
            this._scrollSpyMenu.getItem(this.parent ?? '')?._deactivate();
        }
    }
    /**
     * Returns `true`, if the associated fragment is active.
     */
    isActive() {
        return this._isActive;
    }
    /**
     * Scrolls to the associated fragment.
     */
    scrollTo(options) {
        this._scrollSpyAPI.scrollTo(this.fragment, options);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbScrollSpyItem, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.0.6", type: NgbScrollSpyItem, isStandalone: true, selector: "[ngbScrollSpyItem]", inputs: { data: ["ngbScrollSpyItem", "data"], fragment: "fragment", parent: "parent" }, host: { listeners: { "click": "scrollTo();" }, properties: { "class.active": "isActive()" } }, exportAs: ["ngbScrollSpyItem"], ngImport: i0 }); }
}
export { NgbScrollSpyItem };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbScrollSpyItem, decorators: [{
            type: Directive,
            args: [{
                    selector: '[ngbScrollSpyItem]',
                    standalone: true,
                    exportAs: 'ngbScrollSpyItem',
                    host: {
                        '[class.active]': 'isActive()',
                        '(click)': 'scrollTo();',
                    },
                }]
        }], propDecorators: { data: [{
                type: Input,
                args: ['ngbScrollSpyItem']
            }], fragment: [{
                type: Input
            }], parent: [{
                type: Input
            }] } });
/**
 * An optional scroll spy menu directive to build hierarchical menus
 * and simplify the [`NgbScrollSpyItem`](#/components/scrollspy/api#NgbScrollSpyItem) configuration.
 *
 * @since 15.1.0
 */
class NgbScrollSpyMenu {
    constructor() {
        this._scrollSpyRef = inject(NgbScrollSpyService);
        this._destroyRef = inject(DestroyRef);
        this._map = new Map();
        this._lastActiveItem = null;
    }
    set scrollSpy(scrollSpy) {
        this._scrollSpyRef = scrollSpy;
    }
    get active() {
        return this._scrollSpyRef.active;
    }
    get active$() {
        return this._scrollSpyRef.active$;
    }
    scrollTo(fragment, options) {
        this._scrollSpyRef.scrollTo(fragment, options);
    }
    getItem(id) {
        return this._map.get(id);
    }
    ngAfterViewInit() {
        this._items.changes.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(() => this._rebuildMap());
        this._rebuildMap();
        this._scrollSpyRef.active$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe((activeId) => {
            this._lastActiveItem?._deactivate();
            const item = this._map.get(activeId);
            if (item) {
                item._activate();
                this._lastActiveItem = item;
            }
        });
    }
    _rebuildMap() {
        this._map.clear();
        for (let item of this._items) {
            this._map.set(item.fragment, item);
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbScrollSpyMenu, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.0.6", type: NgbScrollSpyMenu, isStandalone: true, selector: "[ngbScrollSpyMenu]", inputs: { scrollSpy: ["ngbScrollSpyMenu", "scrollSpy"] }, queries: [{ propertyName: "_items", predicate: NgbScrollSpyItem, descendants: true }], ngImport: i0 }); }
}
export { NgbScrollSpyMenu };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbScrollSpyMenu, decorators: [{
            type: Directive,
            args: [{
                    selector: '[ngbScrollSpyMenu]',
                    standalone: true,
                }]
        }], propDecorators: { _items: [{
                type: ContentChildren,
                args: [NgbScrollSpyItem, { descendants: true }]
            }], scrollSpy: [{
                type: Input,
                args: ['ngbScrollSpyMenu']
            }] } });
/**
 * A directive to put on a scrollable container.
 *
 * It will instantiate a [`NgbScrollSpyService`](#/components/scrollspy/api#NgbScrollSpyService).
 *
 * @since 15.1.0
 */
class NgbScrollSpy {
    constructor() {
        this._initialFragment = null;
        this._service = inject(NgbScrollSpyService);
        this._nativeElement = inject(ElementRef).nativeElement;
        /**
         * An event raised when the active section changes.
         *
         * Payload is the id of the new active section, empty string if none.
         */
        this.activeChange = this._service.active$;
    }
    set active(fragment) {
        this._initialFragment = fragment;
        this.scrollTo(fragment);
    }
    /**
     * Getter/setter for the currently active fragment id.
     */
    get active() {
        return this._service.active;
    }
    /**
     * Returns an observable that emits currently active section id.
     */
    get active$() {
        return this._service.active$;
    }
    ngAfterViewInit() {
        this._service.start({
            processChanges: this.processChanges,
            root: this._nativeElement,
            rootMargin: this.rootMargin,
            threshold: this.threshold,
            ...(this._initialFragment && { initialFragment: this._initialFragment }),
        });
    }
    /**
     * @internal
     */
    _registerFragment(fragment) {
        this._service.observe(fragment.id);
    }
    /**
     * @internal
     */
    _unregisterFragment(fragment) {
        this._service.unobserve(fragment.id);
    }
    /**
     * Scrolls to a fragment that is identified by the `ngbScrollSpyFragment` directive.
     * An id or an element reference can be passed.
     */
    scrollTo(fragment, options) {
        this._service.scrollTo(fragment, {
            ...(this.scrollBehavior && { behavior: this.scrollBehavior }),
            ...options,
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbScrollSpy, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.0.6", type: NgbScrollSpy, isStandalone: true, selector: "[ngbScrollSpy]", inputs: { processChanges: "processChanges", rootMargin: "rootMargin", scrollBehavior: "scrollBehavior", threshold: "threshold", active: "active" }, outputs: { activeChange: "activeChange" }, host: { attributes: { "tabindex": "0" }, styleAttribute: "overflow-y: auto" }, providers: [NgbScrollSpyService], exportAs: ["ngbScrollSpy"], ngImport: i0 }); }
}
export { NgbScrollSpy };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbScrollSpy, decorators: [{
            type: Directive,
            args: [{
                    selector: '[ngbScrollSpy]',
                    standalone: true,
                    exportAs: 'ngbScrollSpy',
                    host: {
                        tabindex: '0',
                        style: 'overflow-y: auto',
                    },
                    providers: [NgbScrollSpyService],
                }]
        }], propDecorators: { processChanges: [{
                type: Input
            }], rootMargin: [{
                type: Input
            }], scrollBehavior: [{
                type: Input
            }], threshold: [{
                type: Input
            }], active: [{
                type: Input
            }], activeChange: [{
                type: Output
            }] } });
/**
 * A directive to put on a fragment observed inside a scrollspy container.
 *
 * @since 15.1.0
 */
class NgbScrollSpyFragment {
    constructor() {
        this._destroyRef = inject(DestroyRef);
        this._scrollSpy = inject(NgbScrollSpy);
    }
    ngAfterViewInit() {
        this._scrollSpy._registerFragment(this);
        this._destroyRef.onDestroy(() => this._scrollSpy._unregisterFragment(this));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbScrollSpyFragment, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.0.6", type: NgbScrollSpyFragment, isStandalone: true, selector: "[ngbScrollSpyFragment]", inputs: { id: ["ngbScrollSpyFragment", "id"] }, host: { properties: { "id": "id" } }, ngImport: i0 }); }
}
export { NgbScrollSpyFragment };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbScrollSpyFragment, decorators: [{
            type: Directive,
            args: [{
                    selector: '[ngbScrollSpyFragment]',
                    standalone: true,
                    host: {
                        '[id]': 'id',
                    },
                }]
        }], propDecorators: { id: [{
                type: Input,
                args: ['ngbScrollSpyFragment']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsc3B5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3Njcm9sbHNweS9zY3JvbGxzcHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUVOLGlCQUFpQixFQUNqQixlQUFlLEVBQ2YsVUFBVSxFQUNWLFNBQVMsRUFDVCxVQUFVLEVBQ1YsTUFBTSxFQUNOLEtBQUssRUFFTCxNQUFNLEdBRU4sTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUE4QixtQkFBbUIsRUFBc0IsTUFBTSxxQkFBcUIsQ0FBQztBQUUxRyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3hDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDOztBQWFoRTs7Ozs7O0dBTUc7QUFDSCxNQVNhLGdCQUFnQjtJQVQ3QjtRQVVTLG9CQUFlLEdBQUcsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDNUMsbUJBQWMsR0FBRyxNQUFNLENBQUMsZ0JBQWdCLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUM5RCxrQkFBYSxHQUFvQixJQUFJLENBQUMsY0FBYyxJQUFJLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQ3BGLGdCQUFXLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRWpDLGNBQVMsR0FBRyxLQUFLLENBQUM7S0FrRjFCO0lBaEZBOzs7Ozs7Ozs7O09BVUc7SUFDSCxJQUErQixJQUFJLENBQUMsSUFBNkQ7UUFDaEcsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3hCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzdCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLElBQUksQ0FBQyxNQUFNLEtBQUssSUFBSSxDQUFD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S0csU0FBUztzQkFBakIsS0FBSztnQkFFTyxNQUFNO3NCQUFsQixLQUFLO2dCQVVJLFlBQVk7c0JBQXJCLE1BQU07O0FBb0RSOzs7O0dBSUc7QUFDSCxNQU9hLG9CQUFvQjtJQVBqQztRQVFTLGdCQUFXLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2pDLGVBQVUsR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7S0FZMUM7SUFKQSxlQUFlO1FBQ2QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4QyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDN0UsQ0FBQzs4R0FiVyxvQkFBb0I7a0dBQXBCLG9CQUFvQjs7U0FBcEIsb0JBQW9COzJGQUFwQixvQkFBb0I7a0JBUGhDLFNBQVM7bUJBQUM7b0JBQ1YsUUFBUSxFQUFFLHdCQUF3QjtvQkFDbEMsVUFBVSxFQUFFLElBQUk7b0JBQ2hCLElBQUksRUFBRTt3QkFDTCxNQUFNLEVBQUUsSUFBSTtxQkFDWjtpQkFDRDs4QkFTK0IsRUFBRTtzQkFBaEMsS0FBSzt1QkFBQyxzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuXHRBZnRlclZpZXdJbml0LFxuXHRDaGFuZ2VEZXRlY3RvclJlZixcblx0Q29udGVudENoaWxkcmVuLFxuXHREZXN0cm95UmVmLFxuXHREaXJlY3RpdmUsXG5cdEVsZW1lbnRSZWYsXG5cdGluamVjdCxcblx0SW5wdXQsXG5cdE9uSW5pdCxcblx0T3V0cHV0LFxuXHRRdWVyeUxpc3QsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmdiU2Nyb2xsU3B5UHJvY2Vzc0NoYW5nZXMsIE5nYlNjcm9sbFNweVNlcnZpY2UsIE5nYlNjcm9sbFRvT3B0aW9ucyB9IGZyb20gJy4vc2Nyb2xsc3B5LnNlcnZpY2UnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgaXNTdHJpbmcgfSBmcm9tICcuLi91dGlsL3V0aWwnO1xuaW1wb3J0IHsgdGFrZVVudGlsRGVzdHJveWVkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZS9yeGpzLWludGVyb3AnO1xuXG4vKipcbiAqIENvbW1vbiBpbnRlcmZhY2UgZm9yIHRoZSBzY3JvbGwgc3B5IEFQSS5cbiAqXG4gKiBAaW50ZXJuYWxcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBOZ2JTY3JvbGxTcHlSZWYge1xuXHRnZXQgYWN0aXZlKCk6IHN0cmluZztcblx0Z2V0IGFjdGl2ZSQoKTogT2JzZXJ2YWJsZTxzdHJpbmc+O1xuXHRzY3JvbGxUbyhmcmFnbWVudDogc3RyaW5nIHwgSFRNTEVsZW1lbnQsIG9wdGlvbnM/OiBOZ2JTY3JvbGxUb09wdGlvbnMpOiB2b2lkO1xufVxuXG4vKipcbiAqIEEgaGVscGVyIGRpcmVjdGl2ZSB0byB0aGF0IGxpbmtzIG1lbnUgaXRlbXMgYW5kIGZyYWdtZW50cyB0b2dldGhlci5cbiAqXG4gKiBJdCB3aWxsIGF1dG9tYXRpY2FsbHkgYWRkIHRoZSBgLmFjdGl2ZWAgY2xhc3MgdG8gdGhlIG1lbnUgaXRlbSB3aGVuIHRoZSBhc3NvY2lhdGVkIGZyYWdtZW50IGJlY29tZXMgYWN0aXZlLlxuICpcbiAqIEBzaW5jZSAxNS4xLjBcbiAqL1xuQERpcmVjdGl2ZSh7XG5cdHNlbGVjdG9yOiAnW25nYlNjcm9sbFNweUl0ZW1dJyxcblx0c3RhbmRhbG9uZTogdHJ1ZSxcblx0ZXhwb3J0QXM6ICduZ2JTY3JvbGxTcHlJdGVtJyxcblx0aG9zdDoge1xuXHRcdCdbY2xhc3MuYWN0aXZlXSc6ICdpc0FjdGl2ZSgpJyxcblx0XHQnKGNsaWNrKSc6ICdzY3JvbGxUbygpOycsXG5cdH0sXG59KVxuZXhwb3J0IGNsYXNzIE5nYlNjcm9sbFNweUl0ZW0gaW1wbGVtZW50cyBPbkluaXQge1xuXHRwcml2YXRlIF9jaGFuZ2VEZXRlY3RvciA9IGluamVjdChDaGFuZ2VEZXRlY3RvclJlZik7XG5cdHByaXZhdGUgX3Njcm9sbFNweU1lbnUgPSBpbmplY3QoTmdiU2Nyb2xsU3B5TWVudSwgeyBvcHRpb25hbDogdHJ1ZSB9KTtcblx0cHJpdmF0ZSBfc2Nyb2xsU3B5QVBJOiBOZ2JTY3JvbGxTcHlSZWYgPSB0aGlzLl9zY3JvbGxTcHlNZW51ID8/IGluamVjdChOZ2JTY3JvbGxTcHlTZXJ2aWNlKTtcblx0cHJpdmF0ZSBfZGVzdHJveVJlZiA9IGluamVjdChEZXN0cm95UmVmKTtcblxuXHRwcml2YXRlIF9pc0FjdGl2ZSA9IGZhbHNlO1xuXG5cdC8qKlxuXHQgKiBSZWZlcmVuY2VzIHRoZSBzY3JvbGwgc3B5IGRpcmVjdGl2ZSwgdGhlIGlkIG9mIHRoZSBhc3NvY2lhdGVkIGZyYWdtZW50IGFuZCB0aGUgcGFyZW50IG1lbnUgaXRlbS5cblx0ICpcblx0ICogQ2FuIGJlIHVzZWQgbGlrZTpcblx0ICogIC0gYG5nYlNjcm9sbFNweUl0ZW09XCJmcmFnbWVudElkXCJgXG5cdCAqICAtIGBbbmdiU2Nyb2xsU3B5SXRlbV09XCJzY3JvbGxTcHlcIiBmcmFnbWVudD1cImZyYWdtZW50SWRcIlxuXHQgKiAgLSBgW25nYlNjcm9sbFNweUl0ZW1dPVwiW3Njcm9sbFNweSwgJ2ZyYWdtZW50SWQnXVwiYCBwYXJlbnQ9XCJwYXJlbnRJZFwiYFxuXHQgKiAgLSBgW25nYlNjcm9sbFNweUl0ZW1dPVwiW3Njcm9sbFNweSwgJ2ZyYWdtZW50SWQnLCAncGFyZW50SWQnXVwiYFxuXHQgKlxuXHQgKiAgQXMgd2VsbCBhcyB0b2dldGhlciB3aXRoIGBbZnJhZ21lbnRdYCBhbmQgYFtwYXJlbnRdYCBpbnB1dHMuXG5cdCAqL1xuXHRASW5wdXQoJ25nYlNjcm9sbFNweUl0ZW0nKSBzZXQgZGF0YShkYXRhOiBOZ2JTY3JvbGxTcHkgfCBzdHJpbmcgfCBbTmdiU2Nyb2xsU3B5LCBzdHJpbmcsIHN0cmluZz9dKSB7XG5cdFx0aWYgKEFycmF5LmlzQXJyYXkoZGF0YSkpIHtcblx0XHRcdHRoaXMuX3Njcm9sbFNweUFQSSA9IGRhdGFbMF07XG5cdFx0XHR0aGlzLmZyYWdtZW50ID0gZGF0YVsxXTtcblx0XHRcdHRoaXMucGFyZW50ID8/PSBkYXRhWzJdO1xuXHRcdH0gZWxzZSBpZiAoZGF0YSBpbnN0YW5jZW9mIE5nYlNjcm9sbFNweSkge1xuXHRcdFx0dGhpcy5fc2Nyb2xsU3B5QVBJID0gZGF0YTtcblx0XHR9IGVsc2UgaWYgKGlzU3RyaW5nKGRhdGEpKSB7XG5cdFx0XHR0aGlzLmZyYWdtZW50ID0gZGF0YTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogVGhlIGlkIG9mIHRoZSBhc3NvY2lhdGVkIGZyYWdtZW50LlxuXHQgKi9cblx0QElucHV0KCkgZnJhZ21lbnQ6IHN0cmluZztcblxuXHQvKipcblx0ICogVGhlIGlkIG9mIHRoZSBwYXJlbnQgc2Nyb2xsIHNweSBtZW51IGl0ZW0uXG5cdCAqL1xuXHRASW5wdXQoKSBwYXJlbnQ6IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuXHRuZ09uSW5pdCgpOiB2b2lkIHtcblx0XHQvLyBpZiBpdCBpcyBub3QgYSBwYXJ0IG9mIGEgYmlnZ2VyIG1lbnUsIGl0IHNob3VsZCBoYW5kbGUgYWN0aXZhdGlvbiBpdHNlbGZcblx0XHRpZiAoIXRoaXMuX3Njcm9sbFNweU1lbnUpIHtcblx0XHRcdHRoaXMuX3Njcm9sbFNweUFQSS5hY3RpdmUkLnBpcGUodGFrZVVudGlsRGVzdHJveWVkKHRoaXMuX2Rlc3Ryb3lSZWYpKS5zdWJzY3JpYmUoKGFjdGl2ZTogc3RyaW5nKSA9PiB7XG5cdFx0XHRcdGlmIChhY3RpdmUgPT09IHRoaXMuZnJhZ21lbnQpIHtcblx0XHRcdFx0XHR0aGlzLl9hY3RpdmF0ZSgpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRoaXMuX2RlYWN0aXZhdGUoKTtcblx0XHRcdFx0fVxuXHRcdFx0XHR0aGlzLl9jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTtcblx0XHRcdH0pO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdF9hY3RpdmF0ZSgpOiB2b2lkIHtcblx0XHR0aGlzLl9pc0FjdGl2ZSA9IHRydWU7XG5cdFx0aWYgKHRoaXMuX3Njcm9sbFNweU1lbnUpIHtcblx0XHRcdHRoaXMuX3Njcm9sbFNweU1lbnUuZ2V0SXRlbSh0aGlzLnBhcmVudCA/PyAnJyk/Ll9hY3RpdmF0ZSgpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdF9kZWFjdGl2YXRlKCk6IHZvaWQge1xuXHRcdHRoaXMuX2lzQWN0aXZlID0gZmFsc2U7XG5cdFx0aWYgKHRoaXMuX3Njcm9sbFNweU1lbnUpIHtcblx0XHRcdHRoaXMuX3Njcm9sbFNweU1lbnUuZ2V0SXRlbSh0aGlzLnBhcmVudCA/PyAnJyk/Ll9kZWFjdGl2YXRlKCk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgYHRydWVgLCBpZiB0aGUgYXNzb2NpYXRlZCBmcmFnbWVudCBpcyBhY3RpdmUuXG5cdCAqL1xuXHRpc0FjdGl2ZSgpOiBib29sZWFuIHtcblx0XHRyZXR1cm4gdGhpcy5faXNBY3RpdmU7XG5cdH1cblxuXHQvKipcblx0ICogU2Nyb2xscyB0byB0aGUgYXNzb2NpYXRlZCBmcmFnbWVudC5cblx0ICovXG5cdHNjcm9sbFRvKG9wdGlvbnM/OiBOZ2JTY3JvbGxUb09wdGlvbnMpOiB2b2lkIHtcblx0XHR0aGlzLl9zY3JvbGxTcHlBUEkuc2Nyb2xsVG8odGhpcy5mcmFnbWVudCwgb3B0aW9ucyk7XG5cdH1cbn1cblxuLyoqXG4gKiBBbiBvcHRpb25hbCBzY3JvbGwgc3B5IG1lbnUgZGlyZWN0aXZlIHRvIGJ1aWxkIGhpZXJhcmNoaWNhbCBtZW51c1xuICogYW5kIHNpbXBsaWZ5IHRoZSBbYE5nYlNjcm9sbFNweUl0ZW1gXSgjL2NvbXBvbmVudHMvc2Nyb2xsc3B5L2FwaSNOZ2JTY3JvbGxTcHlJdGVtKSBjb25maWd1cmF0aW9uLlxuICpcbiAqIEBzaW5jZSAxNS4xLjBcbiAqL1xuQERpcmVjdGl2ZSh7XG5cdHNlbGVjdG9yOiAnW25nYlNjcm9sbFNweU1lbnVdJyxcblx0c3RhbmRhbG9uZTogdHJ1ZSxcbn0pXG5leHBvcnQgY2xhc3MgTmdiU2Nyb2xsU3B5TWVudSBpbXBsZW1lbnRzIE5nYlNjcm9sbFNweVJlZiwgQWZ0ZXJWaWV3SW5pdCB7XG5cdHByaXZhdGUgX3Njcm9sbFNweVJlZjogTmdiU2Nyb2xsU3B5UmVmID0gaW5qZWN0KE5nYlNjcm9sbFNweVNlcnZpY2UpO1xuXHRwcml2YXRlIF9kZXN0cm95UmVmID0gaW5qZWN0KERlc3Ryb3lSZWYpO1xuXHRwcml2YXRlIF9tYXAgPSBuZXcgTWFwPHN0cmluZywgTmdiU2Nyb2xsU3B5SXRlbT4oKTtcblx0cHJpdmF0ZSBfbGFzdEFjdGl2ZUl0ZW06IE5nYlNjcm9sbFNweUl0ZW0gfCBudWxsID0gbnVsbDtcblxuXHRAQ29udGVudENoaWxkcmVuKE5nYlNjcm9sbFNweUl0ZW0sIHsgZGVzY2VuZGFudHM6IHRydWUgfSkgcHJpdmF0ZSBfaXRlbXM6IFF1ZXJ5TGlzdDxOZ2JTY3JvbGxTcHlJdGVtPjtcblxuXHRASW5wdXQoJ25nYlNjcm9sbFNweU1lbnUnKSBzZXQgc2Nyb2xsU3B5KHNjcm9sbFNweTogTmdiU2Nyb2xsU3B5KSB7XG5cdFx0dGhpcy5fc2Nyb2xsU3B5UmVmID0gc2Nyb2xsU3B5O1xuXHR9XG5cblx0Z2V0IGFjdGl2ZSgpOiBzdHJpbmcge1xuXHRcdHJldHVybiB0aGlzLl9zY3JvbGxTcHlSZWYuYWN0aXZlO1xuXHR9XG5cdGdldCBhY3RpdmUkKCk6IE9ic2VydmFibGU8c3RyaW5nPiB7XG5cdFx0cmV0dXJuIHRoaXMuX3Njcm9sbFNweVJlZi5hY3RpdmUkO1xuXHR9XG5cdHNjcm9sbFRvKGZyYWdtZW50OiBzdHJpbmcsIG9wdGlvbnM/OiBOZ2JTY3JvbGxUb09wdGlvbnMpOiB2b2lkIHtcblx0XHR0aGlzLl9zY3JvbGxTcHlSZWYuc2Nyb2xsVG8oZnJhZ21lbnQsIG9wdGlvbnMpO1xuXHR9XG5cblx0Z2V0SXRlbShpZDogc3RyaW5nKTogTmdiU2Nyb2xsU3B5SXRlbSB8IHVuZGVmaW5lZCB7XG5cdFx0cmV0dXJuIHRoaXMuX21hcC5nZXQoaWQpO1xuXHR9XG5cblx0bmdBZnRlclZpZXdJbml0KCkge1xuXHRcdHRoaXMuX2l0ZW1zLmNoYW5nZXMucGlwZSh0YWtlVW50aWxEZXN0cm95ZWQodGhpcy5fZGVzdHJveVJlZikpLnN1YnNjcmliZSgoKSA9PiB0aGlzLl9yZWJ1aWxkTWFwKCkpO1xuXHRcdHRoaXMuX3JlYnVpbGRNYXAoKTtcblxuXHRcdHRoaXMuX3Njcm9sbFNweVJlZi5hY3RpdmUkLnBpcGUodGFrZVVudGlsRGVzdHJveWVkKHRoaXMuX2Rlc3Ryb3lSZWYpKS5zdWJzY3JpYmUoKGFjdGl2ZUlkKSA9PiB7XG5cdFx0XHR0aGlzLl9sYXN0QWN0aXZlSXRlbT8uX2RlYWN0aXZhdGUoKTtcblx0XHRcdGNvbnN0IGl0ZW0gPSB0aGlzLl9tYXAuZ2V0KGFjdGl2ZUlkKTtcblx0XHRcdGlmIChpdGVtKSB7XG5cdFx0XHRcdGl0ZW0uX2FjdGl2YXRlKCk7XG5cdFx0XHRcdHRoaXMuX2xhc3RBY3RpdmVJdGVtID0gaXRlbTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdHByaXZhdGUgX3JlYnVpbGRNYXAoKSB7XG5cdFx0dGhpcy5fbWFwLmNsZWFyKCk7XG5cdFx0Zm9yIChsZXQgaXRlbSBvZiB0aGlzLl9pdGVtcykge1xuXHRcdFx0dGhpcy5fbWFwLnNldChpdGVtLmZyYWdtZW50LCBpdGVtKTtcblx0XHR9XG5cdH1cbn1cblxuLyoqXG4gKiBBIGRpcmVjdGl2ZSB0byBwdXQgb24gYSBzY3JvbGxhYmxlIGNvbnRhaW5lci5cbiAqXG4gKiBJdCB3aWxsIGluc3RhbnRpYXRlIGEgW2BOZ2JTY3JvbGxTcHlTZXJ2aWNlYF0oIy9jb21wb25lbnRzL3Njcm9sbHNweS9hcGkjTmdiU2Nyb2xsU3B5U2VydmljZSkuXG4gKlxuICogQHNpbmNlIDE1LjEuMFxuICovXG5ARGlyZWN0aXZlKHtcblx0c2VsZWN0b3I6ICdbbmdiU2Nyb2xsU3B5XScsXG5cdHN0YW5kYWxvbmU6IHRydWUsXG5cdGV4cG9ydEFzOiAnbmdiU2Nyb2xsU3B5Jyxcblx0aG9zdDoge1xuXHRcdHRhYmluZGV4OiAnMCcsXG5cdFx0c3R5bGU6ICdvdmVyZmxvdy15OiBhdXRvJyxcblx0fSxcblx0cHJvdmlkZXJzOiBbTmdiU2Nyb2xsU3B5U2VydmljZV0sXG59KVxuZXhwb3J0IGNsYXNzIE5nYlNjcm9sbFNweSBpbXBsZW1lbnRzIE5nYlNjcm9sbFNweVJlZiwgQWZ0ZXJWaWV3SW5pdCB7XG5cdHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9zY3JvbGxCZWhhdmlvcjogc3RyaW5nO1xuXG5cdHByaXZhdGUgX2luaXRpYWxGcmFnbWVudDogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG5cdHByaXZhdGUgX3NlcnZpY2UgPSBpbmplY3QoTmdiU2Nyb2xsU3B5U2VydmljZSk7XG5cdHByaXZhdGUgX25hdGl2ZUVsZW1lbnQgPSBpbmplY3Q8RWxlbWVudFJlZjxIVE1MRWxlbWVudD4+KEVsZW1lbnRSZWYpLm5hdGl2ZUVsZW1lbnQ7XG5cblx0LyoqXG5cdCAqIEEgZnVuY3Rpb24gdGhhdCBpcyBjYWxsZWQgd2hlbiB0aGUgYEludGVyc2VjdGlvbk9ic2VydmVyYCBkZXRlY3RzIGEgY2hhbmdlLlxuXHQgKlxuXHQgKiBTZWUgW2BOZ2JTY3JvbGxTcHlPcHRpb25zYF0oIy9jb21wb25lbnRzL3Njcm9sbHNweS9hcGkjTmdiU2Nyb2xsU3B5T3B0aW9ucykgZm9yIG1vcmUgZGV0YWlscy5cblx0ICovXG5cdEBJbnB1dCgpIHByb2Nlc3NDaGFuZ2VzOiBOZ2JTY3JvbGxTcHlQcm9jZXNzQ2hhbmdlcztcblxuXHQvKipcblx0ICogQW4gYEludGVyc2VjdGlvbk9ic2VydmVyYCByb290IG1hcmdpbi5cblx0ICovXG5cdEBJbnB1dCgpIHJvb3RNYXJnaW46IHN0cmluZztcblxuXHQvKipcblx0ICogVGhlIHNjcm9sbCBiZWhhdmlvciBmb3IgdGhlIGAuc2Nyb2xsVG8oKWAgbWV0aG9kLlxuXHQgKi9cblx0QElucHV0KCkgc2Nyb2xsQmVoYXZpb3I6ICdhdXRvJyB8ICdzbW9vdGgnO1xuXG5cdC8qKlxuXHQgKiBBbiBgSW50ZXJzZWN0aW9uT2JzZXJ2ZXJgIHRocmVzaG9sZC5cblx0ICovXG5cdEBJbnB1dCgpIHRocmVzaG9sZDogbnVtYmVyIHwgbnVtYmVyW107XG5cblx0QElucHV0KCkgc2V0IGFjdGl2ZShmcmFnbWVudDogc3RyaW5nKSB7XG5cdFx0dGhpcy5faW5pdGlhbEZyYWdtZW50ID0gZnJhZ21lbnQ7XG5cdFx0dGhpcy5zY3JvbGxUbyhmcmFnbWVudCk7XG5cdH1cblxuXHQvKipcblx0ICogQW4gZXZlbnQgcmFpc2VkIHdoZW4gdGhlIGFjdGl2ZSBzZWN0aW9uIGNoYW5nZXMuXG5cdCAqXG5cdCAqIFBheWxvYWQgaXMgdGhlIGlkIG9mIHRoZSBuZXcgYWN0aXZlIHNlY3Rpb24sIGVtcHR5IHN0cmluZyBpZiBub25lLlxuXHQgKi9cblx0QE91dHB1dCgpIGFjdGl2ZUNoYW5nZSA9IHRoaXMuX3NlcnZpY2UuYWN0aXZlJDtcblxuXHQvKipcblx0ICogR2V0dGVyL3NldHRlciBmb3IgdGhlIGN1cnJlbnRseSBhY3RpdmUgZnJhZ21lbnQgaWQuXG5cdCAqL1xuXHRnZXQgYWN0aXZlKCk6IHN0cmluZyB7XG5cdFx0cmV0dXJuIHRoaXMuX3NlcnZpY2UuYWN0aXZlO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgYW4gb2JzZXJ2YWJsZSB0aGF0IGVtaXRzIGN1cnJlbnRseSBhY3RpdmUgc2VjdGlvbiBpZC5cblx0ICovXG5cdGdldCBhY3RpdmUkKCk6IE9ic2VydmFibGU8c3RyaW5nPiB7XG5cdFx0cmV0dXJuIHRoaXMuX3NlcnZpY2UuYWN0aXZlJDtcblx0fVxuXG5cdG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcblx0XHR0aGlzLl9zZXJ2aWNlLnN0YXJ0KHtcblx0XHRcdHByb2Nlc3NDaGFuZ2VzOiB0aGlzLnByb2Nlc3NDaGFuZ2VzLFxuXHRcdFx0cm9vdDogdGhpcy5fbmF0aXZlRWxlbWVudCxcblx0XHRcdHJvb3RNYXJnaW46IHRoaXMucm9vdE1hcmdpbixcblx0XHRcdHRocmVzaG9sZDogdGhpcy50aHJlc2hvbGQsXG5cdFx0XHQuLi4odGhpcy5faW5pdGlhbEZyYWdtZW50ICYmIHsgaW5pdGlhbEZyYWdtZW50OiB0aGlzLl9pbml0aWFsRnJhZ21lbnQgfSksXG5cdFx0fSk7XG5cdH1cblxuXHQvKipcblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRfcmVnaXN0ZXJGcmFnbWVudChmcmFnbWVudDogTmdiU2Nyb2xsU3B5RnJhZ21lbnQpOiB2b2lkIHtcblx0XHR0aGlzLl9zZXJ2aWNlLm9ic2VydmUoZnJhZ21lbnQuaWQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0X3VucmVnaXN0ZXJGcmFnbWVudChmcmFnbWVudDogTmdiU2Nyb2xsU3B5RnJhZ21lbnQpOiB2b2lkIHtcblx0XHR0aGlzLl9zZXJ2aWNlLnVub2JzZXJ2ZShmcmFnbWVudC5pZCk7XG5cdH1cblxuXHQvKipcblx0ICogU2Nyb2xscyB0byBhIGZyYWdtZW50IHRoYXQgaXMgaWRlbnRpZmllZCBieSB0aGUgYG5nYlNjcm9sbFNweUZyYWdtZW50YCBkaXJlY3RpdmUuXG5cdCAqIEFuIGlkIG9yIGFuIGVsZW1lbnQgcmVmZXJlbmNlIGNhbiBiZSBwYXNzZWQuXG5cdCAqL1xuXHRzY3JvbGxUbyhmcmFnbWVudDogc3RyaW5nIHwgSFRNTEVsZW1lbnQsIG9wdGlvbnM/OiBOZ2JTY3JvbGxUb09wdGlvbnMpOiB2b2lkIHtcblx0XHR0aGlzLl9zZXJ2aWNlLnNjcm9sbFRvKGZyYWdtZW50LCB7XG5cdFx0XHQuLi4odGhpcy5zY3JvbGxCZWhhdmlvciAmJiB7IGJlaGF2aW9yOiB0aGlzLnNjcm9sbEJlaGF2aW9yIH0pLFxuXHRcdFx0Li4ub3B0aW9ucyxcblx0XHR9KTtcblx0fVxufVxuXG4vKipcbiAqIEEgZGlyZWN0aXZlIHRvIHB1dCBvbiBhIGZyYWdtZW50IG9ic2VydmVkIGluc2lkZSBhIHNjcm9sbHNweSBjb250YWluZXIuXG4gKlxuICogQHNpbmNlIDE1LjEuMFxuICovXG5ARGlyZWN0aXZlKHtcblx0c2VsZWN0b3I6ICdbbmdiU2Nyb2xsU3B5RnJhZ21lbnRdJyxcblx0c3RhbmRhbG9uZTogdHJ1ZSxcblx0aG9zdDoge1xuXHRcdCdbaWRdJzogJ2lkJyxcblx0fSxcbn0pXG5leHBvcnQgY2xhc3MgTmdiU2Nyb2xsU3B5RnJhZ21lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcblx0cHJpdmF0ZSBfZGVzdHJveVJlZiA9IGluamVjdChEZXN0cm95UmVmKTtcblx0cHJpdmF0ZSBfc2Nyb2xsU3B5ID0gaW5qZWN0KE5nYlNjcm9sbFNweSk7XG5cblx0LyoqXG5cdCAqIFRoZSB1bmlxdWUgaWQgb2YgdGhlIGZyYWdtZW50LlxuXHQgKiBJdCBtdXN0IGJlIGEgc3RyaW5nIHVuaXF1ZSB0byB0aGUgZG9jdW1lbnQsIGFzIGl0IHdpbGwgYmUgc2V0IGFzIHRoZSBpZCBvZiB0aGUgZWxlbWVudC5cblx0ICovXG5cdEBJbnB1dCgnbmdiU2Nyb2xsU3B5RnJhZ21lbnQnKSBpZDogc3RyaW5nO1xuXG5cdG5nQWZ0ZXJWaWV3SW5pdCgpIHtcblx0XHR0aGlzLl9zY3JvbGxTcHkuX3JlZ2lzdGVyRnJhZ21lbnQodGhpcyk7XG5cdFx0dGhpcy5fZGVzdHJveVJlZi5vbkRlc3Ryb3koKCkgPT4gdGhpcy5fc2Nyb2xsU3B5Ll91bnJlZ2lzdGVyRnJhZ21lbnQodGhpcykpO1xuXHR9XG59XG4iXX0=