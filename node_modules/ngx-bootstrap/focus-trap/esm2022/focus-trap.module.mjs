import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FocusTrapManager } from './focus-trap-manager';
import { InteractivityChecker } from './interactivity-checker';
import { FocusTrapDirective } from './focus-trap';
import { Platform } from './platform';
import * as i0 from "@angular/core";
export class FocusTrapModule {
    static forRoot() {
        return {
            ngModule: FocusTrapModule,
            providers: [
                FocusTrapManager,
                Platform,
                InteractivityChecker
            ]
        };
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.1.4", ngImport: i0, type: FocusTrapModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.1.4", ngImport: i0, type: FocusTrapModule, declarations: [FocusTrapDirective], imports: [CommonModule], exports: [FocusTrapDirective] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.1.4", ngImport: i0, type: FocusTrapModule, imports: [CommonModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.1.4", ngImport: i0, type: FocusTrapModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [FocusTrapDirective],
                    exports: [FocusTrapDirective]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9jdXMtdHJhcC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvZm9jdXMtdHJhcC9mb2N1cy10cmFwLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQXVCLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFL0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDeEQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDL0QsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ2xELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxZQUFZLENBQUM7O0FBT3RDLE1BQU0sT0FBTyxlQUFlO0lBQzFCLE1BQU0sQ0FBQyxPQUFPO1FBQ1osT0FBTztZQUNMLFFBQVEsRUFBRSxlQUFlO1lBQ3pCLFNBQVMsRUFBRTtnQkFDVCxnQkFBZ0I7Z0JBQ2hCLFFBQVE7Z0JBQ1Isb0JBQW9CO2FBQ3JCO1NBQ0YsQ0FBQztJQUNKLENBQUM7OEdBVlUsZUFBZTsrR0FBZixlQUFlLGlCQUhYLGtCQUFrQixhQUR2QixZQUFZLGFBRVosa0JBQWtCOytHQUVqQixlQUFlLFlBSmhCLFlBQVk7OzJGQUlYLGVBQWU7a0JBTDNCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO29CQUN2QixZQUFZLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQztvQkFDbEMsT0FBTyxFQUFFLENBQUMsa0JBQWtCLENBQUM7aUJBQzlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7IEZvY3VzVHJhcE1hbmFnZXIgfSBmcm9tICcuL2ZvY3VzLXRyYXAtbWFuYWdlcic7XG5pbXBvcnQgeyBJbnRlcmFjdGl2aXR5Q2hlY2tlciB9IGZyb20gJy4vaW50ZXJhY3Rpdml0eS1jaGVja2VyJztcbmltcG9ydCB7IEZvY3VzVHJhcERpcmVjdGl2ZSB9IGZyb20gJy4vZm9jdXMtdHJhcCc7XG5pbXBvcnQgeyBQbGF0Zm9ybSB9IGZyb20gJy4vcGxhdGZvcm0nO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbRm9jdXNUcmFwRGlyZWN0aXZlXSxcbiAgZXhwb3J0czogW0ZvY3VzVHJhcERpcmVjdGl2ZV1cbn0pXG5leHBvcnQgY2xhc3MgRm9jdXNUcmFwTW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVyczxGb2N1c1RyYXBNb2R1bGU+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IEZvY3VzVHJhcE1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICBGb2N1c1RyYXBNYW5hZ2VyLFxuICAgICAgICBQbGF0Zm9ybSxcbiAgICAgICAgSW50ZXJhY3Rpdml0eUNoZWNrZXJcbiAgICAgIF1cbiAgICB9O1xuICB9XG59XG4iXX0=