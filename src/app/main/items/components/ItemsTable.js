import history from '@history';
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import FuseLoading from '@fuse/core/FuseLoading';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { ItemsTableHeader } from 'src/app/model/ItemModel';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { Paper, Typography, TablePagination } from '@mui/material';
import {
    getItems,
    setFilter,
    selectFilter,
    setItemAdapter,
    selectAllItems,
    selectTotalCount
} from '../store/itemSlice';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';

const ItemsTable = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const filter = useSelector(selectFilter);
    const items = useSelector(selectAllItems);
    const totalCount = useSelector(selectTotalCount);

    const { isLoading, isError } = useQuery(['itemList', filter], async () => {
        try {
            const result = await getItems(filter);
            dispatch(setItemAdapter(result));
        } catch (error) {
            console.log(error);
        }
    });

    const showDetail = (id) => history.push(`/items/${id}/edit`);

    return (
        <>
            <Paper className="flex flex-col py-24 px-24 my-24 mx-24 overflow-auto">
                <Table>
                    <Thead className="border-b-2">
                        <Tr>
                            {ItemsTableHeader.map((item, index) => (
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
                        {!isLoading &&
                            !isError &&
                            items.length > 0 &&
                            items.map((item, index) => {
                                return (
                                    <Tr
                                        key={index}
                                        role="button"
                                        onClick={() => {
                                            showDetail(item.id);
                                        }}
                                    >
                                        <Td align="left">
                                            <Typography
                                                color="text.secondary"
                                                className="text-20 md:pt-24"
                                            >
                                                <img
                                                    className="w-64 h-64 object-cover"
                                                    src={item.image}
                                                    alt={filter.category}
                                                />
                                            </Typography>
                                        </Td>
                                        <Td align="left">
                                            <Typography
                                                color="text.secondary"
                                                className="text-20 md:pt-16"
                                            >
                                                {item.name}
                                            </Typography>
                                        </Td>
                                        <Td align="left">
                                            <Typography
                                                color="text.secondary"
                                                className="text-20 md:pt-16"
                                            >
                                                {item.category}
                                            </Typography>
                                        </Td>
                                        <Td align="left">
                                            <Typography
                                                color="text.secondary"
                                                className="text-20 md:pt-16"
                                            >
                                                $ {item.price}
                                            </Typography>
                                        </Td>
                                        <Td align="left">
                                            <Typography
                                                color="text.secondary"
                                                className="text-20 md:pt-16"
                                            >
                                                {item.quantity}
                                            </Typography>
                                        </Td>
                                        <Td align="left">
                                            <Typography
                                                color="text.secondary"
                                                className="text-20 md:pt-16"
                                            >
                                                {item.active ? (
                                                    <FuseSvgIcon
                                                        className="text-green"
                                                        size={28}
                                                    >
                                                        heroicons-outline:check-circle
                                                    </FuseSvgIcon>
                                                ) : (
                                                    <FuseSvgIcon
                                                        className="text-red"
                                                        size={28}
                                                    >
                                                        heroicons-outline:minus-circle
                                                    </FuseSvgIcon>
                                                )}
                                            </Typography>
                                        </Td>
                                    </Tr>
                                );
                            })}
                    </Tbody>
                </Table>
                {items.length > 0 && (
                    <div className="flex md:flex-row flex-col items-center border-t-2 mt-16">
                        <Typography
                            className="text-16 text-center font-medium"
                            color="text.secondary"
                        >
                            {t('orders.total')} : {totalCount}
                        </Typography>
                        <TablePagination
                            className="flex-1 overflow-scroll mt-8"
                            component="div"
                            count={totalCount}
                            rowsPerPage={filter.pageSize}
                            page={filter.pageNumber}
                            backIconButtonProps={{
                                'aria-label': 'Previous Page'
                            }}
                            nextIconButtonProps={{ 'aria-label': 'Next Page' }}
                            onPageChange={(event, newPage) =>
                                dispatch(
                                    setFilter({
                                        ...filter,
                                        pageNumber: newPage
                                    })
                                )
                            }
                            onRowsPerPageChange={(event) => {
                                dispatch(
                                    setFilter({
                                        ...filter,
                                        pageNumber: 0,
                                        pageSize: event.target.value
                                    })
                                );
                            }}
                        />
                    </div>
                )}
                {isLoading ? (
                    <FuseLoading />
                ) : isError || items.length === 0 ? (
                    <div className="flex flex-1 items-center justify-center h-full py-24">
                        <Typography color="text.secondary" variant="h5">
                            {t('noData')}
                        </Typography>
                    </div>
                ) : (
                    <></>
                )}
            </Paper>
        </>
    );
};

export default ItemsTable;
