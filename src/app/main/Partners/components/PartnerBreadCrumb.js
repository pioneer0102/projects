import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavLinkAdapter from '@fuse/core/NavLinkAdapter';
import { useTranslation } from 'react-i18next';
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import history from '@history';
import styles from '../style.module.scss';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';

function PartnerBreadcrumb(props) {
    const { channel } = props;
    const { t } = useTranslation();
    return (
        <>
            <div className='flex items-center mx-24 mt-24 justify-between'>
                <div role="presentation">
                    <Breadcrumbs aria-label="breadcrumb">
                        <Typography
                            className="inline text-15 text-center font-medium"
                            color="text.secondary"
                            role="button"
                            component={NavLinkAdapter}
                            to={`../partners`}
                        >{t('partners.partners')}
                        </Typography>
                        <Typography className="inline text-15 text-center font-medium text-pink-500"
                        >{channel}</Typography>
                    </Breadcrumbs>
                </div>
                <Button
                    variant="contained"
                    color="secondary"
                    className={styles.button}
                    onClick={() => { history.push('/partners'); }}>
                    <FuseSvgIcon size={18}>heroicons-solid:arrow-left</FuseSvgIcon>
                    <span className='ml-8'>{t('back')}</span>
                </Button>
            </div>
        </>

    );
}

export default PartnerBreadcrumb;