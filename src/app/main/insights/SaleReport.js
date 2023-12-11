import { useQuery } from 'react-query';
import { getSaleData, saleFilter } from './store/saleSlice';
import { useSelector } from 'react-redux';

const SaleReport = () => {
    const filter = useSelector(saleFilter);
    const { data, isLoading, isError } = useQuery(
        ['ordersList', filter],
        getSaleData(filter)
    );
    return <div>qweqweqweqwe</div>;
};

export default SaleReport;
