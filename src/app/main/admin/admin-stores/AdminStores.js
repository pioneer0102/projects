import history from '@history';
import reducer from './store';
import { useSelector } from 'react-redux';
import withReducer from 'app/store/withReducer';
import { selectUser } from 'app/store/userSlice';
import StoresTable from './components/StoresTable';
import StoresHeader from './components/StoresHeader';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const AdminStores = () => {
    const user = useSelector(selectUser);
    if (user.role === 'user') {
        history.push('/partners');
        return;
    }

    return (
        <QueryClientProvider client={queryClient}>
            <StoresHeader />
            <StoresTable />
        </QueryClientProvider>
    );
};

export default withReducer('adminStores', reducer)(AdminStores);
