import _ from '@lodash';
import mockApi from '../../mock-api.json';
import mock from '../../mock';
import FuseUtils from '@fuse/utils/FuseUtils';

const posDB = mockApi.database.examples.pos.value;

mock.onGet('/api/getPos').reply(() => {
    return [200, posDB];
});

mock.onPost('/api/addPos').reply(({ data }) => {
    const { type, userName, password, url, taxes, departments } =
        JSON.parse(data);
    const id = FuseUtils.generateGUID();
    posDB.push({
        id: id,
        type: type,
        userName: userName,
        password: password,
        url: url,
        taxes: taxes,
        departments: departments
    });
    return [200, { success: true }];
});

mock.onPost('/api/updatePos').reply(({ data }) => {
    const { id, type, userName, password, url, taxes, departments } =
        JSON.parse(data);
    _.assign(_.find(posDB, { id: id }), {
        type: type,
        userName: userName,
        password: password,
        url: url,
        taxes: taxes,
        departments: departments
    });
    return [200, { success: true }];
});

// mock.onPost('/api/getAllPos').reply(({ data }) => {
//     const { searchText, rowsPerPage, page } = JSON.parse(data);

//     const pagesize = parseInt(rowsPerPage);
//     const pagenumber = parseInt(page);

//     if (searchText === '') {
//         const startIndex = pagenumber * pagesize;
//         const endIndex = (pagenumber * pagesize + pagesize);
//         const pagedData = posDB.slice(startIndex, endIndex);
//         const data = {
//             pagedData: pagedData,
//             filterSize: posDB.length
//         };
//         return [200, data];
//     }
//     else {
//         const filteredData = posDB.filter((item) => {
//             return (
//                 (searchText === '' || item.type.toLowerCase().includes(searchText.toLowerCase()))
//             );
//         });
//         const startIndex = pagenumber * pagesize || 0;
//         const endIndex = (pagenumber * pagesize + pagesize) || filteredData.length;
//         const pagedData = filteredData.slice(startIndex, endIndex);
//         const data = {
//             pagedData: pagedData,
//             filterSize: filteredData.length
//         };
//         return [200, data];
//     }
// });
