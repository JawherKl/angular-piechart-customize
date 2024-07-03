import { ChangeDetectionStrategy, Component, ContentChildren, Directive, EventEmitter, Inject, Input, Output, PLATFORM_ID, ViewEncapsulation, } from '@angular/core';
import { isPlatformBrowser, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { BehaviorSubject, combineLatest, NEVER, Subject, timer, zip } from 'rxjs';
import { distinctUntilChanged, map, startWith, switchMap, take, takeUntil } from 'rxjs/operators';
import { ngbCompleteTransition, ngbRunTransition } from '../util/transition/ngbTransition';
import { ngbCarouselTransitionIn, ngbCarouselTransitionOut, NgbSlideEventDirection, } from './carousel-transition';
import * as i0 from "@angular/core";
import * as i1 from "./carousel-config";
let nextId = 0;
/**
 * A directive that wraps the individual carousel slide.
 */
class NgbSlide {
    constructor(tplRef) {
        this.tplRef = tplRef;
        /**
         * Slide id that must be unique for the entire document.
         *
         * If not provided, will be generated in the `ngb-slide-xx` format.
         */
        this.id = `ngb-slide-${nextId++}`;
        /**
         * An event emitted when the slide transition is finished
         *
         * @since 8.0.0
         */
        this.slid = new EventEmitter();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbSlide, deps: [{ token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.0.6", type: NgbSlide, isStandalone: true, selector: "ng-template[ngbSlide]", inputs: { id: "id" }, outputs: { slid: "slid" }, ngImport: i0 }); }
}
export { NgbSlide };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbSlide, decorators: [{
            type: Directive,
            args: [{ selector: 'ng-template[ngbSlide]', standalone: true }]
        }], ctorParameters: function () { return [{ type: i0.TemplateRef }]; }, propDecorators: { id: [{
                type: Input
            }], slid: [{
                type: Output
            }] } });
/**
 * Carousel is a component to easily create and control slideshows.
 *
 * Allows to set intervals, change the way user interacts with the slides and provides a programmatic API.
 */
class NgbCarousel {
    /**
     * Time in milliseconds before the next slide is shown.
     */
    set interval(value) {
        this._interval$.next(value);
    }
    get interval() {
        return this._interval$.value;
    }
    /**
     * If `true`, will 'wrap' the carousel by switching from the last slide back to the first.
     */
    set wrap(value) {
        this._wrap$.next(value);
    }
    get wrap() {
        return this._wrap$.value;
    }
    /**
     * If `true`, will pause slide switching when mouse cursor hovers the slide.
     *
     * @since 2.2.0
     */
    set pauseOnHover(value) {
        this._pauseOnHover$.next(value);
    }
    get pauseOnHover() {
        return this._pauseOnHover$.value;
    }
    /**
     * If `true`, will pause slide switching when the focus is inside the carousel.
     */
    set pauseOnFocus(value) {
        this._pauseOnFocus$.next(value);
    }
    get pauseOnFocus() {
        return this._pauseOnFocus$.value;
    }
    set mouseHover(value) {
        this._mouseHover$.next(value);
    }
    get mouseHover() {
        return this._mouseHover$.value;
    }
    set focused(value) {
        this._focused$.next(value);
    }
    get focused() {
        return this._focused$.value;
    }
    constructor(config, _platformId, _ngZone, _cd, _container) {
        this._platformId = _platformId;
        this._ngZone = _ngZone;
        this._cd = _cd;
        this._container = _container;
        this.NgbSlideEventSource = NgbSlideEventSource;
        this._destroy$ = new Subject();
        this._interval$ = new BehaviorSubject(0);
        this._mouseHover$ = new BehaviorSubject(false);
        this._focused$ = new BehaviorSubject(false);
        this._pauseOnHover$ = new BehaviorSubject(false);
        this._pauseOnFocus$ = new BehaviorSubject(false);
        this._pause$ = new BehaviorSubject(false);
        this._wrap$ = new BehaviorSubject(false);
        /**
         * An event emitted just before the slide transition starts.
         *
         * See [`NgbSlideEvent`](#/components/carousel/api#NgbSlideEvent) for payload details.
         */
        this.slide = new EventEmitter();
        /**
         * An event emitted right after the slide transition is completed.
         *
         * See [`NgbSlideEvent`](#/components/carousel/api#NgbSlideEvent) for payload details.
         *
         * @since 8.0.0
         */
        this.slid = new EventEmitter();
        /*
         * Keep the ids of the panels currently transitionning
         * in order to allow only the transition revertion
         */
        this._transitionIds = null;
        this.animation = config.animation;
        this.interval = config.interval;
        this.wrap = config.wrap;
        this.keyboard = config.keyboard;
        this.pauseOnHover = config.pauseOnHover;
        this.pauseOnFocus = config.pauseOnFocus;
        this.showNavigationArrows = config.showNavigationArrows;
        this.showNavigationIndicators = config.showNavigationIndicators;
    }
    arrowLeft() {
        this.focus();
        this.prev(NgbSlideEventSource.ARROW_LEFT);
    }
    arrowRight() {
        this.focus();
        this.next(NgbSlideEventSource.ARROW_RIGHT);
    }
    ngAfterContentInit() {
        // setInterval() doesn't play well with SSR and protractor,
        // so we should run it in the browser and outside Angular
        if (isPlatformBrowser(this._platformId)) {
            this._ngZone.runOutsideAngular(() => {
                const hasNextSlide$ = combineLatest([
                    this.slide.pipe(map((slideEvent) => slideEvent.current), startWith(this.activeId)),
                    this._wrap$,
                    this.slides.changes.pipe(startWith(null)),
                ]).pipe(map(([currentSlideId, wrap]) => {
                    const slideArr = this.slides.toArray();
                    const currentSlideIdx = this._getSlideIdxById(currentSlideId);
                    return wrap ? slideArr.length > 1 : currentSlideIdx < slideArr.length - 1;
                }), distinctUntilChanged());
                combineLatest([
                    this._pause$,
                    this._pauseOnHover$,
                    this._mouseHover$,
                    this._pauseOnFocus$,
                    this._focused$,
                    this._interval$,
                    hasNextSlide$,
                ])
                    .pipe(map(([pause, pauseOnHover, mouseHover, pauseOnFocus, focused, interval, hasNextSlide]) => pause || (pauseOnHover && mouseHover) || (pauseOnFocus && focused) || !hasNextSlide ? 0 : interval), distinctUntilChanged(), switchMap((interval) => (interval > 0 ? timer(interval, interval) : NEVER)), takeUntil(this._destroy$))
                    .subscribe(() => this._ngZone.run(() => this.next(NgbSlideEventSource.TIMER)));
            });
        }
        this.slides.changes.pipe(takeUntil(this._destroy$)).subscribe(() => {
            this._transitionIds?.forEach((id) => ngbCompleteTransition(this._getSlideElement(id)));
            this._transitionIds = null;
            this._cd.markForCheck();
            // The following code need to be done asynchronously, after the dom becomes stable,
            // otherwise all changes will be undone.
            this._ngZone.onStable.pipe(take(1)).subscribe(() => {
                for (const { id } of this.slides) {
                    const element = this._getSlideElement(id);
                    if (id === this.activeId) {
                        element.classList.add('active');
                    }
                    else {
                        element.classList.remove('active');
                    }
                }
            });
        });
    }
    ngAfterContentChecked() {
        let activeSlide = this._getSlideById(this.activeId);
        this.activeId = activeSlide ? activeSlide.id : this.slides.length ? this.slides.first.id : '';
    }
    ngAfterViewInit() {
        // Initialize the 'active' class (not managed by the template)
        if (this.activeId) {
            const element = this._getSlideElement(this.activeId);
            if (element) {
                element.classList.add('active');
            }
        }
    }
    ngOnDestroy() {
        this._destroy$.next();
    }
    /**
     * Navigates to a slide with the specified identifier.
     */
    select(slideId, source) {
        this._cycleToSelected(slideId, this._getSlideEventDirection(this.activeId, slideId), source);
    }
    /**
     * Navigates to the previous slide.
     */
    prev(source) {
        this._cycleToSelected(this._getPrevSlide(this.activeId), NgbSlideEventDirection.END, source);
    }
    /**
     * Navigates to the next slide.
     */
    next(source) {
        this._cycleToSelected(this._getNextSlide(this.activeId), NgbSlideEventDirection.START, source);
    }
    /**
     * Pauses cycling through the slides.
     */
    pause() {
        this._pause$.next(true);
    }
    /**
     * Restarts cycling through the slides from start to end.
     */
    cycle() {
        this._pause$.next(false);
    }
    /**
     * Set the focus on the carousel.
     */
    focus() {
        this._container.nativeElement.focus();
    }
    _cycleToSelected(slideIdx, direction, source) {
        const transitionIds = this._transitionIds;
        if (transitionIds && (transitionIds[0] !== slideIdx || transitionIds[1] !== this.activeId)) {
            // Revert prevented
            return;
        }
        let selectedSlide = this._getSlideById(slideIdx);
        if (selectedSlide && selectedSlide.id !== this.activeId) {
            this._transitionIds = [this.activeId, slideIdx];
            this.slide.emit({
                prev: this.activeId,
                current: selectedSlide.id,
                direction: direction,
                paused: this._pause$.value,
                source,
            });
            const options = {
                animation: this.animation,
                runningTransition: 'stop',
                context: { direction },
            };
            const transitions = [];
            const activeSlide = this._getSlideById(this.activeId);
            if (activeSlide) {
                const activeSlideTransition = ngbRunTransition(this._ngZone, this._getSlideElement(activeSlide.id), ngbCarouselTransitionOut, options);
                activeSlideTransition.subscribe(() => {
                    activeSlide.slid.emit({ isShown: false, direction, source });
                });
                transitions.push(activeSlideTransition);
            }
            const previousId = this.activeId;
            this.activeId = selectedSlide.id;
            const nextSlide = this._getSlideById(this.activeId);
            const transition = ngbRunTransition(this._ngZone, this._getSlideElement(selectedSlide.id), ngbCarouselTransitionIn, options);
            transition.subscribe(() => {
                nextSlide?.slid.emit({ isShown: true, direction, source });
            });
            transitions.push(transition);
            zip(...transitions)
                .pipe(take(1))
                .subscribe(() => {
                this._transitionIds = null;
                this.slid.emit({
                    prev: previousId,
                    current: selectedSlide.id,
                    direction: direction,
                    paused: this._pause$.value,
                    source,
                });
            });
        }
        // we get here after the interval fires or any external API call like next(), prev() or select()
        this._cd.markForCheck();
    }
    _getSlideEventDirection(currentActiveSlideId, nextActiveSlideId) {
        const currentActiveSlideIdx = this._getSlideIdxById(currentActiveSlideId);
        const nextActiveSlideIdx = this._getSlideIdxById(nextActiveSlideId);
        return currentActiveSlideIdx > nextActiveSlideIdx ? NgbSlideEventDirection.END : NgbSlideEventDirection.START;
    }
    _getSlideById(slideId) {
        return this.slides.find((slide) => slide.id === slideId) || null;
    }
    _getSlideIdxById(slideId) {
        const slide = this._getSlideById(slideId);
        return slide != null ? this.slides.toArray().indexOf(slide) : -1;
    }
    _getNextSlide(currentSlideId) {
        const slideArr = this.slides.toArray();
        const currentSlideIdx = this._getSlideIdxById(currentSlideId);
        const isLastSlide = currentSlideIdx === slideArr.length - 1;
        return isLastSlide
            ? this.wrap
                ? slideArr[0].id
                : slideArr[slideArr.length - 1].id
            : slideArr[currentSlideIdx + 1].id;
    }
    _getPrevSlide(currentSlideId) {
        const slideArr = this.slides.toArray();
        const currentSlideIdx = this._getSlideIdxById(currentSlideId);
        const isFirstSlide = currentSlideIdx === 0;
        return isFirstSlide
            ? this.wrap
                ? slideArr[slideArr.length - 1].id
                : slideArr[0].id
            : slideArr[currentSlideIdx - 1].id;
    }
    _getSlideElement(slideId) {
        return this._container.nativeElement.querySelector(`#slide-${slideId}`);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbCarousel, deps: [{ token: i1.NgbCarouselConfig }, { token: PLATFORM_ID }, { token: i0.NgZone }, { token: i0.ChangeDetectorRef }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.6", type: NgbCarousel, isStandalone: true, selector: "ngb-carousel", inputs: { animation: "animation", activeId: "activeId", interval: "interval", wrap: "wrap", keyboard: "keyboard", pauseOnHover: "pauseOnHover", pauseOnFocus: "pauseOnFocus", showNavigationArrows: "showNavigationArrows", showNavigationIndicators: "showNavigationIndicators" }, outputs: { slide: "slide", slid: "slid" }, host: { attributes: { "tabIndex": "0" }, listeners: { "keydown.arrowLeft": "keyboard && arrowLeft()", "keydown.arrowRight": "keyboard && arrowRight()", "mouseenter": "mouseHover = true", "mouseleave": "mouseHover = false", "focusin": "focused = true", "focusout": "focused = false" }, properties: { "style.display": "\"block\"", "attr.aria-activedescendant": "'slide-' + activeId" }, classAttribute: "carousel slide" }, queries: [{ propertyName: "slides", predicate: NgbSlide }], exportAs: ["ngbCarousel"], ngImport: i0, template: `
		<div class="carousel-indicators" [class.visually-hidden]="!showNavigationIndicators" role="tablist">
			<button
				type="button"
				data-bs-target
				*ngFor="let slide of slides"
				[class.active]="slide.id === activeId"
				role="tab"
				[attr.aria-labelledby]="'slide-' + slide.id"
				[attr.aria-controls]="'slide-' + slide.id"
				[attr.aria-selected]="slide.id === activeId"
				(click)="focus(); select(slide.id, NgbSlideEventSource.INDICATOR)"
			></button>
		</div>
		<div class="carousel-inner">
			<div
				*ngFor="let slide of slides; index as i; count as c"
				class="carousel-item"
				[id]="'slide-' + slide.id"
				role="tabpanel"
			>
				<span
					class="visually-hidden"
					i18n="Currently selected slide number read by screen reader@@ngb.carousel.slide-number"
				>
					Slide {{ i + 1 }} of {{ c }}
				</span>
				<ng-template [ngTemplateOutlet]="slide.tplRef"></ng-template>
			</div>
		</div>
		<button class="carousel-control-prev" type="button" (click)="arrowLeft()" *ngIf="showNavigationArrows">
			<span class="carousel-control-prev-icon" aria-hidden="true"></span>
			<span class="visually-hidden" i18n="@@ngb.carousel.previous">Previous</span>
		</button>
		<button class="carousel-control-next" type="button" (click)="arrowRight()" *ngIf="showNavigationArrows">
			<span class="carousel-control-next-icon" aria-hidden="true"></span>
			<span class="visually-hidden" i18n="@@ngb.carousel.next">Next</span>
		</button>
	`, isInline: true, dependencies: [{ kind: "directive", type: NgFor, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None }); }
}
export { NgbCarousel };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbCarousel, decorators: [{
            type: Component,
            args: [{
                    selector: 'ngb-carousel',
                    exportAs: 'ngbCarousel',
                    standalone: true,
                    imports: [NgFor, NgTemplateOutlet, NgIf],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    host: {
                        class: 'carousel slide',
                        '[style.display]': '"block"',
                        tabIndex: '0',
                        '(keydown.arrowLeft)': 'keyboard && arrowLeft()',
                        '(keydown.arrowRight)': 'keyboard && arrowRight()',
                        '(mouseenter)': 'mouseHover = true',
                        '(mouseleave)': 'mouseHover = false',
                        '(focusin)': 'focused = true',
                        '(focusout)': 'focused = false',
                        '[attr.aria-activedescendant]': `'slide-' + activeId`,
                    },
                    template: `
		<div class="carousel-indicators" [class.visually-hidden]="!showNavigationIndicators" role="tablist">
			<button
				type="button"
				data-bs-target
				*ngFor="let slide of slides"
				[class.active]="slide.id === activeId"
				role="tab"
				[attr.aria-labelledby]="'slide-' + slide.id"
				[attr.aria-controls]="'slide-' + slide.id"
				[attr.aria-selected]="slide.id === activeId"
				(click)="focus(); select(slide.id, NgbSlideEventSource.INDICATOR)"
			></button>
		</div>
		<div class="carousel-inner">
			<div
				*ngFor="let slide of slides; index as i; count as c"
				class="carousel-item"
				[id]="'slide-' + slide.id"
				role="tabpanel"
			>
				<span
					class="visually-hidden"
					i18n="Currently selected slide number read by screen reader@@ngb.carousel.slide-number"
				>
					Slide {{ i + 1 }} of {{ c }}
				</span>
				<ng-template [ngTemplateOutlet]="slide.tplRef"></ng-template>
			</div>
		</div>
		<button class="carousel-control-prev" type="button" (click)="arrowLeft()" *ngIf="showNavigationArrows">
			<span class="carousel-control-prev-icon" aria-hidden="true"></span>
			<span class="visually-hidden" i18n="@@ngb.carousel.previous">Previous</span>
		</button>
		<button class="carousel-control-next" type="button" (click)="arrowRight()" *ngIf="showNavigationArrows">
			<span class="carousel-control-next-icon" aria-hidden="true"></span>
			<span class="visually-hidden" i18n="@@ngb.carousel.next">Next</span>
		</button>
	`,
                }]
        }], ctorParameters: function () { return [{ type: i1.NgbCarouselConfig }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }, { type: i0.NgZone }, { type: i0.ChangeDetectorRef }, { type: i0.ElementRef }]; }, propDecorators: { slides: [{
                type: ContentChildren,
                args: [NgbSlide]
            }], animation: [{
                type: Input
            }], activeId: [{
                type: Input
            }], interval: [{
                type: Input
            }], wrap: [{
                type: Input
            }], keyboard: [{
                type: Input
            }], pauseOnHover: [{
                type: Input
            }], pauseOnFocus: [{
                type: Input
            }], showNavigationArrows: [{
                type: Input
            }], showNavigationIndicators: [{
                type: Input
            }], slide: [{
                type: Output
            }], slid: [{
                type: Output
            }] } });
