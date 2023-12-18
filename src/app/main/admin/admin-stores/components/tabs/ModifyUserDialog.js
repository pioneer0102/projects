import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useTranslation } from 'react-i18next';
import { Controller, useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { selectStore } from '../../store/adminStoresSlice';
import _ from '@lodash';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import {
    Button,
    Box,
    Avatar,
    TextField,
    IconButton,
    InputAdornment
} from '@mui/material';
import {
    addUserinStore,
    updateUserinStore
} from '../../store/adminStoresSlice';

const schema = yup.object().shape({
    name: yup.string().required('You must enter a Name'),
    email: yup.string().required('You must enter a Email')
});

const ModifyUserDialog = (props) => {
    const { open, onClose, userId } = props;
    const dispatch = useDispatch();
    const [user, setUser] = useState(null);
    const [action, setAction] = useState(null);

    const { t } = useTranslation();
    const [showUpload, setShowUpload] = useState(false);
    const { control, handleSubmit, reset, formState } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema)
    });
    const { isValid, dirtyFields, errors } = formState;
    const store = useSelector(selectStore);
    useEffect(() => {
        if (userId !== null) {
            const user = _.find(store.users, {
                id: parseInt(userId)
            });
            setUser(user);
            setAction('edit');
        } else {
            const user = {
                avatar: '',
                name: '',
                email: ''
            };
            setUser(user);
            setAction('add');
        }
    }, [userId]);
    useEffect(() => {
        reset({ ...user });
    }, [user, reset]);

    const handleUpload = (state) => setShowUpload(state);

    const onSubmit = (data) => {
        const usersData = {
            ...data,
            storeId: store.id
        };
        if (action === 'add') {
            dispatch(addUserinStore(usersData));
        }
        if (action === 'edit') {
            dispatch(updateUserinStore(usersData));
        }
        onClose();
    };

    return (
        <Dialog
            open={open}
            scroll="paper"
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <div className="md:p-16 sm:p-0">
                <DialogTitle id="scroll-dialog-title">
                    You can modify user here.
                </DialogTitle>
                <DialogContent>
                    <div className="flex flex-col overflow-auto">
                        <Controller
                            control={control}
                            name="avatar"
                            render={({ field: { onChange, value } }) => (
                                <Box
                                    sx={{
                                        borderWidth: 4,
                                        borderStyle: 'solid'
                                    }}
                                    className="relative self-center flex items-center justify-center w-128 h-128 rounded-full overflow-hidden mt-32"
                                    onMouseOver={() => handleUpload(true)}
                                    onMouseOut={() => handleUpload(false)}
                                >
                                    {showUpload && (
                                        <>
                                            <div className="absolute inset-0 bg-black bg-opacity-50 z-10" />
                                            <div className="absolute inset-0 flex items-center justify-center z-20">
                                                <div>
                                                    <label
                                                        htmlFor="button-avatar"
                                                        className="flex p-8 cursor-pointer"
                                                    >
                                                        <input
                                                            accept="image/*"
                                                            className="hidden"
                                                            id="button-avatar"
                                                            type="file"
                                                            onChange={async (
                                                                e
                                                            ) => {
                                                                function readFileAsync() {
                                                                    return new Promise(
                                                                        (
                                                                            resolve,
                                                                            reject
                                                                        ) => {
                                                                            const file =
                                                                                e
                                                                                    .target
                                                                                    .files[0];
                                                                            if (
                                                                                !file
                                                                            ) {
                                                                                return;
                                                                            }
                                                                            const reader =
                                                                                new FileReader();

                                                                            reader.onload =
                                                                                () => {
                                                                                    resolve(
                                                                                        `data:${
                                                                                            file.type
                                                                                        };base64,${btoa(
                                                                                            reader.result
                                                                                        )}`
                                                                                    );
                                                                                };

                                                                            reader.onerror =
                                                                                reject;

                                                                            reader.readAsBinaryString(
                                                                                file
                                                                            );
                                                                        }
                                                                    );
                                                                }

                                                                const newImage =
                                                                    await readFileAsync();
                                                                onChange(
                                                                    newImage
                                                                );
                                                            }}
                                                        />
                                                        <FuseSvgIcon className="text-white">
                                                            heroicons-outline:camera
                                                        </FuseSvgIcon>
                                                    </label>
                                                </div>
                                                <div>
                                                    <IconButton
                                                        onClick={() => {
                                                            onChange('');
                                                        }}
                                                    >
                                                        <FuseSvgIcon className="text-white">
                                                            heroicons-outline:trash
                                                        </FuseSvgIcon>
                                                    </IconButton>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                    <Avatar
                                        sx={{
                                            backgroundColor:
                                                'background.default',
                                            color: 'text.secondary'
                                        }}
                                        className="object-cover w-full h-full text-64 font-bold"
                                        src={value}
                                    />
                                </Box>
                            )}
                        />
                        <div className="grid md:grid-cols-2 grid-cols-1 gap-x-40">
                            <Controller
                                control={control}
                                name="name"
                                defaultValue=""
                                render={({ field }) => (
                                    <TextField
                                        className="mt-32"
                                        {...field}
                                        label="Name"
                                        placeholder="Name"
                                        id="name"
                                        error={!!errors.name}
                                        helperText={errors?.name?.message}
                                        variant="outlined"
                                        required
                                        fullWidth
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <FuseSvgIcon size={24}>
                                                        heroicons-solid:user-circle
                                                    </FuseSvgIcon>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                )}
                            />
                            <Controller
                                control={control}
                                name="email"
                                defaultValue=""
                                render={({ field }) => (
                                    <TextField
                                        className="mt-32"
                                        {...field}
                                        label="Email"
                                        placeholder="Email"
                                        id="email"
                                        error={!!errors.email}
                                        helperText={errors?.email?.message}
                                        variant="outlined"
                                        required
                                        fullWidth
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <FuseSvgIcon size={24}>
                                                        heroicons-solid:mail
                                                    </FuseSvgIcon>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                )}
                            />
                            <Controller
                                control={control}
                                name="phone"
                                defaultValue=""
                                render={({ field }) => (
                                    <TextField
                                        className="mt-32"
                                        {...field}
                                        label="Phone"
                                        placeholder="Phone"
                                        id="phone"
                                        error={!!errors.phone}
                                        helperText={errors?.phone?.message}
                                        variant="outlined"
                                        required
                                        fullWidth
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <FuseSvgIcon size={24}>
                                                        heroicons-solid:phone
                                                    </FuseSvgIcon>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                )}
                            />
                            <Controller
                                control={control}
                                name="address"
                                defaultValue=""
                                render={({ field }) => (
                                    <TextField
                                        className="mt-32"
                                        {...field}
                                        label="Address"
                                        placeholder="Address"
                                        id="address"
                                        error={!!errors.address}
                                        helperText={errors?.address?.message}
                                        variant="outlined"
                                        required
                                        fullWidth
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <FuseSvgIcon size={24}>
                                                        heroicons-solid:location-marker
                                                    </FuseSvgIcon>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                )}
                            />
                        </div>
                    </div>
                </DialogContent>
                <DialogActions className="px-24 mt-12">
                    <Button
                        variant="outline"
                        color="secondary"
                        onClick={onClose}
                    >
                        <span>{t('cancel')}</span>
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        disabled={_.isEmpty(dirtyFields) || !isValid}
                        onClick={handleSubmit(onSubmit)}
                    >
                        <span>{t('save')}</span>
                    </Button>
                </DialogActions>
            </div>
        </Dialog>
    );
};

export default ModifyUserDialog;
