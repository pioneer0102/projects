import SaleFilter from './saleFilter';
import OrderFilter from './orderFilter';

const SearchFilter = () => {
    return (
        <div className="border-l-2 px-32 py-32 mr-24 my-24">
            <SaleFilter />
            <OrderFilter />
        </div>
    );
};

export default SearchFilter;
