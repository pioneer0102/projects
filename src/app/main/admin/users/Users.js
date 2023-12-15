import React from 'react';
import reducer from './store';
import withReducer from 'app/store/withReducer';
import UsersTable from './components/UsersTable';
import UsersHeader from './components/UsersHeader';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const Users = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <UsersHeader />
            <UsersTable />
        </QueryClientProvider>
    );
};

export default withReducer('adminUsers', reducer)(Users);
