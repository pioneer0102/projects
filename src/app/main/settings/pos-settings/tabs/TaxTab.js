import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { taxTableHeader } from 'src/app/model/PosModel';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import styles from '../../style.module.scss';
import { useState } from "react";
import TaxForm from "./TaxForm";
import { Button } from '@mui/material';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';

const TaxTab = (props) => {
    const { posById } = props;
    const { t } = useTranslation();
    const routeParams = useParams();

    const [dialogOpen, setDialogOpen] = useState(false);
    const [item, setItem] = useState({});
    const [action, setAction] = useState('');

    const editTax = (item) => {
        setAction('edit');
        setDialogOpen(true);
        setItem(item);
    }
    const addTax = () => {
        setAction('add');
        setDialogOpen(true);
        setItem({tax_name: '', tax_rate: ''})
    }

    const dialogClose = () => {
        setDialogOpen(false);
    }

    return (
        <>
            <Paper
                className={`px-24 py-24 rounded-md shadow-none ${styles.paper}`}
            >
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
                                        {taxTableHeader.map((item, index) => (
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
                                        posById.tax.map((item, index) => {
                                            return (
                                                <Tr
                                                    key={index}
                                                    role="button"
                                                    onClick={() => { editTax(item); }}
                                                >
                                                    <Td align="left">
                                                        <Typography
                                                            color="text.secondary"
                                                            className="font-semibold text-14 md:pt-16">
                                                            {item.tax_name}
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
            <TaxForm dialogOpen={dialogOpen} handleClose={dialogClose} item={item} action={action} />
        </>
    );
};

export default TaxTab;
