import reducer from '../store';
import withReducer from 'app/store/withReducer';
import UserHeader from './components/UserHeader';
import UserTable from './components/UserTable';

import { QueryClient, QueryClientProvider } from 'react-query';
import { selectUser } from 'app/store/userSlice';
import { useSelector } from 'react-redux';
import history from '@history';

const queryClient = new QueryClient();

const UserManagement = () => {
    const user = useSelector(selectUser);
    if (user.role === 'admin') {
        history.push('/items');
        return;
    }
    return (
        <QueryClientProvider client={queryClient}>
            <UserHeader />
            <UserTable />
        </QueryClientProvider>
    );
};

export default withReducer('userApp', reducer)(UserManagement);
