import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { FormStyle, getLocaleDayPeriods, TranslationWidth } from '@angular/common';
import * as i0 from "@angular/core";
export function NGB_TIMEPICKER_I18N_FACTORY(locale) {
    return new NgbTimepickerI18nDefault(locale);
}
/**
 * Type of the service supplying day periods (for example, 'AM' and 'PM') to NgbTimepicker component.
 * The default implementation of this service honors the Angular locale, and uses the registered locale data,
 * as explained in the Angular i18n guide.
 */
class NgbTimepickerI18n {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbTimepickerI18n, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbTimepickerI18n, providedIn: 'root', useFactory: NGB_TIMEPICKER_I18N_FACTORY, deps: [{ token: LOCALE_ID }] }); }
}
export { NgbTimepickerI18n };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbTimepickerI18n, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root', useFactory: NGB_TIMEPICKER_I18N_FACTORY, deps: [LOCALE_ID] }]
        }] });
class NgbTimepickerI18nDefault extends NgbTimepickerI18n {
    constructor(locale) {
        super();
        this._periods = getLocaleDayPeriods(locale, FormStyle.Standalone, TranslationWidth.Narrow);
    }
    getMorningPeriod() {
        return this._periods[0];
    }
    getAfternoonPeriod() {
        return this._periods[1];
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbTimepickerI18nDefault, deps: [{ token: LOCALE_ID }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbTimepickerI18nDefault }); }
}
export { NgbTimepickerI18nDefault };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbTimepickerI18nDefault, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [LOCALE_ID]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXBpY2tlci1pMThuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3RpbWVwaWNrZXIvdGltZXBpY2tlci1pMThuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsU0FBUyxFQUFFLG1CQUFtQixFQUFFLGdCQUFnQixFQUFFLE1BQU0saUJBQWlCLENBQUM7O0FBRW5GLE1BQU0sVUFBVSwyQkFBMkIsQ0FBQyxNQUFNO0lBQ2pELE9BQU8sSUFBSSx3QkFBd0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUM3QyxDQUFDO0FBRUQ7Ozs7R0FJRztBQUNILE1BQ3NCLGlCQUFpQjs4R0FBakIsaUJBQWlCO2tIQUFqQixpQkFBaUIsY0FEYixNQUFNLGNBQWMsMkJBQTJCLGtCQUFTLFNBQVM7O1NBQ3JFLGlCQUFpQjsyRkFBakIsaUJBQWlCO2tCQUR0QyxVQUFVO21CQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsMkJBQTJCLEVBQUUsSUFBSSxFQUFFLENBQUMsU0FBUyxDQUFDLEVBQUU7O0FBYTlGLE1BQ2Esd0JBQXlCLFNBQVEsaUJBQWlCO0lBRzlELFlBQStCLE1BQWM7UUFDNUMsS0FBSyxFQUFFLENBQUM7UUFFUixJQUFJLENBQUMsUUFBUSxHQUFHLG1CQUFtQixDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsVUFBVSxFQUFFLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzVGLENBQUM7SUFFRCxnQkFBZ0I7UUFDZixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDekIsQ0FBQztJQUVELGtCQUFrQjtRQUNqQixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDekIsQ0FBQzs4R0FmVyx3QkFBd0Isa0JBR2hCLFNBQVM7a0hBSGpCLHdCQUF3Qjs7U0FBeEIsd0JBQXdCOzJGQUF4Qix3QkFBd0I7a0JBRHBDLFVBQVU7OzBCQUlHLE1BQU07MkJBQUMsU0FBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSwgTE9DQUxFX0lEIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtU3R5bGUsIGdldExvY2FsZURheVBlcmlvZHMsIFRyYW5zbGF0aW9uV2lkdGggfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5leHBvcnQgZnVuY3Rpb24gTkdCX1RJTUVQSUNLRVJfSTE4Tl9GQUNUT1JZKGxvY2FsZSkge1xuXHRyZXR1cm4gbmV3IE5nYlRpbWVwaWNrZXJJMThuRGVmYXVsdChsb2NhbGUpO1xufVxuXG4vKipcbiAqIFR5cGUgb2YgdGhlIHNlcnZpY2Ugc3VwcGx5aW5nIGRheSBwZXJpb2RzIChmb3IgZXhhbXBsZSwgJ0FNJyBhbmQgJ1BNJykgdG8gTmdiVGltZXBpY2tlciBjb21wb25lbnQuXG4gKiBUaGUgZGVmYXVsdCBpbXBsZW1lbnRhdGlvbiBvZiB0aGlzIHNlcnZpY2UgaG9ub3JzIHRoZSBBbmd1bGFyIGxvY2FsZSwgYW5kIHVzZXMgdGhlIHJlZ2lzdGVyZWQgbG9jYWxlIGRhdGEsXG4gKiBhcyBleHBsYWluZWQgaW4gdGhlIEFuZ3VsYXIgaTE4biBndWlkZS5cbiAqL1xuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcsIHVzZUZhY3Rvcnk6IE5HQl9USU1FUElDS0VSX0kxOE5fRkFDVE9SWSwgZGVwczogW0xPQ0FMRV9JRF0gfSlcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBOZ2JUaW1lcGlja2VySTE4biB7XG5cdC8qKlxuXHQgKiBSZXR1cm5zIHRoZSBuYW1lIGZvciB0aGUgcGVyaW9kIGJlZm9yZSBtaWRkYXkuXG5cdCAqL1xuXHRhYnN0cmFjdCBnZXRNb3JuaW5nUGVyaW9kKCk6IHN0cmluZztcblxuXHQvKipcblx0ICogUmV0dXJucyB0aGUgbmFtZSBmb3IgdGhlIHBlcmlvZCBhZnRlciBtaWRkYXkuXG5cdCAqL1xuXHRhYnN0cmFjdCBnZXRBZnRlcm5vb25QZXJpb2QoKTogc3RyaW5nO1xufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTmdiVGltZXBpY2tlckkxOG5EZWZhdWx0IGV4dGVuZHMgTmdiVGltZXBpY2tlckkxOG4ge1xuXHRwcml2YXRlIF9wZXJpb2RzOiBSZWFkb25seTxbc3RyaW5nLCBzdHJpbmddPjtcblxuXHRjb25zdHJ1Y3RvcihASW5qZWN0KExPQ0FMRV9JRCkgbG9jYWxlOiBzdHJpbmcpIHtcblx0XHRzdXBlcigpO1xuXG5cdFx0dGhpcy5fcGVyaW9kcyA9IGdldExvY2FsZURheVBlcmlvZHMobG9jYWxlLCBGb3JtU3R5bGUuU3RhbmRhbG9uZSwgVHJhbnNsYXRpb25XaWR0aC5OYXJyb3cpO1xuXHR9XG5cblx0Z2V0TW9ybmluZ1BlcmlvZCgpOiBzdHJpbmcge1xuXHRcdHJldHVybiB0aGlzLl9wZXJpb2RzWzBdO1xuXHR9XG5cblx0Z2V0QWZ0ZXJub29uUGVyaW9kKCk6IHN0cmluZyB7XG5cdFx0cmV0dXJuIHRoaXMuX3BlcmlvZHNbMV07XG5cdH1cbn1cbiJdfQ==