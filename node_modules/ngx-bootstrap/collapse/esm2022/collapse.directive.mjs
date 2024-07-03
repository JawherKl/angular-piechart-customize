import { AnimationBuilder } from '@angular/animations';
import { Directive, ElementRef, EventEmitter, HostBinding, Input, Output, Renderer2 } from '@angular/core';
import { collapseAnimation, expandAnimation } from './collapse-animations';
import * as i0 from "@angular/core";
import * as i1 from "@angular/animations";
export class CollapseDirective {
    set display(value) {
        this._display = value;
        if (value === 'none') {
            this.hide();
            return;
        }
        this.isAnimated ? this.toggle() : this.show();
    }
    /** A flag indicating visibility of content (shown or hidden) */
    set collapse(value) {
        this.collapseNewValue = value;
        if (!this._player || this._isAnimationDone) {
            this.isExpanded = value;
            this.toggle();
        }
    }
    get collapse() {
        return this.isExpanded;
    }
    constructor(_el, _renderer, _builder) {
        this._el = _el;
        this._renderer = _renderer;
        /** This event fires as soon as content collapses */
        this.collapsed = new EventEmitter();
        /** This event fires when collapsing is started */
        this.collapses = new EventEmitter();
        /** This event fires as soon as content becomes visible */
        this.expanded = new EventEmitter();
        /** This event fires when expansion is started */
        this.expands = new EventEmitter();
        // shown
        this.isExpanded = true;
        this.collapseNewValue = true;
        // hidden
        this.isCollapsed = false;
        // stale state
        this.isCollapse = true;
        // animation state
        this.isCollapsing = false;
        /** turn on/off animation */
        this.isAnimated = false;
        this._display = 'block';
        this._stylesLoaded = false;
        this._COLLAPSE_ACTION_NAME = 'collapse';
        this._EXPAND_ACTION_NAME = 'expand';
        this._factoryCollapseAnimation = _builder.build(collapseAnimation);
        this._factoryExpandAnimation = _builder.build(expandAnimation);
    }
    ngAfterViewChecked() {
        this._stylesLoaded = true;
        if (!this._player || !this._isAnimationDone) {
            return;
        }
        this._player.reset();
        this._renderer.setStyle(this._el.nativeElement, 'height', '*');
    }
    /** allows to manually toggle content visibility */
    toggle() {
        if (this.isExpanded) {
            this.hide();
        }
        else {
            this.show();
        }
    }
    /** allows to manually hide content */
    hide() {
        this.isCollapsing = true;
        this.isExpanded = false;
        this.isCollapsed = true;
        this.isCollapsing = false;
        this.collapses.emit(this);
        this._isAnimationDone = false;
        this.animationRun(this.isAnimated, this._COLLAPSE_ACTION_NAME)(() => {
            this._isAnimationDone = true;
            if (this.collapseNewValue !== this.isCollapsed && this.isAnimated) {
                this.show();
                return;
            }
            this.collapsed.emit(this);
            this._renderer.setStyle(this._el.nativeElement, 'display', 'none');
        });
    }
    /** allows to manually show collapsed content */
    show() {
        this._renderer.setStyle(this._el.nativeElement, 'display', this._display);
        this.isCollapsing = true;
        this.isExpanded = true;
        this.isCollapsed = false;
        this.isCollapsing = false;
        this.expands.emit(this);
        this._isAnimationDone = false;
        this.animationRun(this.isAnimated, this._EXPAND_ACTION_NAME)(() => {
            this._isAnimationDone = true;
            if (this.collapseNewValue !== this.isCollapsed && this.isAnimated) {
                this.hide();
                return;
            }
            this.expanded.emit(this);
            this._renderer.removeStyle(this._el.nativeElement, 'overflow');
        });
    }
    animationRun(isAnimated, action) {
        if (!isAnimated || !this._stylesLoaded) {
            return (callback) => callback();
        }
        this._renderer.setStyle(this._el.nativeElement, 'overflow', 'hidden');
        this._renderer.addClass(this._el.nativeElement, 'collapse');
        const factoryAnimation = (action === this._EXPAND_ACTION_NAME)
            ? this._factoryExpandAnimation
            : this._factoryCollapseAnimation;
        if (this._player) {
            this._player.reset();
        }
        this._player = factoryAnimation.create(this._el.nativeElement);
        this._player.play();
        return (callback) => this._player?.onDone(callback);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.1.4", ngImport: i0, type: CollapseDirective, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i1.AnimationBuilder }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.1.4", type: CollapseDirective, selector: "[collapse]", inputs: { display: "display", isAnimated: "isAnimated", collapse: "collapse" }, outputs: { collapsed: "collapsed", collapses: "collapses", expanded: "expanded", expands: "expands" }, host: { properties: { "class.collapse": "this.isCollapse", "class.in": "this.isExpanded", "class.show": "this.isExpanded", "attr.aria-hidden": "this.isCollapsed", "class.collapsing": "this.isCollapsing" } }, exportAs: ["bs-collapse"], ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.1.4", ngImport: i0, type: CollapseDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[collapse]',
                    exportAs: 'bs-collapse',
                    // eslint-disable-next-line @angular-eslint/no-host-metadata-property
                    host: {
                        '[class.collapse]': 'true'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i1.AnimationBuilder }]; }, propDecorators: { collapsed: [{
                type: Output
            }], collapses: [{
                type: Output
            }], expanded: [{
                type: Output
            }], expands: [{
                type: Output
            }], isExpanded: [{
                type: HostBinding,
                args: ['class.in']
            }, {
                type: HostBinding,
                args: ['class.show']
            }], isCollapsed: [{
                type: HostBinding,
                args: ['attr.aria-hidden']
            }], isCollapse: [{
                type: HostBinding,
                args: ['class.collapse']
            }], isCollapsing: [{
                type: HostBinding,
                args: ['class.collapsing']
            }], display: [{
                type: Input
            }], isAnimated: [{
                type: Input
            }], collapse: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGFwc2UuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NvbGxhcHNlL2NvbGxhcHNlLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsZ0JBQWdCLEVBR2pCLE1BQU0scUJBQXFCLENBQUM7QUFFN0IsT0FBTyxFQUVMLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFdBQVcsRUFDWCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFNBQVMsRUFDVixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQ0wsaUJBQWlCLEVBQ2pCLGVBQWUsRUFDaEIsTUFBTSx1QkFBdUIsQ0FBQzs7O0FBVS9CLE1BQU0sT0FBTyxpQkFBaUI7SUFzQjVCLElBQ0ksT0FBTyxDQUFDLEtBQWE7UUFDdkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDdEIsSUFBSSxLQUFLLEtBQUssTUFBTSxFQUFFO1lBQ3BCLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNaLE9BQU87U0FDUjtRQUVELElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2hELENBQUM7SUFJRCxnRUFBZ0U7SUFDaEUsSUFDSSxRQUFRLENBQUMsS0FBYztRQUN6QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO1FBQzlCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtZQUMxQyxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztZQUN4QixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDZjtJQUNILENBQUM7SUFFRCxJQUFJLFFBQVE7UUFDVixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDekIsQ0FBQztJQWFELFlBQ1Us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QVc7dUJBQUMsVUFBVTs7c0JBQ3RCLFdBQVc7dUJBQUMsWUFBWTtnQkFLUSxXQUFXO3NCQUEzQyxXQUFXO3VCQUFDLGtCQUFrQjtnQkFFQSxVQUFVO3NCQUF4QyxXQUFXO3VCQUFDLGdCQUFnQjtnQkFFSSxZQUFZO3NCQUE1QyxXQUFXO3VCQUFDLGtCQUFrQjtnQkFHM0IsT0FBTztzQkFEVixLQUFLO2dCQVlHLFVBQVU7c0JBQWxCLEtBQUs7Z0JBR0YsUUFBUTtzQkFEWCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQW5pbWF0aW9uQnVpbGRlcixcbiAgQW5pbWF0aW9uRmFjdG9yeSxcbiAgQW5pbWF0aW9uUGxheWVyXG59IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuXG5pbXBvcnQge1xuICBBZnRlclZpZXdDaGVja2VkLFxuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSG9zdEJpbmRpbmcsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIFJlbmRlcmVyMlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtcbiAgY29sbGFwc2VBbmltYXRpb24sXG4gIGV4cGFuZEFuaW1hdGlvblxufSBmcm9tICcuL2NvbGxhcHNlLWFuaW1hdGlvbnMnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbY29sbGFwc2VdJyxcbiAgZXhwb3J0QXM6ICdicy1jb2xsYXBzZScsXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAYW5ndWxhci1lc2xpbnQvbm8taG9zdC1tZXRhZGF0YS1wcm9wZXJ0eVxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5jb2xsYXBzZV0nOiAndHJ1ZSdcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBDb2xsYXBzZURpcmVjdGl2ZSBpbXBsZW1lbnRzIEFmdGVyVmlld0NoZWNrZWQge1xuICAvKiogVGhpcyBldmVudCBmaXJlcyBhcyBzb29uIGFzIGNvbnRlbnQgY29sbGFwc2VzICovXG4gIEBPdXRwdXQoKSBjb2xsYXBzZWQ6IEV2ZW50RW1pdHRlcjxDb2xsYXBzZURpcmVjdGl2ZT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIC8qKiBUaGlzIGV2ZW50IGZpcmVzIHdoZW4gY29sbGFwc2luZyBpcyBzdGFydGVkICovXG4gIEBPdXRwdXQoKSBjb2xsYXBzZXM6IEV2ZW50RW1pdHRlcjxDb2xsYXBzZURpcmVjdGl2ZT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIC8qKiBUaGlzIGV2ZW50IGZpcmVzIGFzIHNvb24gYXMgY29udGVudCBiZWNvbWVzIHZpc2libGUgKi9cbiAgQE91dHB1dCgpIGV4cGFuZGVkOiBFdmVudEVtaXR0ZXI8Q29sbGFwc2VEaXJlY3RpdmU+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAvKiogVGhpcyBldmVudCBmaXJlcyB3aGVuIGV4cGFuc2lvbiBpcyBzdGFydGVkICovXG4gIEBPdXRwdXQoKSBleHBhbmRzOiBFdmVudEVtaXR0ZXI8Q29sbGFwc2VEaXJlY3RpdmU+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAvLyBzaG93blxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmluJylcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5zaG93JylcblxuICBpc0V4cGFuZGVkID0gdHJ1ZTtcbiAgY29sbGFwc2VOZXdWYWx1ZSA9IHRydWU7XG4gIC8vIGhpZGRlblxuICBASG9zdEJpbmRpbmcoJ2F0dHIuYXJpYS1oaWRkZW4nKSBpc0NvbGxhcHNlZCA9IGZhbHNlO1xuICAvLyBzdGFsZSBzdGF0ZVxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmNvbGxhcHNlJykgaXNDb2xsYXBzZSA9IHRydWU7XG4gIC8vIGFuaW1hdGlvbiBzdGF0ZVxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmNvbGxhcHNpbmcnKSBpc0NvbGxhcHNpbmcgPSBmYWxzZTtcblxuICBASW5wdXQoKVxuICBzZXQgZGlzcGxheSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fZGlzcGxheSA9IHZhbHVlO1xuICAgIGlmICh2YWx1ZSA9PT0gJ25vbmUnKSB7XG4gICAgICB0aGlzLmhpZGUoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmlzQW5pbWF0ZWQgPyB0aGlzLnRvZ2dsZSgpIDogdGhpcy5zaG93KCk7XG4gIH1cblxuICAvKiogdHVybiBvbi9vZmYgYW5pbWF0aW9uICovXG4gIEBJbnB1dCgpIGlzQW5pbWF0ZWQgPSBmYWxzZTtcbiAgLyoqIEEgZmxhZyBpbmRpY2F0aW5nIHZpc2liaWxpdHkgb2YgY29udGVudCAoc2hvd24gb3IgaGlkZGVuKSAqL1xuICBASW5wdXQoKVxuICBzZXQgY29sbGFwc2UodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLmNvbGxhcHNlTmV3VmFsdWUgPSB2YWx1ZTtcbiAgICBpZiAoIXRoaXMuX3BsYXllciB8fCB0aGlzLl9pc0FuaW1hdGlvbkRvbmUpIHtcbiAgICAgIHRoaXMuaXNFeHBhbmRlZCA9IHZhbHVlO1xuICAgICAgdGhpcy50b2dnbGUoKTtcbiAgICB9XG4gIH1cblxuICBnZXQgY29sbGFwc2UoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuaXNFeHBhbmRlZDtcbiAgfVxuXG4gIHByaXZhdGUgX2Rpc3BsYXkgPSAnYmxvY2snO1xuICBwcml2YXRlIF9pc0FuaW1hdGlvbkRvbmU/OiBib29sZWFuO1xuICBwcml2YXRlIF9wbGF5ZXI/OiBBbmltYXRpb25QbGF5ZXI7XG4gIHByaXZhdGUgX3N0eWxlc0xvYWRlZCA9IGZhbHNlO1xuXG4gIHByaXZhdGUgX0NPTExBUFNFX0FDVElPTl9OQU1FID0gJ2NvbGxhcHNlJztcbiAgcHJpdmF0ZSBfRVhQQU5EX0FDVElPTl9OQU1FID0gJ2V4cGFuZCc7XG5cbiAgcHJpdmF0ZSByZWFkb25seSBfZmFjdG9yeUNvbGxhcHNlQW5pbWF0aW9uOiBBbmltYXRpb25GYWN0b3J5O1xuICBwcml2YXRlIHJlYWRvbmx5IF9mYWN0b3J5RXhwYW5kQW5pbWF0aW9uOiBBbmltYXRpb25GYWN0b3J5O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgX2VsOiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgX2J1aWxkZXI6IEFuaW1hdGlvbkJ1aWxkZXJcbiAgKSB7XG4gICAgdGhpcy5fZmFjdG9yeUNvbGxhcHNlQW5pbWF0aW9uID0gX2J1aWxkZXIuYnVpbGQoY29sbGFwc2VBbmltYXRpb24pO1xuICAgIHRoaXMuX2ZhY3RvcnlFeHBhbmRBbmltYXRpb24gPSBfYnVpbGRlci5idWlsZChleHBhbmRBbmltYXRpb24pO1xuICB9XG5cbiAgbmdBZnRlclZpZXdDaGVja2VkKCk6IHZvaWQge1xuICAgIHRoaXMuX3N0eWxlc0xvYWRlZCA9IHRydWU7XG5cbiAgICBpZiAoIXRoaXMuX3BsYXllciB8fCAhdGhpcy5faXNBbmltYXRpb25Eb25lKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5fcGxheWVyLnJlc2V0KCk7XG4gICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fZWwubmF0aXZlRWxlbWVudCwgJ2hlaWdodCcsICcqJyk7XG4gIH1cblxuICAvKiogYWxsb3dzIHRvIG1hbnVhbGx5IHRvZ2dsZSBjb250ZW50IHZpc2liaWxpdHkgKi9cbiAgdG9nZ2xlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmlzRXhwYW5kZWQpIHtcbiAgICAgIHRoaXMuaGlkZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNob3coKTtcbiAgICB9XG4gIH1cblxuICAvKiogYWxsb3dzIHRvIG1hbnVhbGx5IGhpZGUgY29udGVudCAqL1xuICBoaWRlKCk6IHZvaWQge1xuICAgIHRoaXMuaXNDb2xsYXBzaW5nID0gdHJ1ZTtcbiAgICB0aGlzLmlzRXhwYW5kZWQgPSBmYWxzZTtcbiAgICB0aGlzLmlzQ29sbGFwc2VkID0gdHJ1ZTtcbiAgICB0aGlzLmlzQ29sbGFwc2luZyA9IGZhbHNlO1xuXG4gICAgdGhpcy5jb2xsYXBzZXMuZW1pdCh0aGlzKTtcblxuICAgIHRoaXMuX2lzQW5pbWF0aW9uRG9uZSA9IGZhbHNlO1xuXG4gICAgdGhpcy5hbmltYXRpb25SdW4odGhpcy5pc0FuaW1hdGVkLCB0aGlzLl9DT0xMQVBTRV9BQ1RJT05fTkFNRSkoKCkgPT4ge1xuICAgICAgdGhpcy5faXNBbmltYXRpb25Eb25lID0gdHJ1ZTtcbiAgICAgIGlmICh0aGlzLmNvbGxhcHNlTmV3VmFsdWUgIT09IHRoaXMuaXNDb2xsYXBzZWQgJiYgdGhpcy5pc0FuaW1hdGVkKSB7XG4gICAgICAgIHRoaXMuc2hvdygpO1xuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRoaXMuY29sbGFwc2VkLmVtaXQodGhpcyk7XG4gICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9lbC5uYXRpdmVFbGVtZW50LCAnZGlzcGxheScsICdub25lJyk7XG4gICAgfSk7XG4gIH1cbiAgLyoqIGFsbG93cyB0byBtYW51YWxseSBzaG93IGNvbGxhcHNlZCBjb250ZW50ICovXG4gIHNob3coKTogdm9pZCB7XG4gICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fZWwubmF0aXZlRWxlbWVudCwgJ2Rpc3BsYXknLCB0aGlzLl9kaXNwbGF5KTtcblxuICAgIHRoaXMuaXNDb2xsYXBzaW5nID0gdHJ1ZTtcbiAgICB0aGlzLmlzRXhwYW5kZWQgPSB0cnVlO1xuICAgIHRoaXMuaXNDb2xsYXBzZWQgPSBmYWxzZTtcbiAgICB0aGlzLmlzQ29sbGFwc2luZyA9IGZhbHNlO1xuXG4gICAgdGhpcy5leHBhbmRzLmVtaXQodGhpcyk7XG5cbiAgICB0aGlzLl9pc0FuaW1hdGlvbkRvbmUgPSBmYWxzZTtcbiAgICB0aGlzLmFuaW1hdGlvblJ1bih0aGlzLmlzQW5pbWF0ZWQsIHRoaXMuX0VYUEFORF9BQ1RJT05fTkFNRSkoKCkgPT4ge1xuICAgICAgdGhpcy5faXNBbmltYXRpb25Eb25lID0gdHJ1ZTtcbiAgICAgIGlmICh0aGlzLmNvbGxhcHNlTmV3VmFsdWUgIT09IHRoaXMuaXNDb2xsYXBzZWQgJiYgdGhpcy5pc0FuaW1hdGVkKSB7XG4gICAgICAgIHRoaXMuaGlkZSgpO1xuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRoaXMuZXhwYW5kZWQuZW1pdCh0aGlzKTtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZVN0eWxlKHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQsICdvdmVyZmxvdycpO1xuICAgIH0pO1xuICB9XG5cbiAgYW5pbWF0aW9uUnVuKGlzQW5pbWF0ZWQ6IGJvb2xlYW4sIGFjdGlvbjogc3RyaW5nKSB7XG4gICAgaWYgKCFpc0FuaW1hdGVkIHx8ICF0aGlzLl9zdHlsZXNMb2FkZWQpIHtcbiAgICAgIHJldHVybiAoY2FsbGJhY2s6ICgpID0+IHZvaWQpID0+IGNhbGxiYWNrKCk7XG4gICAgfVxuXG4gICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fZWwubmF0aXZlRWxlbWVudCwgJ292ZXJmbG93JywgJ2hpZGRlbicpO1xuICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQsICdjb2xsYXBzZScpO1xuXG4gICAgY29uc3QgZmFjdG9yeUFuaW1hdGlvbiA9IChhY3Rpb24gPT09IHRoaXMuX0VYUEFORF9BQ1RJT05fTkFNRSlcbiAgICAgID8gdGhpcy5fZmFjdG9yeUV4cGFuZEFuaW1hdGlvblxuICAgICAgOiB0aGlzLl9mYWN0b3J5Q29sbGFwc2VBbmltYXRpb247XG5cbiAgICBpZiAodGhpcy5fcGxheWVyKSB7XG4gICAgICB0aGlzLl9wbGF5ZXIucmVzZXQoKTtcbiAgICB9XG5cbiAgICB0aGlzLl9wbGF5ZXIgPSBmYWN0b3J5QW5pbWF0aW9uLmNyZWF0ZSh0aGlzLl9lbC5uYXRpdmVFbGVtZW50KTtcbiAgICB0aGlzLl9wbGF5ZXIucGxheSgpO1xuXG4gICAgcmV0dXJuIChjYWxsYmFjazogKCkgPT4gdm9pZCkgPT4gdGhpcy5fcGxheWVyPy5vbkRvbmUoY2FsbGJhY2spO1xuICB9XG59XG4iXX0=