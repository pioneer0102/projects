import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { departmentTableHeader } from 'src/app/model/PosModel';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import styles from '../../style.module.scss';
import { useState } from "react";
import { Button } from '@mui/material';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import DepartmentForm from "./DepartmentForm";

const DepartmentTab = (props) => {
    const { posById } = props;
    const { t } = useTranslation();
    const routeParams = useParams();

    const [dialogOpen, setDialogOpen] = useState(false);
    const [item, setItem] = useState({});
    const [action, setAction] = useState('');

    const editDepartment = (item) => {
        setAction('edit');
        setDialogOpen(true);
        setItem(item);
    }

    const addDepartment = () => {
        setAction('add');
        setDialogOpen(true);
        setItem({ tax_name: '', tax_rate: '' })
    }

    const dialogClose = () => {
        setDialogOpen(false);
    }

    return (
        <>
            <Paper
                className={`px-24 py-24 rounded-md shadow-none ${styles.paper}`}
            >
                <div className='flex items-center justify-between'>
                    <Typography className={`font-bold text-32`} color="text.secondary">
                        {routeParams.action} Deparatment
                    </Typography>
                    <Button
                        variant="contained"
                        color="info"
                        onClick={() => addDepartment()}
                        className="rounded-md"
                    >
                        <FuseSvgIcon size={24}>heroicons-solid:plus</FuseSvgIcon>
                        <span className='ml-8'>{t('add')}</span>
                    </Button>
                </div>
                {
                    Object.entries(posById) == 0 ?
                        <div className="flex flex-1 items-center justify-center mt-32">
                            <Typography color="text.secondary" variant="h5">
                                {t('noData')}
                            </Typography>
                        </div>
                        :
                        <>
                            <Table className="mt-32">
                                <Thead className="border-b-2">
                                    <Tr>
                                        {departmentTableHeader.map((item, index) => (
                                            <Th
                                                key={index}
                                                align={item.align}>
                                                <Typography
                                                    color="text.secondary"
                                                    className="font-bold text-16 pb-16">
                                                    {item.label}
                                                </Typography>
                                            </Th>
                                        ))}
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {
                                        posById.department.map((item, index) => {
                                            return (
                                                <Tr
                                                    key={index}
                                                    role="button"
                                                    onClick={() => { editDepartment(item); }}
                                                >
                                                    <Td align="left">
                                                        <Typography
                                                            color="text.secondary"
                                                            className="font-semibold text-14 md:pt-16">
                                                            {item.department_name}
                                                        </Typography>
                                                    </Td>
                                                    <Td align="left">
                                                        <Typography
                                                            color="text.secondary"
                                                            className="font-semibold text-14 md:pt-16">
                                                            {item.tax_rate}
                                                        </Typography>
                                                    </Td>
                                                </Tr>
                                            )
                                        })

                                    }
                                </Tbody>
                            </Table>
                        </>
                }
            </Paper>
            <DepartmentForm dialogOpen={dialogOpen} handleClose={dialogClose} item={item} action={action} />
        </>
    );
};

export default DepartmentTab;
