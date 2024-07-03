import { Injectable } from '@angular/core';
import { TranslationWidth } from '@angular/common';
import * as i0 from "@angular/core";
/**
 * A configuration service for the [`NgbDatepicker`](#/components/datepicker/api#NgbDatepicker) component.
 *
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the datepickers used in the application.
 */
class NgbDatepickerConfig {
    constructor() {
        this.displayMonths = 1;
        this.firstDayOfWeek = 1;
        this.navigation = 'select';
        this.outsideDays = 'visible';
        this.showWeekNumbers = false;
        this.weekdays = TranslationWidth.Short;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbDatepickerConfig, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbDatepickerConfig, providedIn: 'root' }); }
}
export { NgbDatepickerConfig };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbDatepickerConfig, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci1jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvZGF0ZXBpY2tlci9kYXRlcGlja2VyLWNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFlLE1BQU0sZUFBZSxDQUFDO0FBQ3hELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDOztBQUluRDs7Ozs7R0FLRztBQUNILE1BQ2EsbUJBQW1CO0lBRGhDO1FBS0Msa0JBQWEsR0FBRyxDQUFDLENBQUM7UUFDbEIsbUJBQWMsR0FBRyxDQUFDLENBQUM7UUFJbkIsZUFBVSxHQUFpQyxRQUFRLENBQUM7UUFDcEQsZ0JBQVcsR0FBdUMsU0FBUyxDQUFDO1FBQzVELG9CQUFlLEdBQUcsS0FBSyxDQUFDO1FBRXhCLGFBQVEsR0FBK0IsZ0JBQWdCLENBQUMsS0FBSyxDQUFDO0tBQzlEOzhHQWRZLG1CQUFtQjtrSEFBbkIsbUJBQW1CLGNBRE4sTUFBTTs7U0FDbkIsbUJBQW1COzJGQUFuQixtQkFBbUI7a0JBRC9CLFVBQVU7bUJBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRyYW5zbGF0aW9uV2lkdGggfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRGF5VGVtcGxhdGVDb250ZXh0IH0gZnJvbSAnLi9kYXRlcGlja2VyLWRheS10ZW1wbGF0ZS1jb250ZXh0JztcbmltcG9ydCB7IE5nYkRhdGVTdHJ1Y3QgfSBmcm9tICcuL25nYi1kYXRlLXN0cnVjdCc7XG5cbi8qKlxuICogQSBjb25maWd1cmF0aW9uIHNlcnZpY2UgZm9yIHRoZSBbYE5nYkRhdGVwaWNrZXJgXSgjL2NvbXBvbmVudHMvZGF0ZXBpY2tlci9hcGkjTmdiRGF0ZXBpY2tlcikgY29tcG9uZW50LlxuICpcbiAqIFlvdSBjYW4gaW5qZWN0IHRoaXMgc2VydmljZSwgdHlwaWNhbGx5IGluIHlvdXIgcm9vdCBjb21wb25lbnQsIGFuZCBjdXN0b21pemUgdGhlIHZhbHVlcyBvZiBpdHMgcHJvcGVydGllcyBpblxuICogb3JkZXIgdG8gcHJvdmlkZSBkZWZhdWx0IHZhbHVlcyBmb3IgYWxsIHRoZSBkYXRlcGlja2VycyB1c2VkIGluIHRoZSBhcHBsaWNhdGlvbi5cbiAqL1xuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBOZ2JEYXRlcGlja2VyQ29uZmlnIHtcblx0ZGF5VGVtcGxhdGU6IFRlbXBsYXRlUmVmPERheVRlbXBsYXRlQ29udGV4dD47XG5cdGRheVRlbXBsYXRlRGF0YTogKGRhdGU6IE5nYkRhdGVTdHJ1Y3QsIGN1cnJlbnQ/OiB7IHllYXI6IG51bWJlcjsgbW9udGg6IG51bWJlciB9KSA9PiBhbnk7XG5cdGZvb3RlclRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXHRkaXNwbGF5TW9udGhzID0gMTtcblx0Zmlyc3REYXlPZldlZWsgPSAxO1xuXHRtYXJrRGlzYWJsZWQ6IChkYXRlOiBOZ2JEYXRlU3RydWN0LCBjdXJyZW50PzogeyB5ZWFyOiBudW1iZXI7IG1vbnRoOiBudW1iZXIgfSkgPT4gYm9vbGVhbjtcblx0bWluRGF0ZTogTmdiRGF0ZVN0cnVjdDtcblx0bWF4RGF0ZTogTmdiRGF0ZVN0cnVjdDtcblx0bmF2aWdhdGlvbjogJ3NlbGVjdCcgfCAnYXJyb3dzJyB8ICdub25lJyA9ICdzZWxlY3QnO1xuXHRvdXRzaWRlRGF5czogJ3Zpc2libGUnIHwgJ2NvbGxhcHNlZCcgfCAnaGlkZGVuJyA9ICd2aXNpYmxlJztcblx0c2hvd1dlZWtOdW1iZXJzID0gZmFsc2U7XG5cdHN0YXJ0RGF0ZTogeyB5ZWFyOiBudW1iZXI7IG1vbnRoOiBudW1iZXIgfTtcblx0d2Vla2RheXM6IFRyYW5zbGF0aW9uV2lkdGggfCBib29sZWFuID0gVHJhbnNsYXRpb25XaWR0aC5TaG9ydDtcbn1cbiJdfQ==