import reducer from './store';
import withReducer from 'app/store/withReducer';
import { QueryClient, QueryClientProvider } from 'react-query';
import SearchFilter from './searchFilter/SearchFilter';
import Report from './Report';
import Grid from '@mui/system/Unstable_Grid/Grid';

const queryClient = new QueryClient();

const InsightsApp = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <Grid container spacing={2}>
                <Grid lg={9} md={9} sm={9} xs={9}>
                    <Report />
                </Grid>
                <Grid lg={3} md={3} sm={3} xs={3}>
                    <SearchFilter />
                </Grid>
            </Grid>
        </QueryClientProvider>
    );
};

export default withReducer('insightsApp', reducer)(InsightsApp);
