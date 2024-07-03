import { EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
export declare class LegendEntryComponent {
    color: string;
    label: string;
    formattedLabel: string;
    isActive: boolean;
    select: EventEmitter<string>;
    activate: EventEmitter<{
        name: string;
    }>;
    deactivate: EventEmitter<{
        name: string;
    }>;
    toggle: EventEmitter<string>;
    get trimmedLabel(): string;
    onMouseEnter(): void;
    onMouseLeave(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<LegendEntryComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<LegendEntryComponent, "ngx-charts-legend-entry", never, { "color": "color"; "label": "label"; "formattedLabel": "formattedLabel"; "isActive": "isActive"; }, { "select": "select"; "activate": "activate"; "deactivate": "deactivate"; "toggle": "toggle"; }, never, never>;
}
