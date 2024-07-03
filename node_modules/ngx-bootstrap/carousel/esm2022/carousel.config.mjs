import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class CarouselConfig {
    constructor() {
        /* Default interval of auto changing of slides */
        this.interval = 5000;
        /* Is loop of auto changing of slides can be paused */
        this.noPause = false;
        /* Is slides can wrap from the last to the first slide */
        this.noWrap = false;
        /* Show carousel-indicators */
        this.showIndicators = true;
        /* Slides can be paused on focus */
        this.pauseOnFocus = false;
        /* If `true` - carousel indicators indicate slides chunks works ONLY if singleSlideOffset = FALSE */
        this.indicatorsByChunk = false;
        /* If value more then 1 — carousel works in multilist mode */
        this.itemsPerSlide = 1;
        /* If `true` — carousel shifts by one element. By default carousel shifts by number
          of visible elements (itemsPerSlide field) */
        this.singleSlideOffset = false;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.1.4", ngImport: i0, type: CarouselConfig, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.1.4", ngImport: i0, type: CarouselConfig, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.1.4", ngImport: i0, type: CarouselConfig, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2Fyb3VzZWwuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Nhcm91c2VsL2Nhcm91c2VsLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUszQyxNQUFNLE9BQU8sY0FBYztJQUgzQjtRQUlFLGlEQUFpRDtRQUNqRCxhQUFRLEdBQUcsSUFBSSxDQUFDO1FBRWhCLHNEQUFzRDtRQUN0RCxZQUFPLEdBQUcsS0FBSyxDQUFDO1FBRWhCLHlEQUF5RDtRQUN6RCxXQUFNLEdBQUcsS0FBSyxDQUFDO1FBRWYsOEJBQThCO1FBQzlCLG1CQUFjLEdBQUcsSUFBSSxDQUFDO1FBRXRCLG1DQUFtQztRQUNuQyxpQkFBWSxHQUFHLEtBQUssQ0FBQztRQUVyQixvR0FBb0c7UUFDcEcsc0JBQWlCLEdBQUcsS0FBSyxDQUFDO1FBRTFCLDZEQUE2RDtRQUM3RCxrQkFBYSxHQUFHLENBQUMsQ0FBQztRQUVsQjtzREFDOEM7UUFDOUMsc0JBQWlCLEdBQUcsS0FBSyxDQUFDO0tBQzNCOzhHQXpCWSxjQUFjO2tIQUFkLGNBQWMsY0FGYixNQUFNOzsyRkFFUCxjQUFjO2tCQUgxQixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgQ2Fyb3VzZWxDb25maWcge1xuICAvKiBEZWZhdWx0IGludGVydmFsIG9mIGF1dG8gY2hhbmdpbmcgb2Ygc2xpZGVzICovXG4gIGludGVydmFsID0gNTAwMDtcblxuICAvKiBJcyBsb29wIG9mIGF1dG8gY2hhbmdpbmcgb2Ygc2xpZGVzIGNhbiBiZSBwYXVzZWQgKi9cbiAgbm9QYXVzZSA9IGZhbHNlO1xuXG4gIC8qIElzIHNsaWRlcyBjYW4gd3JhcCBmcm9tIHRoZSBsYXN0IHRvIHRoZSBmaXJzdCBzbGlkZSAqL1xuICBub1dyYXAgPSBmYWxzZTtcblxuICAvKiBTaG93IGNhcm91c2VsLWluZGljYXRvcnMgKi9cbiAgc2hvd0luZGljYXRvcnMgPSB0cnVlO1xuXG4gIC8qIFNsaWRlcyBjYW4gYmUgcGF1c2VkIG9uIGZvY3VzICovXG4gIHBhdXNlT25Gb2N1cyA9IGZhbHNlO1xuXG4gIC8qIElmIGB0cnVlYCAtIGNhcm91c2VsIGluZGljYXRvcnMgaW5kaWNhdGUgc2xpZGVzIGNodW5rcyB3b3JrcyBPTkxZIGlmIHNpbmdsZVNsaWRlT2Zmc2V0ID0gRkFMU0UgKi9cbiAgaW5kaWNhdG9yc0J5Q2h1bmsgPSBmYWxzZTtcblxuICAvKiBJZiB2YWx1ZSBtb3JlIHRoZW4gMSDigJQgY2Fyb3VzZWwgd29ya3MgaW4gbXVsdGlsaXN0IG1vZGUgKi9cbiAgaXRlbXNQZXJTbGlkZSA9IDE7XG5cbiAgLyogSWYgYHRydWVgIOKAlCBjYXJvdXNlbCBzaGlmdHMgYnkgb25lIGVsZW1lbnQuIEJ5IGRlZmF1bHQgY2Fyb3VzZWwgc2hpZnRzIGJ5IG51bWJlclxuICAgIG9mIHZpc2libGUgZWxlbWVudHMgKGl0ZW1zUGVyU2xpZGUgZmllbGQpICovXG4gIHNpbmdsZVNsaWRlT2Zmc2V0ID0gZmFsc2U7XG59XG4iXX0=