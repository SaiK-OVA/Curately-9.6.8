import * as am5 from "@amcharts/amcharts5";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";


interface ChartInitializationParams {
  id: string;
}

const initializeChart = ({ id }: ChartInitializationParams): am5.Root => {
  am5.addLicense("AM5C450936013");

  let root = am5.Root.new(id);
  return root;
};


export { am5, am5themes_Animated, initializeChart }