import { fromEvent } from 'rxjs';
import { filter, map, takeUntil, withLatestFrom } from 'rxjs/operators';
import { Key } from './key';
export const FOCUSABLE_ELEMENTS_SELECTOR = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled]):not([type="hidden"])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[contenteditable]',
    '[tabindex]:not([tabindex="-1"])',
].join(', ');
/**
 * Returns first and last focusable elements inside of a given element based on specific CSS selector
 */
export function getFocusableBoundaryElements(element) {
    const list = Array.from(element.querySelectorAll(FOCUSABLE_ELEMENTS_SELECTOR)).filter((el) => el.tabIndex !== -1);
    return [list[0], list[list.length - 1]];
}
/**
 * Function that enforces browser focus to be trapped inside a DOM element.
 *
 * Works only for clicks inside the element and navigation with 'Tab', ignoring clicks outside of the element
 *
 * @param zone Angular zone
 * @param element The element around which focus will be trapped inside
 * @param stopFocusTrap$ The observable stream. When completed the focus trap will clean up listeners
 * and free internal resources
 * @param refocusOnClick Put the focus back to the last focused element whenever a click occurs on element (default to
 * false)
 */
export const ngbFocusTrap = (zone, element, stopFocusTrap$, refocusOnClick = false) => {
    zone.runOutsideAngular(() => {
        // last focused element
        const lastFocusedElement$ = fromEvent(element, 'focusin').pipe(takeUntil(stopFocusTrap$), map((e) => e.target));
        // 'tab' / 'shift+tab' stream
        fromEvent(element, 'keydown')
            .pipe(takeUntil(stopFocusTrap$), 
        /* eslint-disable-next-line deprecation/deprecation */
        filter((e) => e.which === Key.Tab), withLatestFrom(lastFocusedElement$))
            .subscribe(([tabEvent, focusedElement]) => {
            const [first, last] = getFocusableBoundaryElements(element);
            if ((focusedElement === first || focusedElement === element) && tabEvent.shiftKey) {
                last.focus();
                tabEvent.preventDefault();
            }
            if (focusedElement === last && !tabEvent.shiftKey) {
                first.focus();
                tabEvent.preventDefault();
            }
        });
        // inside click
        if (refocusOnClick) {
            fromEvent(element, 'click')
                .pipe(takeUntil(stopFocusTrap$), withLatestFrom(lastFocusedElement$), map((arr) => arr[1]))
                .subscribe((lastFocusedElement) => lastFocusedElement.focus());
        }
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9jdXMtdHJhcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy91dGlsL2ZvY3VzLXRyYXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsT0FBTyxFQUFFLFNBQVMsRUFBYyxNQUFNLE1BQU0sQ0FBQztBQUM3QyxPQUFPLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsY0FBYyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFeEUsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUU1QixNQUFNLENBQUMsTUFBTSwyQkFBMkIsR0FBRztJQUMxQyxTQUFTO0lBQ1Qsd0JBQXdCO0lBQ3hCLDRDQUE0QztJQUM1Qyx3QkFBd0I7SUFDeEIsMEJBQTBCO0lBQzFCLG1CQUFtQjtJQUNuQixpQ0FBaUM7Q0FDakMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFFYjs7R0FFRztBQUNILE1BQU0sVUFBVSw0QkFBNEIsQ0FBQyxPQUFvQjtJQUNoRSxNQUFNLElBQUksR0FBa0IsS0FBSyxDQUFDLElBQUksQ0FDckMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLDJCQUEyQixDQUE0QixDQUNoRixDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLFFBQVEsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN6QyxDQUFDO0FBRUQ7Ozs7Ozs7Ozs7O0dBV0c7QUFDSCxNQUFNLENBQUMsTUFBTSxZQUFZLEdBQUcsQ0FDM0IsSUFBWSxFQUNaLE9BQW9CLEVBQ3BCLGNBQStCLEVBQy9CLGNBQWMsR0FBRyxLQUFLLEVBQ3JCLEVBQUU7SUFDSCxJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxFQUFFO1FBQzNCLHVCQUF1QjtRQUN2QixNQUFNLG1CQUFtQixHQUFHLFNBQVMsQ0FBYSxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUN6RSxTQUFTLENBQUMsY0FBYyxDQUFDLEVBQ3pCLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUNwQixDQUFDO1FBRUYsNkJBQTZCO1FBQzdCLFNBQVMsQ0FBZ0IsT0FBTyxFQUFFLFNBQVMsQ0FBQzthQUMxQyxJQUFJLENBQ0osU0FBUyxDQUFDLGNBQWMsQ0FBQztRQUN6QixzREFBc0Q7UUFDdEQsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxLQUFLLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFDbEMsY0FBYyxDQUFDLG1CQUFtQixDQUFDLENBQ25DO2FBQ0EsU0FBUyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsY0FBYyxDQUFDLEVBQUUsRUFBRTtZQUN6QyxNQUFNLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxHQUFHLDRCQUE0QixDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBRTVELElBQUksQ0FBQyxjQUFjLEtBQUssS0FBSyxJQUFJLGNBQWMsS0FBSyxPQUFPLENBQUMsSUFBSSxRQUFRLENBQUMsUUFBUSxFQUFFO2dCQUNsRixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQ2IsUUFBUSxDQUFDLGNBQWMsRUFBRSxDQUFDO2FBQzFCO1lBRUQsSUFBSSxjQUFjLEtBQUssSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRTtnQkFDbEQsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUNkLFFBQVEsQ0FBQyxjQUFjLEVBQUUsQ0FBQzthQUMxQjtRQUNGLENBQUMsQ0FBQyxDQUFDO1FBRUosZUFBZTtRQUNmLElBQUksY0FBYyxFQUFFO1lBQ25CLFNBQVMsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDO2lCQUN6QixJQUFJLENBQ0osU0FBUyxDQUFDLGNBQWMsQ0FBQyxFQUN6QixjQUFjLENBQUMsbUJBQW1CLENBQUMsRUFDbkMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFnQixDQUFDLENBQ25DO2lCQUNBLFNBQVMsQ0FBQyxDQUFDLGtCQUFrQixFQUFFLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1NBQ2hFO0lBQ0YsQ0FBQyxDQUFDLENBQUM7QUFDSixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgZnJvbUV2ZW50LCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIG1hcCwgdGFrZVVudGlsLCB3aXRoTGF0ZXN0RnJvbSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgS2V5IH0gZnJvbSAnLi9rZXknO1xuXG5leHBvcnQgY29uc3QgRk9DVVNBQkxFX0VMRU1FTlRTX1NFTEVDVE9SID0gW1xuXHQnYVtocmVmXScsXG5cdCdidXR0b246bm90KFtkaXNhYmxlZF0pJyxcblx0J2lucHV0Om5vdChbZGlzYWJsZWRdKTpub3QoW3R5cGU9XCJoaWRkZW5cIl0pJyxcblx0J3NlbGVjdDpub3QoW2Rpc2FibGVkXSknLFxuXHQndGV4dGFyZWE6bm90KFtkaXNhYmxlZF0pJyxcblx0J1tjb250ZW50ZWRpdGFibGVdJyxcblx0J1t0YWJpbmRleF06bm90KFt0YWJpbmRleD1cIi0xXCJdKScsXG5dLmpvaW4oJywgJyk7XG5cbi8qKlxuICogUmV0dXJucyBmaXJzdCBhbmQgbGFzdCBmb2N1c2FibGUgZWxlbWVudHMgaW5zaWRlIG9mIGEgZ2l2ZW4gZWxlbWVudCBiYXNlZCBvbiBzcGVjaWZpYyBDU1Mgc2VsZWN0b3JcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEZvY3VzYWJsZUJvdW5kYXJ5RWxlbWVudHMoZWxlbWVudDogSFRNTEVsZW1lbnQpOiBIVE1MRWxlbWVudFtdIHtcblx0Y29uc3QgbGlzdDogSFRNTEVsZW1lbnRbXSA9IEFycmF5LmZyb20oXG5cdFx0ZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKEZPQ1VTQUJMRV9FTEVNRU5UU19TRUxFQ1RPUikgYXMgTm9kZUxpc3RPZjxIVE1MRWxlbWVudD4sXG5cdCkuZmlsdGVyKChlbCkgPT4gZWwudGFiSW5kZXggIT09IC0xKTtcblx0cmV0dXJuIFtsaXN0WzBdLCBsaXN0W2xpc3QubGVuZ3RoIC0gMV1dO1xufVxuXG4vKipcbiAqIEZ1bmN0aW9uIHRoYXQgZW5mb3JjZXMgYnJvd3NlciBmb2N1cyB0byBiZSB0cmFwcGVkIGluc2lkZSBhIERPTSBlbGVtZW50LlxuICpcbiAqIFdvcmtzIG9ubHkgZm9yIGNsaWNrcyBpbnNpZGUgdGhlIGVsZW1lbnQgYW5kIG5hdmlnYXRpb24gd2l0aCAnVGFiJywgaWdub3JpbmcgY2xpY2tzIG91dHNpZGUgb2YgdGhlIGVsZW1lbnRcbiAqXG4gKiBAcGFyYW0gem9uZSBBbmd1bGFyIHpvbmVcbiAqIEBwYXJhbSBlbGVtZW50IFRoZSBlbGVtZW50IGFyb3VuZCB3aGljaCBmb2N1cyB3aWxsIGJlIHRyYXBwZWQgaW5zaWRlXG4gKiBAcGFyYW0gc3RvcEZvY3VzVHJhcCQgVGhlIG9ic2VydmFibGUgc3RyZWFtLiBXaGVuIGNvbXBsZXRlZCB0aGUgZm9jdXMgdHJhcCB3aWxsIGNsZWFuIHVwIGxpc3RlbmVyc1xuICogYW5kIGZyZWUgaW50ZXJuYWwgcmVzb3VyY2VzXG4gKiBAcGFyYW0gcmVmb2N1c09uQ2xpY2sgUHV0IHRoZSBmb2N1cyBiYWNrIHRvIHRoZSBsYXN0IGZvY3VzZWQgZWxlbWVudCB3aGVuZXZlciBhIGNsaWNrIG9jY3VycyBvbiBlbGVtZW50IChkZWZhdWx0IHRvXG4gKiBmYWxzZSlcbiAqL1xuZXhwb3J0IGNvbnN0IG5nYkZvY3VzVHJhcCA9IChcblx0em9uZTogTmdab25lLFxuXHRlbGVtZW50OiBIVE1MRWxlbWVudCxcblx0c3RvcEZvY3VzVHJhcCQ6IE9ic2VydmFibGU8YW55Pixcblx0cmVmb2N1c09uQ2xpY2sgPSBmYWxzZSxcbikgPT4ge1xuXHR6b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcblx0XHQvLyBsYXN0IGZvY3VzZWQgZWxlbWVudFxuXHRcdGNvbnN0IGxhc3RGb2N1c2VkRWxlbWVudCQgPSBmcm9tRXZlbnQ8Rm9jdXNFdmVudD4oZWxlbWVudCwgJ2ZvY3VzaW4nKS5waXBlKFxuXHRcdFx0dGFrZVVudGlsKHN0b3BGb2N1c1RyYXAkKSxcblx0XHRcdG1hcCgoZSkgPT4gZS50YXJnZXQpLFxuXHRcdCk7XG5cblx0XHQvLyAndGFiJyAvICdzaGlmdCt0YWInIHN0cmVhbVxuXHRcdGZyb21FdmVudDxLZXlib2FyZEV2ZW50PihlbGVtZW50LCAna2V5ZG93bicpXG5cdFx0XHQucGlwZShcblx0XHRcdFx0dGFrZVVudGlsKHN0b3BGb2N1c1RyYXAkKSxcblx0XHRcdFx0LyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGRlcHJlY2F0aW9uL2RlcHJlY2F0aW9uICovXG5cdFx0XHRcdGZpbHRlcigoZSkgPT4gZS53aGljaCA9PT0gS2V5LlRhYiksXG5cdFx0XHRcdHdpdGhMYXRlc3RGcm9tKGxhc3RGb2N1c2VkRWxlbWVudCQpLFxuXHRcdFx0KVxuXHRcdFx0LnN1YnNjcmliZSgoW3RhYkV2ZW50LCBmb2N1c2VkRWxlbWVudF0pID0+IHtcblx0XHRcdFx0Y29uc3QgW2ZpcnN0LCBsYXN0XSA9IGdldEZvY3VzYWJsZUJvdW5kYXJ5RWxlbWVudHMoZWxlbWVudCk7XG5cblx0XHRcdFx0aWYgKChmb2N1c2VkRWxlbWVudCA9PT0gZmlyc3QgfHwgZm9jdXNlZEVsZW1lbnQgPT09IGVsZW1lbnQpICYmIHRhYkV2ZW50LnNoaWZ0S2V5KSB7XG5cdFx0XHRcdFx0bGFzdC5mb2N1cygpO1xuXHRcdFx0XHRcdHRhYkV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoZm9jdXNlZEVsZW1lbnQgPT09IGxhc3QgJiYgIXRhYkV2ZW50LnNoaWZ0S2V5KSB7XG5cdFx0XHRcdFx0Zmlyc3QuZm9jdXMoKTtcblx0XHRcdFx0XHR0YWJFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdC8vIGluc2lkZSBjbGlja1xuXHRcdGlmIChyZWZvY3VzT25DbGljaykge1xuXHRcdFx0ZnJvbUV2ZW50KGVsZW1lbnQsICdjbGljaycpXG5cdFx0XHRcdC5waXBlKFxuXHRcdFx0XHRcdHRha2VVbnRpbChzdG9wRm9jdXNUcmFwJCksXG5cdFx0XHRcdFx0d2l0aExhdGVzdEZyb20obGFzdEZvY3VzZWRFbGVtZW50JCksXG5cdFx0XHRcdFx0bWFwKChhcnIpID0+IGFyclsxXSBhcyBIVE1MRWxlbWVudCksXG5cdFx0XHRcdClcblx0XHRcdFx0LnN1YnNjcmliZSgobGFzdEZvY3VzZWRFbGVtZW50KSA9PiBsYXN0Rm9jdXNlZEVsZW1lbnQuZm9jdXMoKSk7XG5cdFx0fVxuXHR9KTtcbn07XG4iXX0=