export var NgbSlideEventSource;
(function (NgbSlideEventSource) {
    NgbSlideEventSource["TIMER"] = "timer";
    NgbSlideEventSource["ARROW_LEFT"] = "arrowLeft";
    NgbSlideEventSource["ARROW_RIGHT"] = "arrowRight";
    NgbSlideEventSource["INDICATOR"] = "indicator";
})(NgbSlideEventSource || (NgbSlideEventSource = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2Fyb3VzZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY2Fyb3VzZWwvY2Fyb3VzZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUdOLHVCQUF1QixFQUV2QixTQUFTLEVBQ1QsZUFBZSxFQUNmLFNBQVMsRUFFVCxZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFHTCxNQUFNLEVBQ04sV0FBVyxFQUdYLGlCQUFpQixHQUVqQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBSW5GLE9BQU8sRUFBRSxlQUFlLEVBQUUsYUFBYSxFQUFFLEtBQUssRUFBYyxPQUFPLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUM5RixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2xHLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxnQkFBZ0IsRUFBd0IsTUFBTSxrQ0FBa0MsQ0FBQztBQUNqSCxPQUFPLEVBQ04sdUJBQXVCLEVBQ3ZCLHdCQUF3QixFQUN4QixzQkFBc0IsR0FFdEIsTUFBTSx1QkFBdUIsQ0FBQzs7O0FBRS9CLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQztBQUVmOztHQUVHO0FBQ0gsTUFDYSxRQUFRO0lBZXBCLFlBQW1CLE1BQXdCO1FBQXhCLFdBQU0sR0FBTixNQUFNLENBQWtCO1FBZDNDOzs7O1dBSUc7UUFDTSxPQUFFLEdBQUcsYUFBYSxNQUFNLEVBQUUsRUFBRSxDQUFDO1FBRXRDOzs7O1dBSUc7UUFDTyxTQUFJLEdBQUcsSUFBSSxZQUFZLEVBQXVCLENBQUM7SUFFWCxDQUFDOzhHQWZuQyxRQUFRO2tHQUFSLFFBQVE7O1NBQVIs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QWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxJQUFJLEVBQUU7d0JBQ0wsS0FBSyxFQUFFLGdCQUFnQjt3QkFDdkIsaUJBQWlCLEVBQUUsU0FBUzt3QkFDNUIsUUFBUSxFQUFFLEdBQUc7d0JBQ2IscUJBQXFCLEVBQUUseUJBQXlCO3dCQUNoRCxzQkFBc0IsRUFBRSwwQkFBMEI7d0JBQ2xELGNBQWMsRUFBRSxtQkFBbUI7d0JBQ25DLGNBQWMsRUFBRSxvQkFBb0I7d0JBQ3BDLFdBQVcsRUFBRSxnQkFBZ0I7d0JBQzdCLFlBQVksRUFBRSxpQkFBaUI7d0JBQy9CLDhCQUE4QixFQUFFLHFCQUFxQjtxQkFDckQ7b0JBQ0QsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQXNDVDtpQkFDRDs7MEJBMElFLE1BQU07MkJBQUMsV0FBVzswSEF4SU8sTUFBTTtzQkFBaEMsZUFBZTt1QkFBQyxRQUFRO2dCQWtCaEIsU0FBUztzQkFBakIsS0FBSztnQkFPRyxRQUFRO3NCQUFoQixLQUFLO2dCQU1GLFFBQVE7c0JBRFgsS0FBSztnQkFhRixJQUFJO3NCQURQLEtBQUs7Z0JBWUcsUUFBUTtzQkFBaEIsS0FBSztnQkFRRixZQUFZO3NCQURmLEtBQUs7Z0JBYUYsWUFBWTtzQkFEZixLQUFLO2dCQWNHLG9CQUFvQjtzQkFBNUIsS0FBSztnQkFPRyx3QkFBd0I7c0JBQWhDLEtBQUs7Z0JBT0ksS0FBSztzQkFBZCxNQUFNO2dCQVNHLElBQUk7c0JBQWIsTUFBTTs7QUFpWFIsTUFBTSxDQUFOLElBQVksbUJBS1g7QUFMRCxXQUFZLG1CQUFtQjtJQUM5QixzQ0FBZSxDQUFBO0lBQ2YsK0NBQXdCLENBQUE7SUFDeEIsaURBQTBCLENBQUE7SUFDMUIsOENBQXVCLENBQUE7QUFDeEIsQ0FBQyxFQUxXLG1CQUFtQixLQUFuQixtQkFBbUIsUUFLOUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuXHRBZnRlckNvbnRlbnRDaGVja2VkLFxuXHRBZnRlckNvbnRlbnRJbml0LFxuXHRDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcblx0Q2hhbmdlRGV0ZWN0b3JSZWYsXG5cdENvbXBvbmVudCxcblx0Q29udGVudENoaWxkcmVuLFxuXHREaXJlY3RpdmUsXG5cdEVsZW1lbnRSZWYsXG5cdEV2ZW50RW1pdHRlcixcblx0SW5qZWN0LFxuXHRJbnB1dCxcblx0Tmdab25lLFxuXHRPbkRlc3Ryb3ksXG5cdE91dHB1dCxcblx0UExBVEZPUk1fSUQsXG5cdFF1ZXJ5TGlzdCxcblx0VGVtcGxhdGVSZWYsXG5cdFZpZXdFbmNhcHN1bGF0aW9uLFxuXHRBZnRlclZpZXdJbml0LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyLCBOZ0ZvciwgTmdJZiwgTmdUZW1wbGF0ZU91dGxldCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7IE5nYkNhcm91c2VsQ29uZmlnIH0gZnJvbSAnLi9jYXJvdXNlbC1jb25maWcnO1xuXG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIGNvbWJpbmVMYXRlc3QsIE5FVkVSLCBPYnNlcnZhYmxlLCBTdWJqZWN0LCB0aW1lciwgemlwIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkaXN0aW5jdFVudGlsQ2hhbmdlZCwgbWFwLCBzdGFydFdpdGgsIHN3aXRjaE1hcCwgdGFrZSwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgbmdiQ29tcGxldGVUcmFuc2l0aW9uLCBuZ2JSdW5UcmFuc2l0aW9uLCBOZ2JUcmFuc2l0aW9uT3B0aW9ucyB9IGZyb20gJy4uL3V0aWwvdHJhbnNpdGlvbi9uZ2JUcmFuc2l0aW9uJztcbmltcG9ydCB7XG5cdG5nYkNhcm91c2VsVHJhbnNpdGlvbkluLFxuXHRuZ2JDYXJvdXNlbFRyYW5zaXRpb25PdXQsXG5cdE5nYlNsaWRlRXZlbnREaXJlY3Rpb24sXG5cdE5nYkNhcm91c2VsQ3R4LFxufSBmcm9tICcuL2Nhcm91c2VsLXRyYW5zaXRpb24nO1xuXG5sZXQgbmV4dElkID0gMDtcblxuLyoqXG4gKiBBIGRpcmVjdGl2ZSB0aGF0IHdyYXBzIHRoZSBpbmRpdmlkdWFsIGNhcm91c2VsIHNsaWRlLlxuICovXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICduZy10ZW1wbGF0ZVtuZ2JTbGlkZV0nLCBzdGFuZGFsb25lOiB0cnVlIH0pXG5leHBvcnQgY2xhc3MgTmdiU2xpZGUge1xuXHQvKipcblx0ICogU2xpZGUgaWQgdGhhdCBtdXN0IGJlIHVuaXF1ZSBmb3IgdGhlIGVudGlyZSBkb2N1bWVudC5cblx0ICpcblx0ICogSWYgbm90IHByb3ZpZGVkLCB3aWxsIGJlIGdlbmVyYXRlZCBpbiB0aGUgYG5nYi1zbGlkZS14eGAgZm9ybWF0LlxuXHQgKi9cblx0QElucHV0KCkgaWQgPSBgbmdiLXNsaWRlLSR7bmV4dElkKyt9YDtcblxuXHQvKipcblx0ICogQW4gZXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBzbGlkZSB0cmFuc2l0aW9uIGlzIGZpbmlzaGVkXG5cdCAqXG5cdCAqIEBzaW5jZSA4LjAuMFxuXHQgKi9cblx0QE91dHB1dCgpIHNsaWQgPSBuZXcgRXZlbnRFbWl0dGVyPE5nYlNpbmdsZVNsaWRlRXZlbnQ+KCk7XG5cblx0Y29uc3RydWN0b3IocHVibGljIHRwbFJlZjogVGVtcGxhdGVSZWY8YW55Pikge31cbn1cblxuLyoqXG4gKiBDYXJvdXNlbCBpcyBhIGNvbXBvbmVudCB0byBlYXNpbHkgY3JlYXRlIGFuZCBjb250cm9sIHNsaWRlc2hvd3MuXG4gKlxuICogQWxsb3dzIHRvIHNldCBpbnRlcnZhbHMsIGNoYW5nZSB0aGUgd2F5IHVzZXIgaW50ZXJhY3RzIHdpdGggdGhlIHNsaWRlcyBhbmQgcHJvdmlkZXMgYSBwcm9ncmFtbWF0aWMgQVBJLlxuICovXG5AQ29tcG9uZW50KHtcblx0c2VsZWN0b3I6ICduZ2ItY2Fyb3VzZWwnLFxuXHRleHBvcnRBczogJ25nYkNhcm91c2VsJyxcblx0c3RhbmRhbG9uZTogdHJ1ZSxcblx0aW1wb3J0czogW05nRm9yLCBOZ1RlbXBsYXRlT3V0bGV0LCBOZ0lmXSxcblx0Y2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG5cdGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG5cdGhvc3Q6IHtcblx0XHRjbGFzczogJ2Nhcm91c2VsIHNsaWRlJyxcblx0XHQnW3N0eWxlLmRpc3BsYXldJzogJ1wiYmxvY2tcIicsXG5cdFx0dGFiSW5kZXg6ICcwJyxcblx0XHQnKGtleWRvd24uYXJyb3dMZWZ0KSc6ICdrZXlib2FyZCAmJiBhcnJvd0xlZnQoKScsXG5cdFx0JyhrZXlkb3duLmFycm93UmlnaHQpJzogJ2tleWJvYXJkICYmIGFycm93UmlnaHQoKScsXG5cdFx0Jyhtb3VzZWVudGVyKSc6ICdtb3VzZUhvdmVyID0gdHJ1ZScsXG5cdFx0Jyhtb3VzZWxlYXZlKSc6ICdtb3VzZUhvdmVyID0gZmFsc2UnLFxuXHRcdCcoZm9jdXNpbiknOiAnZm9jdXNlZCA9IHRydWUnLFxuXHRcdCcoZm9jdXNvdXQpJzogJ2ZvY3VzZWQgPSBmYWxzZScsXG5cdFx0J1thdHRyLmFyaWEtYWN0aXZlZGVzY2VuZGFudF0nOiBgJ3NsaWRlLScgKyBhY3RpdmVJZGAsXG5cdH0sXG5cdHRlbXBsYXRlOiBgXG5cdFx0PGRpdiBjbGFzcz1cImNhcm91c2VsLWluZGljYXRvcnNcIiBbY2xhc3MudmlzdWFsbHktaGlkZGVuXT1cIiFzaG93TmF2aWdhdGlvbkluZGljYXRvcnNcIiByb2xlPVwidGFibGlzdFwiPlxuXHRcdFx0PGJ1dHRvblxuXHRcdFx0XHR0eXBlPVwiYnV0dG9uXCJcblx0XHRcdFx0ZGF0YS1icy10YXJnZXRcblx0XHRcdFx0Km5nRm9yPVwibGV0IHNsaWRlIG9mIHNsaWRlc1wiXG5cdFx0XHRcdFtjbGFzcy5hY3RpdmVdPVwic2xpZGUuaWQgPT09IGFjdGl2ZUlkXCJcblx0XHRcdFx0cm9sZT1cInRhYlwiXG5cdFx0XHRcdFthdHRyLmFyaWEtbGFiZWxsZWRieV09XCInc2xpZGUtJyArIHNsaWRlLmlkXCJcblx0XHRcdFx0W2F0dHIuYXJpYS1jb250cm9sc109XCInc2xpZGUtJyArIHNsaWRlLmlkXCJcblx0XHRcdFx0W2F0dHIuYXJpYS1zZWxlY3RlZF09XCJzbGlkZS5pZCA9PT0gYWN0aXZlSWRcIlxuXHRcdFx0XHQoY2xpY2spPVwiZm9jdXMoKTsgc2VsZWN0KHNsaWRlLmlkLCBOZ2JTbGlkZUV2ZW50U291cmNlLklORElDQVRPUilcIlxuXHRcdFx0PjwvYnV0dG9uPlxuXHRcdDwvZGl2PlxuXHRcdDxkaXYgY2xhc3M9XCJjYXJvdXNlbC1pbm5lclwiPlxuXHRcdFx0PGRpdlxuXHRcdFx0XHQqbmdGb3I9XCJsZXQgc2xpZGUgb2Ygc2xpZGVzOyBpbmRleCBhcyBpOyBjb3VudCBhcyBjXCJcblx0XHRcdFx0Y2xhc3M9XCJjYXJvdXNlbC1pdGVtXCJcblx0XHRcdFx0W2lkXT1cIidzbGlkZS0nICsgc2xpZGUuaWRcIlxuXHRcdFx0XHRyb2xlPVwidGFicGFuZWxcIlxuXHRcdFx0PlxuXHRcdFx0XHQ8c3BhblxuXHRcdFx0XHRcdGNsYXNzPVwidmlzdWFsbHktaGlkZGVuXCJcblx0XHRcdFx0XHRpMThuPVwiQ3VycmVudGx5IHNlbGVjdGVkIHNsaWRlIG51bWJlciByZWFkIGJ5IHNjcmVlbiByZWFkZXJAQG5nYi5jYXJvdXNlbC5zbGlkZS1udW1iZXJcIlxuXHRcdFx0XHQ+XG5cdFx0XHRcdFx0U2xpZGUge3sgaSArIDEgfX0gb2Yge3sgYyB9fVxuXHRcdFx0XHQ8L3NwYW4+XG5cdFx0XHRcdDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJzbGlkZS50cGxSZWZcIj48L25nLXRlbXBsYXRlPlxuXHRcdFx0PC9kaXY+XG5cdFx0PC9kaXY+XG5cdFx0PGJ1dHRvbiBjbGFzcz1cImNhcm91c2VsLWNvbnRyb2wtcHJldlwiIHR5cGU9XCJidXR0b25cIiAoY2xpY2spPVwiYXJyb3dMZWZ0KClcIiAqbmdJZj1cInNob3dOYXZpZ2F0aW9uQXJyb3dzXCI+XG5cdFx0XHQ8c3BhbiBjbGFzcz1cImNhcm91c2VsLWNvbnRyb2wtcHJldi1pY29uXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9zcGFuPlxuXHRcdFx0PHNwYW4gY2xhc3M9XCJ2aXN1YWxseS1oaWRkZW5cIiBpMThuPVwiQEBuZ2IuY2Fyb3VzZWwucHJldmlvdXNcIj5QcmV2aW91czwvc3Bhbj5cblx0XHQ8L2J1dHRvbj5cblx0XHQ8YnV0dG9uIGNsYXNzPVwiY2Fyb3VzZWwtY29udHJvbC1uZXh0XCIgdHlwZT1cImJ1dHRvblwiIChjbGljayk9XCJhcnJvd1JpZ2h0KClcIiAqbmdJZj1cInNob3dOYXZpZ2F0aW9uQXJyb3dzXCI+XG5cdFx0XHQ8c3BhbiBjbGFzcz1cImNhcm91c2VsLWNvbnRyb2wtbmV4dC1pY29uXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9zcGFuPlxuXHRcdFx0PHNwYW4gY2xhc3M9XCJ2aXN1YWxseS1oaWRkZW5cIiBpMThuPVwiQEBuZ2IuY2Fyb3VzZWwubmV4dFwiPk5leHQ8L3NwYW4+XG5cdFx0PC9idXR0b24+XG5cdGAsXG59KVxuZXhwb3J0IGNsYXNzIE5nYkNhcm91c2VsIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50Q2hlY2tlZCwgQWZ0ZXJDb250ZW50SW5pdCwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcblx0QENvbnRlbnRDaGlsZHJlbihOZ2JTbGlkZSkgc2xpZGVzOiBRdWVyeUxpc3Q8TmdiU2xpZGU+O1xuXG5cdHB1YmxpYyBOZ2JTbGlkZUV2ZW50U291cmNlID0gTmdiU2xpZGVFdmVudFNvdXJjZTtcblxuXHRwcml2YXRlIF9kZXN0cm95JCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cdHByaXZhdGUgX2ludGVydmFsJCA9IG5ldyBCZWhhdmlvclN1YmplY3QoMCk7XG5cdHByaXZhdGUgX21vdXNlSG92ZXIkID0gbmV3IEJlaGF2aW9yU3ViamVjdChmYWxzZSk7XG5cdHByaXZhdGUgX2ZvY3VzZWQkID0gbmV3IEJlaGF2aW9yU3ViamVjdChmYWxzZSk7XG5cdHByaXZhdGUgX3BhdXNlT25Ib3ZlciQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KGZhbHNlKTtcblx0cHJpdmF0ZSBfcGF1c2VPbkZvY3VzJCA9IG5ldyBCZWhhdmlvclN1YmplY3QoZmFsc2UpO1xuXHRwcml2YXRlIF9wYXVzZSQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KGZhbHNlKTtcblx0cHJpdmF0ZSBfd3JhcCQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KGZhbHNlKTtcblxuXHQvKipcblx0ICogQSBmbGFnIHRvIGVuYWJsZS9kaXNhYmxlIHRoZSBhbmltYXRpb25zLlxuXHQgKlxuXHQgKiBAc2luY2UgOC4wLjBcblx0ICovXG5cdEBJbnB1dCgpIGFuaW1hdGlvbjogYm9vbGVhbjtcblxuXHQvKipcblx0ICogVGhlIHNsaWRlIGlkIHRoYXQgc2hvdWxkIGJlIGRpc3BsYXllZCAqKmluaXRpYWxseSoqLlxuXHQgKlxuXHQgKiBGb3Igc3Vic2VxdWVudCBpbnRlcmFjdGlvbnMgdXNlIG1ldGhvZHMgYHNlbGVjdCgpYCwgYG5leHQoKWAsIGV0Yy4gYW5kIHRoZSBgKHNsaWRlKWAgb3V0cHV0LlxuXHQgKi9cblx0QElucHV0KCkgYWN0aXZlSWQ6IHN0cmluZztcblxuXHQvKipcblx0ICogVGltZSBpbiBtaWxsaXNlY29uZHMgYmVmb3JlIHRoZSBuZXh0IHNsaWRlIGlzIHNob3duLlxuXHQgKi9cblx0QElucHV0KClcblx0c2V0IGludGVydmFsKHZhbHVlOiBudW1iZXIpIHtcblx0XHR0aGlzLl9pbnRlcnZhbCQubmV4dCh2YWx1ZSk7XG5cdH1cblxuXHRnZXQgaW50ZXJ2YWwoKSB7XG5cdFx0cmV0dXJuIHRoaXMuX2ludGVydmFsJC52YWx1ZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBJZiBgdHJ1ZWAsIHdpbGwgJ3dyYXAnIHRoZSBjYXJvdXNlbCBieSBzd2l0Y2hpbmcgZnJvbSB0aGUgbGFzdCBzbGlkZSBiYWNrIHRvIHRoZSBmaXJzdC5cblx0ICovXG5cdEBJbnB1dCgpXG5cdHNldCB3cmFwKHZhbHVlOiBib29sZWFuKSB7XG5cdFx0dGhpcy5fd3JhcCQubmV4dCh2YWx1ZSk7XG5cdH1cblxuXHRnZXQgd3JhcCgpIHtcblx0XHRyZXR1cm4gdGhpcy5fd3JhcCQudmFsdWU7XG5cdH1cblxuXHQvKipcblx0ICogSWYgYHRydWVgLCBhbGxvd3MgdG8gaW50ZXJhY3Qgd2l0aCBjYXJvdXNlbCB1c2luZyBrZXlib2FyZCAnYXJyb3cgbGVmdCcgYW5kICdhcnJvdyByaWdodCcuXG5cdCAqL1xuXHRASW5wdXQoKSBrZXlib2FyZDogYm9vbGVhbjtcblxuXHQvKipcblx0ICogSWYgYHRydWVgLCB3aWxsIHBhdXNlIHNsaWRlIHN3aXRjaGluZyB3aGVuIG1vdXNlIGN1cnNvciBob3ZlcnMgdGhlIHNsaWRlLlxuXHQgKlxuXHQgKiBAc2luY2UgMi4yLjBcblx0ICovXG5cdEBJbnB1dCgpXG5cdHNldCBwYXVzZU9uSG92ZXIodmFsdWU6IGJvb2xlYW4pIHtcblx0XHR0aGlzLl9wYXVzZU9uSG92ZXIkLm5leHQodmFsdWUpO1xuXHR9XG5cblx0Z2V0IHBhdXNlT25Ib3ZlcigpIHtcblx0XHRyZXR1cm4gdGhpcy5fcGF1c2VPbkhvdmVyJC52YWx1ZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBJZiBgdHJ1ZWAsIHdpbGwgcGF1c2Ugc2xpZGUgc3dpdGNoaW5nIHdoZW4gdGhlIGZvY3VzIGlzIGluc2lkZSB0aGUgY2Fyb3VzZWwuXG5cdCAqL1xuXHRASW5wdXQoKVxuXHRzZXQgcGF1c2VPbkZvY3VzKHZhbHVlOiBib29sZWFuKSB7XG5cdFx0dGhpcy5fcGF1c2VPbkZvY3VzJC5uZXh0KHZhbHVlKTtcblx0fVxuXG5cdGdldCBwYXVzZU9uRm9jdXMoKSB7XG5cdFx0cmV0dXJuIHRoaXMuX3BhdXNlT25Gb2N1cyQudmFsdWU7XG5cdH1cblxuXHQvKipcblx0ICogSWYgYHRydWVgLCAncHJldmlvdXMnIGFuZCAnbmV4dCcgbmF2aWdhdGlvbiBhcnJvd3Mgd2lsbCBiZSB2aXNpYmxlIG9uIHRoZSBzbGlkZS5cblx0ICpcblx0ICogQHNpbmNlIDIuMi4wXG5cdCAqL1xuXHRASW5wdXQoKSBzaG93TmF2aWdhdGlvbkFycm93czogYm9vbGVhbjtcblxuXHQvKipcblx0ICogSWYgYHRydWVgLCBuYXZpZ2F0aW9uIGluZGljYXRvcnMgYXQgdGhlIGJvdHRvbSBvZiB0aGUgc2xpZGUgd2lsbCBiZSB2aXNpYmxlLlxuXHQgKlxuXHQgKiBAc2luY2UgMi4yLjBcblx0ICovXG5cdEBJbnB1dCgpIHNob3dOYXZpZ2F0aW9uSW5kaWNhdG9yczogYm9vbGVhbjtcblxuXHQvKipcblx0ICogQW4gZXZlbnQgZW1pdHRlZCBqdXN0IGJlZm9yZSB0aGUgc2xpZGUgdHJhbnNpdGlvbiBzdGFydHMuXG5cdCAqXG5cdCAqIFNlZSBbYE5nYlNsaWRlRXZlbnRgXSgjL2NvbXBvbmVudHMvY2Fyb3VzZWwvYXBpI05nYlNsaWRlRXZlbnQpIGZvciBwYXlsb2FkIGRldGFpbHMuXG5cdCAqL1xuXHRAT3V0cHV0KCkgc2xpZGUgPSBuZXcgRXZlbnRFbWl0dGVyPE5nYlNsaWRlRXZlbnQ+KCk7XG5cblx0LyoqXG5cdCAqIEFuIGV2ZW50IGVtaXR0ZWQgcmlnaHQgYWZ0ZXIgdGhlIHNsaWRlIHRyYW5zaXRpb24gaXMgY29tcGxldGVkLlxuXHQgKlxuXHQgKiBTZWUgW2BOZ2JTbGlkZUV2ZW50YF0oIy9jb21wb25lbnRzL2Nhcm91c2VsL2FwaSNOZ2JTbGlkZUV2ZW50KSBmb3IgcGF5bG9hZCBkZXRhaWxzLlxuXHQgKlxuXHQgKiBAc2luY2UgOC4wLjBcblx0ICovXG5cdEBPdXRwdXQoKSBzbGlkID0gbmV3IEV2ZW50RW1pdHRlcjxOZ2JTbGlkZUV2ZW50PigpO1xuXG5cdC8qXG5cdCAqIEtlZXAgdGhlIGlkcyBvZiB0aGUgcGFuZWxzIGN1cnJlbnRseSB0cmFuc2l0aW9ubmluZ1xuXHQgKiBpbiBvcmRlciB0byBhbGxvdyBvbmx5IHRoZSB0cmFuc2l0aW9uIHJldmVydGlvblxuXHQgKi9cblx0cHJpdmF0ZSBfdHJhbnNpdGlvbklkczogW3N0cmluZywgc3RyaW5nXSB8IG51bGwgPSBudWxsO1xuXG5cdHNldCBtb3VzZUhvdmVyKHZhbHVlOiBib29sZWFuKSB7XG5cdFx0dGhpcy5fbW91c2VIb3ZlciQubmV4dCh2YWx1ZSk7XG5cdH1cblxuXHRnZXQgbW91c2VIb3ZlcigpIHtcblx0XHRyZXR1cm4gdGhpcy5fbW91c2VIb3ZlciQudmFsdWU7XG5cdH1cblxuXHRzZXQgZm9jdXNlZCh2YWx1ZTogYm9vbGVhbikge1xuXHRcdHRoaXMuX2ZvY3VzZWQkLm5leHQodmFsdWUpO1xuXHR9XG5cblx0Z2V0IGZvY3VzZWQoKSB7XG5cdFx0cmV0dXJuIHRoaXMuX2ZvY3VzZWQkLnZhbHVlO1xuXHR9XG5cblx0Y29uc3RydWN0b3IoXG5cdFx0Y29uZmlnOiBOZ2JDYXJvdXNlbENvbmZpZyxcblx0XHRASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIF9wbGF0Zm9ybUlkLFxuXHRcdHByaXZhdGUgX25nWm9uZTogTmdab25lLFxuXHRcdHByaXZhdGUgX2NkOiBDaGFuZ2VEZXRlY3RvclJlZixcblx0XHRwcml2YXRlIF9jb250YWluZXI6IEVsZW1lbnRSZWYsXG5cdCkge1xuXHRcdHRoaXMuYW5pbWF0aW9uID0gY29uZmlnLmFuaW1hdGlvbjtcblx0XHR0aGlzLmludGVydmFsID0gY29uZmlnLmludGVydmFsO1xuXHRcdHRoaXMud3JhcCA9IGNvbmZpZy53cmFwO1xuXHRcdHRoaXMua2V5Ym9hcmQgPSBjb25maWcua2V5Ym9hcmQ7XG5cdFx0dGhpcy5wYXVzZU9uSG92ZXIgPSBjb25maWcucGF1c2VPbkhvdmVyO1xuXHRcdHRoaXMucGF1c2VPbkZvY3VzID0gY29uZmlnLnBhdXNlT25Gb2N1cztcblx0XHR0aGlzLnNob3dOYXZpZ2F0aW9uQXJyb3dzID0gY29uZmlnLnNob3dOYXZpZ2F0aW9uQXJyb3dzO1xuXHRcdHRoaXMuc2hvd05hdmlnYXRpb25JbmRpY2F0b3JzID0gY29uZmlnLnNob3dOYXZpZ2F0aW9uSW5kaWNhdG9ycztcblx0fVxuXG5cdGFycm93TGVmdCgpIHtcblx0XHR0aGlzLmZvY3VzKCk7XG5cdFx0dGhpcy5wcmV2KE5nYlNsaWRlRXZlbnRTb3VyY2UuQVJST1dfTEVGVCk7XG5cdH1cblxuXHRhcnJvd1JpZ2h0KCkge1xuXHRcdHRoaXMuZm9jdXMoKTtcblx0XHR0aGlzLm5leHQoTmdiU2xpZGVFdmVudFNvdXJjZS5BUlJPV19SSUdIVCk7XG5cdH1cblxuXHRuZ0FmdGVyQ29udGVudEluaXQoKSB7XG5cdFx0Ly8gc2V0SW50ZXJ2YWwoKSBkb2Vzbid0IHBsYXkgd2VsbCB3aXRoIFNTUiBhbmQgcHJvdHJhY3Rvcixcblx0XHQvLyBzbyB3ZSBzaG91bGQgcnVuIGl0IGluIHRoZSBicm93c2VyIGFuZCBvdXRzaWRlIEFuZ3VsYXJcblx0XHRpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5fcGxhdGZvcm1JZCkpIHtcblx0XHRcdHRoaXMuX25nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG5cdFx0XHRcdGNvbnN0IGhhc05leHRTbGlkZSQgPSBjb21iaW5lTGF0ZXN0KFtcblx0XHRcdFx0XHR0aGlzLnNsaWRlLnBpcGUoXG5cdFx0XHRcdFx0XHRtYXAoKHNsaWRlRXZlbnQpID0+IHNsaWRlRXZlbnQuY3VycmVudCksXG5cdFx0XHRcdFx0XHRzdGFydFdpdGgodGhpcy5hY3RpdmVJZCksXG5cdFx0XHRcdFx0KSxcblx0XHRcdFx0XHR0aGlzLl93cmFwJCxcblx0XHRcdFx0XHR0aGlzLnNsaWRlcy5jaGFuZ2VzLnBpcGUoc3RhcnRXaXRoKG51bGwpKSxcblx0XHRcdFx0XSkucGlwZShcblx0XHRcdFx0XHRtYXAoKFtjdXJyZW50U2xpZGVJZCwgd3JhcF0pID0+IHtcblx0XHRcdFx0XHRcdGNvbnN0IHNsaWRlQXJyID0gdGhpcy5zbGlkZXMudG9BcnJheSgpO1xuXHRcdFx0XHRcdFx0Y29uc3QgY3VycmVudFNsaWRlSWR4ID0gdGhpcy5fZ2V0U2xpZGVJZHhCeUlkKGN1cnJlbnRTbGlkZUlkKTtcblx0XHRcdFx0XHRcdHJldHVybiB3cmFwID8gc2xpZGVBcnIubGVuZ3RoID4gMSA6IGN1cnJlbnRTbGlkZUlkeCA8IHNsaWRlQXJyLmxlbmd0aCAtIDE7XG5cdFx0XHRcdFx0fSksXG5cdFx0XHRcdFx0ZGlzdGluY3RVbnRpbENoYW5nZWQoKSxcblx0XHRcdFx0KTtcblx0XHRcdFx0Y29tYmluZUxhdGVzdChbXG5cdFx0XHRcdFx0dGhpcy5fcGF1c2UkLFxuXHRcdFx0XHRcdHRoaXMuX3BhdXNlT25Ib3ZlciQsXG5cdFx0XHRcdFx0dGhpcy5fbW91c2VIb3ZlciQsXG5cdFx0XHRcdFx0dGhpcy5fcGF1c2VPbkZvY3VzJCxcblx0XHRcdFx0XHR0aGlzLl9mb2N1c2VkJCxcblx0XHRcdFx0XHR0aGlzLl9pbnRlcnZhbCQsXG5cdFx0XHRcdFx0aGFzTmV4dFNsaWRlJCxcblx0XHRcdFx0XSlcblx0XHRcdFx0XHQucGlwZShcblx0XHRcdFx0XHRcdG1hcChcblx0XHRcdFx0XHRcdFx0KFtwYXVzZSwgcGF1c2VPbkhvdmVyLCBtb3VzZUhvdmVyLCBwYXVzZU9uRm9jdXMsIGZvY3VzZWQsIGludGVydmFsLCBoYXNOZXh0U2xpZGVdOiBbXG5cdFx0XHRcdFx0XHRcdFx0Ym9vbGVhbixcblx0XHRcdFx0XHRcdFx0XHRib29sZWFuLFxuXHRcdFx0XHRcdFx0XHRcdGJvb2xlYW4sXG5cdFx0XHRcdFx0XHRcdFx0Ym9vbGVhbixcblx0XHRcdFx0XHRcdFx0XHRib29sZWFuLFxuXHRcdFx0XHRcdFx0XHRcdG51bWJlcixcblx0XHRcdFx0XHRcdFx0XHRib29sZWFuLFxuXHRcdFx0XHRcdFx0XHRdKSA9PlxuXHRcdFx0XHRcdFx0XHRcdHBhdXNlIHx8IChwYXVzZU9uSG92ZXIgJiYgbW91c2VIb3ZlcikgfHwgKHBhdXNlT25Gb2N1cyAmJiBmb2N1c2VkKSB8fCAhaGFzTmV4dFNsaWRlID8gMCA6IGludGVydmFsLFxuXHRcdFx0XHRcdFx0KSxcblxuXHRcdFx0XHRcdFx0ZGlzdGluY3RVbnRpbENoYW5nZWQoKSxcblx0XHRcdFx0XHRcdHN3aXRjaE1hcCgoaW50ZXJ2YWwpID0+IChpbnRlcnZhbCA+IDAgPyB0aW1lcihpbnRlcnZhbCwgaW50ZXJ2YWwpIDogTkVWRVIpKSxcblx0XHRcdFx0XHRcdHRha2VVbnRpbCh0aGlzLl9kZXN0cm95JCksXG5cdFx0XHRcdFx0KVxuXHRcdFx0XHRcdC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5fbmdab25lLnJ1bigoKSA9PiB0aGlzLm5leHQoTmdiU2xpZGVFdmVudFNvdXJjZS5USU1FUikpKTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdHRoaXMuc2xpZGVzLmNoYW5nZXMucGlwZSh0YWtlVW50aWwodGhpcy5fZGVzdHJveSQpKS5zdWJzY3JpYmUoKCkgPT4ge1xuXHRcdFx0dGhpcy5fdHJhbnNpdGlvbklkcz8uZm9yRWFjaCgoaWQpID0+IG5nYkNvbXBsZXRlVHJhbnNpdGlvbih0aGlzLl9nZXRTbGlkZUVsZW1lbnQoaWQpKSk7XG5cdFx0XHR0aGlzLl90cmFuc2l0aW9uSWRzID0gbnVsbDtcblxuXHRcdFx0dGhpcy5fY2QubWFya0ZvckNoZWNrKCk7XG5cblx0XHRcdC8vIFRoZSBmb2xsb3dpbmcgY29kZSBuZWVkIHRvIGJlIGRvbmUgYXN5bmNocm9ub3VzbHksIGFmdGVyIHRoZSBkb20gYmVjb21lcyBzdGFibGUsXG5cdFx0XHQvLyBvdGhlcndpc2UgYWxsIGNoYW5nZXMgd2lsbCBiZSB1bmRvbmUuXG5cdFx0XHR0aGlzLl9uZ1pvbmUub25TdGFibGUucGlwZSh0YWtlKDEpKS5zdWJzY3JpYmUoKCkgPT4ge1xuXHRcdFx0XHRmb3IgKGNvbnN0IHsgaWQgfSBvZiB0aGlzLnNsaWRlcykge1xuXHRcdFx0XHRcdGNvbnN0IGVsZW1lbnQgPSB0aGlzLl9nZXRTbGlkZUVsZW1lbnQoaWQpO1xuXHRcdFx0XHRcdGlmIChpZCA9PT0gdGhpcy5hY3RpdmVJZCkge1xuXHRcdFx0XHRcdFx0ZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0ZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9XG5cblx0bmdBZnRlckNvbnRlbnRDaGVja2VkKCkge1xuXHRcdGxldCBhY3RpdmVTbGlkZSA9IHRoaXMuX2dldFNsaWRlQnlJZCh0aGlzLmFjdGl2ZUlkKTtcblx0XHR0aGlzLmFjdGl2ZUlkID0gYWN0aXZlU2xpZGUgPyBhY3RpdmVTbGlkZS5pZCA6IHRoaXMuc2xpZGVzLmxlbmd0aCA/IHRoaXMuc2xpZGVzLmZpcnN0LmlkIDogJyc7XG5cdH1cblxuXHRuZ0FmdGVyVmlld0luaXQoKSB7XG5cdFx0Ly8gSW5pdGlhbGl6ZSB0aGUgJ2FjdGl2ZScgY2xhc3MgKG5vdCBtYW5hZ2VkIGJ5IHRoZSB0ZW1wbGF0ZSlcblx0XHRpZiAodGhpcy5hY3RpdmVJZCkge1xuXHRcdFx0Y29uc3QgZWxlbWVudCA9IHRoaXMuX2dldFNsaWRlRWxlbWVudCh0aGlzLmFjdGl2ZUlkKTtcblx0XHRcdGlmIChlbGVtZW50KSB7XG5cdFx0XHRcdGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0bmdPbkRlc3Ryb3koKSB7XG5cdFx0dGhpcy5fZGVzdHJveSQubmV4dCgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIE5hdmlnYXRlcyB0byBhIHNsaWRlIHdpdGggdGhlIHNwZWNpZmllZCBpZGVudGlmaWVyLlxuXHQgKi9cblx0c2VsZWN0KHNsaWRlSWQ6IHN0cmluZywgc291cmNlPzogTmdiU2xpZGVFdmVudFNvdXJjZSkge1xuXHRcdHRoaXMuX2N5Y2xlVG9TZWxlY3RlZChzbGlkZUlkLCB0aGlzLl9nZXRTbGlkZUV2ZW50RGlyZWN0aW9uKHRoaXMuYWN0aXZlSWQsIHNsaWRlSWQpLCBzb3VyY2UpO1xuXHR9XG5cblx0LyoqXG5cdCAqIE5hdmlnYXRlcyB0byB0aGUgcHJldmlvdXMgc2xpZGUuXG5cdCAqL1xuXHRwcmV2KHNvdXJjZT86IE5nYlNsaWRlRXZlbnRTb3VyY2UpIHtcblx0XHR0aGlzLl9jeWNsZVRvU2VsZWN0ZWQodGhpcy5fZ2V0UHJldlNsaWRlKHRoaXMuYWN0aXZlSWQpLCBOZ2JTbGlkZUV2ZW50RGlyZWN0aW9uLkVORCwgc291cmNlKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBOYXZpZ2F0ZXMgdG8gdGhlIG5leHQgc2xpZGUuXG5cdCAqL1xuXHRuZXh0KHNvdXJjZT86IE5nYlNsaWRlRXZlbnRTb3VyY2UpIHtcblx0XHR0aGlzLl9jeWNsZVRvU2VsZWN0ZWQodGhpcy5fZ2V0TmV4dFNsaWRlKHRoaXMuYWN0aXZlSWQpLCBOZ2JTbGlkZUV2ZW50RGlyZWN0aW9uLlNUQVJULCBzb3VyY2UpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFBhdXNlcyBjeWNsaW5nIHRocm91Z2ggdGhlIHNsaWRlcy5cblx0ICovXG5cdHBhdXNlKCkge1xuXHRcdHRoaXMuX3BhdXNlJC5uZXh0KHRydWUpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJlc3RhcnRzIGN5Y2xpbmcgdGhyb3VnaCB0aGUgc2xpZGVzIGZyb20gc3RhcnQgdG8gZW5kLlxuXHQgKi9cblx0Y3ljbGUoKSB7XG5cdFx0dGhpcy5fcGF1c2UkLm5leHQoZmFsc2UpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFNldCB0aGUgZm9jdXMgb24gdGhlIGNhcm91c2VsLlxuXHQgKi9cblx0Zm9jdXMoKSB7XG5cdFx0dGhpcy5fY29udGFpbmVyLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcblx0fVxuXG5cdHByaXZhdGUgX2N5Y2xlVG9TZWxlY3RlZChzbGlkZUlkeDogc3RyaW5nLCBkaXJlY3Rpb246IE5nYlNsaWRlRXZlbnREaXJlY3Rpb24sIHNvdXJjZT86IE5nYlNsaWRlRXZlbnRTb3VyY2UpIHtcblx0XHRjb25zdCB0cmFuc2l0aW9uSWRzID0gdGhpcy5fdHJhbnNpdGlvbklkcztcblx0XHRpZiAodHJhbnNpdGlvbklkcyAmJiAodHJhbnNpdGlvbklkc1swXSAhPT0gc2xpZGVJZHggfHwgdHJhbnNpdGlvbklkc1sxXSAhPT0gdGhpcy5hY3RpdmVJZCkpIHtcblx0XHRcdC8vIFJldmVydCBwcmV2ZW50ZWRcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRsZXQgc2VsZWN0ZWRTbGlkZSA9IHRoaXMuX2dldFNsaWRlQnlJZChzbGlkZUlkeCk7XG5cdFx0aWYgKHNlbGVjdGVkU2xpZGUgJiYgc2VsZWN0ZWRTbGlkZS5pZCAhPT0gdGhpcy5hY3RpdmVJZCkge1xuXHRcdFx0dGhpcy5fdHJhbnNpdGlvbklkcyA9IFt0aGlzLmFjdGl2ZUlkLCBzbGlkZUlkeF07XG5cdFx0XHR0aGlzLnNsaWRlLmVtaXQoe1xuXHRcdFx0XHRwcmV2OiB0aGlzLmFjdGl2ZUlkLFxuXHRcdFx0XHRjdXJyZW50OiBzZWxlY3RlZFNsaWRlLmlkLFxuXHRcdFx0XHRkaXJlY3Rpb246IGRpcmVjdGlvbixcblx0XHRcdFx0cGF1c2VkOiB0aGlzLl9wYXVzZSQudmFsdWUsXG5cdFx0XHRcdHNvdXJjZSxcblx0XHRcdH0pO1xuXG5cdFx0XHRjb25zdCBvcHRpb25zOiBOZ2JUcmFuc2l0aW9uT3B0aW9uczxOZ2JDYXJvdXNlbEN0eD4gPSB7XG5cdFx0XHRcdGFuaW1hdGlvbjogdGhpcy5hbmltYXRpb24sXG5cdFx0XHRcdHJ1bm5pbmdUcmFuc2l0aW9uOiAnc3RvcCcsXG5cdFx0XHRcdGNvbnRleHQ6IHsgZGlyZWN0aW9uIH0sXG5cdFx0XHR9O1xuXG5cdFx0XHRjb25zdCB0cmFuc2l0aW9uczogQXJyYXk8T2JzZXJ2YWJsZTxhbnk+PiA9IFtdO1xuXHRcdFx0Y29uc3QgYWN0aXZlU2xpZGUgPSB0aGlzLl9nZXRTbGlkZUJ5SWQodGhpcy5hY3RpdmVJZCk7XG5cdFx0XHRpZiAoYWN0aXZlU2xpZGUpIHtcblx0XHRcdFx0Y29uc3QgYWN0aXZlU2xpZGVUcmFuc2l0aW9uID0gbmdiUnVuVHJhbnNpdGlvbihcblx0XHRcdFx0XHR0aGlzLl9uZ1pvbmUsXG5cdFx0XHRcdFx0dGhpcy5fZ2V0U2xpZGVFbGVtZW50KGFjdGl2ZVNsaWRlLmlkKSxcblx0XHRcdFx0XHRuZ2JDYXJvdXNlbFRyYW5zaXRpb25PdXQsXG5cdFx0XHRcdFx0b3B0aW9ucyxcblx0XHRcdFx0KTtcblx0XHRcdFx0YWN0aXZlU2xpZGVUcmFuc2l0aW9uLnN1YnNjcmliZSgoKSA9PiB7XG5cdFx0XHRcdFx0YWN0aXZlU2xpZGUuc2xpZC5lbWl0KHsgaXNTaG93bjogZmFsc2UsIGRpcmVjdGlvbiwgc291cmNlIH0pO1xuXHRcdFx0XHR9KTtcblx0XHRcdFx0dHJhbnNpdGlvbnMucHVzaChhY3RpdmVTbGlkZVRyYW5zaXRpb24pO1xuXHRcdFx0fVxuXG5cdFx0XHRjb25zdCBwcmV2aW91c0lkID0gdGhpcy5hY3RpdmVJZDtcblx0XHRcdHRoaXMuYWN0aXZlSWQgPSBzZWxlY3RlZFNsaWRlLmlkO1xuXHRcdFx0Y29uc3QgbmV4dFNsaWRlID0gdGhpcy5fZ2V0U2xpZGVCeUlkKHRoaXMuYWN0aXZlSWQpO1xuXHRcdFx0Y29uc3QgdHJhbnNpdGlvbiA9IG5nYlJ1blRyYW5zaXRpb24oXG5cdFx0XHRcdHRoaXMuX25nWm9uZSxcblx0XHRcdFx0dGhpcy5fZ2V0U2xpZGVFbGVtZW50KHNlbGVjdGVkU2xpZGUuaWQpLFxuXHRcdFx0XHRuZ2JDYXJvdXNlbFRyYW5zaXRpb25Jbixcblx0XHRcdFx0b3B0aW9ucyxcblx0XHRcdCk7XG5cdFx0XHR0cmFuc2l0aW9uLnN1YnNjcmliZSgoKSA9PiB7XG5cdFx0XHRcdG5leHRTbGlkZT8uc2xpZC5lbWl0KHsgaXNTaG93bjogdHJ1ZSwgZGlyZWN0aW9uLCBzb3VyY2UgfSk7XG5cdFx0XHR9KTtcblx0XHRcdHRyYW5zaXRpb25zLnB1c2godHJhbnNpdGlvbik7XG5cblx0XHRcdHppcCguLi50cmFuc2l0aW9ucylcblx0XHRcdFx0LnBpcGUodGFrZSgxKSlcblx0XHRcdFx0LnN1YnNjcmliZSgoKSA9PiB7XG5cdFx0XHRcdFx0dGhpcy5fdHJhbnNpdGlvbklkcyA9IG51bGw7XG5cdFx0XHRcdFx0dGhpcy5zbGlkLmVtaXQoe1xuXHRcdFx0XHRcdFx0cHJldjogcHJldmlvdXNJZCxcblx0XHRcdFx0XHRcdGN1cnJlbnQ6IHNlbGVjdGVkU2xpZGUhLmlkLFxuXHRcdFx0XHRcdFx0ZGlyZWN0aW9uOiBkaXJlY3Rpb24sXG5cdFx0XHRcdFx0XHRwYXVzZWQ6IHRoaXMuX3BhdXNlJC52YWx1ZSxcblx0XHRcdFx0XHRcdHNvdXJjZSxcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0Ly8gd2UgZ2V0IGhlcmUgYWZ0ZXIgdGhlIGludGVydmFsIGZpcmVzIG9yIGFueSBleHRlcm5hbCBBUEkgY2FsbCBsaWtlIG5leHQoKSwgcHJldigpIG9yIHNlbGVjdCgpXG5cdFx0dGhpcy5fY2QubWFya0ZvckNoZWNrKCk7XG5cdH1cblxuXHRwcml2YXRlIF9nZXRTbGlkZUV2ZW50RGlyZWN0aW9uKGN1cnJlbnRBY3RpdmVTbGlkZUlkOiBzdHJpbmcsIG5leHRBY3RpdmVTbGlkZUlkOiBzdHJpbmcpOiBOZ2JTbGlkZUV2ZW50RGlyZWN0aW9uIHtcblx0XHRjb25zdCBjdXJyZW50QWN0aXZlU2xpZGVJZHggPSB0aGlzLl9nZXRTbGlkZUlkeEJ5SWQoY3VycmVudEFjdGl2ZVNsaWRlSWQpO1xuXHRcdGNvbnN0IG5leHRBY3RpdmVTbGlkZUlkeCA9IHRoaXMuX2dldFNsaWRlSWR4QnlJZChuZXh0QWN0aXZlU2xpZGVJZCk7XG5cblx0XHRyZXR1cm4gY3VycmVudEFjdGl2ZVNsaWRlSWR4ID4gbmV4dEFjdGl2ZVNsaWRlSWR4ID8gTmdiU2xpZGVFdmVudERpcmVjdGlvbi5FTkQgOiBOZ2JTbGlkZUV2ZW50RGlyZWN0aW9uLlNUQVJUO1xuXHR9XG5cblx0cHJpdmF0ZSBfZ2V0U2xpZGVCeUlkKHNsaWRlSWQ6IHN0cmluZyk6IE5nYlNsaWRlIHwgbnVsbCB7XG5cdFx0cmV0dXJuIHRoaXMuc2xpZGVzLmZpbmQoKHNsaWRlKSA9PiBzbGlkZS5pZCA9PT0gc2xpZGVJZCkgfHwgbnVsbDtcblx0fVxuXG5cdHByaXZhdGUgX2dldFNsaWRlSWR4QnlJZChzbGlkZUlkOiBzdHJpbmcpOiBudW1iZXIge1xuXHRcdGNvbnN0IHNsaWRlID0gdGhpcy5fZ2V0U2xpZGVCeUlkKHNsaWRlSWQpO1xuXHRcdHJldHVybiBzbGlkZSAhPSBudWxsID8gdGhpcy5zbGlkZXMudG9BcnJheSgpLmluZGV4T2Yoc2xpZGUpIDogLTE7XG5cdH1cblxuXHRwcml2YXRlIF9nZXROZXh0U2xpZGUoY3VycmVudFNsaWRlSWQ6IHN0cmluZyk6IHN0cmluZyB7XG5cdFx0Y29uc3Qgc2xpZGVBcnIgPSB0aGlzLnNsaWRlcy50b0FycmF5KCk7XG5cdFx0Y29uc3QgY3VycmVudFNsaWRlSWR4ID0gdGhpcy5fZ2V0U2xpZGVJZHhCeUlkKGN1cnJlbnRTbGlkZUlkKTtcblx0XHRjb25zdCBpc0xhc3RTbGlkZSA9IGN1cnJlbnRTbGlkZUlkeCA9PT0gc2xpZGVBcnIubGVuZ3RoIC0gMTtcblxuXHRcdHJldHVybiBpc0xhc3RTbGlkZVxuXHRcdFx0PyB0aGlzLndyYXBcblx0XHRcdFx0PyBzbGlkZUFyclswXS5pZFxuXHRcdFx0XHQ6IHNsaWRlQXJyW3NsaWRlQXJyLmxlbmd0aCAtIDFdLmlkXG5cdFx0XHQ6IHNsaWRlQXJyW2N1cnJlbnRTbGlkZUlkeCArIDFdLmlkO1xuXHR9XG5cblx0cHJpdmF0ZSBfZ2V0UHJldlNsaWRlKGN1cnJlbnRTbGlkZUlkOiBzdHJpbmcpOiBzdHJpbmcge1xuXHRcdGNvbnN0IHNsaWRlQXJyID0gdGhpcy5zbGlkZXMudG9BcnJheSgpO1xuXHRcdGNvbnN0IGN1cnJlbnRTbGlkZUlkeCA9IHRoaXMuX2dldFNsaWRlSWR4QnlJZChjdXJyZW50U2xpZGVJZCk7XG5cdFx0Y29uc3QgaXNGaXJzdFNsaWRlID0gY3VycmVudFNsaWRlSWR4ID09PSAwO1xuXG5cdFx0cmV0dXJuIGlzRmlyc3RTbGlkZVxuXHRcdFx0PyB0aGlzLndyYXBcblx0XHRcdFx0PyBzbGlkZUFycltzbGlkZUFyci5sZW5ndGggLSAxXS5pZFxuXHRcdFx0XHQ6IHNsaWRlQXJyWzBdLmlkXG5cdFx0XHQ6IHNsaWRlQXJyW2N1cnJlbnRTbGlkZUlkeCAtIDFdLmlkO1xuXHR9XG5cblx0cHJpdmF0ZSBfZ2V0U2xpZGVFbGVtZW50KHNsaWRlSWQ6IHN0cmluZyk6IEhUTUxFbGVtZW50IHtcblx0XHRyZXR1cm4gdGhpcy5fY29udGFpbmVyLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcihgI3NsaWRlLSR7c2xpZGVJZH1gKTtcblx0fVxufVxuXG4vKipcbiAqIEEgc2xpZGUgY2hhbmdlIGV2ZW50IGVtaXR0ZWQgcmlnaHQgYWZ0ZXIgdGhlIHNsaWRlIHRyYW5zaXRpb24gaXMgY29tcGxldGVkLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIE5nYlNsaWRlRXZlbnQge1xuXHQvKipcblx0ICogVGhlIHByZXZpb3VzIHNsaWRlIGlkLlxuXHQgKi9cblx0cHJldjogc3RyaW5nO1xuXG5cdC8qKlxuXHQgKiBUaGUgY3VycmVudCBzbGlkZSBpZC5cblx0ICovXG5cdGN1cnJlbnQ6IHN0cmluZztcblxuXHQvKipcblx0ICogVGhlIHNsaWRlIGV2ZW50IGRpcmVjdGlvbi5cblx0ICpcblx0ICogPHNwYW4gY2xhc3M9XCJiYWRnZSBiZy1pbmZvIHRleHQtZGFya1wiPnNpbmNlIDEyLjAuMDwvc3Bhbj4gUG9zc2libGUgdmFsdWVzIGFyZSBgJ3N0YXJ0JyB8ICdlbmQnYC5cblx0ICpcblx0ICogPHNwYW4gY2xhc3M9XCJiYWRnZSBiZy1zZWNvbmRhcnlcIj5iZWZvcmUgMTIuMC4wPC9zcGFuPiBQb3NzaWJsZSB2YWx1ZXMgd2VyZSBgJ2xlZnQnIHwgJ3JpZ2h0J2AuXG5cdCAqL1xuXHRkaXJlY3Rpb246IE5nYlNsaWRlRXZlbnREaXJlY3Rpb247XG5cblx0LyoqXG5cdCAqIFdoZXRoZXIgdGhlIHBhdXNlKCkgbWV0aG9kIHdhcyBjYWxsZWQgKGFuZCBubyBjeWNsZSgpIGNhbGwgd2FzIGRvbmUgYWZ0ZXJ3YXJkcykuXG5cdCAqXG5cdCAqIEBzaW5jZSA1LjEuMFxuXHQgKi9cblx0cGF1c2VkOiBib29sZWFuO1xuXG5cdC8qKlxuXHQgKiBTb3VyY2UgdHJpZ2dlcmluZyB0aGUgc2xpZGUgY2hhbmdlIGV2ZW50LlxuXHQgKlxuXHQgKiBQb3NzaWJsZSB2YWx1ZXMgYXJlIGAndGltZXInIHwgJ2Fycm93TGVmdCcgfCAnYXJyb3dSaWdodCcgfCAnaW5kaWNhdG9yJ2Bcblx0ICpcblx0ICogQHNpbmNlIDUuMS4wXG5cdCAqL1xuXHRzb3VyY2U/OiBOZ2JTbGlkZUV2ZW50U291cmNlO1xufVxuXG4vKipcbiAqIEEgc2xpZGUgY2hhbmdlIGV2ZW50IGVtaXR0ZWQgcmlnaHQgYWZ0ZXIgdGhlIHNsaWRlIHRyYW5zaXRpb24gaXMgY29tcGxldGVkLlxuICpcbiAqIEBzaW5jZSA4LjAuMFxuICovXG5leHBvcnQgaW50ZXJmYWNlIE5nYlNpbmdsZVNsaWRlRXZlbnQge1xuXHQvKipcblx0ICogdHJ1ZSBpZiB0aGUgc2xpZGUgaXMgc2hvd24sIGZhbHNlIG90aGVyd2lzZVxuXHQgKi9cblx0aXNTaG93bjogYm9vbGVhbjtcblxuXHQvKipcblx0ICogVGhlIHNsaWRlIGV2ZW50IGRpcmVjdGlvbi5cblx0ICpcblx0ICogPHNwYW4gY2xhc3M9XCJiYWRnZSBiZy1pbmZvIHRleHQtZGFya1wiPnNpbmNlIDEyLjAuMDwvc3Bhbj4gUG9zc2libGUgdmFsdWVzIGFyZSBgJ3N0YXJ0JyB8ICdlbmQnYC5cblx0ICpcblx0ICogPHNwYW4gY2xhc3M9XCJiYWRnZSBiZy1zZWNvbmRhcnlcIj5iZWZvcmUgMTIuMC4wPC9zcGFuPiBQb3NzaWJsZSB2YWx1ZXMgd2VyZSBgJ2xlZnQnIHwgJ3JpZ2h0J2AuXG5cdCAqL1xuXHRkaXJlY3Rpb246IE5nYlNsaWRlRXZlbnREaXJlY3Rpb247XG5cblx0LyoqXG5cdCAqIFNvdXJjZSB0cmlnZ2VyaW5nIHRoZSBzbGlkZSBjaGFuZ2UgZXZlbnQuXG5cdCAqXG5cdCAqIFBvc3NpYmxlIHZhbHVlcyBhcmUgYCd0aW1lcicgfCAnYXJyb3dMZWZ0JyB8ICdhcnJvd1JpZ2h0JyB8ICdpbmRpY2F0b3InYFxuXHQgKlxuXHQgKi9cblx0c291cmNlPzogTmdiU2xpZGVFdmVudFNvdXJjZTtcbn1cblxuZXhwb3J0IGVudW0gTmdiU2xpZGVFdmVudFNvdXJjZSB7XG5cdFRJTUVSID0gJ3RpbWVyJyxcblx0QVJST1dfTEVGVCA9ICdhcnJvd0xlZnQnLFxuXHRBUlJPV19SSUdIVCA9ICdhcnJvd1JpZ2h0Jyxcblx0SU5ESUNBVE9SID0gJ2luZGljYXRvcicsXG59XG4iXX0=