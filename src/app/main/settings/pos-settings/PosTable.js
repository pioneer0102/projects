import { useQuery } from "react-query";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from "@mui/material";
import { TablePagination } from "@mui/material";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import FuseLoading from '@fuse/core/FuseLoading';
import { posTableHeader } from 'src/app/model/PosModel';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import styles from '../style.module.scss';
import {
    selectFilter,
    setFilter,
    getAllPos,
    setPos,
    selectAllPos,
    selectTotalCount
} from '../store/posSlice';

const PosTable = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const filterData = useSelector(selectFilter);
    const posData = useSelector(selectAllPos);
    const totalCount = useSelector(selectTotalCount);

    const { isLoading, isError } = useQuery(['posTable', filterData], async () => {
        try {
            const result = await getAllPos(filterData);
            console.log(result);
            dispatch(setPos(result));
        } catch (error) {
            console.log(error)
        }
    });

    const handleChange = (type, value) => {
        dispatch(setFilter({ type: type, value: value }));
        dispatch(setFilter({ type: 'page', value: 0 }));
    };

    const EditPage = (id) => {
        navigate(`/settings/pos-settings/edit/${id}`);
    }

    return (
        <>
            {
                isLoading ?
                <FuseLoading />
                :
                isError ?
                <div className="flex flex-1 items-center justify-center h-full">
                    <Typography color="text.secondary" variant="h5">
                        {t('nodata')}
                    </Typography>
                </div>
                :
                <Paper
                    className={`flex flex-col py-24 px-24 my-16 mx-32 overflow-auto  ${styles.paper}`}
                    sx={{ boxShadow: 'none', borderRadius: 1 }}>
                    {
                        posData.length == 0 ?
                            <div className="flex flex-1 items-center justify-center h-full">
                                <Typography color="text.secondary" variant="h5">
                                    {t('noData')}
                                </Typography>
                            </div>
                            :
                            <>
                                <Table>
                                    <Thead className="border-b-2">
                                        <Tr>
                                            {posTableHeader.map((item, index) => (
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
                                        {
                                            posData.map((item, index) => {
                                                return (
                                                    <Tr
                                                        key={index}
                                                        role="button"
                                                        onClick={() => { EditPage(item.id) }}
                                                    >
                                                        <Td align="left">
                                                            <Typography
                                                                color="text.secondary"
                                                                className="text-16 md:pt-16">
                                                                {item.type}
                                                            </Typography>
                                                        </Td>
                                                        <Td align="left">
                                                            <Typography
                                                                color="text.secondary"
                                                                className="text-16 md:pt-16">
                                                                {item.user_name}
                                                            </Typography>
                                                        </Td>
                                                        <Td align="left">
                                                            <Typography
                                                                color="text.secondary"
                                                                className="text-16 md:pt-16">
                                                                {item.url}
                                                            </Typography>
                                                        </Td>
                                                    </Tr>
                                                )
                                            })

                                        }
                                    </Tbody>
                                </Table>
                                <div className="flex md:flex-row flex-col items-center border-t-2 mt-16">
                                    <Typography
                                        className="text-18 text-center font-medium"
                                        color="text.secondary">
                                        {t('orders.total')} : {totalCount}
                                    </Typography>
                                    <TablePagination
                                        className="flex-1 overflow-scroll mt-8"
                                        component="div"
                                        count={totalCount}
                                        rowsPerPage={filterData.rowsPerPage}
                                        page={filterData.page}
                                        backIconButtonProps={{ 'aria-label': 'Previous Page' }}
                                        nextIconButtonProps={{ 'aria-label': 'Next Page' }}
                                        onPageChange={(event, newPage) => handleChange('page', parseInt(newPage, 10))}
                                        onRowsPerPageChange={(event) => {
                                            handleChange('rowsPerPage', parseInt(event.target.value, 10))
                                        }}
                                    />
                                </div>
                            </>
                    }
                </Paper>
            }
        </>
    );
};

export default PosTable;
