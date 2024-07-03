import { ChangeDetectionStrategy, Component, Directive, EventEmitter, Inject, Input, Output, ViewEncapsulation, } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { listenToTriggers } from '../util/triggers';
import { ngbAutoClose } from '../util/autoclose';
import { ngbPositioning } from '../util/positioning';
import { PopupService } from '../util/popup';
import { isString } from '../util/util';
import * as i0 from "@angular/core";
import * as i1 from "./tooltip-config";
let nextId = 0;
class NgbTooltipWindow {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbTooltipWindow, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.6", type: NgbTooltipWindow, isStandalone: true, selector: "ngb-tooltip-window", inputs: { animation: "animation", id: "id", tooltipClass: "tooltipClass" }, host: { attributes: { "role": "tooltip" }, properties: { "class": "\"tooltip\" + (tooltipClass ? \" \" + tooltipClass : \"\")", "class.fade": "animation", "id": "id" } }, ngImport: i0, template: `<div class="tooltip-arrow" data-popper-arrow></div
		><div class="tooltip-inner"><ng-content></ng-content></div>`, isInline: true, styles: ["ngb-tooltip-window{pointer-events:none;position:absolute}ngb-tooltip-window .tooltip-inner{pointer-events:auto}ngb-tooltip-window.bs-tooltip-top,ngb-tooltip-window.bs-tooltip-bottom{padding-left:0;padding-right:0}ngb-tooltip-window.bs-tooltip-start,ngb-tooltip-window.bs-tooltip-end{padding-top:0;padding-bottom:0}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None }); }
}
export { NgbTooltipWindow };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbTooltipWindow, decorators: [{
            type: Component,
            args: [{ selector: 'ngb-tooltip-window', standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, host: {
                        '[class]': '"tooltip" + (tooltipClass ? " " + tooltipClass : "")',
                        '[class.fade]': 'animation',
                        role: 'tooltip',
                        '[id]': 'id',
                    }, template: `<div class="tooltip-arrow" data-popper-arrow></div
		><div class="tooltip-inner"><ng-content></ng-content></div>`, styles: ["ngb-tooltip-window{pointer-events:none;position:absolute}ngb-tooltip-window .tooltip-inner{pointer-events:auto}ngb-tooltip-window.bs-tooltip-top,ngb-tooltip-window.bs-tooltip-bottom{padding-left:0;padding-right:0}ngb-tooltip-window.bs-tooltip-start,ngb-tooltip-window.bs-tooltip-end{padding-top:0;padding-bottom:0}\n"] }]
        }], propDecorators: { animation: [{
                type: Input
            }], id: [{
                type: Input
            }], tooltipClass: [{
                type: Input
            }] } });
/**
 * A lightweight and extensible directive for fancy tooltip creation.
 */
