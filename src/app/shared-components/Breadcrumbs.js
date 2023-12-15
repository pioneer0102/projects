import React from 'react';
import { Typography } from '@mui/material';
import NavLinkAdapter from '@fuse/core/NavLinkAdapter';

const Breadcrumb = ({ breadCrumbs }) => {
    return (
        <>
            {breadCrumbs.map((item, index) => (
                <React.Fragment key={index}>
                    {item.url ? (
                        <Typography
                            className={`text-18 md:text-18 font-bold tracking-tight ${
                                index === breadCrumbs.length - 1 && index !== 0
                                    ? 'text-red-500'
                                    : ''
                            }`}
                            role="button"
                            component={NavLinkAdapter}
                            to={`../${item.url}`}
                        >
                            {item.name}
                        </Typography>
                    ) : (
                        <span
                            className={`text-18 md:text-18 font-bold tracking-tight ${
                                index === breadCrumbs.length - 1 && index !== 0
                                    ? 'text-red-500'
                                    : ''
                            }`}
                        >
                            {item.name}
                        </span>
                    )}
                    {index < breadCrumbs.length - 1 && item.url && (
                        <span className="mx-8">/</span>
                    )}
                </React.Fragment>
            ))}
        </>
    );
};

export default Breadcrumb;
