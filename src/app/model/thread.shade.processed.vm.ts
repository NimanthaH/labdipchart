import { LabdipChartVM } from "./labdip.chart.vm";
import { ThreadShadeChartVM } from "./thread.shade.chart.vm";

export interface ThreadShadeProcessedVM{
    labdipChartModels : LabdipChartVM[],
    threadShadeModels : ThreadShadeChartVM[],
    processResult : ThreadShadeChartVM[]
}