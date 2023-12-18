import { Tab, Tabs } from '@mui/material';
import { Paper } from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import UsersTab from './tabs/UsersTab';
import PosTab from './tabs/PosTab';
import TaxTab from './tabs/TaxTab';
import DepartmentTab from './tabs/DepartmentTab';
import IntegrationTab from './tabs/IntegrationTab';
import { selectStore } from '../store/adminStoresSlice';

const StoreTabs = () => {
    const routeParams = useParams();
    const storeDetail = useSelector(selectStore);
    if (routeParams.storeId === 'add') {
        return;
    }
    // console.log(storeDetail);
    const [tabValue, setTabValue] = useState(0);

    const handleChangeTab = (event, value) => {
        setTabValue(value);
    };

    return (
        <>
            <Paper className="flex flex-col py-24 px-16 md:px-40 mt-8 mb-24 mx-24 overflow-auto">
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
                        className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12 mb-8"
                        label="User"
                    />
                    <Tab
                        className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12 mb-8"
                        label="POS"
                    />
                    <Tab
                        className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12 mb-8"
                        label="Tax"
                    />
                    <Tab
                        className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12 mb-8"
                        label="Department"
                    />
                    {storeDetail.integrations.map((integration, index) => {
                        return (
                            <Tab
                                key={index}
                                className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12 mb-8"
                                label={integration}
                            />
                        );
                    })}
                </Tabs>
                <div className="py-16">
                    <div className={tabValue !== 0 ? 'hidden' : ''}>
                        <UsersTab />
                    </div>

                    <div className={tabValue !== 1 ? 'hidden' : ''}>
                        <PosTab />
                    </div>

                    <div className={tabValue !== 2 ? 'hidden' : ''}>
                        <TaxTab />
                    </div>

                    <div className={tabValue !== 3 ? 'hidden' : ''}>
                        <DepartmentTab />
                    </div>
                    {storeDetail.integrations.map((integration, index) => {
                        return (
                            <div
                                key={index}
                                className={
                                    tabValue !== 4 + index ? 'hidden' : ''
                                }
                            >
                                <IntegrationTab channel={integration} />
                            </div>
                        );
                    })}
                </div>
            </Paper>
        </>
    );
};

export default StoreTabs;
