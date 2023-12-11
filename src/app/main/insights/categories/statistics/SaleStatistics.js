import ReactApexChart from 'react-apexcharts';
import { useSelector } from 'react-redux';
import {
    selectSaleStatistics,
} from '../../store/categorySlice';
import green from '@mui/material/colors/green';

const SaleStatistics = (props) => {
    const {category} = props;
    const saleStatistics = useSelector(selectSaleStatistics);

    const series = [
        {
            name: 'Sale',
            data: saleStatistics[category]
        }
    ];

    const chartOptions = {
        chart: {
            animations: {
                enabled: false,
            },
            fontFamily: 'inherit',
            foreColor: 'inherit',
            height: '100%',
            type: 'area',
            sparkline: {
                enabled: true,
            },
        },
        colors: [green[500]],
        stroke: {
            curve: 'smooth',
            width: 2,
        },
        tooltip: {
            theme: 'dark',
        },
        xaxis: {
            type: 'category',
        },
        yaxis: {
            labels: {
              
            },
            show: false,
            tickAmount: 5,
          },
    };

    return (
        <div className='my-16'>
            {
                <ReactApexChart
                    className="flex-auto w-full h-40"
                    options={chartOptions}
                    series={series}
                    type={chartOptions.chart.type}
                    height={chartOptions.chart.height}
                />
            }
        </div>
    );
}

export default SaleStatistics;