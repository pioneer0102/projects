import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { useSelector } from 'react-redux';
import { CategoryTableHeader } from 'src/app/model/CategoryModel';
import styles from '../style.module.scss';
import OrderStatistics from './statistics/OrderStatistics';
import SaleStatistics from './statistics/SaleStatistics';
import { Cagetories } from 'src/app/model/Global';
import BarStatistics from './statistics/BarStatistics';
import {
    selectSaleTotalByCategory,
    selectOrderTotalByCategory
} from '../store/categorySlice';

const CategoryTable = () => {
    const saleByCategory = useSelector(selectSaleTotalByCategory);
    const orderByCategory = useSelector(selectOrderTotalByCategory);

    return (
        <>
            <Paper
                className={`py-24 px-32 my-32 mx-24 overflow-auto rounded-md shadow-none ${styles.paper}`}
                sx={{ boxShadow: 'none', borderRadius: 1 }}
            >
                <Table>
                    <Thead className="border-b-2">
                        <Tr>
                            {CategoryTableHeader.map((item, index) => {
                                return (
                                    <Th key={index} align={item.align}>
                                        <Typography
                                            color="text.secondary"
                                            className="font-bold text-20 pb-16"
                                        >
                                            {item.label}
                                        </Typography>
                                    </Th>
                                );
                            })}
                        </Tr>
                    </Thead>
                    <Tbody>
                        {Cagetories.map((item, index) => {
                            return (
                                <Tr key={index} role="button">
                                    <Td align="left">
                                        <Typography
                                            color="text.secondary"
                                            className="font-semibold text-16 md:pt-16"
                                        >
                                            {item}
                                        </Typography>
                                    </Td>
                                    <Td align="left">
                                        <Typography
                                            color="text.secondary"
                                            className="font-semibold text-16 md:pt-16"
                                        >
                                            $ {saleByCategory[item]}
                                        </Typography>
                                    </Td>
                                    <Td
                                        align="center"
                                        className="md:w-1/3 px-32"
                                    >
                                        <SaleStatistics category={item} />
                                    </Td>
                                    <Td align="left">
                                        <Typography
                                            color="text.secondary"
                                            className="font-semibold text-16 md:pt-16"
                                        >
                                            {orderByCategory[item]}
                                        </Typography>
                                    </Td>
                                    <Td
                                        align="center"
                                        className="md:w-1/4 px-32"
                                    >
                                        <OrderStatistics category={item} />
                                    </Td>
                                </Tr>
                            );
                        })}
                    </Tbody>
                </Table>
            </Paper>
            <BarStatistics />
        </>
    );
};

export default CategoryTable;
