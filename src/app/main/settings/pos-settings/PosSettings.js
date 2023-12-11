import withReducer from 'app/store/withReducer';
import reducer from '../store';
import PosSearchFilter from './PosSearchFilter';
import PosTable from './PosTable';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function PosSettings() {
    return (
        <QueryClientProvider client={queryClient}>
            <PosSearchFilter />
            <PosTable />
        </QueryClientProvider>
    );
}

export default withReducer('settingsApp', reducer)(PosSettings);
