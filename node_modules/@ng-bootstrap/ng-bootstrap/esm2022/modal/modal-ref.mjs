import { of, Subject, zip } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { isDefined } from '../util/util';
import { isPromise } from '../util/util';
/**
 * A reference to the currently opened (active) modal.
 *
 * Instances of this class can be injected into your component passed as modal content.
 * So you can `.update()`, `.close()` or `.dismiss()` the modal window from your component.
 */
export class NgbActiveModal {
    /**
     * Updates options of an opened modal.
     *
     * @since 14.2.0
     */
    update(options) { }
    /**
     * Closes the modal with an optional `result` value.
     *
     * The `NgbModalRef.result` promise will be resolved with the provided value.
     */
    close(result) { }
    /**
     * Dismisses the modal with an optional `reason` value.
     *
     * The `NgbModalRef.result` promise will be rejected with the provided value.
     */
    dismiss(reason) { }
}
const WINDOW_ATTRIBUTES = [
    'animation',
    'ariaLabelledBy',
    'ariaDescribedBy',
    'backdrop',
    'centered',
    'fullscreen',
    'keyboard',
    'scrollable',
    'size',
    'windowClass',
    'modalDialogClass',
];
const BACKDROP_ATTRIBUTES = ['animation', 'backdropClass'];
/**
 * A reference to the newly opened modal returned by the `NgbModal.open()` method.
 */
