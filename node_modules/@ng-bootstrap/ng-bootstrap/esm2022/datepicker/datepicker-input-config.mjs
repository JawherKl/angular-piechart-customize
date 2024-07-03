import { Injectable } from '@angular/core';
import { NgbDatepickerConfig } from './datepicker-config';
import * as i0 from "@angular/core";
/**
 * A configuration service for the [`NgbDatepickerInput`](#/components/datepicker/api#NgbDatepicker) component.
 *
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the datepicker inputs used in the application.
 *
 * @since 5.2.0
 */
class NgbInputDatepickerConfig extends NgbDatepickerConfig {
    constructor() {
        super(...arguments);
        this.autoClose = true;
        this.placement = ['bottom-start', 'bottom-end', 'top-start', 'top-end'];
        this.popperOptions = (options) => options;
        this.restoreFocus = true;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbInputDatepickerConfig, deps: null, target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbInputDatepickerConfig, providedIn: 'root' }); }
}
export { NgbInputDatepickerConfig };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbInputDatepickerConfig, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci1pbnB1dC1jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvZGF0ZXBpY2tlci9kYXRlcGlja2VyLWlucHV0LWNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHFCQUFxQixDQUFDOztBQUkxRDs7Ozs7OztHQU9HO0FBQ0gsTUFDYSx3QkFBeUIsU0FBUSxtQkFBbUI7SUFEakU7O1FBRUMsY0FBUyxHQUFtQyxJQUFJLENBQUM7UUFHakQsY0FBUyxHQUFtQixDQUFDLGNBQWMsRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ25GLGtCQUFhLEdBQUcsQ0FBQyxPQUF5QixFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUM7UUFDdkQsaUJBQVksR0FBZ0MsSUFBSSxDQUFDO0tBQ2pEOzhHQVBZLHdCQUF3QjtrSEFBeEIsd0JBQXdCLGNBRFgsTUFBTTs7U0FDbkIsd0JBQXdCOzJGQUF4Qix3QkFBd0I7a0JBRHBDLFVBQVU7bUJBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBOZ2JEYXRlcGlja2VyQ29uZmlnIH0gZnJvbSAnLi9kYXRlcGlja2VyLWNvbmZpZyc7XG5pbXBvcnQgeyBQbGFjZW1lbnRBcnJheSB9IGZyb20gJy4uL3V0aWwvcG9zaXRpb25pbmcnO1xuaW1wb3J0IHsgT3B0aW9ucyB9IGZyb20gJ0Bwb3BwZXJqcy9jb3JlJztcblxuLyoqXG4gKiBBIGNvbmZpZ3VyYXRpb24gc2VydmljZSBmb3IgdGhlIFtgTmdiRGF0ZXBpY2tlcklucHV0YF0oIy9jb21wb25lbnRzL2RhdGVwaWNrZXIvYXBpI05nYkRhdGVwaWNrZXIpIGNvbXBvbmVudC5cbiAqXG4gKiBZb3UgY2FuIGluamVjdCB0aGlzIHNlcnZpY2UsIHR5cGljYWxseSBpbiB5b3VyIHJvb3QgY29tcG9uZW50LCBhbmQgY3VzdG9taXplIHRoZSB2YWx1ZXMgb2YgaXRzIHByb3BlcnRpZXMgaW5cbiAqIG9yZGVyIHRvIHByb3ZpZGUgZGVmYXVsdCB2YWx1ZXMgZm9yIGFsbCB0aGUgZGF0ZXBpY2tlciBpbnB1dHMgdXNlZCBpbiB0aGUgYXBwbGljYXRpb24uXG4gKlxuICogQHNpbmNlIDUuMi4wXG4gKi9cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgTmdiSW5wdXREYXRlcGlja2VyQ29uZmlnIGV4dGVuZHMgTmdiRGF0ZXBpY2tlckNvbmZpZyB7XG5cdGF1dG9DbG9zZTogYm9vbGVhbiB8ICdpbnNpZGUnIHwgJ291dHNpZGUnID0gdHJ1ZTtcblx0Y29udGFpbmVyOiBudWxsIHwgJ2JvZHknO1xuXHRwb3NpdGlvblRhcmdldDogc3RyaW5nIHwgSFRNTEVsZW1lbnQ7XG5cdHBsYWNlbWVudDogUGxhY2VtZW50QXJyYXkgPSBbJ2JvdHRvbS1zdGFydCcsICdib3R0b20tZW5kJywgJ3RvcC1zdGFydCcsICd0b3AtZW5kJ107XG5cdHBvcHBlck9wdGlvbnMgPSAob3B0aW9uczogUGFydGlhbDxPcHRpb25zPikgPT4gb3B0aW9ucztcblx0cmVzdG9yZUZvY3VzOiB0cnVlIHwgSFRNTEVsZW1lbnQgfCBzdHJpbmcgPSB0cnVlO1xufVxuIl19