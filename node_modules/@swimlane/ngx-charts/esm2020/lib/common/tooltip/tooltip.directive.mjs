import { Directive, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { PlacementTypes } from './position';
import { StyleTypes } from './style.type';
import { ShowTypes } from './show.type';
import * as i0 from "@angular/core";
import * as i1 from "./tooltip.service";
export class TooltipDirective {
    constructor(tooltipService, viewContainerRef, renderer) {
        this.tooltipService = tooltipService;
        this.viewContainerRef = viewContainerRef;
        this.renderer = renderer;
        this.tooltipCssClass = '';
        this.tooltipAppendToBody = true;
        this.tooltipSpacing = 10;
        this.tooltipDisabled = false;
        this.tooltipShowCaret = true;
        this.tooltipPlacement = PlacementTypes.Top;
        this.tooltipAlignment = PlacementTypes.Center;
        this.tooltipType = StyleTypes.popover;
        this.tooltipCloseOnClickOutside = true;
        this.tooltipCloseOnMouseLeave = true;
        this.tooltipHideTimeout = 300;
        this.tooltipShowTimeout = 100;
        this.tooltipShowEvent = ShowTypes.all;
        this.tooltipImmediateExit = false;
        this.show = new EventEmitter();
        this.hide = new EventEmitter();
    }
    get listensForFocus() {
        return this.tooltipShowEvent === ShowTypes.all || this.tooltipShowEvent === ShowTypes.focus;
    }
    get listensForHover() {
        return this.tooltipShowEvent === ShowTypes.all || this.tooltipShowEvent === ShowTypes.mouseover;
    }
    ngOnDestroy() {
        this.hideTooltip(true);
    }
    onFocus() {
        if (this.listensForFocus) {
            this.showTooltip();
        }
    }
    onBlur() {
        if (this.listensForFocus) {
            this.hideTooltip(true);
        }
    }
    onMouseEnter() {
        if (this.listensForHover) {
            this.showTooltip();
        }
    }
    onMouseLeave(target) {
        if (this.listensForHover && this.tooltipCloseOnMouseLeave) {
            clearTimeout(this.timeout);
            if (this.component) {
                const contentDom = this.component.instance.element.nativeElement;
                const contains = contentDom.contains(target);
                if (contains)
                    return;
            }
            this.hideTooltip(this.tooltipImmediateExit);
        }
    }
    onMouseClick() {
        if (this.listensForHover) {
            this.hideTooltip(true);
        }
    }
    showTooltip(immediate) {
        if (this.component || this.tooltipDisabled)
            return;
        const time = immediate
            ? 0
            : this.tooltipShowTimeout + (navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) ? 400 : 0);
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            this.tooltipService.destroyAll();
            const options = this.createBoundOptions();
            this.component = this.tooltipService.create(options);
            // add a tiny timeout to avoid event re-triggers
            setTimeout(() => {
                if (this.component) {
                    this.addHideListeners(this.component.instance.element.nativeElement);
                }
            }, 10);
            this.show.emit(true);
        }, time);
    }
    addHideListeners(tooltip) {
        // on mouse enter, cancel the hide triggered by the leave
        this.mouseEnterContentEvent = this.renderer.listen(tooltip, 'mouseenter', () => {
            clearTimeout(this.timeout);
        });
        // content mouse leave listener
        if (this.tooltipCloseOnMouseLeave) {
            this.mouseLeaveContentEvent = this.renderer.listen(tooltip, 'mouseleave', () => {
                this.hideTooltip(this.tooltipImmediateExit);
            });
        }
        // content close on click outside
        if (this.tooltipCloseOnClickOutside) {
            this.documentClickEvent = this.renderer.listen('window', 'click', event => {
                const contains = tooltip.contains(event.target);
                if (!contains)
                    this.hideTooltip();
            });
        }
    }
    hideTooltip(immediate = false) {
        if (!this.component)
            return;
        const destroyFn = () => {
            // remove events
            if (this.mouseLeaveContentEvent)
                this.mouseLeaveContentEvent();
            if (this.mouseEnterContentEvent)
                this.mouseEnterContentEvent();
            if (this.documentClickEvent)
                this.documentClickEvent();
            // emit events
            this.hide.emit(true);
            // destroy component
            this.tooltipService.destroy(this.component);
            this.component = undefined;
        };
        clearTimeout(this.timeout);
        if (!immediate) {
            this.timeout = setTimeout(destroyFn, this.tooltipHideTimeout);
        }
        else {
            destroyFn();
        }
    }
    createBoundOptions() {
        return {
            title: this.tooltipTitle,
            template: this.tooltipTemplate,
            host: this.viewContainerRef.element,
            placement: this.tooltipPlacement,
            alignment: this.tooltipAlignment,
            type: this.tooltipType,
            showCaret: this.tooltipShowCaret,
            cssClass: this.tooltipCssClass,
            spacing: this.tooltipSpacing,
            context: this.tooltipContext
        };
    }
}
TooltipDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: TooltipDirective, deps: [{ token: i1.TooltipService }, { token: i0.ViewContainerRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Directive });
TooltipDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.0", type: TooltipDirective, selector: "[ngx-tooltip]", inputs: { tooltipCssClass: "tooltipCssClass", tooltipTitle: "tooltipTitle", tooltipAppendToBody: "tooltipAppendToBody", tooltipSpacing: "tooltipSpacing", tooltipDisabled: "tooltipDisabled", tooltipShowCaret: "tooltipShowCaret", tooltipPlacement: "tooltipPlacement", tooltipAlignment: "tooltipAlignment", tooltipType: "tooltipType", tooltipCloseOnClickOutside: "tooltipCloseOnClickOutside", tooltipCloseOnMouseLeave: "tooltipCloseOnMouseLeave", tooltipHideTimeout: "tooltipHideTimeout", tooltipShowTimeout: "tooltipShowTimeout", tooltipTemplate: "tooltipTemplate", tooltipShowEvent: "tooltipShowEvent", tooltipContext: "tooltipContext", tooltipImmediateExit: "tooltipImmediateExit" }, outputs: { show: "show", hide: "hide" }, host: { listeners: { "focusin": "onFocus()", "blur": "onBlur()", "mouseenter": "onMouseEnter()", "mouseleave": "onMouseLeave($event.target)", "click": "onMouseClick()" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: TooltipDirective, decorators: [{
            type: Directive,
            args: [{ selector: '[ngx-tooltip]' }]
        }], ctorParameters: function () { return [{ type: i1.TooltipService }, { type: i0.ViewContainerRef }, { type: i0.Renderer2 }]; }, propDecorators: { tooltipCssClass: [{
                type: Input
            }], tooltipTitle: [{
                type: Input
            }], tooltipAppendToBody: [{
                type: Input
            }], tooltipSpacing: [{
                type: Input
            }], tooltipDisabled: [{
                type: Input
            }], tooltipShowCaret: [{
                type: Input
            }], tooltipPlacement: [{
                type: Input
            }], tooltipAlignment: [{
                type: Input
            }], tooltipType: [{
                type: Input
            }], tooltipCloseOnClickOutside: [{
                type: Input
            }], tooltipCloseOnMouseLeave: [{
                type: Input
            }], tooltipHideTimeout: [{
                type: Input
            }], tooltipShowTimeout: [{
                type: Input
            }], tooltipTemplate: [{
                type: Input
            }], tooltipShowEvent: [{
                type: Input
            }], tooltipContext: [{
                type: Input
            }], tooltipImmediateExit: [{
                type: Input
            }], show: [{
                type: Output
            }], hide: [{
                type: Output
            }], onFocus: [{
                type: HostListener,
                args: ['focusin']
            }], onBlur: [{
                type: HostListener,
                args: ['blur']
            }], onMouseEnter: [{
                type: HostListener,
                args: ['mouseenter']
            }], onMouseLeave: [{
                type: HostListener,
                args: ['mouseleave', ['$event.target']]
            }], onMouseClick: [{
                type: HostListener,
                args: ['click']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zd2ltbGFuZS9uZ3gtY2hhcnRzL3NyYy9saWIvY29tbW9uL3Rvb2x0aXAvdG9vbHRpcC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFDWixZQUFZLEVBTWIsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUM1QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQzFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxhQUFhLENBQUM7OztBQUt4QyxNQUFNLE9BQU8sZ0JBQWdCO0lBb0MzQixZQUNVLGNBQThCLEVBQzlCLGdCQUFrQyxFQUNsQyxRQUFtQjtRQUZuQixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBdENwQixvQkFBZSxHQUFXLEVBQUUsQ0FBQztRQUU3Qix3QkFBbUIsR0FBWSxJQUFJLENBQUM7UUFDcEMsbUJBQWMsR0FBVyxFQUFFLENBQUM7UUFDNUIsb0JBQWUsR0FBWSxLQUFLLENBQUM7UUFDakMscUJBQWdCLEdBQVksSUFBSSxDQUFDO1FBQ2pDLHFCQUFnQixHQUFtQixjQUFjLENBQUMsR0FBRyxDQUFDO1FBQ3RELHFCQUFnQixHQUFtQixjQUFjLENBQUMsTUFBTSxDQUFDO1FBQ3pELGdCQUFXLEdBQWUsVUFBVSxDQUFDLE9BQU8sQ0FBQztRQUM3QywrQkFBMEIsR0FBWSxJQUFJLENBQUM7UUFDM0MsNkJBQXdCLEdBQVksSUFBSSxDQUFDO1FBQ3pDLHVCQUFrQixHQUFXLEdBQUcsQ0FBQztRQUNqQyx1QkFBa0IsR0FB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dmUsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgSG9zdExpc3RlbmVyLFxuICBWaWV3Q29udGFpbmVyUmVmLFxuICBSZW5kZXJlcjIsXG4gIE9uRGVzdHJveSxcbiAgVGVtcGxhdGVSZWYsXG4gIENvbXBvbmVudFJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgUGxhY2VtZW50VHlwZXMgfSBmcm9tICcuL3Bvc2l0aW9uJztcbmltcG9ydCB7IFN0eWxlVHlwZXMgfSBmcm9tICcuL3N0eWxlLnR5cGUnO1xuaW1wb3J0IHsgU2hvd1R5cGVzIH0gZnJvbSAnLi9zaG93LnR5cGUnO1xuXG5pbXBvcnQgeyBUb29sdGlwU2VydmljZSB9IGZyb20gJy4vdG9vbHRpcC5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW25neC10b29sdGlwXScgfSlcbmV4cG9ydCBjbGFzcyBUb29sdGlwRGlyZWN0aXZlIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgQElucHV0KCkgdG9vbHRpcENzc0NsYXNzOiBzdHJpbmcgPSAnJztcbiAgQElucHV0KCkgdG9vbHRpcFRpdGxlPzogc3RyaW5nO1xuICBASW5wdXQoKSB0b29sdGlwQXBwZW5kVG9Cb2R5OiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCkgdG9vbHRpcFNwYWNpbmc6IG51bWJlciA9IDEwO1xuICBASW5wdXQoKSB0b29sdGlwRGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgdG9vbHRpcFNob3dDYXJldDogYm9vbGVhbiA9IHRydWU7XG4gIEBJbnB1dCgpIHRvb2x0aXBQbGFjZW1lbnQ6IFBsYWNlbWVudFR5cGVzID0gUGxhY2VtZW50VHlwZXMuVG9wO1xuICBASW5wdXQoKSB0b29sdGlwQWxpZ25tZW50OiBQbGFjZW1lbnRUeXBlcyA9IFBsYWNlbWVudFR5cGVzLkNlbnRlcjtcbiAgQElucHV0KCkgdG9vbHRpcFR5cGU6IFN0eWxlVHlwZXMgPSBTdHlsZVR5cGVzLnBvcG92ZXI7XG4gIEBJbnB1dCgpIHRvb2x0aXBDbG9zZU9uQ2xpY2tPdXRzaWRlOiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCkgdG9vbHRpcENsb3NlT25Nb3VzZUxlYXZlOiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCkgdG9vbHRpcEhpZGVUaW1lb3V0OiBudW1iZXIgPSAzMDA7XG4gIEBJbnB1dCgpIHRvb2x0aXBTaG93VGltZW91dDogbnVtYmVyID0gMTAwO1xuICBASW5wdXQoKSB0b29sdGlwVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG4gIEBJbnB1dCgpIHRvb2x0aXBTaG93RXZlbnQ6IFNob3dUeXBlcyA9IFNob3dUeXBlcy5hbGw7XG4gIEBJbnB1dCgpIHRvb2x0aXBDb250ZXh0OiBhbnk7XG4gIEBJbnB1dCgpIHRvb2x0aXBJbW1lZGlhdGVFeGl0OiBib29sZWFuID0gZmFsc2U7XG5cbiAgQE91dHB1dCgpIHNob3c6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGhpZGU6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBwcml2YXRlIGdldCBsaXN0ZW5zRm9yRm9jdXMoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMudG9vbHRpcFNob3dFdmVudCA9PT0gU2hvd1R5cGVzLmFsbCB8fCB0aGlzLnRvb2x0aXBTaG93RXZlbnQgPT09IFNob3dUeXBlcy5mb2N1cztcbiAgfVxuXG4gIHByaXZhdGUgZ2V0IGxpc3RlbnNGb3JIb3ZlcigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy50b29sdGlwU2hvd0V2ZW50ID09PSBTaG93VHlwZXMuYWxsIHx8IHRoaXMudG9vbHRpcFNob3dFdmVudCA9PT0gU2hvd1R5cGVzLm1vdXNlb3ZlcjtcbiAgfVxuXG4gIHByaXZhdGUgY29tcG9uZW50OiBDb21wb25lbnRSZWY8YW55PjtcbiAgcHJpdmF0ZSB0aW1lb3V0OiBSZXR1cm5UeXBlPHR5cGVvZiBzZXRUaW1lb3V0PjtcbiAgcHJpdmF0ZSBtb3VzZUxlYXZlQ29udGVudEV2ZW50OiBhbnk7XG4gIHByaXZhdGUgbW91c2VFbnRlckNvbnRlbnRFdmVudDogYW55O1xuICBwcml2YXRlIGRvY3VtZW50Q2xpY2tFdmVudDogYW55O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgdG9vbHRpcFNlcnZpY2U6IFRvb2x0aXBTZXJ2aWNlLFxuICAgIHByaXZhdGUgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZixcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjJcbiAgKSB7fVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuaGlkZVRvb2x0aXAodHJ1ZSk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdmb2N1c2luJylcbiAgb25Gb2N1cygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5saXN0ZW5zRm9yRm9jdXMpIHtcbiAgICAgIHRoaXMuc2hvd1Rvb2x0aXAoKTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdibHVyJylcbiAgb25CbHVyKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmxpc3RlbnNGb3JGb2N1cykge1xuICAgICAgdGhpcy5oaWRlVG9vbHRpcCh0cnVlKTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdtb3VzZWVudGVyJylcbiAgb25Nb3VzZUVudGVyKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmxpc3RlbnNGb3JIb3Zlcikge1xuICAgICAgdGhpcy5zaG93VG9vbHRpcCgpO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCBbJyRldmVudC50YXJnZXQnXSlcbiAgb25Nb3VzZUxlYXZlKHRhcmdldCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmxpc3RlbnNGb3JIb3ZlciAmJiB0aGlzLnRvb2x0aXBDbG9zZU9uTW91c2VMZWF2ZSkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dCk7XG5cbiAgICAgIGlmICh0aGlzLmNvbXBvbmVudCkge1xuICAgICAgICBjb25zdCBjb250ZW50RG9tID0gdGhpcy5jb21wb25lbnQuaW5zdGFuY2UuZWxlbWVudC5uYXRpdmVFbGVtZW50O1xuICAgICAgICBjb25zdCBjb250YWlucyA9IGNvbnRlbnREb20uY29udGFpbnModGFyZ2V0KTtcbiAgICAgICAgaWYgKGNvbnRhaW5zKSByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHRoaXMuaGlkZVRvb2x0aXAodGhpcy50b29sdGlwSW1tZWRpYXRlRXhpdCk7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snKVxuICBvbk1vdXNlQ2xpY2soKSB7XG4gICAgaWYgKHRoaXMubGlzdGVuc0ZvckhvdmVyKSB7XG4gICAgICB0aGlzLmhpZGVUb29sdGlwKHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIHNob3dUb29sdGlwKGltbWVkaWF0ZT86IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBpZiAodGhpcy5jb21wb25lbnQgfHwgdGhpcy50b29sdGlwRGlzYWJsZWQpIHJldHVybjtcblxuICAgIGNvbnN0IHRpbWUgPSBpbW1lZGlhdGVcbiAgICAgID8gMFxuICAgICAgOiB0aGlzLnRvb2x0aXBTaG93VGltZW91dCArIChuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9cXChpW147XSs7KCBVOyk/IENQVS4rTWFjIE9TIFgvKSA/IDQwMCA6IDApO1xuXG4gICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dCk7XG4gICAgdGhpcy50aW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLnRvb2x0aXBTZXJ2aWNlLmRlc3Ryb3lBbGwoKTtcblxuICAgICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMuY3JlYXRlQm91bmRPcHRpb25zKCk7XG4gICAgICB0aGlzLmNvbXBvbmVudCA9IHRoaXMudG9vbHRpcFNlcnZpY2UuY3JlYXRlKG9wdGlvbnMpO1xuXG4gICAgICAvLyBhZGQgYSB0aW55IHRpbWVvdXQgdG8gYXZvaWQgZXZlbnQgcmUtdHJpZ2dlcnNcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5jb21wb25lbnQpIHtcbiAgICAgICAgICB0aGlzLmFkZEhpZGVMaXN0ZW5lcnModGhpcy5jb21wb25lbnQuaW5zdGFuY2UuZWxlbWVudC5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgfVxuICAgICAgfSwgMTApO1xuXG4gICAgICB0aGlzLnNob3cuZW1pdCh0cnVlKTtcbiAgICB9LCB0aW1lKTtcbiAgfVxuXG4gIGFkZEhpZGVMaXN0ZW5lcnModG9vbHRpcDogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICAvLyBvbiBtb3VzZSBlbnRlciwgY2FuY2VsIHRoZSBoaWRlIHRyaWdnZXJlZCBieSB0aGUgbGVhdmVcbiAgICB0aGlzLm1vdXNlRW50ZXJDb250ZW50RXZlbnQgPSB0aGlzLnJlbmRlcmVyLmxpc3Rlbih0b29sdGlwLCAnbW91c2VlbnRlcicsICgpID0+IHtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXQpO1xuICAgIH0pO1xuXG4gICAgLy8gY29udGVudCBtb3VzZSBsZWF2ZSBsaXN0ZW5lclxuICAgIGlmICh0aGlzLnRvb2x0aXBDbG9zZU9uTW91c2VMZWF2ZSkge1xuICAgICAgdGhpcy5tb3VzZUxlYXZlQ29udGVudEV2ZW50ID0gdGhpcy5yZW5kZXJlci5saXN0ZW4odG9vbHRpcCwgJ21vdXNlbGVhdmUnLCAoKSA9PiB7XG4gICAgICAgIHRoaXMuaGlkZVRvb2x0aXAodGhpcy50b29sdGlwSW1tZWRpYXRlRXhpdCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBjb250ZW50IGNsb3NlIG9uIGNsaWNrIG91dHNpZGVcbiAgICBpZiAodGhpcy50b29sdGlwQ2xvc2VPbkNsaWNrT3V0c2lkZSkge1xuICAgICAgdGhpcy5kb2N1bWVudENsaWNrRXZlbnQgPSB0aGlzLnJlbmRlcmVyLmxpc3Rlbignd2luZG93JywgJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgICBjb25zdCBjb250YWlucyA9IHRvb2x0aXAuY29udGFpbnMoZXZlbnQudGFyZ2V0KTtcbiAgICAgICAgaWYgKCFjb250YWlucykgdGhpcy5oaWRlVG9vbHRpcCgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgaGlkZVRvb2x0aXAoaW1tZWRpYXRlOiBib29sZWFuID0gZmFsc2UpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuY29tcG9uZW50KSByZXR1cm47XG5cbiAgICBjb25zdCBkZXN0cm95Rm4gPSAoKSA9PiB7XG4gICAgICAvLyByZW1vdmUgZXZlbnRzXG4gICAgICBpZiAodGhpcy5tb3VzZUxlYXZlQ29udGVudEV2ZW50KSB0aGlzLm1vdXNlTGVhdmVDb250ZW50RXZlbnQoKTtcbiAgICAgIGlmICh0aGlzLm1vdXNlRW50ZXJDb250ZW50RXZlbnQpIHRoaXMubW91c2VFbnRlckNvbnRlbnRFdmVudCgpO1xuICAgICAgaWYgKHRoaXMuZG9jdW1lbnRDbGlja0V2ZW50KSB0aGlzLmRvY3VtZW50Q2xpY2tFdmVudCgpO1xuXG4gICAgICAvLyBlbWl0IGV2ZW50c1xuICAgICAgdGhpcy5oaWRlLmVtaXQodHJ1ZSk7XG5cbiAgICAgIC8vIGRlc3Ryb3kgY29tcG9uZW50XG4gICAgICB0aGlzLnRvb2x0aXBTZXJ2aWNlLmRlc3Ryb3kodGhpcy5jb21wb25lbnQpO1xuICAgICAgdGhpcy5jb21wb25lbnQgPSB1bmRlZmluZWQ7XG4gICAgfTtcblxuICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXQpO1xuICAgIGlmICghaW1tZWRpYXRlKSB7XG4gICAgICB0aGlzLnRpbWVvdXQgPSBzZXRUaW1lb3V0KGRlc3Ryb3lGbiwgdGhpcy50b29sdGlwSGlkZVRpbWVvdXQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkZXN0cm95Rm4oKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZUJvdW5kT3B0aW9ucygpOiBhbnkge1xuICAgIHJldHVybiB7XG4gICAgICB0aXRsZTogdGhpcy50b29sdGlwVGl0bGUsXG4gICAgICB0ZW1wbGF0ZTogdGhpcy50b29sdGlwVGVtcGxhdGUsXG4gICAgICBob3N0OiB0aGlzLnZpZXdDb250YWluZXJSZWYuZWxlbWVudCxcbiAgICAgIHBsYWNlbWVudDogdGhpcy50b29sdGlwUGxhY2VtZW50LFxuICAgICAgYWxpZ25tZW50OiB0aGlzLnRvb2x0aXBBbGlnbm1lbnQsXG4gICAgICB0eXBlOiB0aGlzLnRvb2x0aXBUeXBlLFxuICAgICAgc2hvd0NhcmV0OiB0aGlzLnRvb2x0aXBTaG93Q2FyZXQsXG4gICAgICBjc3NDbGFzczogdGhpcy50b29sdGlwQ3NzQ2xhc3MsXG4gICAgICBzcGFjaW5nOiB0aGlzLnRvb2x0aXBTcGFjaW5nLFxuICAgICAgY29udGV4dDogdGhpcy50b29sdGlwQ29udGV4dFxuICAgIH07XG4gIH1cbn1cbiJdfQ==