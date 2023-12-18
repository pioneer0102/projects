import history from '@history';
import { useQuery } from 'react-query';
import Paper from '@mui/material/Paper';
import { useDispatch } from 'react-redux';
import { Typography } from '@mui/material';
import { TablePagination } from '@mui/material';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import FuseLoading from '@fuse/core/FuseLoading';
import { IconButton } from '@mui/material';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { userTableHeader } from 'src/app/model/UserModel';
import { useTranslation } from 'react-i18next';
import Popover from '@mui/material/Popover';
import { MoreHoriz } from '@mui/icons-material';
import { Button } from '@mui/material';
import { Box } from '@mui/material';
import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { makeStyles } from '@mui/styles';
import {
    selectFilter,
    setFilter,
    getAllUsers,
    setUserEntityAdapter,
    selectAllUsers,
    selectTotalCount,
    deleteUser
} from '../../store/userSlice';

const useStyles = makeStyles(() => ({
    popover: {
        '& .MuiPaper-elevation8': {
            boxShadow:
                '3px 3px 5px 1px rgba(200, 200, 200, 0.15)' /* Customize the boxShadow here */
        }
    }
}));

const UserTable = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedId, setSelectedId] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);

    const filter = useSelector(selectFilter);
    const allUsers = useSelector(selectAllUsers);
    const totalCount = useSelector(selectTotalCount);

    const { isLoading, isError, refetch } = useQuery(
        ['allUsers', filter],
        async () => {
            try {
                const result = await getAllUsers(filter);
                dispatch(setUserEntityAdapter(result));
            } catch (error) {
                console.log(error);
            }
        }
    );

    const handleChange = (type, value) => {
        if (type === 'rowsPerPage') {
            dispatch(setFilter({ ...filter, page: 0, [type]: value }));
        } else {
            dispatch(setFilter({ ...filter, [type]: value }));
        }
    };
    const handleOpenDialog = () => {
        setAnchorEl(null);
        setOpenDialog(true);
    };
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };
    const editUser = () => {
        setAnchorEl(null);
        history.push(`/settings/users/edit/${selectedId}`);
    };
    const removeUser = () => {
        dispatch(deleteUser(selectedId));
        setOpenDialog(false);
        refetch();
    };
    const handleAction = (event, id) => {
        setAnchorEl(event.currentTarget);
        setSelectedId(id);
    };
    const handleActionClose = () => {
        setAnchorEl(null);
    };

    const popOpen = Boolean(anchorEl);
    const id = popOpen ? 'simple-popover' : undefined;

    return (
        <>
            {isLoading ? (
                <FuseLoading />
            ) : isError ? (
                <div className="flex flex-1 items-center justify-center h-full">
                    <Typography color="text.secondary" variant="h5">
                        {t('nodata')}
                    </Typography>
                </div>
            ) : (
                <Paper className="flex flex-col pt-24 my-24 mx-24 overflow-auto">
                    {allUsers.length === 0 ? (
                        <div className="flex flex-1 items-center justify-center h-full">
                            <Typography color="text.secondary" variant="h5">
                                {t('noData')}
                            </Typography>
                        </div>
                    ) : (
                        <div className="flex flex-col my-16 mx-24 overflow-auto">
                            {allUsers.length === 0 ? (
                                <div className="flex flex-1 items-center justify-center h-full">
                                    <Typography
                                        color="text.secondary"
                                        variant="h5"
                                    >
                                        {t('noData')}
                                    </Typography>
                                </div>
                            ) : (
                                <>
                                    <Table>
                                        <Thead className="border-b-2">
                                            <Tr>
                                                {userTableHeader.map(
                                                    (item, index) => (
                                                        <Th
                                                            key={index}
                                                            align={item.align}
                                                        >
                                                            <Typography
                                                                color="text.secondary"
                                                                className="font-bold text-20 pb-16"
                                                            >
                                                                {item.label}
                                                            </Typography>
                                                        </Th>
                                                    )
                                                )}
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            {allUsers.map((item, index) => {
                                                return (
                                                    <Tr
                                                        key={index}
                                                        role="button"
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
                                                                {item.email}
                                                            </Typography>
                                                        </Td>
                                                        <Td align="left">
                                                            <Typography
                                                                color="text.secondary"
                                                                className="text-16 md:pt-16"
                                                            >
                                                                {item.role
                                                                    .charAt(0)
                                                                    .toUpperCase() +
                                                                    item.role.slice(
                                                                        1
                                                                    )}
                                                            </Typography>
                                                        </Td>
                                                        <Td
                                                            align="left"
                                                            className="md:pt-16"
                                                        >
                                                            <IconButton
                                                                aria-describedby={
                                                                    id
                                                                }
                                                                onClick={(
                                                                    event
                                                                ) =>
                                                                    handleAction(
                                                                        event,
                                                                        item.id
                                                                    )
                                                                }
                                                            >
                                                                <MoreHoriz />
                                                            </IconButton>
                                                            <Popover
                                                                id={id}
                                                                open={popOpen}
                                                                anchorEl={
                                                                    anchorEl
                                                                }
                                                                onClose={
                                                                    handleActionClose
                                                                }
                                                                className={
                                                                    classes.popover
                                                                }
                                                                anchorOrigin={{
                                                                    vertical:
                                                                        'bottom',
                                                                    horizontal:
                                                                        'left'
                                                                }}
                                                            >
                                                                <Box
                                                                    className="flex flex-col"
                                                                    sx={{
                                                                        p: 1
                                                                    }}
                                                                >
                                                                    <Button
                                                                        className="text-grey-500 justify-start"
                                                                        onClick={() =>
                                                                            editUser()
                                                                        }
                                                                    >
                                                                        <FuseSvgIcon
                                                                            size={
                                                                                20
                                                                            }
                                                                            color="action"
                                                                        >
                                                                            heroicons-solid:pencil
                                                                        </FuseSvgIcon>
                                                                        <span className="mx-8">
                                                                            {t(
                                                                                'users.edit'
                                                                            )}
                                                                        </span>
                                                                    </Button>
                                                                    <Button
                                                                        className="text-grey-500 justify-start"
                                                                        onClick={
                                                                            handleActionClose
                                                                        }
                                                                    >
                                                                        <FuseSvgIcon
                                                                            size={
                                                                                20
                                                                            }
                                                                            color="action"
                                                                        >
                                                                            heroicons-solid:key
                                                                        </FuseSvgIcon>
                                                                        <span className="mx-8">
                                                                            {t(
                                                                                'users.reset'
                                                                            )}
                                                                        </span>
                                                                    </Button>
                                                                    <Button
                                                                        className="text-grey-500 justify-start"
                                                                        onClick={() =>
                                                                            handleOpenDialog()
                                                                        }
                                                                    >
                                                                        <FuseSvgIcon
                                                                            size={
                                                                                20
                                                                            }
                                                                            color="action"
                                                                        >
                                                                            heroicons-solid:trash
                                                                        </FuseSvgIcon>
                                                                        <span className="mx-8">
                                                                            {t(
                                                                                'users.delete'
                                                                            )}
                                                                        </span>
                                                                    </Button>
                                                                </Box>
                                                            </Popover>
                                                        </Td>
                                                    </Tr>
                                                );
                                            })}
                                        </Tbody>
                                    </Table>
                                    <div className="flex md:flex-row flex-col items-center border-t-2 mt-16">
                                        <Typography
                                            className="text-16 text-center font-medium"
                                            color="text.secondary"
                                        >
                                            {t('users.total')} : {totalCount}
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
                                                handleChange(
                                                    'page',
                                                    parseInt(newPage, 10)
                                                )
                                            }
                                            onRowsPerPageChange={(event) => {
                                                handleChange(
                                                    'rowsPerPage',
                                                    parseInt(
                                                        event.target.value,
                                                        10
                                                    )
                                                );
                                            }}
                                        />
                                    </div>
                                    <Dialog
                                        open={openDialog}
                                        onClose={handleCloseDialog}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"
                                    >
                                        <div className="p-24">
                                            <DialogContent className="p-0">
                                                <h1 className="mt-12 mb-12">
                                                    Are you sure to delete this
                                                    User?
                                                </h1>
                                            </DialogContent>
                                            <DialogActions className="p-0 mt-12">
                                                <Button
                                                    variant="outline"
                                                    color="secondary"
                                                    onClick={handleCloseDialog}
                                                >
                                                    <span>{t('cancel')}</span>
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    color="secondary"
                                                    onClick={removeUser}
                                                >
                                                    <span>{t('ok')}</span>
                                                </Button>
                                            </DialogActions>
                                        </div>
                                    </Dialog>
                                </>
                            )}
                        </div>
                    )}
                </Paper>
            )}
        </>
    );
};

export default UserTable;
