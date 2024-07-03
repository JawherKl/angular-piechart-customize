import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class BsModalRef {
    constructor() {
        /**
         * Hides the modal
         */
        this.hide = () => void 0;
        /**
         * Sets new class to modal window
         */
        this.setClass = () => void 0;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.1.4", ngImport: i0, type: BsModalRef, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.1.4", ngImport: i0, type: BsModalRef, providedIn: 'platform' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.1.4", ngImport: i0, type: BsModalRef, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'platform' }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnMtbW9kYWwtcmVmLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbW9kYWwvYnMtbW9kYWwtcmVmLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBZ0IsTUFBTSxlQUFlLENBQUM7O0FBR3pELDhEQUE4RDtBQUM5RCxNQUFNLE9BQU8sVUFBVTtJQUZ2QjtRQXFCRTs7V0FFRztRQUNILFNBQUksR0FBZSxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNoQzs7V0FFRztRQUNILGFBQVEsR0FBK0IsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDckQ7OEdBM0JZLFVBQVU7a0hBQVYsVUFBVSxjQUZFLFVBQVU7OzJGQUV0QixVQUFVO2tCQUZ0QixVQUFVO21CQUFDLEVBQUMsVUFBVSxFQUFFLFVBQVUsRUFBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSh7cHJvdmlkZWRJbjogJ3BsYXRmb3JtJ30pXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuZXhwb3J0IGNsYXNzIEJzTW9kYWxSZWY8VCA9IGFueT4ge1xuICAvKipcbiAgICogRXZlbnQgdGhhdCBpcyBmaXJlZCB3aGVuIHRoZSBtb2RhbCBiZWhpbmQgdGhlIHJlZiBzdGFydHMgaGlkaW5nXG4gICAqL1xuICBvbkhpZGU/OiBFdmVudEVtaXR0ZXI8dW5rbm93bj47XG4gIC8qKlxuICAgKiBFdmVudCB0aGF0IGlzIGZpcmVkIHdoZW4gdGhlIG1vZGFsIGJlaGluZCB0aGUgcmVmIGZpbmlzaGVzIGhpZGluZ1xuICAgKi9cbiAgb25IaWRkZW4/OiBFdmVudEVtaXR0ZXI8dW5rbm93bj47XG4gIC8qKlxuICAgKiAgQWxsb3cgdXNlciB0byBJRCBmb3IgdGhlIG1vZGFsLiBPdGhlcndpc2UsIGEgdW5pcXVlIG51bWJlciB3aWxsIGJlIGdpdmVuXG4gICAqL1xuICBpZD86IG51bWJlciB8IHN0cmluZztcblxuICAvKipcbiAgICogUmVmZXJlbmNlIHRvIGEgY29tcG9uZW50IGluc2lkZSB0aGUgbW9kYWwuIE51bGwgaWYgbW9kYWwncyBiZWVuIGNyZWF0ZWQgd2l0aCBUZW1wbGF0ZVJlZlxuICAgKi9cbiAgY29udGVudD86IFQ7XG5cbiAgLyoqXG4gICAqIEhpZGVzIHRoZSBtb2RhbFxuICAgKi9cbiAgaGlkZTogKCkgPT4gdm9pZCA9ICgpID0+IHZvaWQgMDtcbiAgLyoqXG4gICAqIFNldHMgbmV3IGNsYXNzIHRvIG1vZGFsIHdpbmRvd1xuICAgKi9cbiAgc2V0Q2xhc3M6IChuZXdDbGFzczogc3RyaW5nKSA9PiB2b2lkID0gKCkgPT4gdm9pZCAwO1xufVxuIl19