export class NgbModalRef {
    _applyWindowOptions(windowInstance, options) {
        WINDOW_ATTRIBUTES.forEach((optionName) => {
            if (isDefined(options[optionName])) {
                windowInstance[optionName] = options[optionName];
            }
        });
    }
    _applyBackdropOptions(backdropInstance, options) {
        BACKDROP_ATTRIBUTES.forEach((optionName) => {
            if (isDefined(options[optionName])) {
                backdropInstance[optionName] = options[optionName];
            }
        });
    }
    /**
     * Updates options of an opened modal.
     *
     * @since 14.2.0
     */
    update(options) {
        this._applyWindowOptions(this._windowCmptRef.instance, options);
        if (this._backdropCmptRef && this._backdropCmptRef.instance) {
            this._applyBackdropOptions(this._backdropCmptRef.instance, options);
        }
    }
    /**
     * The instance of a component used for the modal content.
     *
     * When a `TemplateRef` is used as the content or when the modal is closed, will return `undefined`.
     */
    get componentInstance() {
        if (this._contentRef && this._contentRef.componentRef) {
            return this._contentRef.componentRef.instance;
        }
    }
    /**
     * The observable that emits when the modal is closed via the `.close()` method.
     *
     * It will emit the result passed to the `.close()` method.
     *
     * @since 8.0.0
     */
    get closed() {
        return this._closed.asObservable().pipe(takeUntil(this._hidden));
    }
    /**
     * The observable that emits when the modal is dismissed via the `.dismiss()` method.
     *
     * It will emit the reason passed to the `.dismissed()` method by the user, or one of the internal
     * reasons like backdrop click or ESC key press.
     *
     * @since 8.0.0
     */
    get dismissed() {
        return this._dismissed.asObservable().pipe(takeUntil(this._hidden));
    }
    /**
     * The observable that emits when both modal window and backdrop are closed and animations were finished.
     * At this point modal and backdrop elements will be removed from the DOM tree.
     *
     * This observable will be completed after emitting.
     *
     * @since 8.0.0
     */
    get hidden() {
        return this._hidden.asObservable();
    }
    /**
     * The observable that emits when modal is fully visible and animation was finished.
     * Modal DOM element is always available synchronously after calling 'modal.open()' service.
     *
     * This observable will be completed after emitting.
     * It will not emit, if modal is closed before open animation is finished.
     *
     * @since 8.0.0
     */
    get shown() {
        return this._windowCmptRef.instance.shown.asObservable();
    }
    constructor(_windowCmptRef, _contentRef, _backdropCmptRef, _beforeDismiss) {
        this._windowCmptRef = _windowCmptRef;
        this._contentRef = _contentRef;
        this._backdropCmptRef = _backdropCmptRef;
        this._beforeDismiss = _beforeDismiss;
        this._closed = new Subject();
        this._dismissed = new Subject();
        this._hidden = new Subject();
        _windowCmptRef.instance.dismissEvent.subscribe((reason) => {
            this.dismiss(reason);
        });
        this.result = new Promise((resolve, reject) => {
            this._resolve = resolve;
            this._reject = reject;
        });
        this.result.then(null, () => { });
    }
    /**
     * Closes the modal with an optional `result` value.
     *
     * The `NgbMobalRef.result` promise will be resolved with the provided value.
     */
    close(result) {
        if (this._windowCmptRef) {
            this._closed.next(result);
            this._resolve(result);
            this._removeModalElements();
        }
    }
    _dismiss(reason) {
        this._dismissed.next(reason);
        this._reject(reason);
        this._removeModalElements();
    }
    /**
     * Dismisses the modal with an optional `reason` value.
     *
     * The `NgbModalRef.result` promise will be rejected with the provided value.
     */
    dismiss(reason) {
        if (this._windowCmptRef) {
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
    _removeModalElements() {
        const windowTransition$ = this._windowCmptRef.instance.hide();
        const backdropTransition$ = this._backdropCmptRef ? this._backdropCmptRef.instance.hide() : of(undefined);
        // hiding window
        windowTransition$.subscribe(() => {
            const { nativeElement } = this._windowCmptRef.location;
            nativeElement.parentNode.removeChild(nativeElement);
            this._windowCmptRef.destroy();
            if (this._contentRef && this._contentRef.viewRef) {
                this._contentRef.viewRef.destroy();
            }
            this._windowCmptRef = null;
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
        zip(windowTransition$, backdropTransition$).subscribe(() => {
            this._hidden.next();
            this._hidden.complete();
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtcmVmLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL21vZGFsL21vZGFsLXJlZi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxPQUFPLEVBQWMsRUFBRSxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDcEQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBSzNDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFHekMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUV6Qzs7Ozs7R0FLRztBQUNILE1BQU0sT0FBTyxjQUFjO0lBQzFCOzs7O09BSUc7SUFDSCxNQUFNLENBQUMsT0FBaUMsSUFBUyxDQUFDO0lBQ2xEOzs7O09BSUc7SUFDSCxLQUFLLENBQUMsTUFBWSxJQUFTLENBQUM7SUFFNUI7Ozs7T0FJRztJQUNILE9BQU8sQ0FBQyxNQUFZLElBQVMsQ0FBQztDQUM5QjtBQUVELE1BQU0saUJBQWlCLEdBQWE7SUFDbkMsV0FBVztJQUNYLGdCQUFnQjtJQUNoQixpQkFBaUI7SUFDakIsVUFBVTtJQUNWLFVBQVU7SUFDVixZQUFZO0lBQ1osVUFBVTtJQUNWLFlBQVk7SUFDWixNQUFNO0lBQ04sYUFBYTtJQUNiLGtCQUFrQjtDQUNsQixDQUFDO0FBQ0YsTUFBTSxtQkFBbUIsR0FBYSxDQUFDLFdBQVcsRUFBRSxlQUFlLENBQUMsQ0FBQztBQUVyRTs7R0FFRztBQUNILE1BQU0sT0FBTyxXQUFXO0lBT2YsbUJBQW1CLENBQUMsY0FBOEIsRUFBRSxPQUF3QjtRQUNuRixpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxVQUFrQixFQUFFLEVBQUU7WUFDaEQsSUFBSSxTQUFTLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUU7Z0JBQ25DLGNBQWMsQ0FBQyxVQUFVLENBQUMsR0FBRyxPQUFPLENBQUMsVUFBVSxD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SUFBSSxDQUFDO2FBQ2xDO1FBQ0YsQ0FBQyxDQUFDLENBQUM7UUFFSCxXQUFXO1FBQ1gsR0FBRyxDQUFDLGlCQUFpQixFQUFFLG1CQUFtQixDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUMxRCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3BCLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDekIsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0NBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YsIFN1YmplY3QsIHppcCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBOZ2JNb2RhbEJhY2tkcm9wIH0gZnJvbSAnLi9tb2RhbC1iYWNrZHJvcCc7XG5pbXBvcnQgeyBOZ2JNb2RhbFdpbmRvdyB9IGZyb20gJy4vbW9kYWwtd2luZG93JztcbmltcG9ydCB7IE5nYk1vZGFsT3B0aW9ucywgTmdiTW9kYWxVcGRhdGFibGVPcHRpb25zIH0gZnJvbSAnLi9tb2RhbC1jb25maWcnO1xuaW1wb3J0IHsgaXNEZWZpbmVkIH0gZnJvbSAnLi4vdXRpbC91dGlsJztcblxuaW1wb3J0IHsgQ29udGVudFJlZiB9IGZyb20gJy4uL3V0aWwvcG9wdXAnO1xuaW1wb3J0IHsgaXNQcm9taXNlIH0gZnJvbSAnLi4vdXRpbC91dGlsJztcblxuLyoqXG4gKiBBIHJlZmVyZW5jZSB0byB0aGUgY3VycmVudGx5IG9wZW5lZCAoYWN0aXZlKSBtb2RhbC5cbiAqXG4gKiBJbnN0YW5jZXMgb2YgdGhpcyBjbGFzcyBjYW4gYmUgaW5qZWN0ZWQgaW50byB5b3VyIGNvbXBvbmVudCBwYXNzZWQgYXMgbW9kYWwgY29udGVudC5cbiAqIFNvIHlvdSBjYW4gYC51cGRhdGUoKWAsIGAuY2xvc2UoKWAgb3IgYC5kaXNtaXNzKClgIHRoZSBtb2RhbCB3aW5kb3cgZnJvbSB5b3VyIGNvbXBvbmVudC5cbiAqL1xuZXhwb3J0IGNsYXNzIE5nYkFjdGl2ZU1vZGFsIHtcblx0LyoqXG5cdCAqIFVwZGF0ZXMgb3B0aW9ucyBvZiBhbiBvcGVuZWQgbW9kYWwuXG5cdCAqXG5cdCAqIEBzaW5jZSAxNC4yLjBcblx0ICovXG5cdHVwZGF0ZShvcHRpb25zOiBOZ2JNb2RhbFVwZGF0YWJsZU9wdGlvbnMpOiB2b2lkIHt9XG5cdC8qKlxuXHQgKiBDbG9zZXMgdGhlIG1vZGFsIHdpdGggYW4gb3B0aW9uYWwgYHJlc3VsdGAgdmFsdWUuXG5cdCAqXG5cdCAqIFRoZSBgTmdiTW9kYWxSZWYucmVzdWx0YCBwcm9taXNlIHdpbGwgYmUgcmVzb2x2ZWQgd2l0aCB0aGUgcHJvdmlkZWQgdmFsdWUuXG5cdCAqL1xuXHRjbG9zZShyZXN1bHQ/OiBhbnkpOiB2b2lkIHt9XG5cblx0LyoqXG5cdCAqIERpc21pc3NlcyB0aGUgbW9kYWwgd2l0aCBhbiBvcHRpb25hbCBgcmVhc29uYCB2YWx1ZS5cblx0ICpcblx0ICogVGhlIGBOZ2JNb2RhbFJlZi5yZXN1bHRgIHByb21pc2Ugd2lsbCBiZSByZWplY3RlZCB3aXRoIHRoZSBwcm92aWRlZCB2YWx1ZS5cblx0ICovXG5cdGRpc21pc3MocmVhc29uPzogYW55KTogdm9pZCB7fVxufVxuXG5jb25zdCBXSU5ET1dfQVRUUklCVVRFUzogc3RyaW5nW10gPSBbXG5cdCdhbmltYXRpb24nLFxuXHQnYXJpYUxhYmVsbGVkQnknLFxuXHQnYXJpYURlc2NyaWJlZEJ5Jyxcblx0J2JhY2tkcm9wJyxcblx0J2NlbnRlcmVkJyxcblx0J2Z1bGxzY3JlZW4nLFxuXHQna2V5Ym9hcmQnLFxuXHQnc2Nyb2xsYWJsZScsXG5cdCdzaXplJyxcblx0J3dpbmRvd0NsYXNzJyxcblx0J21vZGFsRGlhbG9nQ2xhc3MnLFxuXTtcbmNvbnN0IEJBQ0tEUk9QX0FUVFJJQlVURVM6IHN0cmluZ1tdID0gWydhbmltYXRpb24nLCAnYmFja2Ryb3BDbGFzcyddO1xuXG4vKipcbiAqIEEgcmVmZXJlbmNlIHRvIHRoZSBuZXdseSBvcGVuZWQgbW9kYWwgcmV0dXJuZWQgYnkgdGhlIGBOZ2JNb2RhbC5vcGVuKClgIG1ldGhvZC5cbiAqL1xuZXhwb3J0IGNsYXNzIE5nYk1vZGFsUmVmIHtcblx0cHJpdmF0ZSBfY2xvc2VkID0gbmV3IFN1YmplY3Q8YW55PigpO1xuXHRwcml2YXRlIF9kaXNtaXNzZWQgPSBuZXcgU3ViamVjdDxhbnk+KCk7XG5cdHByaXZhdGUgX2hpZGRlbiA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cdHByaXZhdGUgX3Jlc29sdmU6IChyZXN1bHQ/OiBhbnkpID0+IHZvaWQ7XG5cdHByaXZhdGUgX3JlamVjdDogKHJlYXNvbj86IGFueSkgPT4gdm9pZDtcblxuXHRwcml2YXRlIF9hcHBseVdpbmRvd09wdGlvbnMod2luZG93SW5zdGFuY2U6IE5nYk1vZGFsV2luZG93LCBvcHRpb25zOiBOZ2JNb2RhbE9wdGlvbnMpOiB2b2lkIHtcblx0XHRXSU5ET1dfQVRUUklCVVRFUy5mb3JFYWNoKChvcHRpb25OYW1lOiBzdHJpbmcpID0+IHtcblx0XHRcdGlmIChpc0RlZmluZWQob3B0aW9uc1tvcHRpb25OYW1lXSkpIHtcblx0XHRcdFx0d2luZG93SW5zdGFuY2Vbb3B0aW9uTmFtZV0gPSBvcHRpb25zW29wdGlvbk5hbWVdO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0cHJpdmF0ZSBfYXBwbHlCYWNrZHJvcE9wdGlvbnMoYmFja2Ryb3BJbnN0YW5jZTogTmdiTW9kYWxCYWNrZHJvcCwgb3B0aW9uczogTmdiTW9kYWxPcHRpb25zKTogdm9pZCB7XG5cdFx0QkFDS0RST1BfQVRUUklCVVRFUy5mb3JFYWNoKChvcHRpb25OYW1lOiBzdHJpbmcpID0+IHtcblx0XHRcdGlmIChpc0RlZmluZWQob3B0aW9uc1tvcHRpb25OYW1lXSkpIHtcblx0XHRcdFx0YmFja2Ryb3BJbnN0YW5jZVtvcHRpb25OYW1lXSA9IG9wdGlvbnNbb3B0aW9uTmFtZV07XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHQvKipcblx0ICogVXBkYXRlcyBvcHRpb25zIG9mIGFuIG9wZW5lZCBtb2RhbC5cblx0ICpcblx0ICogQHNpbmNlIDE0LjIuMFxuXHQgKi9cblx0dXBkYXRlKG9wdGlvbnM6IE5nYk1vZGFsVXBkYXRhYmxlT3B0aW9ucyk6IHZvaWQge1xuXHRcdHRoaXMuX2FwcGx5V2luZG93T3B0aW9ucyh0aGlzLl93aW5kb3dDbXB0UmVmLmluc3RhbmNlLCBvcHRpb25zKTtcblx0XHRpZiAodGhpcy5fYmFja2Ryb3BDbXB0UmVmICYmIHRoaXMuX2JhY2tkcm9wQ21wdFJlZi5pbnN0YW5jZSkge1xuXHRcdFx0dGhpcy5fYXBwbHlCYWNrZHJvcE9wdGlvbnModGhpcy5fYmFja2Ryb3BDbXB0UmVmLmluc3RhbmNlLCBvcHRpb25zKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogVGhlIGluc3RhbmNlIG9mIGEgY29tcG9uZW50IHVzZWQgZm9yIHRoZSBtb2RhbCBjb250ZW50LlxuXHQgKlxuXHQgKiBXaGVuIGEgYFRlbXBsYXRlUmVmYCBpcyB1c2VkIGFzIHRoZSBjb250ZW50IG9yIHdoZW4gdGhlIG1vZGFsIGlzIGNsb3NlZCwgd2lsbCByZXR1cm4gYHVuZGVmaW5lZGAuXG5cdCAqL1xuXHRnZXQgY29tcG9uZW50SW5zdGFuY2UoKTogYW55IHtcblx0XHRpZiAodGhpcy5fY29udGVudFJlZiAmJiB0aGlzLl9jb250ZW50UmVmLmNvbXBvbmVudFJlZikge1xuXHRcdFx0cmV0dXJuIHRoaXMuX2NvbnRlbnRSZWYuY29tcG9uZW50UmVmLmluc3RhbmNlO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgcHJvbWlzZSB0aGF0IGlzIHJlc29sdmVkIHdoZW4gdGhlIG1vZGFsIGlzIGNsb3NlZCBhbmQgcmVqZWN0ZWQgd2hlbiB0aGUgbW9kYWwgaXMgZGlzbWlzc2VkLlxuXHQgKi9cblx0cmVzdWx0OiBQcm9taXNlPGFueT47XG5cblx0LyoqXG5cdCAqIFRoZSBvYnNlcnZhYmxlIHRoYXQgZW1pdHMgd2hlbiB0aGUgbW9kYWwgaXMgY2xvc2VkIHZpYSB0aGUgYC5jbG9zZSgpYCBtZXRob2QuXG5cdCAqXG5cdCAqIEl0IHdpbGwgZW1pdCB0aGUgcmVzdWx0IHBhc3NlZCB0byB0aGUgYC5jbG9zZSgpYCBtZXRob2QuXG5cdCAqXG5cdCAqIEBzaW5jZSA4LjAuMFxuXHQgKi9cblx0Z2V0IGNsb3NlZCgpOiBPYnNlcnZhYmxlPGFueT4ge1xuXHRcdHJldHVybiB0aGlzLl9jbG9zZWQuYXNPYnNlcnZhYmxlKCkucGlwZSh0YWtlVW50aWwodGhpcy5faGlkZGVuKSk7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIG9ic2VydmFibGUgdGhhdCBlbWl0cyB3aGVuIHRoZSBtb2RhbCBpcyBkaXNtaXNzZWQgdmlhIHRoZSBgLmRpc21pc3MoKWAgbWV0aG9kLlxuXHQgKlxuXHQgKiBJdCB3aWxsIGVtaXQgdGhlIHJlYXNvbiBwYXNzZWQgdG8gdGhlIGAuZGlzbWlzc2VkKClgIG1ldGhvZCBieSB0aGUgdXNlciwgb3Igb25lIG9mIHRoZSBpbnRlcm5hbFxuXHQgKiByZWFzb25zIGxpa2UgYmFja2Ryb3AgY2xpY2sgb3IgRVNDIGtleSBwcmVzcy5cblx0ICpcblx0ICogQHNpbmNlIDguMC4wXG5cdCAqL1xuXHRnZXQgZGlzbWlzc2VkKCk6IE9ic2VydmFibGU8YW55PiB7XG5cdFx0cmV0dXJuIHRoaXMuX2Rpc21pc3NlZC5hc09ic2VydmFibGUoKS5waXBlKHRha2VVbnRpbCh0aGlzLl9oaWRkZW4pKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgb2JzZXJ2YWJsZSB0aGF0IGVtaXRzIHdoZW4gYm90aCBtb2RhbCB3aW5kb3cgYW5kIGJhY2tkcm9wIGFyZSBjbG9zZWQgYW5kIGFuaW1hdGlvbnMgd2VyZSBmaW5pc2hlZC5cblx0ICogQXQgdGhpcyBwb2ludCBtb2RhbCBhbmQgYmFja2Ryb3AgZWxlbWVudHMgd2lsbCBiZSByZW1vdmVkIGZyb20gdGhlIERPTSB0cmVlLlxuXHQgKlxuXHQgKiBUaGlzIG9ic2VydmFibGUgd2lsbCBiZSBjb21wbGV0ZWQgYWZ0ZXIgZW1pdHRpbmcuXG5cdCAqXG5cdCAqIEBzaW5jZSA4LjAuMFxuXHQgKi9cblx0Z2V0IGhpZGRlbigpOiBPYnNlcnZhYmxlPHZvaWQ+IHtcblx0XHRyZXR1cm4gdGhpcy5faGlkZGVuLmFzT2JzZXJ2YWJsZSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSBvYnNlcnZhYmxlIHRoYXQgZW1pdHMgd2hlbiBtb2RhbCBpcyBmdWxseSB2aXNpYmxlIGFuZCBhbmltYXRpb24gd2FzIGZpbmlzaGVkLlxuXHQgKiBNb2RhbCBET00gZWxlbWVudCBpcyBhbHdheXMgYXZhaWxhYmxlIHN5bmNocm9ub3VzbHkgYWZ0ZXIgY2FsbGluZyAnbW9kYWwub3BlbigpJyBzZXJ2aWNlLlxuXHQgKlxuXHQgKiBUaGlzIG9ic2VydmFibGUgd2lsbCBiZSBjb21wbGV0ZWQgYWZ0ZXIgZW1pdHRpbmcuXG5cdCAqIEl0IHdpbGwgbm90IGVtaXQsIGlmIG1vZGFsIGlzIGNsb3NlZCBiZWZvcmUgb3BlbiBhbmltYXRpb24gaXMgZmluaXNoZWQuXG5cdCAqXG5cdCAqIEBzaW5jZSA4LjAuMFxuXHQgKi9cblx0Z2V0IHNob3duKCk6IE9ic2VydmFibGU8dm9pZD4ge1xuXHRcdHJldHVybiB0aGlzLl93aW5kb3dDbXB0UmVmLmluc3RhbmNlLnNob3duLmFzT2JzZXJ2YWJsZSgpO1xuXHR9XG5cblx0Y29uc3RydWN0b3IoXG5cdFx0cHJpdmF0ZSBfd2luZG93Q21wdFJlZjogQ29tcG9uZW50UmVmPE5nYk1vZGFsV2luZG93Pixcblx0XHRwcml2YXRlIF9jb250ZW50UmVmOiBDb250ZW50UmVmLFxuXHRcdHByaXZhdGUgX2JhY2tkcm9wQ21wdFJlZj86IENvbXBvbmVudFJlZjxOZ2JNb2RhbEJhY2tkcm9wPixcblx0XHRwcml2YXRlIF9iZWZvcmVEaXNtaXNzPzogKCkgPT4gYm9vbGVhbiB8IFByb21pc2U8Ym9vbGVhbj4sXG5cdCkge1xuXHRcdF93aW5kb3dDbXB0UmVmLmluc3RhbmNlLmRpc21pc3NFdmVudC5zdWJzY3JpYmUoKHJlYXNvbjogYW55KSA9PiB7XG5cdFx0XHR0aGlzLmRpc21pc3MocmVhc29uKTtcblx0XHR9KTtcblxuXHRcdHRoaXMucmVzdWx0ID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0dGhpcy5fcmVzb2x2ZSA9IHJlc29sdmU7XG5cdFx0XHR0aGlzLl9yZWplY3QgPSByZWplY3Q7XG5cdFx0fSk7XG5cdFx0dGhpcy5yZXN1bHQudGhlbihudWxsLCAoKSA9PiB7fSk7XG5cdH1cblxuXHQvKipcblx0ICogQ2xvc2VzIHRoZSBtb2RhbCB3aXRoIGFuIG9wdGlvbmFsIGByZXN1bHRgIHZhbHVlLlxuXHQgKlxuXHQgKiBUaGUgYE5nYk1vYmFsUmVmLnJlc3VsdGAgcHJvbWlzZSB3aWxsIGJlIHJlc29sdmVkIHdpdGggdGhlIHByb3ZpZGVkIHZhbHVlLlxuXHQgKi9cblx0Y2xvc2UocmVzdWx0PzogYW55KTogdm9pZCB7XG5cdFx0aWYgKHRoaXMuX3dpbmRvd0NtcHRSZWYpIHtcblx0XHRcdHRoaXMuX2Nsb3NlZC5uZXh0KHJlc3VsdCk7XG5cdFx0XHR0aGlzLl9yZXNvbHZlKHJlc3VsdCk7XG5cdFx0XHR0aGlzLl9yZW1vdmVNb2RhbEVsZW1lbnRzKCk7XG5cdFx0fVxuXHR9XG5cblx0cHJpdmF0ZSBfZGlzbWlzcyhyZWFzb24/OiBhbnkpIHtcblx0XHR0aGlzLl9kaXNtaXNzZWQubmV4dChyZWFzb24pO1xuXHRcdHRoaXMuX3JlamVjdChyZWFzb24pO1xuXHRcdHRoaXMuX3JlbW92ZU1vZGFsRWxlbWVudHMoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBEaXNtaXNzZXMgdGhlIG1vZGFsIHdpdGggYW4gb3B0aW9uYWwgYHJlYXNvbmAgdmFsdWUuXG5cdCAqXG5cdCAqIFRoZSBgTmdiTW9kYWxSZWYucmVzdWx0YCBwcm9taXNlIHdpbGwgYmUgcmVqZWN0ZWQgd2l0aCB0aGUgcHJvdmlkZWQgdmFsdWUuXG5cdCAqL1xuXHRkaXNtaXNzKHJlYXNvbj86IGFueSk6IHZvaWQge1xuXHRcdGlmICh0aGlzLl93aW5kb3dDbXB0UmVmKSB7XG5cdFx0XHRpZiAoIXRoaXMuX2JlZm9yZURpc21pc3MpIHtcblx0XHRcdFx0dGhpcy5fZGlzbWlzcyhyZWFzb24pO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Y29uc3QgZGlzbWlzcyA9IHRoaXMuX2JlZm9yZURpc21pc3MoKTtcblx0XHRcdFx0aWYgKGlzUHJvbWlzZShkaXNtaXNzKSkge1xuXHRcdFx0XHRcdGRpc21pc3MudGhlbihcblx0XHRcdFx0XHRcdChyZXN1bHQpID0+IHtcblx0XHRcdFx0XHRcdFx0aWYgKHJlc3VsdCAhPT0gZmFsc2UpIHtcblx0XHRcdFx0XHRcdFx0XHR0aGlzLl9kaXNtaXNzKHJlYXNvbik7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHQoKSA9PiB7fSxcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKGRpc21pc3MgIT09IGZhbHNlKSB7XG5cdFx0XHRcdFx0dGhpcy5fZGlzbWlzcyhyZWFzb24pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cHJpdmF0ZSBfcmVtb3ZlTW9kYWxFbGVtZW50cygpIHtcblx0XHRjb25zdCB3aW5kb3dUcmFuc2l0aW9uJCA9IHRoaXMuX3dpbmRvd0NtcHRSZWYuaW5zdGFuY2UuaGlkZSgpO1xuXHRcdGNvbnN0IGJhY2tkcm9wVHJhbnNpdGlvbiQgPSB0aGlzLl9iYWNrZHJvcENtcHRSZWYgPyB0aGlzLl9iYWNrZHJvcENtcHRSZWYuaW5zdGFuY2UuaGlkZSgpIDogb2YodW5kZWZpbmVkKTtcblxuXHRcdC8vIGhpZGluZyB3aW5kb3dcblx0XHR3aW5kb3dUcmFuc2l0aW9uJC5zdWJzY3JpYmUoKCkgPT4ge1xuXHRcdFx0Y29uc3QgeyBuYXRpdmVFbGVtZW50IH0gPSB0aGlzLl93aW5kb3dDbXB0UmVmLmxvY2F0aW9uO1xuXHRcdFx0bmF0aXZlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG5hdGl2ZUVsZW1lbnQpO1xuXHRcdFx0dGhpcy5fd2luZG93Q21wdFJlZi5kZXN0cm95KCk7XG5cblx0XHRcdGlmICh0aGlzLl9jb250ZW50UmVmICYmIHRoaXMuX2NvbnRlbnRSZWYudmlld1JlZikge1xuXHRcdFx0XHR0aGlzLl9jb250ZW50UmVmLnZpZXdSZWYuZGVzdHJveSgpO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLl93aW5kb3dDbXB0UmVmID0gPGFueT5udWxsO1xuXHRcdFx0dGhpcy5fY29udGVudFJlZiA9IDxhbnk+bnVsbDtcblx0XHR9KTtcblxuXHRcdC8vIGhpZGluZyBiYWNrZHJvcFxuXHRcdGJhY2tkcm9wVHJhbnNpdGlvbiQuc3Vic2NyaWJlKCgpID0+IHtcblx0XHRcdGlmICh0aGlzLl9iYWNrZHJvcENtcHRSZWYpIHtcblx0XHRcdFx0Y29uc3QgeyBuYXRpdmVFbGVtZW50IH0gPSB0aGlzLl9iYWNrZHJvcENtcHRSZWYubG9jYXRpb247XG5cdFx0XHRcdG5hdGl2ZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChuYXRpdmVFbGVtZW50KTtcblx0XHRcdFx0dGhpcy5fYmFja2Ryb3BDbXB0UmVmLmRlc3Ryb3koKTtcblx0XHRcdFx0dGhpcy5fYmFja2Ryb3BDbXB0UmVmID0gPGFueT5udWxsO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0Ly8gYWxsIGRvbmVcblx0XHR6aXAod2luZG93VHJhbnNpdGlvbiQsIGJhY2tkcm9wVHJhbnNpdGlvbiQpLnN1YnNjcmliZSgoKSA9PiB7XG5cdFx0XHR0aGlzLl9oaWRkZW4ubmV4dCgpO1xuXHRcdFx0dGhpcy5faGlkZGVuLmNvbXBsZXRlKCk7XG5cdFx0fSk7XG5cdH1cbn1cbiJdfQ==