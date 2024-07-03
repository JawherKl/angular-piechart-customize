/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/* eslint-disable */
import { Platform } from './platform';
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./platform";
/**
 * Configuration for the isFocusable method.
 */
export class IsFocusableConfig {
    constructor() {
        /**
         * Whether to count an element as focusable even if it is not currently visible.
         */
        this.ignoreVisibility = false;
    }
}
// The InteractivityChecker leans heavily on the ally.js accessibility utilities.
// Methods like `isTabbable` are only covering specific edge-cases for the browsers which are
// supported.
/**
 * Utility for checking the interactivity of an element, such as whether is is focusable or
 * tabbable.
 */
export class InteractivityChecker {
    constructor(_platform) {
        this._platform = _platform;
    }
    /**
     * Gets whether an element is disabled.
     *
     * @param element Element to be checked.
     * @returns Whether the element is disabled.
     */
    isDisabled(element) {
        // This does not capture some cases, such as a non-form control with a disabled attribute or
        // a form control inside of a disabled form, but should capture the most common cases.
        return element.hasAttribute('disabled');
    }
    /**
     * Gets whether an element is visible for the purposes of interactivity.
     *
     * This will capture states like `display: none` and `visibility: hidden`, but not things like
     * being clipped by an `overflow: hidden` parent or being outside the viewport.
     *
     * @returns Whether the element is visible.
     */
    isVisible(element) {
        return hasGeometry(element) && getComputedStyle(element).visibility === 'visible';
    }
    /**
     * Gets whether an element can be reached via Tab key.
     * Assumes that the element has already been checked with isFocusable.
     *
     * @param element Element to be checked.
     * @returns Whether the element is tabbable.
     */
    isTabbable(element) {
        // Nothing is tabbable on the server 😎
        if (!this._platform.isBrowser) {
            return false;
        }
        const frameElement = getFrameElement(getWindow(element));
        if (frameElement) {
            // Frame elements inherit their tabindex onto all child elements.
            if (getTabIndexValue(frameElement) === -1) {
                return false;
            }
            // Browsers disable tabbing to an element inside of an invisible frame.
            if (!this.isVisible(frameElement)) {
                return false;
            }
        }
        let nodeName = element.nodeName.toLowerCase();
        let tabIndexValue = getTabIndexValue(element);
        if (element.hasAttribute('contenteditable')) {
            return tabIndexValue !== -1;
        }
        if (nodeName === 'iframe' || nodeName === 'object') {
            // The frame or object's content may be tabbable depending on the content, but it's
            // not possibly to reliably detect the content of the frames. We always consider such
            // elements as non-tabbable.
            return false;
        }
        // In iOS, the browser only considers some specific elements as tabbable.
        if (this._platform.WEBKIT && this._platform.IOS && !isPotentiallyTabbableIOS(element)) {
            return false;
        }
        if (nodeName === 'audio') {
            // Audio elements without controls enabled are never tabbable, regardless
            // of the tabindex attribute explicitly being set.
            if (!element.hasAttribute('controls')) {
                return false;
            }
            // Audio elements with controls are by default tabbable unless the
            // tabindex attribute is set to `-1` explicitly.
            return tabIndexValue !== -1;
        }
        if (nodeName === 'video') {
            // For all video elements, if the tabindex attribute is set to `-1`, the video
            // is not tabbable. Note: We cannot rely on the default `HTMLElement.tabIndex`
            // property as that one is set to `-1` in Chrome, Edge and Safari v13.1. The
            // tabindex attribute is the source of truth here.
            if (tabIndexValue === -1) {
                return false;
            }
            // If the tabindex is explicitly set, and not `-1` (as per check before), the
            // video element is always tabbable (regardless of whether it has controls or not).
            if (tabIndexValue !== null) {
                return true;
            }
            // Otherwise (when no explicit tabindex is set), a video is only tabbable if it
            // has controls enabled. Firefox is special as videos are always tabbable regardless
            // of whether there are controls or not.
            return this._platform.FIREFOX || element.hasAttribute('controls');
        }
        return element.tabIndex >= 0;
    }
    /**
     * Gets whether an element can be focused by the user.
     *
     * @param element Element to be checked.
     * @param config The config object with options to customize this method's behavior
     * @returns Whether the element is focusable.
     */
    isFocusable(element, config) {
        // Perform checks in order of left to most expensive.
        // Again, naive approach that does not capture many edge cases and browser quirks.
        return isPotentiallyFocusable(element) && !this.isDisabled(element) &&
            (config?.ignoreVisibility || this.isVisible(element));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.1.4", ngImport: i0, type: InteractivityChecker, deps: [{ token: i1.Platform }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.1.4", ngImport: i0, type: InteractivityChecker, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.1.4", ngImport: i0, type: InteractivityChecker, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.Platform }]; } });
/**
 * Returns the frame element from a window object. Since browsers like MS Edge throw errors if
 * the frameElement property is being accessed from a different host address, this property
 * should be accessed carefully.
 */
function getFrameElement(window) {
    try {
        return window.frameElement;
    }
    catch {
        return null;
    }
}
/** Checks whether the specified element has any geometry / rectangles. */
function hasGeometry(element) {
    // Use logic from jQuery to check for an invisible element.
    // See https://github.com/jquery/jquery/blob/master/src/css/hiddenVisibleSelectors.js#L12
    return !!(element.offsetWidth || element.offsetHeight ||
        (typeof element.getClientRects === 'function' && element.getClientRects().length));
}
/** Gets whether an element's  */
function isNativeFormElement(element) {
    let nodeName = element.nodeName.toLowerCase();
    return nodeName === 'input' ||
        nodeName === 'select' ||
        nodeName === 'button' ||
        nodeName === 'textarea';
}
/** Gets whether an element is an `<input type="hidden">`. */
function isHiddenInput(element) {
    return isInputElement(element) && element.type == 'hidden';
}
/** Gets whether an element is an anchor that has an href attribute. */
function isAnchorWithHref(element) {
    return isAnchorElement(element) && element.hasAttribute('href');
}
/** Gets whether an element is an input element. */
function isInputElement(element) {
    return element.nodeName.toLowerCase() == 'input';
}
/** Gets whether an element is an anchor element. */
function isAnchorElement(element) {
    return element.nodeName.toLowerCase() == 'a';
}
/** Gets whether an element has a valid tabindex. */
function hasValidTabIndex(element) {
    if (!element.hasAttribute('tabindex') || element.tabIndex === undefined) {
        return false;
    }
    let tabIndex = element.getAttribute('tabindex');
    // IE11 parses tabindex="" as the value "-32768"
    if (tabIndex == '-32768') {
        return false;
    }
    return !!(tabIndex && !isNaN(parseInt(tabIndex, 10)));
}
/**
 * Returns the parsed tabindex from the element attributes instead of returning the
 * evaluated tabindex from the browsers defaults.
 */
function getTabIndexValue(element) {
    if (!hasValidTabIndex(element)) {
        return null;
    }
    // See browser issue in Gecko https://bugzilla.mozilla.org/show_bug.cgi?id=1128054
    const tabIndex = parseInt(element.getAttribute('tabindex') || '', 10);
    return isNaN(tabIndex) ? -1 : tabIndex;
}
/** Checks whether the specified element is potentially tabbable on iOS */
function isPotentiallyTabbableIOS(element) {
    let nodeName = element.nodeName.toLowerCase();
    let inputType = nodeName === 'input' && element.type;
    return inputType === 'text'
        || inputType === 'password'
        || nodeName === 'select'
        || nodeName === 'textarea';
}
/**
 * Gets whether an element is potentially focusable without taking current visible/disabled state
 * into account.
 */
function isPotentiallyFocusable(element) {
    // Inputs are potentially focusable *unless* they're type="hidden".
    if (isHiddenInput(element)) {
        return false;
    }
    return isNativeFormElement(element) ||
        isAnchorWithHref(element) ||
        element.hasAttribute('contenteditable') ||
        hasValidTabIndex(element);
}
/** Gets the parent window of a DOM node with regards of being inside of an iframe. */
function getWindow(node) {
    // ownerDocument is null if `node` itself *is* a document.
    return node.ownerDocument && node.ownerDocument.defaultView || window;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJhY3Rpdml0eS1jaGVja2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2ZvY3VzLXRyYXAvaW50ZXJhY3Rpdml0eS1jaGVja2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILG9CQUFvQjtBQUVwQixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7OztBQUUzQzs7R0FFRztBQUNILE1BQU0sT0FBTyxpQkFBaUI7SUFBOUI7UUFDRTs7V0FFRztRQUNILHFCQUFnQixHQUFZLEtBQUssQ0FBQztJQUNwQyxDQUFDO0NBQUE7QUFFRCxpRkFBaUY7QUFDakYsNkZBQTZGO0FBQzdGLGFBQWE7QUFFYjs7O0dBR0c7QUFFSCxNQUFNLE9BQU8sb0JBQW9CO0lBRS9CLFlBQW9CLFNBQW1CO1FBQW5CLGNBQVMsR0FBVCxTQUFTLENBQVU7SUFDdkMsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsVUFBVSxDQUFDLE9BQW9CO1FBQzdCLDRGQUE0RjtRQUM1RixzRkFBc0Y7UUFDdEYsT0FBTyxPQUFPLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0gsU0FBUyxDQUFDLE9BQW9CO1FBQzVCLE9BQU8sV0FBVyxDQUFDLE9BQU8sQ0FBQyxJQUFJLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDLFVBQVUsS0FBSyxTQUFTLENBQUM7SUFDcEYsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNILFVBQVUsQ0FBQyxPQUFvQjtRQUM3Qix1Q0FBdUM7UUFDdkMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFO1lBQzdCLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFFRCxNQUFNLFlBQVksR0FBRyxlQUFlLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FB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bEQsbUVBQW1FO0lBQ25FLElBQUksYUFBYSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQzFCLE9BQU8sS0FBSyxDQUFDO0tBQ2Q7SUFFRCxPQUFPLG1CQUFtQixDQUFDLE9BQU8sQ0FBQztRQUNqQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUM7UUFDekIsT0FBTyxDQUFDLFlBQVksQ0FBQyxpQkFBaUIsQ0FBQztRQUN2QyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUM5QixDQUFDO0FBRUQsc0ZBQXNGO0FBQ3RGLFNBQVMsU0FBUyxDQUFDLElBQWlCO0lBQ2xDLDBEQUEwRDtJQUMxRCxPQUFPLElBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLElBQUksTUFBTSxDQUFDO0FBQ3hFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuLyogZXNsaW50LWRpc2FibGUgKi9cblxuaW1wb3J0IHsgUGxhdGZvcm0gfSBmcm9tICcuL3BsYXRmb3JtJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqXG4gKiBDb25maWd1cmF0aW9uIGZvciB0aGUgaXNGb2N1c2FibGUgbWV0aG9kLlxuICovXG5leHBvcnQgY2xhc3MgSXNGb2N1c2FibGVDb25maWcge1xuICAvKipcbiAgICogV2hldGhlciB0byBjb3VudCBhbiBlbGVtZW50IGFzIGZvY3VzYWJsZSBldmVuIGlmIGl0IGlzIG5vdCBjdXJyZW50bHkgdmlzaWJsZS5cbiAgICovXG4gIGlnbm9yZVZpc2liaWxpdHk6IGJvb2xlYW4gPSBmYWxzZTtcbn1cblxuLy8gVGhlIEludGVyYWN0aXZpdHlDaGVja2VyIGxlYW5zIGhlYXZpbHkgb24gdGhlIGFsbHkuanMgYWNjZXNzaWJpbGl0eSB1dGlsaXRpZXMuXG4vLyBNZXRob2RzIGxpa2UgYGlzVGFiYmFibGVgIGFyZSBvbmx5IGNvdmVyaW5nIHNwZWNpZmljIGVkZ2UtY2FzZXMgZm9yIHRoZSBicm93c2VycyB3aGljaCBhcmVcbi8vIHN1cHBvcnRlZC5cblxuLyoqXG4gKiBVdGlsaXR5IGZvciBjaGVja2luZyB0aGUgaW50ZXJhY3Rpdml0eSBvZiBhbiBlbGVtZW50LCBzdWNoIGFzIHdoZXRoZXIgaXMgaXMgZm9jdXNhYmxlIG9yXG4gKiB0YWJiYWJsZS5cbiAqL1xuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBJbnRlcmFjdGl2aXR5Q2hlY2tlciB7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfcGxhdGZvcm06IFBsYXRmb3JtKSB7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB3aGV0aGVyIGFuIGVsZW1lbnQgaXMgZGlzYWJsZWQuXG4gICAqXG4gICAqIEBwYXJhbSBlbGVtZW50IEVsZW1lbnQgdG8gYmUgY2hlY2tlZC5cbiAgICogQHJldHVybnMgV2hldGhlciB0aGUgZWxlbWVudCBpcyBkaXNhYmxlZC5cbiAgICovXG4gIGlzRGlzYWJsZWQoZWxlbWVudDogSFRNTEVsZW1lbnQpOiBib29sZWFuIHtcbiAgICAvLyBUaGlzIGRvZXMgbm90IGNhcHR1cmUgc29tZSBjYXNlcywgc3VjaCBhcyBhIG5vbi1mb3JtIGNvbnRyb2wgd2l0aCBhIGRpc2FibGVkIGF0dHJpYnV0ZSBvclxuICAgIC8vIGEgZm9ybSBjb250cm9sIGluc2lkZSBvZiBhIGRpc2FibGVkIGZvcm0sIGJ1dCBzaG91bGQgY2FwdHVyZSB0aGUgbW9zdCBjb21tb24gY2FzZXMuXG4gICAgcmV0dXJuIGVsZW1lbnQuaGFzQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgd2hldGhlciBhbiBlbGVtZW50IGlzIHZpc2libGUgZm9yIHRoZSBwdXJwb3NlcyBvZiBpbnRlcmFjdGl2aXR5LlxuICAgKlxuICAgKiBUaGlzIHdpbGwgY2FwdHVyZSBzdGF0ZXMgbGlrZSBgZGlzcGxheTogbm9uZWAgYW5kIGB2aXNpYmlsaXR5OiBoaWRkZW5gLCBidXQgbm90IHRoaW5ncyBsaWtlXG4gICAqIGJlaW5nIGNsaXBwZWQgYnkgYW4gYG92ZXJmbG93OiBoaWRkZW5gIHBhcmVudCBvciBiZWluZyBvdXRzaWRlIHRoZSB2aWV3cG9ydC5cbiAgICpcbiAgICogQHJldHVybnMgV2hldGhlciB0aGUgZWxlbWVudCBpcyB2aXNpYmxlLlxuICAgKi9cbiAgaXNWaXNpYmxlKGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGhhc0dlb21ldHJ5KGVsZW1lbnQpICYmIGdldENvbXB1dGVkU3R5bGUoZWxlbWVudCkudmlzaWJpbGl0eSA9PT0gJ3Zpc2libGUnO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgd2hldGhlciBhbiBlbGVtZW50IGNhbiBiZSByZWFjaGVkIHZpYSBUYWIga2V5LlxuICAgKiBBc3N1bWVzIHRoYXQgdGhlIGVsZW1lbnQgaGFzIGFscmVhZHkgYmVlbiBjaGVja2VkIHdpdGggaXNGb2N1c2FibGUuXG4gICAqXG4gICAqIEBwYXJhbSBlbGVtZW50IEVsZW1lbnQgdG8gYmUgY2hlY2tlZC5cbiAgICogQHJldHVybnMgV2hldGhlciB0aGUgZWxlbWVudCBpcyB0YWJiYWJsZS5cbiAgICovXG4gIGlzVGFiYmFibGUoZWxlbWVudDogSFRNTEVsZW1lbnQpOiBib29sZWFuIHtcbiAgICAvLyBOb3RoaW5nIGlzIHRhYmJhYmxlIG9uIHRoZSBzZXJ2ZXIg8J+YjlxuICAgIGlmICghdGhpcy5fcGxhdGZvcm0uaXNCcm93c2VyKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgZnJhbWVFbGVtZW50ID0gZ2V0RnJhbWVFbGVtZW50KGdldFdpbmRvdyhlbGVtZW50KSk7XG5cbiAgICBpZiAoZnJhbWVFbGVtZW50KSB7XG4gICAgICAvLyBGcmFtZSBlbGVtZW50cyBpbmhlcml0IHRoZWlyIHRhYmluZGV4IG9udG8gYWxsIGNoaWxkIGVsZW1lbnRzLlxuICAgICAgaWYgKGdldFRhYkluZGV4VmFsdWUoZnJhbWVFbGVtZW50KSA9PT0gLTEpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICAvLyBCcm93c2VycyBkaXNhYmxlIHRhYmJpbmcgdG8gYW4gZWxlbWVudCBpbnNpZGUgb2YgYW4gaW52aXNpYmxlIGZyYW1lLlxuICAgICAgaWYgKCF0aGlzLmlzVmlzaWJsZShmcmFtZUVsZW1lbnQpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgbm9kZU5hbWUgPSBlbGVtZW50Lm5vZGVOYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgbGV0IHRhYkluZGV4VmFsdWUgPSBnZXRUYWJJbmRleFZhbHVlKGVsZW1lbnQpO1xuXG4gICAgaWYgKGVsZW1lbnQuaGFzQXR0cmlidXRlKCdjb250ZW50ZWRpdGFibGUnKSkge1xuICAgICAgcmV0dXJuIHRhYkluZGV4VmFsdWUgIT09IC0xO1xuICAgIH1cblxuICAgIGlmIChub2RlTmFtZSA9PT0gJ2lmcmFtZScgfHwgbm9kZU5hbWUgPT09ICdvYmplY3QnKSB7XG4gICAgICAvLyBUaGUgZnJhbWUgb3Igb2JqZWN0J3MgY29udGVudCBtYXkgYmUgdGFiYmFibGUgZGVwZW5kaW5nIG9uIHRoZSBjb250ZW50LCBidXQgaXQnc1xuICAgICAgLy8gbm90IHBvc3NpYmx5IHRvIHJlbGlhYmx5IGRldGVjdCB0aGUgY29udGVudCBvZiB0aGUgZnJhbWVzLiBXZSBhbHdheXMgY29uc2lkZXIgc3VjaFxuICAgICAgLy8gZWxlbWVudHMgYXMgbm9uLXRhYmJhYmxlLlxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vIEluIGlPUywgdGhlIGJyb3dzZXIgb25seSBjb25zaWRlcnMgc29tZSBzcGVjaWZpYyBlbGVtZW50cyBhcyB0YWJiYWJsZS5cbiAgICBpZiAodGhpcy5fcGxhdGZvcm0uV0VCS0lUICYmIHRoaXMuX3BsYXRmb3JtLklPUyAmJiAhaXNQb3RlbnRpYWxseVRhYmJhYmxlSU9TKGVsZW1lbnQpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKG5vZGVOYW1lID09PSAnYXVkaW8nKSB7XG4gICAgICAvLyBBdWRpbyBlbGVtZW50cyB3aXRob3V0IGNvbnRyb2xzIGVuYWJsZWQgYXJlIG5ldmVyIHRhYmJhYmxlLCByZWdhcmRsZXNzXG4gICAgICAvLyBvZiB0aGUgdGFiaW5kZXggYXR0cmlidXRlIGV4cGxpY2l0bHkgYmVpbmcgc2V0LlxuICAgICAgaWYgKCFlbGVtZW50Lmhhc0F0dHJpYnV0ZSgnY29udHJvbHMnKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICAvLyBBdWRpbyBlbGVtZW50cyB3aXRoIGNvbnRyb2xzIGFyZSBieSBkZWZhdWx0IHRhYmJhYmxlIHVubGVzcyB0aGVcbiAgICAgIC8vIHRhYmluZGV4IGF0dHJpYnV0ZSBpcyBzZXQgdG8gYC0xYCBleHBsaWNpdGx5LlxuICAgICAgcmV0dXJuIHRhYkluZGV4VmFsdWUgIT09IC0xO1xuICAgIH1cblxuICAgIGlmIChub2RlTmFtZSA9PT0gJ3ZpZGVvJykge1xuICAgICAgLy8gRm9yIGFsbCB2aWRlbyBlbGVtZW50cywgaWYgdGhlIHRhYmluZGV4IGF0dHJpYnV0ZSBpcyBzZXQgdG8gYC0xYCwgdGhlIHZpZGVvXG4gICAgICAvLyBpcyBub3QgdGFiYmFibGUuIE5vdGU6IFdlIGNhbm5vdCByZWx5IG9uIHRoZSBkZWZhdWx0IGBIVE1MRWxlbWVudC50YWJJbmRleGBcbiAgICAgIC8vIHByb3BlcnR5IGFzIHRoYXQgb25lIGlzIHNldCB0byBgLTFgIGluIENocm9tZSwgRWRnZSBhbmQgU2FmYXJpIHYxMy4xLiBUaGVcbiAgICAgIC8vIHRhYmluZGV4IGF0dHJpYnV0ZSBpcyB0aGUgc291cmNlIG9mIHRydXRoIGhlcmUuXG4gICAgICBpZiAodGFiSW5kZXhWYWx1ZSA9PT0gLTEpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgLy8gSWYgdGhlIHRhYmluZGV4IGlzIGV4cGxpY2l0bHkgc2V0LCBhbmQgbm90IGAtMWAgKGFzIHBlciBjaGVjayBiZWZvcmUpLCB0aGVcbiAgICAgIC8vIHZpZGVvIGVsZW1lbnQgaXMgYWx3YXlzIHRhYmJhYmxlIChyZWdhcmRsZXNzIG9mIHdoZXRoZXIgaXQgaGFzIGNvbnRyb2xzIG9yIG5vdCkuXG4gICAgICBpZiAodGFiSW5kZXhWYWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIC8vIE90aGVyd2lzZSAod2hlbiBubyBleHBsaWNpdCB0YWJpbmRleCBpcyBzZXQpLCBhIHZpZGVvIGlzIG9ubHkgdGFiYmFibGUgaWYgaXRcbiAgICAgIC8vIGhhcyBjb250cm9scyBlbmFibGVkLiBGaXJlZm94IGlzIHNwZWNpYWwgYXMgdmlkZW9zIGFyZSBhbHdheXMgdGFiYmFibGUgcmVnYXJkbGVzc1xuICAgICAgLy8gb2Ygd2hldGhlciB0aGVyZSBhcmUgY29udHJvbHMgb3Igbm90LlxuICAgICAgcmV0dXJuIHRoaXMuX3BsYXRmb3JtLkZJUkVGT1ggfHwgZWxlbWVudC5oYXNBdHRyaWJ1dGUoJ2NvbnRyb2xzJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGVsZW1lbnQudGFiSW5kZXggPj0gMDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHdoZXRoZXIgYW4gZWxlbWVudCBjYW4gYmUgZm9jdXNlZCBieSB0aGUgdXNlci5cbiAgICpcbiAgICogQHBhcmFtIGVsZW1lbnQgRWxlbWVudCB0byBiZSBjaGVja2VkLlxuICAgKiBAcGFyYW0gY29uZmlnIFRoZSBjb25maWcgb2JqZWN0IHdpdGggb3B0aW9ucyB0byBjdXN0b21pemUgdGhpcyBtZXRob2QncyBiZWhhdmlvclxuICAgKiBAcmV0dXJucyBXaGV0aGVyIHRoZSBlbGVtZW50IGlzIGZvY3VzYWJsZS5cbiAgICovXG4gIGlzRm9jdXNhYmxlKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBjb25maWc/OiBJc0ZvY3VzYWJsZUNvbmZpZyk6IGJvb2xlYW4ge1xuICAgIC8vIFBlcmZvcm0gY2hlY2tzIGluIG9yZGVyIG9mIGxlZnQgdG8gbW9zdCBleHBlbnNpdmUuXG4gICAgLy8gQWdhaW4sIG5haXZlIGFwcHJvYWNoIHRoYXQgZG9lcyBub3QgY2FwdHVyZSBtYW55IGVkZ2UgY2FzZXMgYW5kIGJyb3dzZXIgcXVpcmtzLlxuICAgIHJldHVybiBpc1BvdGVudGlhbGx5Rm9jdXNhYmxlKGVsZW1lbnQpICYmICF0aGlzLmlzRGlzYWJsZWQoZWxlbWVudCkgJiZcbiAgICAgIChjb25maWc/Lmlnbm9yZVZpc2liaWxpdHkgfHwgdGhpcy5pc1Zpc2libGUoZWxlbWVudCkpO1xuICB9XG5cbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBmcmFtZSBlbGVtZW50IGZyb20gYSB3aW5kb3cgb2JqZWN0LiBTaW5jZSBicm93c2VycyBsaWtlIE1TIEVkZ2UgdGhyb3cgZXJyb3JzIGlmXG4gKiB0aGUgZnJhbWVFbGVtZW50IHByb3BlcnR5IGlzIGJlaW5nIGFjY2Vzc2VkIGZyb20gYSBkaWZmZXJlbnQgaG9zdCBhZGRyZXNzLCB0aGlzIHByb3BlcnR5XG4gKiBzaG91bGQgYmUgYWNjZXNzZWQgY2FyZWZ1bGx5LlxuICovXG5mdW5jdGlvbiBnZXRGcmFtZUVsZW1lbnQod2luZG93OiBXaW5kb3cpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gd2luZG93LmZyYW1lRWxlbWVudCBhcyBIVE1MRWxlbWVudDtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cblxuLyoqIENoZWNrcyB3aGV0aGVyIHRoZSBzcGVjaWZpZWQgZWxlbWVudCBoYXMgYW55IGdlb21ldHJ5IC8gcmVjdGFuZ2xlcy4gKi9cbmZ1bmN0aW9uIGhhc0dlb21ldHJ5KGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogYm9vbGVhbiB7XG4gIC8vIFVzZSBsb2dpYyBmcm9tIGpRdWVyeSB0byBjaGVjayBmb3IgYW4gaW52aXNpYmxlIGVsZW1lbnQuXG4gIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vanF1ZXJ5L2pxdWVyeS9ibG9iL21hc3Rlci9zcmMvY3NzL2hpZGRlblZpc2libGVTZWxlY3RvcnMuanMjTDEyXG4gIHJldHVybiAhIShlbGVtZW50Lm9mZnNldFdpZHRoIHx8IGVsZW1lbnQub2Zmc2V0SGVpZ2h0IHx8XG4gICAgKHR5cGVvZiBlbGVtZW50LmdldENsaWVudFJlY3RzID09PSAnZnVuY3Rpb24nICYmIGVsZW1lbnQuZ2V0Q2xpZW50UmVjdHMoKS5sZW5ndGgpKTtcbn1cblxuLyoqIEdldHMgd2hldGhlciBhbiBlbGVtZW50J3MgICovXG5mdW5jdGlvbiBpc05hdGl2ZUZvcm1FbGVtZW50KGVsZW1lbnQ6IE5vZGUpIHtcbiAgbGV0IG5vZGVOYW1lID0gZWxlbWVudC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpO1xuICByZXR1cm4gbm9kZU5hbWUgPT09ICdpbnB1dCcgfHxcbiAgICBub2RlTmFtZSA9PT0gJ3NlbGVjdCcgfHxcbiAgICBub2RlTmFtZSA9PT0gJ2J1dHRvbicgfHxcbiAgICBub2RlTmFtZSA9PT0gJ3RleHRhcmVhJztcbn1cblxuLyoqIEdldHMgd2hldGhlciBhbiBlbGVtZW50IGlzIGFuIGA8aW5wdXQgdHlwZT1cImhpZGRlblwiPmAuICovXG5mdW5jdGlvbiBpc0hpZGRlbklucHV0KGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogYm9vbGVhbiB7XG4gIHJldHVybiBpc0lucHV0RWxlbWVudChlbGVtZW50KSAmJiBlbGVtZW50LnR5cGUgPT0gJ2hpZGRlbic7XG59XG5cbi8qKiBHZXRzIHdoZXRoZXIgYW4gZWxlbWVudCBpcyBhbiBhbmNob3IgdGhhdCBoYXMgYW4gaHJlZiBhdHRyaWJ1dGUuICovXG5mdW5jdGlvbiBpc0FuY2hvcldpdGhIcmVmKGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogYm9vbGVhbiB7XG4gIHJldHVybiBpc0FuY2hvckVsZW1lbnQoZWxlbWVudCkgJiYgZWxlbWVudC5oYXNBdHRyaWJ1dGUoJ2hyZWYnKTtcbn1cblxuLyoqIEdldHMgd2hldGhlciBhbiBlbGVtZW50IGlzIGFuIGlucHV0IGVsZW1lbnQuICovXG5mdW5jdGlvbiBpc0lucHV0RWxlbWVudChlbGVtZW50OiBIVE1MRWxlbWVudCk6IGVsZW1lbnQgaXMgSFRNTElucHV0RWxlbWVudCB7XG4gIHJldHVybiBlbGVtZW50Lm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT0gJ2lucHV0Jztcbn1cblxuLyoqIEdldHMgd2hldGhlciBhbiBlbGVtZW50IGlzIGFuIGFuY2hvciBlbGVtZW50LiAqL1xuZnVuY3Rpb24gaXNBbmNob3JFbGVtZW50KGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogZWxlbWVudCBpcyBIVE1MQW5jaG9yRWxlbWVudCB7XG4gIHJldHVybiBlbGVtZW50Lm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT0gJ2EnO1xufVxuXG4vKiogR2V0cyB3aGV0aGVyIGFuIGVsZW1lbnQgaGFzIGEgdmFsaWQgdGFiaW5kZXguICovXG5mdW5jdGlvbiBoYXNWYWxpZFRhYkluZGV4KGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogYm9vbGVhbiB7XG4gIGlmICghZWxlbWVudC5oYXNBdHRyaWJ1dGUoJ3RhYmluZGV4JykgfHwgZWxlbWVudC50YWJJbmRleCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgbGV0IHRhYkluZGV4ID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ3RhYmluZGV4Jyk7XG5cbiAgLy8gSUUxMSBwYXJzZXMgdGFiaW5kZXg9XCJcIiBhcyB0aGUgdmFsdWUgXCItMzI3NjhcIlxuICBpZiAodGFiSW5kZXggPT0gJy0zMjc2OCcpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gISEodGFiSW5kZXggJiYgIWlzTmFOKHBhcnNlSW50KHRhYkluZGV4LCAxMCkpKTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBwYXJzZWQgdGFiaW5kZXggZnJvbSB0aGUgZWxlbWVudCBhdHRyaWJ1dGVzIGluc3RlYWQgb2YgcmV0dXJuaW5nIHRoZVxuICogZXZhbHVhdGVkIHRhYmluZGV4IGZyb20gdGhlIGJyb3dzZXJzIGRlZmF1bHRzLlxuICovXG5mdW5jdGlvbiBnZXRUYWJJbmRleFZhbHVlKGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogbnVtYmVyIHwgbnVsbCB7XG4gIGlmICghaGFzVmFsaWRUYWJJbmRleChlbGVtZW50KSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgLy8gU2VlIGJyb3dzZXIgaXNzdWUgaW4gR2Vja28gaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MTEyODA1NFxuICBjb25zdCB0YWJJbmRleCA9IHBhcnNlSW50KGVsZW1lbnQuZ2V0QXR0cmlidXRlKCd0YWJpbmRleCcpIHx8ICcnLCAxMCk7XG5cbiAgcmV0dXJuIGlzTmFOKHRhYkluZGV4KSA/IC0xIDogdGFiSW5kZXg7XG59XG5cbi8qKiBDaGVja3Mgd2hldGhlciB0aGUgc3BlY2lmaWVkIGVsZW1lbnQgaXMgcG90ZW50aWFsbHkgdGFiYmFibGUgb24gaU9TICovXG5mdW5jdGlvbiBpc1BvdGVudGlhbGx5VGFiYmFibGVJT1MoZWxlbWVudDogSFRNTEVsZW1lbnQpOiBib29sZWFuIHtcbiAgbGV0IG5vZGVOYW1lID0gZWxlbWVudC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpO1xuICBsZXQgaW5wdXRUeXBlID0gbm9kZU5hbWUgPT09ICdpbnB1dCcgJiYgKGVsZW1lbnQgYXMgSFRNTElucHV0RWxlbWVudCkudHlwZTtcblxuICByZXR1cm4gaW5wdXRUeXBlID09PSAndGV4dCdcbiAgICB8fCBpbnB1dFR5cGUgPT09ICdwYXNzd29yZCdcbiAgICB8fCBub2RlTmFtZSA9PT0gJ3NlbGVjdCdcbiAgICB8fCBub2RlTmFtZSA9PT0gJ3RleHRhcmVhJztcbn1cblxuLyoqXG4gKiBHZXRzIHdoZXRoZXIgYW4gZWxlbWVudCBpcyBwb3RlbnRpYWxseSBmb2N1c2FibGUgd2l0aG91dCB0YWtpbmcgY3VycmVudCB2aXNpYmxlL2Rpc2FibGVkIHN0YXRlXG4gKiBpbnRvIGFjY291bnQuXG4gKi9cbmZ1bmN0aW9uIGlzUG90ZW50aWFsbHlGb2N1c2FibGUoZWxlbWVudDogSFRNTEVsZW1lbnQpOiBib29sZWFuIHtcbiAgLy8gSW5wdXRzIGFyZSBwb3RlbnRpYWxseSBmb2N1c2FibGUgKnVubGVzcyogdGhleSdyZSB0eXBlPVwiaGlkZGVuXCIuXG4gIGlmIChpc0hpZGRlbklucHV0KGVsZW1lbnQpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIGlzTmF0aXZlRm9ybUVsZW1lbnQoZWxlbWVudCkgfHxcbiAgICBpc0FuY2hvcldpdGhIcmVmKGVsZW1lbnQpIHx8XG4gICAgZWxlbWVudC5oYXNBdHRyaWJ1dGUoJ2NvbnRlbnRlZGl0YWJsZScpIHx8XG4gICAgaGFzVmFsaWRUYWJJbmRleChlbGVtZW50KTtcbn1cblxuLyoqIEdldHMgdGhlIHBhcmVudCB3aW5kb3cgb2YgYSBET00gbm9kZSB3aXRoIHJlZ2FyZHMgb2YgYmVpbmcgaW5zaWRlIG9mIGFuIGlmcmFtZS4gKi9cbmZ1bmN0aW9uIGdldFdpbmRvdyhub2RlOiBIVE1MRWxlbWVudCk6IFdpbmRvdyB7XG4gIC8vIG93bmVyRG9jdW1lbnQgaXMgbnVsbCBpZiBgbm9kZWAgaXRzZWxmICppcyogYSBkb2N1bWVudC5cbiAgcmV0dXJuIG5vZGUub3duZXJEb2N1bWVudCAmJiBub2RlLm93bmVyRG9jdW1lbnQuZGVmYXVsdFZpZXcgfHwgd2luZG93O1xufVxuIl19