import { Component, Input, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { regExpEscape, toString, removeAccents } from '../util/util';
import { NgFor, NgIf } from '@angular/common';
import * as i0 from "@angular/core";
/**
 * A component that helps with text highlighting.
 *
 * It splits the `result` text into parts that contain the searched `term` and generates the HTML markup to simplify
 * highlighting:
 *
 * Ex. `result="Alaska"` and `term="as"` will produce `Al<span class="ngb-highlight">as</span>ka`.
 */
class NgbHighlight {
    constructor() {
        /**
         * The CSS class for `<span>` elements wrapping the `term` inside the `result`.
         */
        this.highlightClass = 'ngb-highlight';
        /**
         * Boolean option to determine if the highlighting should be sensitive to accents or not.
         *
         * This feature is only available for browsers that implement the `String.normalize` function
         * (typically not Internet Explorer).
         * If you want to use this feature in a browser that does not implement `String.normalize`,
         * you will have to include a polyfill in your application (`unorm` for example).
         *
         * @since 9.1.0
         */
        this.accentSensitive = true;
    }
    ngOnChanges(changes) {
        if (!this.accentSensitive && !String.prototype.normalize) {
            console.warn('The `accentSensitive` input in `ngb-highlight` cannot be set to `false` in a browser ' +
                'that does not implement the `String.normalize` function. ' +
                'You will have to include a polyfill in your application to use this feature in the current browser.');
            this.accentSensitive = true;
        }
        const result = toString(this.result);
        const terms = Array.isArray(this.term) ? this.term : [this.term];
        const prepareTerm = (term) => (this.accentSensitive ? term : removeAccents(term));
        const escapedTerms = terms.map((term) => regExpEscape(prepareTerm(toString(term)))).filter((term) => term);
        const toSplit = this.accentSensitive ? result : removeAccents(result);
        const parts = escapedTerms.length ? toSplit.split(new RegExp(`(${escapedTerms.join('|')})`, 'gmi')) : [result];
        if (this.accentSensitive) {
            this.parts = parts;
        }
        else {
            let offset = 0;
            this.parts = parts.map((part) => result.substring(offset, (offset += part.length)));
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbHighlight, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.6", type: NgbHighlight, isStandalone: true, selector: "ngb-highlight", inputs: { highlightClass: "highlightClass", result: "result", term: "term", accentSensitive: "accentSensitive" }, usesOnChanges: true, ngImport: i0, template: "<ng-template ngFor [ngForOf]=\"parts\" let-part let-isOdd=\"odd\"><span *ngIf=\"isOdd; else even\" [class]=\"highlightClass\">{{part}}</span><ng-template #even>{{part}}</ng-template></ng-template>", isInline: true, styles: [".ngb-highlight{font-weight:700}\n"], dependencies: [{ kind: "directive", type: NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: NgFor, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None }); }
}
export { NgbHighlight };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbHighlight, decorators: [{
            type: Component,
            args: [{ selector: 'ngb-highlight', standalone: true, imports: [NgIf, NgFor], changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: `<ng-template ngFor [ngForOf]="parts" let-part let-isOdd="odd">` +
                        `<span *ngIf="isOdd; else even" [class]="highlightClass">{{part}}</span><ng-template #even>{{part}}</ng-template>` +
                        `</ng-template>`, styles: [".ngb-highlight{font-weight:700}\n"] }]
        }], propDecorators: { highlightClass: [{
                type: Input
            }], result: [{
                type: Input,
                args: [{ required: true }]
            }], term: [{
                type: Input,
                args: [{ required: true }]
            }], accentSensitive: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlnaGxpZ2h0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3R5cGVhaGVhZC9oaWdobGlnaHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQWEsdUJBQXVCLEVBQWlCLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3ZILE9BQU8sRUFBRSxZQUFZLEVBQUUsUUFBUSxFQUFFLGFBQWEsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUNyRSxPQUFPLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLGlCQUFpQixDQUFDOztBQUU5Qzs7Ozs7OztHQU9HO0FBQ0gsTUFZYSxZQUFZO0lBWnpCO1FBZUM7O1dBRUc7UUFDTSxtQkFBYyxHQUFHLGVBQWUsQ0FBQztRQWdCMUM7Ozs7Ozs7OztXQVNHO1FBQ00sb0JBQWUsR0FBRyxJQUFJLENBQUM7S0EyQmhDO0lBekJBLFdBQVcsQ0FBQyxPQUFzQjtRQUNqQyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFO1lBQ3pELE9BQU8sQ0FBQyxJQUFJLENBQ1gsdUZBQXVGO2dCQUN0RiwyREFBMkQ7Z0JBQzNELHFHQUFxRyxDQUN0RyxDQUFDO1lBQ0YsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7U0FDNUI7UUFDRCxNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRXJDLE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNqRSxNQUFNLFdBQVcsR0FBRyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ2xGLE1BQU0sWUFBWSxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDM0csTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFdEUsTUFBTSxLQUFLLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLFlBQVksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRS9HLElBQUksSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUN6QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztTQUNuQjthQUFNO1lBQ04sSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDO1lBQ2YsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3BGO0lBQ0YsQ0FBQzs4R0ExRFcsWUFBWTtrR0FBWixZQUFZLGlnQkFUZCxJQUFJLDZGQUFFLEtBQUs7O1NBU1QsWUFBWTsyRkFBWixZQUFZO2tCQVp4QixTQUFTOytCQUNDLGVBQWUsY0FDYixJQUFJLFdBQ1AsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLG1CQUNMLHVCQUF1QixDQUFDLE1BQU0saUJBQ2hDLGlCQUFpQixDQUFDLElBQUksWUFFcEMsZ0VBQWdFO3dCQUNoRSxrSEFBa0g7d0JBQ2xILGdCQUFnQjs4QkFTUixjQUFjO3NCQUF0QixLQUFLO2dCQVFxQixNQUFNO3NCQUFoQyxLQUFLO3VCQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRTtnQkFNRSxJQUFJO3NCQUE5QixLQUFLO3VCQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRTtnQkFZaEIsZUFBZTtzQkFBdkIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uQ2hhbmdlcywgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIFNpbXBsZUNoYW5nZXMsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyByZWdFeHBFc2NhcGUsIHRvU3RyaW5nLCByZW1vdmVBY2NlbnRzIH0gZnJvbSAnLi4vdXRpbC91dGlsJztcbmltcG9ydCB7IE5nRm9yLCBOZ0lmIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuLyoqXG4gKiBBIGNvbXBvbmVudCB0aGF0IGhlbHBzIHdpdGggdGV4dCBoaWdobGlnaHRpbmcuXG4gKlxuICogSXQgc3BsaXRzIHRoZSBgcmVzdWx0YCB0ZXh0IGludG8gcGFydHMgdGhhdCBjb250YWluIHRoZSBzZWFyY2hlZCBgdGVybWAgYW5kIGdlbmVyYXRlcyB0aGUgSFRNTCBtYXJrdXAgdG8gc2ltcGxpZnlcbiAqIGhpZ2hsaWdodGluZzpcbiAqXG4gKiBFeC4gYHJlc3VsdD1cIkFsYXNrYVwiYCBhbmQgYHRlcm09XCJhc1wiYCB3aWxsIHByb2R1Y2UgYEFsPHNwYW4gY2xhc3M9XCJuZ2ItaGlnaGxpZ2h0XCI+YXM8L3NwYW4+a2FgLlxuICovXG5AQ29tcG9uZW50KHtcblx0c2VsZWN0b3I6ICduZ2ItaGlnaGxpZ2h0Jyxcblx0c3RhbmRhbG9uZTogdHJ1ZSxcblx0aW1wb3J0czogW05nSWYsIE5nRm9yXSxcblx0Y2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG5cdGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG5cdHRlbXBsYXRlOlxuXHRcdGA8bmctdGVtcGxhdGUgbmdGb3IgW25nRm9yT2ZdPVwicGFydHNcIiBsZXQtcGFydCBsZXQtaXNPZGQ9XCJvZGRcIj5gICtcblx0XHRgPHNwYW4gKm5nSWY9XCJpc09kZDsgZWxzZSBldmVuXCIgW2NsYXNzXT1cImhpZ2hsaWdodENsYXNzXCI+e3twYXJ0fX08L3NwYW4+PG5nLXRlbXBsYXRlICNldmVuPnt7cGFydH19PC9uZy10ZW1wbGF0ZT5gICtcblx0XHRgPC9uZy10ZW1wbGF0ZT5gLCAvLyB0ZW1wbGF0ZSBuZWVkcyB0byBiZSBmb3JtYXR0ZWQgaW4gYSBjZXJ0YWluIHdheSBzbyB3ZSBkb24ndCBhZGQgZW1wdHkgdGV4dCBub2Rlc1xuXHRzdHlsZVVybHM6IFsnLi9oaWdobGlnaHQuc2NzcyddLFxufSlcbmV4cG9ydCBjbGFzcyBOZ2JIaWdobGlnaHQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuXHRwYXJ0czogc3RyaW5nW107XG5cblx0LyoqXG5cdCAqIFRoZSBDU1MgY2xhc3MgZm9yIGA8c3Bhbj5gIGVsZW1lbnRzIHdyYXBwaW5nIHRoZSBgdGVybWAgaW5zaWRlIHRoZSBgcmVzdWx0YC5cblx0ICovXG5cdEBJbnB1dCgpIGhpZ2hsaWdodENsYXNzID0gJ25nYi1oaWdobGlnaHQnO1xuXG5cdC8qKlxuXHQgKiBUaGUgdGV4dCBoaWdobGlnaHRpbmcgaXMgYWRkZWQgdG8uXG5cdCAqXG5cdCAqIElmIHRoZSBgdGVybWAgaXMgZm91bmQgaW5zaWRlIHRoaXMgdGV4dCwgaXQgd2lsbCBiZSBoaWdobGlnaHRlZC5cblx0ICogSWYgdGhlIGB0ZXJtYCBjb250YWlucyBhcnJheSB0aGVuIGFsbCB0aGUgaXRlbXMgZnJvbSBpdCB3aWxsIGJlIGhpZ2hsaWdodGVkIGluc2lkZSB0aGUgdGV4dC5cblx0ICovXG5cdEBJbnB1dCh7IHJlcXVpcmVkOiB0cnVlIH0pIHJlc3VsdD86IHN0cmluZyB8IG51bGw7XG5cblx0LyoqXG5cdCAqIFRoZSB0ZXJtIG9yIGFycmF5IG9mIHRlcm1zIHRvIGJlIGhpZ2hsaWdodGVkLlxuXHQgKiBTaW5jZSB2ZXJzaW9uIGB2NC4yLjBgIHRlcm0gY291bGQgYmUgYSBgc3RyaW5nW11gXG5cdCAqL1xuXHRASW5wdXQoeyByZXF1aXJlZDogdHJ1ZSB9KSB0ZXJtOiBzdHJpbmcgfCByZWFkb25seSBzdHJpbmdbXTtcblxuXHQvKipcblx0ICogQm9vbGVhbiBvcHRpb24gdG8gZGV0ZXJtaW5lIGlmIHRoZSBoaWdobGlnaHRpbmcgc2hvdWxkIGJlIHNlbnNpdGl2ZSB0byBhY2NlbnRzIG9yIG5vdC5cblx0ICpcblx0ICogVGhpcyBmZWF0dXJlIGlzIG9ubHkgYXZhaWxhYmxlIGZvciBicm93c2VycyB0aGF0IGltcGxlbWVudCB0aGUgYFN0cmluZy5ub3JtYWxpemVgIGZ1bmN0aW9uXG5cdCAqICh0eXBpY2FsbHkgbm90IEludGVybmV0IEV4cGxvcmVyKS5cblx0ICogSWYgeW91IHdhbnQgdG8gdXNlIHRoaXMgZmVhdHVyZSBpbiBhIGJyb3dzZXIgdGhhdCBkb2VzIG5vdCBpbXBsZW1lbnQgYFN0cmluZy5ub3JtYWxpemVgLFxuXHQgKiB5b3Ugd2lsbCBoYXZlIHRvIGluY2x1ZGUgYSBwb2x5ZmlsbCBpbiB5b3VyIGFwcGxpY2F0aW9uIChgdW5vcm1gIGZvciBleGFtcGxlKS5cblx0ICpcblx0ICogQHNpbmNlIDkuMS4wXG5cdCAqL1xuXHRASW5wdXQoKSBhY2NlbnRTZW5zaXRpdmUgPSB0cnVlO1xuXG5cdG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcblx0XHRpZiAoIXRoaXMuYWNjZW50U2Vuc2l0aXZlICYmICFTdHJpbmcucHJvdG90eXBlLm5vcm1hbGl6ZSkge1xuXHRcdFx0Y29uc29sZS53YXJuKFxuXHRcdFx0XHQnVGhlIGBhY2NlbnRTZW5zaXRpdmVgIGlucHV0IGluIGBuZ2ItaGlnaGxpZ2h0YCBjYW5ub3QgYmUgc2V0IHRvIGBmYWxzZWAgaW4gYSBicm93c2VyICcgK1xuXHRcdFx0XHRcdCd0aGF0IGRvZXMgbm90IGltcGxlbWVudCB0aGUgYFN0cmluZy5ub3JtYWxpemVgIGZ1bmN0aW9uLiAnICtcblx0XHRcdFx0XHQnWW91IHdpbGwgaGF2ZSB0byBpbmNsdWRlIGEgcG9seWZpbGwgaW4geW91ciBhcHBsaWNhdGlvbiB0byB1c2UgdGhpcyBmZWF0dXJlIGluIHRoZSBjdXJyZW50IGJyb3dzZXIuJyxcblx0XHRcdCk7XG5cdFx0XHR0aGlzLmFjY2VudFNlbnNpdGl2ZSA9IHRydWU7XG5cdFx0fVxuXHRcdGNvbnN0IHJlc3VsdCA9IHRvU3RyaW5nKHRoaXMucmVzdWx0KTtcblxuXHRcdGNvbnN0IHRlcm1zID0gQXJyYXkuaXNBcnJheSh0aGlzLnRlcm0pID8gdGhpcy50ZXJtIDogW3RoaXMudGVybV07XG5cdFx0Y29uc3QgcHJlcGFyZVRlcm0gPSAodGVybSkgPT4gKHRoaXMuYWNjZW50U2Vuc2l0aXZlID8gdGVybSA6IHJlbW92ZUFjY2VudHModGVybSkpO1xuXHRcdGNvbnN0IGVzY2FwZWRUZXJtcyA9IHRlcm1zLm1hcCgodGVybSkgPT4gcmVnRXhwRXNjYXBlKHByZXBhcmVUZXJtKHRvU3RyaW5nKHRlcm0pKSkpLmZpbHRlcigodGVybSkgPT4gdGVybSk7XG5cdFx0Y29uc3QgdG9TcGxpdCA9IHRoaXMuYWNjZW50U2Vuc2l0aXZlID8gcmVzdWx0IDogcmVtb3ZlQWNjZW50cyhyZXN1bHQpO1xuXG5cdFx0Y29uc3QgcGFydHMgPSBlc2NhcGVkVGVybXMubGVuZ3RoID8gdG9TcGxpdC5zcGxpdChuZXcgUmVnRXhwKGAoJHtlc2NhcGVkVGVybXMuam9pbignfCcpfSlgLCAnZ21pJykpIDogW3Jlc3VsdF07XG5cblx0XHRpZiAodGhpcy5hY2NlbnRTZW5zaXRpdmUpIHtcblx0XHRcdHRoaXMucGFydHMgPSBwYXJ0cztcblx0XHR9IGVsc2Uge1xuXHRcdFx0bGV0IG9mZnNldCA9IDA7XG5cdFx0XHR0aGlzLnBhcnRzID0gcGFydHMubWFwKChwYXJ0KSA9PiByZXN1bHQuc3Vic3RyaW5nKG9mZnNldCwgKG9mZnNldCArPSBwYXJ0Lmxlbmd0aCkpKTtcblx0XHR9XG5cdH1cbn1cbiJdfQ==