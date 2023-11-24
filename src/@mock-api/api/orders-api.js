import _ from '@lodash';
import FuseUtils from '@fuse/utils/FuseUtils';
import mockApi from '../mock-api.json';
import mock from '../mock';

const ordersDB = mockApi.database.examples.orders.value;

mock.onPost('/api/getorders').reply(({data}) => {
    
    const {searchText, subtotal, channel, status, pageNumber, pageSize} = JSON.parse(data);

    const pagenumber = parseInt(pageNumber);
    const pagesize = parseInt(pageSize);
    const startIndex = pagenumber * pagesize || 0;
    const endIndex = (pagenumber * pagesize + pagesize) || ordersDB.length;

    const pagedData = ordersDB.slice(startIndex, endIndex);
    return [200, pagedData];

    // if(searchText == null && subtotal == null && channel == null && status == null){
    //     const pagedData = ordersDB.slice(startIndex, endIndex);
    //     return [200, pagedData];
    // }
    // else{
    //     const filteredData = ordersDB.filter((item) => (
    //         (searchText === null || (searchText !== null && item.customer == searchText))
    //         && (subtotal === null || (subtotal !== null && item.subtotal == subtotal))
    //         && (channel === null || (channel !== null && item.channel == channel))
    //         && (status === null || ( item.status == status))
    //     ));
    //     // const filteredData = ordersDB.filter((item)=> item.channel == "DoorDash");
    //     const pagedData = filteredData.slice(startIndex, endIndex);
    //     return [200, pagedData];
    // }
})