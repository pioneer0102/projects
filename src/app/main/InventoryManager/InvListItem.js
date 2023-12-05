import React, { useState } from 'react';
import styles from './style.module.scss';
import { ListItem, ListItemText } from '@mui/material';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import { Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    dialog: {
        '& .muiltr-7en360-MuiPaper-root-MuiDialog-paper': {
            borderRadius: '6px'
        }
    },
}));

const InvListItem = (props) => {
    const { image, category, price, quantity, upc, description } = props.item;

    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const classes = useStyles();

    const detailData = {
        "category": category,
        "price": price,
        "quantity": quantity,
        "upc Code": upc,
        "description": description
    };

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleOnLoad = () => setIsLoading(false);

    return (
        <>
            <ListItem
                className="px-32 py-32"
                button
                onClick={handleClickOpen}
            >
                <div>
                    {/* {isLoading && (
                        <CircularProgress
                            size={24}
                            sx={{
                                color: "inherit",
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                marginTop: '0px',
                                marginLeft: '-12px',
                            }}
                        />
                    )} */}
                    <img
                        src={image}
                        alt={category}
                        // variant="square"
                        style={{ width: 120, height: 160, objectFit: "cover" }}
                        onLoad={handleOnLoad}
                    />
                </div>
                <ListItemText
                    classes={{ root: 'mx-32', primary: 'text-4xl' }}
                    primary={category}
                    secondary={
                        <>
                            <Typography
                                className={`block text-xl ${styles.text_effect}`}
                                color="text.secondary"
                            >
                                price: ${price}
                            </Typography>
                            <Typography
                                className={`block text-xl ${styles.text_effect}`}
                                color="text.secondary"
                            >
                                quantity: {quantity} left
                            </Typography>
                        </>
                    }
                />
            </ListItem>
            <Divider />
            <Dialog open={open} onClose={handleClose} className={classes.dialog}>
                <DialogTitle>Detail Information</DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <div className='flex flex-col'>
                    <img className="self-center" src={image} alt={category} />
                    <Table>
                        <TableBody>
                            {Object.entries(detailData)
                                .map(([index, item]) => (
                                    <TableRow
                                        key={index}>
                                        <TableCell align="center">
                                            <Typography
                                                color="text.secondary"
                                                className="font-bold text-20">
                                                {index}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography
                                                color="text.secondary"
                                                className="font-semibold text-16">
                                                {item}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </div>
            </Dialog >
        </>
    )
}

export default InvListItem;
