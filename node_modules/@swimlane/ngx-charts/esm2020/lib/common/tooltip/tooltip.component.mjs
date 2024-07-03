import { __decorate } from "tslib";
import { Input, Component, ViewEncapsulation, HostListener, ViewChild, HostBinding, PLATFORM_ID, Inject } from '@angular/core';
import { throttleable } from '../../utils/throttle';
import { PositionHelper } from './position';
import { isPlatformBrowser } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class TooltipContentComponent {
    constructor(element, renderer, platformId) {
        this.element = element;
        this.renderer = renderer;
        this.platformId = platformId;
    }
    get cssClasses() {
        let clz = 'ngx-charts-tooltip-content';
        clz += ` position-${this.placement}`;
        clz += ` type-${this.type}`;
        clz += ` ${this.cssClass}`;
        return clz;
    }
    ngAfterViewInit() {
        setTimeout(this.position.bind(this));
    }
    position() {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }
        const nativeElm = this.element.nativeElement;
        const hostDim = this.host.nativeElement.getBoundingClientRect();
        // if no dims were found, never show
        if (!hostDim.height && !hostDim.width)
            return;
        const elmDim = nativeElm.getBoundingClientRect();
        this.checkFlip(hostDim, elmDim);
        this.positionContent(nativeElm, hostDim, elmDim);
        if (this.showCaret) {
            this.positionCaret(hostDim, elmDim);
        }
        // animate its entry
        setTimeout(() => this.renderer.addClass(nativeElm, 'animate'), 1);
    }
    positionContent(nativeElm, hostDim, elmDim) {
        const { top, left } = PositionHelper.positionContent(this.placement, elmDim, hostDim, this.spacing, this.alignment);
        this.renderer.setStyle(nativeElm, 'top', `${top}px`);
        this.renderer.setStyle(nativeElm, 'left', `${left}px`);
    }
    positionCaret(hostDim, elmDim) {
        const caretElm = this.caretElm.nativeElement;
        const caretDimensions = caretElm.getBoundingClientRect();
        const { top, left } = PositionHelper.positionCaret(this.placement, elmDim, hostDim, caretDimensions, this.alignment);
        this.renderer.setStyle(caretElm, 'top', `${top}px`);
        this.renderer.setStyle(caretElm, 'left', `${left}px`);
    }
    checkFlip(hostDim, elmDim) {
        this.placement = PositionHelper.determinePlacement(this.placement, elmDim, hostDim, this.spacing);
    }
    onWindowResize() {
        this.position();
    }
}
TooltipContentComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: TooltipContentComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: PLATFORM_ID }], target: i0.ɵɵFactoryTarget.Component });
TooltipContentComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.0", type: TooltipContentComponent, selector: "ngx-tooltip-content", inputs: { host: "host", showCaret: "showCaret", type: "type", placement: "placement", alignment: "alignment", spacing: "spacing", cssClass: "cssClass", title: "title", template: "template", context: "context" }, host: { listeners: { "window:resize": "onWindowResize()" }, properties: { "class": "this.cssClasses" } }, viewQueries: [{ propertyName: "caretElm", first: true, predicate: ["caretElm"], descendants: true }], ngImport: i0, template: `
    <div>
      <span #caretElm [hidden]="!showCaret" class="tooltip-caret position-{{ this.placement }}"> </span>
      <div class="tooltip-content">
        <span *ngIf="!title">
          <ng-template [ngTemplateOutlet]="template" [ngTemplateOutletContext]="{ model: context }"> </ng-template>
        </span>
        <span *ngIf="title" [innerHTML]="title"> </span>
      </div>
    </div>
  `, isInline: true, styles: [".ngx-charts-tooltip-content{position:fixed;border-radius:3px;z-index:5000;display:block;font-weight:400;opacity:0;pointer-events:none!important}.ngx-charts-tooltip-content.type-popover{background:#fff;color:#060709;border:1px solid #72809b;box-shadow:0 1px 3px #0003,0 1px 1px #00000024,0 2px 1px -1px #0000001f;font-size:13px;padding:4px}.ngx-charts-tooltip-content.type-popover .tooltip-caret{position:absolute;z-index:5001;width:0;height:0}.ngx-charts-tooltip-content.type-popover .tooltip-caret.position-left{border-top:7px solid transparent;border-bottom:7px solid transparent;border-left:7px solid #fff}.ngx-charts-tooltip-content.type-popover .tooltip-caret.position-top{border-left:7px solid transparent;border-right:7px solid transparent;border-top:7px solid #fff}.ngx-charts-tooltip-content.type-popover .tooltip-caret.position-right{border-top:7px solid transparent;border-bottom:7px solid transparent;border-right:7px solid #fff}.ngx-charts-tooltip-content.type-popover .tooltip-caret.position-bottom{border-left:7px solid transparent;border-right:7px solid transparent;border-bottom:7px solid #fff}.ngx-charts-tooltip-content.type-tooltip{color:#fff;background:rgba(0,0,0,.75);font-size:12px;padding:0 10px;text-align:center;pointer-events:auto}.ngx-charts-tooltip-content.type-tooltip .tooltip-caret.position-left{border-top:7px solid transparent;border-bottom:7px solid transparent;border-left:7px solid rgba(0,0,0,.75)}.ngx-charts-tooltip-content.type-tooltip .tooltip-caret.position-top{border-left:7px solid transparent;border-right:7px solid transparent;border-top:7px solid rgba(0,0,0,.75)}.ngx-charts-tooltip-content.type-tooltip .tooltip-caret.position-right{border-top:7px solid transparent;border-bottom:7px solid transparent;border-right:7px solid rgba(0,0,0,.75)}.ngx-charts-tooltip-content.type-tooltip .tooltip-caret.position-bottom{border-left:7px solid transparent;border-right:7px solid transparent;border-bottom:7px solid rgba(0,0,0,.75)}.ngx-charts-tooltip-content .tooltip-label{display:block;line-height:1em;padding:8px 5px 5px;font-size:1em}.ngx-charts-tooltip-content .tooltip-val{display:block;font-size:1.3em;line-height:1em;padding:0 5px 8px}.ngx-charts-tooltip-content .tooltip-caret{position:absolute;z-index:5001;width:0;height:0}.ngx-charts-tooltip-content.position-right{transform:translate(10px)}.ngx-charts-tooltip-content.position-left{transform:translate(-10px)}.ngx-charts-tooltip-content.position-top{transform:translateY(-10px)}.ngx-charts-tooltip-content.position-bottom{transform:translateY(10px)}.ngx-charts-tooltip-content.animate{opacity:1;transition:opacity .3s,transform .3s;transform:translate(0);pointer-events:auto}.area-tooltip-container{padding:5px 0;pointer-events:none}.tooltip-item{text-align:left;line-height:1.2em;padding:5px 0}.tooltip-item .tooltip-item-color{display:inline-block;height:12px;width:12px;margin-right:5px;color:#5b646b;border-radius:3px}\n"], directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], encapsulation: i0.ViewEncapsulation.None });
__decorate([
    throttleable(100)
], TooltipContentComponent.prototype, "onWindowResize", null);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: TooltipContentComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ngx-tooltip-content', template: `
    <div>
      <span #caretElm [hidden]="!showCaret" class="tooltip-caret position-{{ this.placement }}"> </span>
      <div class="tooltip-content">
        <span *ngIf="!title">
          <ng-template [ngTemplateOutlet]="template" [ngTemplateOutletContext]="{ model: context }"> </ng-template>
        </span>
        <span *ngIf="title" [innerHTML]="title"> </span>
      </div>
    </div>
  `, encapsulation: ViewEncapsulation.None, styles: [".ngx-charts-tooltip-content{position:fixed;border-radius:3px;z-index:5000;display:block;font-weight:400;opacity:0;pointer-events:none!important}.ngx-charts-tooltip-content.type-popover{background:#fff;color:#060709;border:1px solid #72809b;box-shadow:0 1px 3px #0003,0 1px 1px #00000024,0 2px 1px -1px #0000001f;font-size:13px;padding:4px}.ngx-charts-tooltip-content.type-popover .tooltip-caret{position:absolute;z-index:5001;width:0;height:0}.ngx-charts-tooltip-content.type-popover .tooltip-caret.position-left{border-top:7px solid transparent;border-bottom:7px solid transparent;border-left:7px solid #fff}.ngx-charts-tooltip-content.type-popover .tooltip-caret.position-top{border-left:7px solid transparent;border-right:7px solid transparent;border-top:7px solid #fff}.ngx-charts-tooltip-content.type-popover .tooltip-caret.position-right{border-top:7px solid transparent;border-bottom:7px solid transparent;border-right:7px solid #fff}.ngx-charts-tooltip-content.type-popover .tooltip-caret.position-bottom{border-left:7px solid transparent;border-right:7px solid transparent;border-bottom:7px solid #fff}.ngx-charts-tooltip-content.type-tooltip{color:#fff;background:rgba(0,0,0,.75);font-size:12px;padding:0 10px;text-align:center;pointer-events:auto}.ngx-charts-tooltip-content.type-tooltip .tooltip-caret.position-left{border-top:7px solid transparent;border-bottom:7px solid transparent;border-left:7px solid rgba(0,0,0,.75)}.ngx-charts-tooltip-content.type-tooltip .tooltip-caret.position-top{border-left:7px solid transparent;border-right:7px solid transparent;border-top:7px solid rgba(0,0,0,.75)}.ngx-charts-tooltip-content.type-tooltip .tooltip-caret.position-right{border-top:7px solid transparent;border-bottom:7px solid transparent;border-right:7px solid rgba(0,0,0,.75)}.ngx-charts-tooltip-content.type-tooltip .tooltip-caret.position-bottom{border-left:7px solid transparent;border-right:7px solid transparent;border-bottom:7px solid rgba(0,0,0,.75)}.ngx-charts-tooltip-content .tooltip-label{display:block;line-height:1em;padding:8px 5px 5px;font-size:1em}.ngx-charts-tooltip-content .tooltip-val{display:block;font-size:1.3em;line-height:1em;padding:0 5px 8px}.ngx-charts-tooltip-content .tooltip-caret{position:absolute;z-index:5001;width:0;height:0}.ngx-charts-tooltip-content.position-right{transform:translate(10px)}.ngx-charts-tooltip-content.position-left{transform:translate(-10px)}.ngx-charts-tooltip-content.position-top{transform:translateY(-10px)}.ngx-charts-tooltip-content.position-bottom{transform:translateY(10px)}.ngx-charts-tooltip-content.animate{opacity:1;transition:opacity .3s,transform .3s;transform:translate(0);pointer-events:auto}.area-tooltip-container{padding:5px 0;pointer-events:none}.tooltip-item{text-align:left;line-height:1.2em;padding:5px 0}.tooltip-item .tooltip-item-color{display:inline-block;height:12px;width:12px;margin-right:5px;color:#5b646b;border-radius:3px}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }]; }, propDecorators: { host: [{
                type: Input
            }], showCaret: [{
                type: Input
            }], type: [{
                type: Input
            }], placement: [{
                type: Input
            }], alignment: [{
                type: Input
            }], spacing: [{
                type: Input
            }], cssClass: [{
                type: Input
            }], title: [{
                type: Input
            }], template: [{
                type: Input
            }], context: [{
                type: Input
            }], caretElm: [{
                type: ViewChild,
                args: ['caretElm']
            }], cssClasses: [{
                type: HostBinding,
                args: ['class']
            }], onWindowResize: [{
                type: HostListener,
                args: ['window:resize']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zd2ltbGFuZS9uZ3gtY2hhcnRzL3NyYy9saWIvY29tbW9uL3Rvb2x0aXAvdG9vbHRpcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxLQUFLLEVBQ0wsU0FBUyxFQUdULGlCQUFpQixFQUNqQixZQUFZLEVBQ1osU0FBUyxFQUNULFdBQVcsRUFFWCxXQUFXLEVBQ1gsTUFBTSxFQUVQLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNwRCxPQUFPLEVBQUUsY0FBYyxFQUFrQixNQUFNLFlBQVksQ0FBQztBQUc1RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7O0FBa0JwRCxNQUFNLE9BQU8sdUJBQXVCO0lBdUJsQyxZQUFtQixPQUFtQixFQUFVLFFBQW1CLEVBQStCLFVBQWU7UUFBOUYsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUFVLGFBQVEsR0FBUixRQUFRLENBQVc7UUFBK0IsZUFBVSxHQUFWLFVBQVUsQ0FBSztJQUFHLENBQUM7SUFUckgsSUFDSSxVQUFVO1FBQ1osSUFBSSxHQUFHLEdBQUcsNEJBQTRCLENBQUM7UUFDdkMsR0FBRyxJQUFJLGFBQWEsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3JDLEdBQUcsSUFBSSxTQUFTLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUM1QixHQUFHLElBQUksSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDM0IsT0FBTyxHQUFHLENBQUM7SUFDYixDQUFDO0lBSUQsZUFBZTtRQUNiLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxRQUFR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O0dBVVQsaUJBQ2MsaUJBQWlCLENBQUMsSUFBSTs7MEJBMEJpQyxNQUFNOzJCQUFDLFdBQVc7NENBdEIvRSxJQUFJO3NCQUFaLEtBQUs7Z0JBQ0csU0FBUztzQkFBakIsS0FBSztnQkFDRyxJQUFJO3NCQUFaLEtBQUs7Z0JBQ0csU0FBUztzQkFBakIsS0FBSztnQkFDRyxTQUFTO3NCQUFqQixLQUFLO2dCQUNHLE9BQU87c0JBQWYsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUNHLEtBQUs7c0JBQWIsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUNHLE9BQU87c0JBQWYsS0FBSztnQkFFaUIsUUFBUTtzQkFBOUIsU0FBUzt1QkFBQyxVQUFVO2dCQUdqQixVQUFVO3NCQURiLFdBQVc7dUJBQUMsT0FBTztnQkFrRXBCLGNBQWM7c0JBRmIsWUFBWTt1QkFBQyxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgSW5wdXQsXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG4gIEhvc3RMaXN0ZW5lcixcbiAgVmlld0NoaWxkLFxuICBIb3N0QmluZGluZyxcbiAgUmVuZGVyZXIyLFxuICBQTEFURk9STV9JRCxcbiAgSW5qZWN0LFxuICBUZW1wbGF0ZVJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgdGhyb3R0bGVhYmxlIH0gZnJvbSAnLi4vLi4vdXRpbHMvdGhyb3R0bGUnO1xuaW1wb3J0IHsgUG9zaXRpb25IZWxwZXIsIFBsYWNlbWVudFR5cGVzIH0gZnJvbSAnLi9wb3NpdGlvbic7XG5cbmltcG9ydCB7IFN0eWxlVHlwZXMgfSBmcm9tICcuL3N0eWxlLnR5cGUnO1xuaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZ3gtdG9vbHRpcC1jb250ZW50JyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2PlxuICAgICAgPHNwYW4gI2NhcmV0RWxtIFtoaWRkZW5dPVwiIXNob3dDYXJldFwiIGNsYXNzPVwidG9vbHRpcC1jYXJldCBwb3NpdGlvbi17eyB0aGlzLnBsYWNlbWVudCB9fVwiPiA8L3NwYW4+XG4gICAgICA8ZGl2IGNsYXNzPVwidG9vbHRpcC1jb250ZW50XCI+XG4gICAgICAgIDxzcGFuICpuZ0lmPVwiIXRpdGxlXCI+XG4gICAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInRlbXBsYXRlXCIgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cInsgbW9kZWw6IGNvbnRleHQgfVwiPiA8L25nLXRlbXBsYXRlPlxuICAgICAgICA8L3NwYW4+XG4gICAgICAgIDxzcGFuICpuZ0lmPVwidGl0bGVcIiBbaW5uZXJIVE1MXT1cInRpdGxlXCI+IDwvc3Bhbj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICBgLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBzdHlsZVVybHM6IFsnLi90b29sdGlwLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgVG9vbHRpcENvbnRlbnRDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcbiAgQElucHV0KCkgaG9zdDogRWxlbWVudFJlZjtcbiAgQElucHV0KCkgc2hvd0NhcmV0OiBib29sZWFuO1xuICBASW5wdXQoKSB0eXBlOiBTdHlsZVR5cGVzO1xuICBASW5wdXQoKSBwbGFjZW1lbnQ6IFBsYWNlbWVudFR5cGVzO1xuICBASW5wdXQoKSBhbGlnbm1lbnQ6IFBsYWNlbWVudFR5cGVzO1xuICBASW5wdXQoKSBzcGFjaW5nOiBudW1iZXI7XG4gIEBJbnB1dCgpIGNzc0NsYXNzOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHRpdGxlOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuICBASW5wdXQoKSBjb250ZXh0OiBhbnk7XG5cbiAgQFZpZXdDaGlsZCgnY2FyZXRFbG0nKSBjYXJldEVsbTogRWxlbWVudFJlZjtcblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzJylcbiAgZ2V0IGNzc0NsYXNzZXMoKTogc3RyaW5nIHtcbiAgICBsZXQgY2x6ID0gJ25neC1jaGFydHMtdG9vbHRpcC1jb250ZW50JztcbiAgICBjbHogKz0gYCBwb3NpdGlvbi0ke3RoaXMucGxhY2VtZW50fWA7XG4gICAgY2x6ICs9IGAgdHlwZS0ke3RoaXMudHlwZX1gO1xuICAgIGNseiArPSBgICR7dGhpcy5jc3NDbGFzc31gO1xuICAgIHJldHVybiBjbHo7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudDogRWxlbWVudFJlZiwgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLCBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQ6IGFueSkge31cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgc2V0VGltZW91dCh0aGlzLnBvc2l0aW9uLmJpbmQodGhpcykpO1xuICB9XG5cbiAgcG9zaXRpb24oKTogdm9pZCB7XG4gICAgaWYgKCFpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgbmF0aXZlRWxtID0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gICAgY29uc3QgaG9zdERpbSA9IHRoaXMuaG9zdC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgLy8gaWYgbm8gZGltcyB3ZXJlIGZvdW5kLCBuZXZlciBzaG93XG4gICAgaWYgKCFob3N0RGltLmhlaWdodCAmJiAhaG9zdERpbS53aWR0aCkgcmV0dXJuO1xuXG4gICAgY29uc3QgZWxtRGltID0gbmF0aXZlRWxtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIHRoaXMuY2hlY2tGbGlwKGhvc3REaW0sIGVsbURpbSk7XG4gICAgdGhpcy5wb3NpdGlvbkNvbnRlbnQobmF0aXZlRWxtLCBob3N0RGltLCBlbG1EaW0pO1xuXG4gICAgaWYgKHRoaXMuc2hvd0NhcmV0KSB7XG4gICAgICB0aGlzLnBvc2l0aW9uQ2FyZXQoaG9zdERpbSwgZWxtRGltKTtcbiAgICB9XG5cbiAgICAvLyBhbmltYXRlIGl0cyBlbnRyeVxuICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhuYXRpdmVFbG0sICdhbmltYXRlJyksIDEpO1xuICB9XG5cbiAgcG9zaXRpb25Db250ZW50KG5hdGl2ZUVsbTogSFRNTEVsZW1lbnQsIGhvc3REaW06IERPTVJlY3QsIGVsbURpbTogRE9NUmVjdCk6IHZvaWQge1xuICAgIGNvbnN0IHsgdG9wLCBsZWZ0IH0gPSBQb3NpdGlvbkhlbHBlci5wb3NpdGlvbkNvbnRlbnQodGhpcy5wbGFjZW1lbnQsIGVsbURpbSwgaG9zdERpbSwgdGhpcy5zcGFjaW5nLCB0aGlzLmFsaWdubWVudCk7XG5cbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKG5hdGl2ZUVsbSwgJ3RvcCcsIGAke3RvcH1weGApO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUobmF0aXZlRWxtLCAnbGVmdCcsIGAke2xlZnR9cHhgKTtcbiAgfVxuXG4gIHBvc2l0aW9uQ2FyZXQoaG9zdERpbTogRE9NUmVjdCwgZWxtRGltOiBET01SZWN0KTogdm9pZCB7XG4gICAgY29uc3QgY2FyZXRFbG0gPSB0aGlzLmNhcmV0RWxtLm5hdGl2ZUVsZW1lbnQ7XG4gICAgY29uc3QgY2FyZXREaW1lbnNpb25zID0gY2FyZXRFbG0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgY29uc3QgeyB0b3AsIGxlZnQgfSA9IFBvc2l0aW9uSGVscGVyLnBvc2l0aW9uQ2FyZXQoXG4gICAgICB0aGlzLnBsYWNlbWVudCxcbiAgICAgIGVsbURpbSxcbiAgICAgIGhvc3REaW0sXG4gICAgICBjYXJldERpbWVuc2lvbnMsXG4gICAgICB0aGlzLmFsaWdubWVudFxuICAgICk7XG5cbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGNhcmV0RWxtLCAndG9wJywgYCR7dG9wfXB4YCk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShjYXJldEVsbSwgJ2xlZnQnLCBgJHtsZWZ0fXB4YCk7XG4gIH1cblxuICBjaGVja0ZsaXAoaG9zdERpbTogRE9NUmVjdCwgZWxtRGltOiBET01SZWN0KTogdm9pZCB7XG4gICAgdGhpcy5wbGFjZW1lbnQgPSBQb3NpdGlvbkhlbHBlci5kZXRlcm1pbmVQbGFjZW1lbnQodGhpcy5wbGFjZW1lbnQsIGVsbURpbSwgaG9zdERpbSwgdGhpcy5zcGFjaW5nKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzpyZXNpemUnKVxuICBAdGhyb3R0bGVhYmxlKDEwMClcbiAgb25XaW5kb3dSZXNpemUoKTogdm9pZCB7XG4gICAgdGhpcy5wb3NpdGlvbigpO1xuICB9XG59XG4iXX0=