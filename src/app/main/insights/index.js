import reducer from './store';
import withReducer from 'app/store/withReducer';
import Report from './Report/Report';

const InsightsApp = () => {
    return (
        <>
            <Report />
        </>
    );
};

export default withReducer('insightsApp', reducer)(InsightsApp);
