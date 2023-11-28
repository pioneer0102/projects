import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavLinkAdapter from '@fuse/core/NavLinkAdapter';
import { useTranslation } from 'react-i18next';

function PartnerBreadcrumb(props) {
    const { channel } = props;
    var flag = false;
    if (channel === (null || undefined)) {flag = false;}
    else {flag = true;}
    const { t } = useTranslation();
    return (
        <>
            {!flag &&
                <div role="presentation" className='mx-32 mt-32'>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Typography className="inline text-15 text-center font-medium"
                            color="text.secondary">{ t('partners.partners') }</Typography>
                    </Breadcrumbs>
                </div>
            }
            {flag &&
                <div role="presentation" className='mx-32 mt-32'>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Typography
                            className="inline text-15 text-center font-medium"
                            color="text.secondary"
                            role="button"
                            component={NavLinkAdapter}
                            to={`../partners`}
                        >{ t('partners.partners') }
                        </Typography>
                        <Typography className="inline text-15 text-center font-medium text-pink-500"
                        >{channel}</Typography>
                    </Breadcrumbs>
                </div>
            }
        </>

    );
}

export default PartnerBreadcrumb;