import { ChangeDetectorRef, inject, Injectable, NgZone, PLATFORM_ID } from '@angular/core';
import { Subject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { NgbScrollSpyConfig } from './scrollspy-config';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { toFragmentElement } from './scrollspy.utils';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import * as i0 from "@angular/core";
const MATCH_THRESHOLD = 3;
/**
 * A scrollspy service that allows tracking of elements scrolling in and out of view.
 *
 * It can be instantiated manually, or automatically by the `ngbScrollSpy` directive.
 *
 * @since 15.1.0
 */
class NgbScrollSpyService {
    constructor() {
        this._observer = null;
        this._containerElement = null;
        this._fragments = new Set();
        this._preRegisteredFragments = new Set();
        this._active$ = new Subject();
        this._distinctActive$ = this._active$.pipe(distinctUntilChanged());
        this._active = '';
        this._config = inject(NgbScrollSpyConfig);
        this._document = inject(DOCUMENT);
        this._platformId = inject(PLATFORM_ID);
        this._scrollBehavior = this._config.scrollBehavior;
        this._diChangeDetectorRef = inject(ChangeDetectorRef, { optional: true });
        this._changeDetectorRef = this._diChangeDetectorRef;
        this._zone = inject(NgZone);
        this._distinctActive$.pipe(takeUntilDestroyed()).subscribe((active) => {
            this._active = active;
            this._changeDetectorRef?.markForCheck();
        });
    }
    /**
     * Getter for the currently active fragment id. Returns empty string if none.
     */
    get active() {
        return this._active;
    }
    /**
     * An observable emitting the currently active fragment. Emits empty string if none.
     */
    get active$() {
        return this._distinctActive$;
    }
    /**
     * Starts the scrollspy service and observes specified fragments.
     *
     * You can specify a list of options to pass, like the root element, initial fragment, scroll behavior, etc.
     * See the [`NgbScrollSpyOptions`](#/components/scrollspy/api#NgbScrollSpyOptions) interface for more details.
     */
    start(options) {
        if (isPlatformBrowser(this._platformId)) {
            this._cleanup();
            const { root, rootMargin, scrollBehavior, threshold, fragments, changeDetectorRef, processChanges } = {
                ...options,
            };
            this._containerElement = root ?? this._document.documentElement;
            this._changeDetectorRef = changeDetectorRef ?? this._diChangeDetectorRef;
            this._scrollBehavior = scrollBehavior ?? this._config.scrollBehavior;
            const processChangesFn = processChanges ?? this._config.processChanges;
            const context = {};
            this._observer = new IntersectionObserver((entries) => processChangesFn({
                entries,
                rootElement: this._containerElement,
                fragments: this._fragments,
                scrollSpy: this,
                options: { ...options },
            }, (active) => this._active$.next(active), context), {
                root: root ?? this._document,
                ...(rootMargin && { rootMargin }),
                ...(threshold && { threshold }),
            });
            // merging fragments added before starting and the ones passed as options
            for (const element of [...this._preRegisteredFragments, ...(fragments ?? [])]) {
                this.observe(element);
            }
            this._preRegisteredFragments.clear();
        }
    }
    /**
     * Stops the service and unobserves all fragments.
     */
    stop() {
        this._cleanup();
        this._active$.next('');
    }
    /**
     * Scrolls to a fragment, it must be known to the service and contained in the root element.
     * An id or an element reference can be passed.
     *
     * [`NgbScrollToOptions`](#/components/scrollspy/api#NgbScrollToOptions) can be passed.
     */
    scrollTo(fragment, options) {
        const { behavior } = { behavior: this._scrollBehavior, ...options };
        if (this._containerElement) {
            const fragmentElement = toFragmentElement(this._containerElement, fragment);
            if (fragmentElement) {
                const heightPx = fragmentElement.offsetTop - this._containerElement.offsetTop;
                this._containerElement.scrollTo({ top: heightPx, behavior });
                let lastOffset = this._containerElement.scrollTop;
                let matchCounter = 0;
                // we should update the active section only after scrolling is finished
                // and there is no clean way to do it at the moment
                const containerElement = this._containerElement;
                this._zone.runOutsideAngular(() => {
                    const updateActiveWhenScrollingIsFinished = () => {
                        const sameOffsetAsLastTime = lastOffset === containerElement.scrollTop;
                        if (sameOffsetAsLastTime) {
                            matchCounter++;
                        }
                        else {
                            matchCounter = 0;
                        }
                        if (!sameOffsetAsLastTime || (sameOffsetAsLastTime && matchCounter < MATCH_THRESHOLD)) {
                            lastOffset = containerElement.scrollTop;
                            requestAnimationFrame(updateActiveWhenScrollingIsFinished);
                        }
                        else {
                            this._zone.run(() => this._active$.next(fragmentElement.id));
                        }
                    };
                    requestAnimationFrame(updateActiveWhenScrollingIsFinished);
                });
            }
        }
    }
    /**
     * Adds a fragment to observe. It must be contained in the root element.
     * An id or an element reference can be passed.
     */
    observe(fragment) {
        if (!this._observer) {
            this._preRegisteredFragments.add(fragment);
            return;
        }
        const fragmentElement = toFragmentElement(this._containerElement, fragment);
        if (fragmentElement && !this._fragments.has(fragmentElement)) {
            this._fragments.add(fragmentElement);
            this._observer.observe(fragmentElement);
        }
    }
    /**
     * Unobserves a fragment.
     * An id or an element reference can be passed.
     */
    unobserve(fragment) {
        if (!this._observer) {
            this._preRegisteredFragments.delete(fragment);
            return;
        }
        const fragmentElement = toFragmentElement(this._containerElement, fragment);
        if (fragmentElement) {
            this._fragments.delete(fragmentElement);
            // we're removing and re-adding all current fragments to recompute active one
            this._observer.disconnect();
            for (const fragment of this._fragments) {
                this._observer.observe(fragment);
            }
        }
    }
    ngOnDestroy() {
        this._cleanup();
    }
    _cleanup() {
        this._fragments.clear();
        this._observer?.disconnect();
        this._changeDetectorRef = this._diChangeDetectorRef;
        this._scrollBehavior = this._config.scrollBehavior;
        this._observer = null;
        this._containerElement = null;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbScrollSpyService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbScrollSpyService, providedIn: 'root' }); }
}
export { NgbScrollSpyService };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbScrollSpyService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsc3B5LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc2Nyb2xsc3B5L3Njcm9sbHNweS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBYSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdEcsT0FBTyxFQUFjLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUUzQyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN0RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN4RCxPQUFPLEVBQUUsUUFBUSxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDOUQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDdEQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7O0FBRWhFLE1BQU0sZUFBZSxHQUFHLENBQUMsQ0FBQztBQXlGMUI7Ozs7OztHQU1HO0FBQ0gsTUFHYSxtQkFBbUI7SUFtQi9CO1FBbEJRLGNBQVMsR0FBZ0MsSUFBSSxDQUFDO1FBRTlDLHNCQUFpQixHQUF1QixJQUFJLENBQUM7UUFDN0MsZUFBVSxHQUFHLElBQUksR0FBRyxFQUFXLENBQUM7UUFDaEMsNEJBQXVCLEdBQUcsSUFBSSxHQUFHLEVBQXdCLENBQUM7UUFFMUQsYUFBUSxHQUFHLElBQUksT0FBTyxFQUFVLENBQUM7UUFDakMscUJBQWdCLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxDQUFDO1FBQzlELFlBQU8sR0FBRyxFQUFFLENBQUM7UUFFYixZQUFPLEdBQUcsTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDckMsY0FBUyxHQUFHLE1BQU0s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QyxDQUFDO1lBQzlDLE9BQU87U0FDUDtRQUVELE1BQU0sZUFBZSxHQUFHLGlCQUFpQixDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUU1RSxJQUFJLGVBQWUsRUFBRTtZQUNwQixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUV4Qyw2RUFBNkU7WUFDN0UsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUU1QixLQUFLLE1BQU0sUUFBUSxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7Z0JBQ3ZDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ2pDO1NBQ0Q7SUFDRixDQUFDO0lBRUQsV0FBVztRQUNWLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBRU8sUUFBUTtRQUNmLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsQ0FBQztRQUM3QixJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDO1FBQ3BELElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUM7UUFDbkQsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDdEIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQztJQUMvQixDQUFDOzhHQXBNVyxtQkFBbUI7a0hBQW5CLG1CQUFtQixjQUZuQixNQUFNOztTQUVOLG1CQUFtQjsyRkFBbkIsbUJBQW1CO2tCQUgvQixVQUFVO21CQUFDO29CQUNYLFVBQVUsRUFBRSxNQUFNO2lCQUNsQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdG9yUmVmLCBpbmplY3QsIEluamVjdGFibGUsIE5nWm9uZSwgT25EZXN0cm95LCBQTEFURk9STV9JRCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgTmdiU2Nyb2xsU3B5UmVmIH0gZnJvbSAnLi9zY3JvbGxzcHknO1xuaW1wb3J0IHsgZGlzdGluY3RVbnRpbENoYW5nZWQgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBOZ2JTY3JvbGxTcHlDb25maWcgfSBmcm9tICcuL3Njcm9sbHNweS1jb25maWcnO1xuaW1wb3J0IHsgRE9DVU1FTlQsIGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IHRvRnJhZ21lbnRFbGVtZW50IH0gZnJvbSAnLi9zY3JvbGxzcHkudXRpbHMnO1xuaW1wb3J0IHsgdGFrZVVudGlsRGVzdHJveWVkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZS9yeGpzLWludGVyb3AnO1xuXG5jb25zdCBNQVRDSF9USFJFU0hPTEQgPSAzO1xuXG5leHBvcnQgdHlwZSBOZ2JTY3JvbGxTcHlQcm9jZXNzQ2hhbmdlcyA9IChcblx0c3RhdGU6IHtcblx0XHRlbnRyaWVzOiBJbnRlcnNlY3Rpb25PYnNlcnZlckVudHJ5W107XG5cdFx0cm9vdEVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuXHRcdGZyYWdtZW50czogU2V0PEVsZW1lbnQ+O1xuXHRcdHNjcm9sbFNweTogTmdiU2Nyb2xsU3B5U2VydmljZTtcblx0XHRvcHRpb25zOiBOZ2JTY3JvbGxTcHlPcHRpb25zO1xuXHR9LFxuXHRjaGFuZ2VBY3RpdmU6IChhY3RpdmU6IHN0cmluZykgPT4gdm9pZCxcblx0Y29udGV4dDogb2JqZWN0LFxuKSA9PiB2b2lkO1xuXG4vKipcbiAqIE9wdGlvbnMgcGFzc2VkIHRvIHRoZSBgTmdiU2Nyb2xsU3B5U2VydmljZS5zdGFydCgpYCBtZXRob2QgZm9yIHNjcm9sbHNweSBpbml0aWFsaXphdGlvbi5cbiAqXG4gKiBJdCBjb250YWlucyBhIHN1YnNldCBvZiB0aGUgYEludGVyc2VjdGlvbk9ic2VydmVySW5pdGAgb3B0aW9ucywgYXMgd2VsbCBhZGRpdGlvbmFsIG9wdGlvbmFsIHByb3BlcnRpZXNcbiAqIGxpa2UgYGNoYW5nZURldGVjdG9yUmVmYCBvciBgZnJhZ21lbnRzYFxuICpcbiAqIEBzaW5jZSAxNS4xLjBcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBOZ2JTY3JvbGxTcHlPcHRpb25zIGV4dGVuZHMgUGljazxJbnRlcnNlY3Rpb25PYnNlcnZlckluaXQsICdyb290JyB8ICdyb290TWFyZ2luJyB8ICd0aHJlc2hvbGQnPiB7XG5cdC8qKlxuXHQgKiBBbiBvcHRpb25hbCByZWZlcmVuY2UgdG8gdGhlIGNoYW5nZSBkZXRlY3RvciwgdGhhdCBzaG91bGQgYmUgbWFya2VkIGZvciBjaGVjayB3aGVuIGFjdGl2ZSBmcmFnbWVudCBjaGFuZ2VzLlxuXHQgKiBJZiBpdCBpcyBub3QgcHJvdmlkZWQsIHRoZSBzZXJ2aWNlIHdpbGwgdHJ5IHRvIGdldCBpdCBmcm9tIHRoZSBESS4gRXguIHdoZW4gdXNpbmcgdGhlIGBuZ2JTY3JvbGxTcHlgIGRpcmVjdGl2ZSxcblx0ICogaXQgd2lsbCBtYXJrIGZvciBjaGVjayB0aGUgZGlyZWN0aXZlJ3MgaG9zdCBjb21wb25lbnQuXG5cdCAqXG5cdCAqIGAubWFya0ZvckNoZWNrKClgIHdpbGwgYmUgY2FsbGVkIG9uIHRoZSBjaGFuZ2UgZGV0ZWN0b3Igd2hlbiB0aGUgYWN0aXZlIGZyYWdtZW50IGNoYW5nZXMuXG5cdCAqL1xuXHRjaGFuZ2VEZXRlY3RvclJlZj86IENoYW5nZURldGVjdG9yUmVmO1xuXG5cdC8qKlxuXHQgKiBBbiBvcHRpb25hbCBpbml0aWFsIGZyYWdtZW50IHRvIHNjcm9sbCB0byB3aGVuIHRoZSBzZXJ2aWNlIHN0YXJ0cy5cblx0ICovXG5cdGluaXRpYWxGcmFnbWVudD86IHN0cmluZyB8IEhUTUxFbGVtZW50O1xuXG5cdC8qKlxuXHQgKiBBbiBvcHRpb25hbCBsaXN0IG9mIGZyYWdtZW50cyB0byBvYnNlcnZlIHdoZW4gdGhlIHNlcnZpY2Ugc3RhcnRzLlxuXHQgKiBZb3UgY2FuIGFsdGVybmF0aXZlbHkgdXNlIGAuYWRkRnJhZ21lbnQoKWAgdG8gYWRkIGZyYWdtZW50cy5cblx0ICovXG5cdGZyYWdtZW50cz86IChzdHJpbmcgfCBIVE1MRWxlbWVudClbXTtcblxuXHQvKipcblx0ICogQW4gb3B0aW9uYWwgZnVuY3Rpb24gdGhhdCBpcyBjYWxsZWQgd2hlbiB0aGUgYEludGVyc2VjdGlvbk9ic2VydmVyYCBkZXRlY3RzIGEgY2hhbmdlLlxuXHQgKiBJdCBpcyB1c2VkIHRvIGRldGVybWluZSBpZiBjdXJyZW50bHkgYWN0aXZlIGZyYWdtZW50IHNob3VsZCBiZSBjaGFuZ2VkLlxuXHQgKlxuXHQgKiBZb3UgY2FuIG92ZXJyaWRlIHRoaXMgZnVuY3Rpb24gdG8gcHJvdmlkZSB5b3VyIG93biBzY3JvbGxzcHkgbG9naWMuXG5cdCAqIEl0IHByb3ZpZGVzOlxuXHQgKiAgLSBhIHNjcm9sbHNweSBgc3RhdGVgIChvYnNlcnZlciBlbnRyaWVzLCByb290IGVsZW1lbnQsIGZyYWdtZW50cywgc2Nyb2xsU3B5IGluc3RhbmNlLCBldGMuKVxuXHQgKiAgLSBhIGBjaGFuZ2VBY3RpdmVgIGZ1bmN0aW9uIHRoYXQgc2hvdWxkIGJlIGNhbGxlZCB3aXRoIHRoZSBuZXcgYWN0aXZlIGZyYWdtZW50XG5cdCAqICAtIGEgYGNvbnRleHRgIHRoYXQgaXMgcGVyc2lzdGVkIGJldHdlZW4gY2FsbHNcblx0ICovXG5cdHByb2Nlc3NDaGFuZ2VzPzogTmdiU2Nyb2xsU3B5UHJvY2Vzc0NoYW5nZXM7XG5cblx0LyoqXG5cdCAqIEFuIG9wdGlvbmFsIGBJbnRlcnNlY3Rpb25PYnNlcnZlcmAgcm9vdCBlbGVtZW50LiBJZiBub3QgcHJvdmlkZWQsIHRoZSBkb2N1bWVudCBlbGVtZW50IHdpbGwgYmUgdXNlZC5cblx0ICovXG5cdHJvb3Q/OiBIVE1MRWxlbWVudDtcblxuXHQvKipcblx0ICogQW4gb3B0aW9uYWwgYEludGVyc2VjdGlvbk9ic2VydmVyYCBtYXJnaW4gZm9yIHRoZSByb290IGVsZW1lbnQuXG5cdCAqL1xuXHRyb290TWFyZ2luPzogc3RyaW5nO1xuXG5cdC8qKlxuXHQgKiBBbiBvcHRpb25hbCBkZWZhdWx0IHNjcm9sbCBiZWhhdmlvciB0byB1c2Ugd2hlbiB1c2luZyB0aGUgYC5zY3JvbGxUbygpYCBtZXRob2QuXG5cdCAqL1xuXHRzY3JvbGxCZWhhdmlvcj86ICdhdXRvJyB8ICdzbW9vdGgnO1xuXG5cdC8qKlxuXHQgKiBBbiBvcHRpb25hbCBgSW50ZXJzZWN0aW9uT2JzZXJ2ZXJgIHRocmVzaG9sZC5cblx0ICovXG5cdHRocmVzaG9sZD86IG51bWJlciB8IG51bWJlcltdO1xufVxuXG4vKipcbiAqIFNjcm9sbCBvcHRpb25zIHBhc3NlZCB0byB0aGUgYC5zY3JvbGxUbygpYCBtZXRob2QuXG4gKiBBbiBleHRlbnNpb24gb2YgdGhlIHN0YW5kYXJkIGBTY3JvbGxPcHRpb25zYCBpbnRlcmZhY2UuXG4gKlxuICogQHNpbmNlIDE1LjEuMFxuICovXG5leHBvcnQgaW50ZXJmYWNlIE5nYlNjcm9sbFRvT3B0aW9ucyBleHRlbmRzIFNjcm9sbE9wdGlvbnMge1xuXHQvKipcblx0ICogU2Nyb2xsIGJlaGF2aW9yIGFzIGRlZmluZWQgaW4gdGhlIGBTY3JvbGxPcHRpb25zYCBpbnRlcmZhY2UuXG5cdCAqL1xuXHRiZWhhdmlvcj86ICdhdXRvJyB8ICdzbW9vdGgnO1xufVxuXG4vKipcbiAqIEEgc2Nyb2xsc3B5IHNlcnZpY2UgdGhhdCBhbGxvd3MgdHJhY2tpbmcgb2YgZWxlbWVudHMgc2Nyb2xsaW5nIGluIGFuZCBvdXQgb2Ygdmlldy5cbiAqXG4gKiBJdCBjYW4gYmUgaW5zdGFudGlhdGVkIG1hbnVhbGx5LCBvciBhdXRvbWF0aWNhbGx5IGJ5IHRoZSBgbmdiU2Nyb2xsU3B5YCBkaXJlY3RpdmUuXG4gKlxuICogQHNpbmNlIDE1LjEuMFxuICovXG5ASW5qZWN0YWJsZSh7XG5cdHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgTmdiU2Nyb2xsU3B5U2VydmljZSBpbXBsZW1lbnRzIE5nYlNjcm9sbFNweVJlZiwgT25EZXN0cm95IHtcblx0cHJpdmF0ZSBfb2JzZXJ2ZXI6IEludGVyc2VjdGlvbk9ic2VydmVyIHwgbnVsbCA9IG51bGw7XG5cblx0cHJpdmF0ZSBfY29udGFpbmVyRWxlbWVudDogSFRNTEVsZW1lbnQgfCBudWxsID0gbnVsbDtcblx0cHJpdmF0ZSBfZnJhZ21lbnRzID0gbmV3IFNldDxFbGVtZW50PigpO1xuXHRwcml2YXRlIF9wcmVSZWdpc3RlcmVkRnJhZ21lbnRzID0gbmV3IFNldDxzdHJpbmcgfCBIVE1MRWxlbWVudD4oKTtcblxuXHRwcml2YXRlIF9hY3RpdmUkID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xuXHRwcml2YXRlIF9kaXN0aW5jdEFjdGl2ZSQgPSB0aGlzLl9hY3RpdmUkLnBpcGUoZGlzdGluY3RVbnRpbENoYW5nZWQoKSk7XG5cdHByaXZhdGUgX2FjdGl2ZSA9ICcnO1xuXG5cdHByaXZhdGUgX2NvbmZpZyA9IGluamVjdChOZ2JTY3JvbGxTcHlDb25maWcpO1xuXHRwcml2YXRlIF9kb2N1bWVudCA9IGluamVjdChET0NVTUVOVCk7XG5cdHByaXZhdGUgX3BsYXRmb3JtSWQgPSBpbmplY3QoUExBVEZPUk1fSUQpO1xuXHRwcml2YXRlIF9zY3JvbGxCZWhhdmlvciA9IHRoaXMuX2NvbmZpZy5zY3JvbGxCZWhhdmlvcjtcblx0cHJpdmF0ZSBfZGlDaGFuZ2VEZXRlY3RvclJlZiA9IGluamVjdChDaGFuZ2VEZXRlY3RvclJlZiwgeyBvcHRpb25hbDogdHJ1ZSB9KTtcblx0cHJpdmF0ZSBfY2hhbmdlRGV0ZWN0b3JSZWYgPSB0aGlzLl9kaUNoYW5nZURldGVjdG9yUmVmO1xuXHRwcml2YXRlIF96b25lID0gaW5qZWN0KE5nWm9uZSk7XG5cblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0dGhpcy5fZGlzdGluY3RBY3RpdmUkLnBpcGUodGFrZVVudGlsRGVzdHJveWVkKCkpLnN1YnNjcmliZSgoYWN0aXZlKSA9PiB7XG5cdFx0XHR0aGlzLl9hY3RpdmUgPSBhY3RpdmU7XG5cdFx0XHR0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZj8ubWFya0ZvckNoZWNrKCk7XG5cdFx0fSk7XG5cdH1cblxuXHQvKipcblx0ICogR2V0dGVyIGZvciB0aGUgY3VycmVudGx5IGFjdGl2ZSBmcmFnbWVudCBpZC4gUmV0dXJucyBlbXB0eSBzdHJpbmcgaWYgbm9uZS5cblx0ICovXG5cdGdldCBhY3RpdmUoKTogc3RyaW5nIHtcblx0XHRyZXR1cm4gdGhpcy5fYWN0aXZlO1xuXHR9XG5cblx0LyoqXG5cdCAqIEFuIG9ic2VydmFibGUgZW1pdHRpbmcgdGhlIGN1cnJlbnRseSBhY3RpdmUgZnJhZ21lbnQuIEVtaXRzIGVtcHR5IHN0cmluZyBpZiBub25lLlxuXHQgKi9cblx0Z2V0IGFjdGl2ZSQoKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcblx0XHRyZXR1cm4gdGhpcy5fZGlzdGluY3RBY3RpdmUkO1xuXHR9XG5cblx0LyoqXG5cdCAqIFN0YXJ0cyB0aGUgc2Nyb2xsc3B5IHNlcnZpY2UgYW5kIG9ic2VydmVzIHNwZWNpZmllZCBmcmFnbWVudHMuXG5cdCAqXG5cdCAqIFlvdSBjYW4gc3BlY2lmeSBhIGxpc3Qgb2Ygb3B0aW9ucyB0byBwYXNzLCBsaWtlIHRoZSByb290IGVsZW1lbnQsIGluaXRpYWwgZnJhZ21lbnQsIHNjcm9sbCBiZWhhdmlvciwgZXRjLlxuXHQgKiBTZWUgdGhlIFtgTmdiU2Nyb2xsU3B5T3B0aW9uc2BdKCMvY29tcG9uZW50cy9zY3JvbGxzcHkvYXBpI05nYlNjcm9sbFNweU9wdGlvbnMpIGludGVyZmFjZSBmb3IgbW9yZSBkZXRhaWxzLlxuXHQgKi9cblx0c3RhcnQob3B0aW9ucz86IE5nYlNjcm9sbFNweU9wdGlvbnMpIHtcblx0XHRpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5fcGxhdGZvcm1JZCkpIHtcblx0XHRcdHRoaXMuX2NsZWFudXAoKTtcblxuXHRcdFx0Y29uc3QgeyByb290LCByb290TWFyZ2luLCBzY3JvbGxCZWhhdmlvciwgdGhyZXNob2xkLCBmcmFnbWVudHMsIGNoYW5nZURldGVjdG9yUmVmLCBwcm9jZXNzQ2hhbmdlcyB9ID0ge1xuXHRcdFx0XHQuLi5vcHRpb25zLFxuXHRcdFx0fTtcblx0XHRcdHRoaXMuX2NvbnRhaW5lckVsZW1lbnQgPSByb290ID8/IHRoaXMuX2RvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcblx0XHRcdHRoaXMuX2NoYW5nZURldGVjdG9yUmVmID0gY2hhbmdlRGV0ZWN0b3JSZWYgPz8gdGhpcy5fZGlDaGFuZ2VEZXRlY3RvclJlZjtcblx0XHRcdHRoaXMuX3Njcm9sbEJlaGF2aW9yID0gc2Nyb2xsQmVoYXZpb3IgPz8gdGhpcy5fY29uZmlnLnNjcm9sbEJlaGF2aW9yO1xuXHRcdFx0Y29uc3QgcHJvY2Vzc0NoYW5nZXNGbiA9IHByb2Nlc3NDaGFuZ2VzID8/IHRoaXMuX2NvbmZpZy5wcm9jZXNzQ2hhbmdlcztcblxuXHRcdFx0Y29uc3QgY29udGV4dCA9IHt9O1xuXHRcdFx0dGhpcy5fb2JzZXJ2ZXIgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoXG5cdFx0XHRcdChlbnRyaWVzKSA9PlxuXHRcdFx0XHRcdHByb2Nlc3NDaGFuZ2VzRm4oXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdGVudHJpZXMsXG5cdFx0XHRcdFx0XHRcdHJvb3RFbGVtZW50OiB0aGlzLl9jb250YWluZXJFbGVtZW50ISxcblx0XHRcdFx0XHRcdFx0ZnJhZ21lbnRzOiB0aGlzLl9mcmFnbWVudHMsXG5cdFx0XHRcdFx0XHRcdHNjcm9sbFNweTogdGhpcyxcblx0XHRcdFx0XHRcdFx0b3B0aW9uczogeyAuLi5vcHRpb25zIH0sXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0KGFjdGl2ZTogc3RyaW5nKSA9PiB0aGlzLl9hY3RpdmUkLm5leHQoYWN0aXZlKSxcblx0XHRcdFx0XHRcdGNvbnRleHQsXG5cdFx0XHRcdFx0KSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHJvb3Q6IHJvb3QgPz8gdGhpcy5fZG9jdW1lbnQsXG5cdFx0XHRcdFx0Li4uKHJvb3RNYXJnaW4gJiYgeyByb290TWFyZ2luIH0pLFxuXHRcdFx0XHRcdC4uLih0aHJlc2hvbGQgJiYgeyB0aHJlc2hvbGQgfSksXG5cdFx0XHRcdH0sXG5cdFx0XHQpO1xuXG5cdFx0XHQvLyBtZXJnaW5nIGZyYWdtZW50cyBhZGRlZCBiZWZvcmUgc3RhcnRpbmcgYW5kIHRoZSBvbmVzIHBhc3NlZCBhcyBvcHRpb25zXG5cdFx0XHRmb3IgKGNvbnN0IGVsZW1lbnQgb2YgWy4uLnRoaXMuX3ByZVJlZ2lzdGVyZWRGcmFnbWVudHMsIC4uLihmcmFnbWVudHMgPz8gW10pXSkge1xuXHRcdFx0XHR0aGlzLm9ic2VydmUoZWxlbWVudCk7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuX3ByZVJlZ2lzdGVyZWRGcmFnbWVudHMuY2xlYXIoKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogU3RvcHMgdGhlIHNlcnZpY2UgYW5kIHVub2JzZXJ2ZXMgYWxsIGZyYWdtZW50cy5cblx0ICovXG5cdHN0b3AoKSB7XG5cdFx0dGhpcy5fY2xlYW51cCgpO1xuXHRcdHRoaXMuX2FjdGl2ZSQubmV4dCgnJyk7XG5cdH1cblxuXHQvKipcblx0ICogU2Nyb2xscyB0byBhIGZyYWdtZW50LCBpdCBtdXN0IGJlIGtub3duIHRvIHRoZSBzZXJ2aWNlIGFuZCBjb250YWluZWQgaW4gdGhlIHJvb3QgZWxlbWVudC5cblx0ICogQW4gaWQgb3IgYW4gZWxlbWVudCByZWZlcmVuY2UgY2FuIGJlIHBhc3NlZC5cblx0ICpcblx0ICogW2BOZ2JTY3JvbGxUb09wdGlvbnNgXSgjL2NvbXBvbmVudHMvc2Nyb2xsc3B5L2FwaSNOZ2JTY3JvbGxUb09wdGlvbnMpIGNhbiBiZSBwYXNzZWQuXG5cdCAqL1xuXHRzY3JvbGxUbyhmcmFnbWVudDogc3RyaW5nIHwgSFRNTEVsZW1lbnQsIG9wdGlvbnM/OiBOZ2JTY3JvbGxUb09wdGlvbnMpIHtcblx0XHRjb25zdCB7IGJlaGF2aW9yIH0gPSB7IGJlaGF2aW9yOiB0aGlzLl9zY3JvbGxCZWhhdmlvciwgLi4ub3B0aW9ucyB9O1xuXG5cdFx0aWYgKHRoaXMuX2NvbnRhaW5lckVsZW1lbnQpIHtcblx0XHRcdGNvbnN0IGZyYWdtZW50RWxlbWVudCA9IHRvRnJhZ21lbnRFbGVtZW50KHRoaXMuX2NvbnRhaW5lckVsZW1lbnQsIGZyYWdtZW50KTtcblxuXHRcdFx0aWYgKGZyYWdtZW50RWxlbWVudCkge1xuXHRcdFx0XHRjb25zdCBoZWlnaHRQeCA9IGZyYWdtZW50RWxlbWVudC5vZmZzZXRUb3AgLSB0aGlzLl9jb250YWluZXJFbGVtZW50Lm9mZnNldFRvcDtcblxuXHRcdFx0XHR0aGlzLl9jb250YWluZXJFbGVtZW50LnNjcm9sbFRvKHsgdG9wOiBoZWlnaHRQeCwgYmVoYXZpb3IgfSk7XG5cblx0XHRcdFx0bGV0IGxhc3RPZmZzZXQgPSB0aGlzLl9jb250YWluZXJFbGVtZW50LnNjcm9sbFRvcDtcblx0XHRcdFx0bGV0IG1hdGNoQ291bnRlciA9IDA7XG5cblx0XHRcdFx0Ly8gd2Ugc2hvdWxkIHVwZGF0ZSB0aGUgYWN0aXZlIHNlY3Rpb24gb25seSBhZnRlciBzY3JvbGxpbmcgaXMgZmluaXNoZWRcblx0XHRcdFx0Ly8gYW5kIHRoZXJlIGlzIG5vIGNsZWFuIHdheSB0byBkbyBpdCBhdCB0aGUgbW9tZW50XG5cdFx0XHRcdGNvbnN0IGNvbnRhaW5lckVsZW1lbnQgPSB0aGlzLl9jb250YWluZXJFbGVtZW50O1xuXHRcdFx0XHR0aGlzLl96b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcblx0XHRcdFx0XHRjb25zdCB1cGRhdGVBY3RpdmVXaGVuU2Nyb2xsaW5nSXNGaW5pc2hlZCA9ICgpID0+IHtcblx0XHRcdFx0XHRcdGNvbnN0IHNhbWVPZmZzZXRBc0xhc3RUaW1lID0gbGFzdE9mZnNldCA9PT0gY29udGFpbmVyRWxlbWVudC5zY3JvbGxUb3A7XG5cblx0XHRcdFx0XHRcdGlmIChzYW1lT2Zmc2V0QXNMYXN0VGltZSkge1xuXHRcdFx0XHRcdFx0XHRtYXRjaENvdW50ZXIrKztcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdG1hdGNoQ291bnRlciA9IDA7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdGlmICghc2FtZU9mZnNldEFzTGFzdFRpbWUgfHwgKHNhbWVPZmZzZXRBc0xhc3RUaW1lICYmIG1hdGNoQ291bnRlciA8IE1BVENIX1RIUkVTSE9MRCkpIHtcblx0XHRcdFx0XHRcdFx0bGFzdE9mZnNldCA9IGNvbnRhaW5lckVsZW1lbnQuc2Nyb2xsVG9wO1xuXG5cdFx0XHRcdFx0XHRcdHJlcXVlc3RBbmltYXRpb25GcmFtZSh1cGRhdGVBY3RpdmVXaGVuU2Nyb2xsaW5nSXNGaW5pc2hlZCk7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHR0aGlzLl96b25lLnJ1bigoKSA9PiB0aGlzLl9hY3RpdmUkLm5leHQoZnJhZ21lbnRFbGVtZW50LmlkKSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRyZXF1ZXN0QW5pbWF0aW9uRnJhbWUodXBkYXRlQWN0aXZlV2hlblNjcm9sbGluZ0lzRmluaXNoZWQpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogQWRkcyBhIGZyYWdtZW50IHRvIG9ic2VydmUuIEl0IG11c3QgYmUgY29udGFpbmVkIGluIHRoZSByb290IGVsZW1lbnQuXG5cdCAqIEFuIGlkIG9yIGFuIGVsZW1lbnQgcmVmZXJlbmNlIGNhbiBiZSBwYXNzZWQuXG5cdCAqL1xuXHRvYnNlcnZlKGZyYWdtZW50OiBzdHJpbmcgfCBIVE1MRWxlbWVudCkge1xuXHRcdGlmICghdGhpcy5fb2JzZXJ2ZXIpIHtcblx0XHRcdHRoaXMuX3ByZVJlZ2lzdGVyZWRGcmFnbWVudHMuYWRkKGZyYWdtZW50KTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRjb25zdCBmcmFnbWVudEVsZW1lbnQgPSB0b0ZyYWdtZW50RWxlbWVudCh0aGlzLl9jb250YWluZXJFbGVtZW50LCBmcmFnbWVudCk7XG5cblx0XHRpZiAoZnJhZ21lbnRFbGVtZW50ICYmICF0aGlzLl9mcmFnbWVudHMuaGFzKGZyYWdtZW50RWxlbWVudCkpIHtcblx0XHRcdHRoaXMuX2ZyYWdtZW50cy5hZGQoZnJhZ21lbnRFbGVtZW50KTtcblx0XHRcdHRoaXMuX29ic2VydmVyLm9ic2VydmUoZnJhZ21lbnRFbGVtZW50KTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogVW5vYnNlcnZlcyBhIGZyYWdtZW50LlxuXHQgKiBBbiBpZCBvciBhbiBlbGVtZW50IHJlZmVyZW5jZSBjYW4gYmUgcGFzc2VkLlxuXHQgKi9cblx0dW5vYnNlcnZlKGZyYWdtZW50OiBzdHJpbmcgfCBIVE1MRWxlbWVudCkge1xuXHRcdGlmICghdGhpcy5fb2JzZXJ2ZXIpIHtcblx0XHRcdHRoaXMuX3ByZVJlZ2lzdGVyZWRGcmFnbWVudHMuZGVsZXRlKGZyYWdtZW50KTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRjb25zdCBmcmFnbWVudEVsZW1lbnQgPSB0b0ZyYWdtZW50RWxlbWVudCh0aGlzLl9jb250YWluZXJFbGVtZW50LCBmcmFnbWVudCk7XG5cblx0XHRpZiAoZnJhZ21lbnRFbGVtZW50KSB7XG5cdFx0XHR0aGlzLl9mcmFnbWVudHMuZGVsZXRlKGZyYWdtZW50RWxlbWVudCk7XG5cblx0XHRcdC8vIHdlJ3JlIHJlbW92aW5nIGFuZCByZS1hZGRpbmcgYWxsIGN1cnJlbnQgZnJhZ21lbnRzIHRvIHJlY29tcHV0ZSBhY3RpdmUgb25lXG5cdFx0XHR0aGlzLl9vYnNlcnZlci5kaXNjb25uZWN0KCk7XG5cblx0XHRcdGZvciAoY29uc3QgZnJhZ21lbnQgb2YgdGhpcy5fZnJhZ21lbnRzKSB7XG5cdFx0XHRcdHRoaXMuX29ic2VydmVyLm9ic2VydmUoZnJhZ21lbnQpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdG5nT25EZXN0cm95KCkge1xuXHRcdHRoaXMuX2NsZWFudXAoKTtcblx0fVxuXG5cdHByaXZhdGUgX2NsZWFudXAoKSB7XG5cdFx0dGhpcy5fZnJhZ21lbnRzLmNsZWFyKCk7XG5cdFx0dGhpcy5fb2JzZXJ2ZXI/LmRpc2Nvbm5lY3QoKTtcblx0XHR0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZiA9IHRoaXMuX2RpQ2hhbmdlRGV0ZWN0b3JSZWY7XG5cdFx0dGhpcy5fc2Nyb2xsQmVoYXZpb3IgPSB0aGlzLl9jb25maWcuc2Nyb2xsQmVoYXZpb3I7XG5cdFx0dGhpcy5fb2JzZXJ2ZXIgPSBudWxsO1xuXHRcdHRoaXMuX2NvbnRhaW5lckVsZW1lbnQgPSBudWxsO1xuXHR9XG59XG4iXX0=