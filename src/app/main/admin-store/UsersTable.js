import Paper from '@mui/material/Paper';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { Button } from '@mui/material';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Avatar from '@mui/material/Avatar';
import { UserTableHeader } from 'src/app/model/StoreModel';
import { selectStore } from './store/adminStoreSlice';
import { useMediaQuery } from '@mui/material';
import { TablePagination } from '@mui/material';
import { selectUserFilter, setUserFilter } from './store/adminStoreSlice';

const UsersTable = () => {
    const routeParams = useParams();
    if (routeParams.action === 'add') {
        return;
    }
    const dispatch = useDispatch();
    const isSmallScreen = useMediaQuery('(max-width: 400px)');
    const store = useSelector(selectStore);
    const userFilter = useSelector(selectUserFilter);

    const handlePagination = (type, value) => {
        dispatch(setUserFilter({ type: type, value: value }));
    };

    return (
        <>
            <Paper
                className={
                    'flex flex-col py-24 px-16 md:px-40 mb-24 mx-24 overflow-auto rounded-md'
                }
            >
                {store.usersData.length === 0 ? (
                    <div className="flex flex-1 items-center justify-center h-full">
                        <Typography color="text.secondary" variant="h5">
                            There are no Users
                        </Typography>
                    </div>
                ) : (
                    <>
                        <Table>
                            <Thead className="border-b-2">
                                <Tr>
                                    {UserTableHeader.map((item, index) => (
                                        <Th key={index} align={item.align}>
                                            <Typography
                                                color="text.secondary"
                                                className="font-semibold text-12 md:text-20 pb-16"
                                            >
                                                {item.label}
                                            </Typography>
                                        </Th>
                                    ))}
                                </Tr>
                            </Thead>
                            <Tbody>
                                {store.usersData.map((user, index) => {
                                    return (
                                        <Tr key={index} role="button">
                                            <Td
                                                align="left"
                                                className="md:pt-16"
                                            >
                                                <Avatar
                                                    alt={user.name}
                                                    src={user.avatar}
                                                />
                                            </Td>
                                            <Td
                                                align="left"
                                                className="md:pt-16"
                                            >
                                                <Typography
                                                    color="text.secondary"
                                                    className="text-12 md:text-16"
                                                >
                                                    {user.name}
                                                </Typography>
                                            </Td>
                                            <Td
                                                align="left"
                                                className="md:pt-16"
                                            >
                                                <Typography
                                                    color="text.secondary"
                                                    className="text-12 md:text-16"
                                                >
                                                    {user.email}
                                                </Typography>
                                            </Td>
                                            <Td
                                                align="left"
                                                className="md:pt-16"
                                            >
                                                <Button
                                                    variant="contained"
                                                    color="inherit"
                                                    // onClick={handleRefresh}
                                                    className="rounded-md"
                                                >
                                                    <FuseSvgIcon
                                                        className="text-gray-500"
                                                        size={20}
                                                    >
                                                        heroicons-outline:key
                                                    </FuseSvgIcon>
                                                    {isSmallScreen ? null : (
                                                        <span className="mx-4 text-16">
                                                            {' '}
                                                            Reset
                                                        </span>
                                                    )}
                                                </Button>
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
                                Total Users: {store.users.length}
                            </Typography>
                            <TablePagination
                                className="flex-1 overflow-scroll mt-8"
                                component="div"
                                count={store.users.length}
                                rowsPerPage={userFilter.rowsPerPage}
                                page={userFilter.page}
                                backIconButtonProps={{
                                    'aria-label': 'Previous Page'
                                }}
                                nextIconButtonProps={{
                                    'aria-label': 'Next Page'
                                }}
                                onPageChange={(event, newPage) =>
                                    handlePagination(
                                        'page',
                                        parseInt(newPage, 10)
                                    )
                                }
                                onRowsPerPageChange={(event) => {
                                    handlePagination(
                                        'rowsPerPage',
                                        event.target.value
                                    );
                                    handlePagination('page', 0);
                                }}
                            />
                        </div>
                    </>
                )}
            </Paper>
        </>
    );
};

export default UsersTable;
