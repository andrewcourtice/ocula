import LINE_TYPE from '../enums/line-type';

import * as d3 from '../../../d3/index';

export default {
    [LINE_TYPE.line]: d3.curveLinear,
    [LINE_TYPE.spline]: d3.curveCatmullRom.alpha(1),
    [LINE_TYPE.step]: d3.curveStep
};