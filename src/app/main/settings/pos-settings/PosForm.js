import withReducer from "app/store/withReducer";
import reducer from '../store';
import { Tab, Tabs } from '@mui/material';
import { Button } from '@mui/material';
import { Paper } from "@mui/material";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import NavLinkAdapter from '@fuse/core/NavLinkAdapter';
import { Typography } from "@mui/material";
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import styles from '../style.module.scss';

import UserTab from './tabs/UserTab';
import TaxTab from './tabs/TaxTab';
import DepartmentTab from './tabs/DepartmentTab';

import {
    getPosById,
    selectPosById,
    initializePos,
    addPos,
    updatePos
} from '../store/posSlice';

const PosForm = () => {
    const { t } = useTranslation();
    const routeParams = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const posById = useSelector(selectPosById);

    useEffect(() => {
        if (routeParams.action === 'Edit') {
            dispatch(getPosById(routeParams.id));
        }
        if (routeParams.action === 'Add') {
            dispatch(initializePos());
        }
    }, [dispatch, routeParams]);

    const [tabValue, setTabValue] = useState(0);

    const handleChangeTab = (event, value) => {
        setTabValue(value)
    };

    const finalSave = () => {
        console.log(posById);
        if (routeParams.action === 'Edit') {
            dispatch(updatePos(
                {
                    ...posById,
                    id: routeParams.id
                })
            );
            navigate('/settings/pos-settings')
        }
        if (routeParams.action === 'Add') {
            dispatch(addPos(
                {
                    ...posById
                })
            );
            navigate('/settings/pos-settings')
        }
    }

    return (
        <>
            <div className='flex items-center mx-32 mt-32 justify-between'>
                <div role="presentation">
                    <Breadcrumbs aria-label="breadcrumb">
                        <Typography
                            className="inline text-18 text-center font-medium"
                            color="text.secondary"
                            role="button"
                            component={NavLinkAdapter}
                            to={`../settings/pos-settings`}>
                            {t('settings.posSettings')}
                        </Typography>
                        <Typography className="inline text-18 text-center font-medium text-pink-500">
                            {routeParams.action.charAt(0).toUpperCase() + routeParams.action.slice(1)}
                        </Typography>
                    </Breadcrumbs>
                </div>
                <Button
                    variant="contained"
                    color="info"
                    onClick={() => navigate('/settings/pos-settings')}
                    className="rounded-md"
                >
                    <FuseSvgIcon size={20}>heroicons-solid:arrow-left</FuseSvgIcon>
                    <span className='ml-8'>{t('back')}</span>
                </Button>
            </div>
            <Paper className={`flex flex-col py-24 px-24 my-16 mx-32 overflow-auto rounded-md shadow-none`}>
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
                        className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12 pb-24"
                        label="User"
                    />
                    <Tab
                        className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12 pb-24"
                        label="Tax"
                    />
                    <Tab
                        className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12 pb-24"
                        label="Department"
                    />
                </Tabs>
                <div className='py-16'>
                    <div className={tabValue !== 0 ? 'hidden' : ''}>
                        <UserTab posById={posById} />
                    </div>

                    <div className={tabValue !== 1 ? 'hidden' : ''}>
                        <TaxTab posById={posById} />
                    </div>

                    <div className={tabValue !== 2 ? 'hidden' : ''}>
                        <DepartmentTab posById={posById} />
                    </div>
                </div>
                <div>
                    <Button
                        variant="contained"
                        color="info"
                        onClick={finalSave}
                        className='rounded-md float-right'
                    >
                        <FuseSvgIcon size={20}>heroicons-solid:check</FuseSvgIcon>
                        <span className='ml-8'>{t('save')}</span>
                    </Button>
                </div>                
            </Paper>
        </>

    )
};

export default withReducer('settingsApp', reducer)(PosForm);