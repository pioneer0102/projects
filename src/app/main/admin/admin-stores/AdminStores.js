import withReducer from 'app/store/withReducer';
import reducer from './store';
import StoreList from './components/StoreList';
import { selectUser } from 'app/store/userSlice';
import { useSelector } from 'react-redux';
import history from '@history';
import SearchFilter from './components/SearchFilter';

const AdminStores = () => {
    const user = useSelector(selectUser);
    if (user.role === 'user') {
        history.push('/partners');
        return;
    }

    return (
        <div>
            <SearchFilter />
            <StoreList />
        </div>
    );
};

export default withReducer('adminStores', reducer)(AdminStores);
