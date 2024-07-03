import { of, Subject, zip } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { isPromise } from '../util/util';
/**
 * A reference to the currently opened (active) offcanvas.
 *
 * Instances of this class can be injected into your component passed as offcanvas content.
 * So you can `.close()` or `.dismiss()` the offcanvas window from your component.
 *
 * @since 12.1.0
 */
export class NgbActiveOffcanvas {
    /**
     * Closes the offcanvas with an optional `result` value.
     *
     * The `NgbOffcanvasRef.result` promise will be resolved with the provided value.
     */
    close(result) { }
    /**
     * Dismisses the offcanvas with an optional `reason` value.
     *
     * The `NgbOffcanvasRef.result` promise will be rejected with the provided value.
     */
    dismiss(reason) { }
}
/**
 * A reference to the newly opened offcanvas returned by the `NgbOffcanvas.open()` method.
 *
 * @since 12.1.0
 */
export class NgbOffcanvasRef {
    /**
     * The instance of a component used for the offcanvas content.
     *
     * When a `TemplateRef` is used as the content or when the offcanvas is closed, will return `undefined`.
     */
    get componentInstance() {
        if (this._contentRef && this._contentRef.componentRef) {
            return this._contentRef.componentRef.instance;
        }
    }
    /**
     * The observable that emits when the offcanvas is closed via the `.close()` method.
     *
     * It will emit the result passed to the `.close()` method.
     */
    get closed() {
        return this._closed.asObservable().pipe(takeUntil(this._hidden));
    }
    /**
     * The observable that emits when the offcanvas is dismissed via the `.dismiss()` method.
     *
     * It will emit the reason passed to the `.dismissed()` method by the user, or one of the internal
     * reasons like backdrop click or ESC key press.
     */
    get dismissed() {
        return this._dismissed.asObservable().pipe(takeUntil(this._hidden));
    }
    /**
     * The observable that emits when both offcanvas window and backdrop are closed and animations were finished.
     * At this point offcanvas and backdrop elements will be removed from the DOM tree.
     *
     * This observable will be completed after emitting.
     */
    get hidden() {
        return this._hidden.asObservable();
    }
    /**
     * The observable that emits when offcanvas is fully visible and animation was finished.
     * The offcanvas DOM element is always available synchronously after calling 'offcanvas.open()' service.
     *
     * This observable will be completed after emitting.
     * It will not emit, if offcanvas is closed before open animation is finished.
     */
    get shown() {
        return this._panelCmptRef.instance.shown.asObservable();
    }
    constructor(_panelCmptRef, _contentRef, _backdropCmptRef, _beforeDismiss) {
        this._panelCmptRef = _panelCmptRef;
        this._contentRef = _contentRef;
        this._backdropCmptRef = _backdropCmptRef;
        this._beforeDismiss = _beforeDismiss;
        this._closed = new Subject();
        this._dismissed = new Subject();
        this._hidden = new Subject();
        _panelCmptRef.instance.dismissEvent.subscribe((reason) => {
            this.dismiss(reason);
        });
        if (_backdropCmptRef) {
            _backdropCmptRef.instance.dismissEvent.subscribe((reason) => {
                this.dismiss(reason);
            });
        }
        this.result = new Promise((resolve, reject) => {
            this._resolve = resolve;
            this._reject = reject;
        });
        this.result.then(null, () => { });
    }
    /**
     * Closes the offcanvas with an optional `result` value.
     *
     * The `NgbMobalRef.result` promise will be resolved with the provided value.
     */
    close(result) {
        if (this._panelCmptRef) {
            this._closed.next(result);
            this._resolve(result);
            this._removeOffcanvasElements();
        }
    }
    _dismiss(reason) {
        this._dismissed.next(reason);
        this._reject(reason);
        this._removeOffcanvasElements();
    }
    /**
     * Dismisses the offcanvas with an optional `reason` value.
     *
     * The `NgbOffcanvasRef.result` promise will be rejected with the provided value.
     */
    dismiss(reason) {
        if (this._panelCmptRef) {
            if (!this._beforeDismiss) {
                this._dismiss(reason);
            }
            else {
                const dismiss = this._beforeDismiss();
                if (isPromise(dismiss)) {
                    dismiss.then((result) => {
                        if (result !== false) {
                            this._dismiss(reason);
                        }
                    }, () => { });
                }
                else if (dismiss !== false) {
                    this._dismiss(reason);
                }
            }
        }
    }
    _removeOffcanvasElements() {
        const panelTransition$ = this._panelCmptRef.instance.hide();
        const backdropTransition$ = this._backdropCmptRef ? this._backdropCmptRef.instance.hide() : of(undefined);
        // hiding panel
        panelTransition$.subscribe(() => {
            const { nativeElement } = this._panelCmptRef.location;
            nativeElement.parentNode.removeChild(nativeElement);
            this._panelCmptRef.destroy();
            if (this._contentRef && this._contentRef.viewRef) {
                this._contentRef.viewRef.destroy();
            }
            this._panelCmptRef = null;
            this._contentRef = null;
        });
        // hiding backdrop
        backdropTransition$.subscribe(() => {
            if (this._backdropCmptRef) {
                const { nativeElement } = this._backdropCmptRef.location;
                nativeElement.parentNode.removeChild(nativeElement);
                this._backdropCmptRef.destroy();
                this._backdropCmptRef = null;
            }
        });
        // all done
        zip(panelTransition$, backdropTransition$).subscribe(() => {
            this._hidden.next();
            this._hidden.complete();
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2ZmY2FudmFzLXJlZi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9vZmZjYW52YXMvb2ZmY2FudmFzLXJlZi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxPQUFPLEVBQWMsRUFBRSxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDcEQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRzNDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFJekM7Ozs7Ozs7R0FPRztBQUNILE1BQU0sT0FBTyxrQkFBa0I7SUFDOUI7Ozs7T0FJRztJQUNILEtBQUssQ0FBQyxNQUFZLElBQVMsQ0FBQztJQUU1Qjs7OztPQUlHO0lBQ0gsT0FBTyxDQUFDLE1BQVksSUFBUyxDQUFDO0NBQzlCO0FBRUQ7Ozs7R0FJRztBQUNILE1BQU0sT0FBTyxlQUFlO0lBTzNCOzs7O09BSUc7SUFDSCxJQUFJLGlCQUFpQjtRQUNwQixJQUFJLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUU7WUFDdEQsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUM7U0FDOUM7SUFDRixDQUFDO0lBT0Q7Ozs7T0FJRztJQUNILElBQUksTUFBTTtRQUNULE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILElBQUksU0FBUztRQUNaLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQ3JFLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILElBQUksTUFB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QkFBZ0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDaEMsSUFBSSxDQUFDLGdCQUFnQixHQUFRLElBQUksQ0FBQzthQUNsQztRQUNGLENBQUMsQ0FBQyxDQUFDO1FBRUgsV0FBVztRQUNYLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDekQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNwQixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3pCLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztDQUNEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE9ic2VydmFibGUsIG9mLCBTdWJqZWN0LCB6aXAgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgQ29udGVudFJlZiB9IGZyb20gJy4uL3V0aWwvcG9wdXAnO1xuaW1wb3J0IHsgaXNQcm9taXNlIH0gZnJvbSAnLi4vdXRpbC91dGlsJztcbmltcG9ydCB7IE5nYk9mZmNhbnZhc0JhY2tkcm9wIH0gZnJvbSAnLi9vZmZjYW52YXMtYmFja2Ryb3AnO1xuaW1wb3J0IHsgTmdiT2ZmY2FudmFzUGFuZWwgfSBmcm9tICcuL29mZmNhbnZhcy1wYW5lbCc7XG5cbi8qKlxuICogQSByZWZlcmVuY2UgdG8gdGhlIGN1cnJlbnRseSBvcGVuZWQgKGFjdGl2ZSkgb2ZmY2FudmFzLlxuICpcbiAqIEluc3RhbmNlcyBvZiB0aGlzIGNsYXNzIGNhbiBiZSBpbmplY3RlZCBpbnRvIHlvdXIgY29tcG9uZW50IHBhc3NlZCBhcyBvZmZjYW52YXMgY29udGVudC5cbiAqIFNvIHlvdSBjYW4gYC5jbG9zZSgpYCBvciBgLmRpc21pc3MoKWAgdGhlIG9mZmNhbnZhcyB3aW5kb3cgZnJvbSB5b3VyIGNvbXBvbmVudC5cbiAqXG4gKiBAc2luY2UgMTIuMS4wXG4gKi9cbmV4cG9ydCBjbGFzcyBOZ2JBY3RpdmVPZmZjYW52YXMge1xuXHQvKipcblx0ICogQ2xvc2VzIHRoZSBvZmZjYW52YXMgd2l0aCBhbiBvcHRpb25hbCBgcmVzdWx0YCB2YWx1ZS5cblx0ICpcblx0ICogVGhlIGBOZ2JPZmZjYW52YXNSZWYucmVzdWx0YCBwcm9taXNlIHdpbGwgYmUgcmVzb2x2ZWQgd2l0aCB0aGUgcHJvdmlkZWQgdmFsdWUuXG5cdCAqL1xuXHRjbG9zZShyZXN1bHQ/OiBhbnkpOiB2b2lkIHt9XG5cblx0LyoqXG5cdCAqIERpc21pc3NlcyB0aGUgb2ZmY2FudmFzIHdpdGggYW4gb3B0aW9uYWwgYHJlYXNvbmAgdmFsdWUuXG5cdCAqXG5cdCAqIFRoZSBgTmdiT2ZmY2FudmFzUmVmLnJlc3VsdGAgcHJvbWlzZSB3aWxsIGJlIHJlamVjdGVkIHdpdGggdGhlIHByb3ZpZGVkIHZhbHVlLlxuXHQgKi9cblx0ZGlzbWlzcyhyZWFzb24/OiBhbnkpOiB2b2lkIHt9XG59XG5cbi8qKlxuICogQSByZWZlcmVuY2UgdG8gdGhlIG5ld2x5IG9wZW5lZCBvZmZjYW52YXMgcmV0dXJuZWQgYnkgdGhlIGBOZ2JPZmZjYW52YXMub3BlbigpYCBtZXRob2QuXG4gKlxuICogQHNpbmNlIDEyLjEuMFxuICovXG5leHBvcnQgY2xhc3MgTmdiT2ZmY2FudmFzUmVmIHtcblx0cHJpdmF0ZSBfY2xvc2VkID0gbmV3IFN1YmplY3Q8YW55PigpO1xuXHRwcml2YXRlIF9kaXNtaXNzZWQgPSBuZXcgU3ViamVjdDxhbnk+KCk7XG5cdHByaXZhdGUgX2hpZGRlbiA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cdHByaXZhdGUgX3Jlc29sdmU6IChyZXN1bHQ/OiBhbnkpID0+IHZvaWQ7XG5cdHByaXZhdGUgX3JlamVjdDogKHJlYXNvbj86IGFueSkgPT4gdm9pZDtcblxuXHQvKipcblx0ICogVGhlIGluc3RhbmNlIG9mIGEgY29tcG9uZW50IHVzZWQgZm9yIHRoZSBvZmZjYW52YXMgY29udGVudC5cblx0ICpcblx0ICogV2hlbiBhIGBUZW1wbGF0ZVJlZmAgaXMgdXNlZCBhcyB0aGUgY29udGVudCBvciB3aGVuIHRoZSBvZmZjYW52YXMgaXMgY2xvc2VkLCB3aWxsIHJldHVybiBgdW5kZWZpbmVkYC5cblx0ICovXG5cdGdldCBjb21wb25lbnRJbnN0YW5jZSgpOiBhbnkge1xuXHRcdGlmICh0aGlzLl9jb250ZW50UmVmICYmIHRoaXMuX2NvbnRlbnRSZWYuY29tcG9uZW50UmVmKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5fY29udGVudFJlZi5jb21wb25lbnRSZWYuaW5zdGFuY2U7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSBwcm9taXNlIHRoYXQgaXMgcmVzb2x2ZWQgd2hlbiB0aGUgb2ZmY2FudmFzIGlzIGNsb3NlZCBhbmQgcmVqZWN0ZWQgd2hlbiB0aGUgb2ZmY2FudmFzIGlzIGRpc21pc3NlZC5cblx0ICovXG5cdHJlc3VsdDogUHJvbWlzZTxhbnk+O1xuXG5cdC8qKlxuXHQgKiBUaGUgb2JzZXJ2YWJsZSB0aGF0IGVtaXRzIHdoZW4gdGhlIG9mZmNhbnZhcyBpcyBjbG9zZWQgdmlhIHRoZSBgLmNsb3NlKClgIG1ldGhvZC5cblx0ICpcblx0ICogSXQgd2lsbCBlbWl0IHRoZSByZXN1bHQgcGFzc2VkIHRvIHRoZSBgLmNsb3NlKClgIG1ldGhvZC5cblx0ICovXG5cdGdldCBjbG9zZWQoKTogT2JzZXJ2YWJsZTxhbnk+IHtcblx0XHRyZXR1cm4gdGhpcy5fY2xvc2VkLmFzT2JzZXJ2YWJsZSgpLnBpcGUodGFrZVVudGlsKHRoaXMuX2hpZGRlbikpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSBvYnNlcnZhYmxlIHRoYXQgZW1pdHMgd2hlbiB0aGUgb2ZmY2FudmFzIGlzIGRpc21pc3NlZCB2aWEgdGhlIGAuZGlzbWlzcygpYCBtZXRob2QuXG5cdCAqXG5cdCAqIEl0IHdpbGwgZW1pdCB0aGUgcmVhc29uIHBhc3NlZCB0byB0aGUgYC5kaXNtaXNzZWQoKWAgbWV0aG9kIGJ5IHRoZSB1c2VyLCBvciBvbmUgb2YgdGhlIGludGVybmFsXG5cdCAqIHJlYXNvbnMgbGlrZSBiYWNrZHJvcCBjbGljayBvciBFU0Mga2V5IHByZXNzLlxuXHQgKi9cblx0Z2V0IGRpc21pc3NlZCgpOiBPYnNlcnZhYmxlPGFueT4ge1xuXHRcdHJldHVybiB0aGlzLl9kaXNtaXNzZWQuYXNPYnNlcnZhYmxlKCkucGlwZSh0YWtlVW50aWwodGhpcy5faGlkZGVuKSk7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIG9ic2VydmFibGUgdGhhdCBlbWl0cyB3aGVuIGJvdGggb2ZmY2FudmFzIHdpbmRvdyBhbmQgYmFja2Ryb3AgYXJlIGNsb3NlZCBhbmQgYW5pbWF0aW9ucyB3ZXJlIGZpbmlzaGVkLlxuXHQgKiBBdCB0aGlzIHBvaW50IG9mZmNhbnZhcyBhbmQgYmFja2Ryb3AgZWxlbWVudHMgd2lsbCBiZSByZW1vdmVkIGZyb20gdGhlIERPTSB0cmVlLlxuXHQgKlxuXHQgKiBUaGlzIG9ic2VydmFibGUgd2lsbCBiZSBjb21wbGV0ZWQgYWZ0ZXIgZW1pdHRpbmcuXG5cdCAqL1xuXHRnZXQgaGlkZGVuKCk6IE9ic2VydmFibGU8dm9pZD4ge1xuXHRcdHJldHVybiB0aGlzLl9oaWRkZW4uYXNPYnNlcnZhYmxlKCk7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIG9ic2VydmFibGUgdGhhdCBlbWl0cyB3aGVuIG9mZmNhbnZhcyBpcyBmdWxseSB2aXNpYmxlIGFuZCBhbmltYXRpb24gd2FzIGZpbmlzaGVkLlxuXHQgKiBUaGUgb2ZmY2FudmFzIERPTSBlbGVtZW50IGlzIGFsd2F5cyBhdmFpbGFibGUgc3luY2hyb25vdXNseSBhZnRlciBjYWxsaW5nICdvZmZjYW52YXMub3BlbigpJyBzZXJ2aWNlLlxuXHQgKlxuXHQgKiBUaGlzIG9ic2VydmFibGUgd2lsbCBiZSBjb21wbGV0ZWQgYWZ0ZXIgZW1pdHRpbmcuXG5cdCAqIEl0IHdpbGwgbm90IGVtaXQsIGlmIG9mZmNhbnZhcyBpcyBjbG9zZWQgYmVmb3JlIG9wZW4gYW5pbWF0aW9uIGlzIGZpbmlzaGVkLlxuXHQgKi9cblx0Z2V0IHNob3duKCk6IE9ic2VydmFibGU8dm9pZD4ge1xuXHRcdHJldHVybiB0aGlzLl9wYW5lbENtcHRSZWYuaW5zdGFuY2Uuc2hvd24uYXNPYnNlcnZhYmxlKCk7XG5cdH1cblxuXHRjb25zdHJ1Y3Rvcihcblx0XHRwcml2YXRlIF9wYW5lbENtcHRSZWY6IENvbXBvbmVudFJlZjxOZ2JPZmZjYW52YXNQYW5lbD4sXG5cdFx0cHJpdmF0ZSBfY29udGVudFJlZjogQ29udGVudFJlZixcblx0XHRwcml2YXRlIF9iYWNrZHJvcENtcHRSZWY/OiBDb21wb25lbnRSZWY8TmdiT2ZmY2FudmFzQmFja2Ryb3A+LFxuXHRcdHByaXZhdGUgX2JlZm9yZURpc21pc3M/OiAoKSA9PiBib29sZWFuIHwgUHJvbWlzZTxib29sZWFuPixcblx0KSB7XG5cdFx0X3BhbmVsQ21wdFJlZi5pbnN0YW5jZS5kaXNtaXNzRXZlbnQuc3Vic2NyaWJlKChyZWFzb246IGFueSkgPT4ge1xuXHRcdFx0dGhpcy5kaXNtaXNzKHJlYXNvbik7XG5cdFx0fSk7XG5cdFx0aWYgKF9iYWNrZHJvcENtcHRSZWYpIHtcblx0XHRcdF9iYWNrZHJvcENtcHRSZWYuaW5zdGFuY2UuZGlzbWlzc0V2ZW50LnN1YnNjcmliZSgocmVhc29uOiBhbnkpID0+IHtcblx0XHRcdFx0dGhpcy5kaXNtaXNzKHJlYXNvbik7XG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0dGhpcy5yZXN1bHQgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHR0aGlzLl9yZXNvbHZlID0gcmVzb2x2ZTtcblx0XHRcdHRoaXMuX3JlamVjdCA9IHJlamVjdDtcblx0XHR9KTtcblx0XHR0aGlzLnJlc3VsdC50aGVuKG51bGwsICgpID0+IHt9KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDbG9zZXMgdGhlIG9mZmNhbnZhcyB3aXRoIGFuIG9wdGlvbmFsIGByZXN1bHRgIHZhbHVlLlxuXHQgKlxuXHQgKiBUaGUgYE5nYk1vYmFsUmVmLnJlc3VsdGAgcHJvbWlzZSB3aWxsIGJlIHJlc29sdmVkIHdpdGggdGhlIHByb3ZpZGVkIHZhbHVlLlxuXHQgKi9cblx0Y2xvc2UocmVzdWx0PzogYW55KTogdm9pZCB7XG5cdFx0aWYgKHRoaXMuX3BhbmVsQ21wdFJlZikge1xuXHRcdFx0dGhpcy5fY2xvc2VkLm5leHQocmVzdWx0KTtcblx0XHRcdHRoaXMuX3Jlc29sdmUocmVzdWx0KTtcblx0XHRcdHRoaXMuX3JlbW92ZU9mZmNhbnZhc0VsZW1lbnRzKCk7XG5cdFx0fVxuXHR9XG5cblx0cHJpdmF0ZSBfZGlzbWlzcyhyZWFzb24/OiBhbnkpIHtcblx0XHR0aGlzLl9kaXNtaXNzZWQubmV4dChyZWFzb24pO1xuXHRcdHRoaXMuX3JlamVjdChyZWFzb24pO1xuXHRcdHRoaXMuX3JlbW92ZU9mZmNhbnZhc0VsZW1lbnRzKCk7XG5cdH1cblxuXHQvKipcblx0ICogRGlzbWlzc2VzIHRoZSBvZmZjYW52YXMgd2l0aCBhbiBvcHRpb25hbCBgcmVhc29uYCB2YWx1ZS5cblx0ICpcblx0ICogVGhlIGBOZ2JPZmZjYW52YXNSZWYucmVzdWx0YCBwcm9taXNlIHdpbGwgYmUgcmVqZWN0ZWQgd2l0aCB0aGUgcHJvdmlkZWQgdmFsdWUuXG5cdCAqL1xuXHRkaXNtaXNzKHJlYXNvbj86IGFueSk6IHZvaWQge1xuXHRcdGlmICh0aGlzLl9wYW5lbENtcHRSZWYpIHtcblx0XHRcdGlmICghdGhpcy5fYmVmb3JlRGlzbWlzcykge1xuXHRcdFx0XHR0aGlzLl9kaXNtaXNzKHJlYXNvbik7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRjb25zdCBkaXNtaXNzID0gdGhpcy5fYmVmb3JlRGlzbWlzcygpO1xuXHRcdFx0XHRpZiAoaXNQcm9taXNlKGRpc21pc3MpKSB7XG5cdFx0XHRcdFx0ZGlzbWlzcy50aGVuKFxuXHRcdFx0XHRcdFx0KHJlc3VsdCkgPT4ge1xuXHRcdFx0XHRcdFx0XHRpZiAocmVzdWx0ICE9PSBmYWxzZSkge1xuXHRcdFx0XHRcdFx0XHRcdHRoaXMuX2Rpc21pc3MocmVhc29uKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdCgpID0+IHt9LFxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdH0gZWxzZSBpZiAoZGlzbWlzcyAhPT0gZmFsc2UpIHtcblx0XHRcdFx0XHR0aGlzLl9kaXNtaXNzKHJlYXNvbik7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRwcml2YXRlIF9yZW1vdmVPZmZjYW52YXNFbGVtZW50cygpIHtcblx0XHRjb25zdCBwYW5lbFRyYW5zaXRpb24kID0gdGhpcy5fcGFuZWxDbXB0UmVmLmluc3RhbmNlLmhpZGUoKTtcblx0XHRjb25zdCBiYWNrZHJvcFRyYW5zaXRpb24kID0gdGhpcy5fYmFja2Ryb3BDbXB0UmVmID8gdGhpcy5fYmFja2Ryb3BDbXB0UmVmLmluc3RhbmNlLmhpZGUoKSA6IG9mKHVuZGVmaW5lZCk7XG5cblx0XHQvLyBoaWRpbmcgcGFuZWxcblx0XHRwYW5lbFRyYW5zaXRpb24kLnN1YnNjcmliZSgoKSA9PiB7XG5cdFx0XHRjb25zdCB7IG5hdGl2ZUVsZW1lbnQgfSA9IHRoaXMuX3BhbmVsQ21wdFJlZi5sb2NhdGlvbjtcblx0XHRcdG5hdGl2ZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChuYXRpdmVFbGVtZW50KTtcblx0XHRcdHRoaXMuX3BhbmVsQ21wdFJlZi5kZXN0cm95KCk7XG5cblx0XHRcdGlmICh0aGlzLl9jb250ZW50UmVmICYmIHRoaXMuX2NvbnRlbnRSZWYudmlld1JlZikge1xuXHRcdFx0XHR0aGlzLl9jb250ZW50UmVmLnZpZXdSZWYuZGVzdHJveSgpO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLl9wYW5lbENtcHRSZWYgPSA8YW55Pm51bGw7XG5cdFx0XHR0aGlzLl9jb250ZW50UmVmID0gPGFueT5udWxsO1xuXHRcdH0pO1xuXG5cdFx0Ly8gaGlkaW5nIGJhY2tkcm9wXG5cdFx0YmFja2Ryb3BUcmFuc2l0aW9uJC5zdWJzY3JpYmUoKCkgPT4ge1xuXHRcdFx0aWYgKHRoaXMuX2JhY2tkcm9wQ21wdFJlZikge1xuXHRcdFx0XHRjb25zdCB7IG5hdGl2ZUVsZW1lbnQgfSA9IHRoaXMuX2JhY2tkcm9wQ21wdFJlZi5sb2NhdGlvbjtcblx0XHRcdFx0bmF0aXZlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG5hdGl2ZUVsZW1lbnQpO1xuXHRcdFx0XHR0aGlzLl9iYWNrZHJvcENtcHRSZWYuZGVzdHJveSgpO1xuXHRcdFx0XHR0aGlzLl9iYWNrZHJvcENtcHRSZWYgPSA8YW55Pm51bGw7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHQvLyBhbGwgZG9uZVxuXHRcdHppcChwYW5lbFRyYW5zaXRpb24kLCBiYWNrZHJvcFRyYW5zaXRpb24kKS5zdWJzY3JpYmUoKCkgPT4ge1xuXHRcdFx0dGhpcy5faGlkZGVuLm5leHQoKTtcblx0XHRcdHRoaXMuX2hpZGRlbi5jb21wbGV0ZSgpO1xuXHRcdH0pO1xuXHR9XG59XG4iXX0=