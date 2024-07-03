import { ChangeDetectionStrategy, Component, Directive, EventEmitter, Inject, Input, Output, TemplateRef, ViewEncapsulation, } from '@angular/core';
import { DOCUMENT, NgIf, NgTemplateOutlet } from '@angular/common';
import { listenToTriggers } from '../util/triggers';
import { ngbAutoClose } from '../util/autoclose';
import { ngbPositioning } from '../util/positioning';
import { PopupService } from '../util/popup';
import { isString } from '../util/util';
import { addPopperOffset } from '../util/positioning-util';
import * as i0 from "@angular/core";
import * as i1 from "./popover-config";
let nextId = 0;
class NgbPopoverWindow {
    isTitleTemplate() {
        return this.title instanceof TemplateRef;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbPopoverWindow, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.6", type: NgbPopoverWindow, isStandalone: true, selector: "ngb-popover-window", inputs: { animation: "animation", title: "title", id: "id", popoverClass: "popoverClass", context: "context" }, host: { attributes: { "role": "tooltip" }, properties: { "class": "\"popover\" + (popoverClass ? \" \" + popoverClass : \"\")", "class.fade": "animation", "id": "id" }, styleAttribute: "position: absolute;" }, ngImport: i0, template: ` <div class="popover-arrow" data-popper-arrow></div>
		<h3 class="popover-header" *ngIf="title">
			<ng-template #simpleTitle>{{ title }}</ng-template>
			<ng-template
				[ngTemplateOutlet]="isTitleTemplate() ? $any(title) : simpleTitle"
				[ngTemplateOutletContext]="context"
			></ng-template>
		</h3>
		<div class="popover-body"><ng-content></ng-content></div>`, isInline: true, dependencies: [{ kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None }); }
}
export { NgbPopoverWindow };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbPopoverWindow, decorators: [{
            type: Component,
            args: [{
                    selector: 'ngb-popover-window',
                    standalone: true,
                    imports: [NgTemplateOutlet, NgIf],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    host: {
                        '[class]': '"popover" + (popoverClass ? " " + popoverClass : "")',
                        '[class.fade]': 'animation',
                        role: 'tooltip',
                        '[id]': 'id',
                        style: 'position: absolute;',
                    },
                    template: ` <div class="popover-arrow" data-popper-arrow></div>
		<h3 class="popover-header" *ngIf="title">
			<ng-template #simpleTitle>{{ title }}</ng-template>
			<ng-template
				[ngTemplateOutlet]="isTitleTemplate() ? $any(title) : simpleTitle"
				[ngTemplateOutletContext]="context"
			></ng-template>
		</h3>
		<div class="popover-body"><ng-content></ng-content></div>`,
                }]
        }], propDecorators: { animation: [{
                type: Input
            }], title: [{
                type: Input
            }], id: [{
                type: Input
            }], popoverClass: [{
                type: Input
            }], context: [{
                type: Input
            }] } });
/**
 * A lightweight and extensible directive for fancy popover creation.
 */
