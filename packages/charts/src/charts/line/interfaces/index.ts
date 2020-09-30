import LINE_TYPE from '../enums/line-type';
import MARKER_TYPE from '../enums/marker-type';

import SCALE from '../../../enums/scale';

import type {
    IChartOptions
} from '../../_base/chart';

export interface ILinePoint<T = any> {
    value: T;
    xValue: number;
    yValue: number;
    x: number;
    y0: number;
    y1: number;
};

export interface ILineScaleOptions<T> {
    type?: SCALE,
    value?(value: T, index?: number): any;
    format?(value: any): string;
}

export interface ILineOptions<T = any> extends IChartOptions {
    type?: LINE_TYPE,
    scales: {
        x?: ILineScaleOptions<T>;
        y?: ILineScaleOptions<T>;
    },
    markers?: {
        type?: MARKER_TYPE;
        visible?: boolean;
    },
    labels?: {
        visible?: boolean;
        content?(value: ILinePoint<T>, index?: number): any;
    },
    classes?: {
        svg?: string;
        canvas?: string;
        lineGroup?: string;
        markerGroup?: string;
        line?: string;
        area?: string;
        marker?: string;
    },
    colours?: {
        line?: string;
        marker?: string;
        axis?: string;
        tick?: string;
        label?: string;
    }
}