import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { SaleTableHeader } from 'src/app/model/InsightsModel';
import { Typography } from '@mui/material';
import { TablePagination } from '@mui/material';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { Tab, Tabs } from '@mui/material';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { Box } from '@mui/material';
import { Paper } from '@mui/material';
import { Button } from '@mui/material';
import SaleFilter from './searchFilter/SaleFilter';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { makeStyles } from '@mui/styles';
import { showMessage } from 'app/store/fuse/messageSlice';
import {
    selectTableFilter,
    setTableFilter,
    getSaleTableData,
    selectTableData,
    selectTotalCount,
    selectTabValue,
    setTabValue,
    selectResponseTableWarning
} from './store/saleSlice';

const useStyles = makeStyles(() => ({
    dialog: {
        '& .muiltr-7en360-MuiPaper-root-MuiDialog-paper': {
            borderRadius: '6px'
        }
    }
}));

const SaleTable = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const tableFilter = useSelector(selectTableFilter);
    const tableData = useSelector(selectTableData);
    const totalCount = useSelector(selectTotalCount);
    const tabValue = useSelector(selectTabValue);
    const responseWarning = useSelector(selectResponseTableWarning);

    const [open, setOpen] = useState(false);

    useEffect(() => {
        dispatch(getSaleTableData(tableFilter));
    }, [dispatch, tableFilter]);

    const handlePagination = (type, value) => {
        dispatch(setTableFilter({ type: type, value: value }));
    };

    const handleTabChange = (value) => {
        dispatch(setTabValue(value));
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        responseWarning &&
            dispatch(
                showMessage({
                    message:
                        'Input date correctly! From should be smaller than To',
                    variant: 'warning'
                })
            );
    }, [responseWarning]);

    return (
        <Paper className="flex flex-col pt-16 px-16 pb-32">
            <div className="flex flex-row items-center justify-between pb-16">
                <Typography
                    className="mt-8 ml-16 text-2xl md:text-3xl font-semibold"
                    color="text.secondary"
                >
                    Sales Overview
                </Typography>
                <div className="flex flex-row items-center">
                    <Button
                        variant="contained"
                        color="info"
                        onClick={() => handleOpen()}
                        className={'mx-16 my-8'}
                    >
                        <FuseSvgIcon size={24} className="text-white">
                            material-solid:filter_alt
                        </FuseSvgIcon>
                        <span className="mx-4 text-white">Filter</span>
                    </Button>
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
            <Table className="my-16 mx-16">
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
                                        {sale.date}
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
            <Dialog
                open={open}
                onClose={handleClose}
                className={classes.dialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle>
                    <Typography className={'font-semibold text-32 mt-16 ml-8'}>
                        <span>Filter</span>
                    </Typography>
                </DialogTitle>
                <DialogContent
                    className="flex flex-col"
                    sx={{ width: '450px' }}
                >
                    <SaleFilter parent="table" />
                </DialogContent>
                <DialogActions className="mx-24 mb-24"></DialogActions>
            </Dialog>
        </Paper>
    );
};

export default SaleTable;
