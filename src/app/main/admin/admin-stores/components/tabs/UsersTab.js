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
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { UserTableHeader } from 'src/app/model/StoreModel';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@mui/styles';
import { TablePagination, Button, Typography } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import {
    selectUserFilter,
    setUserFilter,
    selectStore,
    removeUserFromDB,
    removeUserFromUI,
    getAllUsers,
    selectAllUsers,
    addUserDB,
    addUserUI
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
    const allUsers = useSelector(selectAllUsers);

    const [anchorEl, setAnchorEl] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [addDialog, setAddDialog] = useState(false);
    const [userId, setUserId] = useState(0);

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
        dispatch(removeUserFromUI(userId));
    };

    const popOpen = Boolean(anchorEl);
    const id = popOpen ? 'simple-popover' : undefined;

    const openAddDialog = () => {
        dispatch(getAllUsers());
        setAddDialog(true);
    };
    const handleCloseAddDialog = () => {
        setAddDialog(false);
    };
    const addUser = (userId) => {
        const data = {
            storeId: store.id,
            userId: userId
        };
        dispatch(addUserDB(data));
        dispatch(addUserUI(userId));
        setAddDialog(false);
    };

    return (
        <>
            <div className={'flex flex-col mt-8 mx-16 rounded-md'}>
                {store.usersData.length === 0 ? (
                    <div className="flex flex-1 items-center justify-center h-full">
                        <Typography color="text.secondary" variant="h5">
                            There are no Users
                        </Typography>
                    </div>
                ) : (
                    <>
                        <div className="flex flex-col justify-between">
                            <div></div>
                            <Button
                                variant="contained"
                                color="info"
                                onClick={openAddDialog}
                                className="my-8 rounded-md self-end"
                            >
                                <FuseSvgIcon size={24}>
                                    heroicons-solid:plus
                                </FuseSvgIcon>
                                <span className="mx-4">{t('add')}</span>
                            </Button>
                        </div>
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
                                                            // onClick={() =>
                                                            //     editUser()
                                                            // }
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
                        <Dialog
                            open={openDialog}
                            onClose={handleCloseDialog}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <div className="p-24">
                                <DialogContent className="p-0">
                                    <h1 className="mt-12 mb-12">
                                        Are you sure to remove this User in this
                                        Store?
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
                        <Dialog
                            open={addDialog}
                            scroll="paper"
                            onClose={handleCloseAddDialog}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <div className="p-24">
                                <DialogTitle id="scroll-dialog-title">
                                    Click the user you want to add
                                </DialogTitle>
                                <DialogContent className="p-0">
                                    <List>
                                        {allUsers.map((user, index) => {
                                            return (
                                                <ListItem
                                                    key={index}
                                                    button
                                                    onClick={() =>
                                                        addUser(user.id)
                                                    }
                                                >
                                                    <ListItemAvatar>
                                                        <Avatar
                                                            alt="Travis Howard"
                                                            src={user.avatar}
                                                        />
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                        classes={{
                                                            root: 'm-0',
                                                            primary:
                                                                'font-medium leading-5 truncate'
                                                        }}
                                                        primary={user.name}
                                                        secondary={
                                                            <>
                                                                <Typography
                                                                    className="inline"
                                                                    component="span"
                                                                    variant="body2"
                                                                    color="text.secondary"
                                                                >
                                                                    {user.email}
                                                                </Typography>
                                                            </>
                                                        }
                                                    />
                                                </ListItem>
                                            );
                                        })}
                                    </List>
                                </DialogContent>
                                {/* <DialogActions className="p-0 mt-12">
                                    <Button
                                        variant="outline"
                                        color="secondary"
                                        onClick={handleCloseAddDialog}
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
                                </DialogActions> */}
                            </div>
                        </Dialog>
                    </>
                )}
            </div>
        </>
    );
};

export default UsersTab;
