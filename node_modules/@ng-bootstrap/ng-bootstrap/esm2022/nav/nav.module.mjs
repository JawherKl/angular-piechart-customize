import { NgModule } from '@angular/core';
import { NgbNav, NgbNavContent, NgbNavItem, NgbNavItemRole, NgbNavLink, NgbNavLinkButton, NgbNavLinkBase } from './nav';
import { NgbNavOutlet, NgbNavPane } from './nav-outlet';
import * as i0 from "@angular/core";
export { NgbNav, NgbNavContent, NgbNavItem, NgbNavItemRole, NgbNavLink, NgbNavLinkButton, NgbNavLinkBase, } from './nav';
export { NgbNavOutlet, NgbNavPane } from './nav-outlet';
export { NgbNavConfig } from './nav-config';
const NGB_NAV_DIRECTIVES = [
    NgbNavContent,
    NgbNav,
    NgbNavItem,
    NgbNavItemRole,
    NgbNavLink,
    NgbNavLinkButton,
    NgbNavLinkBase,
    NgbNavOutlet,
    NgbNavPane,
];
class NgbNavModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbNavModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.0.6", ngImport: i0, type: NgbNavModule, imports: [NgbNavContent,
            NgbNav,
            NgbNavItem,
            NgbNavItemRole,
            NgbNavLink,
            NgbNavLinkButton,
            NgbNavLinkBase,
            NgbNavOutlet,
            NgbNavPane], exports: [NgbNavContent,
            NgbNav,
            NgbNavItem,
            NgbNavItemRole,
            NgbNavLink,
            NgbNavLinkButton,
            NgbNavLinkBase,
            NgbNavOutlet,
            NgbNavPane] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbNavModule }); }
}
export { NgbNavModule };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbNavModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: NGB_NAV_DIRECTIVES,
                    exports: NGB_NAV_DIRECTIVES,
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9uYXYvbmF2Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXpDLE9BQU8sRUFBRSxNQUFNLEVBQUUsYUFBYSxFQUFFLFVBQVUsRUFBRSxjQUFjLEVBQUUsVUFBVSxFQUFFLGdCQUFnQixFQUFFLGNBQWMsRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUV4SCxPQUFPLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxNQUFNLGNBQWMsQ0FBQzs7QUFFeEQsT0FBTyxFQUNOLE1BQU0sRUFDTixhQUFhLEVBRWIsVUFBVSxFQUNWLGNBQWMsRUFDZCxVQUFVLEVBQ1YsZ0JBQWdCLEVBQ2hCLGNBQWMsR0FFZCxNQUFNLE9BQU8sQ0FBQztBQUNmLE9BQU8sRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3hELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFFNUMsTUFBTSxrQkFBa0IsR0FBRztJQUMxQixhQUFhO0lBQ2IsTUFBTTtJQUNOLFVBQVU7SUFDVixjQUFjO0lBQ2QsVUFBVTtJQUNWLGdCQUFnQjtJQUNoQixjQUFjO0lBQ2QsWUFBWTtJQUNaLFVBQVU7Q0FDVixDQUFDO0FBRUYsTUFJYSxZQUFZOzhHQUFaLFlBQVk7K0dBQVosWUFBWSxZQWZ4QixhQUFhO1lBQ2IsTUFBTTtZQUNOLFVBQVU7WUFDVixjQUFjO1lBQ2QsVUFBVTtZQUNWLGdCQUFnQjtZQUNoQixjQUFjO1lBQ2QsWUFBWTtZQUNaLFVBQVUsYUFSVixhQUFhO1lBQ2IsTUFBTTtZQUNOLFVBQVU7WUFDVixjQUFjO1lBQ2QsVUFBVTtZQUNWLGdCQUFnQjtZQUNoQixjQUFjO1lBQ2QsWUFBWTtZQUNaLFVBQVU7K0dBT0UsWUFBWTs7U0FBWixZQUFZOzJGQUFaLFlBQVk7a0JBSnhCLFFBQVE7bUJBQUM7b0JBQ1QsT0FBTyxFQUFFLGtCQUFrQjtvQkFDM0IsT0FBTyxFQUFFLGtCQUFrQjtpQkFDM0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBOZ2JOYXYsIE5nYk5hdkNvbnRlbnQsIE5nYk5hdkl0ZW0sIE5nYk5hdkl0ZW1Sb2xlLCBOZ2JOYXZMaW5rLCBOZ2JOYXZMaW5rQnV0dG9uLCBOZ2JOYXZMaW5rQmFzZSB9IGZyb20gJy4vbmF2JztcblxuaW1wb3J0IHsgTmdiTmF2T3V0bGV0LCBOZ2JOYXZQYW5lIH0gZnJvbSAnLi9uYXYtb3V0bGV0JztcblxuZXhwb3J0IHtcblx0TmdiTmF2LFxuXHROZ2JOYXZDb250ZW50LFxuXHROZ2JOYXZDb250ZW50Q29udGV4dCxcblx0TmdiTmF2SXRlbSxcblx0TmdiTmF2SXRlbVJvbGUsXG5cdE5nYk5hdkxpbmssXG5cdE5nYk5hdkxpbmtCdXR0b24sXG5cdE5nYk5hdkxpbmtCYXNlLFxuXHROZ2JOYXZDaGFuZ2VFdmVudCxcbn0gZnJvbSAnLi9uYXYnO1xuZXhwb3J0IHsgTmdiTmF2T3V0bGV0LCBOZ2JOYXZQYW5lIH0gZnJvbSAnLi9uYXYtb3V0bGV0JztcbmV4cG9ydCB7IE5nYk5hdkNvbmZpZyB9IGZyb20gJy4vbmF2LWNvbmZpZyc7XG5cbmNvbnN0IE5HQl9OQVZfRElSRUNUSVZFUyA9IFtcblx0TmdiTmF2Q29udGVudCxcblx0TmdiTmF2LFxuXHROZ2JOYXZJdGVtLFxuXHROZ2JOYXZJdGVtUm9sZSxcblx0TmdiTmF2TGluayxcblx0TmdiTmF2TGlua0J1dHRvbixcblx0TmdiTmF2TGlua0Jhc2UsXG5cdE5nYk5hdk91dGxldCxcblx0TmdiTmF2UGFuZSxcbl07XG5cbkBOZ01vZHVsZSh7XG5cdGltcG9ydHM6IE5HQl9OQVZfRElSRUNUSVZFUyxcblx0ZXhwb3J0czogTkdCX05BVl9ESVJFQ1RJVkVTLFxufSlcbmV4cG9ydCBjbGFzcyBOZ2JOYXZNb2R1bGUge31cbiJdfQ==