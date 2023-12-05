import { QueryClient, QueryClientProvider } from 'react-query';
import ChannelTable from './ChannelTable';
import { useDispatch } from 'react-redux';
import { useDeepCompareEffect } from '@fuse/hooks';
import { channelStatisticalData } from '../store/channelSlice';
import reducer from '../store';
import withReducer from 'app/store/withReducer';

// const queryClient = new QueryClient();

const ChannelApp = () => {
    const dispatch = useDispatch();
    useDeepCompareEffect(() => {
        dispatch(channelStatisticalData());
      }, [dispatch]);

    return (
        // <QueryClientProvider client={queryClient}>
            <ChannelTable />
        // </QueryClientProvider >

    );
};

export default withReducer('insightsApp', reducer)(ChannelApp);