import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { formatDate, FormStyle, getLocaleDayNames, getLocaleMonthNames, TranslationWidth } from '@angular/common';
import * as i0 from "@angular/core";
export function NGB_DATEPICKER_18N_FACTORY(locale) {
    return new NgbDatepickerI18nDefault(locale);
}
/**
 * A service supplying i18n data to the datepicker component.
 *
 * The default implementation of this service uses the Angular locale and registered locale data for
 * weekdays and month names (as explained in the Angular i18n guide).
 *
 * It also provides a way to i18n data that depends on calendar calculations, like aria labels, day, week and year
 * numerals. For other static labels the datepicker uses the default Angular i18n.
 *
 * See the [i18n demo](#/components/datepicker/examples#i18n) and
 * [Hebrew calendar demo](#/components/datepicker/calendars#hebrew) on how to extend this class and define
 * a custom provider for i18n.
 */
class NgbDatepickerI18n {
    /**
     * Returns the text label to display above the day view.
     *
     * @since 9.1.0
     */
    getMonthLabel(date) {
        return `${this.getMonthFullName(date.month, date.year)} ${this.getYearNumerals(date.year)}`;
    }
    /**
     * Returns the textual representation of a day that is rendered in a day cell.
     *
     * @since 3.0.0
     */
    getDayNumerals(date) {
        return `${date.day}`;
    }
    /**
     * Returns the textual representation of a week number rendered by datepicker.
     *
     * @since 3.0.0
     */
    getWeekNumerals(weekNumber) {
        return `${weekNumber}`;
    }
    /**
     * Returns the textual representation of a year that is rendered in the datepicker year select box.
     *
     * @since 3.0.0
     */
    getYearNumerals(year) {
        return `${year}`;
    }
    /**
     * Returns the week label to display in the heading of the month view.
     *
     * @since 9.1.0
     */
    getWeekLabel() {
        return '';
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbDatepickerI18n, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbDatepickerI18n, providedIn: 'root', useFactory: NGB_DATEPICKER_18N_FACTORY, deps: [{ token: LOCALE_ID }] }); }
}
export { NgbDatepickerI18n };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbDatepickerI18n, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root', useFactory: NGB_DATEPICKER_18N_FACTORY, deps: [LOCALE_ID] }]
        }] });
/**
 * A service providing default implementation for the datepicker i18n.
 * It can be used as a base implementation if necessary.
 *
 * @since 9.1.0
 */
