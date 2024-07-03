import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { ngbRunTransition } from '../util/transition/ngbTransition';
import { ngbCollapsingTransition } from '../util/transition/ngbCollapseTransition';
import * as i0 from "@angular/core";
import * as i1 from "./collapse-config";
/**
 * A directive to provide a simple way of hiding and showing elements on the
 * page.
 */
class NgbCollapse {
    /**
     * If `true`, will collapse the element or show it otherwise.
     */
    set collapsed(isCollapsed) {
        if (this._isCollapsed !== isCollapsed) {
            this._isCollapsed = isCollapsed;
            if (this._afterInit) {
                this._runTransitionWithEvents(isCollapsed, this.animation);
            }
        }
    }
    constructor(_element, config, _zone) {
        this._element = _element;
        this._zone = _zone;
        /**
         * Flag used to track if the collapse setter is invoked during initialization
         * or not. This distinction is made in order to avoid running the transition during initialization.
         */
        this._afterInit = false;
        this._isCollapsed = false;
        this.ngbCollapseChange = new EventEmitter();
        /**
         * An event emitted when the collapse element is shown, after the transition.
         * It has no payload.
         *
         * @since 8.0.0
         */
        this.shown = new EventEmitter();
        /**
         * An event emitted when the collapse element is hidden, after the transition.
         * It has no payload.
         *
         * @since 8.0.0
         */
        this.hidden = new EventEmitter();
        this.animation = config.animation;
        this.horizontal = config.horizontal;
    }
    ngOnInit() {
        this._runTransition(this._isCollapsed, false);
        this._afterInit = true;
    }
    /**
     * Triggers collapsing programmatically.
     *
     * If there is a collapsing transition running already, it will be reversed.
     * If the animations are turned off this happens synchronously.
     *
     * @since 8.0.0
     */
    toggle(open = this._isCollapsed) {
        this.collapsed = !open;
        this.ngbCollapseChange.next(this._isCollapsed);
    }
    _runTransition(collapsed, animation) {
        return ngbRunTransition(this._zone, this._element.nativeElement, ngbCollapsingTransition, {
            animation,
            runningTransition: 'stop',
            context: { direction: collapsed ? 'hide' : 'show', dimension: this.horizontal ? 'width' : 'height' },
        });
    }
    _runTransitionWithEvents(collapsed, animation) {
        this._runTransition(collapsed, animation).subscribe(() => {
            if (collapsed) {
                this.hidden.emit();
            }
            else {
                this.shown.emit();
            }
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbCollapse, deps: [{ token: i0.ElementRef }, { token: i1.NgbCollapseConfig }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.0.6", type: NgbCollapse, isStandalone: true, selector: "[ngbCollapse]", inputs: { animation: "animation", collapsed: ["ngbCollapse", "collapsed"], horizontal: "horizontal" }, outputs: { ngbCollapseChange: "ngbCollapseChange", shown: "shown", hidden: "hidden" }, host: { properties: { "class.collapse-horizontal": "horizontal" } }, exportAs: ["ngbCollapse"], ngImport: i0 }); }
}
export { NgbCollapse };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbCollapse, decorators: [{
            type: Directive,
            args: [{
                    selector: '[ngbCollapse]',
                    exportAs: 'ngbCollapse',
                    standalone: true,
                    host: { '[class.collapse-horizontal]': 'horizontal' },
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.NgbCollapseConfig }, { type: i0.NgZone }]; }, propDecorators: { animation: [{
                type: Input
            }], collapsed: [{
                type: Input,
                args: ['ngbCollapse']
            }], ngbCollapseChange: [{
                type: Output
            }], horizontal: [{
                type: Input
            }], shown: [{
                type: Output
            }], hidden: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGFwc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY29sbGFwc2UvY29sbGFwc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBYyxZQUFZLEVBQUUsS0FBSyxFQUFrQixNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkcsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDcEUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sMENBQTBDLENBQUM7OztBQUduRjs7O0dBR0c7QUFDSCxNQU1hLFdBQVc7SUFtQnZCOztPQUVHO0lBQ0gsSUFDSSxTQUFTLENBQUMsV0FBb0I7UUFDakMsSUFBSSxJQUFJLENBQUMsWUFBWSxLQUFLLFdBQVcsRUFBRTtZQUN0QyxJQUFJLENBQUMsWUFBWSxHQUFHLFdBQVcsQ0FBQztZQUNoQyxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7Z0JBQ3BCLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2FBQzNEO1NBQ0Q7SUFDRixDQUFDO0lBMkJELFlBQW9CLFFBQW9CLEVBQUUsTUFBeUIsRUFBVSxLQUFhO1FBQXRFLGFBQVEsR0FBUixRQUFRLENBQVk7UUFBcUMsVUFBSyxHQUFMLEtBQUssQ0FBUTtRQTlDMUY7OztXQUdHO1FBQ0ssZUFBVSxHQUFHLEtBQUssQ0FBQztRQUVuQixpQkFBWSxHQUFHLEtBQUssQ0FBQztRQWVuQixzQkFBaUIsR0FBRyxJQUFJLFlBQVksRUFBVyxDQUFDO1FBUzFEOzs7OztXQUtHO1FBQ08sVUFBSyxHQUFHLElBQUksWUFBWSxFQUFRLENBQUM7UUFFM0M7Ozs7O1dBS0c7UUFDTyxXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQVEsQ0FBQztRQUczQyxJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUM7UUFDbEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDO0lBQ3JDLENBQUM7SUFFRCxRQUFRO1FBQ1AsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzlDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO0lBQ3hCLENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0gsTUFBTSxDQUFDLE9BQWdCLElBQUksQ0FBQyxZQUFZO1FBQ3ZDLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxJQUFJLENBQUM7UUFDdkIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVPLGNBQWMsQ0FBQyxTQUFrQixFQUFFLFNBQWtCO1FBQzVELE9BQU8sZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBRSx1QkFBdUIsRUFBRTtZQUN6RixTQUFTO1lBQ1QsaUJBQWlCLEVBQUUsTUFBTTtZQUN6QixPQUFPLEVBQUUsRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUU7U0FDcEcsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVPLHdCQUF3QixDQUFDLFNBQWtCLEVBQUUsU0FBa0I7UUFDdEUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUN4RCxJQUFJLFNBQVMsRUFBRTtnQkFDZCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO2FBQ25CO2lCQUFNO2dCQUNOLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDbEI7UUFDRixDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7OEdBaEdXLFdBQVc7a0dBQVgsV0FBVzs7U0FBWCxXQUFXOzJGQUFYLFdBQVc7a0JBTnZCLFNBQVM7bUJBQUM7b0JBQ1YsUUFBUSxFQUFFLGVBQWU7b0JBQ3pCLFFBQVEsRUFBRSxhQUFhO29CQUN2QixVQUFVLEVBQUUsSUFBSTtvQkFDaEIsSUFBSSxFQUFFLEVBQUUsNkJBQTZCLEVBQUUsWUFBWSxFQUFFO2lCQUNyRDtzSkFVUyxTQUFTO3NCQUFqQixLQUFLO2dCQWNGLFNBQVM7c0JBRFosS0FBSzt1QkFBQyxhQUFhO2dCQVVWLGlCQUFpQjtzQkFBMUIsTUFBTTtnQkFPRSxVQUFVO3NCQUFsQixLQUFLO2dCQVFJLEtBQUs7c0JBQWQsTUFBTTtnQkFRRyxNQUFNO3NCQUFmLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE5nWm9uZSwgT25Jbml0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IG5nYlJ1blRyYW5zaXRpb24gfSBmcm9tICcuLi91dGlsL3RyYW5zaXRpb24vbmdiVHJhbnNpdGlvbic7XG5pbXBvcnQgeyBuZ2JDb2xsYXBzaW5nVHJhbnNpdGlvbiB9IGZyb20gJy4uL3V0aWwvdHJhbnNpdGlvbi9uZ2JDb2xsYXBzZVRyYW5zaXRpb24nO1xuaW1wb3J0IHsgTmdiQ29sbGFwc2VDb25maWcgfSBmcm9tICcuL2NvbGxhcHNlLWNvbmZpZyc7XG5cbi8qKlxuICogQSBkaXJlY3RpdmUgdG8gcHJvdmlkZSBhIHNpbXBsZSB3YXkgb2YgaGlkaW5nIGFuZCBzaG93aW5nIGVsZW1lbnRzIG9uIHRoZVxuICogcGFnZS5cbiAqL1xuQERpcmVjdGl2ZSh7XG5cdHNlbGVjdG9yOiAnW25nYkNvbGxhcHNlXScsXG5cdGV4cG9ydEFzOiAnbmdiQ29sbGFwc2UnLFxuXHRzdGFuZGFsb25lOiB0cnVlLFxuXHRob3N0OiB7ICdbY2xhc3MuY29sbGFwc2UtaG9yaXpvbnRhbF0nOiAnaG9yaXpvbnRhbCcgfSxcbn0pXG5leHBvcnQgY2xhc3MgTmdiQ29sbGFwc2UgaW1wbGVtZW50cyBPbkluaXQge1xuXHQvKipcblx0ICogSWYgYHRydWVgLCBjb2xsYXBzZSB3aWxsIGJlIGFuaW1hdGVkLlxuXHQgKlxuXHQgKiBBbmltYXRpb24gaXMgdHJpZ2dlcmVkIG9ubHkgd2hlbiBjbGlja2VkIG9uIHRyaWdnZXJpbmcgZWxlbWVudFxuXHQgKiBvciB2aWEgdGhlIGAudG9nZ2xlKClgIGZ1bmN0aW9uXG5cdCAqXG5cdCAqIEBzaW5jZSA4LjAuMFxuXHQgKi9cblx0QElucHV0KCkgYW5pbWF0aW9uO1xuXG5cdC8qKlxuXHQgKiBGbGFnIHVzZWQgdG8gdHJhY2sgaWYgdGhlIGNvbGxhcHNlIHNldHRlciBpcyBpbnZva2VkIGR1cmluZyBpbml0aWFsaXphdGlvblxuXHQgKiBvciBub3QuIFRoaXMgZGlzdGluY3Rpb24gaXMgbWFkZSBpbiBvcmRlciB0byBhdm9pZCBydW5uaW5nIHRoZSB0cmFuc2l0aW9uIGR1cmluZyBpbml0aWFsaXphdGlvbi5cblx0ICovXG5cdHByaXZhdGUgX2FmdGVySW5pdCA9IGZhbHNlO1xuXG5cdHByaXZhdGUgX2lzQ29sbGFwc2VkID0gZmFsc2U7XG5cblx0LyoqXG5cdCAqIElmIGB0cnVlYCwgd2lsbCBjb2xsYXBzZSB0aGUgZWxlbWVudCBvciBzaG93IGl0IG90aGVyd2lzZS5cblx0ICovXG5cdEBJbnB1dCgnbmdiQ29sbGFwc2UnKVxuXHRzZXQgY29sbGFwc2VkKGlzQ29sbGFwc2VkOiBib29sZWFuKSB7XG5cdFx0aWYgKHRoaXMuX2lzQ29sbGFwc2VkICE9PSBpc0NvbGxhcHNlZCkge1xuXHRcdFx0dGhpcy5faXNDb2xsYXBzZWQgPSBpc0NvbGxhcHNlZDtcblx0XHRcdGlmICh0aGlzLl9hZnRlckluaXQpIHtcblx0XHRcdFx0dGhpcy5fcnVuVHJhbnNpdGlvbldpdGhFdmVudHMoaXNDb2xsYXBzZWQsIHRoaXMuYW5pbWF0aW9uKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRAT3V0cHV0KCkgbmdiQ29sbGFwc2VDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cblx0LyoqXG5cdCAqIElmIGB0cnVlYCwgd2lsbCBjb2xsYXBzZSBob3Jpem9udGFsbHkuXG5cdCAqXG5cdCAqIEBzaW5jZSAxMy4xLjBcblx0ICovXG5cdEBJbnB1dCgpIGhvcml6b250YWw6IGJvb2xlYW47XG5cblx0LyoqXG5cdCAqIEFuIGV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgY29sbGFwc2UgZWxlbWVudCBpcyBzaG93biwgYWZ0ZXIgdGhlIHRyYW5zaXRpb24uXG5cdCAqIEl0IGhhcyBubyBwYXlsb2FkLlxuXHQgKlxuXHQgKiBAc2luY2UgOC4wLjBcblx0ICovXG5cdEBPdXRwdXQoKSBzaG93biA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuXHQvKipcblx0ICogQW4gZXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBjb2xsYXBzZSBlbGVtZW50IGlzIGhpZGRlbiwgYWZ0ZXIgdGhlIHRyYW5zaXRpb24uXG5cdCAqIEl0IGhhcyBubyBwYXlsb2FkLlxuXHQgKlxuXHQgKiBAc2luY2UgOC4wLjBcblx0ICovXG5cdEBPdXRwdXQoKSBoaWRkZW4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cblx0Y29uc3RydWN0b3IocHJpdmF0ZSBfZWxlbWVudDogRWxlbWVudFJlZiwgY29uZmlnOiBOZ2JDb2xsYXBzZUNvbmZpZywgcHJpdmF0ZSBfem9uZTogTmdab25lKSB7XG5cdFx0dGhpcy5hbmltYXRpb24gPSBjb25maWcuYW5pbWF0aW9uO1xuXHRcdHRoaXMuaG9yaXpvbnRhbCA9IGNvbmZpZy5ob3Jpem9udGFsO1xuXHR9XG5cblx0bmdPbkluaXQoKSB7XG5cdFx0dGhpcy5fcnVuVHJhbnNpdGlvbih0aGlzLl9pc0NvbGxhcHNlZCwgZmFsc2UpO1xuXHRcdHRoaXMuX2FmdGVySW5pdCA9IHRydWU7XG5cdH1cblxuXHQvKipcblx0ICogVHJpZ2dlcnMgY29sbGFwc2luZyBwcm9ncmFtbWF0aWNhbGx5LlxuXHQgKlxuXHQgKiBJZiB0aGVyZSBpcyBhIGNvbGxhcHNpbmcgdHJhbnNpdGlvbiBydW5uaW5nIGFscmVhZHksIGl0IHdpbGwgYmUgcmV2ZXJzZWQuXG5cdCAqIElmIHRoZSBhbmltYXRpb25zIGFyZSB0dXJuZWQgb2ZmIHRoaXMgaGFwcGVucyBzeW5jaHJvbm91c2x5LlxuXHQgKlxuXHQgKiBAc2luY2UgOC4wLjBcblx0ICovXG5cdHRvZ2dsZShvcGVuOiBib29sZWFuID0gdGhpcy5faXNDb2xsYXBzZWQpIHtcblx0XHR0aGlzLmNvbGxhcHNlZCA9ICFvcGVuO1xuXHRcdHRoaXMubmdiQ29sbGFwc2VDaGFuZ2UubmV4dCh0aGlzLl9pc0NvbGxhcHNlZCk7XG5cdH1cblxuXHRwcml2YXRlIF9ydW5UcmFuc2l0aW9uKGNvbGxhcHNlZDogYm9vbGVhbiwgYW5pbWF0aW9uOiBib29sZWFuKSB7XG5cdFx0cmV0dXJuIG5nYlJ1blRyYW5zaXRpb24odGhpcy5fem9uZSwgdGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LCBuZ2JDb2xsYXBzaW5nVHJhbnNpdGlvbiwge1xuXHRcdFx0YW5pbWF0aW9uLFxuXHRcdFx0cnVubmluZ1RyYW5zaXRpb246ICdzdG9wJyxcblx0XHRcdGNvbnRleHQ6IHsgZGlyZWN0aW9uOiBjb2xsYXBzZWQgPyAnaGlkZScgOiAnc2hvdycsIGRpbWVuc2lvbjogdGhpcy5ob3Jpem9udGFsID8gJ3dpZHRoJyA6ICdoZWlnaHQnIH0sXG5cdFx0fSk7XG5cdH1cblxuXHRwcml2YXRlIF9ydW5UcmFuc2l0aW9uV2l0aEV2ZW50cyhjb2xsYXBzZWQ6IGJvb2xlYW4sIGFuaW1hdGlvbjogYm9vbGVhbikge1xuXHRcdHRoaXMuX3J1blRyYW5zaXRpb24oY29sbGFwc2VkLCBhbmltYXRpb24pLnN1YnNjcmliZSgoKSA9PiB7XG5cdFx0XHRpZiAoY29sbGFwc2VkKSB7XG5cdFx0XHRcdHRoaXMuaGlkZGVuLmVtaXQoKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMuc2hvd24uZW1pdCgpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG59XG4iXX0=