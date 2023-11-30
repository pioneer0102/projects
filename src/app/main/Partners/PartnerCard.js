import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import styles from './style.module.scss';
import { useNavigate } from 'react-router-dom';
import { logoSrc, backImgSrc, detail } from 'src/app/model/PartnerModel';
import { CircularProgress } from '@mui/material';

const PartnerCard = (props) => {
    const { name } = props;

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    const handleClick = () => navigate(`/partners/add/${name}`);

    const handleOnLoad = () => setIsLoading(false);

    return (
        <Card className={`flex-1 ${styles.paper}`}>
            <CardHeader
                avatar={
                    <div className={`${styles.logo_size} flex`}>
                        <img src={logoSrc[name]} alt={name} className='flex-1 self-center' />
                    </div>
                }
                title={
                    <Typography className={`font-bold text-32 ${styles[name]}`}>
                        {name}
                    </Typography>
                }
            />
            <div className={`px-16 ${styles.container}`}>
                {isLoading && (
                    <CircularProgress
                        size={24}
                        sx={{
                            color: "inherit",
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            marginTop: '0px',
                            marginLeft: '-12px',
                        }}
                    />
                )}
                <CardMedia
                    component="img"
                    image={backImgSrc[name]}
                    className={styles.backimg_size}
                    alt="image"
                    onLoad={handleOnLoad}
                    role="button"
                    onClick={handleClick}
                />
                <div className={styles.overlay} role="button"
                    onClick={handleClick}>
                    <p className={styles.text}>
                        {detail[name]}
                    </p>
                </div>
            </div>
            <CardContent>
            </CardContent>
        </Card>
    )
}

export default PartnerCard;