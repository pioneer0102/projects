import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavLinkAdapter from '@fuse/core/NavLinkAdapter';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

function Breadcrumb(props) {
    const { parentUrl, parent, child } = props;
    const { t } = useTranslation();
    const navigate = useNavigate();
    return (
        <>
            <div className="flex items-center mx-24 mt-32 justify-between">
                <div role="presentation">
                    <Breadcrumbs aria-label="breadcrumb">
                        <Typography
                            className="inline text-18 text-center font-medium"
                            color="text.secondary"
                            role="button"
                            component={NavLinkAdapter}
                            to={`../${parentUrl}`}
                        >
                            {parent}
                        </Typography>
                        <Typography className="inline text-18 text-center font-medium text-pink-500">
                            {child}
                        </Typography>
                    </Breadcrumbs>
                </div>
                <Button
                    variant="contained"
                    color="info"
                    className="rounded-md"
                    onClick={() => {
                        navigate(`../${parentUrl}`);
                    }}
                >
                    <FuseSvgIcon size={18}>
                        heroicons-solid:arrow-left
                    </FuseSvgIcon>
                    <span className="ml-8">{t('back')}</span>
                </Button>
            </div>
        </>
    );
}

export default Breadcrumb;
