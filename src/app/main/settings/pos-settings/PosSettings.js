import withReducer from 'app/store/withReducer';
import reducer from '../store';
import { Tab, Tabs } from '@mui/material';
import { Button } from '@mui/material';
import { Paper } from '@mui/material';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { showMessage } from 'app/store/fuse/messageSlice';
import UserTab from './tabs/UserTab';
import TaxTab from './tabs/TaxTab';
import DepartmentTab from './tabs/DepartmentTab';

import { getPos, selectPosDetail, updatePos } from '../store/posSlice';

const PosSettings = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const posDetail = useSelector(selectPosDetail);

    useEffect(() => {
        dispatch(getPos());
    }, [dispatch]);

    const [tabValue, setTabValue] = useState(0);

    const handleChangeTab = (event, value) => {
        setTabValue(value);
    };

    const finalSave = () => {
        dispatch(updatePos(posDetail));
        dispatch(
            showMessage({
                message: 'POS updated successfully!',
                variant: 'success'
            })
        );
    };

    return (
        <>
            <Paper
                className={
                    'flex flex-col py-24 px-24 my-32 mx-24 overflow-auto rounded-md shadow-none'
                }
            >
                <Tabs
                    value={tabValue}
                    onChange={handleChangeTab}
                    indicatorColor="secondary"
                    textColor="inherit"
                    variant="scrollable"
                    scrollButtons={false}
                    className="w-full min-h-40"
                    classes={{ root: 'border-b-1' }}
                >
                    <Tab
                        className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12 mb-24"
                        label="User"
                    />
                    <Tab
                        className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12 mb-24"
                        label="Tax"
                    />
                    <Tab
                        className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12 mb-24"
                        label="Department"
                    />
                </Tabs>
                <div className="py-16">
                    <div className={tabValue !== 0 ? 'hidden' : ''}>
                        <UserTab />
                    </div>

                    <div className={tabValue !== 1 ? 'hidden' : ''}>
                        <TaxTab />
                    </div>

                    <div className={tabValue !== 2 ? 'hidden' : ''}>
                        <DepartmentTab />
                    </div>
                </div>
                <div>
                    <Button
                        variant="contained"
                        color="info"
                        onClick={finalSave}
                        className="rounded-md float-right mt-16"
                    >
                        <FuseSvgIcon size={20}>
                            heroicons-solid:check
                        </FuseSvgIcon>
                        <span className="ml-8">{t('save')}</span>
                    </Button>
                </div>
            </Paper>
        </>
    );
};

export default withReducer('settingsApp', reducer)(PosSettings);
