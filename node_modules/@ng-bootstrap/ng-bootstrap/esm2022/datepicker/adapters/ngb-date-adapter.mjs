import { Injectable } from '@angular/core';
import { isInteger } from '../../util/util';
import * as i0 from "@angular/core";
export function NGB_DATEPICKER_DATE_ADAPTER_FACTORY() {
    return new NgbDateStructAdapter();
}
/**
 * An abstract service that does the conversion between the internal datepicker `NgbDateStruct` model and
 * any provided user date model `D`, ex. a string, a native date, etc.
 *
 * The adapter is used **only** for conversion when binding datepicker to a form control,
 * ex. `[(ngModel)]="userDateModel"`. Here `userDateModel` can be of any type.
 *
 * The default datepicker implementation assumes we use `NgbDateStruct` as a user model.
 *
 * See the [date format overview](#/components/datepicker/overview#date-model) for more details
 * and the [custom adapter demo](#/components/datepicker/examples#adapter) for an example.
 */
class NgbDateAdapter {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbDateAdapter, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbDateAdapter, providedIn: 'root', useFactory: NGB_DATEPICKER_DATE_ADAPTER_FACTORY }); }
}
export { NgbDateAdapter };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbDateAdapter, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root', useFactory: NGB_DATEPICKER_DATE_ADAPTER_FACTORY }]
        }] });
