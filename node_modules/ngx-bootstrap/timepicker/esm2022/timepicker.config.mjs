import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/** Provides default configuration values for timepicker */
export class TimepickerConfig {
    constructor() {
        /** hours change step */
        this.hourStep = 1;
        /** minutes change step */
        this.minuteStep = 5;
        /** seconds changes step */
        this.secondsStep = 10;
        /** if true works in 12H mode and displays AM/PM. If false works in 24H mode and hides AM/PM */
        this.showMeridian = true;
        /** meridian labels based on locale */
        this.meridians = ['AM', 'PM'];
        /** if true hours and minutes fields will be readonly */
        this.readonlyInput = false;
        /** if true hours and minutes fields will be disabled */
        this.disabled = false;
        /** if true emptyTime is not marked as invalid */
        this.allowEmptyTime = false;
        /** if true scroll inside hours and minutes inputs will change time */
        this.mousewheel = true;
        /** if true the values of hours and minutes can be changed using the up/down arrow keys on the keyboard */
        this.arrowkeys = true;
        /** if true spinner arrows above and below the inputs will be shown */
        this.showSpinners = true;
        /** show seconds in timepicker */
        this.showSeconds = false;
        /** show minutes in timepicker */
        this.showMinutes = true;
        /** placeholder for hours field in timepicker */
        this.hoursPlaceholder = 'HH';
        /** placeholder for minutes field in timepicker */
        this.minutesPlaceholder = 'MM';
        /** placeholder for seconds field in timepicker */
        this.secondsPlaceholder = 'SS';
        /** hours aria label */
        this.ariaLabelHours = 'hours';
        /** minutes aria label */
        this.ariaLabelMinutes = 'minutes';
        /** seconds aria label */
        this.ariaLabelSeconds = 'seconds';
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.1.4", ngImport: i0, type: TimepickerConfig, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.1.4", ngImport: i0, type: TimepickerConfig, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.1.4", ngImport: i0, type: TimepickerConfig, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXBpY2tlci5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvdGltZXBpY2tlci90aW1lcGlja2VyLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUUzQywyREFBMkQ7QUFJM0QsTUFBTSxPQUFPLGdCQUFnQjtJQUg3QjtRQUlFLHdCQUF3QjtRQUN4QixhQUFRLEdBQUcsQ0FBQyxDQUFDO1FBQ2IsMEJBQTBCO1FBQzFCLGVBQVUsR0FBRyxDQUFDLENBQUM7UUFDZiwyQkFBMkI7UUFDM0IsZ0JBQVcsR0FBRyxFQUFFLENBQUM7UUFDakIsK0ZBQStGO1FBQy9GLGlCQUFZLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLHNDQUFzQztRQUN0QyxjQUFTLEdBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDekIsd0RBQXdEO1FBQ3hELGtCQUFhLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLHdEQUF3RDtRQUN4RCxhQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ2pCLGlEQUFpRDtRQUNqRCxtQkFBYyxHQUFHLEtBQUssQ0FBQztRQUN2QixzRUFBc0U7UUFDdEUsZUFBVSxHQUFHLElBQUksQ0FBQztRQUNsQiwwR0FBMEc7UUFDMUcsY0FBUyxHQUFHLElBQUksQ0FBQztRQUNqQixzRUFBc0U7UUFDdEUsaUJBQVksR0FBRyxJQUFJLENBQUM7UUFDcEIsaUNBQWlDO1FBQ2pDLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLGlDQUFpQztRQUNqQyxnQkFBVyxHQUFHLElBQUksQ0FBQztRQUtuQixnREFBZ0Q7UUFDaEQscUJBQWdCLEdBQUcsSUFBSSxDQUFDO1FBQ3hCLGtEQUFrRDtRQUNsRCx1QkFBa0IsR0FBRyxJQUFJLENBQUM7UUFDMUIsa0RBQWtEO1FBQ2xELHVCQUFrQixHQUFHLElBQUksQ0FBQztRQUMxQix1QkFBdUI7UUFDdkIsbUJBQWMsR0FBRyxPQUFPLENBQUM7UUFDekIseUJBQXlCO1FBQ3pCLHFCQUFnQixHQUFHLFNBQVMsQ0FBQztRQUM3Qix5QkFBeUI7UUFDekIscUJBQWdCLEdBQUcsU0FBUyxDQUFDO0tBQzlCOzhHQTNDWSxnQkFBZ0I7a0hBQWhCLGdCQUFnQixjQUZmLE1BQU07OzJGQUVQLGdCQUFnQjtrQkFINUIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKiBQcm92aWRlcyBkZWZhdWx0IGNvbmZpZ3VyYXRpb24gdmFsdWVzIGZvciB0aW1lcGlja2VyICovXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBUaW1lcGlja2VyQ29uZmlnIHtcbiAgLyoqIGhvdXJzIGNoYW5nZSBzdGVwICovXG4gIGhvdXJTdGVwID0gMTtcbiAgLyoqIG1pbnV0ZXMgY2hhbmdlIHN0ZXAgKi9cbiAgbWludXRlU3RlcCA9IDU7XG4gIC8qKiBzZWNvbmRzIGNoYW5nZXMgc3RlcCAqL1xuICBzZWNvbmRzU3RlcCA9IDEwO1xuICAvKiogaWYgdHJ1ZSB3b3JrcyBpbiAxMkggbW9kZSBhbmQgZGlzcGxheXMgQU0vUE0uIElmIGZhbHNlIHdvcmtzIGluIDI0SCBtb2RlIGFuZCBoaWRlcyBBTS9QTSAqL1xuICBzaG93TWVyaWRpYW4gPSB0cnVlO1xuICAvKiogbWVyaWRpYW4gbGFiZWxzIGJhc2VkIG9uIGxvY2FsZSAqL1xuICBtZXJpZGlhbnMgPSBbJ0FNJywgJ1BNJ107XG4gIC8qKiBpZiB0cnVlIGhvdXJzIGFuZCBtaW51dGVzIGZpZWxkcyB3aWxsIGJlIHJlYWRvbmx5ICovXG4gIHJlYWRvbmx5SW5wdXQgPSBmYWxzZTtcbiAgLyoqIGlmIHRydWUgaG91cnMgYW5kIG1pbnV0ZXMgZmllbGRzIHdpbGwgYmUgZGlzYWJsZWQgKi9cbiAgZGlzYWJsZWQgPSBmYWxzZTtcbiAgLyoqIGlmIHRydWUgZW1wdHlUaW1lIGlzIG5vdCBtYXJrZWQgYXMgaW52YWxpZCAqL1xuICBhbGxvd0VtcHR5VGltZSA9IGZhbHNlO1xuICAvKiogaWYgdHJ1ZSBzY3JvbGwgaW5zaWRlIGhvdXJzIGFuZCBtaW51dGVzIGlucHV0cyB3aWxsIGNoYW5nZSB0aW1lICovXG4gIG1vdXNld2hlZWwgPSB0cnVlO1xuICAvKiogaWYgdHJ1ZSB0aGUgdmFsdWVzIG9mIGhvdXJzIGFuZCBtaW51dGVzIGNhbiBiZSBjaGFuZ2VkIHVzaW5nIHRoZSB1cC9kb3duIGFycm93IGtleXMgb24gdGhlIGtleWJvYXJkICovXG4gIGFycm93a2V5cyA9IHRydWU7XG4gIC8qKiBpZiB0cnVlIHNwaW5uZXIgYXJyb3dzIGFib3ZlIGFuZCBiZWxvdyB0aGUgaW5wdXRzIHdpbGwgYmUgc2hvd24gKi9cbiAgc2hvd1NwaW5uZXJzID0gdHJ1ZTtcbiAgLyoqIHNob3cgc2Vjb25kcyBpbiB0aW1lcGlja2VyICovXG4gIHNob3dTZWNvbmRzID0gZmFsc2U7XG4gIC8qKiBzaG93IG1pbnV0ZXMgaW4gdGltZXBpY2tlciAqL1xuICBzaG93TWludXRlcyA9IHRydWU7XG4gIC8qKiBtaW5pbXVtIHRpbWUgdXNlciBjYW4gc2VsZWN0ICovXG4gIG1pbj86IERhdGU7XG4gIC8qKiBtYXhpbXVtIHRpbWUgdXNlciBjYW4gc2VsZWN0ICovXG4gIG1heD86IERhdGU7XG4gIC8qKiBwbGFjZWhvbGRlciBmb3IgaG91cnMgZmllbGQgaW4gdGltZXBpY2tlciAqL1xuICBob3Vyc1BsYWNlaG9sZGVyID0gJ0hIJztcbiAgLyoqIHBsYWNlaG9sZGVyIGZvciBtaW51dGVzIGZpZWxkIGluIHRpbWVwaWNrZXIgKi9cbiAgbWludXRlc1BsYWNlaG9sZGVyID0gJ01NJztcbiAgLyoqIHBsYWNlaG9sZGVyIGZvciBzZWNvbmRzIGZpZWxkIGluIHRpbWVwaWNrZXIgKi9cbiAgc2Vjb25kc1BsYWNlaG9sZGVyID0gJ1NTJztcbiAgLyoqIGhvdXJzIGFyaWEgbGFiZWwgKi9cbiAgYXJpYUxhYmVsSG91cnMgPSAnaG91cnMnO1xuICAvKiogbWludXRlcyBhcmlhIGxhYmVsICovXG4gIGFyaWFMYWJlbE1pbnV0ZXMgPSAnbWludXRlcyc7XG4gIC8qKiBzZWNvbmRzIGFyaWEgbGFiZWwgKi9cbiAgYXJpYUxhYmVsU2Vjb25kcyA9ICdzZWNvbmRzJztcbn1cbiJdfQ==