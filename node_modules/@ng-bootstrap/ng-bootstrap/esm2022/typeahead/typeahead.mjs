import { Directive, EventEmitter, forwardRef, Inject, Input, Output, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import { BehaviorSubject, fromEvent, of, Subject } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { ngbAutoClose } from '../util/autoclose';
import { Key } from '../util/key';
import { PopupService } from '../util/popup';
import { ngbPositioning } from '../util/positioning';
import { isDefined, toString } from '../util/util';
import { NgbTypeaheadWindow } from './typeahead-window';
import { addPopperOffset } from '../util/positioning-util';
import * as i0 from "@angular/core";
import * as i1 from "./typeahead-config";
import * as i2 from "../util/accessibility/live";
let nextWindowId = 0;
/**
 * A directive providing a simple way of creating powerful typeaheads from any text input.
 */
class NgbTypeahead {
    constructor(_elementRef, viewContainerRef, _renderer, injector, config, ngZone, _live, _document, _ngZone, _changeDetector, applicationRef) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._live = _live;
        this._document = _document;
        this._ngZone = _ngZone;
        this._changeDetector = _changeDetector;
        this._subscription = null;
        this._closed$ = new Subject();
        this._inputValueBackup = null;
        this._inputValueForSelectOnExact = null;
        this._windowRef = null;
        /**
         * The value for the `autocomplete` attribute for the `<input>` element.
         *
         * Defaults to `"off"` to disable the native browser autocomplete, but you can override it if necessary.
         *
         * @since 2.1.0
         */
        this.autocomplete = 'off';
        /**
         * The preferred placement of the typeahead, among the [possible values](#/guides/positioning#api).
         *
         * The default order of preference is `"bottom-start bottom-end top-start top-end"`
         *
         * Please see the [positioning overview](#/positioning) for more details.
         */
        this.placement = 'bottom-start';
        /**
         * An event emitted right before an item is selected from the result list.
         *
         * Event payload is of type [`NgbTypeaheadSelectItemEvent`](#/components/typeahead/api#NgbTypeaheadSelectItemEvent).
         */
        this.selectItem = new EventEmitter();
        this.activeDescendant = null;
        this.popupId = `ngb-typeahead-${nextWindowId++}`;
        this._onTouched = () => { };
        this._onChange = (_) => { };
        this.container = config.container;
        this.editable = config.editable;
        this.focusFirst = config.focusFirst;
        this.selectOnExact = config.selectOnExact;
        this.showHint = config.showHint;
        this.placement = config.placement;
        this.popperOptions = config.popperOptions;
        this._valueChanges = fromEvent(_elementRef.nativeElement, 'input').pipe(map(($event) => $event.target.value));
        this._resubscribeTypeahead = new BehaviorSubject(null);
        this._popupService = new PopupService(NgbTypeaheadWindow, injector, viewContainerRef, _renderer, this._ngZone, applicationRef);
        this._positioning = ngbPositioning();
    }
    ngOnInit() {
        this._subscribeToUserInput();
    }
    ngOnChanges({ ngbTypeahead }) {
        if (ngbTypeahead && !ngbTypeahead.firstChange) {
            this._unsubscribeFromUserInput();
            this._subscribeToUserInput();
        }
    }
    ngOnDestroy() {
        this._closePopup();
        this._unsubscribeFromUserInput();
    }
    registerOnChange(fn) {
        this._onChange = fn;
    }
    registerOnTouched(fn) {
        this._onTouched = fn;
    }
    writeValue(value) {
        this._writeInputValue(this._formatItemForInput(value));
        if (this.showHint) {
            this._inputValueBackup = value;
        }
    }
    setDisabledState(isDisabled) {
        this._renderer.setProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
    }
    /**
     * Dismisses typeahead popup window
     */
    dismissPopup() {
        if (this.isPopupOpen()) {
            this._resubscribeTypeahead.next(null);
            this._closePopup();
            if (this.showHint && this._inputValueBackup !== null) {
                this._writeInputValue(this._inputValueBackup);
            }
            this._changeDetector.markForCheck();
        }
    }
    /**
     * Returns true if the typeahead popup window is displayed
     */
    isPopupOpen() {
        return this._windowRef != null;
    }
    handleBlur() {
        this._resubscribeTypeahead.next(null);
        this._onTouched();
    }
    handleKeyDown(event) {
        if (!this.isPopupOpen()) {
            return;
        }
        /* eslint-disable-next-line deprecation/deprecation */
        switch (event.which) {
            case Key.ArrowDown:
                event.preventDefault();
                this._windowRef.instance.next();
                this._showHint();
                break;
            case Key.ArrowUp:
                event.preventDefault();
                this._windowRef.instance.prev();
                this._showHint();
                break;
            case Key.Enter:
            case Key.Tab: {
                const result = this._windowRef.instance.getActive();
                if (isDefined(result)) {
                    event.preventDefault();
                    event.stopPropagation();
                    this._selectResult(result);
                }
                this._closePopup();
                break;
            }
        }
    }
    _openPopup() {
        if (!this.isPopupOpen()) {
            this._inputValueBackup = this._elementRef.nativeElement.value;
            const { windowRef } = this._popupService.open();
            this._windowRef = windowRef;
            this._windowRef.setInput('id', this.popupId);
            this._windowRef.setInput('popupClass', this.popupClass);
            this._windowRef.instance.selectEvent.subscribe((result) => this._selectResultClosePopup(result));
            this._windowRef.instance.activeChangeEvent.subscribe((activeId) => (this.activeDescendant = activeId));
            if (this.container === 'body') {
                this._renderer.setStyle(this._windowRef.location.nativeElement, 'z-index', '1055');
                this._document.querySelector(this.container).appendChild(this._windowRef.location.nativeElement);
            }
            this._changeDetector.markForCheck();
            // Setting up popper and scheduling updates when zone is stable
            this._ngZone.runOutsideAngular(() => {
                if (this._windowRef) {
                    this._positioning.createPopper({
                        hostElement: this._elementRef.nativeElement,
                        targetElement: this._windowRef.location.nativeElement,
                        placement: this.placement,
                        appendToBody: this.container === 'body',
                        updatePopperOptions: (options) => this.popperOptions(addPopperOffset([0, 2])(options)),
                    });
                    this._zoneSubscription = this._ngZone.onStable.subscribe(() => this._positioning.update());
                }
            });
            ngbAutoClose(this._ngZone, this._document, 'outside', () => this.dismissPopup(), this._closed$, [
                this._elementRef.nativeElement,
                this._windowRef.location.nativeElement,
            ]);
        }
    }
    _closePopup() {
        this._popupService.close().subscribe(() => {
            this._positioning.destroy();
            this._zoneSubscription?.unsubscribe();
            this._closed$.next();
            this._windowRef = null;
            this.activeDescendant = null;
        });
    }
    _selectResult(result) {
        let defaultPrevented = false;
        this.selectItem.emit({
            item: result,
            preventDefault: () => {
                defaultPrevented = true;
            },
        });
        this._resubscribeTypeahead.next(null);
        if (!defaultPrevented) {
            this.writeValue(result);
            this._onChange(result);
        }
    }
    _selectResultClosePopup(result) {
        this._selectResult(result);
        this._closePopup();
    }
    _showHint() {
        if (this.showHint && this._windowRef?.instance.hasActive() && this._inputValueBackup != null) {
            const userInputLowerCase = this._inputValueBackup.toLowerCase();
            const formattedVal = this._formatItemForInput(this._windowRef.instance.getActive());
            if (userInputLowerCase === formattedVal.substring(0, this._inputValueBackup.length).toLowerCase()) {
                this._writeInputValue(this._inputValueBackup + formattedVal.substring(this._inputValueBackup.length));
                this._elementRef.nativeElement['setSelectionRange'].apply(this._elementRef.nativeElement, [
                    this._inputValueBackup.length,
                    formattedVal.length,
                ]);
            }
            else {
                this._writeInputValue(formattedVal);
            }
        }
    }
    _formatItemForInput(item) {
        return item != null && this.inputFormatter ? this.inputFormatter(item) : toString(item);
    }
    _writeInputValue(value) {
        this._renderer.setProperty(this._elementRef.nativeElement, 'value', toString(value));
    }
    _subscribeToUserInput() {
        const results$ = this._valueChanges.pipe(tap((value) => {
            this._inputValueBackup = this.showHint ? value : null;
            this._inputValueForSelectOnExact = this.selectOnExact ? value : null;
            this._onChange(this.editable ? value : undefined);
        }), this.ngbTypeahead ? this.ngbTypeahead : () => of([]));
        this._subscription = this._resubscribeTypeahead.pipe(switchMap(() => results$)).subscribe((results) => {
            if (!results || results.length === 0) {
                this._closePopup();
            }
            else {
                // when there is only one result and this matches the input value
                if (this.selectOnExact &&
                    results.length === 1 &&
                    this._formatItemForInput(results[0]) === this._inputValueForSelectOnExact) {
                    this._selectResult(results[0]);
                    this._closePopup();
                }
                else {
                    this._openPopup();
                    this._windowRef.instance.focusFirst = this.focusFirst;
                    this._windowRef.instance.results = results;
                    this._windowRef.instance.term = this._elementRef.nativeElement.value;
                    if (this.resultFormatter) {
                        this._windowRef.instance.formatter = this.resultFormatter;
                    }
                    if (this.resultTemplate) {
                        this._windowRef.instance.resultTemplate = this.resultTemplate;
                    }
                    this._windowRef.instance.resetActive();
                    // The observable stream we are subscribing to might have async steps
                    // and if a component containing typeahead is using the OnPush strategy
                    // the change detection turn wouldn't be invoked automatically.
                    this._windowRef.changeDetectorRef.detectChanges();
                    this._showHint();
                }
            }
            // live announcer
            const count = results ? results.length : 0;
            this._live.say(count === 0 ? 'No results available' : `${count} result${count === 1 ? '' : 's'} available`);
        });
    }
    _unsubscribeFromUserInput() {
        if (this._subscription) {
            this._subscription.unsubscribe();
        }
        this._subscription = null;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbTypeahead, deps: [{ token: i0.ElementRef }, { token: i0.ViewContainerRef }, { token: i0.Renderer2 }, { token: i0.Injector }, { token: i1.NgbTypeaheadConfig }, { token: i0.NgZone }, { token: i2.Live }, { token: DOCUMENT }, { token: i0.NgZone }, { token: i0.ChangeDetectorRef }, { token: i0.ApplicationRef }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.0.6", type: NgbTypeahead, isStandalone: true, selector: "input[ngbTypeahead]", inputs: { autocomplete: "autocomplete", container: "container", editable: "editable", focusFirst: "focusFirst", inputFormatter: "inputFormatter", ngbTypeahead: "ngbTypeahead", resultFormatter: "resultFormatter", resultTemplate: "resultTemplate", selectOnExact: "selectOnExact", showHint: "showHint", placement: "placement", popperOptions: "popperOptions", popupClass: "popupClass" }, outputs: { selectItem: "selectItem" }, host: { attributes: { "autocapitalize": "off", "autocorrect": "off", "role": "combobox" }, listeners: { "blur": "handleBlur()", "keydown": "handleKeyDown($event)" }, properties: { "class.open": "isPopupOpen()", "autocomplete": "autocomplete", "attr.aria-autocomplete": "showHint ? \"both\" : \"list\"", "attr.aria-activedescendant": "activeDescendant", "attr.aria-owns": "isPopupOpen() ? popupId : null", "attr.aria-expanded": "isPopupOpen()" } }, providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => NgbTypeahead), multi: true }], exportAs: ["ngbTypeahead"], usesOnChanges: true, ngImport: i0 }); }
}
export { NgbTypeahead };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbTypeahead, decorators: [{
            type: Directive,
            args: [{
                    selector: 'input[ngbTypeahead]',
                    exportAs: 'ngbTypeahead',
                    standalone: true,
                    host: {
                        '(blur)': 'handleBlur()',
                        '[class.open]': 'isPopupOpen()',
                        '(keydown)': 'handleKeyDown($event)',
                        '[autocomplete]': 'autocomplete',
                        autocapitalize: 'off',
                        autocorrect: 'off',
                        role: 'combobox',
                        '[attr.aria-autocomplete]': 'showHint ? "both" : "list"',
                        '[attr.aria-activedescendant]': 'activeDescendant',
                        '[attr.aria-owns]': 'isPopupOpen() ? popupId : null',
                        '[attr.aria-expanded]': 'isPopupOpen()',
                    },
                    providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => NgbTypeahead), multi: true }],
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.ViewContainerRef }, { type: i0.Renderer2 }, { type: i0.Injector }, { type: i1.NgbTypeaheadConfig }, { type: i0.NgZone }, { type: i2.Live }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i0.NgZone }, { type: i0.ChangeDetectorRef }, { type: i0.ApplicationRef }]; }, propDecorators: { autocomplete: [{
                type: Input
            }], container: [{
                type: Input
            }], editable: [{
                type: Input
            }], focusFirst: [{
                type: Input
            }], inputFormatter: [{
                type: Input
            }], ngbTypeahead: [{
                type: Input
            }], resultFormatter: [{
                type: Input
            }], resultTemplate: [{
                type: Input
            }], selectOnExact: [{
                type: Input
            }], showHint: [{
                type: Input
            }], placement: [{
                type: Input
            }], popperOptions: [{
                type: Input
            }], popupClass: [{
                type: Input
            }], selectItem: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZWFoZWFkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3R5cGVhaGVhZC90eXBlYWhlYWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUlOLFNBQVMsRUFFVCxZQUFZLEVBQ1osVUFBVSxFQUNWLE1BQU0sRUFFTixLQUFLLEVBS0wsTUFBTSxHQUtOLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxTQUFTLEVBQWMsRUFBRSxFQUFvQixPQUFPLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBQzNHLE9BQU8sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBR3JELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ2xDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0MsT0FBTyxFQUFFLGNBQWMsRUFBa0IsTUFBTSxxQkFBcUIsQ0FBQztBQUVyRSxPQUFPLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUduRCxPQUFPLEVBQUUsa0JBQWtCLEVBQXlCLE1BQU0sb0JBQW9CLENBQUM7QUFDL0UsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDBCQUEwQixDQUFDOzs7O0FBaUIzRCxJQUFJLFlBQVksR0FBRyxDQUFDLENBQUM7QUFFckI7O0dBRUc7QUFDSCxNQW1CYSxZQUFZO0lBa0l4QixZQUNTLFdBQXlDLEVBQ2pELGdCQUFrQyxFQUMxQixTQUFvQixFQUM1QixRQUFrQixFQUNsQixNQUEwQixFQUMxQixNQUFjLEVBQ04sS0FB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UztzQkFBakIsS0FBSztnQkFRRyxhQUFhO3NCQUFyQixLQUFLO2dCQVdHLFVBQVU7c0JBQWxCLEtBQUs7Z0JBT0ksVUFBVTtzQkFBbkIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG5cdEFwcGxpY2F0aW9uUmVmLFxuXHRDaGFuZ2VEZXRlY3RvclJlZixcblx0Q29tcG9uZW50UmVmLFxuXHREaXJlY3RpdmUsXG5cdEVsZW1lbnRSZWYsXG5cdEV2ZW50RW1pdHRlcixcblx0Zm9yd2FyZFJlZixcblx0SW5qZWN0LFxuXHRJbmplY3Rvcixcblx0SW5wdXQsXG5cdE5nWm9uZSxcblx0T25DaGFuZ2VzLFxuXHRPbkRlc3Ryb3ksXG5cdE9uSW5pdCxcblx0T3V0cHV0LFxuXHRSZW5kZXJlcjIsXG5cdFNpbXBsZUNoYW5nZXMsXG5cdFRlbXBsYXRlUmVmLFxuXHRWaWV3Q29udGFpbmVyUmVmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgZnJvbUV2ZW50LCBPYnNlcnZhYmxlLCBvZiwgT3BlcmF0b3JGdW5jdGlvbiwgU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAsIHN3aXRjaE1hcCwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBMaXZlIH0gZnJvbSAnLi4vdXRpbC9hY2Nlc3NpYmlsaXR5L2xpdmUnO1xuaW1wb3J0IHsgbmdiQXV0b0Nsb3NlIH0gZnJvbSAnLi4vdXRpbC9hdXRvY2xvc2UnO1xuaW1wb3J0IHsgS2V5IH0gZnJvbSAnLi4vdXRpbC9rZXknO1xuaW1wb3J0IHsgUG9wdXBTZXJ2aWNlIH0gZnJvbSAnLi4vdXRpbC9wb3B1cCc7XG5pbXBvcnQgeyBuZ2JQb3NpdGlvbmluZywgUGxhY2VtZW50QXJyYXkgfSBmcm9tICcuLi91dGlsL3Bvc2l0aW9uaW5nJztcbmltcG9ydCB7IE9wdGlvbnMgfSBmcm9tICdAcG9wcGVyanMvY29yZSc7XG5pbXBvcnQgeyBpc0RlZmluZWQsIHRvU3RyaW5nIH0gZnJvbSAnLi4vdXRpbC91dGlsJztcblxuaW1wb3J0IHsgTmdiVHlwZWFoZWFkQ29uZmlnIH0gZnJvbSAnLi90eXBlYWhlYWQtY29uZmlnJztcbmltcG9ydCB7IE5nYlR5cGVhaGVhZFdpbmRvdywgUmVzdWx0VGVtcGxhdGVDb250ZXh0IH0gZnJvbSAnLi90eXBlYWhlYWQtd2luZG93JztcbmltcG9ydCB7IGFkZFBvcHBlck9mZnNldCB9IGZyb20gJy4uL3V0aWwvcG9zaXRpb25pbmctdXRpbCc7XG5cbi8qKlxuICogQW4gZXZlbnQgZW1pdHRlZCByaWdodCBiZWZvcmUgYW4gaXRlbSBpcyBzZWxlY3RlZCBmcm9tIHRoZSByZXN1bHQgbGlzdC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBOZ2JUeXBlYWhlYWRTZWxlY3RJdGVtRXZlbnQ8VCA9IGFueT4ge1xuXHQvKipcblx0ICogVGhlIGl0ZW0gZnJvbSB0aGUgcmVzdWx0IGxpc3QgYWJvdXQgdG8gYmUgc2VsZWN0ZWQuXG5cdCAqL1xuXHRpdGVtOiBUO1xuXG5cdC8qKlxuXHQgKiBDYWxsaW5nIHRoaXMgZnVuY3Rpb24gd2lsbCBwcmV2ZW50IGl0ZW0gc2VsZWN0aW9uIGZyb20gaGFwcGVuaW5nLlxuXHQgKi9cblx0cHJldmVudERlZmF1bHQ6ICgpID0+IHZvaWQ7XG59XG5cbmxldCBuZXh0V2luZG93SWQgPSAwO1xuXG4vKipcbiAqIEEgZGlyZWN0aXZlIHByb3ZpZGluZyBhIHNpbXBsZSB3YXkgb2YgY3JlYXRpbmcgcG93ZXJmdWwgdHlwZWFoZWFkcyBmcm9tIGFueSB0ZXh0IGlucHV0LlxuICovXG5ARGlyZWN0aXZlKHtcblx0c2VsZWN0b3I6ICdpbnB1dFtuZ2JUeXBlYWhlYWRdJyxcblx0ZXhwb3J0QXM6ICduZ2JUeXBlYWhlYWQnLFxuXHRzdGFuZGFsb25lOiB0cnVlLFxuXHRob3N0OiB7XG5cdFx0JyhibHVyKSc6ICdoYW5kbGVCbHVyKCknLFxuXHRcdCdbY2xhc3Mub3Blbl0nOiAnaXNQb3B1cE9wZW4oKScsXG5cdFx0JyhrZXlkb3duKSc6ICdoYW5kbGVLZXlEb3duKCRldmVudCknLFxuXHRcdCdbYXV0b2NvbXBsZXRlXSc6ICdhdXRvY29tcGxldGUnLFxuXHRcdGF1dG9jYXBpdGFsaXplOiAnb2ZmJyxcblx0XHRhdXRvY29ycmVjdDogJ29mZicsXG5cdFx0cm9sZTogJ2NvbWJvYm94Jyxcblx0XHQnW2F0dHIuYXJpYS1hdXRvY29tcGxldGVdJzogJ3Nob3dIaW50ID8gXCJib3RoXCIgOiBcImxpc3RcIicsXG5cdFx0J1thdHRyLmFyaWEtYWN0aXZlZGVzY2VuZGFudF0nOiAnYWN0aXZlRGVzY2VuZGFudCcsXG5cdFx0J1thdHRyLmFyaWEtb3duc10nOiAnaXNQb3B1cE9wZW4oKSA/IHBvcHVwSWQgOiBudWxsJyxcblx0XHQnW2F0dHIuYXJpYS1leHBhbmRlZF0nOiAnaXNQb3B1cE9wZW4oKScsXG5cdH0sXG5cdHByb3ZpZGVyczogW3sgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5nYlR5cGVhaGVhZCksIG11bHRpOiB0cnVlIH1dLFxufSlcbmV4cG9ydCBjbGFzcyBOZ2JUeXBlYWhlYWQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciwgT25Jbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG5cdHByaXZhdGUgX3BvcHVwU2VydmljZTogUG9wdXBTZXJ2aWNlPE5nYlR5cGVhaGVhZFdpbmRvdz47XG5cdHByaXZhdGUgX3N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uIHwgbnVsbCA9IG51bGw7XG5cdHByaXZhdGUgX2Nsb3NlZCQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXHRwcml2YXRlIF9pbnB1dFZhbHVlQmFja3VwOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcblx0cHJpdmF0ZSBfaW5wdXRWYWx1ZUZvclNlbGVjdE9uRXhhY3Q6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuXHRwcml2YXRlIF92YWx1ZUNoYW5nZXM6IE9ic2VydmFibGU8c3RyaW5nPjtcblx0cHJpdmF0ZSBfcmVzdWJzY3JpYmVUeXBlYWhlYWQ6IEJlaGF2aW9yU3ViamVjdDxhbnk+O1xuXHRwcml2YXRlIF93aW5kb3dSZWY6IENvbXBvbmVudFJlZjxOZ2JUeXBlYWhlYWRXaW5kb3c+IHwgbnVsbCA9IG51bGw7XG5cdHByaXZhdGUgX3pvbmVTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblx0cHJpdmF0ZSBfcG9zaXRpb25pbmc6IFJldHVyblR5cGU8dHlwZW9mIG5nYlBvc2l0aW9uaW5nPjtcblxuXHQvKipcblx0ICogVGhlIHZhbHVlIGZvciB0aGUgYGF1dG9jb21wbGV0ZWAgYXR0cmlidXRlIGZvciB0aGUgYDxpbnB1dD5gIGVsZW1lbnQuXG5cdCAqXG5cdCAqIERlZmF1bHRzIHRvIGBcIm9mZlwiYCB0byBkaXNhYmxlIHRoZSBuYXRpdmUgYnJvd3NlciBhdXRvY29tcGxldGUsIGJ1dCB5b3UgY2FuIG92ZXJyaWRlIGl0IGlmIG5lY2Vzc2FyeS5cblx0ICpcblx0ICogQHNpbmNlIDIuMS4wXG5cdCAqL1xuXHRASW5wdXQoKSBhdXRvY29tcGxldGUgPSAnb2ZmJztcblxuXHQvKipcblx0ICogQSBzZWxlY3RvciBzcGVjaWZ5aW5nIHRoZSBlbGVtZW50IHRoZSB0eXBlYWhlYWQgcG9wdXAgd2lsbCBiZSBhcHBlbmRlZCB0by5cblx0ICpcblx0ICogQ3VycmVudGx5IG9ubHkgc3VwcG9ydHMgYFwiYm9keVwiYC5cblx0ICovXG5cdEBJbnB1dCgpIGNvbnRhaW5lcjogc3RyaW5nO1xuXG5cdC8qKlxuXHQgKiBJZiBgdHJ1ZWAsIG1vZGVsIHZhbHVlcyB3aWxsIG5vdCBiZSByZXN0cmljdGVkIG9ubHkgdG8gaXRlbXMgc2VsZWN0ZWQgZnJvbSB0aGUgcG9wdXAuXG5cdCAqL1xuXHRASW5wdXQoKSBlZGl0YWJsZTogYm9vbGVhbjtcblxuXHQvKipcblx0ICogSWYgYHRydWVgLCB0aGUgZmlyc3QgaXRlbSBpbiB0aGUgcmVzdWx0IGxpc3Qgd2lsbCBhbHdheXMgc3RheSBmb2N1c2VkIHdoaWxlIHR5cGluZy5cblx0ICovXG5cdEBJbnB1dCgpIGZvY3VzRmlyc3Q6IGJvb2xlYW47XG5cblx0LyoqXG5cdCAqIFRoZSBmdW5jdGlvbiB0aGF0IGNvbnZlcnRzIGFuIGl0ZW0gZnJvbSB0aGUgcmVzdWx0IGxpc3QgdG8gYSBgc3RyaW5nYCB0byBkaXNwbGF5IGluIHRoZSBgPGlucHV0PmAgZmllbGQuXG5cdCAqXG5cdCAqIEl0IGlzIGNhbGxlZCB3aGVuIHRoZSB1c2VyIHNlbGVjdHMgc29tZXRoaW5nIGluIHRoZSBwb3B1cCBvciB0aGUgbW9kZWwgdmFsdWUgY2hhbmdlcywgc28gdGhlIGlucHV0IG5lZWRzIHRvXG5cdCAqIGJlIHVwZGF0ZWQuXG5cdCAqL1xuXHRASW5wdXQoKSBpbnB1dEZvcm1hdHRlcjogKGl0ZW06IGFueSkgPT4gc3RyaW5nO1xuXG5cdC8qKlxuXHQgKiBUaGUgZnVuY3Rpb24gdGhhdCBjb252ZXJ0cyBhIHN0cmVhbSBvZiB0ZXh0IHZhbHVlcyBmcm9tIHRoZSBgPGlucHV0PmAgZWxlbWVudCB0byB0aGUgc3RyZWFtIG9mIHRoZSBhcnJheSBvZiBpdGVtc1xuXHQgKiB0byBkaXNwbGF5IGluIHRoZSB0eXBlYWhlYWQgcG9wdXAuXG5cdCAqXG5cdCAqIElmIHRoZSByZXN1bHRpbmcgb2JzZXJ2YWJsZSBlbWl0cyBhIG5vbi1lbXB0eSBhcnJheSAtIHRoZSBwb3B1cCB3aWxsIGJlIHNob3duLiBJZiBpdCBlbWl0cyBhbiBlbXB0eSBhcnJheSAtIHRoZVxuXHQgKiBwb3B1cCB3aWxsIGJlIGNsb3NlZC5cblx0ICpcblx0ICogU2VlIHRoZSBbYmFzaWMgZXhhbXBsZV0oIy9jb21wb25lbnRzL3R5cGVhaGVhZC9leGFtcGxlcyNiYXNpYykgZm9yIG1vcmUgZGV0YWlscy5cblx0ICpcblx0ICogTm90ZSB0aGF0IHRoZSBgdGhpc2AgYXJndW1lbnQgaXMgYHVuZGVmaW5lZGAgc28geW91IG5lZWQgdG8gZXhwbGljaXRseSBiaW5kIGl0IHRvIGEgZGVzaXJlZCBcInRoaXNcIiB0YXJnZXQuXG5cdCAqL1xuXHRASW5wdXQoKSBuZ2JUeXBlYWhlYWQ6IE9wZXJhdG9yRnVuY3Rpb248c3RyaW5nLCByZWFkb25seSBhbnlbXT4gfCBudWxsIHwgdW5kZWZpbmVkO1xuXG5cdC8qKlxuXHQgKiBUaGUgZnVuY3Rpb24gdGhhdCBjb252ZXJ0cyBhbiBpdGVtIGZyb20gdGhlIHJlc3VsdCBsaXN0IHRvIGEgYHN0cmluZ2AgdG8gZGlzcGxheSBpbiB0aGUgcG9wdXAuXG5cdCAqXG5cdCAqIE11c3QgYmUgcHJvdmlkZWQsIGlmIHlvdXIgYG5nYlR5cGVhaGVhZGAgcmV0dXJucyBzb21ldGhpbmcgb3RoZXIgdGhhbiBgT2JzZXJ2YWJsZTxzdHJpbmdbXT5gLlxuXHQgKlxuXHQgKiBBbHRlcm5hdGl2ZWx5IGZvciBtb3JlIGNvbXBsZXggbWFya3VwIGluIHRoZSBwb3B1cCB5b3Ugc2hvdWxkIHVzZSBgcmVzdWx0VGVtcGxhdGVgLlxuXHQgKi9cblx0QElucHV0KCkgcmVzdWx0Rm9ybWF0dGVyOiAoaXRlbTogYW55KSA9PiBzdHJpbmc7XG5cblx0LyoqXG5cdCAqIFRoZSB0ZW1wbGF0ZSB0byBvdmVycmlkZSB0aGUgd2F5IHJlc3VsdGluZyBpdGVtcyBhcmUgZGlzcGxheWVkIGluIHRoZSBwb3B1cC5cblx0ICpcblx0ICogU2VlIHRoZSBbUmVzdWx0VGVtcGxhdGVDb250ZXh0XSgjL2NvbXBvbmVudHMvdHlwZWFoZWFkL2FwaSNSZXN1bHRUZW1wbGF0ZUNvbnRleHQpIGZvciB0aGUgdGVtcGxhdGUgY29udGV4dC5cblx0ICpcblx0ICogQWxzbyBzZWUgdGhlIFt0ZW1wbGF0ZSBmb3IgcmVzdWx0cyBkZW1vXSgjL2NvbXBvbmVudHMvdHlwZWFoZWFkL2V4YW1wbGVzI3RlbXBsYXRlKSBmb3IgbW9yZSBkZXRhaWxzLlxuXHQgKi9cblx0QElucHV0KCkgcmVzdWx0VGVtcGxhdGU6IFRlbXBsYXRlUmVmPFJlc3VsdFRlbXBsYXRlQ29udGV4dD47XG5cblx0LyoqXG5cdCAqIElmIGB0cnVlYCwgYXV0b21hdGljYWxseSBzZWxlY3RzIHRoZSBpdGVtIHdoZW4gaXQgaXMgdGhlIG9ubHkgb25lIHRoYXQgZXhhY3RseSBtYXRjaGVzIHRoZSB1c2VyIGlucHV0XG5cdCAqXG5cdCAqIEBzaW5jZSAxNC4yLjBcblx0ICovXG5cdEBJbnB1dCgpIHNlbGVjdE9uRXhhY3Q6IGJvb2xlYW47XG5cblx0LyoqXG5cdCAqIElmIGB0cnVlYCwgd2lsbCBzaG93IHRoZSBoaW50IGluIHRoZSBgPGlucHV0PmAgd2hlbiBhbiBpdGVtIGluIHRoZSByZXN1bHQgbGlzdCBtYXRjaGVzLlxuXHQgKi9cblx0QElucHV0KCkgc2hvd0hpbnQ6IGJvb2xlYW47XG5cblx0LyoqXG5cdCAqIFRoZSBwcmVmZXJyZWQgcGxhY2VtZW50IG9mIHRoZSB0eXBlYWhlYWQsIGFtb25nIHRoZSBbcG9zc2libGUgdmFsdWVzXSgjL2d1aWRlcy9wb3NpdGlvbmluZyNhcGkpLlxuXHQgKlxuXHQgKiBUaGUgZGVmYXVsdCBvcmRlciBvZiBwcmVmZXJlbmNlIGlzIGBcImJvdHRvbS1zdGFydCBib3R0b20tZW5kIHRvcC1zdGFydCB0b3AtZW5kXCJgXG5cdCAqXG5cdCAqIFBsZWFzZSBzZWUgdGhlIFtwb3NpdGlvbmluZyBvdmVydmlld10oIy9wb3NpdGlvbmluZykgZm9yIG1vcmUgZGV0YWlscy5cblx0ICovXG5cdEBJbnB1dCgpIHBsYWNlbWVudDogUGxhY2VtZW50QXJyYXkgPSAnYm90dG9tLXN0YXJ0JztcblxuXHQvKipcblx0ICogQWxsb3dzIHRvIGNoYW5nZSBkZWZhdWx0IFBvcHBlciBvcHRpb25zIHdoZW4gcG9zaXRpb25pbmcgdGhlIHR5cGVhaGVhZC5cblx0ICogUmVjZWl2ZXMgY3VycmVudCBwb3BwZXIgb3B0aW9ucyBhbmQgcmV0dXJucyBtb2RpZmllZCBvbmVzLlxuXHQgKlxuXHQgKiBAc2luY2UgMTMuMS4wXG5cdCAqL1xuXHRASW5wdXQoKSBwb3BwZXJPcHRpb25zOiAob3B0aW9uczogUGFydGlhbDxPcHRpb25zPikgPT4gUGFydGlhbDxPcHRpb25zPjtcblxuXHQvKipcblx0ICogQSBjdXN0b20gY2xhc3MgdG8gYXBwZW5kIHRvIHRoZSB0eXBlYWhlYWQgcG9wdXAgd2luZG93XG5cdCAqXG5cdCAqIEFjY2VwdHMgYSBzdHJpbmcgY29udGFpbmluZyBDU1MgY2xhc3MgdG8gYmUgYXBwbGllZCBvbiB0aGUgYG5nYi10eXBlYWhlYWQtd2luZG93YC5cblx0ICpcblx0ICogVGhpcyBjYW4gYmUgdXNlZCB0byBwcm92aWRlIGluc3RhbmNlLXNwZWNpZmljIHN0eWxpbmcsIGV4LiB5b3UgY2FuIG92ZXJyaWRlIHBvcHVwIHdpbmRvdyBgei1pbmRleGBcblx0ICpcblx0ICogQHNpbmNlIDkuMS4wXG5cdCAqL1xuXHRASW5wdXQoKSBwb3B1cENsYXNzOiBzdHJpbmc7XG5cblx0LyoqXG5cdCAqIEFuIGV2ZW50IGVtaXR0ZWQgcmlnaHQgYmVmb3JlIGFuIGl0ZW0gaXMgc2VsZWN0ZWQgZnJvbSB0aGUgcmVzdWx0IGxpc3QuXG5cdCAqXG5cdCAqIEV2ZW50IHBheWxvYWQgaXMgb2YgdHlwZSBbYE5nYlR5cGVhaGVhZFNlbGVjdEl0ZW1FdmVudGBdKCMvY29tcG9uZW50cy90eXBlYWhlYWQvYXBpI05nYlR5cGVhaGVhZFNlbGVjdEl0ZW1FdmVudCkuXG5cdCAqL1xuXHRAT3V0cHV0KCkgc2VsZWN0SXRlbSA9IG5ldyBFdmVudEVtaXR0ZXI8TmdiVHlwZWFoZWFkU2VsZWN0SXRlbUV2ZW50PigpO1xuXG5cdGFjdGl2ZURlc2NlbmRhbnQ6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuXHRwb3B1cElkID0gYG5nYi10eXBlYWhlYWQtJHtuZXh0V2luZG93SWQrK31gO1xuXG5cdHByaXZhdGUgX29uVG91Y2hlZCA9ICgpID0+IHt9O1xuXHRwcml2YXRlIF9vbkNoYW5nZSA9IChfOiBhbnkpID0+IHt9O1xuXG5cdGNvbnN0cnVjdG9yKFxuXHRcdHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTElucHV0RWxlbWVudD4sXG5cdFx0dmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZixcblx0XHRwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyLFxuXHRcdGluamVjdG9yOiBJbmplY3Rvcixcblx0XHRjb25maWc6IE5nYlR5cGVhaGVhZENvbmZpZyxcblx0XHRuZ1pvbmU6IE5nWm9uZSxcblx0XHRwcml2YXRlIF9saXZlOiBMaXZlLFxuXHRcdEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgX2RvY3VtZW50OiBhbnksXG5cdFx0cHJpdmF0ZSBfbmdab25lOiBOZ1pvbmUsXG5cdFx0cHJpdmF0ZSBfY2hhbmdlRGV0ZWN0b3I6IENoYW5nZURldGVjdG9yUmVmLFxuXHRcdGFwcGxpY2F0aW9uUmVmOiBBcHBsaWNhdGlvblJlZixcblx0KSB7XG5cdFx0dGhpcy5jb250YWluZXIgPSBjb25maWcuY29udGFpbmVyO1xuXHRcdHRoaXMuZWRpdGFibGUgPSBjb25maWcuZWRpdGFibGU7XG5cdFx0dGhpcy5mb2N1c0ZpcnN0ID0gY29uZmlnLmZvY3VzRmlyc3Q7XG5cdFx0dGhpcy5zZWxlY3RPbkV4YWN0ID0gY29uZmlnLnNlbGVjdE9uRXhhY3Q7XG5cdFx0dGhpcy5zaG93SGludCA9IGNvbmZpZy5zaG93SGludDtcblx0XHR0aGlzLnBsYWNlbWVudCA9IGNvbmZpZy5wbGFjZW1lbnQ7XG5cdFx0dGhpcy5wb3BwZXJPcHRpb25zID0gY29uZmlnLnBvcHBlck9wdGlvbnM7XG5cblx0XHR0aGlzLl92YWx1ZUNoYW5nZXMgPSBmcm9tRXZlbnQ8RXZlbnQ+KF9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdpbnB1dCcpLnBpcGUoXG5cdFx0XHRtYXAoKCRldmVudCkgPT4gKCRldmVudC50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWUpLFxuXHRcdCk7XG5cblx0XHR0aGlzLl9yZXN1YnNjcmliZVR5cGVhaGVhZCA9IG5ldyBCZWhhdmlvclN1YmplY3QobnVsbCk7XG5cblx0XHR0aGlzLl9wb3B1cFNlcnZpY2UgPSBuZXcgUG9wdXBTZXJ2aWNlPE5nYlR5cGVhaGVhZFdpbmRvdz4oXG5cdFx0XHROZ2JUeXBlYWhlYWRXaW5kb3csXG5cdFx0XHRpbmplY3Rvcixcblx0XHRcdHZpZXdDb250YWluZXJSZWYsXG5cdFx0XHRfcmVuZGVyZXIsXG5cdFx0XHR0aGlzLl9uZ1pvbmUsXG5cdFx0XHRhcHBsaWNhdGlvblJlZixcblx0XHQpO1xuXHRcdHRoaXMuX3Bvc2l0aW9uaW5nID0gbmdiUG9zaXRpb25pbmcoKTtcblx0fVxuXG5cdG5nT25Jbml0KCk6IHZvaWQge1xuXHRcdHRoaXMuX3N1YnNjcmliZVRvVXNlcklucHV0KCk7XG5cdH1cblxuXHRuZ09uQ2hhbmdlcyh7IG5nYlR5cGVhaGVhZCB9OiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG5cdFx0aWYgKG5nYlR5cGVhaGVhZCAmJiAhbmdiVHlwZWFoZWFkLmZpcnN0Q2hhbmdlKSB7XG5cdFx0XHR0aGlzLl91bnN1YnNjcmliZUZyb21Vc2VySW5wdXQoKTtcblx0XHRcdHRoaXMuX3N1YnNjcmliZVRvVXNlcklucHV0KCk7XG5cdFx0fVxuXHR9XG5cblx0bmdPbkRlc3Ryb3koKTogdm9pZCB7XG5cdFx0dGhpcy5fY2xvc2VQb3B1cCgpO1xuXHRcdHRoaXMuX3Vuc3Vic2NyaWJlRnJvbVVzZXJJbnB1dCgpO1xuXHR9XG5cblx0cmVnaXN0ZXJPbkNoYW5nZShmbjogKHZhbHVlOiBhbnkpID0+IGFueSk6IHZvaWQge1xuXHRcdHRoaXMuX29uQ2hhbmdlID0gZm47XG5cdH1cblxuXHRyZWdpc3Rlck9uVG91Y2hlZChmbjogKCkgPT4gYW55KTogdm9pZCB7XG5cdFx0dGhpcy5fb25Ub3VjaGVkID0gZm47XG5cdH1cblxuXHR3cml0ZVZhbHVlKHZhbHVlKSB7XG5cdFx0dGhpcy5fd3JpdGVJbnB1dFZhbHVlKHRoaXMuX2Zvcm1hdEl0ZW1Gb3JJbnB1dCh2YWx1ZSkpO1xuXHRcdGlmICh0aGlzLnNob3dIaW50KSB7XG5cdFx0XHR0aGlzLl9pbnB1dFZhbHVlQmFja3VwID0gdmFsdWU7XG5cdFx0fVxuXHR9XG5cblx0c2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XG5cdFx0dGhpcy5fcmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnZGlzYWJsZWQnLCBpc0Rpc2FibGVkKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBEaXNtaXNzZXMgdHlwZWFoZWFkIHBvcHVwIHdpbmRvd1xuXHQgKi9cblx0ZGlzbWlzc1BvcHVwKCkge1xuXHRcdGlmICh0aGlzLmlzUG9wdXBPcGVuKCkpIHtcblx0XHRcdHRoaXMuX3Jlc3Vic2NyaWJlVHlwZWFoZWFkLm5leHQobnVsbCk7XG5cdFx0XHR0aGlzLl9jbG9zZVBvcHVwKCk7XG5cdFx0XHRpZiAodGhpcy5zaG93SGludCAmJiB0aGlzLl9pbnB1dFZhbHVlQmFja3VwICE9PSBudWxsKSB7XG5cdFx0XHRcdHRoaXMuX3dyaXRlSW5wdXRWYWx1ZSh0aGlzLl9pbnB1dFZhbHVlQmFja3VwKTtcblx0XHRcdH1cblx0XHRcdHRoaXMuX2NoYW5nZURldGVjdG9yLm1hcmtGb3JDaGVjaygpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIHRydWUgaWYgdGhlIHR5cGVhaGVhZCBwb3B1cCB3aW5kb3cgaXMgZGlzcGxheWVkXG5cdCAqL1xuXHRpc1BvcHVwT3BlbigpIHtcblx0XHRyZXR1cm4gdGhpcy5fd2luZG93UmVmICE9IG51bGw7XG5cdH1cblxuXHRoYW5kbGVCbHVyKCkge1xuXHRcdHRoaXMuX3Jlc3Vic2NyaWJlVHlwZWFoZWFkLm5leHQobnVsbCk7XG5cdFx0dGhpcy5fb25Ub3VjaGVkKCk7XG5cdH1cblxuXHRoYW5kbGVLZXlEb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG5cdFx0aWYgKCF0aGlzLmlzUG9wdXBPcGVuKCkpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZGVwcmVjYXRpb24vZGVwcmVjYXRpb24gKi9cblx0XHRzd2l0Y2ggKGV2ZW50LndoaWNoKSB7XG5cdFx0XHRjYXNlIEtleS5BcnJvd0Rvd246XG5cdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdHRoaXMuX3dpbmRvd1JlZiEuaW5zdGFuY2UubmV4dCgpO1xuXHRcdFx0XHR0aGlzLl9zaG93SGludCgpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgS2V5LkFycm93VXA6XG5cdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdHRoaXMuX3dpbmRvd1JlZiEuaW5zdGFuY2UucHJldigpO1xuXHRcdFx0XHR0aGlzLl9zaG93SGludCgpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgS2V5LkVudGVyOlxuXHRcdFx0Y2FzZSBLZXkuVGFiOiB7XG5cdFx0XHRcdGNvbnN0IHJlc3VsdCA9IHRoaXMuX3dpbmRvd1JlZiEuaW5zdGFuY2UuZ2V0QWN0aXZlKCk7XG5cdFx0XHRcdGlmIChpc0RlZmluZWQocmVzdWx0KSkge1xuXHRcdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0XHRcdFx0dGhpcy5fc2VsZWN0UmVzdWx0KHJlc3VsdCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0dGhpcy5fY2xvc2VQb3B1cCgpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRwcml2YXRlIF9vcGVuUG9wdXAoKSB7XG5cdFx0aWYgKCF0aGlzLmlzUG9wdXBPcGVuKCkpIHtcblx0XHRcdHRoaXMuX2lucHV0VmFsdWVCYWNrdXAgPSB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQudmFsdWU7XG5cdFx0XHRjb25zdCB7IHdpbmRvd1JlZiB9ID0gdGhpcy5fcG9wdXBTZXJ2aWNlLm9wZW4oKTtcblx0XHRcdHRoaXMuX3dpbmRvd1JlZiA9IHdpbmRvd1JlZjtcblx0XHRcdHRoaXMuX3dpbmRvd1JlZi5zZXRJbnB1dCgnaWQnLCB0aGlzLnBvcHVwSWQpO1xuXHRcdFx0dGhpcy5fd2luZG93UmVmLnNldElucHV0KCdwb3B1cENsYXNzJywgdGhpcy5wb3B1cENsYXNzKTtcblx0XHRcdHRoaXMuX3dpbmRvd1JlZi5pbnN0YW5jZS5zZWxlY3RFdmVudC5zdWJzY3JpYmUoKHJlc3VsdDogYW55KSA9PiB0aGlzLl9zZWxlY3RSZXN1bHRDbG9zZVBvcHVwKHJlc3VsdCkpO1xuXHRcdFx0dGhpcy5fd2luZG93UmVmLmluc3RhbmNlLmFjdGl2ZUNoYW5nZUV2ZW50LnN1YnNjcmliZSgoYWN0aXZlSWQ6IHN0cmluZykgPT4gKHRoaXMuYWN0aXZlRGVzY2VuZGFudCA9IGFjdGl2ZUlkKSk7XG5cblx0XHRcdGlmICh0aGlzLmNvbnRhaW5lciA9PT0gJ2JvZHknKSB7XG5cdFx0XHRcdHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX3dpbmRvd1JlZi5sb2NhdGlvbi5uYXRpdmVFbGVtZW50LCAnei1pbmRleCcsICcxMDU1Jyk7XG5cdFx0XHRcdHRoaXMuX2RvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5jb250YWluZXIpLmFwcGVuZENoaWxkKHRoaXMuX3dpbmRvd1JlZi5sb2NhdGlvbi5uYXRpdmVFbGVtZW50KTtcblx0XHRcdH1cblxuXHRcdFx0dGhpcy5fY2hhbmdlRGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XG5cblx0XHRcdC8vIFNldHRpbmcgdXAgcG9wcGVyIGFuZCBzY2hlZHVsaW5nIHVwZGF0ZXMgd2hlbiB6b25lIGlzIHN0YWJsZVxuXHRcdFx0dGhpcy5fbmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcblx0XHRcdFx0aWYgKHRoaXMuX3dpbmRvd1JlZikge1xuXHRcdFx0XHRcdHRoaXMuX3Bvc2l0aW9uaW5nLmNyZWF0ZVBvcHBlcih7XG5cdFx0XHRcdFx0XHRob3N0RWxlbWVudDogdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LFxuXHRcdFx0XHRcdFx0dGFyZ2V0RWxlbWVudDogdGhpcy5fd2luZG93UmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQsXG5cdFx0XHRcdFx0XHRwbGFjZW1lbnQ6IHRoaXMucGxhY2VtZW50LFxuXHRcdFx0XHRcdFx0YXBwZW5kVG9Cb2R5OiB0aGlzLmNvbnRhaW5lciA9PT0gJ2JvZHknLFxuXHRcdFx0XHRcdFx0dXBkYXRlUG9wcGVyT3B0aW9uczogKG9wdGlvbnMpID0+IHRoaXMucG9wcGVyT3B0aW9ucyhhZGRQb3BwZXJPZmZzZXQoWzAsIDJdKShvcHRpb25zKSksXG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHR0aGlzLl96b25lU3Vic2NyaXB0aW9uID0gdGhpcy5fbmdab25lLm9uU3RhYmxlLnN1YnNjcmliZSgoKSA9PiB0aGlzLl9wb3NpdGlvbmluZy51cGRhdGUoKSk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0XHRuZ2JBdXRvQ2xvc2UodGhpcy5fbmdab25lLCB0aGlzLl9kb2N1bWVudCwgJ291dHNpZGUnLCAoKSA9PiB0aGlzLmRpc21pc3NQb3B1cCgpLCB0aGlzLl9jbG9zZWQkLCBbXG5cdFx0XHRcdHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCxcblx0XHRcdFx0dGhpcy5fd2luZG93UmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQsXG5cdFx0XHRdKTtcblx0XHR9XG5cdH1cblxuXHRwcml2YXRlIF9jbG9zZVBvcHVwKCkge1xuXHRcdHRoaXMuX3BvcHVwU2VydmljZS5jbG9zZSgpLnN1YnNjcmliZSgoKSA9PiB7XG5cdFx0XHR0aGlzLl9wb3NpdGlvbmluZy5kZXN0cm95KCk7XG5cdFx0XHR0aGlzLl96b25lU3Vic2NyaXB0aW9uPy51bnN1YnNjcmliZSgpO1xuXHRcdFx0dGhpcy5fY2xvc2VkJC5uZXh0KCk7XG5cdFx0XHR0aGlzLl93aW5kb3dSZWYgPSBudWxsO1xuXHRcdFx0dGhpcy5hY3RpdmVEZXNjZW5kYW50ID0gbnVsbDtcblx0XHR9KTtcblx0fVxuXG5cdHByaXZhdGUgX3NlbGVjdFJlc3VsdChyZXN1bHQ6IGFueSkge1xuXHRcdGxldCBkZWZhdWx0UHJldmVudGVkID0gZmFsc2U7XG5cdFx0dGhpcy5zZWxlY3RJdGVtLmVtaXQoe1xuXHRcdFx0aXRlbTogcmVzdWx0LFxuXHRcdFx0cHJldmVudERlZmF1bHQ6ICgpID0+IHtcblx0XHRcdFx0ZGVmYXVsdFByZXZlbnRlZCA9IHRydWU7XG5cdFx0XHR9LFxuXHRcdH0pO1xuXHRcdHRoaXMuX3Jlc3Vic2NyaWJlVHlwZWFoZWFkLm5leHQobnVsbCk7XG5cblx0XHRpZiAoIWRlZmF1bHRQcmV2ZW50ZWQpIHtcblx0XHRcdHRoaXMud3JpdGVWYWx1ZShyZXN1bHQpO1xuXHRcdFx0dGhpcy5fb25DaGFuZ2UocmVzdWx0KTtcblx0XHR9XG5cdH1cblxuXHRwcml2YXRlIF9zZWxlY3RSZXN1bHRDbG9zZVBvcHVwKHJlc3VsdDogYW55KSB7XG5cdFx0dGhpcy5fc2VsZWN0UmVzdWx0KHJlc3VsdCk7XG5cdFx0dGhpcy5fY2xvc2VQb3B1cCgpO1xuXHR9XG5cblx0cHJpdmF0ZSBfc2hvd0hpbnQoKSB7XG5cdFx0aWYgKHRoaXMuc2hvd0hpbnQgJiYgdGhpcy5fd2luZG93UmVmPy5pbnN0YW5jZS5oYXNBY3RpdmUoKSAmJiB0aGlzLl9pbnB1dFZhbHVlQmFja3VwICE9IG51bGwpIHtcblx0XHRcdGNvbnN0IHVzZXJJbnB1dExvd2VyQ2FzZSA9IHRoaXMuX2lucHV0VmFsdWVCYWNrdXAudG9Mb3dlckNhc2UoKTtcblx0XHRcdGNvbnN0IGZvcm1hdHRlZFZhbCA9IHRoaXMuX2Zvcm1hdEl0ZW1Gb3JJbnB1dCh0aGlzLl93aW5kb3dSZWYuaW5zdGFuY2UuZ2V0QWN0aXZlKCkpO1xuXG5cdFx0XHRpZiAodXNlcklucHV0TG93ZXJDYXNlID09PSBmb3JtYXR0ZWRWYWwuc3Vic3RyaW5nKDAsIHRoaXMuX2lucHV0VmFsdWVCYWNrdXAubGVuZ3RoKS50b0xvd2VyQ2FzZSgpKSB7XG5cdFx0XHRcdHRoaXMuX3dyaXRlSW5wdXRWYWx1ZSh0aGlzLl9pbnB1dFZhbHVlQmFja3VwICsgZm9ybWF0dGVkVmFsLnN1YnN0cmluZyh0aGlzLl9pbnB1dFZhbHVlQmFja3VwLmxlbmd0aCkpO1xuXHRcdFx0XHR0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnRbJ3NldFNlbGVjdGlvblJhbmdlJ10uYXBwbHkodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCBbXG5cdFx0XHRcdFx0dGhpcy5faW5wdXRWYWx1ZUJhY2t1cC5sZW5ndGgsXG5cdFx0XHRcdFx0Zm9ybWF0dGVkVmFsLmxlbmd0aCxcblx0XHRcdFx0XSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLl93cml0ZUlucHV0VmFsdWUoZm9ybWF0dGVkVmFsKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRwcml2YXRlIF9mb3JtYXRJdGVtRm9ySW5wdXQoaXRlbTogYW55KTogc3RyaW5nIHtcblx0XHRyZXR1cm4gaXRlbSAhPSBudWxsICYmIHRoaXMuaW5wdXRGb3JtYXR0ZXIgPyB0aGlzLmlucHV0Rm9ybWF0dGVyKGl0ZW0pIDogdG9TdHJpbmcoaXRlbSk7XG5cdH1cblxuXHRwcml2YXRlIF93cml0ZUlucHV0VmFsdWUodmFsdWU6IHN0cmluZyk6IHZvaWQge1xuXHRcdHRoaXMuX3JlbmRlcmVyLnNldFByb3BlcnR5KHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ3ZhbHVlJywgdG9TdHJpbmcodmFsdWUpKTtcblx0fVxuXG5cdHByaXZhdGUgX3N1YnNjcmliZVRvVXNlcklucHV0KCk6IHZvaWQge1xuXHRcdGNvbnN0IHJlc3VsdHMkID0gdGhpcy5fdmFsdWVDaGFuZ2VzLnBpcGUoXG5cdFx0XHR0YXAoKHZhbHVlKSA9PiB7XG5cdFx0XHRcdHRoaXMuX2lucHV0VmFsdWVCYWNrdXAgPSB0aGlzLnNob3dIaW50ID8gdmFsdWUgOiBudWxsO1xuXHRcdFx0XHR0aGlzLl9pbnB1dFZhbHVlRm9yU2VsZWN0T25FeGFjdCA9IHRoaXMuc2VsZWN0T25FeGFjdCA/IHZhbHVlIDogbnVsbDtcblx0XHRcdFx0dGhpcy5fb25DaGFuZ2UodGhpcy5lZGl0YWJsZSA/IHZhbHVlIDogdW5kZWZpbmVkKTtcblx0XHRcdH0pLFxuXHRcdFx0dGhpcy5uZ2JUeXBlYWhlYWQgPyB0aGlzLm5nYlR5cGVhaGVhZCA6ICgpID0+IG9mKFtdKSxcblx0XHQpO1xuXG5cdFx0dGhpcy5fc3Vic2NyaXB0aW9uID0gdGhpcy5fcmVzdWJzY3JpYmVUeXBlYWhlYWQucGlwZShzd2l0Y2hNYXAoKCkgPT4gcmVzdWx0cyQpKS5zdWJzY3JpYmUoKHJlc3VsdHMpID0+IHtcblx0XHRcdGlmICghcmVzdWx0cyB8fCByZXN1bHRzLmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0XHR0aGlzLl9jbG9zZVBvcHVwKCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQvLyB3aGVuIHRoZXJlIGlzIG9ubHkgb25lIHJlc3VsdCBhbmQgdGhpcyBtYXRjaGVzIHRoZSBpbnB1dCB2YWx1ZVxuXHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0dGhpcy5zZWxlY3RPbkV4YWN0ICYmXG5cdFx0XHRcdFx0cmVzdWx0cy5sZW5ndGggPT09IDEgJiZcblx0XHRcdFx0XHR0aGlzLl9mb3JtYXRJdGVtRm9ySW5wdXQocmVzdWx0c1swXSkgPT09IHRoaXMuX2lucHV0VmFsdWVGb3JTZWxlY3RPbkV4YWN0XG5cdFx0XHRcdCkge1xuXHRcdFx0XHRcdHRoaXMuX3NlbGVjdFJlc3VsdChyZXN1bHRzWzBdKTtcblx0XHRcdFx0XHR0aGlzLl9jbG9zZVBvcHVwKCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhpcy5fb3BlblBvcHVwKCk7XG5cdFx0XHRcdFx0dGhpcy5fd2luZG93UmVmIS5pbnN0YW5jZS5mb2N1c0ZpcnN0ID0gdGhpcy5mb2N1c0ZpcnN0O1xuXHRcdFx0XHRcdHRoaXMuX3dpbmRvd1JlZiEuaW5zdGFuY2UucmVzdWx0cyA9IHJlc3VsdHM7XG5cdFx0XHRcdFx0dGhpcy5fd2luZG93UmVmIS5pbnN0YW5jZS50ZXJtID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnZhbHVlO1xuXHRcdFx0XHRcdGlmICh0aGlzLnJlc3VsdEZvcm1hdHRlcikge1xuXHRcdFx0XHRcdFx0dGhpcy5fd2luZG93UmVmIS5pbnN0YW5jZS5mb3JtYXR0ZXIgPSB0aGlzLnJlc3VsdEZvcm1hdHRlcjtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKHRoaXMucmVzdWx0VGVtcGxhdGUpIHtcblx0XHRcdFx0XHRcdHRoaXMuX3dpbmRvd1JlZiEuaW5zdGFuY2UucmVzdWx0VGVtcGxhdGUgPSB0aGlzLnJlc3VsdFRlbXBsYXRlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHR0aGlzLl93aW5kb3dSZWYhLmluc3RhbmNlLnJlc2V0QWN0aXZlKCk7XG5cblx0XHRcdFx0XHQvLyBUaGUgb2JzZXJ2YWJsZSBzdHJlYW0gd2UgYXJlIHN1YnNjcmliaW5nIHRvIG1pZ2h0IGhhdmUgYXN5bmMgc3RlcHNcblx0XHRcdFx0XHQvLyBhbmQgaWYgYSBjb21wb25lbnQgY29udGFpbmluZyB0eXBlYWhlYWQgaXMgdXNpbmcgdGhlIE9uUHVzaCBzdHJhdGVneVxuXHRcdFx0XHRcdC8vIHRoZSBjaGFuZ2UgZGV0ZWN0aW9uIHR1cm4gd291bGRuJ3QgYmUgaW52b2tlZCBhdXRvbWF0aWNhbGx5LlxuXHRcdFx0XHRcdHRoaXMuX3dpbmRvd1JlZiEuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuXG5cdFx0XHRcdFx0dGhpcy5fc2hvd0hpbnQoKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBsaXZlIGFubm91bmNlclxuXHRcdFx0Y29uc3QgY291bnQgPSByZXN1bHRzID8gcmVzdWx0cy5sZW5ndGggOiAwO1xuXHRcdFx0dGhpcy5fbGl2ZS5zYXkoY291bnQgPT09IDAgPyAnTm8gcmVzdWx0cyBhdmFpbGFibGUnIDogYCR7Y291bnR9IHJlc3VsdCR7Y291bnQgPT09IDEgPyAnJyA6ICdzJ30gYXZhaWxhYmxlYCk7XG5cdFx0fSk7XG5cdH1cblxuXHRwcml2YXRlIF91bnN1YnNjcmliZUZyb21Vc2VySW5wdXQoKSB7XG5cdFx0aWYgKHRoaXMuX3N1YnNjcmlwdGlvbikge1xuXHRcdFx0dGhpcy5fc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG5cdFx0fVxuXHRcdHRoaXMuX3N1YnNjcmlwdGlvbiA9IG51bGw7XG5cdH1cbn1cbiJdfQ==