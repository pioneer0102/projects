import reducer from '../store';
import withReducer from 'app/store/withReducer';
import UserSearchFilter from './components/UserSearchFilter';
import UserTable from './components/UserTable';

import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const UserManagement = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <UserSearchFilter />
            <UserTable />
        </QueryClientProvider>
    );
};

export default withReducer('userApp', reducer)(UserManagement);
