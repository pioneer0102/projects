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
        <Paper className='rounded-md shadow-none'>
        </Paper>
    );
};

export default DepartmentTab;
