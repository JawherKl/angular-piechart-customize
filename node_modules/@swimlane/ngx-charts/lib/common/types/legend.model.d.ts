import { ScaleType } from './scale-type.enum';
export interface LegendOptions {
    colors: any;
    domain: any[];
    position: LegendPosition;
    title: string;
    scaleType: ScaleType;
}
export declare enum LegendPosition {
    Right = "right",
    Below = "below"
}
export declare enum LegendType {
    ScaleLegend = "scaleLegend",
    Legend = "legend"
}