class NgbPopover {
    _isDisabled() {
        if (this.disablePopover) {
            return true;
        }
        if (!this.ngbPopover && !this.popoverTitle) {
            return true;
        }
        return false;
    }
    constructor(_elementRef, _renderer, injector, viewContainerRef, config, _ngZone, _document, _changeDetector, applicationRef) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._ngZone = _ngZone;
        this._document = _document;
        this._changeDetector = _changeDetector;
        /**
         * An event emitted when the popover opening animation has finished. Contains no payload.
         */
        this.shown = new EventEmitter();
        /**
         * An event emitted when the popover closing animation has finished. Contains no payload.
         *
         * At this point popover is not in the DOM anymore.
         */
        this.hidden = new EventEmitter();
        this._ngbPopoverWindowId = `ngb-popover-${nextId++}`;
        this._windowRef = null;
        this.animation = config.animation;
        this.autoClose = config.autoClose;
        this.placement = config.placement;
        this.popperOptions = config.popperOptions;
        this.triggers = config.triggers;
        this.container = config.container;
        this.disablePopover = config.disablePopover;
        this.popoverClass = config.popoverClass;
        this.openDelay = config.openDelay;
        this.closeDelay = config.closeDelay;
        this._positioning = ngbPositioning();
        this._popupService = new PopupService(NgbPopoverWindow, injector, viewContainerRef, _renderer, this._ngZone, applicationRef);
    }
    /**
     * Opens the popover.
     *
     * This is considered to be a "manual" triggering.
     * The `context` is an optional value to be injected into the popover template when it is created.
     */
    open(context) {
        if (!this._windowRef && !this._isDisabled()) {
            // this type assertion is safe because otherwise _isDisabled would return true
            const { windowRef, transition$ } = this._popupService.open(this.ngbPopover, context ?? this.popoverContext, this.animation);
            this._windowRef = windowRef;
            this._windowRef.setInput('animation', this.animation);
            this._windowRef.setInput('title', this.popoverTitle);
            this._windowRef.setInput('context', context ?? this.popoverContext);
            this._windowRef.setInput('popoverClass', this.popoverClass);
            this._windowRef.setInput('id', this._ngbPopoverWindowId);
            this._renderer.setAttribute(this._getPositionTargetElement(), 'aria-describedby', this._ngbPopoverWindowId);
            if (this.container === 'body') {
                this._document.querySelector(this.container).appendChild(this._windowRef.location.nativeElement);
            }
            // We need to detect changes, because we don't know where .open() might be called from.
            // Ex. opening popover from one of lifecycle hooks that run after the CD
            // (say from ngAfterViewInit) will result in 'ExpressionHasChanged' exception
            this._windowRef.changeDetectorRef.detectChanges();
            // We need to mark for check, because popover won't work inside the OnPush component.
            // Ex. when we use expression like `{{ popover.isOpen() : 'opened' : 'closed' }}`
            // inside the template of an OnPush component and we change the popover from
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
                    baseClass: 'bs-popover',
                    updatePopperOptions: (options) => this.popperOptions(addPopperOffset([0, 8])(options)),
                });
                Promise.resolve().then(() => {
                    // This update is required for correct arrow placement
                    this._positioning.update();
                    this._zoneSubscription = this._ngZone.onStable.subscribe(() => this._positioning.update());
                });
            });
            ngbAutoClose(this._ngZone, this._document, this.autoClose, () => this.close(), this.hidden, [
                this._windowRef.location.nativeElement,
            ]);
            transition$.subscribe(() => this.shown.emit());
        }
    }
    /**
     * Closes the popover.
     *
     * This is considered to be a "manual" triggering of the popover.
     */
    close(animation = this.animation) {
        if (this._windowRef) {
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
     * Toggles the popover.
     *
     * This is considered to be a "manual" triggering of the popover.
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
    ngOnChanges({ ngbPopover, popoverTitle, disablePopover, popoverClass }) {
        if (popoverClass && this.isOpen()) {
            this._windowRef.instance.popoverClass = popoverClass.currentValue;
        }
        // close popover if title and content become empty, or disablePopover set to true
        if ((ngbPopover || popoverTitle || disablePopover) && this._isDisabled()) {
            this.close();
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbPopover, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.Injector }, { token: i0.ViewContainerRef }, { token: i1.NgbPopoverConfig }, { token: i0.NgZone }, { token: DOCUMENT }, { token: i0.ChangeDetectorRef }, { token: i0.ApplicationRef }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.0.6", type: NgbPopover, isStandalone: true, selector: "[ngbPopover]", inputs: { animation: "animation", autoClose: "autoClose", ngbPopover: "ngbPopover", popoverTitle: "popoverTitle", placement: "placement", popperOptions: "popperOptions", triggers: "triggers", positionTarget: "positionTarget", container: "container", disablePopover: "disablePopover", popoverClass: "popoverClass", popoverContext: "popoverContext", openDelay: "openDelay", closeDelay: "closeDelay" }, outputs: { shown: "shown", hidden: "hidden" }, exportAs: ["ngbPopover"], usesOnChanges: true, ngImport: i0 }); }
}
export { NgbPopover };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbPopover, decorators: [{
            type: Directive,
            args: [{ selector: '[ngbPopover]', exportAs: 'ngbPopover', standalone: true }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.Injector }, { type: i0.ViewContainerRef }, { type: i1.NgbPopoverConfig }, { type: i0.NgZone }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i0.ChangeDetectorRef }, { type: i0.ApplicationRef }]; }, propDecorators: { animation: [{
                type: Input
            }], autoClose: [{
                type: Input
            }], ngbPopover: [{
                type: Input
            }], popoverTitle: [{
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
            }], disablePopover: [{
                type: Input
            }], popoverClass: [{
                type: Input
            }], popoverContext: [{
                type: Input
            }], openDelay: [{
                type: Input
            }], closeDelay: [{
                type: Input
            }], shown: [{
                type: Output
            }], hidden: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9wb3BvdmVyL3BvcG92ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUVOLHVCQUF1QixFQUV2QixTQUFTLEVBRVQsU0FBUyxFQUVULFlBQVksRUFDWixNQUFNLEVBRU4sS0FBSyxFQUtMLE1BQU0sRUFHTixXQUFXLEVBRVgsaUJBQWlCLEdBQ2pCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFbkUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDcEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxjQUFjLEVBQWtCLE1BQU0scUJBQXFCLENBQUM7QUFDckUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3QyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBS3hDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQzs7O0FBRzNELElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQztBQUVmLE1BdUJhLGdCQUFnQjtJQU81QixlQUFlO1FBQ2QsT0FBTyxJQUFJLENBQUMsS0FBSyxZQUFZLFdBQVcsQ0FBQztJQUMxQyxDQUFDOzhHQVRXLGdCQUFnQjtrR0FBaEIsZ0JBQWdCLGdaQVZsQjs7Ozs7Ozs7NERBUWlELDREQWxCakQsZ0JBQWdCLG9KQUFFLElBQUk7O1NBb0JwQixnQkFBZ0I7MkZBQWhCLGdCQUFnQjtrQkF2QjVCLFNBQVM7bUJBQUM7b0JBQ1YsUUFBUSxFQUFFLG9CQUFvQjtvQkFDOUIsVUFBVSxFQUFFLElBQUk7b0JBQ2hCLE9BQU8sRUFBRSxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQztvQkFDakMs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a0dBbkpMLFVBQVU7O1NBQVYsVUFBVTsyRkFBVixVQUFVO2tCQUR0QixTQUFTO21CQUFDLEVBQUUsUUFBUSxFQUFFLGNBQWMsRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUU7OzBCQW9KOUUsTUFBTTsyQkFBQyxRQUFRO3lHQTNJUixTQUFTO3NCQUFqQixLQUFLO2dCQWFHLFNBQVM7c0JBQWpCLEtBQUs7Z0JBT0csVUFBVTtzQkFBbEIsS0FBSztnQkFPRyxZQUFZO3NCQUFwQixLQUFLO2dCQVNHLFNBQVM7c0JBQWpCLEtBQUs7Z0JBUUcsYUFBYTtzQkFBckIsS0FBSztnQkFRRyxRQUFRO3NCQUFoQixLQUFLO2dCQVFHLGNBQWM7c0JBQXRCLEtBQUs7Z0JBT0csU0FBUztzQkFBakIsS0FBSztnQkFPRyxjQUFjO3NCQUF0QixLQUFLO2dCQU9HLFlBQVk7c0JBQXBCLEtBQUs7Z0JBT0csY0FBYztzQkFBdEIsS0FBSztnQkFPRyxTQUFTO3NCQUFqQixLQUFLO2dCQU9HLFVBQVU7c0JBQWxCLEtBQUs7Z0JBS0ksS0FBSztzQkFBZCxNQUFNO2dCQU9HLE1BQU07c0JBQWYsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG5cdEFwcGxpY2F0aW9uUmVmLFxuXHRDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcblx0Q2hhbmdlRGV0ZWN0b3JSZWYsXG5cdENvbXBvbmVudCxcblx0Q29tcG9uZW50UmVmLFxuXHREaXJlY3RpdmUsXG5cdEVsZW1lbnRSZWYsXG5cdEV2ZW50RW1pdHRlcixcblx0SW5qZWN0LFxuXHRJbmplY3Rvcixcblx0SW5wdXQsXG5cdE5nWm9uZSxcblx0T25DaGFuZ2VzLFxuXHRPbkRlc3Ryb3ksXG5cdE9uSW5pdCxcblx0T3V0cHV0LFxuXHRSZW5kZXJlcjIsXG5cdFNpbXBsZUNoYW5nZXMsXG5cdFRlbXBsYXRlUmVmLFxuXHRWaWV3Q29udGFpbmVyUmVmLFxuXHRWaWV3RW5jYXBzdWxhdGlvbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBET0NVTUVOVCwgTmdJZiwgTmdUZW1wbGF0ZU91dGxldCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7IGxpc3RlblRvVHJpZ2dlcnMgfSBmcm9tICcuLi91dGlsL3RyaWdnZXJzJztcbmltcG9ydCB7IG5nYkF1dG9DbG9zZSB9IGZyb20gJy4uL3V0aWwvYXV0b2Nsb3NlJztcbmltcG9ydCB7IG5nYlBvc2l0aW9uaW5nLCBQbGFjZW1lbnRBcnJheSB9IGZyb20gJy4uL3V0aWwvcG9zaXRpb25pbmcnO1xuaW1wb3J0IHsgUG9wdXBTZXJ2aWNlIH0gZnJvbSAnLi4vdXRpbC9wb3B1cCc7XG5pbXBvcnQgeyBpc1N0cmluZyB9IGZyb20gJy4uL3V0aWwvdXRpbCc7XG5cbmltcG9ydCB7IE5nYlBvcG92ZXJDb25maWcgfSBmcm9tICcuL3BvcG92ZXItY29uZmlnJztcbmltcG9ydCB7IE9wdGlvbnMgfSBmcm9tICdAcG9wcGVyanMvY29yZSc7XG5cbmltcG9ydCB7IGFkZFBvcHBlck9mZnNldCB9IGZyb20gJy4uL3V0aWwvcG9zaXRpb25pbmctdXRpbCc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxubGV0IG5leHRJZCA9IDA7XG5cbkBDb21wb25lbnQoe1xuXHRzZWxlY3RvcjogJ25nYi1wb3BvdmVyLXdpbmRvdycsXG5cdHN0YW5kYWxvbmU6IHRydWUsXG5cdGltcG9ydHM6IFtOZ1RlbXBsYXRlT3V0bGV0LCBOZ0lmXSxcblx0Y2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG5cdGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG5cdGhvc3Q6IHtcblx0XHQnW2NsYXNzXSc6ICdcInBvcG92ZXJcIiArIChwb3BvdmVyQ2xhc3MgPyBcIiBcIiArIHBvcG92ZXJDbGFzcyA6IFwiXCIpJyxcblx0XHQnW2NsYXNzLmZhZGVdJzogJ2FuaW1hdGlvbicsXG5cdFx0cm9sZTogJ3Rvb2x0aXAnLFxuXHRcdCdbaWRdJzogJ2lkJyxcblx0XHRzdHlsZTogJ3Bvc2l0aW9uOiBhYnNvbHV0ZTsnLFxuXHR9LFxuXHR0ZW1wbGF0ZTogYCA8ZGl2IGNsYXNzPVwicG9wb3Zlci1hcnJvd1wiIGRhdGEtcG9wcGVyLWFycm93PjwvZGl2PlxuXHRcdDxoMyBjbGFzcz1cInBvcG92ZXItaGVhZGVyXCIgKm5nSWY9XCJ0aXRsZVwiPlxuXHRcdFx0PG5nLXRlbXBsYXRlICNzaW1wbGVUaXRsZT57eyB0aXRsZSB9fTwvbmctdGVtcGxhdGU+XG5cdFx0XHQ8bmctdGVtcGxhdGVcblx0XHRcdFx0W25nVGVtcGxhdGVPdXRsZXRdPVwiaXNUaXRsZVRlbXBsYXRlKCkgPyAkYW55KHRpdGxlKSA6IHNpbXBsZVRpdGxlXCJcblx0XHRcdFx0W25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cImNvbnRleHRcIlxuXHRcdFx0PjwvbmctdGVtcGxhdGU+XG5cdFx0PC9oMz5cblx0XHQ8ZGl2IGNsYXNzPVwicG9wb3Zlci1ib2R5XCI+PG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PjwvZGl2PmAsXG59KVxuZXhwb3J0IGNsYXNzIE5nYlBvcG92ZXJXaW5kb3cge1xuXHRASW5wdXQoKSBhbmltYXRpb246IGJvb2xlYW47XG5cdEBJbnB1dCgpIHRpdGxlOiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxhbnk+IHwgbnVsbCB8IHVuZGVmaW5lZDtcblx0QElucHV0KCkgaWQ6IHN0cmluZztcblx0QElucHV0KCkgcG9wb3ZlckNsYXNzOiBzdHJpbmc7XG5cdEBJbnB1dCgpIGNvbnRleHQ6IGFueTtcblxuXHRpc1RpdGxlVGVtcGxhdGUoKSB7XG5cdFx0cmV0dXJuIHRoaXMudGl0bGUgaW5zdGFuY2VvZiBUZW1wbGF0ZVJlZjtcblx0fVxufVxuXG4vKipcbiAqIEEgbGlnaHR3ZWlnaHQgYW5kIGV4dGVuc2libGUgZGlyZWN0aXZlIGZvciBmYW5jeSBwb3BvdmVyIGNyZWF0aW9uLlxuICovXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdbbmdiUG9wb3Zlcl0nLCBleHBvcnRBczogJ25nYlBvcG92ZXInLCBzdGFuZGFsb25lOiB0cnVlIH0pXG5leHBvcnQgY2xhc3MgTmdiUG9wb3ZlciBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBPbkNoYW5nZXMge1xuXHRzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfYXV0b0Nsb3NlOiBib29sZWFuIHwgc3RyaW5nO1xuXG5cdC8qKlxuXHQgKiBJZiBgdHJ1ZWAsIHBvcG92ZXIgb3BlbmluZyBhbmQgY2xvc2luZyB3aWxsIGJlIGFuaW1hdGVkLlxuXHQgKlxuXHQgKiBAc2luY2UgOC4wLjBcblx0ICovXG5cdEBJbnB1dCgpIGFuaW1hdGlvbjogYm9vbGVhbjtcblxuXHQvKipcblx0ICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIHBvcG92ZXIgc2hvdWxkIGJlIGNsb3NlZCBvbiBgRXNjYXBlYCBrZXkgYW5kIGluc2lkZS9vdXRzaWRlIGNsaWNrczpcblx0ICpcblx0ICogKiBgdHJ1ZWAgLSBjbG9zZXMgb24gYm90aCBvdXRzaWRlIGFuZCBpbnNpZGUgY2xpY2tzIGFzIHdlbGwgYXMgYEVzY2FwZWAgcHJlc3Nlc1xuXHQgKiAqIGBmYWxzZWAgLSBkaXNhYmxlcyB0aGUgYXV0b0Nsb3NlIGZlYXR1cmUgKE5COiB0cmlnZ2VycyBzdGlsbCBhcHBseSlcblx0ICogKiBgXCJpbnNpZGVcImAgLSBjbG9zZXMgb24gaW5zaWRlIGNsaWNrcyBhcyB3ZWxsIGFzIEVzY2FwZSBwcmVzc2VzXG5cdCAqICogYFwib3V0c2lkZVwiYCAtIGNsb3NlcyBvbiBvdXRzaWRlIGNsaWNrcyAoc29tZXRpbWVzIGFsc28gYWNoaWV2YWJsZSB0aHJvdWdoIHRyaWdnZXJzKVxuXHQgKiBhcyB3ZWxsIGFzIGBFc2NhcGVgIHByZXNzZXNcblx0ICpcblx0ICogQHNpbmNlIDMuMC4wXG5cdCAqL1xuXHRASW5wdXQoKSBhdXRvQ2xvc2U6IGJvb2xlYW4gfCAnaW5zaWRlJyB8ICdvdXRzaWRlJztcblxuXHQvKipcblx0ICogVGhlIHN0cmluZyBjb250ZW50IG9yIGEgYFRlbXBsYXRlUmVmYCBmb3IgdGhlIGNvbnRlbnQgdG8gYmUgZGlzcGxheWVkIGluIHRoZSBwb3BvdmVyLlxuXHQgKlxuXHQgKiBJZiB0aGUgdGl0bGUgYW5kIHRoZSBjb250ZW50IGFyZSBmYWxzeSwgdGhlIHBvcG92ZXIgd29uJ3Qgb3Blbi5cblx0ICovXG5cdEBJbnB1dCgpIG5nYlBvcG92ZXI6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT4gfCBudWxsIHwgdW5kZWZpbmVkO1xuXG5cdC8qKlxuXHQgKiBUaGUgdGl0bGUgb2YgdGhlIHBvcG92ZXIuXG5cdCAqXG5cdCAqIElmIHRoZSB0aXRsZSBhbmQgdGhlIGNvbnRlbnQgYXJlIGZhbHN5LCB0aGUgcG9wb3ZlciB3b24ndCBvcGVuLlxuXHQgKi9cblx0QElucHV0KCkgcG9wb3ZlclRpdGxlOiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxhbnk+IHwgbnVsbCB8IHVuZGVmaW5lZDtcblxuXHQvKipcblx0ICogVGhlIHByZWZlcnJlZCBwbGFjZW1lbnQgb2YgdGhlIHBvcG92ZXIsIGFtb25nIHRoZSBbcG9zc2libGUgdmFsdWVzXSgjL2d1aWRlcy9wb3NpdGlvbmluZyNhcGkpLlxuXHQgKlxuXHQgKiBUaGUgZGVmYXVsdCBvcmRlciBvZiBwcmVmZXJlbmNlIGlzIGBcImF1dG9cImAuXG5cdCAqXG5cdCAqIFBsZWFzZSBzZWUgdGhlIFtwb3NpdGlvbmluZyBvdmVydmlld10oIy9wb3NpdGlvbmluZykgZm9yIG1vcmUgZGV0YWlscy5cblx0ICovXG5cdEBJbnB1dCgpIHBsYWNlbWVudDogUGxhY2VtZW50QXJyYXk7XG5cblx0LyoqXG5cdCAqIEFsbG93cyB0byBjaGFuZ2UgZGVmYXVsdCBQb3BwZXIgb3B0aW9ucyB3aGVuIHBvc2l0aW9uaW5nIHRoZSBwb3BvdmVyLlxuXHQgKiBSZWNlaXZlcyBjdXJyZW50IHBvcHBlciBvcHRpb25zIGFuZCByZXR1cm5zIG1vZGlmaWVkIG9uZXMuXG5cdCAqXG5cdCAqIEBzaW5jZSAxMy4xLjBcblx0ICovXG5cdEBJbnB1dCgpIHBvcHBlck9wdGlvbnM6IChvcHRpb25zOiBQYXJ0aWFsPE9wdGlvbnM+KSA9PiBQYXJ0aWFsPE9wdGlvbnM+O1xuXG5cdC8qKlxuXHQgKiBTcGVjaWZpZXMgZXZlbnRzIHRoYXQgc2hvdWxkIHRyaWdnZXIgdGhlIHRvb2x0aXAuXG5cdCAqXG5cdCAqIFN1cHBvcnRzIGEgc3BhY2Ugc2VwYXJhdGVkIGxpc3Qgb2YgZXZlbnQgbmFtZXMuXG5cdCAqIEZvciBtb3JlIGRldGFpbHMgc2VlIHRoZSBbdHJpZ2dlcnMgZGVtb10oIy9jb21wb25lbnRzL3BvcG92ZXIvZXhhbXBsZXMjdHJpZ2dlcnMpLlxuXHQgKi9cblx0QElucHV0KCkgdHJpZ2dlcnM6IHN0cmluZztcblxuXHQvKipcblx0ICogQSBjc3Mgc2VsZWN0b3Igb3IgaHRtbCBlbGVtZW50IHNwZWNpZnlpbmcgdGhlIGVsZW1lbnQgdGhlIHBvcG92ZXIgc2hvdWxkIGJlIHBvc2l0aW9uZWQgYWdhaW5zdC5cblx0ICogQnkgZGVmYXVsdCwgdGhlIGVsZW1lbnQgYG5nYlBvcG92ZXJgIGRpcmVjdGl2ZSBpcyBhcHBsaWVkIHRvIHdpbGwgYmUgc2V0IGFzIGEgdGFyZ2V0LlxuXHQgKlxuXHQgKiBAc2luY2UgMTMuMS4wXG5cdCAqL1xuXHRASW5wdXQoKSBwb3NpdGlvblRhcmdldD86IHN0cmluZyB8IEhUTUxFbGVtZW50O1xuXG5cdC8qKlxuXHQgKiBBIHNlbGVjdG9yIHNwZWNpZnlpbmcgdGhlIGVsZW1lbnQgdGhlIHBvcG92ZXIgc2hvdWxkIGJlIGFwcGVuZGVkIHRvLlxuXHQgKlxuXHQgKiBDdXJyZW50bHkgb25seSBzdXBwb3J0cyBgYm9keWAuXG5cdCAqL1xuXHRASW5wdXQoKSBjb250YWluZXI6IHN0cmluZztcblxuXHQvKipcblx0ICogSWYgYHRydWVgLCBwb3BvdmVyIGlzIGRpc2FibGVkIGFuZCB3b24ndCBiZSBkaXNwbGF5ZWQuXG5cdCAqXG5cdCAqIEBzaW5jZSAxLjEuMFxuXHQgKi9cblx0QElucHV0KCkgZGlzYWJsZVBvcG92ZXI6IGJvb2xlYW47XG5cblx0LyoqXG5cdCAqIEFuIG9wdGlvbmFsIGNsYXNzIGFwcGxpZWQgdG8gdGhlIHBvcG92ZXIgd2luZG93IGVsZW1lbnQuXG5cdCAqXG5cdCAqIEBzaW5jZSAyLjIuMFxuXHQgKi9cblx0QElucHV0KCkgcG9wb3ZlckNsYXNzOiBzdHJpbmc7XG5cblx0LyoqXG5cdCAqIERlZmF1bHQgdGVtcGxhdGUgY29udGV4dCBmb3IgYFRlbXBsYXRlUmVmYCwgY2FuIGJlIG92ZXJyaWRkZW4gd2l0aCBgb3BlbmAgbWV0aG9kLlxuXHQgKlxuXHQgKiBAc2luY2UgMTUuMS4wXG5cdCAqL1xuXHRASW5wdXQoKSBwb3BvdmVyQ29udGV4dDogYW55O1xuXG5cdC8qKlxuXHQgKiBUaGUgb3BlbmluZyBkZWxheSBpbiBtcy4gV29ya3Mgb25seSBmb3IgXCJub24tbWFudWFsXCIgb3BlbmluZyB0cmlnZ2VycyBkZWZpbmVkIGJ5IHRoZSBgdHJpZ2dlcnNgIGlucHV0LlxuXHQgKlxuXHQgKiBAc2luY2UgNC4xLjBcblx0ICovXG5cdEBJbnB1dCgpIG9wZW5EZWxheTogbnVtYmVyO1xuXG5cdC8qKlxuXHQgKiBUaGUgY2xvc2luZyBkZWxheSBpbiBtcy4gV29ya3Mgb25seSBmb3IgXCJub24tbWFudWFsXCIgb3BlbmluZyB0cmlnZ2VycyBkZWZpbmVkIGJ5IHRoZSBgdHJpZ2dlcnNgIGlucHV0LlxuXHQgKlxuXHQgKiBAc2luY2UgNC4xLjBcblx0ICovXG5cdEBJbnB1dCgpIGNsb3NlRGVsYXk6IG51bWJlcjtcblxuXHQvKipcblx0ICogQW4gZXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBwb3BvdmVyIG9wZW5pbmcgYW5pbWF0aW9uIGhhcyBmaW5pc2hlZC4gQ29udGFpbnMgbm8gcGF5bG9hZC5cblx0ICovXG5cdEBPdXRwdXQoKSBzaG93biA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuXHQvKipcblx0ICogQW4gZXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBwb3BvdmVyIGNsb3NpbmcgYW5pbWF0aW9uIGhhcyBmaW5pc2hlZC4gQ29udGFpbnMgbm8gcGF5bG9hZC5cblx0ICpcblx0ICogQXQgdGhpcyBwb2ludCBwb3BvdmVyIGlzIG5vdCBpbiB0aGUgRE9NIGFueW1vcmUuXG5cdCAqL1xuXHRAT3V0cHV0KCkgaGlkZGVuID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG5cdHByaXZhdGUgX25nYlBvcG92ZXJXaW5kb3dJZCA9IGBuZ2ItcG9wb3Zlci0ke25leHRJZCsrfWA7XG5cdHByaXZhdGUgX3BvcHVwU2VydmljZTogUG9wdXBTZXJ2aWNlPE5nYlBvcG92ZXJXaW5kb3c+O1xuXHRwcml2YXRlIF93aW5kb3dSZWY6IENvbXBvbmVudFJlZjxOZ2JQb3BvdmVyV2luZG93PiB8IG51bGwgPSBudWxsO1xuXHRwcml2YXRlIF91bnJlZ2lzdGVyTGlzdGVuZXJzRm47XG5cdHByaXZhdGUgX3Bvc2l0aW9uaW5nOiBSZXR1cm5UeXBlPHR5cGVvZiBuZ2JQb3NpdGlvbmluZz47XG5cdHByaXZhdGUgX3pvbmVTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblx0cHJpdmF0ZSBfaXNEaXNhYmxlZCgpOiBib29sZWFuIHtcblx0XHRpZiAodGhpcy5kaXNhYmxlUG9wb3Zlcikge1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXHRcdGlmICghdGhpcy5uZ2JQb3BvdmVyICYmICF0aGlzLnBvcG92ZXJUaXRsZSkge1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdGNvbnN0cnVjdG9yKFxuXHRcdHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuXHRcdHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIsXG5cdFx0aW5qZWN0b3I6IEluamVjdG9yLFxuXHRcdHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYsXG5cdFx0Y29uZmlnOiBOZ2JQb3BvdmVyQ29uZmlnLFxuXHRcdHByaXZhdGUgX25nWm9uZTogTmdab25lLFxuXHRcdEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgX2RvY3VtZW50OiBhbnksXG5cdFx0cHJpdmF0ZSBfY2hhbmdlRGV0ZWN0b3I6IENoYW5nZURldGVjdG9yUmVmLFxuXHRcdGFwcGxpY2F0aW9uUmVmOiBBcHBsaWNhdGlvblJlZixcblx0KSB7XG5cdFx0dGhpcy5hbmltYXRpb24gPSBjb25maWcuYW5pbWF0aW9uO1xuXHRcdHRoaXMuYXV0b0Nsb3NlID0gY29uZmlnLmF1dG9DbG9zZTtcblx0XHR0aGlzLnBsYWNlbWVudCA9IGNvbmZpZy5wbGFjZW1lbnQ7XG5cdFx0dGhpcy5wb3BwZXJPcHRpb25zID0gY29uZmlnLnBvcHBlck9wdGlvbnM7XG5cdFx0dGhpcy50cmlnZ2VycyA9IGNvbmZpZy50cmlnZ2Vycztcblx0XHR0aGlzLmNvbnRhaW5lciA9IGNvbmZpZy5jb250YWluZXI7XG5cdFx0dGhpcy5kaXNhYmxlUG9wb3ZlciA9IGNvbmZpZy5kaXNhYmxlUG9wb3Zlcjtcblx0XHR0aGlzLnBvcG92ZXJDbGFzcyA9IGNvbmZpZy5wb3BvdmVyQ2xhc3M7XG5cdFx0dGhpcy5vcGVuRGVsYXkgPSBjb25maWcub3BlbkRlbGF5O1xuXHRcdHRoaXMuY2xvc2VEZWxheSA9IGNvbmZpZy5jbG9zZURlbGF5O1xuXHRcdHRoaXMuX3Bvc2l0aW9uaW5nID0gbmdiUG9zaXRpb25pbmcoKTtcblx0XHR0aGlzLl9wb3B1cFNlcnZpY2UgPSBuZXcgUG9wdXBTZXJ2aWNlPE5nYlBvcG92ZXJXaW5kb3c+KFxuXHRcdFx0TmdiUG9wb3ZlcldpbmRvdyxcblx0XHRcdGluamVjdG9yLFxuXHRcdFx0dmlld0NvbnRhaW5lclJlZixcblx0XHRcdF9yZW5kZXJlcixcblx0XHRcdHRoaXMuX25nWm9uZSxcblx0XHRcdGFwcGxpY2F0aW9uUmVmLFxuXHRcdCk7XG5cdH1cblxuXHQvKipcblx0ICogT3BlbnMgdGhlIHBvcG92ZXIuXG5cdCAqXG5cdCAqIFRoaXMgaXMgY29uc2lkZXJlZCB0byBiZSBhIFwibWFudWFsXCIgdHJpZ2dlcmluZy5cblx0ICogVGhlIGBjb250ZXh0YCBpcyBhbiBvcHRpb25hbCB2YWx1ZSB0byBiZSBpbmplY3RlZCBpbnRvIHRoZSBwb3BvdmVyIHRlbXBsYXRlIHdoZW4gaXQgaXMgY3JlYXRlZC5cblx0ICovXG5cdG9wZW4oY29udGV4dD86IGFueSkge1xuXHRcdGlmICghdGhpcy5fd2luZG93UmVmICYmICF0aGlzLl9pc0Rpc2FibGVkKCkpIHtcblx0XHRcdC8vIHRoaXMgdHlwZSBhc3NlcnRpb24gaXMgc2FmZSBiZWNhdXNlIG90aGVyd2lzZSBfaXNEaXNhYmxlZCB3b3VsZCByZXR1cm4gdHJ1ZVxuXHRcdFx0Y29uc3QgeyB3aW5kb3dSZWYsIHRyYW5zaXRpb24kIH0gPSB0aGlzLl9wb3B1cFNlcnZpY2Uub3Blbihcblx0XHRcdFx0dGhpcy5uZ2JQb3BvdmVyIGFzIHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT4sXG5cdFx0XHRcdGNvbnRleHQgPz8gdGhpcy5wb3BvdmVyQ29udGV4dCxcblx0XHRcdFx0dGhpcy5hbmltYXRpb24sXG5cdFx0XHQpO1xuXHRcdFx0dGhpcy5fd2luZG93UmVmID0gd2luZG93UmVmO1xuXHRcdFx0dGhpcy5fd2luZG93UmVmLnNldElucHV0KCdhbmltYXRpb24nLCB0aGlzLmFuaW1hdGlvbik7XG5cdFx0XHR0aGlzLl93aW5kb3dSZWYuc2V0SW5wdXQoJ3RpdGxlJywgdGhpcy5wb3BvdmVyVGl0bGUpO1xuXHRcdFx0dGhpcy5fd2luZG93UmVmLnNldElucHV0KCdjb250ZXh0JywgY29udGV4dCA/PyB0aGlzLnBvcG92ZXJDb250ZXh0KTtcblx0XHRcdHRoaXMuX3dpbmRvd1JlZi5zZXRJbnB1dCgncG9wb3ZlckNsYXNzJywgdGhpcy5wb3BvdmVyQ2xhc3MpO1xuXHRcdFx0dGhpcy5fd2luZG93UmVmLnNldElucHV0KCdpZCcsIHRoaXMuX25nYlBvcG92ZXJXaW5kb3dJZCk7XG5cblx0XHRcdHRoaXMuX3JlbmRlcmVyLnNldEF0dHJpYnV0ZSh0aGlzLl9nZXRQb3NpdGlvblRhcmdldEVsZW1lbnQoKSwgJ2FyaWEtZGVzY3JpYmVkYnknLCB0aGlzLl9uZ2JQb3BvdmVyV2luZG93SWQpO1xuXG5cdFx0XHRpZiAodGhpcy5jb250YWluZXIgPT09ICdib2R5Jykge1xuXHRcdFx0XHR0aGlzLl9kb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMuY29udGFpbmVyKS5hcHBlbmRDaGlsZCh0aGlzLl93aW5kb3dSZWYubG9jYXRpb24ubmF0aXZlRWxlbWVudCk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFdlIG5lZWQgdG8gZGV0ZWN0IGNoYW5nZXMsIGJlY2F1c2Ugd2UgZG9uJ3Qga25vdyB3aGVyZSAub3BlbigpIG1pZ2h0IGJlIGNhbGxlZCBmcm9tLlxuXHRcdFx0Ly8gRXguIG9wZW5pbmcgcG9wb3ZlciBmcm9tIG9uZSBvZiBsaWZlY3ljbGUgaG9va3MgdGhhdCBydW4gYWZ0ZXIgdGhlIENEXG5cdFx0XHQvLyAoc2F5IGZyb20gbmdBZnRlclZpZXdJbml0KSB3aWxsIHJlc3VsdCBpbiAnRXhwcmVzc2lvbkhhc0NoYW5nZWQnIGV4Y2VwdGlvblxuXHRcdFx0dGhpcy5fd2luZG93UmVmLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcblxuXHRcdFx0Ly8gV2UgbmVlZCB0byBtYXJrIGZvciBjaGVjaywgYmVjYXVzZSBwb3BvdmVyIHdvbid0IHdvcmsgaW5zaWRlIHRoZSBPblB1c2ggY29tcG9uZW50LlxuXHRcdFx0Ly8gRXguIHdoZW4gd2UgdXNlIGV4cHJlc3Npb24gbGlrZSBge3sgcG9wb3Zlci5pc09wZW4oKSA6ICdvcGVuZWQnIDogJ2Nsb3NlZCcgfX1gXG5cdFx0XHQvLyBpbnNpZGUgdGhlIHRlbXBsYXRlIG9mIGFuIE9uUHVzaCBjb21wb25lbnQgYW5kIHdlIGNoYW5nZSB0aGUgcG9wb3ZlciBmcm9tXG5cdFx0XHQvLyBvcGVuIC0+IGNsb3NlZCwgdGhlIGV4cHJlc3Npb24gaW4gcXVlc3Rpb24gd29uJ3QgYmUgdXBkYXRlZCB1bmxlc3Mgd2UgZXhwbGljaXRseVxuXHRcdFx0Ly8gbWFyayB0aGUgcGFyZW50IGNvbXBvbmVudCB0byBiZSBjaGVja2VkLlxuXHRcdFx0dGhpcy5fd2luZG93UmVmLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuXG5cdFx0XHQvLyBTZXR0aW5nIHVwIHBvcHBlciBhbmQgc2NoZWR1bGluZyB1cGRhdGVzIHdoZW4gem9uZSBpcyBzdGFibGVcblx0XHRcdHRoaXMuX25nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG5cdFx0XHRcdHRoaXMuX3Bvc2l0aW9uaW5nLmNyZWF0ZVBvcHBlcih7XG5cdFx0XHRcdFx0aG9zdEVsZW1lbnQ6IHRoaXMuX2dldFBvc2l0aW9uVGFyZ2V0RWxlbWVudCgpLFxuXHRcdFx0XHRcdHRhcmdldEVsZW1lbnQ6IHRoaXMuX3dpbmRvd1JlZiEubG9jYXRpb24ubmF0aXZlRWxlbWVudCxcblx0XHRcdFx0XHRwbGFjZW1lbnQ6IHRoaXMucGxhY2VtZW50LFxuXHRcdFx0XHRcdGFwcGVuZFRvQm9keTogdGhpcy5jb250YWluZXIgPT09ICdib2R5Jyxcblx0XHRcdFx0XHRiYXNlQ2xhc3M6ICdicy1wb3BvdmVyJyxcblx0XHRcdFx0XHR1cGRhdGVQb3BwZXJPcHRpb25zOiAob3B0aW9ucykgPT4gdGhpcy5wb3BwZXJPcHRpb25zKGFkZFBvcHBlck9mZnNldChbMCwgOF0pKG9wdGlvbnMpKSxcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0UHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKSA9PiB7XG5cdFx0XHRcdFx0Ly8gVGhpcyB1cGRhdGUgaXMgcmVxdWlyZWQgZm9yIGNvcnJlY3QgYXJyb3cgcGxhY2VtZW50XG5cdFx0XHRcdFx0dGhpcy5fcG9zaXRpb25pbmcudXBkYXRlKCk7XG5cdFx0XHRcdFx0dGhpcy5fem9uZVN1YnNjcmlwdGlvbiA9IHRoaXMuX25nWm9uZS5vblN0YWJsZS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5fcG9zaXRpb25pbmcudXBkYXRlKCkpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXG5cdFx0XHRuZ2JBdXRvQ2xvc2UodGhpcy5fbmdab25lLCB0aGlzLl9kb2N1bWVudCwgdGhpcy5hdXRvQ2xvc2UsICgpID0+IHRoaXMuY2xvc2UoKSwgdGhpcy5oaWRkZW4sIFtcblx0XHRcdFx0dGhpcy5fd2luZG93UmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQsXG5cdFx0XHRdKTtcblxuXHRcdFx0dHJhbnNpdGlvbiQuc3Vic2NyaWJlKCgpID0+IHRoaXMuc2hvd24uZW1pdCgpKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogQ2xvc2VzIHRoZSBwb3BvdmVyLlxuXHQgKlxuXHQgKiBUaGlzIGlzIGNvbnNpZGVyZWQgdG8gYmUgYSBcIm1hbnVhbFwiIHRyaWdnZXJpbmcgb2YgdGhlIHBvcG92ZXIuXG5cdCAqL1xuXHRjbG9zZShhbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbikge1xuXHRcdGlmICh0aGlzLl93aW5kb3dSZWYpIHtcblx0XHRcdHRoaXMuX3JlbmRlcmVyLnJlbW92ZUF0dHJpYnV0ZSh0aGlzLl9nZXRQb3NpdGlvblRhcmdldEVsZW1lbnQoKSwgJ2FyaWEtZGVzY3JpYmVkYnknKTtcblx0XHRcdHRoaXMuX3BvcHVwU2VydmljZS5jbG9zZShhbmltYXRpb24pLnN1YnNjcmliZSgoKSA9PiB7XG5cdFx0XHRcdHRoaXMuX3dpbmRvd1JlZiA9IG51bGw7XG5cdFx0XHRcdHRoaXMuX3Bvc2l0aW9uaW5nLmRlc3Ryb3koKTtcblx0XHRcdFx0dGhpcy5fem9uZVN1YnNjcmlwdGlvbj8udW5zdWJzY3JpYmUoKTtcblx0XHRcdFx0dGhpcy5oaWRkZW4uZW1pdCgpO1xuXHRcdFx0XHR0aGlzLl9jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTtcblx0XHRcdH0pO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBUb2dnbGVzIHRoZSBwb3BvdmVyLlxuXHQgKlxuXHQgKiBUaGlzIGlzIGNvbnNpZGVyZWQgdG8gYmUgYSBcIm1hbnVhbFwiIHRyaWdnZXJpbmcgb2YgdGhlIHBvcG92ZXIuXG5cdCAqL1xuXHR0b2dnbGUoKTogdm9pZCB7XG5cdFx0aWYgKHRoaXMuX3dpbmRvd1JlZikge1xuXHRcdFx0dGhpcy5jbG9zZSgpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLm9wZW4oKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyBgdHJ1ZWAsIGlmIHRoZSBwb3BvdmVyIGlzIGN1cnJlbnRseSBzaG93bi5cblx0ICovXG5cdGlzT3BlbigpOiBib29sZWFuIHtcblx0XHRyZXR1cm4gdGhpcy5fd2luZG93UmVmICE9IG51bGw7XG5cdH1cblxuXHRuZ09uSW5pdCgpIHtcblx0XHR0aGlzLl91bnJlZ2lzdGVyTGlzdGVuZXJzRm4gPSBsaXN0ZW5Ub1RyaWdnZXJzKFxuXHRcdFx0dGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LFxuXHRcdFx0dGhpcy50cmlnZ2Vycyxcblx0XHRcdHRoaXMuaXNPcGVuLmJpbmQodGhpcyksXG5cdFx0XHR0aGlzLm9wZW4uYmluZCh0aGlzKSxcblx0XHRcdHRoaXMuY2xvc2UuYmluZCh0aGlzKSxcblx0XHRcdCt0aGlzLm9wZW5EZWxheSxcblx0XHRcdCt0aGlzLmNsb3NlRGVsYXksXG5cdFx0KTtcblx0fVxuXG5cdG5nT25DaGFuZ2VzKHsgbmdiUG9wb3ZlciwgcG9wb3ZlclRpdGxlLCBkaXNhYmxlUG9wb3ZlciwgcG9wb3ZlckNsYXNzIH06IFNpbXBsZUNoYW5nZXMpIHtcblx0XHRpZiAocG9wb3ZlckNsYXNzICYmIHRoaXMuaXNPcGVuKCkpIHtcblx0XHRcdHRoaXMuX3dpbmRvd1JlZiEuaW5zdGFuY2UucG9wb3ZlckNsYXNzID0gcG9wb3ZlckNsYXNzLmN1cnJlbnRWYWx1ZTtcblx0XHR9XG5cdFx0Ly8gY2xvc2UgcG9wb3ZlciBpZiB0aXRsZSBhbmQgY29udGVudCBiZWNvbWUgZW1wdHksIG9yIGRpc2FibGVQb3BvdmVyIHNldCB0byB0cnVlXG5cdFx0aWYgKChuZ2JQb3BvdmVyIHx8IHBvcG92ZXJUaXRsZSB8fCBkaXNhYmxlUG9wb3ZlcikgJiYgdGhpcy5faXNEaXNhYmxlZCgpKSB7XG5cdFx0XHR0aGlzLmNsb3NlKCk7XG5cdFx0fVxuXHR9XG5cblx0bmdPbkRlc3Ryb3koKSB7XG5cdFx0dGhpcy5jbG9zZShmYWxzZSk7XG5cdFx0Ly8gVGhpcyBjaGVjayBpcyBuZWVkZWQgYXMgaXQgbWlnaHQgaGFwcGVuIHRoYXQgbmdPbkRlc3Ryb3kgaXMgY2FsbGVkIGJlZm9yZSBuZ09uSW5pdFxuXHRcdC8vIHVuZGVyIGNlcnRhaW4gY29uZGl0aW9ucywgc2VlOiBodHRwczovL2dpdGh1Yi5jb20vbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC9pc3N1ZXMvMjE5OVxuXHRcdHRoaXMuX3VucmVnaXN0ZXJMaXN0ZW5lcnNGbj8uKCk7XG5cdH1cblxuXHRwcml2YXRlIF9nZXRQb3NpdGlvblRhcmdldEVsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xuXHRcdHJldHVybiAoXG5cdFx0XHQoaXNTdHJpbmcodGhpcy5wb3NpdGlvblRhcmdldCkgPyB0aGlzLl9kb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMucG9zaXRpb25UYXJnZXQpIDogdGhpcy5wb3NpdGlvblRhcmdldCkgfHxcblx0XHRcdHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudFxuXHRcdCk7XG5cdH1cbn1cbiJdfQ==