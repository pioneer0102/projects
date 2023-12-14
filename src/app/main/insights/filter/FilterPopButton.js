import SaleFilter from './SaleFilter';
import { Button } from '@mui/material';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useState } from 'react';
// import { makeStyles } from '@mui/styles';

// const useStyles = makeStyles(() => ({
//     dialog: {
//         '& .muiltr-7en360-MuiPaper-root-MuiDialog-paper': {
//             borderRadius: '6px'
//         }
//     }
// }));

const FilterPopButton = () => {
    // const classes = useStyles();
    const [dialogOpen, setDialogOpen] = useState(false);

    const openDialog = () => {
        setDialogOpen(true);
    };
    const closeDialog = () => {
        setDialogOpen(false);
    };

    return (
        <div>
            <Button
                variant="contained"
                color="inherit"
                onClick={openDialog}
                className="mx-24 mb-8 rounded-md"
            >
                <FuseSvgIcon className="text-gray-500" size={24}>
                    material-solid:filter_alt
                </FuseSvgIcon>
                <span className="mx-4"> Filter</span>
            </Button>
            <Dialog
                open={dialogOpen}
                onClose={closeDialog}
                // className={classes.dialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent sx={{ width: '450px' }}>
                    <SaleFilter />
                </DialogContent>
                <DialogActions className="mx-24 mb-4"></DialogActions>
            </Dialog>
        </div>
    );
};

export default FilterPopButton;
