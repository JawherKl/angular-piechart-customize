import { ChangeDetectionStrategy, Component, ContentChild, EventEmitter, forwardRef, Input, Output, TemplateRef, ViewEncapsulation, } from '@angular/core';
import { getValueInRange } from '../util/util';
import { Key } from '../util/key';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgFor, NgTemplateOutlet } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "./rating-config";
/**
 * A directive that helps visualising and interacting with a star rating bar.
 */
class NgbRating {
    /**
     * Allows to provide a function to set a custom aria-valuetext
     *
     * @since 14.1.0
     */
    ariaValueText(current, max) {
        return `${current} out of ${max}`;
    }
    constructor(config, _changeDetectorRef) {
        this._changeDetectorRef = _changeDetectorRef;
        this.contexts = [];
        /**
         * If `true`, the rating can't be changed or focused.
         */
        this.disabled = false;
        /**
         * An event emitted when the user is hovering over a given rating.
         *
         * Event payload equals to the rating being hovered over.
         */
        this.hover = new EventEmitter();
        /**
         * An event emitted when the user stops hovering over a given rating.
         *
         * Event payload equals to the rating of the last item being hovered over.
         */
        this.leave = new EventEmitter();
        /**
         * An event emitted when the rating is changed.
         *
         * Event payload equals to the newly selected rating.
         */
        this.rateChange = new EventEmitter(true);
        this.onChange = (_) => { };
        this.onTouched = () => { };
        this.max = config.max;
        this.readonly = config.readonly;
        this.tabindex = config.tabindex;
    }
    isInteractive() {
        return !this.readonly && !this.disabled;
    }
    enter(value) {
        if (this.isInteractive()) {
            this._updateState(value);
        }
        this.hover.emit(value);
    }
    handleBlur() {
        this.onTouched();
    }
    handleClick(value) {
        if (this.isInteractive()) {
            this.update(this.resettable && this.rate === value ? 0 : value);
        }
    }
    handleKeyDown(event) {
        /* eslint-disable-next-line deprecation/deprecation */
        switch (event.which) {
            case Key.ArrowDown:
            case Key.ArrowLeft:
                this.update(this.rate - 1);
                break;
            case Key.ArrowUp:
            case Key.ArrowRight:
                this.update(this.rate + 1);
                break;
            case Key.Home:
                this.update(0);
                break;
            case Key.End:
                this.update(this.max);
                break;
            default:
                return;
        }
        // note 'return' in default case
        event.preventDefault();
    }
    ngOnChanges(changes) {
        if (changes['rate']) {
            this.update(this.rate);
        }
        if (changes['max']) {
            this._updateMax();
        }
    }
    ngOnInit() {
        this._setupContexts();
        this._updateState(this.rate);
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    reset() {
        this.leave.emit(this.nextRate);
        this._updateState(this.rate);
    }
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    update(value, internalChange = true) {
        const newRate = getValueInRange(value, this.max, 0);
        if (this.isInteractive() && this.rate !== newRate) {
            this.rate = newRate;
            this.rateChange.emit(this.rate);
        }
        if (internalChange) {
            this.onChange(this.rate);
            this.onTouched();
        }
        this._updateState(this.rate);
    }
    writeValue(value) {
        this.update(value, false);
        this._changeDetectorRef.markForCheck();
    }
    _updateState(nextValue) {
        this.nextRate = nextValue;
        this.contexts.forEach((context, index) => (context.fill = Math.round(getValueInRange(nextValue - index, 1, 0) * 100)));
    }
    _updateMax() {
        if (this.max > 0) {
            this._setupContexts();
            this.update(this.rate);
        }
    }
    _setupContexts() {
        this.contexts = Array.from({ length: this.max }, (v, k) => ({ fill: 0, index: k }));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbRating, deps: [{ token: i1.NgbRatingConfig }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.6", type: NgbRating, isStandalone: true, selector: "ngb-rating", inputs: { disabled: "disabled", max: "max", rate: "rate", readonly: "readonly", resettable: "resettable", starTemplate: "starTemplate", tabindex: "tabindex", ariaValueText: "ariaValueText" }, outputs: { hover: "hover", leave: "leave", rateChange: "rateChange" }, host: { attributes: { "role": "slider", "aria-valuemin": "0" }, listeners: { "blur": "handleBlur()", "keydown": "handleKeyDown($event)", "mouseleave": "reset()" }, properties: { "tabindex": "disabled ? -1 : tabindex", "attr.aria-valuemax": "max", "attr.aria-valuenow": "nextRate", "attr.aria-valuetext": "ariaValueText(nextRate, max)", "attr.aria-readonly": "readonly && !disabled ? true : null", "attr.aria-disabled": "disabled ? true : null" }, classAttribute: "d-inline-flex" }, providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => NgbRating), multi: true }], queries: [{ propertyName: "starTemplateFromContent", first: true, predicate: TemplateRef, descendants: true }], usesOnChanges: true, ngImport: i0, template: `
		<ng-template #t let-fill="fill">{{ fill === 100 ? '&#9733;' : '&#9734;' }}</ng-template>
		<ng-template ngFor [ngForOf]="contexts" let-index="index">
			<span class="visually-hidden">({{ index < nextRate ? '*' : ' ' }})</span>
			<span
				(mouseenter)="enter(index + 1)"
				(click)="handleClick(index + 1)"
				[style.cursor]="isInteractive() ? 'pointer' : 'default'"
			>
				<ng-template
					[ngTemplateOutlet]="starTemplate || starTemplateFromContent || t"
					[ngTemplateOutletContext]="contexts[index]"
				>
				</ng-template>
			</span>
		</ng-template>
	`, isInline: true, dependencies: [{ kind: "directive", type: NgFor, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None }); }
}
export { NgbRating };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbRating, decorators: [{
            type: Component,
            args: [{
                    selector: 'ngb-rating',
                    standalone: true,
                    imports: [NgFor, NgTemplateOutlet],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    host: {
                        class: 'd-inline-flex',
                        '[tabindex]': 'disabled ? -1 : tabindex',
                        role: 'slider',
                        'aria-valuemin': '0',
                        '[attr.aria-valuemax]': 'max',
                        '[attr.aria-valuenow]': 'nextRate',
                        '[attr.aria-valuetext]': 'ariaValueText(nextRate, max)',
                        '[attr.aria-readonly]': 'readonly && !disabled ? true : null',
                        '[attr.aria-disabled]': 'disabled ? true : null',
                        '(blur)': 'handleBlur()',
                        '(keydown)': 'handleKeyDown($event)',
                        '(mouseleave)': 'reset()',
                    },
                    template: `
		<ng-template #t let-fill="fill">{{ fill === 100 ? '&#9733;' : '&#9734;' }}</ng-template>
		<ng-template ngFor [ngForOf]="contexts" let-index="index">
			<span class="visually-hidden">({{ index < nextRate ? '*' : ' ' }})</span>
			<span
				(mouseenter)="enter(index + 1)"
				(click)="handleClick(index + 1)"
				[style.cursor]="isInteractive() ? 'pointer' : 'default'"
			>
				<ng-template
					[ngTemplateOutlet]="starTemplate || starTemplateFromContent || t"
					[ngTemplateOutletContext]="contexts[index]"
				>
				</ng-template>
			</span>
		</ng-template>
	`,
                    providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => NgbRating), multi: true }],
                }]
        }], ctorParameters: function () { return [{ type: i1.NgbRatingConfig }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { disabled: [{
                type: Input
            }], max: [{
                type: Input
            }], rate: [{
                type: Input
            }], readonly: [{
                type: Input
            }], resettable: [{
                type: Input
            }], starTemplate: [{
                type: Input
            }], starTemplateFromContent: [{
                type: ContentChild,
                args: [TemplateRef, { static: false }]
            }], tabindex: [{
                type: Input
            }], ariaValueText: [{
                type: Input
            }], hover: [{
                type: Output
            }], leave: [{
                type: Output
            }], rateChange: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmF0aW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3JhdGluZy9yYXRpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNOLHVCQUF1QixFQUV2QixTQUFTLEVBQ1QsWUFBWSxFQUNaLFlBQVksRUFDWixVQUFVLEVBQ1YsS0FBSyxFQUdMLE1BQU0sRUFFTixXQUFXLEVBQ1gsaUJBQWlCLEdBQ2pCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDL0MsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUNsQyxPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekUsT0FBTyxFQUFFLEtBQUssRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDOzs7QUFpQjFEOztHQUVHO0FBQ0gsTUF1Q2EsU0FBUztJQTZDckI7Ozs7T0FJRztJQUNNLGFBQWEsQ0FBQyxPQUFlLEVBQUUsR0FBVztRQUNsRCxPQUFPLEdBQUcsT0FBTyxXQUFXLEdBQUcsRUFBRSxDQUFDO0lBQ25DLENBQUM7SUEwQkQsWUFBWSxNQUF1QixFQUFVLGtCQUFxQztRQUFyQyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW1CO1FBN0VsRixhQUFRLEdBQTBCLEVBQUUsQ0FBQztRQUdyQzs7V0FFRztRQUNNLGFBQVEsR0FBRyxLQUFLLENBQUM7UUErQzFCOzs7O1dBSUc7UUFDTyxVQUFLLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUU3Qzs7OztXQUlHO1FBQ08sVUFBSyxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7UUFFN0M7Ozs7V0FJRztRQUNPLGVBQVUsR0FBRyxJQUFJLFlBQVksQ0FBUyxJQUFJLENBQUMsQ0FBQztRQUV0RCxhQUFRLEdBQUcsQ0FBQyxDQUFNLEVBQUUsRUFBRSxHQUFFLENBQUMsQ0FBQztRQUMxQixjQUFT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QUs7d0JBQzdCLHNCQUFzQixFQUFFLFVBQVU7d0JBQ2xDLHVCQUF1QixFQUFFLDhCQUE4Qjt3QkFDdkQsc0JBQXNCLEVBQUUscUNBQXFDO3dCQUM3RCxzQkFBc0IsRUFBRSx3QkFBd0I7d0JBQ2hELFFBQVEsRUFBRSxjQUFjO3dCQUN4QixXQUFXLEVBQUUsdUJBQXVCO3dCQUNwQyxjQUFjLEVBQUUsU0FBUztxQkFDekI7b0JBQ0QsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7O0VBZ0JUO29CQUNELFNBQVMsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLFVBQVUsQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQztpQkFDbEc7c0lBUVMsUUFBUTtzQkFBaEIsS0FBSztnQkFLRyxHQUFHO3NCQUFYLEtBQUs7Z0JBS0csSUFBSTtzQkFBWixLQUFLO2dCQUtHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBS0csVUFBVTtzQkFBbEIsS0FBSztnQkFPRyxZQUFZO3NCQUFwQixLQUFLO2dCQUN3Qyx1QkFBdUI7c0JBQXBFLFlBQVk7dUJBQUMsV0FBVyxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTtnQkFRbkMsUUFBUTtzQkFBaEIsS0FBSztnQkFPRyxhQUFhO3NCQUFyQixLQUFLO2dCQVNJLEtBQUs7c0JBQWQsTUFBTTtnQkFPRyxLQUFLO3NCQUFkLE1BQU07Z0JBT0csVUFBVTtzQkFBbkIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG5cdENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuXHRDaGFuZ2VEZXRlY3RvclJlZixcblx0Q29tcG9uZW50LFxuXHRDb250ZW50Q2hpbGQsXG5cdEV2ZW50RW1pdHRlcixcblx0Zm9yd2FyZFJlZixcblx0SW5wdXQsXG5cdE9uQ2hhbmdlcyxcblx0T25Jbml0LFxuXHRPdXRwdXQsXG5cdFNpbXBsZUNoYW5nZXMsXG5cdFRlbXBsYXRlUmVmLFxuXHRWaWV3RW5jYXBzdWxhdGlvbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ2JSYXRpbmdDb25maWcgfSBmcm9tICcuL3JhdGluZy1jb25maWcnO1xuaW1wb3J0IHsgZ2V0VmFsdWVJblJhbmdlIH0gZnJvbSAnLi4vdXRpbC91dGlsJztcbmltcG9ydCB7IEtleSB9IGZyb20gJy4uL3V0aWwva2V5JztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE5nRm9yLCBOZ1RlbXBsYXRlT3V0bGV0IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuLyoqXG4gKiBUaGUgY29udGV4dCBmb3IgdGhlIGN1c3RvbSBzdGFyIGRpc3BsYXkgdGVtcGxhdGUgZGVmaW5lZCBpbiB0aGUgYHN0YXJUZW1wbGF0ZWAuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgU3RhclRlbXBsYXRlQ29udGV4dCB7XG5cdC8qKlxuXHQgKiBUaGUgc3RhciBmaWxsIHBlcmNlbnRhZ2UsIGFuIGludGVnZXIgaW4gdGhlIGBbMCwgMTAwXWAgcmFuZ2UuXG5cdCAqL1xuXHRmaWxsOiBudW1iZXI7XG5cblx0LyoqXG5cdCAqIEluZGV4IG9mIHRoZSBzdGFyLCBzdGFydHMgd2l0aCBgMGAuXG5cdCAqL1xuXHRpbmRleDogbnVtYmVyO1xufVxuXG4vKipcbiAqIEEgZGlyZWN0aXZlIHRoYXQgaGVscHMgdmlzdWFsaXNpbmcgYW5kIGludGVyYWN0aW5nIHdpdGggYSBzdGFyIHJhdGluZyBiYXIuXG4gKi9cbkBDb21wb25lbnQoe1xuXHRzZWxlY3RvcjogJ25nYi1yYXRpbmcnLFxuXHRzdGFuZGFsb25lOiB0cnVlLFxuXHRpbXBvcnRzOiBbTmdGb3IsIE5nVGVtcGxhdGVPdXRsZXRdLFxuXHRjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcblx0ZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcblx0aG9zdDoge1xuXHRcdGNsYXNzOiAnZC1pbmxpbmUtZmxleCcsXG5cdFx0J1t0YWJpbmRleF0nOiAnZGlzYWJsZWQgPyAtMSA6IHRhYmluZGV4Jyxcblx0XHRyb2xlOiAnc2xpZGVyJyxcblx0XHQnYXJpYS12YWx1ZW1pbic6ICcwJyxcblx0XHQnW2F0dHIuYXJpYS12YWx1ZW1heF0nOiAnbWF4Jyxcblx0XHQnW2F0dHIuYXJpYS12YWx1ZW5vd10nOiAnbmV4dFJhdGUnLFxuXHRcdCdbYXR0ci5hcmlhLXZhbHVldGV4dF0nOiAnYXJpYVZhbHVlVGV4dChuZXh0UmF0ZSwgbWF4KScsXG5cdFx0J1thdHRyLmFyaWEtcmVhZG9ubHldJzogJ3JlYWRvbmx5ICYmICFkaXNhYmxlZCA/IHRydWUgOiBudWxsJyxcblx0XHQnW2F0dHIuYXJpYS1kaXNhYmxlZF0nOiAnZGlzYWJsZWQgPyB0cnVlIDogbnVsbCcsXG5cdFx0JyhibHVyKSc6ICdoYW5kbGVCbHVyKCknLFxuXHRcdCcoa2V5ZG93biknOiAnaGFuZGxlS2V5RG93bigkZXZlbnQpJyxcblx0XHQnKG1vdXNlbGVhdmUpJzogJ3Jlc2V0KCknLFxuXHR9LFxuXHR0ZW1wbGF0ZTogYFxuXHRcdDxuZy10ZW1wbGF0ZSAjdCBsZXQtZmlsbD1cImZpbGxcIj57eyBmaWxsID09PSAxMDAgPyAnJiM5NzMzOycgOiAnJiM5NzM0OycgfX08L25nLXRlbXBsYXRlPlxuXHRcdDxuZy10ZW1wbGF0ZSBuZ0ZvciBbbmdGb3JPZl09XCJjb250ZXh0c1wiIGxldC1pbmRleD1cImluZGV4XCI+XG5cdFx0XHQ8c3BhbiBjbGFzcz1cInZpc3VhbGx5LWhpZGRlblwiPih7eyBpbmRleCA8IG5leHRSYXRlID8gJyonIDogJyAnIH19KTwvc3Bhbj5cblx0XHRcdDxzcGFuXG5cdFx0XHRcdChtb3VzZWVudGVyKT1cImVudGVyKGluZGV4ICsgMSlcIlxuXHRcdFx0XHQoY2xpY2spPVwiaGFuZGxlQ2xpY2soaW5kZXggKyAxKVwiXG5cdFx0XHRcdFtzdHlsZS5jdXJzb3JdPVwiaXNJbnRlcmFjdGl2ZSgpID8gJ3BvaW50ZXInIDogJ2RlZmF1bHQnXCJcblx0XHRcdD5cblx0XHRcdFx0PG5nLXRlbXBsYXRlXG5cdFx0XHRcdFx0W25nVGVtcGxhdGVPdXRsZXRdPVwic3RhclRlbXBsYXRlIHx8IHN0YXJUZW1wbGF0ZUZyb21Db250ZW50IHx8IHRcIlxuXHRcdFx0XHRcdFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJjb250ZXh0c1tpbmRleF1cIlxuXHRcdFx0XHQ+XG5cdFx0XHRcdDwvbmctdGVtcGxhdGU+XG5cdFx0XHQ8L3NwYW4+XG5cdFx0PC9uZy10ZW1wbGF0ZT5cblx0YCxcblx0cHJvdmlkZXJzOiBbeyBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUiwgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTmdiUmF0aW5nKSwgbXVsdGk6IHRydWUgfV0sXG59KVxuZXhwb3J0IGNsYXNzIE5nYlJhdGluZyBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBPbkluaXQsIE9uQ2hhbmdlcyB7XG5cdGNvbnRleHRzOiBTdGFyVGVtcGxhdGVDb250ZXh0W10gPSBbXTtcblx0bmV4dFJhdGU6IG51bWJlcjtcblxuXHQvKipcblx0ICogSWYgYHRydWVgLCB0aGUgcmF0aW5nIGNhbid0IGJlIGNoYW5nZWQgb3IgZm9jdXNlZC5cblx0ICovXG5cdEBJbnB1dCgpIGRpc2FibGVkID0gZmFsc2U7XG5cblx0LyoqXG5cdCAqIFRoZSBtYXhpbWFsIHJhdGluZyB0aGF0IGNhbiBiZSBnaXZlbi5cblx0ICovXG5cdEBJbnB1dCgpIG1heDogbnVtYmVyO1xuXG5cdC8qKlxuXHQgKiBUaGUgY3VycmVudCByYXRpbmcuIENvdWxkIGJlIGEgZGVjaW1hbCB2YWx1ZSBsaWtlIGAzLjc1YC5cblx0ICovXG5cdEBJbnB1dCgpIHJhdGU6IG51bWJlcjtcblxuXHQvKipcblx0ICogSWYgYHRydWVgLCB0aGUgcmF0aW5nIGNhbid0IGJlIGNoYW5nZWQuXG5cdCAqL1xuXHRASW5wdXQoKSByZWFkb25seTogYm9vbGVhbjtcblxuXHQvKipcblx0ICogSWYgYHRydWVgLCB0aGUgcmF0aW5nIGNhbiBiZSByZXNldCB0byBgMGAgYnkgbW91c2UgY2xpY2tpbmcgY3VycmVudGx5IHNldCByYXRpbmcuXG5cdCAqL1xuXHRASW5wdXQoKSByZXNldHRhYmxlOiBib29sZWFuO1xuXG5cdC8qKlxuXHQgKiBUaGUgdGVtcGxhdGUgdG8gb3ZlcnJpZGUgdGhlIHdheSBlYWNoIHN0YXIgaXMgZGlzcGxheWVkLlxuXHQgKlxuXHQgKiBBbHRlcm5hdGl2ZWx5IHB1dCBhbiBgPG5nLXRlbXBsYXRlPmAgYXMgdGhlIG9ubHkgY2hpbGQgb2YgeW91ciBgPG5nYi1yYXRpbmc+YCBlbGVtZW50XG5cdCAqL1xuXHRASW5wdXQoKSBzdGFyVGVtcGxhdGU6IFRlbXBsYXRlUmVmPFN0YXJUZW1wbGF0ZUNvbnRleHQ+O1xuXHRAQ29udGVudENoaWxkKFRlbXBsYXRlUmVmLCB7IHN0YXRpYzogZmFsc2UgfSkgc3RhclRlbXBsYXRlRnJvbUNvbnRlbnQ6IFRlbXBsYXRlUmVmPFN0YXJUZW1wbGF0ZUNvbnRleHQ+O1xuXG5cdC8qKlxuXHQgKiBBbGxvd3Mgc2V0dGluZyBhIGN1c3RvbSByYXRpbmcgdGFiaW5kZXguXG5cdCAqIElmIHRoZSBjb21wb25lbnQgaXMgZGlzYWJsZWQsIGB0YWJpbmRleGAgd2lsbCBzdGlsbCBiZSBzZXQgdG8gYC0xYC5cblx0ICpcblx0ICogQHNpbmNlIDEzLjEuMFxuXHQgKi9cblx0QElucHV0KCkgdGFiaW5kZXg6IG51bWJlciB8IHN0cmluZztcblxuXHQvKipcblx0ICogQWxsb3dzIHRvIHByb3ZpZGUgYSBmdW5jdGlvbiB0byBzZXQgYSBjdXN0b20gYXJpYS12YWx1ZXRleHRcblx0ICpcblx0ICogQHNpbmNlIDE0LjEuMFxuXHQgKi9cblx0QElucHV0KCkgYXJpYVZhbHVlVGV4dChjdXJyZW50OiBudW1iZXIsIG1heDogbnVtYmVyKSB7XG5cdFx0cmV0dXJuIGAke2N1cnJlbnR9IG91dCBvZiAke21heH1gO1xuXHR9XG5cblx0LyoqXG5cdCAqIEFuIGV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgdXNlciBpcyBob3ZlcmluZyBvdmVyIGEgZ2l2ZW4gcmF0aW5nLlxuXHQgKlxuXHQgKiBFdmVudCBwYXlsb2FkIGVxdWFscyB0byB0aGUgcmF0aW5nIGJlaW5nIGhvdmVyZWQgb3Zlci5cblx0ICovXG5cdEBPdXRwdXQoKSBob3ZlciA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuXG5cdC8qKlxuXHQgKiBBbiBldmVudCBlbWl0dGVkIHdoZW4gdGhlIHVzZXIgc3RvcHMgaG92ZXJpbmcgb3ZlciBhIGdpdmVuIHJhdGluZy5cblx0ICpcblx0ICogRXZlbnQgcGF5bG9hZCBlcXVhbHMgdG8gdGhlIHJhdGluZyBvZiB0aGUgbGFzdCBpdGVtIGJlaW5nIGhvdmVyZWQgb3Zlci5cblx0ICovXG5cdEBPdXRwdXQoKSBsZWF2ZSA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuXG5cdC8qKlxuXHQgKiBBbiBldmVudCBlbWl0dGVkIHdoZW4gdGhlIHJhdGluZyBpcyBjaGFuZ2VkLlxuXHQgKlxuXHQgKiBFdmVudCBwYXlsb2FkIGVxdWFscyB0byB0aGUgbmV3bHkgc2VsZWN0ZWQgcmF0aW5nLlxuXHQgKi9cblx0QE91dHB1dCgpIHJhdGVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4odHJ1ZSk7XG5cblx0b25DaGFuZ2UgPSAoXzogYW55KSA9PiB7fTtcblx0b25Ub3VjaGVkID0gKCkgPT4ge307XG5cblx0Y29uc3RydWN0b3IoY29uZmlnOiBOZ2JSYXRpbmdDb25maWcsIHByaXZhdGUgX2NoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuXHRcdHRoaXMubWF4ID0gY29uZmlnLm1heDtcblx0XHR0aGlzLnJlYWRvbmx5ID0gY29uZmlnLnJlYWRvbmx5O1xuXHRcdHRoaXMudGFiaW5kZXggPSBjb25maWcudGFiaW5kZXg7XG5cdH1cblxuXHRpc0ludGVyYWN0aXZlKCk6IGJvb2xlYW4ge1xuXHRcdHJldHVybiAhdGhpcy5yZWFkb25seSAmJiAhdGhpcy5kaXNhYmxlZDtcblx0fVxuXG5cdGVudGVyKHZhbHVlOiBudW1iZXIpOiB2b2lkIHtcblx0XHRpZiAodGhpcy5pc0ludGVyYWN0aXZlKCkpIHtcblx0XHRcdHRoaXMuX3VwZGF0ZVN0YXRlKHZhbHVlKTtcblx0XHR9XG5cdFx0dGhpcy5ob3Zlci5lbWl0KHZhbHVlKTtcblx0fVxuXG5cdGhhbmRsZUJsdXIoKSB7XG5cdFx0dGhpcy5vblRvdWNoZWQoKTtcblx0fVxuXG5cdGhhbmRsZUNsaWNrKHZhbHVlOiBudW1iZXIpIHtcblx0XHRpZiAodGhpcy5pc0ludGVyYWN0aXZlKCkpIHtcblx0XHRcdHRoaXMudXBkYXRlKHRoaXMucmVzZXR0YWJsZSAmJiB0aGlzLnJhdGUgPT09IHZhbHVlID8gMCA6IHZhbHVlKTtcblx0XHR9XG5cdH1cblxuXHRoYW5kbGVLZXlEb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG5cdFx0LyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGRlcHJlY2F0aW9uL2RlcHJlY2F0aW9uICovXG5cdFx0c3dpdGNoIChldmVudC53aGljaCkge1xuXHRcdFx0Y2FzZSBLZXkuQXJyb3dEb3duOlxuXHRcdFx0Y2FzZSBLZXkuQXJyb3dMZWZ0OlxuXHRcdFx0XHR0aGlzLnVwZGF0ZSh0aGlzLnJhdGUgLSAxKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIEtleS5BcnJvd1VwOlxuXHRcdFx0Y2FzZSBLZXkuQXJyb3dSaWdodDpcblx0XHRcdFx0dGhpcy51cGRhdGUodGhpcy5yYXRlICsgMSk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBLZXkuSG9tZTpcblx0XHRcdFx0dGhpcy51cGRhdGUoMCk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBLZXkuRW5kOlxuXHRcdFx0XHR0aGlzLnVwZGF0ZSh0aGlzLm1heCk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIG5vdGUgJ3JldHVybicgaW4gZGVmYXVsdCBjYXNlXG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0fVxuXG5cdG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcblx0XHRpZiAoY2hhbmdlc1sncmF0ZSddKSB7XG5cdFx0XHR0aGlzLnVwZGF0ZSh0aGlzLnJhdGUpO1xuXHRcdH1cblx0XHRpZiAoY2hhbmdlc1snbWF4J10pIHtcblx0XHRcdHRoaXMuX3VwZGF0ZU1heCgpO1xuXHRcdH1cblx0fVxuXG5cdG5nT25Jbml0KCk6IHZvaWQge1xuXHRcdHRoaXMuX3NldHVwQ29udGV4dHMoKTtcblx0XHR0aGlzLl91cGRhdGVTdGF0ZSh0aGlzLnJhdGUpO1xuXHR9XG5cblx0cmVnaXN0ZXJPbkNoYW5nZShmbjogKHZhbHVlOiBhbnkpID0+IGFueSk6IHZvaWQge1xuXHRcdHRoaXMub25DaGFuZ2UgPSBmbjtcblx0fVxuXG5cdHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiAoKSA9PiBhbnkpOiB2b2lkIHtcblx0XHR0aGlzLm9uVG91Y2hlZCA9IGZuO1xuXHR9XG5cblx0cmVzZXQoKTogdm9pZCB7XG5cdFx0dGhpcy5sZWF2ZS5lbWl0KHRoaXMubmV4dFJhdGUpO1xuXHRcdHRoaXMuX3VwZGF0ZVN0YXRlKHRoaXMucmF0ZSk7XG5cdH1cblxuXHRzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pIHtcblx0XHR0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcblx0fVxuXG5cdHVwZGF0ZSh2YWx1ZTogbnVtYmVyLCBpbnRlcm5hbENoYW5nZSA9IHRydWUpOiB2b2lkIHtcblx0XHRjb25zdCBuZXdSYXRlID0gZ2V0VmFsdWVJblJhbmdlKHZhbHVlLCB0aGlzLm1heCwgMCk7XG5cdFx0aWYgKHRoaXMuaXNJbnRlcmFjdGl2ZSgpICYmIHRoaXMucmF0ZSAhPT0gbmV3UmF0ZSkge1xuXHRcdFx0dGhpcy5yYXRlID0gbmV3UmF0ZTtcblx0XHRcdHRoaXMucmF0ZUNoYW5nZS5lbWl0KHRoaXMucmF0ZSk7XG5cdFx0fVxuXHRcdGlmIChpbnRlcm5hbENoYW5nZSkge1xuXHRcdFx0dGhpcy5vbkNoYW5nZSh0aGlzLnJhdGUpO1xuXHRcdFx0dGhpcy5vblRvdWNoZWQoKTtcblx0XHR9XG5cdFx0dGhpcy5fdXBkYXRlU3RhdGUodGhpcy5yYXRlKTtcblx0fVxuXG5cdHdyaXRlVmFsdWUodmFsdWUpIHtcblx0XHR0aGlzLnVwZGF0ZSh2YWx1ZSwgZmFsc2UpO1xuXHRcdHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuXHR9XG5cblx0cHJpdmF0ZSBfdXBkYXRlU3RhdGUobmV4dFZhbHVlOiBudW1iZXIpIHtcblx0XHR0aGlzLm5leHRSYXRlID0gbmV4dFZhbHVlO1xuXHRcdHRoaXMuY29udGV4dHMuZm9yRWFjaChcblx0XHRcdChjb250ZXh0LCBpbmRleCkgPT4gKGNvbnRleHQuZmlsbCA9IE1hdGgucm91bmQoZ2V0VmFsdWVJblJhbmdlKG5leHRWYWx1ZSAtIGluZGV4LCAxLCAwKSAqIDEwMCkpLFxuXHRcdCk7XG5cdH1cblxuXHRwcml2YXRlIF91cGRhdGVNYXgoKSB7XG5cdFx0aWYgKHRoaXMubWF4ID4gMCkge1xuXHRcdFx0dGhpcy5fc2V0dXBDb250ZXh0cygpO1xuXHRcdFx0dGhpcy51cGRhdGUodGhpcy5yYXRlKTtcblx0XHR9XG5cdH1cblxuXHRwcml2YXRlIF9zZXR1cENvbnRleHRzKCkge1xuXHRcdHRoaXMuY29udGV4dHMgPSBBcnJheS5mcm9tKHsgbGVuZ3RoOiB0aGlzLm1heCB9LCAodiwgaykgPT4gKHsgZmlsbDogMCwgaW5kZXg6IGsgfSkpO1xuXHR9XG59XG4iXX0=