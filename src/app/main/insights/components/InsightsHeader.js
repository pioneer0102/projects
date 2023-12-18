import { useState } from 'react';
import { useDispatch } from 'react-redux';
import FilterDialog from './FilterDialog';
import { setRefresh } from '../store/saleSlice';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { Button, Dialog, DialogActions, DialogContent } from '@mui/material';

const InsightsHeader = () => {
    const dispatch = useDispatch();
    const [dialogOpen, setDialogOpen] = useState(false);

    const openDialog = () => {
        setDialogOpen(true);
    };
    const closeDialog = () => {
        setDialogOpen(false);
    };

    const handleRefresh = () => {
        dispatch(setRefresh());
        setDialogOpen(false);
    };

    return (
        <div>
            <Button variant="contained" color="secondary" onClick={openDialog}>
                <FuseSvgIcon size={24}>material-solid:filter_alt</FuseSvgIcon>
                <span className="mx-4">Filter</span>
            </Button>
            <Dialog
                open={dialogOpen}
                onClose={closeDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent sx={{ width: '450px' }}>
                    <FilterDialog />
                </DialogContent>
                <DialogActions className="mx-24 mb-8">
                    <Button
                        variant="outline"
                        color="secondary"
                        onClick={handleRefresh}
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        type="submit"
                        onClick={closeDialog}
                    >
                        <span>Ok</span>
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default InsightsHeader;
