import FuseLoading from "@fuse/core/FuseLoading";
import { Typography } from "@mui/material";
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useQuery } from "react-query";
import { useDispatch } from 'react-redux';
import InvListItem from './InvListItem';
import List from '@mui/material/List';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import styles from './style.module.scss';
import {
    selectSearchText,
    selectPrice,
    selectCategory,
    selectPageNumber,
    selectPageSize,
    setPagenumber,
    getInventory
} from './store/inventorySlice';
import Grid from "@mui/system/Unstable_Grid/Grid";

const InvList = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const searchText = useSelector(selectSearchText);
    const price = useSelector(selectPrice);
    const category = useSelector(selectCategory);
    const pageNumber = useSelector(selectPageNumber);
    const pageSize = useSelector(selectPageSize);

    const searchData = {
        searchText: searchText,
        price: price,
        category: category,
        pageNumber: pageNumber,
        pageSize: pageSize
    };

    const { data: Inventory, isLoading, isError } = useQuery(['inventoryList', searchData], () => getInventory(searchData));

    const handleChange = (event, value) => {
        dispatch(setPagenumber(value - 1));
    }

    if (isLoading) {
        return <FuseLoading />;
    }

    if (isError) {
        return (
            <div className="flex flex-1 items-center justify-center h-full">
                <Typography color="text.secondary" variant="h5">
                    {t('orders.noData')}
                </Typography>
            </div>
        );
    }

    if (Inventory.pagedData.length === 0) {
        return (
            <div className="flex flex-1 items-center justify-center h-full">
                <Typography color="text.secondary" variant="h5">
                    {t('orders.noData')}
                </Typography>
            </div>
        );
    }

    return (
        <div className="flex flex-col mt-24 mx-24">
            <Grid container spacing={0} className={styles.list}>
                {
                    Inventory.pagedData.map((item, index) => (
                        <Grid key={index} lg={6} md={6} sm={12} xs={12}>
                            <InvListItem key={index} item={item} />
                        </Grid>
                    ))
                }
            </Grid>
            {/* <List className={styles.list}>
                {
                    Inventory.pagedData.map((item, index) => (
                        <InvListItem key={index} item={item} />
                    ))
                }
            </List> */}
            <Stack spacing={2} className="self-end" >
                <Typography>Page: {pageNumber + 1}</Typography>
                <Pagination count={Math.ceil(Inventory.filterSize / 10)} page={pageNumber+1} onChange={handleChange} />
            </Stack>
        </div>
    )

}

export default InvList;