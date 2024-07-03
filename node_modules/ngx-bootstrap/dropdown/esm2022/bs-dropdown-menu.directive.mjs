import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';
import { BsDropdownState } from './bs-dropdown.state';
import * as i0 from "@angular/core";
import * as i1 from "./bs-dropdown.state";
export class BsDropdownMenuDirective {
    constructor(_state, _viewContainer, _templateRef) {
        _state.resolveDropdownMenu({
            templateRef: _templateRef,
            viewContainer: _viewContainer
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.1.4", ngImport: i0, type: BsDropdownMenuDirective, deps: [{ token: i1.BsDropdownState }, { token: i0.ViewContainerRef }, { token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.1.4", type: BsDropdownMenuDirective, selector: "[bsDropdownMenu],[dropdownMenu]", exportAs: ["bs-dropdown-menu"], ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.1.4", ngImport: i0, type: BsDropdownMenuDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[bsDropdownMenu],[dropdownMenu]',
                    exportAs: 'bs-dropdown-menu'
                }]
        }], ctorParameters: function () { return [{ type: i1.BsDropdownState }, { type: i0.ViewContainerRef }, { type: i0.TemplateRef }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnMtZHJvcGRvd24tbWVudS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvZHJvcGRvd24vYnMtZHJvcGRvd24tbWVudS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDOzs7QUFNdEQsTUFBTSxPQUFPLHVCQUF1QjtJQUNsQyxZQUNFLE1BQXVCLEVBQ3ZCLGNBQWdDLEVBQ2hDLFlBQWtEO1FBRWxELE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQztZQUN6QixXQUFXLEVBQUUsWUFBWTtZQUN6QixhQUFhLEVBQUUsY0FBYztTQUM5QixDQUFDLENBQUM7SUFDTCxDQUFDOzhHQVZVLHVCQUF1QjtrR0FBdkIsdUJBQXVCOzsyRkFBdkIsdUJBQXVCO2tCQUpuQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxpQ0FBaUM7b0JBQzNDLFFBQVEsRUFBRSxrQkFBa0I7aUJBQzdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBUZW1wbGF0ZVJlZiwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQnNEcm9wZG93blN0YXRlIH0gZnJvbSAnLi9icy1kcm9wZG93bi5zdGF0ZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tic0Ryb3Bkb3duTWVudV0sW2Ryb3Bkb3duTWVudV0nLFxuICBleHBvcnRBczogJ2JzLWRyb3Bkb3duLW1lbnUnXG59KVxuZXhwb3J0IGNsYXNzIEJzRHJvcGRvd25NZW51RGlyZWN0aXZlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgX3N0YXRlOiBCc0Ryb3Bkb3duU3RhdGUsXG4gICAgX3ZpZXdDb250YWluZXI6IFZpZXdDb250YWluZXJSZWYsXG4gICAgX3RlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxCc0Ryb3Bkb3duTWVudURpcmVjdGl2ZT5cbiAgKSB7XG4gICAgX3N0YXRlLnJlc29sdmVEcm9wZG93bk1lbnUoe1xuICAgICAgdGVtcGxhdGVSZWY6IF90ZW1wbGF0ZVJlZixcbiAgICAgIHZpZXdDb250YWluZXI6IF92aWV3Q29udGFpbmVyXG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==