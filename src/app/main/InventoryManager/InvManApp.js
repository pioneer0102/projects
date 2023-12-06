import reducer from './store';
import withReducer from 'app/store/withReducer';
import InvSearchFilter from "./InvSearchFilter";
import InvList from './InvList';
import InvManTable from './InvManTable';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const InvManApp = () => {

    return (
        <QueryClientProvider client={queryClient}>
            <InvSearchFilter />
            <InvManTable />
        </QueryClientProvider >
    );
};

export default withReducer('inventoryApp', reducer)(InvManApp);
