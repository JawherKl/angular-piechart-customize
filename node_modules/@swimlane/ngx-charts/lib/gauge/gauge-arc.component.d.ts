import { EventEmitter, TemplateRef } from '@angular/core';
import { ColorHelper } from '../common/color.helper';
import { DataItem } from '../models/chart-data.model';
import { PlacementTypes } from '../common/tooltip/position';
import { StyleTypes } from '../common/tooltip/style.type';
import * as i0 from "@angular/core";
export interface ArcItem {
    data: DataItem;
    endAngle: number;
    innerRadius: number;
    outerRadius: number;
}
export declare class GaugeArcComponent {
    backgroundArc: ArcItem;
    valueArc: ArcItem;
    cornerRadius: number;
    colors: ColorHelper;
    isActive: boolean;
    tooltipDisabled: boolean;
    valueFormatting: (value: any) => string;
    tooltipTemplate: TemplateRef<any>;
    animations: boolean;
    select: EventEmitter<any>;
    activate: EventEmitter<any>;
    deactivate: EventEmitter<any>;
    placementTypes: typeof PlacementTypes;
    styleTypes: typeof StyleTypes;
    tooltipText(arc: ArcItem): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<GaugeArcComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<GaugeArcComponent, "g[ngx-charts-gauge-arc]", never, { "backgroundArc": "backgroundArc"; "valueArc": "valueArc"; "cornerRadius": "cornerRadius"; "colors": "colors"; "isActive": "isActive"; "tooltipDisabled": "tooltipDisabled"; "valueFormatting": "valueFormatting"; "tooltipTemplate": "tooltipTemplate"; "animations": "animations"; }, { "select": "select"; "activate": "activate"; "deactivate": "deactivate"; }, never, never>;
}
