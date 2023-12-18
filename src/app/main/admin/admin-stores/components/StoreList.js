import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Typography } from '@mui/material';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { TablePagination } from '@mui/material';
import { StoreTableHeader } from 'src/app/model/StoreModel';
import styles from '../style.module.scss';
import {
    getAllStores,
    selectFilter,
    setFilter
} from '../store/adminStoresSlice';

const StoreList = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const filter = useSelector(selectFilter);

    const { data: allStores } = useQuery(['allStores', filter], () =>
        getAllStores(filter)
    );
    const totalCount = allStores ? allStores.totalCount : 0;

    const handlePage = (type, value) => {
        dispatch(setFilter({ type: type, value: value }));
    };
    const handleEdit = (id) => {
        navigate(`/admin/stores/${id}/edit`);
    };

    return (
        <>
            <Paper className="flex flex-col py-24 px-24 my-24 mx-24 overflow-auto">
                {allStores && allStores.pagedData.length === 0 ? (
                    <div className="flex flex-1 items-center justify-center h-full">
                        <Typography color="text.secondary" variant="h5">
                            {t('stores.noData')}
                        </Typography>
                    </div>
                ) : (
                    <>
                        <Table>
                            <Thead className="border-b-2">
                                <Tr>
                                    {StoreTableHeader.map((item, index) => (
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
                                {allStores &&
                                    allStores.pagedData.map((item, index) => {
                                        return (
                                            <Tr
                                                key={index}
                                                role="button"
                                                onClick={() =>
                                                    handleEdit(item.id)
                                                }
                                            >
                                                <Td align="left">
                                                    <Typography
                                                        color="text.secondary"
                                                        className="text-16 md:pt-16"
                                                    >
                                                        {item.name}
                                                    </Typography>
                                                </Td>
                                                <Td align="left">
                                                    <Typography
                                                        color="text.secondary"
                                                        className="text-16 md:pt-16"
                                                    >
                                                        {item.address}
                                                    </Typography>
                                                </Td>
                                                <Td align="left">
                                                    {item.integrations.map(
                                                        (
                                                            integration,
                                                            index
                                                        ) => {
                                                            return (
                                                                <Typography
                                                                    key={index}
                                                                    color="text.secondary"
                                                                    className={`inline font-semibold text-16  mr-8 md:pt-16 ${styles[integration]}`}
                                                                >
                                                                    {
                                                                        integration
                                                                    }
                                                                </Typography>
                                                            );
                                                        }
                                                    )}
                                                </Td>
                                            </Tr>
                                        );
                                    })}
                            </Tbody>
                        </Table>
                        <div className="flex md:flex-row flex-col items-center border-t-2 mt-16">
                            <Typography
                                className="text-18 text-center font-medium"
                                color="text.secondary"
                            >
                                {t('stores.total')} : {totalCount}
                            </Typography>
                            <TablePagination
                                className="flex-1 overflow-scroll mt-8"
                                component="div"
                                count={totalCount}
                                rowsPerPage={filter.rowsPerPage}
                                page={filter.page}
                                backIconButtonProps={{
                                    'aria-label': 'Previous Page'
                                }}
                                nextIconButtonProps={{
                                    'aria-label': 'Next Page'
                                }}
                                onPageChange={(event, newPage) =>
                                    handlePage('page', parseInt(newPage, 10))
                                }
                                onRowsPerPageChange={(event) => {
                                    handlePage(
                                        'page',
                                        parseInt(event.target.value, 10)
                                    );
                                    handlePage('page', 0);
                                }}
                            />
                        </div>
                    </>
                )}
            </Paper>
        </>
    );
};

export default StoreList;
