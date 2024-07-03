import { NgbDatepickerI18n } from '../datepicker-i18n';
import { hebrewNumerals, isHebrewLeapYear } from './hebrew';
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
const WEEKDAYS = ['שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת', 'ראשון'];
const MONTHS = ['תשרי', 'חשון', 'כסלו', 'טבת', 'שבט', 'אדר', 'ניסן', 'אייר', 'סיון', 'תמוז', 'אב', 'אלול'];
const MONTHS_LEAP = [
    'תשרי',
    'חשון',
    'כסלו',
    'טבת',
    'שבט',
    'אדר א׳',
    'אדר ב׳',
    'ניסן',
    'אייר',
    'סיון',
    'תמוז',
    'אב',
    'אלול',
];
/**
 * @since 3.2.0
 */
class NgbDatepickerI18nHebrew extends NgbDatepickerI18n {
    getMonthShortName(month, year) {
        return this.getMonthFullName(month, year);
    }
    getMonthFullName(month, year) {
        return isHebrewLeapYear(year) ? MONTHS_LEAP[month - 1] || '' : MONTHS[month - 1] || '';
    }
    getWeekdayLabel(weekday, width) {
        return WEEKDAYS[weekday - 1] || '';
    }
    getDayAriaLabel(date) {
        return `${hebrewNumerals(date.day)} ${this.getMonthFullName(date.month, date.year)} ${hebrewNumerals(date.year)}`;
    }
    getDayNumerals(date) {
        return hebrewNumerals(date.day);
    }
    getWeekNumerals(weekNumber) {
        return hebrewNumerals(weekNumber);
    }
    getYearNumerals(year) {
        return hebrewNumerals(year);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbDatepickerI18nHebrew, deps: null, target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbDatepickerI18nHebrew }); }
}
export { NgbDatepickerI18nHebrew };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbDatepickerI18nHebrew, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci1pMThuLWhlYnJldy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9kYXRlcGlja2VyL2hlYnJldy9kYXRlcGlja2VyLWkxOG4taGVicmV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRXZELE9BQU8sRUFBRSxjQUFjLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDNUQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFHM0MsTUFBTSxRQUFRLEdBQUcsQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQztBQUM1RSxNQUFNLE1BQU0sR0FBRyxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDM0csTUFBTSxXQUFXLEdBQUc7SUFDbkIsTUFBTTtJQUNOLE1BQU07SUFDTixNQUFNO0lBQ04sS0FBSztJQUNMLEtBQUs7SUFDTCxRQUFRO0lBQ1IsUUFBUTtJQUNSLE1BQU07SUFDTixNQUFNO0lBQ04sTUFBTTtJQUNOLE1BQU07SUFDTixJQUFJO0lBQ0osTUFBTTtDQUNOLENBQUM7QUFFRjs7R0FFRztBQUNILE1BQ2EsdUJBQXdCLFNBQVEsaUJBQWlCO0lBQzdELGlCQUFpQixDQUFDLEtBQWEsRUFBRSxJQUFhO1FBQzdDLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRUQsZ0JBQWdCLENBQUMsS0FBYSxFQUFFLElBQWE7UUFDNUMsT0FBTyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3hGLENBQUM7SUFFRCxlQUFlLENBQUMsT0FBZSxFQUFFLEtBQXdCO1FBQ3hELE9BQU8sUUFBUSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDcEMsQ0FBQztJQUVELGVBQWUsQ0FBQyxJQUFtQjtRQUNsQyxPQUFPLEdBQUcsY0FBYyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO0lBQ25ILENBQUM7SUFFRCxjQUFjLENBQUMsSUFBbUI7UUFDakMsT0FBTyxjQUFjLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFRCxlQUFlLENBQUMsVUFBa0I7UUFDakMsT0FBTyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVELGVBQWUsQ0FBQyxJQUFZO1FBQzNCLE9BQU8sY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzdCLENBQUM7OEdBM0JXLHVCQUF1QjtrSEFBdkIsdUJBQXVCOztTQUF2Qix1QkFBdUI7MkZBQXZCLHVCQUF1QjtrQkFEbkMsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nYkRhdGVwaWNrZXJJMThuIH0gZnJvbSAnLi4vZGF0ZXBpY2tlci1pMThuJztcbmltcG9ydCB7IE5nYkRhdGVTdHJ1Y3QgfSBmcm9tICcuLi8uLi9pbmRleCc7XG5pbXBvcnQgeyBoZWJyZXdOdW1lcmFscywgaXNIZWJyZXdMZWFwWWVhciB9IGZyb20gJy4vaGVicmV3JztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRyYW5zbGF0aW9uV2lkdGggfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5jb25zdCBXRUVLREFZUyA9IFsn16nXoNeZJywgJ9ep15zXmdep15knLCAn16jXkdeZ16LXmScsICfXl9ee15nXqdeZJywgJ9ep15nXqdeZJywgJ9ep15HXqicsICfXqNeQ16nXldefJ107XG5jb25zdCBNT05USFMgPSBbJ9eq16nXqNeZJywgJ9eX16nXldefJywgJ9eb16HXnNeVJywgJ9eY15HXqicsICfXqdeR15gnLCAn15DXk9eoJywgJ9eg15nXodefJywgJ9eQ15nXmdeoJywgJ9eh15nXldefJywgJ9eq157XldeWJywgJ9eQ15EnLCAn15DXnNeV15wnXTtcbmNvbnN0IE1PTlRIU19MRUFQID0gW1xuXHQn16rXqdeo15knLFxuXHQn15fXqdeV158nLFxuXHQn15vXodec15UnLFxuXHQn15jXkdeqJyxcblx0J9ep15HXmCcsXG5cdCfXkNeT16gg15DXsycsXG5cdCfXkNeT16gg15HXsycsXG5cdCfXoNeZ16HXnycsXG5cdCfXkNeZ15nXqCcsXG5cdCfXodeZ15XXnycsXG5cdCfXqtee15XXlicsXG5cdCfXkNeRJyxcblx0J9eQ15zXldecJyxcbl07XG5cbi8qKlxuICogQHNpbmNlIDMuMi4wXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBOZ2JEYXRlcGlja2VySTE4bkhlYnJldyBleHRlbmRzIE5nYkRhdGVwaWNrZXJJMThuIHtcblx0Z2V0TW9udGhTaG9ydE5hbWUobW9udGg6IG51bWJlciwgeWVhcj86IG51bWJlcik6IHN0cmluZyB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0TW9udGhGdWxsTmFtZShtb250aCwgeWVhcik7XG5cdH1cblxuXHRnZXRNb250aEZ1bGxOYW1lKG1vbnRoOiBudW1iZXIsIHllYXI/OiBudW1iZXIpOiBzdHJpbmcge1xuXHRcdHJldHVybiBpc0hlYnJld0xlYXBZZWFyKHllYXIpID8gTU9OVEhTX0xFQVBbbW9udGggLSAxXSB8fCAnJyA6IE1PTlRIU1ttb250aCAtIDFdIHx8ICcnO1xuXHR9XG5cblx0Z2V0V2Vla2RheUxhYmVsKHdlZWtkYXk6IG51bWJlciwgd2lkdGg/OiBUcmFuc2xhdGlvbldpZHRoKSB7XG5cdFx0cmV0dXJuIFdFRUtEQVlTW3dlZWtkYXkgLSAxXSB8fCAnJztcblx0fVxuXG5cdGdldERheUFyaWFMYWJlbChkYXRlOiBOZ2JEYXRlU3RydWN0KTogc3RyaW5nIHtcblx0XHRyZXR1cm4gYCR7aGVicmV3TnVtZXJhbHMoZGF0ZS5kYXkpfSAke3RoaXMuZ2V0TW9udGhGdWxsTmFtZShkYXRlLm1vbnRoLCBkYXRlLnllYXIpfSAke2hlYnJld051bWVyYWxzKGRhdGUueWVhcil9YDtcblx0fVxuXG5cdGdldERheU51bWVyYWxzKGRhdGU6IE5nYkRhdGVTdHJ1Y3QpOiBzdHJpbmcge1xuXHRcdHJldHVybiBoZWJyZXdOdW1lcmFscyhkYXRlLmRheSk7XG5cdH1cblxuXHRnZXRXZWVrTnVtZXJhbHMod2Vla051bWJlcjogbnVtYmVyKTogc3RyaW5nIHtcblx0XHRyZXR1cm4gaGVicmV3TnVtZXJhbHMod2Vla051bWJlcik7XG5cdH1cblxuXHRnZXRZZWFyTnVtZXJhbHMoeWVhcjogbnVtYmVyKTogc3RyaW5nIHtcblx0XHRyZXR1cm4gaGVicmV3TnVtZXJhbHMoeWVhcik7XG5cdH1cbn1cbiJdfQ==