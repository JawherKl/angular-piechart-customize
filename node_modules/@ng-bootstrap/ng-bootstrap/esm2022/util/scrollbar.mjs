import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import * as i0 from "@angular/core";
/**
 * Utility to handle the scrollbar.
 *
 * It allows to hide the scrollbar and compensate the lack of a vertical scrollbar
 * by adding an equivalent padding on the right of the body, and to revert this change.
 */
class ScrollBar {
    constructor(_document) {
        this._document = _document;
    }
    /**
     * To be called to hide a potential vertical scrollbar:
     * - if a scrollbar is there and has a width greater than 0, adds some compensation
     * padding to the body to keep the same layout as when the scrollbar is there
     * - adds overflow: hidden
     *
     * @return a callback used to revert the change
     */
    hide() {
        const scrollbarWidth = Math.abs(window.innerWidth - this._document.documentElement.clientWidth);
        const body = this._document.body;
        const bodyStyle = body.style;
        const { overflow, paddingRight } = bodyStyle;
        if (scrollbarWidth > 0) {
            const actualPadding = parseFloat(window.getComputedStyle(body).paddingRight);
            bodyStyle.paddingRight = `${actualPadding + scrollbarWidth}px`;
        }
        bodyStyle.overflow = 'hidden';
        return () => {
            if (scrollbarWidth > 0) {
                bodyStyle.paddingRight = paddingRight;
            }
            bodyStyle.overflow = overflow;
        };
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: ScrollBar, deps: [{ token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: ScrollBar, providedIn: 'root' }); }
}
export { ScrollBar };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: ScrollBar, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsYmFyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3V0aWwvc2Nyb2xsYmFyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7QUFLM0M7Ozs7O0dBS0c7QUFDSCxNQUNhLFNBQVM7SUFDckIsWUFBc0MsU0FBYztRQUFkLGNBQVMsR0FBVCxTQUFTLENBQUs7SUFBRyxDQUFDO0lBRXhEOzs7Ozs7O09BT0c7SUFDSCxJQUFJO1FBQ0gsTUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ2hHLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO1FBQ2pDLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDN0IsTUFBTSxFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQUUsR0FBRyxTQUFTLENBQUM7UUFDN0MsSUFBSSxjQUFjLEdBQUcsQ0FBQyxFQUFFO1lBQ3ZCLE1BQU0sYUFBYSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDN0UsU0FBUyxDQUFDLFlBQVksR0FBRyxHQUFHLGFBQWEsR0FBRyxjQUFjLElBQUksQ0FBQztTQUMvRDtRQUNELFNBQVMsQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQzlCLE9BQU8sR0FBRyxFQUFFO1lBQ1gsSUFBSSxjQUFjLEdBQUcsQ0FBQyxFQUFFO2dCQUN2QixTQUFTLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQzthQUN0QztZQUNELFNBQVMsQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQy9CLENBQUMsQ0FBQztJQUNILENBQUM7OEdBM0JXLFNBQVMsa0JBQ0QsUUFBUTtrSEFEaEIsU0FBUyxjQURJLE1BQU07O1NBQ25CLFNBQVM7MkZBQVQsU0FBUztrQkFEckIsVUFBVTttQkFBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUU7OzBCQUVwQixNQUFNOzJCQUFDLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuLyoqIFR5cGUgZm9yIHRoZSBjYWxsYmFjayB1c2VkIHRvIHJldmVydCB0aGUgc2Nyb2xsYmFyLiAqL1xuZXhwb3J0IHR5cGUgU2Nyb2xsYmFyUmV2ZXJ0ZXIgPSAoKSA9PiB2b2lkO1xuXG4vKipcbiAqIFV0aWxpdHkgdG8gaGFuZGxlIHRoZSBzY3JvbGxiYXIuXG4gKlxuICogSXQgYWxsb3dzIHRvIGhpZGUgdGhlIHNjcm9sbGJhciBhbmQgY29tcGVuc2F0ZSB0aGUgbGFjayBvZiBhIHZlcnRpY2FsIHNjcm9sbGJhclxuICogYnkgYWRkaW5nIGFuIGVxdWl2YWxlbnQgcGFkZGluZyBvbiB0aGUgcmlnaHQgb2YgdGhlIGJvZHksIGFuZCB0byByZXZlcnQgdGhpcyBjaGFuZ2UuXG4gKi9cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgU2Nyb2xsQmFyIHtcblx0Y29uc3RydWN0b3IoQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBfZG9jdW1lbnQ6IGFueSkge31cblxuXHQvKipcblx0ICogVG8gYmUgY2FsbGVkIHRvIGhpZGUgYSBwb3RlbnRpYWwgdmVydGljYWwgc2Nyb2xsYmFyOlxuXHQgKiAtIGlmIGEgc2Nyb2xsYmFyIGlzIHRoZXJlIGFuZCBoYXMgYSB3aWR0aCBncmVhdGVyIHRoYW4gMCwgYWRkcyBzb21lIGNvbXBlbnNhdGlvblxuXHQgKiBwYWRkaW5nIHRvIHRoZSBib2R5IHRvIGtlZXAgdGhlIHNhbWUgbGF5b3V0IGFzIHdoZW4gdGhlIHNjcm9sbGJhciBpcyB0aGVyZVxuXHQgKiAtIGFkZHMgb3ZlcmZsb3c6IGhpZGRlblxuXHQgKlxuXHQgKiBAcmV0dXJuIGEgY2FsbGJhY2sgdXNlZCB0byByZXZlcnQgdGhlIGNoYW5nZVxuXHQgKi9cblx0aGlkZSgpOiBTY3JvbGxiYXJSZXZlcnRlciB7XG5cdFx0Y29uc3Qgc2Nyb2xsYmFyV2lkdGggPSBNYXRoLmFicyh3aW5kb3cuaW5uZXJXaWR0aCAtIHRoaXMuX2RvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCk7XG5cdFx0Y29uc3QgYm9keSA9IHRoaXMuX2RvY3VtZW50LmJvZHk7XG5cdFx0Y29uc3QgYm9keVN0eWxlID0gYm9keS5zdHlsZTtcblx0XHRjb25zdCB7IG92ZXJmbG93LCBwYWRkaW5nUmlnaHQgfSA9IGJvZHlTdHlsZTtcblx0XHRpZiAoc2Nyb2xsYmFyV2lkdGggPiAwKSB7XG5cdFx0XHRjb25zdCBhY3R1YWxQYWRkaW5nID0gcGFyc2VGbG9hdCh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShib2R5KS5wYWRkaW5nUmlnaHQpO1xuXHRcdFx0Ym9keVN0eWxlLnBhZGRpbmdSaWdodCA9IGAke2FjdHVhbFBhZGRpbmcgKyBzY3JvbGxiYXJXaWR0aH1weGA7XG5cdFx0fVxuXHRcdGJvZHlTdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xuXHRcdHJldHVybiAoKSA9PiB7XG5cdFx0XHRpZiAoc2Nyb2xsYmFyV2lkdGggPiAwKSB7XG5cdFx0XHRcdGJvZHlTdHlsZS5wYWRkaW5nUmlnaHQgPSBwYWRkaW5nUmlnaHQ7XG5cdFx0XHR9XG5cdFx0XHRib2R5U3R5bGUub3ZlcmZsb3cgPSBvdmVyZmxvdztcblx0XHR9O1xuXHR9XG59XG4iXX0=