import { NgModule } from '@angular/core';
import { NgbScrollSpy, NgbScrollSpyFragment, NgbScrollSpyItem, NgbScrollSpyMenu } from './scrollspy';
import * as i0 from "@angular/core";
export { NgbScrollSpy, NgbScrollSpyItem, NgbScrollSpyFragment, NgbScrollSpyMenu } from './scrollspy';
export { NgbScrollSpyConfig } from './scrollspy-config';
export { NgbScrollSpyService } from './scrollspy.service';
class NgbScrollSpyModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbScrollSpyModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.0.6", ngImport: i0, type: NgbScrollSpyModule, imports: [NgbScrollSpy, NgbScrollSpyItem, NgbScrollSpyFragment, NgbScrollSpyMenu], exports: [NgbScrollSpy, NgbScrollSpyItem, NgbScrollSpyFragment, NgbScrollSpyMenu] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbScrollSpyModule }); }
}
export { NgbScrollSpyModule };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbScrollSpyModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [NgbScrollSpy, NgbScrollSpyItem, NgbScrollSpyFragment, NgbScrollSpyMenu],
                    exports: [NgbScrollSpy, NgbScrollSpyItem, NgbScrollSpyFragment, NgbScrollSpyMenu],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsc3B5Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zY3JvbGxzcHkvc2Nyb2xsc3B5Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXpDLE9BQU8sRUFBRSxZQUFZLEVBQUUsb0JBQW9CLEVBQUUsZ0JBQWdCLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxhQUFhLENBQUM7O0FBRXJHLE9BQU8sRUFBRSxZQUFZLEVBQUUsZ0JBQWdCLEVBQUUsb0JBQW9CLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDckcsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDeEQsT0FBTyxFQUFFLG1CQUFtQixFQUE4QixNQUFNLHFCQUFxQixDQUFDO0FBRXRGLE1BSWEsa0JBQWtCOzhHQUFsQixrQkFBa0I7K0dBQWxCLGtCQUFrQixZQUhwQixZQUFZLEVBQUUsZ0JBQWdCLEVBQUUsb0JBQW9CLEVBQUUsZ0JBQWdCLGFBQ3RFLFlBQVksRUFBRSxnQkFBZ0IsRUFBRSxvQkFBb0IsRUFBRSxnQkFBZ0I7K0dBRXBFLGtCQUFrQjs7U0FBbEIsa0JBQWtCOzJGQUFsQixrQkFBa0I7a0JBSjlCLFFBQVE7bUJBQUM7b0JBQ1QsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLGdCQUFnQixFQUFFLG9CQUFvQixFQUFFLGdCQUFnQixDQUFDO29CQUNqRixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsZ0JBQWdCLEVBQUUsb0JBQW9CLEVBQUUsZ0JBQWdCLENBQUM7aUJBQ2pGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTmdiU2Nyb2xsU3B5LCBOZ2JTY3JvbGxTcHlGcmFnbWVudCwgTmdiU2Nyb2xsU3B5SXRlbSwgTmdiU2Nyb2xsU3B5TWVudSB9IGZyb20gJy4vc2Nyb2xsc3B5JztcblxuZXhwb3J0IHsgTmdiU2Nyb2xsU3B5LCBOZ2JTY3JvbGxTcHlJdGVtLCBOZ2JTY3JvbGxTcHlGcmFnbWVudCwgTmdiU2Nyb2xsU3B5TWVudSB9IGZyb20gJy4vc2Nyb2xsc3B5JztcbmV4cG9ydCB7IE5nYlNjcm9sbFNweUNvbmZpZyB9IGZyb20gJy4vc2Nyb2xsc3B5LWNvbmZpZyc7XG5leHBvcnQgeyBOZ2JTY3JvbGxTcHlTZXJ2aWNlLCBOZ2JTY3JvbGxTcHlQcm9jZXNzQ2hhbmdlcyB9IGZyb20gJy4vc2Nyb2xsc3B5LnNlcnZpY2UnO1xuXG5ATmdNb2R1bGUoe1xuXHRpbXBvcnRzOiBbTmdiU2Nyb2xsU3B5LCBOZ2JTY3JvbGxTcHlJdGVtLCBOZ2JTY3JvbGxTcHlGcmFnbWVudCwgTmdiU2Nyb2xsU3B5TWVudV0sXG5cdGV4cG9ydHM6IFtOZ2JTY3JvbGxTcHksIE5nYlNjcm9sbFNweUl0ZW0sIE5nYlNjcm9sbFNweUZyYWdtZW50LCBOZ2JTY3JvbGxTcHlNZW51XSxcbn0pXG5leHBvcnQgY2xhc3MgTmdiU2Nyb2xsU3B5TW9kdWxlIHt9XG4iXX0=