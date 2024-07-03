import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./datepicker-i18n";
class NgbDatepickerDayView {
    constructor(i18n) {
        this.i18n = i18n;
    }
    isMuted() {
        return !this.selected && (this.date.month !== this.currentMonth || this.disabled);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbDatepickerDayView, deps: [{ token: i1.NgbDatepickerI18n }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.6", type: NgbDatepickerDayView, isStandalone: true, selector: "[ngbDatepickerDayView]", inputs: { currentMonth: "currentMonth", date: "date", disabled: "disabled", focused: "focused", selected: "selected" }, host: { properties: { "class.bg-primary": "selected", "class.text-white": "selected", "class.text-muted": "isMuted()", "class.outside": "isMuted()", "class.active": "focused" }, classAttribute: "btn-light" }, ngImport: i0, template: `{{ i18n.getDayNumerals(date) }}`, isInline: true, styles: ["[ngbDatepickerDayView]{text-align:center;width:2rem;height:2rem;line-height:2rem;border-radius:.25rem;background:transparent}[ngbDatepickerDayView]:hover:not(.bg-primary),[ngbDatepickerDayView].active:not(.bg-primary){background-color:var(--bs-btn-bg);outline:1px solid var(--bs-border-color)}[ngbDatepickerDayView].outside{opacity:.5}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None }); }
}
export { NgbDatepickerDayView };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbDatepickerDayView, decorators: [{
            type: Component,
            args: [{ selector: '[ngbDatepickerDayView]', standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, host: {
                        class: 'btn-light',
                        '[class.bg-primary]': 'selected',
                        '[class.text-white]': 'selected',
                        '[class.text-muted]': 'isMuted()',
                        '[class.outside]': 'isMuted()',
                        '[class.active]': 'focused',
                    }, template: `{{ i18n.getDayNumerals(date) }}`, styles: ["[ngbDatepickerDayView]{text-align:center;width:2rem;height:2rem;line-height:2rem;border-radius:.25rem;background:transparent}[ngbDatepickerDayView]:hover:not(.bg-primary),[ngbDatepickerDayView].active:not(.bg-primary){background-color:var(--bs-btn-bg);outline:1px solid var(--bs-border-color)}[ngbDatepickerDayView].outside{opacity:.5}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.NgbDatepickerI18n }]; }, propDecorators: { currentMonth: [{
                type: Input
            }], date: [{
                type: Input
            }], disabled: [{
                type: Input
            }], focused: [{
                type: Input
            }], selected: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci1kYXktdmlldy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kYXRlcGlja2VyL2RhdGVwaWNrZXItZGF5LXZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7OztBQUk3RixNQWdCYSxvQkFBb0I7SUFPaEMsWUFBbUIsSUFBdUI7UUFBdkIsU0FBSSxHQUFKLElBQUksQ0FBbUI7SUFBRyxDQUFDO0lBRTlDLE9BQU87UUFDTixPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ25GLENBQUM7OEdBWFcsb0JBQW9CO2tHQUFwQixvQkFBb0IsMlpBRnRCLGlDQUFpQzs7U0FFL0Isb0JBQW9COzJGQUFwQixvQkFBb0I7a0JBaEJoQyxTQUFTOytCQUNDLHdCQUF3QixjQUN0QixJQUFJLG1CQUNDLHVCQUF1QixDQUFDLE1BQU0saUJBQ2hDLGlCQUFpQixDQUFDLElBQUksUUFFL0I7d0JBQ0wsS0FBSyxFQUFFLFdBQVc7d0JBQ2xCLG9CQUFvQixFQUFFLFVBQVU7d0JBQ2hDLG9CQUFvQixFQUFFLFVBQVU7d0JBQ2hDLG9CQUFvQixFQUFFLFdBQVc7d0JBQ2pDLGlCQUFpQixFQUFFLFdBQVc7d0JBQzlCLGdCQUFnQixFQUFFLFNBQVM7cUJBQzNCLFlBQ1MsaUNBQWlDO3dHQUdsQyxZQUFZO3NCQUFwQixLQUFLO2dCQUNHLElBQUk7c0JBQVosS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUNHLE9BQU87c0JBQWYsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ2JEYXRlIH0gZnJvbSAnLi9uZ2ItZGF0ZSc7XG5pbXBvcnQgeyBOZ2JEYXRlcGlja2VySTE4biB9IGZyb20gJy4vZGF0ZXBpY2tlci1pMThuJztcblxuQENvbXBvbmVudCh7XG5cdHNlbGVjdG9yOiAnW25nYkRhdGVwaWNrZXJEYXlWaWV3XScsXG5cdHN0YW5kYWxvbmU6IHRydWUsXG5cdGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuXHRlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuXHRzdHlsZVVybHM6IFsnLi9kYXRlcGlja2VyLWRheS12aWV3LnNjc3MnXSxcblx0aG9zdDoge1xuXHRcdGNsYXNzOiAnYnRuLWxpZ2h0Jyxcblx0XHQnW2NsYXNzLmJnLXByaW1hcnldJzogJ3NlbGVjdGVkJyxcblx0XHQnW2NsYXNzLnRleHQtd2hpdGVdJzogJ3NlbGVjdGVkJyxcblx0XHQnW2NsYXNzLnRleHQtbXV0ZWRdJzogJ2lzTXV0ZWQoKScsXG5cdFx0J1tjbGFzcy5vdXRzaWRlXSc6ICdpc011dGVkKCknLFxuXHRcdCdbY2xhc3MuYWN0aXZlXSc6ICdmb2N1c2VkJyxcblx0fSxcblx0dGVtcGxhdGU6IGB7eyBpMThuLmdldERheU51bWVyYWxzKGRhdGUpIH19YCxcbn0pXG5leHBvcnQgY2xhc3MgTmdiRGF0ZXBpY2tlckRheVZpZXcge1xuXHRASW5wdXQoKSBjdXJyZW50TW9udGg6IG51bWJlcjtcblx0QElucHV0KCkgZGF0ZTogTmdiRGF0ZTtcblx0QElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW47XG5cdEBJbnB1dCgpIGZvY3VzZWQ6IGJvb2xlYW47XG5cdEBJbnB1dCgpIHNlbGVjdGVkOiBib29sZWFuO1xuXG5cdGNvbnN0cnVjdG9yKHB1YmxpYyBpMThuOiBOZ2JEYXRlcGlja2VySTE4bikge31cblxuXHRpc011dGVkKCkge1xuXHRcdHJldHVybiAhdGhpcy5zZWxlY3RlZCAmJiAodGhpcy5kYXRlLm1vbnRoICE9PSB0aGlzLmN1cnJlbnRNb250aCB8fCB0aGlzLmRpc2FibGVkKTtcblx0fVxufVxuIl19