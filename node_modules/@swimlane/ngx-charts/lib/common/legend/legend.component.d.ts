import { EventEmitter, SimpleChanges, OnChanges, ChangeDetectorRef } from '@angular/core';
import { ColorHelper } from '../color.helper';
import * as i0 from "@angular/core";
export interface LegendEntry {
    color: string;
    formattedLabel: string;
    label: string;
}
export declare class LegendComponent implements OnChanges {
    private cd;
    data: string[];
    title: string;
    colors: ColorHelper;
    height: number;
    width: number;
    activeEntries: any;
    horizontal: boolean;
    labelClick: EventEmitter<string>;
    labelActivate: EventEmitter<{
        name: string;
    }>;
    labelDeactivate: EventEmitter<{
        name: string;
    }>;
    legendEntries: LegendEntry[];
    constructor(cd: ChangeDetectorRef);
    ngOnChanges(changes: SimpleChanges): void;
    update(): void;
    getLegendEntries(): LegendEntry[];
    isActive(entry: LegendEntry): boolean;
    activate(item: {
        name: string;
    }): void;
    deactivate(item: {
        name: string;
    }): void;
    trackBy(index: number, item: LegendEntry): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<LegendComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<LegendComponent, "ngx-charts-legend", never, { "data": "data"; "title": "title"; "colors": "colors"; "height": "height"; "width": "width"; "activeEntries": "activeEntries"; "horizontal": "horizontal"; }, { "labelClick": "labelClick"; "labelActivate": "labelActivate"; "labelDeactivate": "labelDeactivate"; }, never, never>;
}
