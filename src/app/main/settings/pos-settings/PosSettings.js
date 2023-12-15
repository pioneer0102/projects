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
import Breadcrumb from 'app/shared-components/Breadcrumbs';

import { getPos, selectPosDetail, updatePos } from '../store/posSlice';
import { selectUser } from 'app/store/userSlice';
import history from '@history';

const breadCrumbs = [{ name: 'POS Settings', url: null }];

const PosSettings = () => {
    const user = useSelector(selectUser);
    if (user.role === 'admin') {
        history.push('/item-management');
        return;
    }
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
        <div className="pt-24 px-24 md:px-24">
            <Breadcrumb breadCrumbs={breadCrumbs} />
            <Paper className={'flex flex-col py-24 px-24 my-24 overflow-auto'}>
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
                        color="secondary"
                        onClick={finalSave}
                        className="float-right mt-16"
                    >
                        <FuseSvgIcon size={20}>
                            heroicons-solid:check
                        </FuseSvgIcon>
                        <span className="ml-8">{t('save')}</span>
                    </Button>
                </div>
            </Paper>
        </div>
    );
};

export default withReducer('settingsApp', reducer)(PosSettings);
