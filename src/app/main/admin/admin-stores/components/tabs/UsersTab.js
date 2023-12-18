import { useState } from 'react';
import { useQuery } from 'react-query';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import { MoreHoriz } from '@mui/icons-material';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import ModifyUserDialog from './ModifyUserDialog';
import { useSelector, useDispatch } from 'react-redux';
import { showMessage } from 'app/store/fuse/messageSlice';
import { UserTableHeader } from 'src/app/model/StoreModel';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import {
    IconButton,
    Input,
    Avatar,
    Popover,
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    TablePagination,
    Button,
    Typography
} from '@mui/material';
import {
    selectUserFilter,
    setUserFilter,
    selectStore,
    removeUserinStore,
    getUsersinStore,
    setUsersInStore,
    selectUsersInStore
} from '../../store/adminStoresSlice';

const useStyles = makeStyles(() => ({
    popover: {
        '& .MuiPaper-elevation8': {
            boxShadow:
                '3px 3px 5px 1px rgba(200, 200, 200, 0.15)' /* Customize the boxShadow here */
        }
    }
}));

const UsersTab = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const { t } = useTranslation();
    const store = useSelector(selectStore);
    const userFilter = useSelector(selectUserFilter);
    const usersInStore = useSelector(selectUsersInStore);

    const [anchorEl, setAnchorEl] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [userDialog, setUserDialog] = useState(false);
    const [userId, setUserId] = useState(null);

    const { isLoading, refetch } = useQuery(
        ['usersInStore', userFilter, store.id],
        async () => {
            try {
                const data = {
                    storeId: store.id,
                    ...userFilter
                };
                const result = await getUsersinStore(data);
                dispatch(setUsersInStore(result));
                return result;
            } catch (error) {
                console.log(error);
            }
        }
    );

    const handleUserFilter = (type, value) => {
        if (type === 'page') {
            dispatch(setUserFilter({ ...userFilter, [type]: value }));
        } else {
            dispatch(setUserFilter({ ...userFilter, page: 0, [type]: value }));
        }
    };
    const handleOpenDialog = () => {
        setAnchorEl(null);
        setOpenDialog(true);
    };
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };
    const handleAction = (event, id) => {
        setAnchorEl(event.currentTarget);
        setUserId(id);
    };
    const handleActionClose = () => {
        setAnchorEl(null);
    };
    const removeUser = () => {
        setOpenDialog(false);
        const data = {
            storeId: store.id,
            userId: userId
        };
        dispatch(removeUserinStore(data));
        dispatch(setUserFilter({ ...userFilter, page: 0 }));
        refetch();
        dispatch(
            showMessage({
                message: 'User removed successfully!',
                variant: 'success'
            })
        );
    };

    const popOpen = Boolean(anchorEl);
    const id = popOpen ? 'simple-popover' : undefined;

    const addUser = () => {
        setAnchorEl(null);
        setUserDialog(true);
        setUserId(null);
    };
    const handleCloseUserDialog = () => {
        setUserDialog(false);
    };
    const editUser = () => {
        setAnchorEl(null);
        setUserDialog(true);
    };

    return (
        <>
            <div className="flex flex-col">
                <div className="flex flex-row justify-between mb-16">
                    <div></div>
                    <div className="flex flex-row space-y-16 sm:space-y-0 self-end space-x-16">
                        <div className="flex w-full items-center sm:max-w-256 space-x-8 px-16 rounded-full border-1 shadow-0">
                            <FuseSvgIcon color="disabled">
                                heroicons-solid:search
                            </FuseSvgIcon>

                            <Input
                                placeholder="Search"
                                className="flex flex-1"
                                disableUnderline
                                fullWidth
                                value={userFilter.searchText}
                                inputProps={{
                                    'aria-label': 'Search'
                                }}
                                onChange={(event) =>
                                    handleUserFilter(
                                        'searchText',
                                        event.target.value
                                    )
                                }
                            />
                        </div>
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={addUser}
                            className="my-8 mb-16"
                        >
                            <FuseSvgIcon size={24}>
                                heroicons-solid:plus
                            </FuseSvgIcon>
                            <span className="mx-4">{t('add')}</span>
                        </Button>
                    </div>
                </div>
                {usersInStore.pagedUsers.length === 0 ? (
                    <div className="flex flex-col items-center my-16">
                        <Typography color="text.secondary" variant="h5">
                            There are no Users
                        </Typography>
                    </div>
                ) : (
                    <Table>
                        <Thead>
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
                            {!isLoading &&
                                usersInStore.pagedUsers.map((user, index) => {
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
                                                <IconButton
                                                    aria-describedby={id}
                                                    onClick={(event) =>
                                                        handleAction(
                                                            event,
                                                            user.id
                                                        )
                                                    }
                                                >
                                                    <MoreHoriz />
                                                </IconButton>
                                                <Popover
                                                    id={id}
                                                    open={popOpen}
                                                    anchorEl={anchorEl}
                                                    onClose={handleActionClose}
                                                    className={classes.popover}
                                                    anchorOrigin={{
                                                        vertical: 'bottom',
                                                        horizontal: 'left'
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
                                                                size={20}
                                                                color="action"
                                                            >
                                                                heroicons-solid:pencil
                                                            </FuseSvgIcon>
                                                            <span className="mx-8">
                                                                Edit
                                                            </span>
                                                        </Button>
                                                        <Button
                                                            className="text-grey-500 justify-start"
                                                            onClick={
                                                                handleActionClose
                                                            }
                                                        >
                                                            <FuseSvgIcon
                                                                size={20}
                                                                color="action"
                                                            >
                                                                heroicons-solid:key
                                                            </FuseSvgIcon>
                                                            <span className="mx-8">
                                                                Reset Password
                                                            </span>
                                                        </Button>
                                                        <Button
                                                            className="text-grey-500 justify-start"
                                                            onClick={() =>
                                                                handleOpenDialog()
                                                            }
                                                        >
                                                            <FuseSvgIcon
                                                                size={20}
                                                                color="action"
                                                            >
                                                                heroicons-solid:trash
                                                            </FuseSvgIcon>
                                                            <span className="mx-8">
                                                                Remove
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
                )}
                <div className="flex md:flex-row flex-col items-center border-t-2 mt-16">
                    <Typography
                        className="text-18 text-center font-medium"
                        color="text.secondary"
                    >
                        Total Users: {usersInStore.totalUsers}
                    </Typography>
                    <TablePagination
                        className="flex-1 overflow-scroll mt-8"
                        component="div"
                        count={usersInStore.totalUsers}
                        rowsPerPage={userFilter.rowsPerPage}
                        page={userFilter.page}
                        backIconButtonProps={{
                            'aria-label': 'Previous Page'
                        }}
                        nextIconButtonProps={{
                            'aria-label': 'Next Page'
                        }}
                        onPageChange={(event, newPage) =>
                            handleUserFilter('page', parseInt(newPage, 10))
                        }
                        onRowsPerPageChange={(event) => {
                            handleUserFilter('rowsPerPage', event.target.value);
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
                                Are you sure to remove this User in this Store?
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
                <ModifyUserDialog
                    open={userDialog}
                    onClose={handleCloseUserDialog}
                    userId={userId}
                    refetch={refetch}
                />
            </div>
        </>
    );
};

export default UsersTab;
