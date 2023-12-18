import reducer from './store';
import withReducer from 'app/store/withReducer';
import ItemsTable from './components/ItemsTable';
import ItemsHeader from './components/ItemsHeader';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const Items = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <ItemsHeader />
            <ItemsTable />
        </QueryClientProvider>
    );
};

export default withReducer('itemsApp', reducer)(Items);
