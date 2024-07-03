/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/* eslint-disable */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/** Injectable that ensures only the most recently enabled FocusTrap is active. */
export class FocusTrapManager {
    constructor() {
        // A stack of the FocusTraps on the page. Only the FocusTrap at the
        // top of the stack is active.
        this._focusTrapStack = [];
    }
    /**
     * Disables the FocusTrap at the top of the stack, and then pushes
     * the new FocusTrap onto the stack.
     */
    register(focusTrap) {
        // Dedupe focusTraps that register multiple times.
        this._focusTrapStack = this._focusTrapStack.filter((ft) => ft !== focusTrap);
        let stack = this._focusTrapStack;
        if (stack.length) {
            stack[stack.length - 1]._disable();
        }
        stack.push(focusTrap);
        focusTrap._enable();
    }
    /**
     * Removes the FocusTrap from the stack, and activates the
     * FocusTrap that is the new top of the stack.
     */
    deregister(focusTrap) {
        focusTrap._disable();
        const stack = this._focusTrapStack;
        const i = stack.indexOf(focusTrap);
        if (i !== -1) {
            stack.splice(i, 1);
            if (stack.length) {
                stack[stack.length - 1]._enable();
            }
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.1.4", ngImport: i0, type: FocusTrapManager, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.1.4", ngImport: i0, type: FocusTrapManager, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.1.4", ngImport: i0, type: FocusTrapManager, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9jdXMtdHJhcC1tYW5hZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2ZvY3VzLXRyYXAvZm9jdXMtdHJhcC1tYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILG9CQUFvQjtBQUVwQixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQVkzQyxrRkFBa0Y7QUFFbEYsTUFBTSxPQUFPLGdCQUFnQjtJQUQ3QjtRQUVFLG1FQUFtRTtRQUNuRSw4QkFBOEI7UUFDdEIsb0JBQWUsR0FBdUIsRUFBRSxDQUFDO0tBcUNsRDtJQW5DQzs7O09BR0c7SUFDSCxRQUFRLENBQUMsU0FBMkI7UUFDbEMsa0RBQWtEO1FBQ2xELElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsS0FBSyxTQUFTLENBQUMsQ0FBQztRQUU3RSxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDO1FBRWpDLElBQUksS0FBSyxDQUFDLE1BQU0sRUFBRTtZQUNoQixLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUNwQztRQUVELEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdEIsU0FBUyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFRDs7O09BR0c7SUFDSCxVQUFVLENBQUMsU0FBMkI7UUFDcEMsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBRXJCLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUM7UUFFbkMsTUFBTSxDQUFDLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNuQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtZQUNaLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ25CLElBQUksS0FBSyxDQUFDLE1BQU0sRUFBRTtnQkFDaEIsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7YUFDbkM7U0FDRjtJQUNILENBQUM7OEdBdkNVLGdCQUFnQjtrSEFBaEIsZ0JBQWdCLGNBREosTUFBTTs7MkZBQ2xCLGdCQUFnQjtrQkFENUIsVUFBVTttQkFBQyxFQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuLyogZXNsaW50LWRpc2FibGUgKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vKipcbiAqIEEgRm9jdXNUcmFwIG1hbmFnZWQgYnkgRm9jdXNUcmFwTWFuYWdlci5cbiAqIEltcGxlbWVudGVkIGJ5IENvbmZpZ3VyYWJsZUZvY3VzVHJhcCB0byBhdm9pZCBjaXJjdWxhciBkZXBlbmRlbmN5LlxuICovXG5leHBvcnQgaW50ZXJmYWNlIE1hbmFnZWRGb2N1c1RyYXAge1xuICBfZW5hYmxlKCk6IHZvaWQ7XG4gIF9kaXNhYmxlKCk6IHZvaWQ7XG4gIGZvY3VzSW5pdGlhbEVsZW1lbnRXaGVuUmVhZHkoKTogUHJvbWlzZTxib29sZWFuPjtcbn1cblxuLyoqIEluamVjdGFibGUgdGhhdCBlbnN1cmVzIG9ubHkgdGhlIG1vc3QgcmVjZW50bHkgZW5hYmxlZCBGb2N1c1RyYXAgaXMgYWN0aXZlLiAqL1xuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46ICdyb290J30pXG5leHBvcnQgY2xhc3MgRm9jdXNUcmFwTWFuYWdlciB7XG4gIC8vIEEgc3RhY2sgb2YgdGhlIEZvY3VzVHJhcHMgb24gdGhlIHBhZ2UuIE9ubHkgdGhlIEZvY3VzVHJhcCBhdCB0aGVcbiAgLy8gdG9wIG9mIHRoZSBzdGFjayBpcyBhY3RpdmUuXG4gIHByaXZhdGUgX2ZvY3VzVHJhcFN0YWNrOiBNYW5hZ2VkRm9jdXNUcmFwW10gPSBbXTtcblxuICAvKipcbiAgICogRGlzYWJsZXMgdGhlIEZvY3VzVHJhcCBhdCB0aGUgdG9wIG9mIHRoZSBzdGFjaywgYW5kIHRoZW4gcHVzaGVzXG4gICAqIHRoZSBuZXcgRm9jdXNUcmFwIG9udG8gdGhlIHN0YWNrLlxuICAgKi9cbiAgcmVnaXN0ZXIoZm9jdXNUcmFwOiBNYW5hZ2VkRm9jdXNUcmFwKTogdm9pZCB7XG4gICAgLy8gRGVkdXBlIGZvY3VzVHJhcHMgdGhhdCByZWdpc3RlciBtdWx0aXBsZSB0aW1lcy5cbiAgICB0aGlzLl9mb2N1c1RyYXBTdGFjayA9IHRoaXMuX2ZvY3VzVHJhcFN0YWNrLmZpbHRlcigoZnQpID0+IGZ0ICE9PSBmb2N1c1RyYXApO1xuXG4gICAgbGV0IHN0YWNrID0gdGhpcy5fZm9jdXNUcmFwU3RhY2s7XG5cbiAgICBpZiAoc3RhY2subGVuZ3RoKSB7XG4gICAgICBzdGFja1tzdGFjay5sZW5ndGggLSAxXS5fZGlzYWJsZSgpO1xuICAgIH1cblxuICAgIHN0YWNrLnB1c2goZm9jdXNUcmFwKTtcbiAgICBmb2N1c1RyYXAuX2VuYWJsZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgdGhlIEZvY3VzVHJhcCBmcm9tIHRoZSBzdGFjaywgYW5kIGFjdGl2YXRlcyB0aGVcbiAgICogRm9jdXNUcmFwIHRoYXQgaXMgdGhlIG5ldyB0b3Agb2YgdGhlIHN0YWNrLlxuICAgKi9cbiAgZGVyZWdpc3Rlcihmb2N1c1RyYXA6IE1hbmFnZWRGb2N1c1RyYXApOiB2b2lkIHtcbiAgICBmb2N1c1RyYXAuX2Rpc2FibGUoKTtcblxuICAgIGNvbnN0IHN0YWNrID0gdGhpcy5fZm9jdXNUcmFwU3RhY2s7XG5cbiAgICBjb25zdCBpID0gc3RhY2suaW5kZXhPZihmb2N1c1RyYXApO1xuICAgIGlmIChpICE9PSAtMSkge1xuICAgICAgc3RhY2suc3BsaWNlKGksIDEpO1xuICAgICAgaWYgKHN0YWNrLmxlbmd0aCkge1xuICAgICAgICBzdGFja1tzdGFjay5sZW5ndGggLSAxXS5fZW5hYmxlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=