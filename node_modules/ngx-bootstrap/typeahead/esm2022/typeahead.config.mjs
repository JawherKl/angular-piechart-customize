import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/** Default values provider for typeahead */
export class TypeaheadConfig {
    constructor() {
        /** sets use adaptive position */
        this.adaptivePosition = false;
        /** turn on/off animation */
        this.isAnimated = false;
        /** used to hide results on blur */
        this.hideResultsOnBlur = true;
        /** if true, typeahead will cancel async request on blur */
        this.cancelRequestOnFocusLost = false;
        /** used to choose the first item in typeahead container */
        this.selectFirstItem = true;
        /** used to active/inactive the first item in typeahead container */
        this.isFirstItemActive = true;
        /** used to choose set minimal no of characters that needs to
         * be entered before typeahead kicks-in
         */
        this.minLength = 1;
        /**
         * used to choose item on blur event
         */
        this.selectItemOnBlur = false;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.1.4", ngImport: i0, type: TypeaheadConfig, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.1.4", ngImport: i0, type: TypeaheadConfig, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.1.4", ngImport: i0, type: TypeaheadConfig, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZWFoZWFkLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy90eXBlYWhlYWQvdHlwZWFoZWFkLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUUzQyw0Q0FBNEM7QUFFNUMsTUFBTSxPQUFPLGVBQWU7SUFENUI7UUFFRSxpQ0FBaUM7UUFDakMscUJBQWdCLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLDRCQUE0QjtRQUM1QixlQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ25CLG1DQUFtQztRQUNuQyxzQkFBaUIsR0FBRyxJQUFJLENBQUM7UUFDekIsMkRBQTJEO1FBQzNELDZCQUF3QixHQUFHLEtBQUssQ0FBQztRQUNqQywyREFBMkQ7UUFDM0Qsb0JBQWUsR0FBRyxJQUFJLENBQUM7UUFDdkIsb0VBQW9FO1FBQ3BFLHNCQUFpQixHQUFHLElBQUksQ0FBQztRQUN6Qjs7V0FFRztRQUNILGNBQVMsR0FBRyxDQUFDLENBQUM7UUFDZDs7V0FFRztRQUNILHFCQUFnQixHQUFHLEtBQUssQ0FBQztLQUMxQjs4R0FyQlksZUFBZTtrSEFBZixlQUFlLGNBREYsTUFBTTs7MkZBQ25CLGVBQWU7a0JBRDNCLFVBQVU7bUJBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vKiogRGVmYXVsdCB2YWx1ZXMgcHJvdmlkZXIgZm9yIHR5cGVhaGVhZCAqL1xuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBUeXBlYWhlYWRDb25maWcge1xuICAvKiogc2V0cyB1c2UgYWRhcHRpdmUgcG9zaXRpb24gKi9cbiAgYWRhcHRpdmVQb3NpdGlvbiA9IGZhbHNlO1xuICAvKiogdHVybiBvbi9vZmYgYW5pbWF0aW9uICovXG4gIGlzQW5pbWF0ZWQgPSBmYWxzZTtcbiAgLyoqIHVzZWQgdG8gaGlkZSByZXN1bHRzIG9uIGJsdXIgKi9cbiAgaGlkZVJlc3VsdHNPbkJsdXIgPSB0cnVlO1xuICAvKiogaWYgdHJ1ZSwgdHlwZWFoZWFkIHdpbGwgY2FuY2VsIGFzeW5jIHJlcXVlc3Qgb24gYmx1ciAqL1xuICBjYW5jZWxSZXF1ZXN0T25Gb2N1c0xvc3QgPSBmYWxzZTtcbiAgLyoqIHVzZWQgdG8gY2hvb3NlIHRoZSBmaXJzdCBpdGVtIGluIHR5cGVhaGVhZCBjb250YWluZXIgKi9cbiAgc2VsZWN0Rmlyc3RJdGVtID0gdHJ1ZTtcbiAgLyoqIHVzZWQgdG8gYWN0aXZlL2luYWN0aXZlIHRoZSBmaXJzdCBpdGVtIGluIHR5cGVhaGVhZCBjb250YWluZXIgKi9cbiAgaXNGaXJzdEl0ZW1BY3RpdmUgPSB0cnVlO1xuICAvKiogdXNlZCB0byBjaG9vc2Ugc2V0IG1pbmltYWwgbm8gb2YgY2hhcmFjdGVycyB0aGF0IG5lZWRzIHRvXG4gICAqIGJlIGVudGVyZWQgYmVmb3JlIHR5cGVhaGVhZCBraWNrcy1pblxuICAgKi9cbiAgbWluTGVuZ3RoID0gMTtcbiAgLyoqXG4gICAqIHVzZWQgdG8gY2hvb3NlIGl0ZW0gb24gYmx1ciBldmVudFxuICAgKi9cbiAgc2VsZWN0SXRlbU9uQmx1ciA9IGZhbHNlO1xufVxuIl19