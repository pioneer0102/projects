import { Outlet } from 'react-router-dom';
import reducer from './store';
import withReducer from 'app/store/withReducer';

function InsightsApp() {
    return <Outlet />;
}

export default withReducer('insightsApp', reducer)(InsightsApp);
