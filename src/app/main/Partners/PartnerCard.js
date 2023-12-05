import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import styles from './style.module.scss';
import { useNavigate } from 'react-router-dom';
import { logoSrc, backImgSrc, detail } from 'src/app/model/PartnerModel';
import { CircularProgress } from '@mui/material';
import { IconButton } from '@mui/material';
import { Icon } from '@mui/material';
import { makeStyles } from '@mui/styles';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';

import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import _ from '@lodash';

const schema = yup.object().shape({
    email: yup.string().required('You must enter a email')
});

const useStyles = makeStyles(() => ({
    dialog: {
        '& .muiltr-7en360-MuiPaper-root-MuiDialog-paper': {
            borderRadius: '6px'
        }
    },
}));

const PartnerCard = (props) => {
    const { name } = props;
    const classes = useStyles();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);
    const [open, setOpen] = useState(false);
    
    const { control, handleSubmit, formState } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema),
    });
    const { isValid, dirtyFields, errors } = formState;

    const handleOnLoad = () => setIsLoading(false);
    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const onSubmit = (data) => navigate(`/partners/add/${name}`);

    return (
        <>
            <Card className={`flex-1 mx-12 my-24 ${styles.paper}`}>
                <CardHeader
                    avatar={
                        <div className={`${styles.logo_size} flex`}>
                            <img src={logoSrc[name]} alt={name} className='flex-1 self-center' />
                        </div>
                    }
                    action={
                        <IconButton aria-label="settings" onClick={handleClickOpen}>
                            <Icon fontSize="large">add</Icon>
                        </IconButton>
                    }
                    title={
                        <Typography className={`font-bold text-32 ${styles[name]}`}>
                            {name}
                        </Typography>
                    }
                />
                <div className={`px-16 ${styles.container}`}>
                    {isLoading && (
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
                    )}
                    <CardMedia
                        component="img"
                        image={backImgSrc[name]}
                        className={styles.backimg_size}
                        alt="image"
                        onLoad={handleOnLoad}
                        role="button"
                        onClick={handleClickOpen}
                    />
                    <div className={styles.overlay} role="button"
                        onClick={handleClickOpen}>
                        <p className={styles.text}>
                            {detail[name]}
                        </p>
                    </div>
                </div>
            </Card>
            <Dialog open={open} onClose={handleClose} className={classes.dialog}>
                <DialogTitle className='flex flex-col'>
                    <div className={`${styles.logo_size} flex self-center justify-center mt-16`}>
                        <img src={logoSrc[name]} alt={name} className='flex-1' />
                        <Typography className={`font-bold text-32 mx-8 ${styles[name]}`}>
                            {name}
                        </Typography>
                    </div>
                    <Typography className={`self-center font-semibold text-12 mt-16`}>
                        Welcome to {name} !
                    </Typography>
                </DialogTitle>
                <DialogContent className='max-w-400'>
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                className="mt-24"
                                label="Email"
                                type="email"
                                error={!!errors.email}
                                helperText={errors?.email?.message}
                                variant="outlined"
                                required
                                fullWidth />
                        )}
                    />
                    <Controller
                        name="password"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                className="mt-40"
                                label="Password"
                                type="password"
                                error={!!errors.password}
                                helperText={errors?.password?.message}
                                variant="outlined"
                                required
                                fullWidth />
                        )}
                    />
                </DialogContent>
                <DialogActions className='flex flex-col'>
                    <Box className="self-center mx-16 mb-24 mt-16">
                        <Button
                            className={`font-semibold ${styles.button}`}
                            variant="contained"
                            color="secondary"
                            aria-label="Sign in"
                            disabled={_.isEmpty(dirtyFields) || !isValid}
                            type="submit"
                            size="large"
                            onClick={handleSubmit(onSubmit)}>
                            Login
                        </Button>
                    </Box>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default PartnerCard;