class NgbTooltip {
    constructor(_elementRef, _renderer, injector, viewContainerRef, config, _ngZone, _document, _changeDetector, applicationRef) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._ngZone = _ngZone;
        this._document = _document;
        this._changeDetector = _changeDetector;
        /**
         * An event emitted when the tooltip opening animation has finished. Contains no payload.
         */
        this.shown = new EventEmitter();
        /**
         * An event emitted when the tooltip closing animation has finished. Contains no payload.
         */
        this.hidden = new EventEmitter();
        this._ngbTooltipWindowId = `ngb-tooltip-${nextId++}`;
        this._windowRef = null;
        this.animation = config.animation;
        this.autoClose = config.autoClose;
        this.placement = config.placement;
        this.popperOptions = config.popperOptions;
        this.triggers = config.triggers;
        this.container = config.container;
        this.disableTooltip = config.disableTooltip;
        this.tooltipClass = config.tooltipClass;
        this.openDelay = config.openDelay;
        this.closeDelay = config.closeDelay;
        this._popupService = new PopupService(NgbTooltipWindow, injector, viewContainerRef, _renderer, this._ngZone, applicationRef);
        this._positioning = ngbPositioning();
    }
    /**
     * The string content or a `TemplateRef` for the content to be displayed in the tooltip.
     *
     * If the content if falsy, the tooltip won't open.
     */
    set ngbTooltip(value) {
        this._ngbTooltip = value;
        if (!value && this._windowRef) {
            this.close();
        }
    }
    get ngbTooltip() {
        return this._ngbTooltip;
    }
    /**
     * Opens the tooltip.
     *
     * This is considered to be a "manual" triggering.
     * The `context` is an optional value to be injected into the tooltip template when it is created.
     */
    open(context) {
        if (!this._windowRef && this._ngbTooltip && !this.disableTooltip) {
            const { windowRef, transition$ } = this._popupService.open(this._ngbTooltip, context ?? this.tooltipContext, this.animation);
            this._windowRef = windowRef;
            this._windowRef.setInput('animation', this.animation);
            this._windowRef.setInput('tooltipClass', this.tooltipClass);
            this._windowRef.setInput('id', this._ngbTooltipWindowId);
            this._renderer.setAttribute(this._getPositionTargetElement(), 'aria-describedby', this._ngbTooltipWindowId);
            if (this.container === 'body') {
                this._document.querySelector(this.container).appendChild(this._windowRef.location.nativeElement);
            }
            // We need to detect changes, because we don't know where .open() might be called from.
            // Ex. opening tooltip from one of lifecycle hooks that run after the CD
            // (say from ngAfterViewInit) will result in 'ExpressionHasChanged' exception
            this._windowRef.changeDetectorRef.detectChanges();
            // We need to mark for check, because tooltip won't work inside the OnPush component.
            // Ex. when we use expression like `{{ tooltip.isOpen() : 'opened' : 'closed' }}`
            // inside the template of an OnPush component and we change the tooltip from
            // open -> closed, the expression in question won't be updated unless we explicitly
            // mark the parent component to be checked.
            this._windowRef.changeDetectorRef.markForCheck();
            // Setting up popper and scheduling updates when zone is stable
            this._ngZone.runOutsideAngular(() => {
                this._positioning.createPopper({
                    hostElement: this._getPositionTargetElement(),
                    targetElement: this._windowRef.location.nativeElement,
                    placement: this.placement,
                    appendToBody: this.container === 'body',
                    baseClass: 'bs-tooltip',
                    updatePopperOptions: (options) => this.popperOptions(options),
                });
                Promise.resolve().then(() => {
                    // This update is required for correct arrow placement
                    this._positioning.update();
                    this._zoneSubscription = this._ngZone.onStable.subscribe(() => this._positioning.update());
                });
            });
            ngbAutoClose(this._ngZone, this._document, this.autoClose, () => this.close(), this.hidden, [this._windowRef.location.nativeElement], [this._elementRef.nativeElement]);
            transition$.subscribe(() => this.shown.emit());
        }
    }
    /**
     * Closes the tooltip.
     *
     * This is considered to be a "manual" triggering of the tooltip.
     */
    close(animation = this.animation) {
        if (this._windowRef != null) {
            this._renderer.removeAttribute(this._getPositionTargetElement(), 'aria-describedby');
            this._popupService.close(animation).subscribe(() => {
                this._windowRef = null;
                this._positioning.destroy();
                this._zoneSubscription?.unsubscribe();
                this.hidden.emit();
                this._changeDetector.markForCheck();
            });
        }
    }
    /**
     * Toggles the tooltip.
     *
     * This is considered to be a "manual" triggering of the tooltip.
     */
    toggle() {
        if (this._windowRef) {
            this.close();
        }
        else {
            this.open();
        }
    }
    /**
     * Returns `true`, if the popover is currently shown.
     */
    isOpen() {
        return this._windowRef != null;
    }
    ngOnInit() {
        this._unregisterListenersFn = listenToTriggers(this._elementRef.nativeElement, this.triggers, this.isOpen.bind(this), this.open.bind(this), this.close.bind(this), +this.openDelay, +this.closeDelay);
    }
    ngOnChanges({ tooltipClass }) {
        if (tooltipClass && this.isOpen()) {
            this._windowRef.instance.tooltipClass = tooltipClass.currentValue;
        }
    }
    ngOnDestroy() {
        this.close(false);
        // This check is needed as it might happen that ngOnDestroy is called before ngOnInit
        // under certain conditions, see: https://github.com/ng-bootstrap/ng-bootstrap/issues/2199
        this._unregisterListenersFn?.();
    }
    _getPositionTargetElement() {
        return ((isString(this.positionTarget) ? this._document.querySelector(this.positionTarget) : this.positionTarget) ||
            this._elementRef.nativeElement);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbTooltip, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.Injector }, { token: i0.ViewContainerRef }, { token: i1.NgbTooltipConfig }, { token: i0.NgZone }, { token: DOCUMENT }, { token: i0.ChangeDetectorRef }, { token: i0.ApplicationRef }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.0.6", type: NgbTooltip, isStandalone: true, selector: "[ngbTooltip]", inputs: { animation: "animation", autoClose: "autoClose", placement: "placement", popperOptions: "popperOptions", triggers: "triggers", positionTarget: "positionTarget", container: "container", disableTooltip: "disableTooltip", tooltipClass: "tooltipClass", tooltipContext: "tooltipContext", openDelay: "openDelay", closeDelay: "closeDelay", ngbTooltip: "ngbTooltip" }, outputs: { shown: "shown", hidden: "hidden" }, exportAs: ["ngbTooltip"], usesOnChanges: true, ngImport: i0 }); }
}
export { NgbTooltip };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbTooltip, decorators: [{
            type: Directive,
            args: [{ selector: '[ngbTooltip]', standalone: true, exportAs: 'ngbTooltip' }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.Injector }, { type: i0.ViewContainerRef }, { type: i1.NgbTooltipConfig }, { type: i0.NgZone }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i0.ChangeDetectorRef }, { type: i0.ApplicationRef }]; }, propDecorators: { animation: [{
                type: Input
            }], autoClose: [{
                type: Input
            }], placement: [{
                type: Input
            }], popperOptions: [{
                type: Input
            }], triggers: [{
                type: Input
            }], positionTarget: [{
                type: Input
            }], container: [{
                type: Input
            }], disableTooltip: [{
                type: Input
            }], tooltipClass: [{
                type: Input
            }], tooltipContext: [{
                type: Input
            }], openDelay: [{
                type: Input
            }], closeDelay: [{
                type: Input
            }], shown: [{
                type: Output
            }], hidden: [{
                type: Output
            }], ngbTooltip: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy90b29sdGlwL3Rvb2x0aXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUVOLHVCQUF1QixFQUV2QixTQUFTLEVBRVQsU0FBUyxFQUVULFlBQVksRUFDWixNQUFNLEVBRU4sS0FBSyxFQUtMLE1BQU0sRUFLTixpQkFBaUIsR0FDakIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRTNDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsY0FBYyxFQUFrQixNQUFNLHFCQUFxQixDQUFDO0FBQ3JFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFN0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGNBQWMsQ0FBQzs7O0FBS3hDLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQztBQUVmLE1BZWEsZ0JBQWdCOzhHQUFoQixnQkFBZ0I7a0dBQWhCLGdCQUFnQixxVUFIbEI7OERBQ21EOztTQUVqRCxnQkFBZ0I7MkZBQWhCLGdCQUFnQjtrQkFmNUIsU0FBUzsrQkFDQyxvQkFBb0IsY0FDbEIsSUFBSSxtQkFDQyx1QkFBdUIsQ0FBQyxNQUFNLGlCQUNoQyxpQkFBaUIsQ0FBQyxJQUFJLFFBQy9CO3dCQUNMLFNBQVMsRUFBRSxzREFBc0Q7d0JBQ2pFLGNBQWMsRUFBRSxXQUFXO3dCQUMzQixJQUFJLEVBQUUsU0FBUzt3QkFDZixNQUFNLEVBQUUsSUFBSTtxQkFDWixZQUVTOzhEQUNtRDs4QkFHcEQsU0FBUztzQkFBakIsS0FBSztnQkFDRyxFQUFFO3NCQUFWLEtBQUs7Z0JBQ0csWUFBWTtzQkFBcEIsS0FBSzs7QUFHUDs7R0FFRztBQUNILE1BQ2Es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QixFQUFFLEVBQUUsQ0FBQztJQUNqQyxDQUFDO0lBRU8seUJBQXlCO1FBQ2hDLE9BQU8sQ0FDTixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQztZQUN6RyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FDOUIsQ0FBQztJQUNILENBQUM7OEdBN1NXLFVBQVUsbUxBMkhiLFFBQVE7a0dBM0hMLFVBQVU7O1NBQVYsVUFBVTsyRkFBVixVQUFVO2tCQUR0QixTQUFTO21CQUFDLEVBQUUsUUFBUSxFQUFFLGNBQWMsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQUU7OzBCQTRIOUUsTUFBTTsyQkFBQyxRQUFRO3lHQW5IUixTQUFTO3NCQUFqQixLQUFLO2dCQWFHLFNBQVM7c0JBQWpCLEtBQUs7Z0JBU0csU0FBUztzQkFBakIsS0FBSztnQkFRRyxhQUFhO3NCQUFyQixLQUFLO2dCQVFHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBUUcsY0FBYztzQkFBdEIsS0FBSztnQkFPRyxTQUFTO3NCQUFqQixLQUFLO2dCQU9HLGNBQWM7c0JBQXRCLEtBQUs7Z0JBT0csWUFBWTtzQkFBcEIsS0FBSztnQkFPRyxjQUFjO3NCQUF0QixLQUFLO2dCQU9HLFNBQVM7c0JBQWpCLEtBQUs7Z0JBT0csVUFBVTtzQkFBbEIsS0FBSztnQkFLSSxLQUFLO3NCQUFkLE1BQU07Z0JBS0csTUFBTTtzQkFBZixNQUFNO2dCQWdESCxVQUFVO3NCQURiLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuXHRBcHBsaWNhdGlvblJlZixcblx0Q2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG5cdENoYW5nZURldGVjdG9yUmVmLFxuXHRDb21wb25lbnQsXG5cdENvbXBvbmVudFJlZixcblx0RGlyZWN0aXZlLFxuXHRFbGVtZW50UmVmLFxuXHRFdmVudEVtaXR0ZXIsXG5cdEluamVjdCxcblx0SW5qZWN0b3IsXG5cdElucHV0LFxuXHROZ1pvbmUsXG5cdE9uQ2hhbmdlcyxcblx0T25EZXN0cm95LFxuXHRPbkluaXQsXG5cdE91dHB1dCxcblx0UmVuZGVyZXIyLFxuXHRTaW1wbGVDaGFuZ2VzLFxuXHRUZW1wbGF0ZVJlZixcblx0Vmlld0NvbnRhaW5lclJlZixcblx0Vmlld0VuY2Fwc3VsYXRpb24sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5pbXBvcnQgeyBsaXN0ZW5Ub1RyaWdnZXJzIH0gZnJvbSAnLi4vdXRpbC90cmlnZ2Vycyc7XG5pbXBvcnQgeyBuZ2JBdXRvQ2xvc2UgfSBmcm9tICcuLi91dGlsL2F1dG9jbG9zZSc7XG5pbXBvcnQgeyBuZ2JQb3NpdGlvbmluZywgUGxhY2VtZW50QXJyYXkgfSBmcm9tICcuLi91dGlsL3Bvc2l0aW9uaW5nJztcbmltcG9ydCB7IFBvcHVwU2VydmljZSB9IGZyb20gJy4uL3V0aWwvcG9wdXAnO1xuaW1wb3J0IHsgT3B0aW9ucyB9IGZyb20gJ0Bwb3BwZXJqcy9jb3JlJztcbmltcG9ydCB7IGlzU3RyaW5nIH0gZnJvbSAnLi4vdXRpbC91dGlsJztcblxuaW1wb3J0IHsgTmdiVG9vbHRpcENvbmZpZyB9IGZyb20gJy4vdG9vbHRpcC1jb25maWcnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmxldCBuZXh0SWQgPSAwO1xuXG5AQ29tcG9uZW50KHtcblx0c2VsZWN0b3I6ICduZ2ItdG9vbHRpcC13aW5kb3cnLFxuXHRzdGFuZGFsb25lOiB0cnVlLFxuXHRjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcblx0ZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcblx0aG9zdDoge1xuXHRcdCdbY2xhc3NdJzogJ1widG9vbHRpcFwiICsgKHRvb2x0aXBDbGFzcyA/IFwiIFwiICsgdG9vbHRpcENsYXNzIDogXCJcIiknLFxuXHRcdCdbY2xhc3MuZmFkZV0nOiAnYW5pbWF0aW9uJyxcblx0XHRyb2xlOiAndG9vbHRpcCcsXG5cdFx0J1tpZF0nOiAnaWQnLFxuXHR9LFxuXHRzdHlsZVVybHM6IFsnLi90b29sdGlwLnNjc3MnXSxcblx0dGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwidG9vbHRpcC1hcnJvd1wiIGRhdGEtcG9wcGVyLWFycm93PjwvZGl2XG5cdFx0PjxkaXYgY2xhc3M9XCJ0b29sdGlwLWlubmVyXCI+PG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PjwvZGl2PmAsXG59KVxuZXhwb3J0IGNsYXNzIE5nYlRvb2x0aXBXaW5kb3cge1xuXHRASW5wdXQoKSBhbmltYXRpb246IGJvb2xlYW47XG5cdEBJbnB1dCgpIGlkOiBzdHJpbmc7XG5cdEBJbnB1dCgpIHRvb2x0aXBDbGFzczogc3RyaW5nO1xufVxuXG4vKipcbiAqIEEgbGlnaHR3ZWlnaHQgYW5kIGV4dGVuc2libGUgZGlyZWN0aXZlIGZvciBmYW5jeSB0b29sdGlwIGNyZWF0aW9uLlxuICovXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdbbmdiVG9vbHRpcF0nLCBzdGFuZGFsb25lOiB0cnVlLCBleHBvcnRBczogJ25nYlRvb2x0aXAnIH0pXG5leHBvcnQgY2xhc3MgTmdiVG9vbHRpcCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBPbkNoYW5nZXMge1xuXHRzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfYXV0b0Nsb3NlOiBib29sZWFuIHwgc3RyaW5nO1xuXG5cdC8qKlxuXHQgKiBJZiBgdHJ1ZWAsIHRvb2x0aXAgb3BlbmluZyBhbmQgY2xvc2luZyB3aWxsIGJlIGFuaW1hdGVkLlxuXHQgKlxuXHQgKiBAc2luY2UgOC4wLjBcblx0ICovXG5cdEBJbnB1dCgpIGFuaW1hdGlvbjogYm9vbGVhbjtcblxuXHQvKipcblx0ICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIHRvb2x0aXAgc2hvdWxkIGJlIGNsb3NlZCBvbiBgRXNjYXBlYCBrZXkgYW5kIGluc2lkZS9vdXRzaWRlIGNsaWNrczpcblx0ICpcblx0ICogKiBgdHJ1ZWAgLSBjbG9zZXMgb24gYm90aCBvdXRzaWRlIGFuZCBpbnNpZGUgY2xpY2tzIGFzIHdlbGwgYXMgYEVzY2FwZWAgcHJlc3Nlc1xuXHQgKiAqIGBmYWxzZWAgLSBkaXNhYmxlcyB0aGUgYXV0b0Nsb3NlIGZlYXR1cmUgKE5COiB0cmlnZ2VycyBzdGlsbCBhcHBseSlcblx0ICogKiBgXCJpbnNpZGVcImAgLSBjbG9zZXMgb24gaW5zaWRlIGNsaWNrcyBhcyB3ZWxsIGFzIEVzY2FwZSBwcmVzc2VzXG5cdCAqICogYFwib3V0c2lkZVwiYCAtIGNsb3NlcyBvbiBvdXRzaWRlIGNsaWNrcyAoc29tZXRpbWVzIGFsc28gYWNoaWV2YWJsZSB0aHJvdWdoIHRyaWdnZXJzKVxuXHQgKiBhcyB3ZWxsIGFzIGBFc2NhcGVgIHByZXNzZXNcblx0ICpcblx0ICogQHNpbmNlIDMuMC4wXG5cdCAqL1xuXHRASW5wdXQoKSBhdXRvQ2xvc2U6IGJvb2xlYW4gfCAnaW5zaWRlJyB8ICdvdXRzaWRlJztcblxuXHQvKipcblx0ICogVGhlIHByZWZlcnJlZCBwbGFjZW1lbnQgb2YgdGhlIHRvb2x0aXAsIGFtb25nIHRoZSBbcG9zc2libGUgdmFsdWVzXSgjL2d1aWRlcy9wb3NpdGlvbmluZyNhcGkpLlxuXHQgKlxuXHQgKiBUaGUgZGVmYXVsdCBvcmRlciBvZiBwcmVmZXJlbmNlIGlzIGBcImF1dG9cImAuXG5cdCAqXG5cdCAqIFBsZWFzZSBzZWUgdGhlIFtwb3NpdGlvbmluZyBvdmVydmlld10oIy9wb3NpdGlvbmluZykgZm9yIG1vcmUgZGV0YWlscy5cblx0ICovXG5cdEBJbnB1dCgpIHBsYWNlbWVudDogUGxhY2VtZW50QXJyYXk7XG5cblx0LyoqXG5cdCAqIEFsbG93cyB0byBjaGFuZ2UgZGVmYXVsdCBQb3BwZXIgb3B0aW9ucyB3aGVuIHBvc2l0aW9uaW5nIHRoZSB0b29sdGlwLlxuXHQgKiBSZWNlaXZlcyBjdXJyZW50IHBvcHBlciBvcHRpb25zIGFuZCByZXR1cm5zIG1vZGlmaWVkIG9uZXMuXG5cdCAqXG5cdCAqIEBzaW5jZSAxMy4xLjBcblx0ICovXG5cdEBJbnB1dCgpIHBvcHBlck9wdGlvbnM6IChvcHRpb25zOiBQYXJ0aWFsPE9wdGlvbnM+KSA9PiBQYXJ0aWFsPE9wdGlvbnM+O1xuXG5cdC8qKlxuXHQgKiBTcGVjaWZpZXMgZXZlbnRzIHRoYXQgc2hvdWxkIHRyaWdnZXIgdGhlIHRvb2x0aXAuXG5cdCAqXG5cdCAqIFN1cHBvcnRzIGEgc3BhY2Ugc2VwYXJhdGVkIGxpc3Qgb2YgZXZlbnQgbmFtZXMuXG5cdCAqIEZvciBtb3JlIGRldGFpbHMgc2VlIHRoZSBbdHJpZ2dlcnMgZGVtb10oIy9jb21wb25lbnRzL3Rvb2x0aXAvZXhhbXBsZXMjdHJpZ2dlcnMpLlxuXHQgKi9cblx0QElucHV0KCkgdHJpZ2dlcnM6IHN0cmluZztcblxuXHQvKipcblx0ICogQSBjc3Mgc2VsZWN0b3Igb3IgaHRtbCBlbGVtZW50IHNwZWNpZnlpbmcgdGhlIGVsZW1lbnQgdGhlIHRvb2x0aXAgc2hvdWxkIGJlIHBvc2l0aW9uZWQgYWdhaW5zdC5cblx0ICogQnkgZGVmYXVsdCwgdGhlIGVsZW1lbnQgYG5nYlRvb2x0aXBgIGRpcmVjdGl2ZSBpcyBhcHBsaWVkIHRvIHdpbGwgYmUgc2V0IGFzIGEgdGFyZ2V0LlxuXHQgKlxuXHQgKiBAc2luY2UgMTMuMS4wXG5cdCAqL1xuXHRASW5wdXQoKSBwb3NpdGlvblRhcmdldD86IHN0cmluZyB8IEhUTUxFbGVtZW50O1xuXG5cdC8qKlxuXHQgKiBBIHNlbGVjdG9yIHNwZWNpZnlpbmcgdGhlIGVsZW1lbnQgdGhlIHRvb2x0aXAgc2hvdWxkIGJlIGFwcGVuZGVkIHRvLlxuXHQgKlxuXHQgKiBDdXJyZW50bHkgb25seSBzdXBwb3J0cyBgXCJib2R5XCJgLlxuXHQgKi9cblx0QElucHV0KCkgY29udGFpbmVyOiBzdHJpbmc7XG5cblx0LyoqXG5cdCAqIElmIGB0cnVlYCwgdG9vbHRpcCBpcyBkaXNhYmxlZCBhbmQgd29uJ3QgYmUgZGlzcGxheWVkLlxuXHQgKlxuXHQgKiBAc2luY2UgMS4xLjBcblx0ICovXG5cdEBJbnB1dCgpIGRpc2FibGVUb29sdGlwOiBib29sZWFuO1xuXG5cdC8qKlxuXHQgKiBBbiBvcHRpb25hbCBjbGFzcyBhcHBsaWVkIHRvIHRoZSB0b29sdGlwIHdpbmRvdyBlbGVtZW50LlxuXHQgKlxuXHQgKiBAc2luY2UgMy4yLjBcblx0ICovXG5cdEBJbnB1dCgpIHRvb2x0aXBDbGFzczogc3RyaW5nO1xuXG5cdC8qKlxuXHQgKiBEZWZhdWx0IHRlbXBsYXRlIGNvbnRleHQgZm9yIGBUZW1wbGF0ZVJlZmAsIGNhbiBiZSBvdmVycmlkZGVuIHdpdGggYG9wZW5gIG1ldGhvZC5cblx0ICpcblx0ICogQHNpbmNlIDE1LjEuMFxuXHQgKi9cblx0QElucHV0KCkgdG9vbHRpcENvbnRleHQ6IGFueTtcblxuXHQvKipcblx0ICogVGhlIG9wZW5pbmcgZGVsYXkgaW4gbXMuIFdvcmtzIG9ubHkgZm9yIFwibm9uLW1hbnVhbFwiIG9wZW5pbmcgdHJpZ2dlcnMgZGVmaW5lZCBieSB0aGUgYHRyaWdnZXJzYCBpbnB1dC5cblx0ICpcblx0ICogQHNpbmNlIDQuMS4wXG5cdCAqL1xuXHRASW5wdXQoKSBvcGVuRGVsYXk6IG51bWJlcjtcblxuXHQvKipcblx0ICogVGhlIGNsb3NpbmcgZGVsYXkgaW4gbXMuIFdvcmtzIG9ubHkgZm9yIFwibm9uLW1hbnVhbFwiIG9wZW5pbmcgdHJpZ2dlcnMgZGVmaW5lZCBieSB0aGUgYHRyaWdnZXJzYCBpbnB1dC5cblx0ICpcblx0ICogQHNpbmNlIDQuMS4wXG5cdCAqL1xuXHRASW5wdXQoKSBjbG9zZURlbGF5OiBudW1iZXI7XG5cblx0LyoqXG5cdCAqIEFuIGV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgdG9vbHRpcCBvcGVuaW5nIGFuaW1hdGlvbiBoYXMgZmluaXNoZWQuIENvbnRhaW5zIG5vIHBheWxvYWQuXG5cdCAqL1xuXHRAT3V0cHV0KCkgc2hvd24gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cblx0LyoqXG5cdCAqIEFuIGV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgdG9vbHRpcCBjbG9zaW5nIGFuaW1hdGlvbiBoYXMgZmluaXNoZWQuIENvbnRhaW5zIG5vIHBheWxvYWQuXG5cdCAqL1xuXHRAT3V0cHV0KCkgaGlkZGVuID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG5cdHByaXZhdGUgX25nYlRvb2x0aXA6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT4gfCBudWxsIHwgdW5kZWZpbmVkO1xuXHRwcml2YXRlIF9uZ2JUb29sdGlwV2luZG93SWQgPSBgbmdiLXRvb2x0aXAtJHtuZXh0SWQrK31gO1xuXHRwcml2YXRlIF9wb3B1cFNlcnZpY2U6IFBvcHVwU2VydmljZTxOZ2JUb29sdGlwV2luZG93Pjtcblx0cHJpdmF0ZSBfd2luZG93UmVmOiBDb21wb25lbnRSZWY8TmdiVG9vbHRpcFdpbmRvdz4gfCBudWxsID0gbnVsbDtcblx0cHJpdmF0ZSBfdW5yZWdpc3Rlckxpc3RlbmVyc0ZuO1xuXHRwcml2YXRlIF9wb3NpdGlvbmluZzogUmV0dXJuVHlwZTx0eXBlb2YgbmdiUG9zaXRpb25pbmc+O1xuXHRwcml2YXRlIF96b25lU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cblx0Y29uc3RydWN0b3IoXG5cdFx0cHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG5cdFx0cHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMixcblx0XHRpbmplY3RvcjogSW5qZWN0b3IsXG5cdFx0dmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZixcblx0XHRjb25maWc6IE5nYlRvb2x0aXBDb25maWcsXG5cdFx0cHJpdmF0ZSBfbmdab25lOiBOZ1pvbmUsXG5cdFx0QEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBfZG9jdW1lbnQ6IGFueSxcblx0XHRwcml2YXRlIF9jaGFuZ2VEZXRlY3RvcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG5cdFx0YXBwbGljYXRpb25SZWY6IEFwcGxpY2F0aW9uUmVmLFxuXHQpIHtcblx0XHR0aGlzLmFuaW1hdGlvbiA9IGNvbmZpZy5hbmltYXRpb247XG5cdFx0dGhpcy5hdXRvQ2xvc2UgPSBjb25maWcuYXV0b0Nsb3NlO1xuXHRcdHRoaXMucGxhY2VtZW50ID0gY29uZmlnLnBsYWNlbWVudDtcblx0XHR0aGlzLnBvcHBlck9wdGlvbnMgPSBjb25maWcucG9wcGVyT3B0aW9ucztcblx0XHR0aGlzLnRyaWdnZXJzID0gY29uZmlnLnRyaWdnZXJzO1xuXHRcdHRoaXMuY29udGFpbmVyID0gY29uZmlnLmNvbnRhaW5lcjtcblx0XHR0aGlzLmRpc2FibGVUb29sdGlwID0gY29uZmlnLmRpc2FibGVUb29sdGlwO1xuXHRcdHRoaXMudG9vbHRpcENsYXNzID0gY29uZmlnLnRvb2x0aXBDbGFzcztcblx0XHR0aGlzLm9wZW5EZWxheSA9IGNvbmZpZy5vcGVuRGVsYXk7XG5cdFx0dGhpcy5jbG9zZURlbGF5ID0gY29uZmlnLmNsb3NlRGVsYXk7XG5cdFx0dGhpcy5fcG9wdXBTZXJ2aWNlID0gbmV3IFBvcHVwU2VydmljZTxOZ2JUb29sdGlwV2luZG93Pihcblx0XHRcdE5nYlRvb2x0aXBXaW5kb3csXG5cdFx0XHRpbmplY3Rvcixcblx0XHRcdHZpZXdDb250YWluZXJSZWYsXG5cdFx0XHRfcmVuZGVyZXIsXG5cdFx0XHR0aGlzLl9uZ1pvbmUsXG5cdFx0XHRhcHBsaWNhdGlvblJlZixcblx0XHQpO1xuXHRcdHRoaXMuX3Bvc2l0aW9uaW5nID0gbmdiUG9zaXRpb25pbmcoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgc3RyaW5nIGNvbnRlbnQgb3IgYSBgVGVtcGxhdGVSZWZgIGZvciB0aGUgY29udGVudCB0byBiZSBkaXNwbGF5ZWQgaW4gdGhlIHRvb2x0aXAuXG5cdCAqXG5cdCAqIElmIHRoZSBjb250ZW50IGlmIGZhbHN5LCB0aGUgdG9vbHRpcCB3b24ndCBvcGVuLlxuXHQgKi9cblx0QElucHV0KClcblx0c2V0IG5nYlRvb2x0aXAodmFsdWU6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT4gfCBudWxsIHwgdW5kZWZpbmVkKSB7XG5cdFx0dGhpcy5fbmdiVG9vbHRpcCA9IHZhbHVlO1xuXHRcdGlmICghdmFsdWUgJiYgdGhpcy5fd2luZG93UmVmKSB7XG5cdFx0XHR0aGlzLmNsb3NlKCk7XG5cdFx0fVxuXHR9XG5cblx0Z2V0IG5nYlRvb2x0aXAoKSB7XG5cdFx0cmV0dXJuIHRoaXMuX25nYlRvb2x0aXA7XG5cdH1cblxuXHQvKipcblx0ICogT3BlbnMgdGhlIHRvb2x0aXAuXG5cdCAqXG5cdCAqIFRoaXMgaXMgY29uc2lkZXJlZCB0byBiZSBhIFwibWFudWFsXCIgdHJpZ2dlcmluZy5cblx0ICogVGhlIGBjb250ZXh0YCBpcyBhbiBvcHRpb25hbCB2YWx1ZSB0byBiZSBpbmplY3RlZCBpbnRvIHRoZSB0b29sdGlwIHRlbXBsYXRlIHdoZW4gaXQgaXMgY3JlYXRlZC5cblx0ICovXG5cdG9wZW4oY29udGV4dD86IGFueSkge1xuXHRcdGlmICghdGhpcy5fd2luZG93UmVmICYmIHRoaXMuX25nYlRvb2x0aXAgJiYgIXRoaXMuZGlzYWJsZVRvb2x0aXApIHtcblx0XHRcdGNvbnN0IHsgd2luZG93UmVmLCB0cmFuc2l0aW9uJCB9ID0gdGhpcy5fcG9wdXBTZXJ2aWNlLm9wZW4oXG5cdFx0XHRcdHRoaXMuX25nYlRvb2x0aXAsXG5cdFx0XHRcdGNvbnRleHQgPz8gdGhpcy50b29sdGlwQ29udGV4dCxcblx0XHRcdFx0dGhpcy5hbmltYXRpb24sXG5cdFx0XHQpO1xuXHRcdFx0dGhpcy5fd2luZG93UmVmID0gd2luZG93UmVmO1xuXHRcdFx0dGhpcy5fd2luZG93UmVmLnNldElucHV0KCdhbmltYXRpb24nLCB0aGlzLmFuaW1hdGlvbik7XG5cdFx0XHR0aGlzLl93aW5kb3dSZWYuc2V0SW5wdXQoJ3Rvb2x0aXBDbGFzcycsIHRoaXMudG9vbHRpcENsYXNzKTtcblx0XHRcdHRoaXMuX3dpbmRvd1JlZi5zZXRJbnB1dCgnaWQnLCB0aGlzLl9uZ2JUb29sdGlwV2luZG93SWQpO1xuXG5cdFx0XHR0aGlzLl9yZW5kZXJlci5zZXRBdHRyaWJ1dGUodGhpcy5fZ2V0UG9zaXRpb25UYXJnZXRFbGVtZW50KCksICdhcmlhLWRlc2NyaWJlZGJ5JywgdGhpcy5fbmdiVG9vbHRpcFdpbmRvd0lkKTtcblxuXHRcdFx0aWYgKHRoaXMuY29udGFpbmVyID09PSAnYm9keScpIHtcblx0XHRcdFx0dGhpcy5fZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLmNvbnRhaW5lcikuYXBwZW5kQ2hpbGQodGhpcy5fd2luZG93UmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQpO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBXZSBuZWVkIHRvIGRldGVjdCBjaGFuZ2VzLCBiZWNhdXNlIHdlIGRvbid0IGtub3cgd2hlcmUgLm9wZW4oKSBtaWdodCBiZSBjYWxsZWQgZnJvbS5cblx0XHRcdC8vIEV4LiBvcGVuaW5nIHRvb2x0aXAgZnJvbSBvbmUgb2YgbGlmZWN5Y2xlIGhvb2tzIHRoYXQgcnVuIGFmdGVyIHRoZSBDRFxuXHRcdFx0Ly8gKHNheSBmcm9tIG5nQWZ0ZXJWaWV3SW5pdCkgd2lsbCByZXN1bHQgaW4gJ0V4cHJlc3Npb25IYXNDaGFuZ2VkJyBleGNlcHRpb25cblx0XHRcdHRoaXMuX3dpbmRvd1JlZi5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG5cblx0XHRcdC8vIFdlIG5lZWQgdG8gbWFyayBmb3IgY2hlY2ssIGJlY2F1c2UgdG9vbHRpcCB3b24ndCB3b3JrIGluc2lkZSB0aGUgT25QdXNoIGNvbXBvbmVudC5cblx0XHRcdC8vIEV4LiB3aGVuIHdlIHVzZSBleHByZXNzaW9uIGxpa2UgYHt7IHRvb2x0aXAuaXNPcGVuKCkgOiAnb3BlbmVkJyA6ICdjbG9zZWQnIH19YFxuXHRcdFx0Ly8gaW5zaWRlIHRoZSB0ZW1wbGF0ZSBvZiBhbiBPblB1c2ggY29tcG9uZW50IGFuZCB3ZSBjaGFuZ2UgdGhlIHRvb2x0aXAgZnJvbVxuXHRcdFx0Ly8gb3BlbiAtPiBjbG9zZWQsIHRoZSBleHByZXNzaW9uIGluIHF1ZXN0aW9uIHdvbid0IGJlIHVwZGF0ZWQgdW5sZXNzIHdlIGV4cGxpY2l0bHlcblx0XHRcdC8vIG1hcmsgdGhlIHBhcmVudCBjb21wb25lbnQgdG8gYmUgY2hlY2tlZC5cblx0XHRcdHRoaXMuX3dpbmRvd1JlZi5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcblxuXHRcdFx0Ly8gU2V0dGluZyB1cCBwb3BwZXIgYW5kIHNjaGVkdWxpbmcgdXBkYXRlcyB3aGVuIHpvbmUgaXMgc3RhYmxlXG5cdFx0XHR0aGlzLl9uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuXHRcdFx0XHR0aGlzLl9wb3NpdGlvbmluZy5jcmVhdGVQb3BwZXIoe1xuXHRcdFx0XHRcdGhvc3RFbGVtZW50OiB0aGlzLl9nZXRQb3NpdGlvblRhcmdldEVsZW1lbnQoKSxcblx0XHRcdFx0XHR0YXJnZXRFbGVtZW50OiB0aGlzLl93aW5kb3dSZWYhLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQsXG5cdFx0XHRcdFx0cGxhY2VtZW50OiB0aGlzLnBsYWNlbWVudCxcblx0XHRcdFx0XHRhcHBlbmRUb0JvZHk6IHRoaXMuY29udGFpbmVyID09PSAnYm9keScsXG5cdFx0XHRcdFx0YmFzZUNsYXNzOiAnYnMtdG9vbHRpcCcsXG5cdFx0XHRcdFx0dXBkYXRlUG9wcGVyT3B0aW9uczogKG9wdGlvbnMpID0+IHRoaXMucG9wcGVyT3B0aW9ucyhvcHRpb25zKSxcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0UHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKSA9PiB7XG5cdFx0XHRcdFx0Ly8gVGhpcyB1cGRhdGUgaXMgcmVxdWlyZWQgZm9yIGNvcnJlY3QgYXJyb3cgcGxhY2VtZW50XG5cdFx0XHRcdFx0dGhpcy5fcG9zaXRpb25pbmcudXBkYXRlKCk7XG5cdFx0XHRcdFx0dGhpcy5fem9uZVN1YnNjcmlwdGlvbiA9IHRoaXMuX25nWm9uZS5vblN0YWJsZS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5fcG9zaXRpb25pbmcudXBkYXRlKCkpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXG5cdFx0XHRuZ2JBdXRvQ2xvc2UoXG5cdFx0XHRcdHRoaXMuX25nWm9uZSxcblx0XHRcdFx0dGhpcy5fZG9jdW1lbnQsXG5cdFx0XHRcdHRoaXMuYXV0b0Nsb3NlLFxuXHRcdFx0XHQoKSA9PiB0aGlzLmNsb3NlKCksXG5cdFx0XHRcdHRoaXMuaGlkZGVuLFxuXHRcdFx0XHRbdGhpcy5fd2luZG93UmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnRdLFxuXHRcdFx0XHRbdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50XSxcblx0XHRcdCk7XG5cblx0XHRcdHRyYW5zaXRpb24kLnN1YnNjcmliZSgoKSA9PiB0aGlzLnNob3duLmVtaXQoKSk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIENsb3NlcyB0aGUgdG9vbHRpcC5cblx0ICpcblx0ICogVGhpcyBpcyBjb25zaWRlcmVkIHRvIGJlIGEgXCJtYW51YWxcIiB0cmlnZ2VyaW5nIG9mIHRoZSB0b29sdGlwLlxuXHQgKi9cblx0Y2xvc2UoYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb24pOiB2b2lkIHtcblx0XHRpZiAodGhpcy5fd2luZG93UmVmICE9IG51bGwpIHtcblx0XHRcdHRoaXMuX3JlbmRlcmVyLnJlbW92ZUF0dHJpYnV0ZSh0aGlzLl9nZXRQb3NpdGlvblRhcmdldEVsZW1lbnQoKSwgJ2FyaWEtZGVzY3JpYmVkYnknKTtcblx0XHRcdHRoaXMuX3BvcHVwU2VydmljZS5jbG9zZShhbmltYXRpb24pLnN1YnNjcmliZSgoKSA9PiB7XG5cdFx0XHRcdHRoaXMuX3dpbmRvd1JlZiA9IG51bGw7XG5cdFx0XHRcdHRoaXMuX3Bvc2l0aW9uaW5nLmRlc3Ryb3koKTtcblx0XHRcdFx0dGhpcy5fem9uZVN1YnNjcmlwdGlvbj8udW5zdWJzY3JpYmUoKTtcblx0XHRcdFx0dGhpcy5oaWRkZW4uZW1pdCgpO1xuXHRcdFx0XHR0aGlzLl9jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTtcblx0XHRcdH0pO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBUb2dnbGVzIHRoZSB0b29sdGlwLlxuXHQgKlxuXHQgKiBUaGlzIGlzIGNvbnNpZGVyZWQgdG8gYmUgYSBcIm1hbnVhbFwiIHRyaWdnZXJpbmcgb2YgdGhlIHRvb2x0aXAuXG5cdCAqL1xuXHR0b2dnbGUoKTogdm9pZCB7XG5cdFx0aWYgKHRoaXMuX3dpbmRvd1JlZikge1xuXHRcdFx0dGhpcy5jbG9zZSgpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLm9wZW4oKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyBgdHJ1ZWAsIGlmIHRoZSBwb3BvdmVyIGlzIGN1cnJlbnRseSBzaG93bi5cblx0ICovXG5cdGlzT3BlbigpOiBib29sZWFuIHtcblx0XHRyZXR1cm4gdGhpcy5fd2luZG93UmVmICE9IG51bGw7XG5cdH1cblxuXHRuZ09uSW5pdCgpIHtcblx0XHR0aGlzLl91bnJlZ2lzdGVyTGlzdGVuZXJzRm4gPSBsaXN0ZW5Ub1RyaWdnZXJzKFxuXHRcdFx0dGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LFxuXHRcdFx0dGhpcy50cmlnZ2Vycyxcblx0XHRcdHRoaXMuaXNPcGVuLmJpbmQodGhpcyksXG5cdFx0XHR0aGlzLm9wZW4uYmluZCh0aGlzKSxcblx0XHRcdHRoaXMuY2xvc2UuYmluZCh0aGlzKSxcblx0XHRcdCt0aGlzLm9wZW5EZWxheSxcblx0XHRcdCt0aGlzLmNsb3NlRGVsYXksXG5cdFx0KTtcblx0fVxuXG5cdG5nT25DaGFuZ2VzKHsgdG9vbHRpcENsYXNzIH06IFNpbXBsZUNoYW5nZXMpIHtcblx0XHRpZiAodG9vbHRpcENsYXNzICYmIHRoaXMuaXNPcGVuKCkpIHtcblx0XHRcdHRoaXMuX3dpbmRvd1JlZiEuaW5zdGFuY2UudG9vbHRpcENsYXNzID0gdG9vbHRpcENsYXNzLmN1cnJlbnRWYWx1ZTtcblx0XHR9XG5cdH1cblxuXHRuZ09uRGVzdHJveSgpIHtcblx0XHR0aGlzLmNsb3NlKGZhbHNlKTtcblx0XHQvLyBUaGlzIGNoZWNrIGlzIG5lZWRlZCBhcyBpdCBtaWdodCBoYXBwZW4gdGhhdCBuZ09uRGVzdHJveSBpcyBjYWxsZWQgYmVmb3JlIG5nT25Jbml0XG5cdFx0Ly8gdW5kZXIgY2VydGFpbiBjb25kaXRpb25zLCBzZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9uZy1ib290c3RyYXAvbmctYm9vdHN0cmFwL2lzc3Vlcy8yMTk5XG5cdFx0dGhpcy5fdW5yZWdpc3Rlckxpc3RlbmVyc0ZuPy4oKTtcblx0fVxuXG5cdHByaXZhdGUgX2dldFBvc2l0aW9uVGFyZ2V0RWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG5cdFx0cmV0dXJuIChcblx0XHRcdChpc1N0cmluZyh0aGlzLnBvc2l0aW9uVGFyZ2V0KSA/IHRoaXMuX2RvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5wb3NpdGlvblRhcmdldCkgOiB0aGlzLnBvc2l0aW9uVGFyZ2V0KSB8fFxuXHRcdFx0dGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50XG5cdFx0KTtcblx0fVxufVxuIl19