class NgbDatepickerI18nDefault extends NgbDatepickerI18n {
    constructor(_locale) {
        super();
        this._locale = _locale;
        this._monthsShort = getLocaleMonthNames(_locale, FormStyle.Standalone, TranslationWidth.Abbreviated);
        this._monthsFull = getLocaleMonthNames(_locale, FormStyle.Standalone, TranslationWidth.Wide);
    }
    getWeekdayLabel(weekday, width) {
        const weekdaysStartingOnSunday = getLocaleDayNames(this._locale, FormStyle.Standalone, width === undefined ? TranslationWidth.Short : width);
        const weekdays = weekdaysStartingOnSunday.map((day, index) => weekdaysStartingOnSunday[(index + 1) % 7]);
        return weekdays[weekday - 1] || '';
    }
    getMonthShortName(month) {
        return this._monthsShort[month - 1] || '';
    }
    getMonthFullName(month) {
        return this._monthsFull[month - 1] || '';
    }
    getDayAriaLabel(date) {
        const jsDate = new Date(date.year, date.month - 1, date.day);
        return formatDate(jsDate, 'fullDate', this._locale);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbDatepickerI18nDefault, deps: [{ token: LOCALE_ID }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbDatepickerI18nDefault }); }
}
export { NgbDatepickerI18nDefault };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbDatepickerI18nDefault, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [LOCALE_ID]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci1pMThuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2RhdGVwaWNrZXIvZGF0ZXBpY2tlci1pMThuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxpQkFBaUIsRUFBRSxtQkFBbUIsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDOztBQUdsSCxNQUFNLFVBQVUsMEJBQTBCLENBQUMsTUFBTTtJQUNoRCxPQUFPLElBQUksd0JBQXdCLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDN0MsQ0FBQztBQUVEOzs7Ozs7Ozs7Ozs7R0FZRztBQUNILE1BQ3NCLGlCQUFpQjtJQXNCdEM7Ozs7T0FJRztJQUNILGFBQWEsQ0FBQyxJQUFtQjtRQUNoQyxPQUFPLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7SUFDN0YsQ0FBQztJQVNEOzs7O09BSUc7SUFDSCxjQUFjLENBQUMsSUFBbUI7UUFDakMsT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILGVBQWUsQ0FBQyxVQUFrQjtRQUNqQyxPQUFPLEdBQUcsVUFBVSxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxlQUFlLENBQUMsSUFBWTtRQUMzQixPQUFPLEdBQUcsSUFBSSxFQUFFLENBQUM7SUFDbEIsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxZQUFZO1FBQ1gsT0FBTyxFQUFFLENBQUM7SUFDWCxDQUFDOzhHQXhFb0IsaUJBQWlCO2tIQUFqQixpQkFBaUIsY0FEYixNQUFNLGNBQWMsMEJBQTBCLGtCQUFTLFNBQVM7O1NBQ3BFLGlCQUFpQjsyRkFBakIsaUJBQWlCO2tCQUR0QyxVQUFVO21CQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsMEJBQTBCLEVBQUUsSUFBSSxFQUFFLENBQUMsU0FBUyxDQUFDLEVBQUU7O0FBNEU3Rjs7Ozs7R0FLRztBQUNILE1BQ2Esd0JBQXlCLFNBQVEsaUJBQWlCO0lBSTlELFlBQXVDLE9BQWU7UUFDckQsS0FBSyxFQUFFLENBQUM7UUFEOEIsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUdyRCxJQUFJLENBQUMsWUFBWSxHQUFHLG1CQUFtQixDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsVUFBVSxFQUFFLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3JHLElBQUksQ0FBQyxXQUFXLEdBQUcsbUJBQW1CLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxVQUFVLEVBQUUsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUYsQ0FBQztJQUVELGVBQWUsQ0FBQyxPQUFlLEVBQUUsS0FBd0I7UUFDeEQsTUFBTSx3QkFBd0IsR0FBRyxpQkFBaUIsQ0FDakQsSUFBSSxDQUFDLE9BQU8sRUFDWixTQUFTLENBQUMsVUFBVSxFQUNwQixLQUFLLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FDcEQsQ0FBQztRQUNGLE1BQU0sUUFBUSxHQUFHLHdCQUF3QixDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLHdCQUF3QixDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekcsT0FBTyxRQUFRLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNwQyxDQUFDO0lBRUQsaUJBQWlCLENBQUMsS0FBYTtRQUM5QixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUMzQyxDQUFDO0lBRUQsZ0JBQWdCLENBQUMsS0FBYTtRQUM3QixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUMxQyxDQUFDO0lBRUQsZUFBZSxDQUFDLElBQW1CO1FBQ2xDLE1BQU0sTUFBTSxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzdELE9BQU8sVUFBVSxDQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3JELENBQUM7OEdBaENXLHdCQUF3QixrQkFJaEIsU0FBUztrSEFKakIsd0JBQXdCOztTQUF4Qix3QkFBd0I7MkZBQXhCLHdCQUF3QjtrQkFEcEMsVUFBVTs7MEJBS0csTUFBTTsyQkFBQyxTQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlLCBMT0NBTEVfSUQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGZvcm1hdERhdGUsIEZvcm1TdHlsZSwgZ2V0TG9jYWxlRGF5TmFtZXMsIGdldExvY2FsZU1vbnRoTmFtZXMsIFRyYW5zbGF0aW9uV2lkdGggfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdiRGF0ZVN0cnVjdCB9IGZyb20gJy4vbmdiLWRhdGUtc3RydWN0JztcblxuZXhwb3J0IGZ1bmN0aW9uIE5HQl9EQVRFUElDS0VSXzE4Tl9GQUNUT1JZKGxvY2FsZSkge1xuXHRyZXR1cm4gbmV3IE5nYkRhdGVwaWNrZXJJMThuRGVmYXVsdChsb2NhbGUpO1xufVxuXG4vKipcbiAqIEEgc2VydmljZSBzdXBwbHlpbmcgaTE4biBkYXRhIHRvIHRoZSBkYXRlcGlja2VyIGNvbXBvbmVudC5cbiAqXG4gKiBUaGUgZGVmYXVsdCBpbXBsZW1lbnRhdGlvbiBvZiB0aGlzIHNlcnZpY2UgdXNlcyB0aGUgQW5ndWxhciBsb2NhbGUgYW5kIHJlZ2lzdGVyZWQgbG9jYWxlIGRhdGEgZm9yXG4gKiB3ZWVrZGF5cyBhbmQgbW9udGggbmFtZXMgKGFzIGV4cGxhaW5lZCBpbiB0aGUgQW5ndWxhciBpMThuIGd1aWRlKS5cbiAqXG4gKiBJdCBhbHNvIHByb3ZpZGVzIGEgd2F5IHRvIGkxOG4gZGF0YSB0aGF0IGRlcGVuZHMgb24gY2FsZW5kYXIgY2FsY3VsYXRpb25zLCBsaWtlIGFyaWEgbGFiZWxzLCBkYXksIHdlZWsgYW5kIHllYXJcbiAqIG51bWVyYWxzLiBGb3Igb3RoZXIgc3RhdGljIGxhYmVscyB0aGUgZGF0ZXBpY2tlciB1c2VzIHRoZSBkZWZhdWx0IEFuZ3VsYXIgaTE4bi5cbiAqXG4gKiBTZWUgdGhlIFtpMThuIGRlbW9dKCMvY29tcG9uZW50cy9kYXRlcGlja2VyL2V4YW1wbGVzI2kxOG4pIGFuZFxuICogW0hlYnJldyBjYWxlbmRhciBkZW1vXSgjL2NvbXBvbmVudHMvZGF0ZXBpY2tlci9jYWxlbmRhcnMjaGVicmV3KSBvbiBob3cgdG8gZXh0ZW5kIHRoaXMgY2xhc3MgYW5kIGRlZmluZVxuICogYSBjdXN0b20gcHJvdmlkZXIgZm9yIGkxOG4uXG4gKi9cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnLCB1c2VGYWN0b3J5OiBOR0JfREFURVBJQ0tFUl8xOE5fRkFDVE9SWSwgZGVwczogW0xPQ0FMRV9JRF0gfSlcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBOZ2JEYXRlcGlja2VySTE4biB7XG5cdC8qKlxuXHQgKiBSZXR1cm5zIHRoZSB3ZWVrZGF5IGxhYmVsIHVzaW5nIHNwZWNpZmllZCB3aWR0aFxuXHQgKlxuXHQgKiBAc2luY2UgOS4xLjBcblx0ICovXG5cdGFic3RyYWN0IGdldFdlZWtkYXlMYWJlbCh3ZWVrZGF5OiBudW1iZXIsIHdpZHRoPzogVHJhbnNsYXRpb25XaWR0aCk6IHN0cmluZztcblxuXHQvKipcblx0ICogUmV0dXJucyB0aGUgc2hvcnQgbW9udGggbmFtZSB0byBkaXNwbGF5IGluIHRoZSBkYXRlIHBpY2tlciBuYXZpZ2F0aW9uLlxuXHQgKlxuXHQgKiBXaXRoIGRlZmF1bHQgY2FsZW5kYXIgd2UgdXNlIElTTyA4NjAxOiAnbW9udGgnIGlzIDE9SmFuIC4uLiAxMj1EZWMuXG5cdCAqL1xuXHRhYnN0cmFjdCBnZXRNb250aFNob3J0TmFtZShtb250aDogbnVtYmVyLCB5ZWFyPzogbnVtYmVyKTogc3RyaW5nO1xuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIHRoZSBmdWxsIG1vbnRoIG5hbWUgdG8gZGlzcGxheSBpbiB0aGUgZGF0ZSBwaWNrZXIgbmF2aWdhdGlvbi5cblx0ICpcblx0ICogV2l0aCBkZWZhdWx0IGNhbGVuZGFyIHdlIHVzZSBJU08gODYwMTogJ21vbnRoJyBpcyAxPUphbiAuLi4gMTI9RGVjLlxuXHQgKi9cblx0YWJzdHJhY3QgZ2V0TW9udGhGdWxsTmFtZShtb250aDogbnVtYmVyLCB5ZWFyPzogbnVtYmVyKTogc3RyaW5nO1xuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIHRoZSB0ZXh0IGxhYmVsIHRvIGRpc3BsYXkgYWJvdmUgdGhlIGRheSB2aWV3LlxuXHQgKlxuXHQgKiBAc2luY2UgOS4xLjBcblx0ICovXG5cdGdldE1vbnRoTGFiZWwoZGF0ZTogTmdiRGF0ZVN0cnVjdCk6IHN0cmluZyB7XG5cdFx0cmV0dXJuIGAke3RoaXMuZ2V0TW9udGhGdWxsTmFtZShkYXRlLm1vbnRoLCBkYXRlLnllYXIpfSAke3RoaXMuZ2V0WWVhck51bWVyYWxzKGRhdGUueWVhcil9YDtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIHRoZSB2YWx1ZSBvZiB0aGUgYGFyaWEtbGFiZWxgIGF0dHJpYnV0ZSBmb3IgYSBzcGVjaWZpYyBkYXRlLlxuXHQgKlxuXHQgKiBAc2luY2UgMi4wLjBcblx0ICovXG5cdGFic3RyYWN0IGdldERheUFyaWFMYWJlbChkYXRlOiBOZ2JEYXRlU3RydWN0KTogc3RyaW5nO1xuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIHRoZSB0ZXh0dWFsIHJlcHJlc2VudGF0aW9uIG9mIGEgZGF5IHRoYXQgaXMgcmVuZGVyZWQgaW4gYSBkYXkgY2VsbC5cblx0ICpcblx0ICogQHNpbmNlIDMuMC4wXG5cdCAqL1xuXHRnZXREYXlOdW1lcmFscyhkYXRlOiBOZ2JEYXRlU3RydWN0KTogc3RyaW5nIHtcblx0XHRyZXR1cm4gYCR7ZGF0ZS5kYXl9YDtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIHRoZSB0ZXh0dWFsIHJlcHJlc2VudGF0aW9uIG9mIGEgd2VlayBudW1iZXIgcmVuZGVyZWQgYnkgZGF0ZXBpY2tlci5cblx0ICpcblx0ICogQHNpbmNlIDMuMC4wXG5cdCAqL1xuXHRnZXRXZWVrTnVtZXJhbHMod2Vla051bWJlcjogbnVtYmVyKTogc3RyaW5nIHtcblx0XHRyZXR1cm4gYCR7d2Vla051bWJlcn1gO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgdGhlIHRleHR1YWwgcmVwcmVzZW50YXRpb24gb2YgYSB5ZWFyIHRoYXQgaXMgcmVuZGVyZWQgaW4gdGhlIGRhdGVwaWNrZXIgeWVhciBzZWxlY3QgYm94LlxuXHQgKlxuXHQgKiBAc2luY2UgMy4wLjBcblx0ICovXG5cdGdldFllYXJOdW1lcmFscyh5ZWFyOiBudW1iZXIpOiBzdHJpbmcge1xuXHRcdHJldHVybiBgJHt5ZWFyfWA7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyB0aGUgd2VlayBsYWJlbCB0byBkaXNwbGF5IGluIHRoZSBoZWFkaW5nIG9mIHRoZSBtb250aCB2aWV3LlxuXHQgKlxuXHQgKiBAc2luY2UgOS4xLjBcblx0ICovXG5cdGdldFdlZWtMYWJlbCgpOiBzdHJpbmcge1xuXHRcdHJldHVybiAnJztcblx0fVxufVxuXG4vKipcbiAqIEEgc2VydmljZSBwcm92aWRpbmcgZGVmYXVsdCBpbXBsZW1lbnRhdGlvbiBmb3IgdGhlIGRhdGVwaWNrZXIgaTE4bi5cbiAqIEl0IGNhbiBiZSB1c2VkIGFzIGEgYmFzZSBpbXBsZW1lbnRhdGlvbiBpZiBuZWNlc3NhcnkuXG4gKlxuICogQHNpbmNlIDkuMS4wXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBOZ2JEYXRlcGlja2VySTE4bkRlZmF1bHQgZXh0ZW5kcyBOZ2JEYXRlcGlja2VySTE4biB7XG5cdHByaXZhdGUgX21vbnRoc1Nob3J0OiByZWFkb25seSBzdHJpbmdbXTtcblx0cHJpdmF0ZSBfbW9udGhzRnVsbDogcmVhZG9ubHkgc3RyaW5nW107XG5cblx0Y29uc3RydWN0b3IoQEluamVjdChMT0NBTEVfSUQpIHByaXZhdGUgX2xvY2FsZTogc3RyaW5nKSB7XG5cdFx0c3VwZXIoKTtcblxuXHRcdHRoaXMuX21vbnRoc1Nob3J0ID0gZ2V0TG9jYWxlTW9udGhOYW1lcyhfbG9jYWxlLCBGb3JtU3R5bGUuU3RhbmRhbG9uZSwgVHJhbnNsYXRpb25XaWR0aC5BYmJyZXZpYXRlZCk7XG5cdFx0dGhpcy5fbW9udGhzRnVsbCA9IGdldExvY2FsZU1vbnRoTmFtZXMoX2xvY2FsZSwgRm9ybVN0eWxlLlN0YW5kYWxvbmUsIFRyYW5zbGF0aW9uV2lkdGguV2lkZSk7XG5cdH1cblxuXHRnZXRXZWVrZGF5TGFiZWwod2Vla2RheTogbnVtYmVyLCB3aWR0aD86IFRyYW5zbGF0aW9uV2lkdGgpOiBzdHJpbmcge1xuXHRcdGNvbnN0IHdlZWtkYXlzU3RhcnRpbmdPblN1bmRheSA9IGdldExvY2FsZURheU5hbWVzKFxuXHRcdFx0dGhpcy5fbG9jYWxlLFxuXHRcdFx0Rm9ybVN0eWxlLlN0YW5kYWxvbmUsXG5cdFx0XHR3aWR0aCA9PT0gdW5kZWZpbmVkID8gVHJhbnNsYXRpb25XaWR0aC5TaG9ydCA6IHdpZHRoLFxuXHRcdCk7XG5cdFx0Y29uc3Qgd2Vla2RheXMgPSB3ZWVrZGF5c1N0YXJ0aW5nT25TdW5kYXkubWFwKChkYXksIGluZGV4KSA9PiB3ZWVrZGF5c1N0YXJ0aW5nT25TdW5kYXlbKGluZGV4ICsgMSkgJSA3XSk7XG5cdFx0cmV0dXJuIHdlZWtkYXlzW3dlZWtkYXkgLSAxXSB8fCAnJztcblx0fVxuXG5cdGdldE1vbnRoU2hvcnROYW1lKG1vbnRoOiBudW1iZXIpOiBzdHJpbmcge1xuXHRcdHJldHVybiB0aGlzLl9tb250aHNTaG9ydFttb250aCAtIDFdIHx8ICcnO1xuXHR9XG5cblx0Z2V0TW9udGhGdWxsTmFtZShtb250aDogbnVtYmVyKTogc3RyaW5nIHtcblx0XHRyZXR1cm4gdGhpcy5fbW9udGhzRnVsbFttb250aCAtIDFdIHx8ICcnO1xuXHR9XG5cblx0Z2V0RGF5QXJpYUxhYmVsKGRhdGU6IE5nYkRhdGVTdHJ1Y3QpOiBzdHJpbmcge1xuXHRcdGNvbnN0IGpzRGF0ZSA9IG5ldyBEYXRlKGRhdGUueWVhciwgZGF0ZS5tb250aCAtIDEsIGRhdGUuZGF5KTtcblx0XHRyZXR1cm4gZm9ybWF0RGF0ZShqc0RhdGUsICdmdWxsRGF0ZScsIHRoaXMuX2xvY2FsZSk7XG5cdH1cbn1cbiJdfQ==