class NgbDateStructAdapter extends NgbDateAdapter {
    /**
     * Converts a NgbDateStruct value into NgbDateStruct value
     */
    fromModel(date) {
        return date && isInteger(date.year) && isInteger(date.month) && isInteger(date.day)
            ? { year: date.year, month: date.month, day: date.day }
            : null;
    }
    /**
     * Converts a NgbDateStruct value into NgbDateStruct value
     */
    toModel(date) {
        return date && isInteger(date.year) && isInteger(date.month) && isInteger(date.day)
            ? { year: date.year, month: date.month, day: date.day }
            : null;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbDateStructAdapter, deps: null, target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbDateStructAdapter }); }
}
export { NgbDateStructAdapter };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbDateStructAdapter, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdiLWRhdGUtYWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9kYXRlcGlja2VyL2FkYXB0ZXJzL25nYi1kYXRlLWFkYXB0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0saUJBQWlCLENBQUM7O0FBRTVDLE1BQU0sVUFBVSxtQ0FBbUM7SUFDbEQsT0FBTyxJQUFJLG9CQUFvQixFQUFFLENBQUM7QUFDbkMsQ0FBQztBQUVEOzs7Ozs7Ozs7OztHQVdHO0FBQ0gsTUFDc0IsY0FBYzs4R0FBZCxjQUFjO2tIQUFkLGNBQWMsY0FEVixNQUFNLGNBQWMsbUNBQW1DOztTQUMzRCxjQUFjOzJGQUFkLGNBQWM7a0JBRG5DLFVBQVU7bUJBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxtQ0FBbUMsRUFBRTs7QUFhbkYsTUFDYSxvQkFBcUIsU0FBUSxjQUE2QjtJQUN0RTs7T0FFRztJQUNILFNBQVMsQ0FBQyxJQUEwQjtRQUNuQyxPQUFPLElBQUksSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7WUFDbEYsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDdkQsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUNULENBQUM7SUFFRDs7T0FFRztJQUNILE9BQU8sQ0FBQyxJQUEwQjtRQUNqQyxPQUFPLElBQUksSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7WUFDbEYsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDdkQsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUNULENBQUM7OEdBakJXLG9CQUFvQjtrSEFBcEIsb0JBQW9COztTQUFwQixvQkFBb0I7MkZBQXBCLG9CQUFvQjtrQkFEaEMsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5nYkRhdGVTdHJ1Y3QgfSBmcm9tICcuLi9uZ2ItZGF0ZS1zdHJ1Y3QnO1xuaW1wb3J0IHsgaXNJbnRlZ2VyIH0gZnJvbSAnLi4vLi4vdXRpbC91dGlsJztcblxuZXhwb3J0IGZ1bmN0aW9uIE5HQl9EQVRFUElDS0VSX0RBVEVfQURBUFRFUl9GQUNUT1JZKCkge1xuXHRyZXR1cm4gbmV3IE5nYkRhdGVTdHJ1Y3RBZGFwdGVyKCk7XG59XG5cbi8qKlxuICogQW4gYWJzdHJhY3Qgc2VydmljZSB0aGF0IGRvZXMgdGhlIGNvbnZlcnNpb24gYmV0d2VlbiB0aGUgaW50ZXJuYWwgZGF0ZXBpY2tlciBgTmdiRGF0ZVN0cnVjdGAgbW9kZWwgYW5kXG4gKiBhbnkgcHJvdmlkZWQgdXNlciBkYXRlIG1vZGVsIGBEYCwgZXguIGEgc3RyaW5nLCBhIG5hdGl2ZSBkYXRlLCBldGMuXG4gKlxuICogVGhlIGFkYXB0ZXIgaXMgdXNlZCAqKm9ubHkqKiBmb3IgY29udmVyc2lvbiB3aGVuIGJpbmRpbmcgZGF0ZXBpY2tlciB0byBhIGZvcm0gY29udHJvbCxcbiAqIGV4LiBgWyhuZ01vZGVsKV09XCJ1c2VyRGF0ZU1vZGVsXCJgLiBIZXJlIGB1c2VyRGF0ZU1vZGVsYCBjYW4gYmUgb2YgYW55IHR5cGUuXG4gKlxuICogVGhlIGRlZmF1bHQgZGF0ZXBpY2tlciBpbXBsZW1lbnRhdGlvbiBhc3N1bWVzIHdlIHVzZSBgTmdiRGF0ZVN0cnVjdGAgYXMgYSB1c2VyIG1vZGVsLlxuICpcbiAqIFNlZSB0aGUgW2RhdGUgZm9ybWF0IG92ZXJ2aWV3XSgjL2NvbXBvbmVudHMvZGF0ZXBpY2tlci9vdmVydmlldyNkYXRlLW1vZGVsKSBmb3IgbW9yZSBkZXRhaWxzXG4gKiBhbmQgdGhlIFtjdXN0b20gYWRhcHRlciBkZW1vXSgjL2NvbXBvbmVudHMvZGF0ZXBpY2tlci9leGFtcGxlcyNhZGFwdGVyKSBmb3IgYW4gZXhhbXBsZS5cbiAqL1xuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcsIHVzZUZhY3Rvcnk6IE5HQl9EQVRFUElDS0VSX0RBVEVfQURBUFRFUl9GQUNUT1JZIH0pXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgTmdiRGF0ZUFkYXB0ZXI8RD4ge1xuXHQvKipcblx0ICogQ29udmVydHMgYSB1c2VyLW1vZGVsIGRhdGUgb2YgdHlwZSBgRGAgdG8gYW4gYE5nYkRhdGVTdHJ1Y3RgIGZvciBpbnRlcm5hbCB1c2UuXG5cdCAqL1xuXHRhYnN0cmFjdCBmcm9tTW9kZWwodmFsdWU6IEQgfCBudWxsKTogTmdiRGF0ZVN0cnVjdCB8IG51bGw7XG5cblx0LyoqXG5cdCAqIENvbnZlcnRzIGFuIGludGVybmFsIGBOZ2JEYXRlU3RydWN0YCBkYXRlIHRvIGEgdXNlci1tb2RlbCBkYXRlIG9mIHR5cGUgYERgLlxuXHQgKi9cblx0YWJzdHJhY3QgdG9Nb2RlbChkYXRlOiBOZ2JEYXRlU3RydWN0IHwgbnVsbCk6IEQgfCBudWxsO1xufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTmdiRGF0ZVN0cnVjdEFkYXB0ZXIgZXh0ZW5kcyBOZ2JEYXRlQWRhcHRlcjxOZ2JEYXRlU3RydWN0PiB7XG5cdC8qKlxuXHQgKiBDb252ZXJ0cyBhIE5nYkRhdGVTdHJ1Y3QgdmFsdWUgaW50byBOZ2JEYXRlU3RydWN0IHZhbHVlXG5cdCAqL1xuXHRmcm9tTW9kZWwoZGF0ZTogTmdiRGF0ZVN0cnVjdCB8IG51bGwpOiBOZ2JEYXRlU3RydWN0IHwgbnVsbCB7XG5cdFx0cmV0dXJuIGRhdGUgJiYgaXNJbnRlZ2VyKGRhdGUueWVhcikgJiYgaXNJbnRlZ2VyKGRhdGUubW9udGgpICYmIGlzSW50ZWdlcihkYXRlLmRheSlcblx0XHRcdD8geyB5ZWFyOiBkYXRlLnllYXIsIG1vbnRoOiBkYXRlLm1vbnRoLCBkYXk6IGRhdGUuZGF5IH1cblx0XHRcdDogbnVsbDtcblx0fVxuXG5cdC8qKlxuXHQgKiBDb252ZXJ0cyBhIE5nYkRhdGVTdHJ1Y3QgdmFsdWUgaW50byBOZ2JEYXRlU3RydWN0IHZhbHVlXG5cdCAqL1xuXHR0b01vZGVsKGRhdGU6IE5nYkRhdGVTdHJ1Y3QgfCBudWxsKTogTmdiRGF0ZVN0cnVjdCB8IG51bGwge1xuXHRcdHJldHVybiBkYXRlICYmIGlzSW50ZWdlcihkYXRlLnllYXIpICYmIGlzSW50ZWdlcihkYXRlLm1vbnRoKSAmJiBpc0ludGVnZXIoZGF0ZS5kYXkpXG5cdFx0XHQ/IHsgeWVhcjogZGF0ZS55ZWFyLCBtb250aDogZGF0ZS5tb250aCwgZGF5OiBkYXRlLmRheSB9XG5cdFx0XHQ6IG51bGw7XG5cdH1cbn1cbiJdfQ==