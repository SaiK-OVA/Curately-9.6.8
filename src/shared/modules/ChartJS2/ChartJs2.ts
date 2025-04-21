
import {
    Chart as ChartJS, ArcElement, Tooltip as ChartTooltip, Legend, CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title
} from 'chart.js';


ChartJS.register(
    ArcElement, 
    ChartTooltip, 
    Legend, 
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title
);

export default ChartJS;