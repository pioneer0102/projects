import history from '@history';
import { useQuery } from "react-query";
import Paper from "@mui/material/Paper";
import { useDispatch } from 'react-redux';
import { Typography } from "@mui/material";
import { TablePagination } from "@mui/material";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { makeStyles } from '@mui/styles';
import { useSelector } from "react-redux/es/hooks/useSelector";
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import {
    selectSearchText,
    selectPrice,
    selectCategory,
    selectPageNumber,
    selectPageSize,
    setPagenumber,
    setPagesize,
    getInventory
} from './store/inventorySlice';
import FuseLoading from '@fuse/core/FuseLoading';
import { InventoryTableHeader } from 'src/app/model/InvManModel';
import { useTranslation } from 'react-i18next';
import styles from './style.module.scss';

const useStyles = makeStyles(() => ({
    popover: {
        '& .MuiPaper-elevation8': {
            boxShadow: '3px 3px 5px 1px rgba(200, 200, 200, 0.15)' /* Customize the boxShadow here */
        }
    },
}));

const InvManTable = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const searchText = useSelector(selectSearchText);
    const price = useSelector(selectPrice);
    const category = useSelector(selectCategory);
    const pageNumber = useSelector(selectPageNumber);
    const pageSize = useSelector(selectPageSize);

    const searchData = {
        searchText: searchText,
        price: price,
        category: category,
        pageNumber: pageNumber,
        pageSize: pageSize
    };

    const { data: Inventory, isLoading, isError } = useQuery(['inventoryList', searchData], () => getInventory(searchData));
    const dbSize = Inventory && Inventory.dbSize;
    const filterSize = Inventory && Inventory.filterSize;

    const showDetail = (id) => history.push(`/inventory-manager/edit/${id}`);

    if (isLoading) {
        return <FuseLoading />;
    }

    if (isError) {
        return (
            <div className="flex flex-1 items-center justify-center h-full">
                <Typography color="text.secondary" variant="h5">
                    {t('orders.noData')}
                </Typography>
            </div>
        );
    }

    if (Inventory.pagedData.length === 0) {
        return (
            <div className="flex flex-1 items-center justify-center h-full">
                <Typography color="text.secondary" variant="h5">
                    {t('orders.noData')}
                </Typography>
            </div>
        );
    }

    return (
        <>
            <Paper
                className={`flex flex-col py-24 px-24 my-16 mx-24 overflow-auto  ${styles.paper}`}
                sx={{ boxShadow: 'none', borderRadius: 1 }}>
                <Table>
                    <Thead className="border-b-2">
                        <Tr>
                            {InventoryTableHeader.map((item, index) => (
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
                        {Inventory.pagedData
                            .map((item, index) => {
                                return (Inventory &&
                                    <Tr
                                        key={index}
                                        role="button"
                                        onClick={() => { showDetail(item.id) }}>
                                        <Td align="left">
                                            <Typography
                                                color="text.secondary"
                                                className="font-semibold text-20 md:pt-24">
                                                <img
                                                    src={item.image}
                                                    alt={category}
                                                    style={{ width: 150, height: 100 }}
                                                />
                                            </Typography>
                                        </Td>
                                        <Td align="left">
                                            <Typography
                                                color="text.secondary"
                                                className="font-semibold text-20 md:pt-16">
                                                {item.name}
                                            </Typography>
                                        </Td>
                                        <Td align="left">
                                            <Typography
                                                color="text.secondary"
                                                className="font-semibold text-20 md:pt-16">
                                                {item.category}
                                            </Typography>
                                        </Td>
                                        <Td align="left">
                                            <Typography
                                                color="text.secondary"
                                                className="font-semibold text-20 md:pt-16">
                                                $ {item.price}
                                            </Typography>
                                        </Td>
                                        <Td align="left">
                                            <Typography
                                                color="text.secondary"
                                                className="font-semibold text-20 md:pt-16">
                                                {item.quantity}
                                            </Typography>
                                        </Td>
                                        <Td align="left">
                                            <Typography
                                                color="text.secondary"
                                                className="font-semibold text-20 md:pt-16">
                                                {item.active ? (
                                                    <FuseSvgIcon className="text-green" size={28}>
                                                        heroicons-outline:check-circle
                                                    </FuseSvgIcon>
                                                ) : (
                                                    <FuseSvgIcon className="text-red" size={28}>
                                                        heroicons-outline:minus-circle
                                                    </FuseSvgIcon>
                                                )}
                                            </Typography>
                                        </Td>
                                    </Tr>
                                );
                            })
                        }
                    </Tbody>
                </Table>
                <div className="flex md:flex-row flex-col items-center border-t-2 mt-16">
                    <Typography
                        className="text-16 text-center font-medium"
                        color="text.secondary">
                        {t('orders.total')} : {dbSize}
                    </Typography>
                    <TablePagination
                        className="flex-1 overflow-scroll mt-8"
                        component="div"
                        count={filterSize}
                        rowsPerPage={pageSize}
                        page={pageNumber}
                        backIconButtonProps={{ 'aria-label': 'Previous Page' }}
                        nextIconButtonProps={{ 'aria-label': 'Next Page' }}
                        onPageChange={(event, newPage) => dispatch(setPagenumber(parseInt(newPage, 10)))}
                        onRowsPerPageChange={(event) => {
                            dispatch(setPagesize(parseInt(event.target.value, 10)));
                            dispatch(setPagenumber(0));
                        }}
                    />
                </div>
            </Paper>
        </>
    );
};

export default InvManTable;
