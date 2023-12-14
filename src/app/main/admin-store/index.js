import withReducer from 'app/store/withReducer';
import reducer from './store';
import StoresTable from './components/StoresTable';
import StoresSearchFilter from './components/StoresSearchFilter';
import { selectUser } from 'app/store/userSlice';
import { useSelector } from 'react-redux';
import history from '@history';

const StoresApp = () => {
    const user = useSelector(selectUser);
    if (user.role === 'user') {
        history.push('/partners');
        return;
    }
    return (
        <div>
            <StoresSearchFilter />
            <StoresTable />
        </div>
    );
};

export default withReducer('storesApp', reducer)(StoresApp);
