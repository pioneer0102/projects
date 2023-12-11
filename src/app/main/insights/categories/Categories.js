import CategoryTable from './CategoryTable';
import { useDispatch } from 'react-redux';
import { useDeepCompareEffect } from '@fuse/hooks';
import { categoryStatisticalData } from '../store/categorySlice';
import reducer from '../store';
import withReducer from 'app/store/withReducer';

// const queryClient = new QueryClient();

const CategoryApp = () => {
    const dispatch = useDispatch();
    useDeepCompareEffect(() => {
        dispatch(categoryStatisticalData());
    }, [dispatch]);

    return (
        // <QueryClientProvider client={queryClient}>
        <CategoryTable />
        // </QueryClientProvider >
    );
};

export default withReducer('insightsApp', reducer)(CategoryApp);
