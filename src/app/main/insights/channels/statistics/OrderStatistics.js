import ReactApexChart from 'react-apexcharts';
import { useSelector } from 'react-redux';
import { selectOrderStatistics } from '../../store/channelSlice';
import green from '@mui/material/colors/green';

const OrderStatistics = (props) => {
    const { channel } = props;
    const orderStatistics = useSelector(selectOrderStatistics);

    const series = [
        {
            name: 'Orders',
            data: orderStatistics[channel]
        }
    ];

    const chartOptions = {
        chart: {
            animations: {
                enabled: false
            },
            fontFamily: 'inherit',
            foreColor: 'inherit',
            height: '100%',
            type: 'area',
            sparkline: {
                enabled: true
            }
        },
        colors: [green[500]],
        stroke: {
            curve: 'smooth',
            width: 2
        },
        tooltip: {
            theme: 'dark'
        },
        xaxis: {
            type: 'category'
        },
        yaxis: {
            labels: {},
            show: false,
            tickAmount: 5
        }
    };

    return (
        <div className="my-16">
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
};

export default OrderStatistics;
