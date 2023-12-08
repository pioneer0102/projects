import history from '@history';
import { useQuery } from "react-query";
import Paper from "@mui/material/Paper";
import { useDispatch } from 'react-redux';
import { Typography } from "@mui/material";
import { TablePagination } from "@mui/material";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { useSelector } from "react-redux/es/hooks/useSelector";
import FuseLoading from '@fuse/core/FuseLoading';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { userTableHeader } from 'src/app/model/UserModel';
import { useTranslation } from 'react-i18next';
import styles from '../../style.module.scss';
import {
    selectFilter,
    setFilter,
    getAllUsers,
    setUserEntityAdapter,
    selectAllUsers,
    selectTotalCount,
    deleteUser
} from '../../store/userSlice';

const UserTable = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const filter = useSelector(selectFilter);
    const allUsers = useSelector(selectAllUsers);
    const totalCount = useSelector(selectTotalCount);

    const { isLoading, isError } = useQuery(['allUsers', filter], async () => {
        try {
            const result = await getAllUsers(filter);
            dispatch(setUserEntityAdapter(result));
        } catch (error) {
            console.log(error)
        }
    });

    const editUser = (id) => history.push(`/settings/user-management/edit/${id}`);
    const removeUser = (event, id) => {
        event.stopPropagation();
        dispatch(deleteUser(id));
    }

    const handleChange = (type, value) => {
        dispatch(setFilter({ type: type, value: value }));
        dispatch(setFilter({ type: 'page', value: 0 }));
    };

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
                            className={`flex flex-col py-24 px-24 my-16 mx-24 overflow-auto  ${styles.paper}`}
                            sx={{ boxShadow: 'none', borderRadius: 1 }}>
                            {
                                allUsers.length == 0 ?
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
                                                    {userTableHeader.map((item, index) => (
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
                                                {allUsers
                                                    .map((item, index) => {
                                                        return (
                                                            <Tr
                                                                key={index}
                                                                role="button"
                                                                onClick={() => editUser(item.id)}>
                                                                <Td align="left">
                                                                    <Typography
                                                                        color="text.secondary"
                                                                        className="text-16 md:pt-16">
                                                                        {item.name}
                                                                    </Typography>
                                                                </Td>
                                                                <Td align="left">
                                                                    <Typography
                                                                        color="text.secondary"
                                                                        className="text-16 md:pt-16">
                                                                        {item.url}
                                                                    </Typography>
                                                                </Td>
                                                                <Td align="left">
                                                                    <Typography
                                                                        color="text.secondary"
                                                                        className="text-16 md:pt-16">
                                                                        {item.role.charAt(0).toUpperCase() + item.role.slice(1)}
                                                                    </Typography>
                                                                </Td>
                                                                <Td align="left" className = "md:pt-16">
                                                                    <IconButton
                                                                        className="text-gray-500"
                                                                        onClick={(event) => removeUser(event, item.id)}>
                                                                        <DeleteIcon />
                                                                    </IconButton>
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
                                                {t('users.total')} : {totalCount}
                                            </Typography>
                                            <TablePagination
                                                className="flex-1 overflow-scroll mt-8"
                                                component="div"
                                                count={totalCount}
                                                rowsPerPage={filter.rowsPerPage}
                                                page={filter.page}
                                                backIconButtonProps={{ 'aria-label': 'Previous Page' }}
                                                nextIconButtonProps={{ 'aria-label': 'Next Page' }}
                                                onPageChange={(event, newPage) => handleChange('page', parseInt(newPage, 10))}
                                                onRowsPerPageChange={(event) => {
                                                    handleChange('rowsPerPage', parseInt(event.target.value, 10));
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

export default UserTable;
