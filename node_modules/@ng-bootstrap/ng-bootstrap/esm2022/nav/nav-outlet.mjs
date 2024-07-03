import { ChangeDetectionStrategy, Component, Directive, Input, ViewChildren, ViewEncapsulation, } from '@angular/core';
import { distinctUntilChanged, skip, startWith, takeUntil } from 'rxjs/operators';
import { ngbNavFadeInTransition, ngbNavFadeOutTransition } from './nav-transition';
import { ngbRunTransition } from '../util/transition/ngbTransition';
import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import * as i0 from "@angular/core";
class NgbNavPane {
    constructor(elRef) {
        this.elRef = elRef;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbNavPane, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.0.6", type: NgbNavPane, isStandalone: true, selector: "[ngbNavPane]", inputs: { item: "item", nav: "nav", role: "role" }, host: { properties: { "id": "item.panelDomId", "class.fade": "nav.animation", "attr.role": "role ? role : nav.roles ? \"tabpanel\" : undefined", "attr.aria-labelledby": "item.domId" }, classAttribute: "tab-pane" }, ngImport: i0 }); }
}
export { NgbNavPane };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbNavPane, decorators: [{
            type: Directive,
            args: [{
                    selector: '[ngbNavPane]',
                    standalone: true,
                    host: {
                        '[id]': 'item.panelDomId',
                        class: 'tab-pane',
                        '[class.fade]': 'nav.animation',
                        '[attr.role]': 'role ? role : nav.roles ? "tabpanel" : undefined',
                        '[attr.aria-labelledby]': 'item.domId',
                    },
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { item: [{
                type: Input
            }], nav: [{
                type: Input
            }], role: [{
                type: Input
            }] } });
/**
 * The outlet where currently active nav content will be displayed.
 *
 * @since 5.2.0
 */
class NgbNavOutlet {
    constructor(_cd, _ngZone) {
        this._cd = _cd;
        this._ngZone = _ngZone;
        this._activePane = null;
    }
    isPanelTransitioning(item) {
        return this._activePane?.item === item;
    }
    ngAfterViewInit() {
        // initial display
        this._updateActivePane();
        // this will be emitted for all 3 types of nav changes: .select(), [activeId] or (click)
        this.nav.navItemChange$
            .pipe(takeUntil(this.nav.destroy$), startWith(this._activePane?.item || null), distinctUntilChanged(), skip(1))
            .subscribe((nextItem) => {
            const options = { animation: this.nav.animation, runningTransition: 'stop' };
            // next panel we're switching to will only appear in DOM after the change detection is done
            // and `this._panes` will be updated
            this._cd.detectChanges();
            // fading out
            if (this._activePane) {
                ngbRunTransition(this._ngZone, this._activePane.elRef.nativeElement, ngbNavFadeOutTransition, options).subscribe(() => {
                    const activeItem = this._activePane?.item;
                    this._activePane = this._getPaneForItem(nextItem);
                    // mark for check when transition finishes as outlet or parent containers might be OnPush
                    // without this the panes that have "faded out" will stay in DOM
                    this._cd.markForCheck();
                    // fading in
                    if (this._activePane) {
                        // we have to add the '.active' class before running the transition,
                        // because it should be in place before `ngbRunTransition` does `reflow()`
                        this._activePane.elRef.nativeElement.classList.add('active');
                        ngbRunTransition(this._ngZone, this._activePane.elRef.nativeElement, ngbNavFadeInTransition, options).subscribe(() => {
                            if (nextItem) {
                                nextItem.shown.emit();
                                this.nav.shown.emit(nextItem.id);
                            }
                        });
                    }
                    if (activeItem) {
                        activeItem.hidden.emit();
                        this.nav.hidden.emit(activeItem.id);
                    }
                });
            }
            else {
                this._updateActivePane();
            }
        });
    }
    _updateActivePane() {
        this._activePane = this._getActivePane();
        this._activePane?.elRef.nativeElement.classList.add('show');
        this._activePane?.elRef.nativeElement.classList.add('active');
    }
    _getPaneForItem(item) {
        return (this._panes && this._panes.find((pane) => pane.item === item)) || null;
    }
    _getActivePane() {
        return (this._panes && this._panes.find((pane) => pane.item.active)) || null;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbNavOutlet, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.6", type: NgbNavOutlet, isStandalone: true, selector: "[ngbNavOutlet]", inputs: { paneRole: "paneRole", nav: ["ngbNavOutlet", "nav"] }, host: { properties: { "class.tab-content": "true" } }, viewQueries: [{ propertyName: "_panes", predicate: NgbNavPane, descendants: true }], ngImport: i0, template: `
		<ng-template ngFor let-item [ngForOf]="nav.items">
			<div
				ngbNavPane
				*ngIf="item.isPanelInDom() || isPanelTransitioning(item)"
				[item]="item"
				[nav]="nav"
				[role]="paneRole"
			>
				<ng-template
					[ngTemplateOutlet]="item.contentTpl?.templateRef || null"
					[ngTemplateOutletContext]="{ $implicit: item.active || isPanelTransitioning(item) }"
				></ng-template>
			</div>
		</ng-template>
	`, isInline: true, dependencies: [{ kind: "directive", type: NgbNavPane, selector: "[ngbNavPane]", inputs: ["item", "nav", "role"] }, { kind: "directive", type: NgFor, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None }); }
}
export { NgbNavOutlet };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbNavOutlet, decorators: [{
            type: Component,
            args: [{
                    selector: '[ngbNavOutlet]',
                    standalone: true,
                    imports: [NgbNavPane, NgFor, NgIf, NgTemplateOutlet],
                    host: { '[class.tab-content]': 'true' },
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: `
		<ng-template ngFor let-item [ngForOf]="nav.items">
			<div
				ngbNavPane
				*ngIf="item.isPanelInDom() || isPanelTransitioning(item)"
				[item]="item"
				[nav]="nav"
				[role]="paneRole"
			>
				<ng-template
					[ngTemplateOutlet]="item.contentTpl?.templateRef || null"
					[ngTemplateOutletContext]="{ $implicit: item.active || isPanelTransitioning(item) }"
				></ng-template>
			</div>
		</ng-template>
	`,
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.NgZone }]; }, propDecorators: { _panes: [{
                type: ViewChildren,
                args: [NgbNavPane]
            }], paneRole: [{
                type: Input
            }], nav: [{
                type: Input,
                args: ['ngbNavOutlet']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2LW91dGxldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9uYXYvbmF2LW91dGxldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBRU4sdUJBQXVCLEVBRXZCLFNBQVMsRUFDVCxTQUFTLEVBRVQsS0FBSyxFQUdMLFlBQVksRUFDWixpQkFBaUIsR0FDakIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLG9CQUFvQixFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFbEYsT0FBTyxFQUFFLHNCQUFzQixFQUFFLHVCQUF1QixFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDbkYsT0FBTyxFQUFFLGdCQUFnQixFQUF3QixNQUFNLGtDQUFrQyxDQUFDO0FBRTFGLE9BQU8sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFFLE1BQU0saUJBQWlCLENBQUM7O0FBRWhFLE1BV2EsVUFBVTtJQUt0QixZQUFtQixLQUE4QjtRQUE5QixVQUFLLEdBQUwsS0FBSyxDQUF5QjtJQUFHLENBQUM7OEdBTHpDLFVBQVU7a0dBQVYsVUFBVTs7U0FBVixVQUFVOzJGQUFWLFVBQVU7a0JBWHRCLFNBQVM7bUJBQUM7b0JBQ1YsUUFBUSxFQUFFLGNBQWM7b0JBQ3hCLFVBQVUsRUFBRSxJQUFJO29CQUNoQixJQUFJLEVBQUU7d0JBQ0wsTUFBTSxFQUFFLGlCQUFpQjt3QkFDekIsS0FBSyxFQUFFLFVBQVU7d0JBQ2pCLGNBQWMsRUFBRSxlQUFlO3dCQUMvQixhQUFhLEVBQUUsa0RBQWtEO3dCQUNqRSx3QkFBd0IsRUFBRSxZQUFZO3FCQUN0QztpQkFDRDtpR0FFUyxJQUFJO3NCQUFaLEtBQUs7Z0JBQ0csR0FBRztzQkFBWCxLQUFLO2dCQUNHLElBQUk7c0JBQVosS0FBSzs7QUFLUDs7OztHQUlHO0FBQ0gsTUF3QmEsWUFBWTtJQWV4QixZQUFvQixHQUFzQixF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VUFBVTtnQkFLZixRQUFRO3NCQUFoQixLQUFLO2dCQUtpQixHQUFHO3NCQUF6QixLQUFLO3VCQUFDLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuXHRBZnRlclZpZXdJbml0LFxuXHRDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcblx0Q2hhbmdlRGV0ZWN0b3JSZWYsXG5cdENvbXBvbmVudCxcblx0RGlyZWN0aXZlLFxuXHRFbGVtZW50UmVmLFxuXHRJbnB1dCxcblx0Tmdab25lLFxuXHRRdWVyeUxpc3QsXG5cdFZpZXdDaGlsZHJlbixcblx0Vmlld0VuY2Fwc3VsYXRpb24sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZGlzdGluY3RVbnRpbENoYW5nZWQsIHNraXAsIHN0YXJ0V2l0aCwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBuZ2JOYXZGYWRlSW5UcmFuc2l0aW9uLCBuZ2JOYXZGYWRlT3V0VHJhbnNpdGlvbiB9IGZyb20gJy4vbmF2LXRyYW5zaXRpb24nO1xuaW1wb3J0IHsgbmdiUnVuVHJhbnNpdGlvbiwgTmdiVHJhbnNpdGlvbk9wdGlvbnMgfSBmcm9tICcuLi91dGlsL3RyYW5zaXRpb24vbmdiVHJhbnNpdGlvbic7XG5pbXBvcnQgeyBOZ2JOYXYsIE5nYk5hdkl0ZW0gfSBmcm9tICcuL25hdic7XG5pbXBvcnQgeyBOZ0ZvciwgTmdJZiwgTmdUZW1wbGF0ZU91dGxldCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbkBEaXJlY3RpdmUoe1xuXHRzZWxlY3RvcjogJ1tuZ2JOYXZQYW5lXScsXG5cdHN0YW5kYWxvbmU6IHRydWUsXG5cdGhvc3Q6IHtcblx0XHQnW2lkXSc6ICdpdGVtLnBhbmVsRG9tSWQnLFxuXHRcdGNsYXNzOiAndGFiLXBhbmUnLFxuXHRcdCdbY2xhc3MuZmFkZV0nOiAnbmF2LmFuaW1hdGlvbicsXG5cdFx0J1thdHRyLnJvbGVdJzogJ3JvbGUgPyByb2xlIDogbmF2LnJvbGVzID8gXCJ0YWJwYW5lbFwiIDogdW5kZWZpbmVkJyxcblx0XHQnW2F0dHIuYXJpYS1sYWJlbGxlZGJ5XSc6ICdpdGVtLmRvbUlkJyxcblx0fSxcbn0pXG5leHBvcnQgY2xhc3MgTmdiTmF2UGFuZSB7XG5cdEBJbnB1dCgpIGl0ZW06IE5nYk5hdkl0ZW07XG5cdEBJbnB1dCgpIG5hdjogTmdiTmF2O1xuXHRASW5wdXQoKSByb2xlOiBzdHJpbmc7XG5cblx0Y29uc3RydWN0b3IocHVibGljIGVsUmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50Pikge31cbn1cblxuLyoqXG4gKiBUaGUgb3V0bGV0IHdoZXJlIGN1cnJlbnRseSBhY3RpdmUgbmF2IGNvbnRlbnQgd2lsbCBiZSBkaXNwbGF5ZWQuXG4gKlxuICogQHNpbmNlIDUuMi4wXG4gKi9cbkBDb21wb25lbnQoe1xuXHRzZWxlY3RvcjogJ1tuZ2JOYXZPdXRsZXRdJyxcblx0c3RhbmRhbG9uZTogdHJ1ZSxcblx0aW1wb3J0czogW05nYk5hdlBhbmUsIE5nRm9yLCBOZ0lmLCBOZ1RlbXBsYXRlT3V0bGV0XSxcblx0aG9zdDogeyAnW2NsYXNzLnRhYi1jb250ZW50XSc6ICd0cnVlJyB9LFxuXHRlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuXHRjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcblx0dGVtcGxhdGU6IGBcblx0XHQ8bmctdGVtcGxhdGUgbmdGb3IgbGV0LWl0ZW0gW25nRm9yT2ZdPVwibmF2Lml0ZW1zXCI+XG5cdFx0XHQ8ZGl2XG5cdFx0XHRcdG5nYk5hdlBhbmVcblx0XHRcdFx0Km5nSWY9XCJpdGVtLmlzUGFuZWxJbkRvbSgpIHx8IGlzUGFuZWxUcmFuc2l0aW9uaW5nKGl0ZW0pXCJcblx0XHRcdFx0W2l0ZW1dPVwiaXRlbVwiXG5cdFx0XHRcdFtuYXZdPVwibmF2XCJcblx0XHRcdFx0W3JvbGVdPVwicGFuZVJvbGVcIlxuXHRcdFx0PlxuXHRcdFx0XHQ8bmctdGVtcGxhdGVcblx0XHRcdFx0XHRbbmdUZW1wbGF0ZU91dGxldF09XCJpdGVtLmNvbnRlbnRUcGw/LnRlbXBsYXRlUmVmIHx8IG51bGxcIlxuXHRcdFx0XHRcdFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7ICRpbXBsaWNpdDogaXRlbS5hY3RpdmUgfHwgaXNQYW5lbFRyYW5zaXRpb25pbmcoaXRlbSkgfVwiXG5cdFx0XHRcdD48L25nLXRlbXBsYXRlPlxuXHRcdFx0PC9kaXY+XG5cdFx0PC9uZy10ZW1wbGF0ZT5cblx0YCxcbn0pXG5leHBvcnQgY2xhc3MgTmdiTmF2T3V0bGV0IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG5cdHByaXZhdGUgX2FjdGl2ZVBhbmU6IE5nYk5hdlBhbmUgfCBudWxsID0gbnVsbDtcblxuXHRAVmlld0NoaWxkcmVuKE5nYk5hdlBhbmUpIHByaXZhdGUgX3BhbmVzOiBRdWVyeUxpc3Q8TmdiTmF2UGFuZT47XG5cblx0LyoqXG5cdCAqIEEgcm9sZSB0byBzZXQgb24gdGhlIG5hdiBwYW5lXG5cdCAqL1xuXHRASW5wdXQoKSBwYW5lUm9sZTtcblxuXHQvKipcblx0ICogUmVmZXJlbmNlIHRvIHRoZSBgTmdiTmF2YFxuXHQgKi9cblx0QElucHV0KCduZ2JOYXZPdXRsZXQnKSBuYXY6IE5nYk5hdjtcblxuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIF9jZDogQ2hhbmdlRGV0ZWN0b3JSZWYsIHByaXZhdGUgX25nWm9uZTogTmdab25lKSB7fVxuXG5cdGlzUGFuZWxUcmFuc2l0aW9uaW5nKGl0ZW06IE5nYk5hdkl0ZW0pIHtcblx0XHRyZXR1cm4gdGhpcy5fYWN0aXZlUGFuZT8uaXRlbSA9PT0gaXRlbTtcblx0fVxuXG5cdG5nQWZ0ZXJWaWV3SW5pdCgpIHtcblx0XHQvLyBpbml0aWFsIGRpc3BsYXlcblx0XHR0aGlzLl91cGRhdGVBY3RpdmVQYW5lKCk7XG5cblx0XHQvLyB0aGlzIHdpbGwgYmUgZW1pdHRlZCBmb3IgYWxsIDMgdHlwZXMgb2YgbmF2IGNoYW5nZXM6IC5zZWxlY3QoKSwgW2FjdGl2ZUlkXSBvciAoY2xpY2spXG5cdFx0dGhpcy5uYXYubmF2SXRlbUNoYW5nZSRcblx0XHRcdC5waXBlKHRha2VVbnRpbCh0aGlzLm5hdi5kZXN0cm95JCksIHN0YXJ0V2l0aCh0aGlzLl9hY3RpdmVQYW5lPy5pdGVtIHx8IG51bGwpLCBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpLCBza2lwKDEpKVxuXHRcdFx0LnN1YnNjcmliZSgobmV4dEl0ZW0pID0+IHtcblx0XHRcdFx0Y29uc3Qgb3B0aW9uczogTmdiVHJhbnNpdGlvbk9wdGlvbnM8dW5kZWZpbmVkPiA9IHsgYW5pbWF0aW9uOiB0aGlzLm5hdi5hbmltYXRpb24sIHJ1bm5pbmdUcmFuc2l0aW9uOiAnc3RvcCcgfTtcblxuXHRcdFx0XHQvLyBuZXh0IHBhbmVsIHdlJ3JlIHN3aXRjaGluZyB0byB3aWxsIG9ubHkgYXBwZWFyIGluIERPTSBhZnRlciB0aGUgY2hhbmdlIGRldGVjdGlvbiBpcyBkb25lXG5cdFx0XHRcdC8vIGFuZCBgdGhpcy5fcGFuZXNgIHdpbGwgYmUgdXBkYXRlZFxuXHRcdFx0XHR0aGlzLl9jZC5kZXRlY3RDaGFuZ2VzKCk7XG5cblx0XHRcdFx0Ly8gZmFkaW5nIG91dFxuXHRcdFx0XHRpZiAodGhpcy5fYWN0aXZlUGFuZSkge1xuXHRcdFx0XHRcdG5nYlJ1blRyYW5zaXRpb24oXG5cdFx0XHRcdFx0XHR0aGlzLl9uZ1pvbmUsXG5cdFx0XHRcdFx0XHR0aGlzLl9hY3RpdmVQYW5lLmVsUmVmLm5hdGl2ZUVsZW1lbnQsXG5cdFx0XHRcdFx0XHRuZ2JOYXZGYWRlT3V0VHJhbnNpdGlvbixcblx0XHRcdFx0XHRcdG9wdGlvbnMsXG5cdFx0XHRcdFx0KS5zdWJzY3JpYmUoKCkgPT4ge1xuXHRcdFx0XHRcdFx0Y29uc3QgYWN0aXZlSXRlbSA9IHRoaXMuX2FjdGl2ZVBhbmU/Lml0ZW07XG5cdFx0XHRcdFx0XHR0aGlzLl9hY3RpdmVQYW5lID0gdGhpcy5fZ2V0UGFuZUZvckl0ZW0obmV4dEl0ZW0pO1xuXG5cdFx0XHRcdFx0XHQvLyBtYXJrIGZvciBjaGVjayB3aGVuIHRyYW5zaXRpb24gZmluaXNoZXMgYXMgb3V0bGV0IG9yIHBhcmVudCBjb250YWluZXJzIG1pZ2h0IGJlIE9uUHVzaFxuXHRcdFx0XHRcdFx0Ly8gd2l0aG91dCB0aGlzIHRoZSBwYW5lcyB0aGF0IGhhdmUgXCJmYWRlZCBvdXRcIiB3aWxsIHN0YXkgaW4gRE9NXG5cdFx0XHRcdFx0XHR0aGlzLl9jZC5tYXJrRm9yQ2hlY2soKTtcblxuXHRcdFx0XHRcdFx0Ly8gZmFkaW5nIGluXG5cdFx0XHRcdFx0XHRpZiAodGhpcy5fYWN0aXZlUGFuZSkge1xuXHRcdFx0XHRcdFx0XHQvLyB3ZSBoYXZlIHRvIGFkZCB0aGUgJy5hY3RpdmUnIGNsYXNzIGJlZm9yZSBydW5uaW5nIHRoZSB0cmFuc2l0aW9uLFxuXHRcdFx0XHRcdFx0XHQvLyBiZWNhdXNlIGl0IHNob3VsZCBiZSBpbiBwbGFjZSBiZWZvcmUgYG5nYlJ1blRyYW5zaXRpb25gIGRvZXMgYHJlZmxvdygpYFxuXHRcdFx0XHRcdFx0XHR0aGlzLl9hY3RpdmVQYW5lLmVsUmVmLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG5cdFx0XHRcdFx0XHRcdG5nYlJ1blRyYW5zaXRpb24oXG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5fbmdab25lLFxuXHRcdFx0XHRcdFx0XHRcdHRoaXMuX2FjdGl2ZVBhbmUuZWxSZWYubmF0aXZlRWxlbWVudCxcblx0XHRcdFx0XHRcdFx0XHRuZ2JOYXZGYWRlSW5UcmFuc2l0aW9uLFxuXHRcdFx0XHRcdFx0XHRcdG9wdGlvbnMsXG5cdFx0XHRcdFx0XHRcdCkuc3Vic2NyaWJlKCgpID0+IHtcblx0XHRcdFx0XHRcdFx0XHRpZiAobmV4dEl0ZW0pIHtcblx0XHRcdFx0XHRcdFx0XHRcdG5leHRJdGVtLnNob3duLmVtaXQoKTtcblx0XHRcdFx0XHRcdFx0XHRcdHRoaXMubmF2LnNob3duLmVtaXQobmV4dEl0ZW0uaWQpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdGlmIChhY3RpdmVJdGVtKSB7XG5cdFx0XHRcdFx0XHRcdGFjdGl2ZUl0ZW0uaGlkZGVuLmVtaXQoKTtcblx0XHRcdFx0XHRcdFx0dGhpcy5uYXYuaGlkZGVuLmVtaXQoYWN0aXZlSXRlbS5pZCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhpcy5fdXBkYXRlQWN0aXZlUGFuZSgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0fVxuXG5cdHByaXZhdGUgX3VwZGF0ZUFjdGl2ZVBhbmUoKSB7XG5cdFx0dGhpcy5fYWN0aXZlUGFuZSA9IHRoaXMuX2dldEFjdGl2ZVBhbmUoKTtcblx0XHR0aGlzLl9hY3RpdmVQYW5lPy5lbFJlZi5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcblx0XHR0aGlzLl9hY3RpdmVQYW5lPy5lbFJlZi5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuXHR9XG5cblx0cHJpdmF0ZSBfZ2V0UGFuZUZvckl0ZW0oaXRlbTogTmdiTmF2SXRlbSB8IG51bGwpIHtcblx0XHRyZXR1cm4gKHRoaXMuX3BhbmVzICYmIHRoaXMuX3BhbmVzLmZpbmQoKHBhbmUpID0+IHBhbmUuaXRlbSA9PT0gaXRlbSkpIHx8IG51bGw7XG5cdH1cblxuXHRwcml2YXRlIF9nZXRBY3RpdmVQYW5lKCk6IE5nYk5hdlBhbmUgfCBudWxsIHtcblx0XHRyZXR1cm4gKHRoaXMuX3BhbmVzICYmIHRoaXMuX3BhbmVzLmZpbmQoKHBhbmUpID0+IHBhbmUuaXRlbS5hY3RpdmUpKSB8fCBudWxsO1xuXHR9XG59XG4iXX0=