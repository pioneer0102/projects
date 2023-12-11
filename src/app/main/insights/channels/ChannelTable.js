import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { useSelector } from 'react-redux';
import { ChannelTableHeader } from 'src/app/model/ChannelModel';
import styles from '../style.module.scss';
import OrderStatistics from './statistics/OrderStatistics';
import SaleStatistics from './statistics/SaleStatistics';
import { Channels } from 'src/app/model/Global';
import BarStatistics from './statistics/BarStatistics';
import {
    selectSaleTotalByChannel,
    selectOrderTotalByChannel
} from '../store/channelSlice';

const ChannelTable = () => {
    // const { data: allOrders, isLoading, isError } = useQuery(['channelstatistic'], () => channelStatisticalData(new Date()));
    const saleByChannel = useSelector(selectSaleTotalByChannel);
    const orderByChannel = useSelector(selectOrderTotalByChannel);

    return (
        <>
            <Paper
                className={`py-24 px-32 my-32 mx-24 overflow-auto rounded-md shadow-none ${styles.paper}`}
                sx={{ boxShadow: 'none', borderRadius: 1 }}>
                <Table>
                    <Thead className="border-b-2">
                        <Tr>
                            {ChannelTableHeader.map((item, index) => (
                                <Th
                                    key={index}
                                    align={item.align}>
                                    <Typography
                                        color="text.secondary"
                                        className="font-bold text-20 pb-16">
                                        {item.label}
                                    </Typography>
                                </Th>
                            ))}
                        </Tr>
                    </Thead>
                    <Tbody>
                        {Channels.map((item, index) => {
                            return (
                                <Tr key={index} role="button">
                                    <Td align="left">
                                        <Typography
                                            color="text.secondary"
                                            className="font-semibold text-16 md:pt-16">
                                            {item}
                                        </Typography>
                                    </Td>
                                    <Td align="left">
                                        <Typography
                                            color="text.secondary"
                                            className="font-semibold text-16 md:pt-16">
                                            $ {saleByChannel[item]}
                                        </Typography>
                                    </Td>
                                    <Td align="center" className="md:w-1/3 px-32">
                                        <SaleStatistics channel={item} />
                                    </Td>
                                    <Td align="left">
                                        <Typography
                                            color="text.secondary"
                                            className="font-semibold text-16 md:pt-16">
                                            {orderByChannel[item]}
                                        </Typography>
                                    </Td>
                                    <Td align="center" className="md:w-1/4 px-32">
                                        <OrderStatistics channel={item} />
                                    </Td>
                                </Tr>
                            )
                        })}
                    </Tbody>
                </Table>
            </Paper>
            <BarStatistics />
        </>
    );
};

export default ChannelTable;
