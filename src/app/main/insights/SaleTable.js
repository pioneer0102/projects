import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { SaleTableHeader } from 'src/app/model/InsightsModel';
import { Typography } from '@mui/material';
import { TablePagination } from '@mui/material';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { Tab, Tabs } from '@mui/material';
import { Box } from '@mui/material';
import { Paper } from '@mui/material';
import format from 'date-fns/format';
import {
    saleFilter,
    setSaleFilter,
    selectTableData,
    selectTotalCount,
    selectTabValue,
    setTabValue
} from './store/saleSlice';

const SaleTable = () => {
    const dispatch = useDispatch();
    const tableFilter = useSelector(saleFilter);
    const tableData = useSelector(selectTableData);
    const totalCount = useSelector(selectTotalCount);
    const tabValue = useSelector(selectTabValue);

    // useEffect(() => {
    //     if (tabValue === 1) {
    //         dispatch(getSaleTableData(tableFilter));
    //     }
    // }, [dispatch, tableFilter, tabValue]);

    const handlePagination = (type, value) => {
        dispatch(setSaleFilter({ type: type, value: value }));
    };

    const handleTabChange = (value) => {
        dispatch(setTabValue(value));
    };

    return (
        <Paper className="flex flex-col pt-16">
            <div className="flex flex-row items-center justify-between px-16">
                <Typography
                    className="mt-8 text-2xl md:text-3xl font-semibold"
                    color="text.secondary"
                >
                    Sales Overview
                </Typography>
                <div className="flex flex-row items-center">
                    <Tabs
                        value={tabValue}
                        onChange={(ev, value) => handleTabChange(value)}
                        indicatorColor="secondary"
                        textColor="inherit"
                        variant="scrollable"
                        scrollButtons={false}
                        className="-mx-4 min-h-40"
                        classes={{
                            indicator:
                                'flex justify-center bg-transparent w-full h-full'
                        }}
                        TabIndicatorProps={{
                            children: (
                                <Box
                                    sx={{ bgcolor: 'text.disabled' }}
                                    className="w-full h-full rounded-full opacity-20"
                                />
                            )
                        }}
                    >
                        <Tab
                            className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12"
                            disableRipple
                            key="graph"
                            label="Graph"
                        />
                        <Tab
                            className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12"
                            disableRipple
                            key="table"
                            label="Table"
                        />
                    </Tabs>
                </div>
            </div>
            <div className="px-16 py-16">
                <Table>
                    <Thead className="border-b-2">
                        <Tr>
                            {SaleTableHeader.map((item, index) => (
                                <Th key={index} align={item.align}>
                                    <Typography
                                        color="text.secondary"
                                        className="font-bold text-20 pb-16"
                                    >
                                        {item.label}
                                    </Typography>
                                </Th>
                            ))}
                        </Tr>
                    </Thead>
                    <Tbody>
                        {tableData.map((sale, index) => {
                            return (
                                <Tr key={index}>
                                    <Td align="left">
                                        <Typography
                                            color="text.secondary"
                                            className="text-16 md:pt-16"
                                        >
                                            {format(
                                                new Date(sale.date),
                                                'MMMM d, y'
                                            )}
                                        </Typography>
                                    </Td>
                                    <Td align="left">
                                        <Typography
                                            color="text.secondary"
                                            className="text-16 md:pt-16"
                                        >
                                            {sale.customer}
                                        </Typography>
                                    </Td>
                                    <Td align="left">
                                        <Typography
                                            color="text.secondary"
                                            className="text-16 md:pt-16"
                                        >
                                            {sale.channel}
                                        </Typography>
                                    </Td>
                                    <Td align="left">
                                        <Typography
                                            color="text.secondary"
                                            className="text-16 md:pt-16"
                                        >
                                            {sale.item}
                                        </Typography>
                                    </Td>
                                    <Td align="left">
                                        <Typography
                                            color="text.secondary"
                                            className="text-16 md:pt-16"
                                        >
                                            $ {sale.price}
                                        </Typography>
                                    </Td>
                                </Tr>
                            );
                        })}
                    </Tbody>
                </Table>
                <TablePagination
                    className="flex-1 overflow-scroll mt-8"
                    component="div"
                    count={totalCount}
                    rowsPerPage={tableFilter.rowsPerPage}
                    page={tableFilter.page}
                    backIconButtonProps={{
                        'aria-label': 'Previous Page'
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'Next Page'
                    }}
                    onPageChange={(event, newPage) =>
                        handlePagination('page', parseInt(newPage, 10))
                    }
                    onRowsPerPageChange={(event) => {
                        handlePagination(
                            'rowsPerPage',
                            parseInt(event.target.value, 10)
                        );
                        handlePagination('page', 0);
                    }}
                />
            </div>
        </Paper>
    );
};

export default SaleTable;
