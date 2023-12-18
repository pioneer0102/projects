import { useSelector, useDispatch } from 'react-redux';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Avatar from '@mui/material/Avatar';
import { IconButton } from '@mui/material';
import { Popover } from '@mui/material';
import { Box } from '@mui/material';
import { MoreHoriz } from '@mui/icons-material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { UserTableHeader } from 'src/app/model/StoreModel';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@mui/styles';
import { TablePagination, Button, Typography } from '@mui/material';
import ModifyUserDialog from './ModifyUserDialog';
import {
    selectUserFilter,
    setUserFilter,
    selectStore,
    removeUserFromDB
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

    const [anchorEl, setAnchorEl] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [userDialog, setUserDialog] = useState(false);
    const [userId, setUserId] = useState(null);

    const handlePagination = (type, value) => {
        dispatch(setUserFilter({ type: type, value: value }));
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
        dispatch(removeUserFromDB(data));
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
                <div className="flex flex-col justify-between">
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={addUser}
                        className="w-full my-8 self-center mb-16"
                    >
                        <FuseSvgIcon size={24}>
                            heroicons-solid:plus
                        </FuseSvgIcon>
                        <span className="mx-4">{t('add')}</span>
                    </Button>
                </div>
                {store.users.length === 0 ? (
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
                            {store.users.map((user, index) => {
                                return (
                                    <Tr key={index} role="button">
                                        <Td align="left" className="md:pt-16">
                                            <Avatar
                                                alt={user.name}
                                                src={user.avatar}
                                            />
                                        </Td>
                                        <Td align="left" className="md:pt-16">
                                            <Typography
                                                color="text.secondary"
                                                className="text-12 md:text-16"
                                            >
                                                {user.name}
                                            </Typography>
                                        </Td>
                                        <Td align="left" className="md:pt-16">
                                            <Typography
                                                color="text.secondary"
                                                className="text-12 md:text-16"
                                            >
                                                {user.email}
                                            </Typography>
                                        </Td>
                                        <Td align="left" className="md:pt-16">
                                            <IconButton
                                                aria-describedby={id}
                                                onClick={(event) =>
                                                    handleAction(event, user.id)
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
                        Total Users: {store.totalUser}
                    </Typography>
                    <TablePagination
                        className="flex-1 overflow-scroll mt-8"
                        component="div"
                        count={store.totalUser}
                        rowsPerPage={userFilter.rowsPerPage}
                        page={userFilter.page}
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
                            handlePagination('rowsPerPage', event.target.value);
                            handlePagination('page', 0);
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
                                className="rounded-md"
                            >
                                <span>{t('cancel')}</span>
                            </Button>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={removeUser}
                                className="rounded-md"
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
                />
            </div>
        </>
    );
};

export default UsersTab;
