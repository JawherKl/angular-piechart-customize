import { Injectable } from '@angular/core';
import { isInteger } from '../util/util';
import * as i0 from "@angular/core";
export function NGB_DATEPICKER_TIME_ADAPTER_FACTORY() {
    return new NgbTimeStructAdapter();
}
/**
 * An abstract service that does the conversion between the internal timepicker `NgbTimeStruct` model and
 * any provided user time model `T`, ex. a string, a native date, etc.
 *
 * The adapter is used **only** for conversion when binding timepicker to a form control,
 * ex. `[(ngModel)]="userTimeModel"`. Here `userTimeModel` can be of any type.
 *
 * The default timepicker implementation assumes we use `NgbTimeStruct` as a user model.
 *
 * See the [custom time adapter demo](#/components/timepicker/examples#adapter) for an example.
 *
 * @since 2.2.0
 */
class NgbTimeAdapter {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbTimeAdapter, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbTimeAdapter, providedIn: 'root', useFactory: NGB_DATEPICKER_TIME_ADAPTER_FACTORY }); }
}
export { NgbTimeAdapter };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbTimeAdapter, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root', useFactory: NGB_DATEPICKER_TIME_ADAPTER_FACTORY }]
        }] });
class NgbTimeStructAdapter extends NgbTimeAdapter {
    /**
     * Converts a NgbTimeStruct value into NgbTimeStruct value
     */
    fromModel(time) {
        return time && isInteger(time.hour) && isInteger(time.minute)
            ? { hour: time.hour, minute: time.minute, second: isInteger(time.second) ? time.second : null }
            : null;
    }
    /**
     * Converts a NgbTimeStruct value into NgbTimeStruct value
     */
    toModel(time) {
        return time && isInteger(time.hour) && isInteger(time.minute)
            ? { hour: time.hour, minute: time.minute, second: isInteger(time.second) ? time.second : null }
            : null;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbTimeStructAdapter, deps: null, target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbTimeStructAdapter }); }
}
export { NgbTimeStructAdapter };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbTimeStructAdapter, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdiLXRpbWUtYWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy90aW1lcGlja2VyL25nYi10aW1lLWFkYXB0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sY0FBYyxDQUFDOztBQUV6QyxNQUFNLFVBQVUsbUNBQW1DO0lBQ2xELE9BQU8sSUFBSSxvQkFBb0IsRUFBRSxDQUFDO0FBQ25DLENBQUM7QUFFRDs7Ozs7Ozs7Ozs7O0dBWUc7QUFDSCxNQUNzQixjQUFjOzhHQUFkLGNBQWM7a0hBQWQsY0FBYyxjQURWLE1BQU0sY0FBYyxtQ0FBbUM7O1NBQzNELGNBQWM7MkZBQWQsY0FBYztrQkFEbkMsVUFBVTttQkFBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLG1DQUFtQyxFQUFFOztBQWFuRixNQUNhLG9CQUFxQixTQUFRLGNBQTZCO0lBQ3RFOztPQUVHO0lBQ0gsU0FBUyxDQUFDLElBQTBCO1FBQ25DLE9BQU8sSUFBSSxJQUFJLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDNUQsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFNLElBQUksRUFBRTtZQUNwRyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ1QsQ0FBQztJQUVEOztPQUVHO0lBQ0gsT0FBTyxDQUFDLElBQTBCO1FBQ2pDLE9BQU8sSUFBSSxJQUFJLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDNUQsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFNLElBQUksRUFBRTtZQUNwRyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ1QsQ0FBQzs4R0FqQlcsb0JBQW9CO2tIQUFwQixvQkFBb0I7O1NBQXBCLG9CQUFvQjsyRkFBcEIsb0JBQW9CO2tCQURoQyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmdiVGltZVN0cnVjdCB9IGZyb20gJy4vbmdiLXRpbWUtc3RydWN0JztcbmltcG9ydCB7IGlzSW50ZWdlciB9IGZyb20gJy4uL3V0aWwvdXRpbCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBOR0JfREFURVBJQ0tFUl9USU1FX0FEQVBURVJfRkFDVE9SWSgpIHtcblx0cmV0dXJuIG5ldyBOZ2JUaW1lU3RydWN0QWRhcHRlcigpO1xufVxuXG4vKipcbiAqIEFuIGFic3RyYWN0IHNlcnZpY2UgdGhhdCBkb2VzIHRoZSBjb252ZXJzaW9uIGJldHdlZW4gdGhlIGludGVybmFsIHRpbWVwaWNrZXIgYE5nYlRpbWVTdHJ1Y3RgIG1vZGVsIGFuZFxuICogYW55IHByb3ZpZGVkIHVzZXIgdGltZSBtb2RlbCBgVGAsIGV4LiBhIHN0cmluZywgYSBuYXRpdmUgZGF0ZSwgZXRjLlxuICpcbiAqIFRoZSBhZGFwdGVyIGlzIHVzZWQgKipvbmx5KiogZm9yIGNvbnZlcnNpb24gd2hlbiBiaW5kaW5nIHRpbWVwaWNrZXIgdG8gYSBmb3JtIGNvbnRyb2wsXG4gKiBleC4gYFsobmdNb2RlbCldPVwidXNlclRpbWVNb2RlbFwiYC4gSGVyZSBgdXNlclRpbWVNb2RlbGAgY2FuIGJlIG9mIGFueSB0eXBlLlxuICpcbiAqIFRoZSBkZWZhdWx0IHRpbWVwaWNrZXIgaW1wbGVtZW50YXRpb24gYXNzdW1lcyB3ZSB1c2UgYE5nYlRpbWVTdHJ1Y3RgIGFzIGEgdXNlciBtb2RlbC5cbiAqXG4gKiBTZWUgdGhlIFtjdXN0b20gdGltZSBhZGFwdGVyIGRlbW9dKCMvY29tcG9uZW50cy90aW1lcGlja2VyL2V4YW1wbGVzI2FkYXB0ZXIpIGZvciBhbiBleGFtcGxlLlxuICpcbiAqIEBzaW5jZSAyLjIuMFxuICovXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JywgdXNlRmFjdG9yeTogTkdCX0RBVEVQSUNLRVJfVElNRV9BREFQVEVSX0ZBQ1RPUlkgfSlcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBOZ2JUaW1lQWRhcHRlcjxUPiB7XG5cdC8qKlxuXHQgKiBDb252ZXJ0cyBhIHVzZXItbW9kZWwgdGltZSBvZiB0eXBlIGBUYCB0byBhbiBgTmdiVGltZVN0cnVjdGAgZm9yIGludGVybmFsIHVzZS5cblx0ICovXG5cdGFic3RyYWN0IGZyb21Nb2RlbCh2YWx1ZTogVCB8IG51bGwpOiBOZ2JUaW1lU3RydWN0IHwgbnVsbDtcblxuXHQvKipcblx0ICogQ29udmVydHMgYW4gaW50ZXJuYWwgYE5nYlRpbWVTdHJ1Y3RgIHRpbWUgdG8gYSB1c2VyLW1vZGVsIHRpbWUgb2YgdHlwZSBgVGAuXG5cdCAqL1xuXHRhYnN0cmFjdCB0b01vZGVsKHRpbWU6IE5nYlRpbWVTdHJ1Y3QgfCBudWxsKTogVCB8IG51bGw7XG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBOZ2JUaW1lU3RydWN0QWRhcHRlciBleHRlbmRzIE5nYlRpbWVBZGFwdGVyPE5nYlRpbWVTdHJ1Y3Q+IHtcblx0LyoqXG5cdCAqIENvbnZlcnRzIGEgTmdiVGltZVN0cnVjdCB2YWx1ZSBpbnRvIE5nYlRpbWVTdHJ1Y3QgdmFsdWVcblx0ICovXG5cdGZyb21Nb2RlbCh0aW1lOiBOZ2JUaW1lU3RydWN0IHwgbnVsbCk6IE5nYlRpbWVTdHJ1Y3QgfCBudWxsIHtcblx0XHRyZXR1cm4gdGltZSAmJiBpc0ludGVnZXIodGltZS5ob3VyKSAmJiBpc0ludGVnZXIodGltZS5taW51dGUpXG5cdFx0XHQ/IHsgaG91cjogdGltZS5ob3VyLCBtaW51dGU6IHRpbWUubWludXRlLCBzZWNvbmQ6IGlzSW50ZWdlcih0aW1lLnNlY29uZCkgPyB0aW1lLnNlY29uZCA6IDxhbnk+bnVsbCB9XG5cdFx0XHQ6IG51bGw7XG5cdH1cblxuXHQvKipcblx0ICogQ29udmVydHMgYSBOZ2JUaW1lU3RydWN0IHZhbHVlIGludG8gTmdiVGltZVN0cnVjdCB2YWx1ZVxuXHQgKi9cblx0dG9Nb2RlbCh0aW1lOiBOZ2JUaW1lU3RydWN0IHwgbnVsbCk6IE5nYlRpbWVTdHJ1Y3QgfCBudWxsIHtcblx0XHRyZXR1cm4gdGltZSAmJiBpc0ludGVnZXIodGltZS5ob3VyKSAmJiBpc0ludGVnZXIodGltZS5taW51dGUpXG5cdFx0XHQ/IHsgaG91cjogdGltZS5ob3VyLCBtaW51dGU6IHRpbWUubWludXRlLCBzZWNvbmQ6IGlzSW50ZWdlcih0aW1lLnNlY29uZCkgPyB0aW1lLnNlY29uZCA6IDxhbnk+bnVsbCB9XG5cdFx0XHQ6IG51bGw7XG5cdH1cbn1cbiJdfQ==