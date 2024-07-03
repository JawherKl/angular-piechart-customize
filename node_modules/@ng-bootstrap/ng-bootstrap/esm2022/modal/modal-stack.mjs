import { DOCUMENT } from '@angular/common';
import { createComponent, EnvironmentInjector, EventEmitter, Inject, Injectable, Injector, TemplateRef, } from '@angular/core';
import { Subject } from 'rxjs';
import { ngbFocusTrap } from '../util/focus-trap';
import { ContentRef } from '../util/popup';
import { isDefined, isString } from '../util/util';
import { NgbModalBackdrop } from './modal-backdrop';
import { NgbActiveModal, NgbModalRef } from './modal-ref';
import { NgbModalWindow } from './modal-window';
import { take } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "../util/scrollbar";
class NgbModalStack {
    constructor(_applicationRef, _injector, _environmentInjector, _document, _scrollBar, _rendererFactory, _ngZone) {
        this._applicationRef = _applicationRef;
        this._injector = _injector;
        this._environmentInjector = _environmentInjector;
        this._document = _document;
        this._scrollBar = _scrollBar;
        this._rendererFactory = _rendererFactory;
        this._ngZone = _ngZone;
        this._activeWindowCmptHasChanged = new Subject();
        this._ariaHiddenValues = new Map();
        this._scrollBarRestoreFn = null;
        this._modalRefs = [];
        this._windowCmpts = [];
        this._activeInstances = new EventEmitter();
        // Trap focus on active WindowCmpt
        this._activeWindowCmptHasChanged.subscribe(() => {
            if (this._windowCmpts.length) {
                const activeWindowCmpt = this._windowCmpts[this._windowCmpts.length - 1];
                ngbFocusTrap(this._ngZone, activeWindowCmpt.location.nativeElement, this._activeWindowCmptHasChanged);
                this._revertAriaHidden();
                this._setAriaHidden(activeWindowCmpt.location.nativeElement);
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
        const renderer = this._rendererFactory.createRenderer(null, null);
        if (!containerEl) {
            throw new Error(`The specified modal container "${options.container || 'body'}" was not found in the DOM.`);
        }
        this._hideScrollBar();
        const activeModal = new NgbActiveModal();
        contentInjector = options.injector || contentInjector;
        const environmentInjector = contentInjector.get(EnvironmentInjector, null) || this._environmentInjector;
        const contentRef = this._getContentRef(contentInjector, environmentInjector, content, activeModal, options);
        let backdropCmptRef = options.backdrop !== false ? this._attachBackdrop(containerEl) : undefined;
        let windowCmptRef = this._attachWindowComponent(containerEl, contentRef.nodes);
        let ngbModalRef = new NgbModalRef(windowCmptRef, contentRef, backdropCmptRef, options.beforeDismiss);
        this._registerModalRef(ngbModalRef);
        this._registerWindowCmpt(windowCmptRef);
        // We have to cleanup DOM after the last modal when BOTH 'hidden' was emitted and 'result' promise was resolved:
        // - with animations OFF, 'hidden' emits synchronously, then 'result' is resolved asynchronously
        // - with animations ON, 'result' is resolved asynchronously, then 'hidden' emits asynchronously
        ngbModalRef.hidden.pipe(take(1)).subscribe(() => Promise.resolve(true).then(() => {
            if (!this._modalRefs.length) {
                renderer.removeClass(this._document.body, 'modal-open');
                this._restoreScrollBar();
                this._revertAriaHidden();
            }
        }));
        activeModal.close = (result) => {
            ngbModalRef.close(result);
        };
        activeModal.dismiss = (reason) => {
            ngbModalRef.dismiss(reason);
        };
        activeModal.update = (options) => {
            ngbModalRef.update(options);
        };
        ngbModalRef.update(options);
        if (this._modalRefs.length === 1) {
            renderer.addClass(this._document.body, 'modal-open');
        }
        if (backdropCmptRef && backdropCmptRef.instance) {
            backdropCmptRef.changeDetectorRef.detectChanges();
        }
        windowCmptRef.changeDetectorRef.detectChanges();
        return ngbModalRef;
    }
    get activeInstances() {
        return this._activeInstances;
    }
    dismissAll(reason) {
        this._modalRefs.forEach((ngbModalRef) => ngbModalRef.dismiss(reason));
    }
    hasOpenModals() {
        return this._modalRefs.length > 0;
    }
    _attachBackdrop(containerEl) {
        let backdropCmptRef = createComponent(NgbModalBackdrop, {
            environmentInjector: this._applicationRef.injector,
            elementInjector: this._injector,
        });
        this._applicationRef.attachView(backdropCmptRef.hostView);
        containerEl.appendChild(backdropCmptRef.location.nativeElement);
        return backdropCmptRef;
    }
    _attachWindowComponent(containerEl, projectableNodes) {
        let windowCmptRef = createComponent(NgbModalWindow, {
            environmentInjector: this._applicationRef.injector,
            elementInjector: this._injector,
            projectableNodes,
        });
        this._applicationRef.attachView(windowCmptRef.hostView);
        containerEl.appendChild(windowCmptRef.location.nativeElement);
        return windowCmptRef;
    }
    _getContentRef(contentInjector, environmentInjector, content, activeModal, options) {
        if (!content) {
            return new ContentRef([]);
        }
        else if (content instanceof TemplateRef) {
            return this._createFromTemplateRef(content, activeModal);
        }
        else if (isString(content)) {
            return this._createFromString(content);
        }
        else {
            return this._createFromComponent(contentInjector, environmentInjector, content, activeModal, options);
        }
    }
    _createFromTemplateRef(templateRef, activeModal) {
        const context = {
            $implicit: activeModal,
            close(result) {
                activeModal.close(result);
            },
            dismiss(reason) {
                activeModal.dismiss(reason);
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
    _createFromComponent(contentInjector, environmentInjector, componentType, context, options) {
        const elementInjector = Injector.create({
            providers: [{ provide: NgbActiveModal, useValue: context }],
            parent: contentInjector,
        });
        const componentRef = createComponent(componentType, {
            environmentInjector,
            elementInjector,
        });
        const componentNativeEl = componentRef.location.nativeElement;
        if (options.scrollable) {
            componentNativeEl.classList.add('component-host-scrollable');
        }
        this._applicationRef.attachView(componentRef.hostView);
        // FIXME: we should here get rid of the component nativeElement
        // and use `[Array.from(componentNativeEl.childNodes)]` instead and remove the above CSS class.
        return new ContentRef([[componentNativeEl]], componentRef.hostView, componentRef);
    }
    _setAriaHidden(element) {
        const parent = element.parentElement;
        if (parent && element !== this._document.body) {
            Array.from(parent.children).forEach((sibling) => {
                if (sibling !== element && sibling.nodeName !== 'SCRIPT') {
                    this._ariaHiddenValues.set(sibling, sibling.getAttribute('aria-hidden'));
                    sibling.setAttribute('aria-hidden', 'true');
                }
            });
            this._setAriaHidden(parent);
        }
    }
    _revertAriaHidden() {
        this._ariaHiddenValues.forEach((value, element) => {
            if (value) {
                element.setAttribute('aria-hidden', value);
            }
            else {
                element.removeAttribute('aria-hidden');
            }
        });
        this._ariaHiddenValues.clear();
    }
    _registerModalRef(ngbModalRef) {
        const unregisterModalRef = () => {
            const index = this._modalRefs.indexOf(ngbModalRef);
            if (index > -1) {
                this._modalRefs.splice(index, 1);
                this._activeInstances.emit(this._modalRefs);
            }
        };
        this._modalRefs.push(ngbModalRef);
        this._activeInstances.emit(this._modalRefs);
        ngbModalRef.result.then(unregisterModalRef, unregisterModalRef);
    }
    _registerWindowCmpt(ngbWindowCmpt) {
        this._windowCmpts.push(ngbWindowCmpt);
        this._activeWindowCmptHasChanged.next();
        ngbWindowCmpt.onDestroy(() => {
            const index = this._windowCmpts.indexOf(ngbWindowCmpt);
            if (index > -1) {
                this._windowCmpts.splice(index, 1);
                this._activeWindowCmptHasChanged.next();
            }
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbModalStack, deps: [{ token: i0.ApplicationRef }, { token: i0.Injector }, { token: i0.EnvironmentInjector }, { token: DOCUMENT }, { token: i1.ScrollBar }, { token: i0.RendererFactory2 }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbModalStack, providedIn: 'root' }); }
}
export { NgbModalStack };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbModalStack, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i0.ApplicationRef }, { type: i0.Injector }, { type: i0.EnvironmentInjector }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i1.ScrollBar }, { type: i0.RendererFactory2 }, { type: i0.NgZone }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbW9kYWwvbW9kYWwtc3RhY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFHTixlQUFlLEVBQ2YsbUJBQW1CLEVBQ25CLFlBQVksRUFDWixNQUFNLEVBQ04sVUFBVSxFQUNWLFFBQVEsRUFHUixXQUFXLEdBRVgsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUUvQixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDbEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUNuRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUVwRCxPQUFPLEVBQUUsY0FBYyxFQUFFLFdBQVcsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUMxRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDaEQsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7QUFFdEMsTUFDYSxhQUFhO0lBUXpCLFlBQ1MsZUFBK0IsRUFDL0IsU0FBbUIsRUFDbkIsb0JBQXlDLEVBQ3ZCLFNBQWMsRUFDaEMsVUFBcUIsRUFDckIsZ0JBQWtDLEVBQ2xDLE9BQWU7UUFOZixvQkFBZSxHQUFmLGVBQWUsQ0FBZ0I7UUFDL0IsY0FBUyxHQUFULFNBQVMsQ0FBVTtRQUNuQix5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXFCO1FBQ3ZCLGNBQVMsR0FBVCxTQUFTLENBQUs7UUFDaEMsZUFBVSxHQUFWLFVBQVUsQ0FBVztRQUNyQixxQkFBZ0IsR0FBaEIsZ0JBQWdC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QUFDLEVBQUU7Z0JBQ2YsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUNuQyxJQUFJLENBQUMsMkJBQTJCLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDeEM7UUFDRixDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7OEdBNVBXLGFBQWEsMkdBWWhCLFFBQVE7a0hBWkwsYUFBYSxjQURBLE1BQU07O1NBQ25CLGFBQWE7MkZBQWIsYUFBYTtrQkFEekIsVUFBVTttQkFBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUU7OzBCQWEvQixNQUFNOzJCQUFDLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuXHRBcHBsaWNhdGlvblJlZixcblx0Q29tcG9uZW50UmVmLFxuXHRjcmVhdGVDb21wb25lbnQsXG5cdEVudmlyb25tZW50SW5qZWN0b3IsXG5cdEV2ZW50RW1pdHRlcixcblx0SW5qZWN0LFxuXHRJbmplY3RhYmxlLFxuXHRJbmplY3Rvcixcblx0Tmdab25lLFxuXHRSZW5kZXJlckZhY3RvcnkyLFxuXHRUZW1wbGF0ZVJlZixcblx0VHlwZSxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IG5nYkZvY3VzVHJhcCB9IGZyb20gJy4uL3V0aWwvZm9jdXMtdHJhcCc7XG5pbXBvcnQgeyBDb250ZW50UmVmIH0gZnJvbSAnLi4vdXRpbC9wb3B1cCc7XG5pbXBvcnQgeyBTY3JvbGxCYXIgfSBmcm9tICcuLi91dGlsL3Njcm9sbGJhcic7XG5pbXBvcnQgeyBpc0RlZmluZWQsIGlzU3RyaW5nIH0gZnJvbSAnLi4vdXRpbC91dGlsJztcbmltcG9ydCB7IE5nYk1vZGFsQmFja2Ryb3AgfSBmcm9tICcuL21vZGFsLWJhY2tkcm9wJztcbmltcG9ydCB7IE5nYk1vZGFsT3B0aW9ucywgTmdiTW9kYWxVcGRhdGFibGVPcHRpb25zIH0gZnJvbSAnLi9tb2RhbC1jb25maWcnO1xuaW1wb3J0IHsgTmdiQWN0aXZlTW9kYWwsIE5nYk1vZGFsUmVmIH0gZnJvbSAnLi9tb2RhbC1yZWYnO1xuaW1wb3J0IHsgTmdiTW9kYWxXaW5kb3cgfSBmcm9tICcuL21vZGFsLXdpbmRvdyc7XG5pbXBvcnQgeyB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIE5nYk1vZGFsU3RhY2sge1xuXHRwcml2YXRlIF9hY3RpdmVXaW5kb3dDbXB0SGFzQ2hhbmdlZCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cdHByaXZhdGUgX2FyaWFIaWRkZW5WYWx1ZXM6IE1hcDxFbGVtZW50LCBzdHJpbmcgfCBudWxsPiA9IG5ldyBNYXAoKTtcblx0cHJpdmF0ZSBfc2Nyb2xsQmFyUmVzdG9yZUZuOiBudWxsIHwgKCgpID0+IHZvaWQpID0gbnVsbDtcblx0cHJpdmF0ZSBfbW9kYWxSZWZzOiBOZ2JNb2RhbFJlZltdID0gW107XG5cdHByaXZhdGUgX3dpbmRvd0NtcHRzOiBDb21wb25lbnRSZWY8TmdiTW9kYWxXaW5kb3c+W10gPSBbXTtcblx0cHJpdmF0ZSBfYWN0aXZlSW5zdGFuY2VzOiBFdmVudEVtaXR0ZXI8TmdiTW9kYWxSZWZbXT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cblx0Y29uc3RydWN0b3IoXG5cdFx0cHJpdmF0ZSBfYXBwbGljYXRpb25SZWY6IEFwcGxpY2F0aW9uUmVmLFxuXHRcdHByaXZhdGUgX2luamVjdG9yOiBJbmplY3Rvcixcblx0XHRwcml2YXRlIF9lbnZpcm9ubWVudEluamVjdG9yOiBFbnZpcm9ubWVudEluamVjdG9yLFxuXHRcdEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgX2RvY3VtZW50OiBhbnksXG5cdFx0cHJpdmF0ZSBfc2Nyb2xsQmFyOiBTY3JvbGxCYXIsXG5cdFx0cHJpdmF0ZSBfcmVuZGVyZXJGYWN0b3J5OiBSZW5kZXJlckZhY3RvcnkyLFxuXHRcdHByaXZhdGUgX25nWm9uZTogTmdab25lLFxuXHQpIHtcblx0XHQvLyBUcmFwIGZvY3VzIG9uIGFjdGl2ZSBXaW5kb3dDbXB0XG5cdFx0dGhpcy5fYWN0aXZlV2luZG93Q21wdEhhc0NoYW5nZWQuc3Vic2NyaWJlKCgpID0+IHtcblx0XHRcdGlmICh0aGlzLl93aW5kb3dDbXB0cy5sZW5ndGgpIHtcblx0XHRcdFx0Y29uc3QgYWN0aXZlV2luZG93Q21wdCA9IHRoaXMuX3dpbmRvd0NtcHRzW3RoaXMuX3dpbmRvd0NtcHRzLmxlbmd0aCAtIDFdO1xuXHRcdFx0XHRuZ2JGb2N1c1RyYXAodGhpcy5fbmdab25lLCBhY3RpdmVXaW5kb3dDbXB0LmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQsIHRoaXMuX2FjdGl2ZVdpbmRvd0NtcHRIYXNDaGFuZ2VkKTtcblx0XHRcdFx0dGhpcy5fcmV2ZXJ0QXJpYUhpZGRlbigpO1xuXHRcdFx0XHR0aGlzLl9zZXRBcmlhSGlkZGVuKGFjdGl2ZVdpbmRvd0NtcHQubG9jYXRpb24ubmF0aXZlRWxlbWVudCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHRwcml2YXRlIF9yZXN0b3JlU2Nyb2xsQmFyKCkge1xuXHRcdGNvbnN0IHNjcm9sbEJhclJlc3RvcmVGbiA9IHRoaXMuX3Njcm9sbEJhclJlc3RvcmVGbjtcblx0XHRpZiAoc2Nyb2xsQmFyUmVzdG9yZUZuKSB7XG5cdFx0XHR0aGlzLl9zY3JvbGxCYXJSZXN0b3JlRm4gPSBudWxsO1xuXHRcdFx0c2Nyb2xsQmFyUmVzdG9yZUZuKCk7XG5cdFx0fVxuXHR9XG5cblx0cHJpdmF0ZSBfaGlkZVNjcm9sbEJhcigpIHtcblx0XHRpZiAoIXRoaXMuX3Njcm9sbEJhclJlc3RvcmVGbikge1xuXHRcdFx0dGhpcy5fc2Nyb2xsQmFyUmVzdG9yZUZuID0gdGhpcy5fc2Nyb2xsQmFyLmhpZGUoKTtcblx0XHR9XG5cdH1cblxuXHRvcGVuKGNvbnRlbnRJbmplY3RvcjogSW5qZWN0b3IsIGNvbnRlbnQ6IGFueSwgb3B0aW9uczogTmdiTW9kYWxPcHRpb25zKTogTmdiTW9kYWxSZWYge1xuXHRcdGNvbnN0IGNvbnRhaW5lckVsID1cblx0XHRcdG9wdGlvbnMuY29udGFpbmVyIGluc3RhbmNlb2YgSFRNTEVsZW1lbnRcblx0XHRcdFx0PyBvcHRpb25zLmNvbnRhaW5lclxuXHRcdFx0XHQ6IGlzRGVmaW5lZChvcHRpb25zLmNvbnRhaW5lcilcblx0XHRcdFx0PyB0aGlzLl9kb2N1bWVudC5xdWVyeVNlbGVjdG9yKG9wdGlvbnMuY29udGFpbmVyKVxuXHRcdFx0XHQ6IHRoaXMuX2RvY3VtZW50LmJvZHk7XG5cdFx0Y29uc3QgcmVuZGVyZXIgPSB0aGlzLl9yZW5kZXJlckZhY3RvcnkuY3JlYXRlUmVuZGVyZXIobnVsbCwgbnVsbCk7XG5cblx0XHRpZiAoIWNvbnRhaW5lckVsKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoYFRoZSBzcGVjaWZpZWQgbW9kYWwgY29udGFpbmVyIFwiJHtvcHRpb25zLmNvbnRhaW5lciB8fCAnYm9keSd9XCIgd2FzIG5vdCBmb3VuZCBpbiB0aGUgRE9NLmApO1xuXHRcdH1cblxuXHRcdHRoaXMuX2hpZGVTY3JvbGxCYXIoKTtcblxuXHRcdGNvbnN0IGFjdGl2ZU1vZGFsID0gbmV3IE5nYkFjdGl2ZU1vZGFsKCk7XG5cblx0XHRjb250ZW50SW5qZWN0b3IgPSBvcHRpb25zLmluamVjdG9yIHx8IGNvbnRlbnRJbmplY3Rvcjtcblx0XHRjb25zdCBlbnZpcm9ubWVudEluamVjdG9yID0gY29udGVudEluamVjdG9yLmdldChFbnZpcm9ubWVudEluamVjdG9yLCBudWxsKSB8fCB0aGlzLl9lbnZpcm9ubWVudEluamVjdG9yO1xuXHRcdGNvbnN0IGNvbnRlbnRSZWYgPSB0aGlzLl9nZXRDb250ZW50UmVmKGNvbnRlbnRJbmplY3RvciwgZW52aXJvbm1lbnRJbmplY3RvciwgY29udGVudCwgYWN0aXZlTW9kYWwsIG9wdGlvbnMpO1xuXG5cdFx0bGV0IGJhY2tkcm9wQ21wdFJlZjogQ29tcG9uZW50UmVmPE5nYk1vZGFsQmFja2Ryb3A+IHwgdW5kZWZpbmVkID1cblx0XHRcdG9wdGlvbnMuYmFja2Ryb3AgIT09IGZhbHNlID8gdGhpcy5fYXR0YWNoQmFja2Ryb3AoY29udGFpbmVyRWwpIDogdW5kZWZpbmVkO1xuXHRcdGxldCB3aW5kb3dDbXB0UmVmOiBDb21wb25lbnRSZWY8TmdiTW9kYWxXaW5kb3c+ID0gdGhpcy5fYXR0YWNoV2luZG93Q29tcG9uZW50KGNvbnRhaW5lckVsLCBjb250ZW50UmVmLm5vZGVzKTtcblx0XHRsZXQgbmdiTW9kYWxSZWY6IE5nYk1vZGFsUmVmID0gbmV3IE5nYk1vZGFsUmVmKHdpbmRvd0NtcHRSZWYsIGNvbnRlbnRSZWYsIGJhY2tkcm9wQ21wdFJlZiwgb3B0aW9ucy5iZWZvcmVEaXNtaXNzKTtcblxuXHRcdHRoaXMuX3JlZ2lzdGVyTW9kYWxSZWYobmdiTW9kYWxSZWYpO1xuXHRcdHRoaXMuX3JlZ2lzdGVyV2luZG93Q21wdCh3aW5kb3dDbXB0UmVmKTtcblxuXHRcdC8vIFdlIGhhdmUgdG8gY2xlYW51cCBET00gYWZ0ZXIgdGhlIGxhc3QgbW9kYWwgd2hlbiBCT1RIICdoaWRkZW4nIHdhcyBlbWl0dGVkIGFuZCAncmVzdWx0JyBwcm9taXNlIHdhcyByZXNvbHZlZDpcblx0XHQvLyAtIHdpdGggYW5pbWF0aW9ucyBPRkYsICdoaWRkZW4nIGVtaXRzIHN5bmNocm9ub3VzbHksIHRoZW4gJ3Jlc3VsdCcgaXMgcmVzb2x2ZWQgYXN5bmNocm9ub3VzbHlcblx0XHQvLyAtIHdpdGggYW5pbWF0aW9ucyBPTiwgJ3Jlc3VsdCcgaXMgcmVzb2x2ZWQgYXN5bmNocm9ub3VzbHksIHRoZW4gJ2hpZGRlbicgZW1pdHMgYXN5bmNocm9ub3VzbHlcblx0XHRuZ2JNb2RhbFJlZi5oaWRkZW4ucGlwZSh0YWtlKDEpKS5zdWJzY3JpYmUoKCkgPT5cblx0XHRcdFByb21pc2UucmVzb2x2ZSh0cnVlKS50aGVuKCgpID0+IHtcblx0XHRcdFx0aWYgKCF0aGlzLl9tb2RhbFJlZnMubGVuZ3RoKSB7XG5cdFx0XHRcdFx0cmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5fZG9jdW1lbnQuYm9keSwgJ21vZGFsLW9wZW4nKTtcblx0XHRcdFx0XHR0aGlzLl9yZXN0b3JlU2Nyb2xsQmFyKCk7XG5cdFx0XHRcdFx0dGhpcy5fcmV2ZXJ0QXJpYUhpZGRlbigpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KSxcblx0XHQpO1xuXG5cdFx0YWN0aXZlTW9kYWwuY2xvc2UgPSAocmVzdWx0OiBhbnkpID0+IHtcblx0XHRcdG5nYk1vZGFsUmVmLmNsb3NlKHJlc3VsdCk7XG5cdFx0fTtcblx0XHRhY3RpdmVNb2RhbC5kaXNtaXNzID0gKHJlYXNvbjogYW55KSA9PiB7XG5cdFx0XHRuZ2JNb2RhbFJlZi5kaXNtaXNzKHJlYXNvbik7XG5cdFx0fTtcblxuXHRcdGFjdGl2ZU1vZGFsLnVwZGF0ZSA9IChvcHRpb25zOiBOZ2JNb2RhbFVwZGF0YWJsZU9wdGlvbnMpID0+IHtcblx0XHRcdG5nYk1vZGFsUmVmLnVwZGF0ZShvcHRpb25zKTtcblx0XHR9O1xuXG5cdFx0bmdiTW9kYWxSZWYudXBkYXRlKG9wdGlvbnMpO1xuXHRcdGlmICh0aGlzLl9tb2RhbFJlZnMubGVuZ3RoID09PSAxKSB7XG5cdFx0XHRyZW5kZXJlci5hZGRDbGFzcyh0aGlzLl9kb2N1bWVudC5ib2R5LCAnbW9kYWwtb3BlbicpO1xuXHRcdH1cblxuXHRcdGlmIChiYWNrZHJvcENtcHRSZWYgJiYgYmFja2Ryb3BDbXB0UmVmLmluc3RhbmNlKSB7XG5cdFx0XHRiYWNrZHJvcENtcHRSZWYuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuXHRcdH1cblx0XHR3aW5kb3dDbXB0UmVmLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcblx0XHRyZXR1cm4gbmdiTW9kYWxSZWY7XG5cdH1cblxuXHRnZXQgYWN0aXZlSW5zdGFuY2VzKCkge1xuXHRcdHJldHVybiB0aGlzLl9hY3RpdmVJbnN0YW5jZXM7XG5cdH1cblxuXHRkaXNtaXNzQWxsKHJlYXNvbj86IGFueSkge1xuXHRcdHRoaXMuX21vZGFsUmVmcy5mb3JFYWNoKChuZ2JNb2RhbFJlZikgPT4gbmdiTW9kYWxSZWYuZGlzbWlzcyhyZWFzb24pKTtcblx0fVxuXG5cdGhhc09wZW5Nb2RhbHMoKTogYm9vbGVhbiB7XG5cdFx0cmV0dXJuIHRoaXMuX21vZGFsUmVmcy5sZW5ndGggPiAwO1xuXHR9XG5cblx0cHJpdmF0ZSBfYXR0YWNoQmFja2Ryb3AoY29udGFpbmVyRWw6IEVsZW1lbnQpOiBDb21wb25lbnRSZWY8TmdiTW9kYWxCYWNrZHJvcD4ge1xuXHRcdGxldCBiYWNrZHJvcENtcHRSZWYgPSBjcmVhdGVDb21wb25lbnQoTmdiTW9kYWxCYWNrZHJvcCwge1xuXHRcdFx0ZW52aXJvbm1lbnRJbmplY3RvcjogdGhpcy5fYXBwbGljYXRpb25SZWYuaW5qZWN0b3IsXG5cdFx0XHRlbGVtZW50SW5qZWN0b3I6IHRoaXMuX2luamVjdG9yLFxuXHRcdH0pO1xuXHRcdHRoaXMuX2FwcGxpY2F0aW9uUmVmLmF0dGFjaFZpZXcoYmFja2Ryb3BDbXB0UmVmLmhvc3RWaWV3KTtcblx0XHRjb250YWluZXJFbC5hcHBlbmRDaGlsZChiYWNrZHJvcENtcHRSZWYubG9jYXRpb24ubmF0aXZlRWxlbWVudCk7XG5cdFx0cmV0dXJuIGJhY2tkcm9wQ21wdFJlZjtcblx0fVxuXG5cdHByaXZhdGUgX2F0dGFjaFdpbmRvd0NvbXBvbmVudChjb250YWluZXJFbDogRWxlbWVudCwgcHJvamVjdGFibGVOb2RlczogTm9kZVtdW10pOiBDb21wb25lbnRSZWY8TmdiTW9kYWxXaW5kb3c+IHtcblx0XHRsZXQgd2luZG93Q21wdFJlZiA9IGNyZWF0ZUNvbXBvbmVudChOZ2JNb2RhbFdpbmRvdywge1xuXHRcdFx0ZW52aXJvbm1lbnRJbmplY3RvcjogdGhpcy5fYXBwbGljYXRpb25SZWYuaW5qZWN0b3IsXG5cdFx0XHRlbGVtZW50SW5qZWN0b3I6IHRoaXMuX2luamVjdG9yLFxuXHRcdFx0cHJvamVjdGFibGVOb2Rlcyxcblx0XHR9KTtcblx0XHR0aGlzLl9hcHBsaWNhdGlvblJlZi5hdHRhY2hWaWV3KHdpbmRvd0NtcHRSZWYuaG9zdFZpZXcpO1xuXHRcdGNvbnRhaW5lckVsLmFwcGVuZENoaWxkKHdpbmRvd0NtcHRSZWYubG9jYXRpb24ubmF0aXZlRWxlbWVudCk7XG5cdFx0cmV0dXJuIHdpbmRvd0NtcHRSZWY7XG5cdH1cblxuXHRwcml2YXRlIF9nZXRDb250ZW50UmVmKFxuXHRcdGNvbnRlbnRJbmplY3RvcjogSW5qZWN0b3IsXG5cdFx0ZW52aXJvbm1lbnRJbmplY3RvcjogRW52aXJvbm1lbnRJbmplY3Rvcixcblx0XHRjb250ZW50OiBUeXBlPGFueT4gfCBUZW1wbGF0ZVJlZjxhbnk+IHwgc3RyaW5nLFxuXHRcdGFjdGl2ZU1vZGFsOiBOZ2JBY3RpdmVNb2RhbCxcblx0XHRvcHRpb25zOiBOZ2JNb2RhbE9wdGlvbnMsXG5cdCk6IENvbnRlbnRSZWYge1xuXHRcdGlmICghY29udGVudCkge1xuXHRcdFx0cmV0dXJuIG5ldyBDb250ZW50UmVmKFtdKTtcblx0XHR9IGVsc2UgaWYgKGNvbnRlbnQgaW5zdGFuY2VvZiBUZW1wbGF0ZVJlZikge1xuXHRcdFx0cmV0dXJuIHRoaXMuX2NyZWF0ZUZyb21UZW1wbGF0ZVJlZihjb250ZW50LCBhY3RpdmVNb2RhbCk7XG5cdFx0fSBlbHNlIGlmIChpc1N0cmluZyhjb250ZW50KSkge1xuXHRcdFx0cmV0dXJuIHRoaXMuX2NyZWF0ZUZyb21TdHJpbmcoY29udGVudCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiB0aGlzLl9jcmVhdGVGcm9tQ29tcG9uZW50KGNvbnRlbnRJbmplY3RvciwgZW52aXJvbm1lbnRJbmplY3RvciwgY29udGVudCwgYWN0aXZlTW9kYWwsIG9wdGlvbnMpO1xuXHRcdH1cblx0fVxuXG5cdHByaXZhdGUgX2NyZWF0ZUZyb21UZW1wbGF0ZVJlZih0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8YW55PiwgYWN0aXZlTW9kYWw6IE5nYkFjdGl2ZU1vZGFsKTogQ29udGVudFJlZiB7XG5cdFx0Y29uc3QgY29udGV4dCA9IHtcblx0XHRcdCRpbXBsaWNpdDogYWN0aXZlTW9kYWwsXG5cdFx0XHRjbG9zZShyZXN1bHQpIHtcblx0XHRcdFx0YWN0aXZlTW9kYWwuY2xvc2UocmVzdWx0KTtcblx0XHRcdH0sXG5cdFx0XHRkaXNtaXNzKHJlYXNvbikge1xuXHRcdFx0XHRhY3RpdmVNb2RhbC5kaXNtaXNzKHJlYXNvbik7XG5cdFx0XHR9LFxuXHRcdH07XG5cdFx0Y29uc3Qgdmlld1JlZiA9IHRlbXBsYXRlUmVmLmNyZWF0ZUVtYmVkZGVkVmlldyhjb250ZXh0KTtcblx0XHR0aGlzLl9hcHBsaWNhdGlvblJlZi5hdHRhY2hWaWV3KHZpZXdSZWYpO1xuXHRcdHJldHVybiBuZXcgQ29udGVudFJlZihbdmlld1JlZi5yb290Tm9kZXNdLCB2aWV3UmVmKTtcblx0fVxuXG5cdHByaXZhdGUgX2NyZWF0ZUZyb21TdHJpbmcoY29udGVudDogc3RyaW5nKTogQ29udGVudFJlZiB7XG5cdFx0Y29uc3QgY29tcG9uZW50ID0gdGhpcy5fZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoYCR7Y29udGVudH1gKTtcblx0XHRyZXR1cm4gbmV3IENvbnRlbnRSZWYoW1tjb21wb25lbnRdXSk7XG5cdH1cblxuXHRwcml2YXRlIF9jcmVhdGVGcm9tQ29tcG9uZW50KFxuXHRcdGNvbnRlbnRJbmplY3RvcjogSW5qZWN0b3IsXG5cdFx0ZW52aXJvbm1lbnRJbmplY3RvcjogRW52aXJvbm1lbnRJbmplY3Rvcixcblx0XHRjb21wb25lbnRUeXBlOiBUeXBlPGFueT4sXG5cdFx0Y29udGV4dDogTmdiQWN0aXZlTW9kYWwsXG5cdFx0b3B0aW9uczogTmdiTW9kYWxPcHRpb25zLFxuXHQpOiBDb250ZW50UmVmIHtcblx0XHRjb25zdCBlbGVtZW50SW5qZWN0b3IgPSBJbmplY3Rvci5jcmVhdGUoe1xuXHRcdFx0cHJvdmlkZXJzOiBbeyBwcm92aWRlOiBOZ2JBY3RpdmVNb2RhbCwgdXNlVmFsdWU6IGNvbnRleHQgfV0sXG5cdFx0XHRwYXJlbnQ6IGNvbnRlbnRJbmplY3Rvcixcblx0XHR9KTtcblx0XHRjb25zdCBjb21wb25lbnRSZWYgPSBjcmVhdGVDb21wb25lbnQoY29tcG9uZW50VHlwZSwge1xuXHRcdFx0ZW52aXJvbm1lbnRJbmplY3Rvcixcblx0XHRcdGVsZW1lbnRJbmplY3Rvcixcblx0XHR9KTtcblx0XHRjb25zdCBjb21wb25lbnROYXRpdmVFbCA9IGNvbXBvbmVudFJlZi5sb2NhdGlvbi5uYXRpdmVFbGVtZW50O1xuXHRcdGlmIChvcHRpb25zLnNjcm9sbGFibGUpIHtcblx0XHRcdChjb21wb25lbnROYXRpdmVFbCBhcyBIVE1MRWxlbWVudCkuY2xhc3NMaXN0LmFkZCgnY29tcG9uZW50LWhvc3Qtc2Nyb2xsYWJsZScpO1xuXHRcdH1cblx0XHR0aGlzLl9hcHBsaWNhdGlvblJlZi5hdHRhY2hWaWV3KGNvbXBvbmVudFJlZi5ob3N0Vmlldyk7XG5cdFx0Ly8gRklYTUU6IHdlIHNob3VsZCBoZXJlIGdldCByaWQgb2YgdGhlIGNvbXBvbmVudCBuYXRpdmVFbGVtZW50XG5cdFx0Ly8gYW5kIHVzZSBgW0FycmF5LmZyb20oY29tcG9uZW50TmF0aXZlRWwuY2hpbGROb2RlcyldYCBpbnN0ZWFkIGFuZCByZW1vdmUgdGhlIGFib3ZlIENTUyBjbGFzcy5cblx0XHRyZXR1cm4gbmV3IENvbnRlbnRSZWYoW1tjb21wb25lbnROYXRpdmVFbF1dLCBjb21wb25lbnRSZWYuaG9zdFZpZXcsIGNvbXBvbmVudFJlZik7XG5cdH1cblxuXHRwcml2YXRlIF9zZXRBcmlhSGlkZGVuKGVsZW1lbnQ6IEVsZW1lbnQpIHtcblx0XHRjb25zdCBwYXJlbnQgPSBlbGVtZW50LnBhcmVudEVsZW1lbnQ7XG5cdFx0aWYgKHBhcmVudCAmJiBlbGVtZW50ICE9PSB0aGlzLl9kb2N1bWVudC5ib2R5KSB7XG5cdFx0XHRBcnJheS5mcm9tKHBhcmVudC5jaGlsZHJlbikuZm9yRWFjaCgoc2libGluZykgPT4ge1xuXHRcdFx0XHRpZiAoc2libGluZyAhPT0gZWxlbWVudCAmJiBzaWJsaW5nLm5vZGVOYW1lICE9PSAnU0NSSVBUJykge1xuXHRcdFx0XHRcdHRoaXMuX2FyaWFIaWRkZW5WYWx1ZXMuc2V0KHNpYmxpbmcsIHNpYmxpbmcuZ2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicpKTtcblx0XHRcdFx0XHRzaWJsaW5nLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdFx0dGhpcy5fc2V0QXJpYUhpZGRlbihwYXJlbnQpO1xuXHRcdH1cblx0fVxuXG5cdHByaXZhdGUgX3JldmVydEFyaWFIaWRkZW4oKSB7XG5cdFx0dGhpcy5fYXJpYUhpZGRlblZhbHVlcy5mb3JFYWNoKCh2YWx1ZSwgZWxlbWVudCkgPT4ge1xuXHRcdFx0aWYgKHZhbHVlKSB7XG5cdFx0XHRcdGVsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsIHZhbHVlKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKCdhcmlhLWhpZGRlbicpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdHRoaXMuX2FyaWFIaWRkZW5WYWx1ZXMuY2xlYXIoKTtcblx0fVxuXG5cdHByaXZhdGUgX3JlZ2lzdGVyTW9kYWxSZWYobmdiTW9kYWxSZWY6IE5nYk1vZGFsUmVmKSB7XG5cdFx0Y29uc3QgdW5yZWdpc3Rlck1vZGFsUmVmID0gKCkgPT4ge1xuXHRcdFx0Y29uc3QgaW5kZXggPSB0aGlzLl9tb2RhbFJlZnMuaW5kZXhPZihuZ2JNb2RhbFJlZik7XG5cdFx0XHRpZiAoaW5kZXggPiAtMSkge1xuXHRcdFx0XHR0aGlzLl9tb2RhbFJlZnMuc3BsaWNlKGluZGV4LCAxKTtcblx0XHRcdFx0dGhpcy5fYWN0aXZlSW5zdGFuY2VzLmVtaXQodGhpcy5fbW9kYWxSZWZzKTtcblx0XHRcdH1cblx0XHR9O1xuXHRcdHRoaXMuX21vZGFsUmVmcy5wdXNoKG5nYk1vZGFsUmVmKTtcblx0XHR0aGlzLl9hY3RpdmVJbnN0YW5jZXMuZW1pdCh0aGlzLl9tb2RhbFJlZnMpO1xuXHRcdG5nYk1vZGFsUmVmLnJlc3VsdC50aGVuKHVucmVnaXN0ZXJNb2RhbFJlZiwgdW5yZWdpc3Rlck1vZGFsUmVmKTtcblx0fVxuXG5cdHByaXZhdGUgX3JlZ2lzdGVyV2luZG93Q21wdChuZ2JXaW5kb3dDbXB0OiBDb21wb25lbnRSZWY8TmdiTW9kYWxXaW5kb3c+KSB7XG5cdFx0dGhpcy5fd2luZG93Q21wdHMucHVzaChuZ2JXaW5kb3dDbXB0KTtcblx0XHR0aGlzLl9hY3RpdmVXaW5kb3dDbXB0SGFzQ2hhbmdlZC5uZXh0KCk7XG5cblx0XHRuZ2JXaW5kb3dDbXB0Lm9uRGVzdHJveSgoKSA9PiB7XG5cdFx0XHRjb25zdCBpbmRleCA9IHRoaXMuX3dpbmRvd0NtcHRzLmluZGV4T2YobmdiV2luZG93Q21wdCk7XG5cdFx0XHRpZiAoaW5kZXggPiAtMSkge1xuXHRcdFx0XHR0aGlzLl93aW5kb3dDbXB0cy5zcGxpY2UoaW5kZXgsIDEpO1xuXHRcdFx0XHR0aGlzLl9hY3RpdmVXaW5kb3dDbXB0SGFzQ2hhbmdlZC5uZXh0KCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cbn1cbiJdfQ==