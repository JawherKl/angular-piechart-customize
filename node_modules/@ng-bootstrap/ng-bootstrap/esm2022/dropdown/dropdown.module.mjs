import { NgModule } from '@angular/core';
import { NgbDropdown, NgbDropdownAnchor, NgbDropdownToggle, NgbDropdownMenu, NgbDropdownItem } from './dropdown';
import * as i0 from "@angular/core";
export { NgbDropdown, NgbDropdownAnchor, NgbDropdownToggle, NgbDropdownMenu, NgbDropdownItem, 
// eslint-disable-next-line deprecation/deprecation
NgbNavbar, } from './dropdown';
export { NgbDropdownConfig } from './dropdown-config';
const NGB_DROPDOWN_DIRECTIVES = [NgbDropdown, NgbDropdownAnchor, NgbDropdownToggle, NgbDropdownMenu, NgbDropdownItem];
class NgbDropdownModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbDropdownModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.0.6", ngImport: i0, type: NgbDropdownModule, imports: [NgbDropdown, NgbDropdownAnchor, NgbDropdownToggle, NgbDropdownMenu, NgbDropdownItem], exports: [NgbDropdown, NgbDropdownAnchor, NgbDropdownToggle, NgbDropdownMenu, NgbDropdownItem] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbDropdownModule }); }
}
export { NgbDropdownModule };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbDropdownModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: NGB_DROPDOWN_DIRECTIVES,
                    exports: NGB_DROPDOWN_DIRECTIVES,
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24ubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Ryb3Bkb3duL2Ryb3Bkb3duLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxXQUFXLEVBQUUsaUJBQWlCLEVBQUUsaUJBQWlCLEVBQUUsZUFBZSxFQUFFLGVBQWUsRUFBRSxNQUFNLFlBQVksQ0FBQzs7QUFFakgsT0FBTyxFQUNOLFdBQVcsRUFDWCxpQkFBaUIsRUFDakIsaUJBQWlCLEVBQ2pCLGVBQWUsRUFDZixlQUFlO0FBQ2YsbURBQW1EO0FBQ25ELFNBQVMsR0FDVCxNQUFNLFlBQVksQ0FBQztBQUNwQixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUV0RCxNQUFNLHVCQUF1QixHQUFHLENBQUMsV0FBVyxFQUFFLGlCQUFpQixFQUFFLGlCQUFpQixFQUFFLGVBQWUsRUFBRSxlQUFlLENBQUMsQ0FBQztBQUV0SCxNQUlhLGlCQUFpQjs4R0FBakIsaUJBQWlCOytHQUFqQixpQkFBaUIsWUFORyxXQUFXLEVBQUUsaUJBQWlCLEVBQUUsaUJBQWlCLEVBQUUsZUFBZSxFQUFFLGVBQWUsYUFBbkYsV0FBVyxFQUFFLGlCQUFpQixFQUFFLGlCQUFpQixFQUFFLGVBQWUsRUFBRSxlQUFlOytHQU12RyxpQkFBaUI7O1NBQWpCLGlCQUFpQjsyRkFBakIsaUJBQWlCO2tCQUo3QixRQUFRO21CQUFDO29CQUNULE9BQU8sRUFBRSx1QkFBdUI7b0JBQ2hDLE9BQU8sRUFBRSx1QkFBdUI7aUJBQ2hDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5nYkRyb3Bkb3duLCBOZ2JEcm9wZG93bkFuY2hvciwgTmdiRHJvcGRvd25Ub2dnbGUsIE5nYkRyb3Bkb3duTWVudSwgTmdiRHJvcGRvd25JdGVtIH0gZnJvbSAnLi9kcm9wZG93bic7XG5cbmV4cG9ydCB7XG5cdE5nYkRyb3Bkb3duLFxuXHROZ2JEcm9wZG93bkFuY2hvcixcblx0TmdiRHJvcGRvd25Ub2dnbGUsXG5cdE5nYkRyb3Bkb3duTWVudSxcblx0TmdiRHJvcGRvd25JdGVtLFxuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZGVwcmVjYXRpb24vZGVwcmVjYXRpb25cblx0TmdiTmF2YmFyLFxufSBmcm9tICcuL2Ryb3Bkb3duJztcbmV4cG9ydCB7IE5nYkRyb3Bkb3duQ29uZmlnIH0gZnJvbSAnLi9kcm9wZG93bi1jb25maWcnO1xuXG5jb25zdCBOR0JfRFJPUERPV05fRElSRUNUSVZFUyA9IFtOZ2JEcm9wZG93biwgTmdiRHJvcGRvd25BbmNob3IsIE5nYkRyb3Bkb3duVG9nZ2xlLCBOZ2JEcm9wZG93bk1lbnUsIE5nYkRyb3Bkb3duSXRlbV07XG5cbkBOZ01vZHVsZSh7XG5cdGltcG9ydHM6IE5HQl9EUk9QRE9XTl9ESVJFQ1RJVkVTLFxuXHRleHBvcnRzOiBOR0JfRFJPUERPV05fRElSRUNUSVZFUyxcbn0pXG5leHBvcnQgY2xhc3MgTmdiRHJvcGRvd25Nb2R1bGUge31cbiJdfQ==