import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/** Default values provider for tooltip */
export class TooltipConfig {
    constructor() {
        /** sets disable adaptive position */
        this.adaptivePosition = true;
        /** tooltip placement, supported positions: 'top', 'bottom', 'left', 'right' */
        this.placement = 'top';
        /** array of event names which triggers tooltip opening */
        this.triggers = 'hover focus';
        /** delay before showing the tooltip */
        this.delay = 0;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.1.4", ngImport: i0, type: TooltipConfig, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.1.4", ngImport: i0, type: TooltipConfig, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.1.4", ngImport: i0, type: TooltipConfig, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvdG9vbHRpcC90b29sdGlwLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUUzQywwQ0FBMEM7QUFFMUMsTUFBTSxPQUFPLGFBQWE7SUFEMUI7UUFFRSxxQ0FBcUM7UUFDckMscUJBQWdCLEdBQUcsSUFBSSxDQUFDO1FBQ3hCLCtFQUErRTtRQUMvRSxjQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLDBEQUEwRDtRQUMxRCxhQUFRLEdBQUcsYUFBYSxDQUFDO1FBR3pCLHVDQUF1QztRQUN2QyxVQUFLLEdBQUcsQ0FBQyxDQUFDO0tBQ1g7OEdBWFksYUFBYTtrSEFBYixhQUFhLGNBREEsTUFBTTs7MkZBQ25CLGFBQWE7a0JBRHpCLFVBQVU7bUJBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vKiogRGVmYXVsdCB2YWx1ZXMgcHJvdmlkZXIgZm9yIHRvb2x0aXAgKi9cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgVG9vbHRpcENvbmZpZyB7XG4gIC8qKiBzZXRzIGRpc2FibGUgYWRhcHRpdmUgcG9zaXRpb24gKi9cbiAgYWRhcHRpdmVQb3NpdGlvbiA9IHRydWU7XG4gIC8qKiB0b29sdGlwIHBsYWNlbWVudCwgc3VwcG9ydGVkIHBvc2l0aW9uczogJ3RvcCcsICdib3R0b20nLCAnbGVmdCcsICdyaWdodCcgKi9cbiAgcGxhY2VtZW50ID0gJ3RvcCc7XG4gIC8qKiBhcnJheSBvZiBldmVudCBuYW1lcyB3aGljaCB0cmlnZ2VycyB0b29sdGlwIG9wZW5pbmcgKi9cbiAgdHJpZ2dlcnMgPSAnaG92ZXIgZm9jdXMnO1xuICAvKiogYSBzZWxlY3RvciBzcGVjaWZ5aW5nIHRoZSBlbGVtZW50IHRoZSB0b29sdGlwIHNob3VsZCBiZSBhcHBlbmRlZCB0by4gKi9cbiAgY29udGFpbmVyPzogc3RyaW5nO1xuICAvKiogZGVsYXkgYmVmb3JlIHNob3dpbmcgdGhlIHRvb2x0aXAgKi9cbiAgZGVsYXkgPSAwO1xufVxuIl19