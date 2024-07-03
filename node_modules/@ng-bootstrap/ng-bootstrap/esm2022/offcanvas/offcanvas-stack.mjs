import { DOCUMENT } from '@angular/common';
import { createComponent, EventEmitter, Inject, Injectable, Injector, TemplateRef, } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ngbFocusTrap } from '../util/focus-trap';
import { ContentRef } from '../util/popup';
import { isDefined, isString } from '../util/util';
import { NgbActiveOffcanvas, NgbOffcanvasRef } from './offcanvas-ref';
import { NgbOffcanvasBackdrop } from './offcanvas-backdrop';
import { NgbOffcanvasPanel } from './offcanvas-panel';
import * as i0 from "@angular/core";
import * as i1 from "../util/scrollbar";
class NgbOffcanvasStack {
    constructor(_applicationRef, _injector, _document, _scrollBar, _ngZone) {
        this._applicationRef = _applicationRef;
        this._injector = _injector;
        this._document = _document;
        this._scrollBar = _scrollBar;
        this._ngZone = _ngZone;
        this._activePanelCmptHasChanged = new Subject();
        this._scrollBarRestoreFn = null;
        this._backdropAttributes = ['animation', 'backdropClass'];
        this._panelAttributes = ['animation', 'ariaDescribedBy', 'ariaLabelledBy', 'keyboard', 'panelClass', 'position'];
        this._activeInstance = new EventEmitter();
        // Trap focus on active PanelCmpt
        this._activePanelCmptHasChanged.subscribe(() => {
            if (this._panelCmpt) {
                ngbFocusTrap(this._ngZone, this._panelCmpt.location.nativeElement, this._activePanelCmptHasChanged);
            }
        });
    }
    _restoreScrollBar() {
        const scrollBarRestoreFn = this._scrollBarRestoreFn;
        if (scrollBarRestoreFn) {
            this._scrollBarRestoreFn = null;
            scrollBarRestoreFn();
        }
    }
    _hideScrollBar() {
        if (!this._scrollBarRestoreFn) {
            this._scrollBarRestoreFn = this._scrollBar.hide();
        }
    }
    open(contentInjector, content, options) {
        const containerEl = options.container instanceof HTMLElement
            ? options.container
            : isDefined(options.container)
                ? this._document.querySelector(options.container)
                : this._document.body;
        if (!containerEl) {
            throw new Error(`The specified offcanvas container "${options.container || 'body'}" was not found in the DOM.`);
        }
        if (!options.scroll) {
            this._hideScrollBar();
        }
        const activeOffcanvas = new NgbActiveOffcanvas();
        const contentRef = this._getContentRef(options.injector || contentInjector, content, activeOffcanvas);
        let backdropCmptRef = options.backdrop !== false ? this._attachBackdrop(containerEl) : undefined;
        let panelCmptRef = this._attachWindowComponent(containerEl, contentRef.nodes);
        let ngbOffcanvasRef = new NgbOffcanvasRef(panelCmptRef, contentRef, backdropCmptRef, options.beforeDismiss);
        this._registerOffcanvasRef(ngbOffcanvasRef);
        this._registerPanelCmpt(panelCmptRef);
        ngbOffcanvasRef.hidden.pipe(finalize(() => this._restoreScrollBar())).subscribe();
        activeOffcanvas.close = (result) => {
            ngbOffcanvasRef.close(result);
        };
        activeOffcanvas.dismiss = (reason) => {
            ngbOffcanvasRef.dismiss(reason);
        };
        this._applyPanelOptions(panelCmptRef.instance, options);
        if (backdropCmptRef && backdropCmptRef.instance) {
            this._applyBackdropOptions(backdropCmptRef.instance, options);
            backdropCmptRef.changeDetectorRef.detectChanges();
        }
        panelCmptRef.changeDetectorRef.detectChanges();
        return ngbOffcanvasRef;
    }
    get activeInstance() {
        return this._activeInstance;
    }
    dismiss(reason) {
        this._offcanvasRef?.dismiss(reason);
    }
    hasOpenOffcanvas() {
        return !!this._offcanvasRef;
    }
    _attachBackdrop(containerEl) {
        let backdropCmptRef = createComponent(NgbOffcanvasBackdrop, {
            environmentInjector: this._applicationRef.injector,
            elementInjector: this._injector,
        });
        this._applicationRef.attachView(backdropCmptRef.hostView);
        containerEl.appendChild(backdropCmptRef.location.nativeElement);
        return backdropCmptRef;
    }
    _attachWindowComponent(containerEl, projectableNodes) {
        let panelCmptRef = createComponent(NgbOffcanvasPanel, {
            environmentInjector: this._applicationRef.injector,
            elementInjector: this._injector,
            projectableNodes,
        });
        this._applicationRef.attachView(panelCmptRef.hostView);
        containerEl.appendChild(panelCmptRef.location.nativeElement);
        return panelCmptRef;
    }
    _applyPanelOptions(windowInstance, options) {
        this._panelAttributes.forEach((optionName) => {
            if (isDefined(options[optionName])) {
                windowInstance[optionName] = options[optionName];
            }
        });
    }
    _applyBackdropOptions(backdropInstance, options) {
        this._backdropAttributes.forEach((optionName) => {
            if (isDefined(options[optionName])) {
                backdropInstance[optionName] = options[optionName];
            }
        });
        backdropInstance.static = options.backdrop === 'static';
    }
    _getContentRef(contentInjector, content, activeOffcanvas) {
        if (!content) {
            return new ContentRef([]);
        }
        else if (content instanceof TemplateRef) {
            return this._createFromTemplateRef(content, activeOffcanvas);
        }
        else if (isString(content)) {
            return this._createFromString(content);
        }
        else {
            return this._createFromComponent(contentInjector, content, activeOffcanvas);
        }
    }
    _createFromTemplateRef(templateRef, activeOffcanvas) {
        const context = {
            $implicit: activeOffcanvas,
            close(result) {
                activeOffcanvas.close(result);
            },
            dismiss(reason) {
                activeOffcanvas.dismiss(reason);
            },
        };
        const viewRef = templateRef.createEmbeddedView(context);
        this._applicationRef.attachView(viewRef);
        return new ContentRef([viewRef.rootNodes], viewRef);
    }
    _createFromString(content) {
        const component = this._document.createTextNode(`${content}`);
        return new ContentRef([[component]]);
    }
    _createFromComponent(contentInjector, componentType, context) {
        const elementInjector = Injector.create({
            providers: [{ provide: NgbActiveOffcanvas, useValue: context }],
            parent: contentInjector,
        });
        const componentRef = createComponent(componentType, {
            environmentInjector: this._applicationRef.injector,
            elementInjector,
        });
        const componentNativeEl = componentRef.location.nativeElement;
        this._applicationRef.attachView(componentRef.hostView);
        return new ContentRef([[componentNativeEl]], componentRef.hostView, componentRef);
    }
    _registerOffcanvasRef(ngbOffcanvasRef) {
        const unregisterOffcanvasRef = () => {
            this._offcanvasRef = undefined;
            this._activeInstance.emit(this._offcanvasRef);
        };
        this._offcanvasRef = ngbOffcanvasRef;
        this._activeInstance.emit(this._offcanvasRef);
        ngbOffcanvasRef.result.then(unregisterOffcanvasRef, unregisterOffcanvasRef);
    }
    _registerPanelCmpt(ngbPanelCmpt) {
        this._panelCmpt = ngbPanelCmpt;
        this._activePanelCmptHasChanged.next();
        ngbPanelCmpt.onDestroy(() => {
            this._panelCmpt = undefined;
            this._activePanelCmptHasChanged.next();
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbOffcanvasStack, deps: [{ token: i0.ApplicationRef }, { token: i0.Injector }, { token: DOCUMENT }, { token: i1.ScrollBar }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbOffcanvasStack, providedIn: 'root' }); }
}
export { NgbOffcanvasStack };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbOffcanvasStack, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i0.ApplicationRef }, { type: i0.Injector }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i1.ScrollBar }, { type: i0.NgZone }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2ZmY2FudmFzLXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL29mZmNhbnZhcy9vZmZjYW52YXMtc3RhY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFHTixlQUFlLEVBQ2YsWUFBWSxFQUNaLE1BQU0sRUFDTixVQUFVLEVBQ1YsUUFBUSxFQUVSLFdBQVcsR0FFWCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDMUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUUvQixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDbEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUNuRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsZUFBZSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFdEUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDNUQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7OztBQUV0RCxNQUNhLGlCQUFpQjtJQVM3QixZQUNTLGVBQStCLEVBQy9CLFNBQW1CLEVBQ0QsU0FBYyxFQUNoQyxVQUFxQixFQUNyQixPQUFlO1FBSmYsb0JBQWUsR0FBZixlQUFlLENBQWdCO1FBQy9CLGNBQVMsR0FBVCxTQUFTLENBQVU7UUFDRCxjQUFTLEdBQVQsU0FBUyxDQUFLO1FBQ2hDLGVBQVUsR0FBVixVQUFVLENBQVc7UUFDckIsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQWJoQiwrQkFBMEIsR0FBRyxJQUFJLE9BQU8sRUFBUSxDQUFDO1FBQ2pELHdCQUFtQixH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SUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUM5QyxlQUFlLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxzQkFBc0IsQ0FBQyxDQUFDO0lBQzdFLENBQUM7SUFFTyxrQkFBa0IsQ0FBQyxZQUE2QztRQUN2RSxJQUFJLENBQUMsVUFBVSxHQUFHLFlBQVksQ0FBQztRQUMvQixJQUFJLENBQUMsMEJBQTBCLENBQUMsSUFBSSxFQUFFLENBQUM7UUFFdkMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDM0IsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7WUFDNUIsSUFBSSxDQUFDLDBCQUEwQixDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3hDLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQzs4R0FoTlcsaUJBQWlCLHdFQVlwQixRQUFRO2tIQVpMLGlCQUFpQixjQURKLE1BQU07O1NBQ25CLGlCQUFpQjsyRkFBakIsaUJBQWlCO2tCQUQ3QixVQUFVO21CQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRTs7MEJBYS9CLE1BQU07MkJBQUMsUUFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG5cdEFwcGxpY2F0aW9uUmVmLFxuXHRDb21wb25lbnRSZWYsXG5cdGNyZWF0ZUNvbXBvbmVudCxcblx0RXZlbnRFbWl0dGVyLFxuXHRJbmplY3QsXG5cdEluamVjdGFibGUsXG5cdEluamVjdG9yLFxuXHROZ1pvbmUsXG5cdFRlbXBsYXRlUmVmLFxuXHRUeXBlLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGZpbmFsaXplIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBuZ2JGb2N1c1RyYXAgfSBmcm9tICcuLi91dGlsL2ZvY3VzLXRyYXAnO1xuaW1wb3J0IHsgQ29udGVudFJlZiB9IGZyb20gJy4uL3V0aWwvcG9wdXAnO1xuaW1wb3J0IHsgU2Nyb2xsQmFyIH0gZnJvbSAnLi4vdXRpbC9zY3JvbGxiYXInO1xuaW1wb3J0IHsgaXNEZWZpbmVkLCBpc1N0cmluZyB9IGZyb20gJy4uL3V0aWwvdXRpbCc7XG5pbXBvcnQgeyBOZ2JBY3RpdmVPZmZjYW52YXMsIE5nYk9mZmNhbnZhc1JlZiB9IGZyb20gJy4vb2ZmY2FudmFzLXJlZic7XG5pbXBvcnQgeyBOZ2JPZmZjYW52YXNPcHRpb25zIH0gZnJvbSAnLi9vZmZjYW52YXMtY29uZmlnJztcbmltcG9ydCB7IE5nYk9mZmNhbnZhc0JhY2tkcm9wIH0gZnJvbSAnLi9vZmZjYW52YXMtYmFja2Ryb3AnO1xuaW1wb3J0IHsgTmdiT2ZmY2FudmFzUGFuZWwgfSBmcm9tICcuL29mZmNhbnZhcy1wYW5lbCc7XG5cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgTmdiT2ZmY2FudmFzU3RhY2sge1xuXHRwcml2YXRlIF9hY3RpdmVQYW5lbENtcHRIYXNDaGFuZ2VkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblx0cHJpdmF0ZSBfc2Nyb2xsQmFyUmVzdG9yZUZuOiBudWxsIHwgKCgpID0+IHZvaWQpID0gbnVsbDtcblx0cHJpdmF0ZSBfYmFja2Ryb3BBdHRyaWJ1dGVzID0gWydhbmltYXRpb24nLCAnYmFja2Ryb3BDbGFzcyddO1xuXHRwcml2YXRlIF9vZmZjYW52YXNSZWY/OiBOZ2JPZmZjYW52YXNSZWY7XG5cdHByaXZhdGUgX3BhbmVsQXR0cmlidXRlcyA9IFsnYW5pbWF0aW9uJywgJ2FyaWFEZXNjcmliZWRCeScsICdhcmlhTGFiZWxsZWRCeScsICdrZXlib2FyZCcsICdwYW5lbENsYXNzJywgJ3Bvc2l0aW9uJ107XG5cdHByaXZhdGUgX3BhbmVsQ21wdD86IENvbXBvbmVudFJlZjxOZ2JPZmZjYW52YXNQYW5lbD47XG5cdHByaXZhdGUgX2FjdGl2ZUluc3RhbmNlOiBFdmVudEVtaXR0ZXI8TmdiT2ZmY2FudmFzUmVmIHwgdW5kZWZpbmVkPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuXHRjb25zdHJ1Y3Rvcihcblx0XHRwcml2YXRlIF9hcHBsaWNhdGlvblJlZjogQXBwbGljYXRpb25SZWYsXG5cdFx0cHJpdmF0ZSBfaW5qZWN0b3I6IEluamVjdG9yLFxuXHRcdEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgX2RvY3VtZW50OiBhbnksXG5cdFx0cHJpdmF0ZSBfc2Nyb2xsQmFyOiBTY3JvbGxCYXIsXG5cdFx0cHJpdmF0ZSBfbmdab25lOiBOZ1pvbmUsXG5cdCkge1xuXHRcdC8vIFRyYXAgZm9jdXMgb24gYWN0aXZlIFBhbmVsQ21wdFxuXHRcdHRoaXMuX2FjdGl2ZVBhbmVsQ21wdEhhc0NoYW5nZWQuc3Vic2NyaWJlKCgpID0+IHtcblx0XHRcdGlmICh0aGlzLl9wYW5lbENtcHQpIHtcblx0XHRcdFx0bmdiRm9jdXNUcmFwKHRoaXMuX25nWm9uZSwgdGhpcy5fcGFuZWxDbXB0LmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQsIHRoaXMuX2FjdGl2ZVBhbmVsQ21wdEhhc0NoYW5nZWQpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0cHJpdmF0ZSBfcmVzdG9yZVNjcm9sbEJhcigpIHtcblx0XHRjb25zdCBzY3JvbGxCYXJSZXN0b3JlRm4gPSB0aGlzLl9zY3JvbGxCYXJSZXN0b3JlRm47XG5cdFx0aWYgKHNjcm9sbEJhclJlc3RvcmVGbikge1xuXHRcdFx0dGhpcy5fc2Nyb2xsQmFyUmVzdG9yZUZuID0gbnVsbDtcblx0XHRcdHNjcm9sbEJhclJlc3RvcmVGbigpO1xuXHRcdH1cblx0fVxuXG5cdHByaXZhdGUgX2hpZGVTY3JvbGxCYXIoKSB7XG5cdFx0aWYgKCF0aGlzLl9zY3JvbGxCYXJSZXN0b3JlRm4pIHtcblx0XHRcdHRoaXMuX3Njcm9sbEJhclJlc3RvcmVGbiA9IHRoaXMuX3Njcm9sbEJhci5oaWRlKCk7XG5cdFx0fVxuXHR9XG5cblx0b3Blbihjb250ZW50SW5qZWN0b3I6IEluamVjdG9yLCBjb250ZW50OiBhbnksIG9wdGlvbnM6IE5nYk9mZmNhbnZhc09wdGlvbnMpOiBOZ2JPZmZjYW52YXNSZWYge1xuXHRcdGNvbnN0IGNvbnRhaW5lckVsID1cblx0XHRcdG9wdGlvbnMuY29udGFpbmVyIGluc3RhbmNlb2YgSFRNTEVsZW1lbnRcblx0XHRcdFx0PyBvcHRpb25zLmNvbnRhaW5lclxuXHRcdFx0XHQ6IGlzRGVmaW5lZChvcHRpb25zLmNvbnRhaW5lcilcblx0XHRcdFx0PyB0aGlzLl9kb2N1bWVudC5xdWVyeVNlbGVjdG9yKG9wdGlvbnMuY29udGFpbmVyKVxuXHRcdFx0XHQ6IHRoaXMuX2RvY3VtZW50LmJvZHk7XG5cdFx0aWYgKCFjb250YWluZXJFbCkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKGBUaGUgc3BlY2lmaWVkIG9mZmNhbnZhcyBjb250YWluZXIgXCIke29wdGlvbnMuY29udGFpbmVyIHx8ICdib2R5J31cIiB3YXMgbm90IGZvdW5kIGluIHRoZSBET00uYCk7XG5cdFx0fVxuXG5cdFx0aWYgKCFvcHRpb25zLnNjcm9sbCkge1xuXHRcdFx0dGhpcy5faGlkZVNjcm9sbEJhcigpO1xuXHRcdH1cblxuXHRcdGNvbnN0IGFjdGl2ZU9mZmNhbnZhcyA9IG5ldyBOZ2JBY3RpdmVPZmZjYW52YXMoKTtcblx0XHRjb25zdCBjb250ZW50UmVmID0gdGhpcy5fZ2V0Q29udGVudFJlZihvcHRpb25zLmluamVjdG9yIHx8IGNvbnRlbnRJbmplY3RvciwgY29udGVudCwgYWN0aXZlT2ZmY2FudmFzKTtcblxuXHRcdGxldCBiYWNrZHJvcENtcHRSZWY6IENvbXBvbmVudFJlZjxOZ2JPZmZjYW52YXNCYWNrZHJvcD4gfCB1bmRlZmluZWQgPVxuXHRcdFx0b3B0aW9ucy5iYWNrZHJvcCAhPT0gZmFsc2UgPyB0aGlzLl9hdHRhY2hCYWNrZHJvcChjb250YWluZXJFbCkgOiB1bmRlZmluZWQ7XG5cdFx0bGV0IHBhbmVsQ21wdFJlZjogQ29tcG9uZW50UmVmPE5nYk9mZmNhbnZhc1BhbmVsPiA9IHRoaXMuX2F0dGFjaFdpbmRvd0NvbXBvbmVudChjb250YWluZXJFbCwgY29udGVudFJlZi5ub2Rlcyk7XG5cdFx0bGV0IG5nYk9mZmNhbnZhc1JlZjogTmdiT2ZmY2FudmFzUmVmID0gbmV3IE5nYk9mZmNhbnZhc1JlZihcblx0XHRcdHBhbmVsQ21wdFJlZixcblx0XHRcdGNvbnRlbnRSZWYsXG5cdFx0XHRiYWNrZHJvcENtcHRSZWYsXG5cdFx0XHRvcHRpb25zLmJlZm9yZURpc21pc3MsXG5cdFx0KTtcblxuXHRcdHRoaXMuX3JlZ2lzdGVyT2ZmY2FudmFzUmVmKG5nYk9mZmNhbnZhc1JlZik7XG5cdFx0dGhpcy5fcmVnaXN0ZXJQYW5lbENtcHQocGFuZWxDbXB0UmVmKTtcblx0XHRuZ2JPZmZjYW52YXNSZWYuaGlkZGVuLnBpcGUoZmluYWxpemUoKCkgPT4gdGhpcy5fcmVzdG9yZVNjcm9sbEJhcigpKSkuc3Vic2NyaWJlKCk7XG5cdFx0YWN0aXZlT2ZmY2FudmFzLmNsb3NlID0gKHJlc3VsdDogYW55KSA9PiB7XG5cdFx0XHRuZ2JPZmZjYW52YXNSZWYuY2xvc2UocmVzdWx0KTtcblx0XHR9O1xuXHRcdGFjdGl2ZU9mZmNhbnZhcy5kaXNtaXNzID0gKHJlYXNvbjogYW55KSA9PiB7XG5cdFx0XHRuZ2JPZmZjYW52YXNSZWYuZGlzbWlzcyhyZWFzb24pO1xuXHRcdH07XG5cblx0XHR0aGlzLl9hcHBseVBhbmVsT3B0aW9ucyhwYW5lbENtcHRSZWYuaW5zdGFuY2UsIG9wdGlvbnMpO1xuXG5cdFx0aWYgKGJhY2tkcm9wQ21wdFJlZiAmJiBiYWNrZHJvcENtcHRSZWYuaW5zdGFuY2UpIHtcblx0XHRcdHRoaXMuX2FwcGx5QmFja2Ryb3BPcHRpb25zKGJhY2tkcm9wQ21wdFJlZi5pbnN0YW5jZSwgb3B0aW9ucyk7XG5cdFx0XHRiYWNrZHJvcENtcHRSZWYuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuXHRcdH1cblx0XHRwYW5lbENtcHRSZWYuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuXHRcdHJldHVybiBuZ2JPZmZjYW52YXNSZWY7XG5cdH1cblxuXHRnZXQgYWN0aXZlSW5zdGFuY2UoKSB7XG5cdFx0cmV0dXJuIHRoaXMuX2FjdGl2ZUluc3RhbmNlO1xuXHR9XG5cblx0ZGlzbWlzcyhyZWFzb24/OiBhbnkpIHtcblx0XHR0aGlzLl9vZmZjYW52YXNSZWY/LmRpc21pc3MocmVhc29uKTtcblx0fVxuXG5cdGhhc09wZW5PZmZjYW52YXMoKTogYm9vbGVhbiB7XG5cdFx0cmV0dXJuICEhdGhpcy5fb2ZmY2FudmFzUmVmO1xuXHR9XG5cblx0cHJpdmF0ZSBfYXR0YWNoQmFja2Ryb3AoY29udGFpbmVyRWw6IEVsZW1lbnQpOiBDb21wb25lbnRSZWY8TmdiT2ZmY2FudmFzQmFja2Ryb3A+IHtcblx0XHRsZXQgYmFja2Ryb3BDbXB0UmVmID0gY3JlYXRlQ29tcG9uZW50KE5nYk9mZmNhbnZhc0JhY2tkcm9wLCB7XG5cdFx0XHRlbnZpcm9ubWVudEluamVjdG9yOiB0aGlzLl9hcHBsaWNhdGlvblJlZi5pbmplY3Rvcixcblx0XHRcdGVsZW1lbnRJbmplY3RvcjogdGhpcy5faW5qZWN0b3IsXG5cdFx0fSk7XG5cdFx0dGhpcy5fYXBwbGljYXRpb25SZWYuYXR0YWNoVmlldyhiYWNrZHJvcENtcHRSZWYuaG9zdFZpZXcpO1xuXHRcdGNvbnRhaW5lckVsLmFwcGVuZENoaWxkKGJhY2tkcm9wQ21wdFJlZi5sb2NhdGlvbi5uYXRpdmVFbGVtZW50KTtcblx0XHRyZXR1cm4gYmFja2Ryb3BDbXB0UmVmO1xuXHR9XG5cblx0cHJpdmF0ZSBfYXR0YWNoV2luZG93Q29tcG9uZW50KGNvbnRhaW5lckVsOiBFbGVtZW50LCBwcm9qZWN0YWJsZU5vZGVzOiBOb2RlW11bXSk6IENvbXBvbmVudFJlZjxOZ2JPZmZjYW52YXNQYW5lbD4ge1xuXHRcdGxldCBwYW5lbENtcHRSZWYgPSBjcmVhdGVDb21wb25lbnQoTmdiT2ZmY2FudmFzUGFuZWwsIHtcblx0XHRcdGVudmlyb25tZW50SW5qZWN0b3I6IHRoaXMuX2FwcGxpY2F0aW9uUmVmLmluamVjdG9yLFxuXHRcdFx0ZWxlbWVudEluamVjdG9yOiB0aGlzLl9pbmplY3Rvcixcblx0XHRcdHByb2plY3RhYmxlTm9kZXMsXG5cdFx0fSk7XG5cdFx0dGhpcy5fYXBwbGljYXRpb25SZWYuYXR0YWNoVmlldyhwYW5lbENtcHRSZWYuaG9zdFZpZXcpO1xuXHRcdGNvbnRhaW5lckVsLmFwcGVuZENoaWxkKHBhbmVsQ21wdFJlZi5sb2NhdGlvbi5uYXRpdmVFbGVtZW50KTtcblx0XHRyZXR1cm4gcGFuZWxDbXB0UmVmO1xuXHR9XG5cblx0cHJpdmF0ZSBfYXBwbHlQYW5lbE9wdGlvbnMod2luZG93SW5zdGFuY2U6IE5nYk9mZmNhbnZhc1BhbmVsLCBvcHRpb25zOiBOZ2JPZmZjYW52YXNPcHRpb25zKTogdm9pZCB7XG5cdFx0dGhpcy5fcGFuZWxBdHRyaWJ1dGVzLmZvckVhY2goKG9wdGlvbk5hbWU6IHN0cmluZykgPT4ge1xuXHRcdFx0aWYgKGlzRGVmaW5lZChvcHRpb25zW29wdGlvbk5hbWVdKSkge1xuXHRcdFx0XHR3aW5kb3dJbnN0YW5jZVtvcHRpb25OYW1lXSA9IG9wdGlvbnNbb3B0aW9uTmFtZV07XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHRwcml2YXRlIF9hcHBseUJhY2tkcm9wT3B0aW9ucyhiYWNrZHJvcEluc3RhbmNlOiBOZ2JPZmZjYW52YXNCYWNrZHJvcCwgb3B0aW9uczogTmdiT2ZmY2FudmFzT3B0aW9ucyk6IHZvaWQge1xuXHRcdHRoaXMuX2JhY2tkcm9wQXR0cmlidXRlcy5mb3JFYWNoKChvcHRpb25OYW1lOiBzdHJpbmcpID0+IHtcblx0XHRcdGlmIChpc0RlZmluZWQob3B0aW9uc1tvcHRpb25OYW1lXSkpIHtcblx0XHRcdFx0YmFja2Ryb3BJbnN0YW5jZVtvcHRpb25OYW1lXSA9IG9wdGlvbnNbb3B0aW9uTmFtZV07XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0YmFja2Ryb3BJbnN0YW5jZS5zdGF0aWMgPSBvcHRpb25zLmJhY2tkcm9wID09PSAnc3RhdGljJztcblx0fVxuXG5cdHByaXZhdGUgX2dldENvbnRlbnRSZWYoXG5cdFx0Y29udGVudEluamVjdG9yOiBJbmplY3Rvcixcblx0XHRjb250ZW50OiBUeXBlPGFueT4gfCBUZW1wbGF0ZVJlZjxhbnk+IHwgc3RyaW5nLFxuXHRcdGFjdGl2ZU9mZmNhbnZhczogTmdiQWN0aXZlT2ZmY2FudmFzLFxuXHQpOiBDb250ZW50UmVmIHtcblx0XHRpZiAoIWNvbnRlbnQpIHtcblx0XHRcdHJldHVybiBuZXcgQ29udGVudFJlZihbXSk7XG5cdFx0fSBlbHNlIGlmIChjb250ZW50IGluc3RhbmNlb2YgVGVtcGxhdGVSZWYpIHtcblx0XHRcdHJldHVybiB0aGlzLl9jcmVhdGVGcm9tVGVtcGxhdGVSZWYoY29udGVudCwgYWN0aXZlT2ZmY2FudmFzKTtcblx0XHR9IGVsc2UgaWYgKGlzU3RyaW5nKGNvbnRlbnQpKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5fY3JlYXRlRnJvbVN0cmluZyhjb250ZW50KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIHRoaXMuX2NyZWF0ZUZyb21Db21wb25lbnQoY29udGVudEluamVjdG9yLCBjb250ZW50LCBhY3RpdmVPZmZjYW52YXMpO1xuXHRcdH1cblx0fVxuXG5cdHByaXZhdGUgX2NyZWF0ZUZyb21UZW1wbGF0ZVJlZih0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8YW55PiwgYWN0aXZlT2ZmY2FudmFzOiBOZ2JBY3RpdmVPZmZjYW52YXMpOiBDb250ZW50UmVmIHtcblx0XHRjb25zdCBjb250ZXh0ID0ge1xuXHRcdFx0JGltcGxpY2l0OiBhY3RpdmVPZmZjYW52YXMsXG5cdFx0XHRjbG9zZShyZXN1bHQpIHtcblx0XHRcdFx0YWN0aXZlT2ZmY2FudmFzLmNsb3NlKHJlc3VsdCk7XG5cdFx0XHR9LFxuXHRcdFx0ZGlzbWlzcyhyZWFzb24pIHtcblx0XHRcdFx0YWN0aXZlT2ZmY2FudmFzLmRpc21pc3MocmVhc29uKTtcblx0XHRcdH0sXG5cdFx0fTtcblx0XHRjb25zdCB2aWV3UmVmID0gdGVtcGxhdGVSZWYuY3JlYXRlRW1iZWRkZWRWaWV3KGNvbnRleHQpO1xuXHRcdHRoaXMuX2FwcGxpY2F0aW9uUmVmLmF0dGFjaFZpZXcodmlld1JlZik7XG5cdFx0cmV0dXJuIG5ldyBDb250ZW50UmVmKFt2aWV3UmVmLnJvb3ROb2Rlc10sIHZpZXdSZWYpO1xuXHR9XG5cblx0cHJpdmF0ZSBfY3JlYXRlRnJvbVN0cmluZyhjb250ZW50OiBzdHJpbmcpOiBDb250ZW50UmVmIHtcblx0XHRjb25zdCBjb21wb25lbnQgPSB0aGlzLl9kb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShgJHtjb250ZW50fWApO1xuXHRcdHJldHVybiBuZXcgQ29udGVudFJlZihbW2NvbXBvbmVudF1dKTtcblx0fVxuXG5cdHByaXZhdGUgX2NyZWF0ZUZyb21Db21wb25lbnQoXG5cdFx0Y29udGVudEluamVjdG9yOiBJbmplY3Rvcixcblx0XHRjb21wb25lbnRUeXBlOiBUeXBlPGFueT4sXG5cdFx0Y29udGV4dDogTmdiQWN0aXZlT2ZmY2FudmFzLFxuXHQpOiBDb250ZW50UmVmIHtcblx0XHRjb25zdCBlbGVtZW50SW5qZWN0b3IgPSBJbmplY3Rvci5jcmVhdGUoe1xuXHRcdFx0cHJvdmlkZXJzOiBbeyBwcm92aWRlOiBOZ2JBY3RpdmVPZmZjYW52YXMsIHVzZVZhbHVlOiBjb250ZXh0IH1dLFxuXHRcdFx0cGFyZW50OiBjb250ZW50SW5qZWN0b3IsXG5cdFx0fSk7XG5cdFx0Y29uc3QgY29tcG9uZW50UmVmID0gY3JlYXRlQ29tcG9uZW50KGNvbXBvbmVudFR5cGUsIHtcblx0XHRcdGVudmlyb25tZW50SW5qZWN0b3I6IHRoaXMuX2FwcGxpY2F0aW9uUmVmLmluamVjdG9yLFxuXHRcdFx0ZWxlbWVudEluamVjdG9yLFxuXHRcdH0pO1xuXHRcdGNvbnN0IGNvbXBvbmVudE5hdGl2ZUVsID0gY29tcG9uZW50UmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQ7XG5cdFx0dGhpcy5fYXBwbGljYXRpb25SZWYuYXR0YWNoVmlldyhjb21wb25lbnRSZWYuaG9zdFZpZXcpO1xuXHRcdHJldHVybiBuZXcgQ29udGVudFJlZihbW2NvbXBvbmVudE5hdGl2ZUVsXV0sIGNvbXBvbmVudFJlZi5ob3N0VmlldywgY29tcG9uZW50UmVmKTtcblx0fVxuXG5cdHByaXZhdGUgX3JlZ2lzdGVyT2ZmY2FudmFzUmVmKG5nYk9mZmNhbnZhc1JlZjogTmdiT2ZmY2FudmFzUmVmKSB7XG5cdFx0Y29uc3QgdW5yZWdpc3Rlck9mZmNhbnZhc1JlZiA9ICgpID0+IHtcblx0XHRcdHRoaXMuX29mZmNhbnZhc1JlZiA9IHVuZGVmaW5lZDtcblx0XHRcdHRoaXMuX2FjdGl2ZUluc3RhbmNlLmVtaXQodGhpcy5fb2ZmY2FudmFzUmVmKTtcblx0XHR9O1xuXHRcdHRoaXMuX29mZmNhbnZhc1JlZiA9IG5nYk9mZmNhbnZhc1JlZjtcblx0XHR0aGlzLl9hY3RpdmVJbnN0YW5jZS5lbWl0KHRoaXMuX29mZmNhbnZhc1JlZik7XG5cdFx0bmdiT2ZmY2FudmFzUmVmLnJlc3VsdC50aGVuKHVucmVnaXN0ZXJPZmZjYW52YXNSZWYsIHVucmVnaXN0ZXJPZmZjYW52YXNSZWYpO1xuXHR9XG5cblx0cHJpdmF0ZSBfcmVnaXN0ZXJQYW5lbENtcHQobmdiUGFuZWxDbXB0OiBDb21wb25lbnRSZWY8TmdiT2ZmY2FudmFzUGFuZWw+KSB7XG5cdFx0dGhpcy5fcGFuZWxDbXB0ID0gbmdiUGFuZWxDbXB0O1xuXHRcdHRoaXMuX2FjdGl2ZVBhbmVsQ21wdEhhc0NoYW5nZWQubmV4dCgpO1xuXG5cdFx0bmdiUGFuZWxDbXB0Lm9uRGVzdHJveSgoKSA9PiB7XG5cdFx0XHR0aGlzLl9wYW5lbENtcHQgPSB1bmRlZmluZWQ7XG5cdFx0XHR0aGlzLl9hY3RpdmVQYW5lbENtcHRIYXNDaGFuZ2VkLm5leHQoKTtcblx0XHR9KTtcblx0fVxufVxuIl19