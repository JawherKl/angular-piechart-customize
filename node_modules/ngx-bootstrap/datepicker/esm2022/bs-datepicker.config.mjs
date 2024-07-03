import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * For date range picker there are `BsDaterangepickerConfig` which inherits all properties,
 * except `displayMonths`, for range picker it default to `2`
 */
export class BsDatepickerConfig {
    constructor() {
        /** sets use adaptive position */
        this.adaptivePosition = false;
        /** sets use UTC date time format */
        this.useUtc = false;
        /** turn on/off animation */
        this.isAnimated = false;
        /**
         * The view that the datepicker should start in
         */
        this.startView = 'day';
        /**
         * If true, returns focus to the datepicker / daterangepicker input after date selection
         */
        this.returnFocusToInput = false;
        /** CSS class which will be applied to datepicker container,
         * usually used to set color theme
         */
        this.containerClass = 'theme-green';
        // DatepickerRenderOptions
        this.displayMonths = 1;
        /**
         * Allows to hide week numbers in datepicker
         */
        this.showWeekNumbers = true;
        this.dateInputFormat = 'L';
        // range picker
        this.rangeSeparator = ' - ';
        /**
         * Date format for date range input field
         */
        this.rangeInputFormat = 'L';
        // DatepickerFormatOptions
        this.monthTitle = 'MMMM';
        this.yearTitle = 'YYYY';
        this.dayLabel = 'D';
        this.monthLabel = 'MMMM';
        this.yearLabel = 'YYYY';
        this.weekNumbers = 'w';
        /**
         * Shows 'today' button
         */
        this.showTodayButton = false;
        /**
         * Shows clear button
         */
        this.showClearButton = false;
        /**
         * Positioning of 'today' button
         */
        this.todayPosition = 'center';
        /**
         * Positioning of 'clear' button
         */
        this.clearPosition = 'right';
        /**
         * Label for 'today' button
         */
        this.todayButtonLabel = 'Today';
        /**
         * Label for 'clear' button
         */
        this.clearButtonLabel = 'Clear';
        /**
         * Label for 'custom range' button
         */
        this.customRangeButtonLabel = 'Custom Range';
        /**
         * Shows timepicker under datepicker
         */
        this.withTimepicker = false;
        /**
         * Set allowed positions of container.
         */
        this.allowedPositions = ['top', 'bottom'];
        /**
         * Set rule for datepicker closing. If value is true datepicker closes only if date is changed, if user changes only time datepicker doesn't close. It is available only if property withTimepicker is set true
         * */
        this.keepDatepickerOpened = false;
        /**
         * Allows keep invalid dates in range. Can be used with minDate, maxDate
         * */
        this.keepDatesOutOfRules = false;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.1.4", ngImport: i0, type: BsDatepickerConfig, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.1.4", ngImport: i0, type: BsDatepickerConfig, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.1.4", ngImport: i0, type: BsDatepickerConfig, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnMtZGF0ZXBpY2tlci5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvZGF0ZXBpY2tlci9icy1kYXRlcGlja2VyLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQVUzQzs7O0dBR0c7QUFJSCxNQUFNLE9BQU8sa0JBQWtCO0lBSC9CO1FBSUUsaUNBQWlDO1FBQ2pDLHFCQUFnQixHQUFHLEtBQUssQ0FBQztRQUN6QixvQ0FBb0M7UUFDcEMsV0FBTSxHQUFHLEtBQUssQ0FBQztRQUNmLDRCQUE0QjtRQUM1QixlQUFVLEdBQUcsS0FBSyxDQUFDO1FBV25COztXQUVHO1FBQ0gsY0FBUyxHQUF5QixLQUFLLENBQUM7UUE4RHhDOztXQUVHO1FBQ0gsdUJBQWtCLEdBQUcsS0FBSyxDQUFDO1FBRTNCOztXQUVHO1FBQ0gsbUJBQWMsR0FBRyxhQUFhLENBQUM7UUFFL0IsMEJBQTBCO1FBQzFCLGtCQUFhLEdBQUcsQ0FBQyxDQUFDO1FBQ2xCOztXQUVHO1FBQ0gsb0JBQWUsR0FBRyxJQUFJLENBQUM7UUFFdkIsb0JBQWUsR0FBRyxHQUFHLENBQUM7UUFDdEIsZUFBZTtRQUNmLG1CQUFjLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCOztXQUVHO1FBQ0gscUJBQWdCLEdBQUcsR0FBRyxDQUFDO1FBWXZCLDBCQUEwQjtRQUMxQixlQUFVLEdBQUcsTUFBTSxDQUFDO1FBQ3BCLGNBQVMsR0FBRyxNQUFNLENBQUM7UUFDbkIsYUFBUSxHQUFHLEdBQUcsQ0FBQztRQUNmLGVBQVUsR0FBRyxNQUFNLENBQUM7UUFDcEIsY0FBUyxHQUFHLE1BQU0sQ0FBQztRQUNuQixnQkFBVyxHQUFHLEdBQUcsQ0FBQztRQUVsQjs7V0FFRztRQUNILG9CQUFlLEdBQUcsS0FBSyxDQUFDO1FBRXhCOztXQUVHO1FBQ0gsb0JBQWUsR0FBRyxLQUFLLENBQUM7UUFFeEI7O1dBRUc7UUFDSCxrQkFBYSxHQUFHLFFBQVEsQ0FBQztRQUV6Qjs7V0FFRztRQUNILGtCQUFhLEdBQUcsT0FBTyxDQUFDO1FBRXhCOztXQUVHO1FBQ0gscUJBQWdCLEdBQUcsT0FBTyxDQUFDO1FBRTNCOztXQUVHO1FBQ0gscUJBQWdCLEdBQUcsT0FBTyxDQUFDO1FBRTNCOztXQUVHO1FBQ0gsMkJBQXNCLEdBQUcsY0FBYyxDQUFDO1FBRXhDOztXQUVHO1FBQ0gsbUJBQWMsR0FBRyxLQUFLLENBQUM7UUFLdkI7O1dBRUc7UUFDSCxxQkFBZ0IsR0FBRyxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztRQUNyQzs7YUFFSztRQUNMLHlCQUFvQixHQUFHLEtBQUssQ0FBQztRQUM3Qjs7YUFFSztRQUNMLHdCQUFtQixHQUFHLEtBQUssQ0FBQztLQUM3Qjs4R0FwTFksa0JBQWtCO2tIQUFsQixrQkFBa0IsY0FGakIsTUFBTTs7MkZBRVAsa0JBQWtCO2tCQUg5QixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIERhdGVwaWNrZXJSZW5kZXJPcHRpb25zLFxuICBCc0RhdGVwaWNrZXJWaWV3TW9kZSxcbiAgRGF0ZXBpY2tlckRhdGVDdXN0b21DbGFzc2VzLFxuICBEYXRlcGlja2VyRGF0ZVRvb2x0aXBUZXh0XG59IGZyb20gJy4vbW9kZWxzJztcbmltcG9ydCB7IEJzQ3VzdG9tRGF0ZXMgfSBmcm9tICcuL3RoZW1lcy9icy9icy1jdXN0b20tZGF0ZXMtdmlldy5jb21wb25lbnQnO1xuXG5cbi8qKlxuICogRm9yIGRhdGUgcmFuZ2UgcGlja2VyIHRoZXJlIGFyZSBgQnNEYXRlcmFuZ2VwaWNrZXJDb25maWdgIHdoaWNoIGluaGVyaXRzIGFsbCBwcm9wZXJ0aWVzLFxuICogZXhjZXB0IGBkaXNwbGF5TW9udGhzYCwgZm9yIHJhbmdlIHBpY2tlciBpdCBkZWZhdWx0IHRvIGAyYFxuICovXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBCc0RhdGVwaWNrZXJDb25maWcgaW1wbGVtZW50cyBEYXRlcGlja2VyUmVuZGVyT3B0aW9ucyB7XG4gIC8qKiBzZXRzIHVzZSBhZGFwdGl2ZSBwb3NpdGlvbiAqL1xuICBhZGFwdGl2ZVBvc2l0aW9uID0gZmFsc2U7XG4gIC8qKiBzZXRzIHVzZSBVVEMgZGF0ZSB0aW1lIGZvcm1hdCAqL1xuICB1c2VVdGMgPSBmYWxzZTtcbiAgLyoqIHR1cm4gb24vb2ZmIGFuaW1hdGlvbiAqL1xuICBpc0FuaW1hdGVkID0gZmFsc2U7XG4gIHZhbHVlPzogRGF0ZSB8IERhdGVbXTtcbiAgaXNEaXNhYmxlZD86IGJvb2xlYW47XG4gIC8qKlxuICAgKiBEZWZhdWx0IG1pbiBkYXRlIGZvciBhbGwgZGF0ZS9yYW5nZSBwaWNrZXJzXG4gICAqL1xuICBtaW5EYXRlPzogRGF0ZTtcbiAgLyoqXG4gICAqIERlZmF1bHQgbWF4IGRhdGUgZm9yIGFsbCBkYXRlL3JhbmdlIHBpY2tlcnNcbiAgICovXG4gIG1heERhdGU/OiBEYXRlO1xuICAvKipcbiAgICogVGhlIHZpZXcgdGhhdCB0aGUgZGF0ZXBpY2tlciBzaG91bGQgc3RhcnQgaW5cbiAgICovXG4gIHN0YXJ0VmlldzogQnNEYXRlcGlja2VyVmlld01vZGUgPSAnZGF5JztcbiAgLyoqXG4gICAqIERlZmF1bHQgZGF0ZSBjdXN0b20gY2xhc3NlcyBmb3IgYWxsIGRhdGUvcmFuZ2UgcGlja2Vyc1xuICAgKi9cbiAgZGF0ZUN1c3RvbUNsYXNzZXM/OiBEYXRlcGlja2VyRGF0ZUN1c3RvbUNsYXNzZXNbXTtcbiAgLyoqXG4gICAqIERlZmF1bHQgdG9vbHRpcCB0ZXh0IGZvciBhbGwgZGF0ZS9yYW5nZSBwaWNrZXJzXG4gICAqL1xuICBkYXRlVG9vbHRpcFRleHRzPzogRGF0ZXBpY2tlckRhdGVUb29sdGlwVGV4dFtdO1xuICAvKipcbiAgICogRGlzYWJsZSBzcGVjaWZpYyBkYXlzLCBlLmcuIFswLDZdIHdpbGwgZGlzYWJsZSBhbGwgU2F0dXJkYXlzIGFuZCBTdW5kYXlzXG4gICAqL1xuICBkYXlzRGlzYWJsZWQ/OiBudW1iZXJbXTtcbiAgLyoqXG4gICAqIERpc2FibGUgc3BlY2lmaWMgZGF0ZXNcbiAgICovXG4gIGRhdGVzRGlzYWJsZWQ/OiBEYXRlW107XG4gIC8qKlxuICAgKiBTaG93IG9uZSBtb250aHMgZm9yIHNwZWNpYWwgY2FzZXMgKG9ubHkgZm9yIGRhdGVSYW5nZVBpY2tlcilcbiAgICogMS4gbWF4RGF0ZSBpcyBlcXVhbCB0byB0b2RheSdzIGRhdGVcbiAgICogMi4gbWluRGF0ZSdzIG1vbnRoIGlzIGVxdWFsIHRvIG1heERhdGUncyBtb250aFxuICAgKi9cbiAgZGlzcGxheU9uZU1vbnRoUmFuZ2U/OiBib29sZWFuO1xuICAvKipcbiAgICogRW5hYmxlIHNwZWNpZmljIGRhdGVzXG4gICAqL1xuICBkYXRlc0VuYWJsZWQ/OiBEYXRlW107XG4gIC8qKlxuICAgKiBNYWtlcyBkYXRlcyBmcm9tIG90aGVyIG1vbnRocyBhY3RpdmVcbiAgICovXG4gIHNlbGVjdEZyb21PdGhlck1vbnRoPzogYm9vbGVhbjtcblxuICAvKipcbiAgICogQWxsb3dzIHNlbGVjdCBmaXJzdCBkYXRlIG9mIHRoZSB3ZWVrIGJ5IGNsaWNrIG9uIHdlZWsgbnVtYmVyXG4gICAqL1xuICBzZWxlY3RXZWVrPzogYm9vbGVhbjtcblxuICAvKipcbiAgICogQWxsb3dzIHNlbGVjdCBkYXRlcmFuZ2UgYXMgZmlyc3QgYW5kIGxhc3QgZGF5IG9mIHdlZWsgYnkgY2xpY2sgb24gd2VlayBudW1iZXIgKGRhdGVSYW5nZVBpY2tlciBvbmx5KVxuICAgKi9cbiAgc2VsZWN0V2Vla0RhdGVSYW5nZT86IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFNob3dzIHByZXZpb3VzIGFuZCBjdXJyZW50IG1vbnRoLCBpbnN0ZWFkIG9mIGN1cnJlbnQgYW5kIG5leHQgKGRhdGVSYW5nZVBpY2tlciBvbmx5KVxuICAgKi9cbiAgc2hvd1ByZXZpb3VzTW9udGg/OiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBQcmV2ZW50cyBjaGFuZ2UgdG8gbmV4dCBtb250aCBmb3IgcmlnaHQgY2FsZW5kYXIgaW4gdHdvIGNhbGVuZGFycyB2aWV3IChkYXRlUmFuZ2VQaWNrZXIgb25seSlcbiAgICovXG4gIHByZXZlbnRDaGFuZ2VUb05leHRNb250aD86IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEFkZCBjbGFzcyB0byBjdXJyZW50IGRheVxuICAgKi9cbiAgY3VzdG9tVG9kYXlDbGFzcz86IHN0cmluZztcblxuICAvKipcbiAgICogRGVmYXVsdCBtb2RlIGZvciBhbGwgZGF0ZSBwaWNrZXJzXG4gICAqL1xuICBtaW5Nb2RlPzogQnNEYXRlcGlja2VyVmlld01vZGU7XG5cbiAgLyoqXG4gICAqIElmIHRydWUsIHJldHVybnMgZm9jdXMgdG8gdGhlIGRhdGVwaWNrZXIgLyBkYXRlcmFuZ2VwaWNrZXIgaW5wdXQgYWZ0ZXIgZGF0ZSBzZWxlY3Rpb25cbiAgICovXG4gIHJldHVybkZvY3VzVG9JbnB1dCA9IGZhbHNlO1xuXG4gIC8qKiBDU1MgY2xhc3Mgd2hpY2ggd2lsbCBiZSBhcHBsaWVkIHRvIGRhdGVwaWNrZXIgY29udGFpbmVyLFxuICAgKiB1c3VhbGx5IHVzZWQgdG8gc2V0IGNvbG9yIHRoZW1lXG4gICAqL1xuICBjb250YWluZXJDbGFzcyA9ICd0aGVtZS1ncmVlbic7XG5cbiAgLy8gRGF0ZXBpY2tlclJlbmRlck9wdGlvbnNcbiAgZGlzcGxheU1vbnRocyA9IDE7XG4gIC8qKlxuICAgKiBBbGxvd3MgdG8gaGlkZSB3ZWVrIG51bWJlcnMgaW4gZGF0ZXBpY2tlclxuICAgKi9cbiAgc2hvd1dlZWtOdW1iZXJzID0gdHJ1ZTtcblxuICBkYXRlSW5wdXRGb3JtYXQgPSAnTCc7XG4gIC8vIHJhbmdlIHBpY2tlclxuICByYW5nZVNlcGFyYXRvciA9ICcgLSAnO1xuICAvKipcbiAgICogRGF0ZSBmb3JtYXQgZm9yIGRhdGUgcmFuZ2UgaW5wdXQgZmllbGRcbiAgICovXG4gIHJhbmdlSW5wdXRGb3JtYXQgPSAnTCc7XG5cbiAgLyoqXG4gICAqIFByZWRlZmluZWQgcmFuZ2VzXG4gICAqL1xuICByYW5nZXM/OiBCc0N1c3RvbURhdGVzW107XG5cbiAgLyoqXG4gICAqIE1heCBEYXRlIFJhbmdlIGluIGRheXNcbiAgICovXG4gIG1heERhdGVSYW5nZT86IG51bWJlcjtcblxuICAvLyBEYXRlcGlja2VyRm9ybWF0T3B0aW9uc1xuICBtb250aFRpdGxlID0gJ01NTU0nO1xuICB5ZWFyVGl0bGUgPSAnWVlZWSc7XG4gIGRheUxhYmVsID0gJ0QnO1xuICBtb250aExhYmVsID0gJ01NTU0nO1xuICB5ZWFyTGFiZWwgPSAnWVlZWSc7XG4gIHdlZWtOdW1iZXJzID0gJ3cnO1xuXG4gIC8qKlxuICAgKiBTaG93cyAndG9kYXknIGJ1dHRvblxuICAgKi9cbiAgc2hvd1RvZGF5QnV0dG9uID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIFNob3dzIGNsZWFyIGJ1dHRvblxuICAgKi9cbiAgc2hvd0NsZWFyQnV0dG9uID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIFBvc2l0aW9uaW5nIG9mICd0b2RheScgYnV0dG9uXG4gICAqL1xuICB0b2RheVBvc2l0aW9uID0gJ2NlbnRlcic7XG5cbiAgLyoqXG4gICAqIFBvc2l0aW9uaW5nIG9mICdjbGVhcicgYnV0dG9uXG4gICAqL1xuICBjbGVhclBvc2l0aW9uID0gJ3JpZ2h0JztcblxuICAvKipcbiAgICogTGFiZWwgZm9yICd0b2RheScgYnV0dG9uXG4gICAqL1xuICB0b2RheUJ1dHRvbkxhYmVsID0gJ1RvZGF5JztcblxuICAvKipcbiAgICogTGFiZWwgZm9yICdjbGVhcicgYnV0dG9uXG4gICAqL1xuICBjbGVhckJ1dHRvbkxhYmVsID0gJ0NsZWFyJztcblxuICAvKipcbiAgICogTGFiZWwgZm9yICdjdXN0b20gcmFuZ2UnIGJ1dHRvblxuICAgKi9cbiAgY3VzdG9tUmFuZ2VCdXR0b25MYWJlbCA9ICdDdXN0b20gUmFuZ2UnO1xuXG4gIC8qKlxuICAgKiBTaG93cyB0aW1lcGlja2VyIHVuZGVyIGRhdGVwaWNrZXJcbiAgICovXG4gIHdpdGhUaW1lcGlja2VyID0gZmFsc2U7XG4gIC8qKlxuICAgKiBTZXQgY3VycmVudCBob3VycywgbWludXRlcywgc2Vjb25kcyBhbmQgbWlsbGlzZWNvbmRzIGZvciBic1ZhbHVlXG4gICAqL1xuICBpbml0Q3VycmVudFRpbWU/OiBib29sZWFuO1xuICAvKipcbiAgICogU2V0IGFsbG93ZWQgcG9zaXRpb25zIG9mIGNvbnRhaW5lci5cbiAgICovXG4gIGFsbG93ZWRQb3NpdGlvbnMgPSBbJ3RvcCcsICdib3R0b20nXTtcbiAgLyoqXG4gICAqIFNldCBydWxlIGZvciBkYXRlcGlja2VyIGNsb3NpbmcuIElmIHZhbHVlIGlzIHRydWUgZGF0ZXBpY2tlciBjbG9zZXMgb25seSBpZiBkYXRlIGlzIGNoYW5nZWQsIGlmIHVzZXIgY2hhbmdlcyBvbmx5IHRpbWUgZGF0ZXBpY2tlciBkb2Vzbid0IGNsb3NlLiBJdCBpcyBhdmFpbGFibGUgb25seSBpZiBwcm9wZXJ0eSB3aXRoVGltZXBpY2tlciBpcyBzZXQgdHJ1ZVxuICAgKiAqL1xuICBrZWVwRGF0ZXBpY2tlck9wZW5lZCA9IGZhbHNlO1xuICAvKipcbiAgICogQWxsb3dzIGtlZXAgaW52YWxpZCBkYXRlcyBpbiByYW5nZS4gQ2FuIGJlIHVzZWQgd2l0aCBtaW5EYXRlLCBtYXhEYXRlXG4gICAqICovXG4gIGtlZXBEYXRlc091dE9mUnVsZXMgPSBmYWxzZTtcbn1cbiJdfQ==