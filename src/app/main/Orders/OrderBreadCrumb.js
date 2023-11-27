import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavLinkAdapter from '@fuse/core/NavLinkAdapter';

function OrderBreadcrumb({ id, subtotal }) {
    // const { id, subtotal } = props;
    var flag = false;
    if (id === (null || undefined) && subtotal === (null || undefined)) {flag = false;}
    else {flag = true;}
    return (
        <>
            {!flag &&
                <div role="presentation" className='mx-32 mt-32'>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Typography className="inline text-15 text-center font-medium"
                            color="text.secondary">Orders</Typography>
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
                            to={`../orders`}
                        >Orders
                        </Typography>
                        <Typography className="inline text-15 text-center font-medium text-pink-500"
                        >Detail</Typography>
                    </Breadcrumbs>
                </div>
            }
        </>

    );
}

export default OrderBreadcrumb;