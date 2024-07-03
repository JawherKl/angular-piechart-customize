import { LegendPosition } from './types/legend.model';
import { ScaleType } from './types/scale-type.enum';
import { ViewDimensions } from './types/view-dimension.interface';
export declare function calculateViewDimensions({ width, height, margins, showXAxis, showYAxis, xAxisHeight, yAxisWidth, showXLabel, showYLabel, showLegend, legendType, legendPosition, columns }: {
    width: any;
    height: any;
    margins: any;
    showXAxis?: boolean;
    showYAxis?: boolean;
    xAxisHeight?: number;
    yAxisWidth?: number;
    showXLabel?: boolean;
    showYLabel?: boolean;
    showLegend?: boolean;
    legendType?: ScaleType;
    legendPosition?: LegendPosition;
    columns?: number;
}): ViewDimensions;
