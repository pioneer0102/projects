import reducer from './store';
import withReducer from 'app/store/withReducer';
import Report from './report/Report';
import { selectUser } from 'app/store/userSlice';
import { useSelector } from 'react-redux';
import history from '@history';

const InsightsApp = () => {
    const user = useSelector(selectUser);
    if (user.role === 'admin') {
        history.push('/item-management');
        return;
    }
    return (
        <>
            <Report />
        </>
    );
};

export default withReducer('insightsApp', reducer)(InsightsApp);
