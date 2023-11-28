import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styles from './style.module.scss';
import { useNavigate } from 'react-router-dom';
import { logoSrc, backImgSrc, abbDetail, detail } from 'src/app/model/PartnerModel';
import { Icon } from '@mui/material';

const ExpandMore = styled((props) => {
    const { ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const PartnerCard = (props) => {
    const { name } = props;
    const [expanded, setExpanded] = useState(false);

    const navigate = useNavigate();

    const handleClick = () => navigate(`/partners/add/${name}`);
    const handleExpandClick = () => setExpanded(!expanded);

    return (
        <Card className={`${styles.card_height} ${styles.paper}`}>
            <CardHeader
                avatar={
                    <div className={styles.header_size}>
                        <img src={logoSrc[name]} alt={name} />
                    </div>
                }
                action={
                    <IconButton aria-label="settings" onClick={handleClick}>
                        <Icon>add</Icon>
                    </IconButton>
                }
                title={
                    <Typography className={`font-bold text-20 ${styles[name]}`}>
                        {name}
                    </Typography>
                }
            />
            <CardMedia
                component="img"
                image={backImgSrc[name]}
                alt="image"
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary"  className = {styles.cardContent}>
                    {detail[name]}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent className={styles.expand_siz}>
                    <Typography variant="body2" color="text.secondary">
                        {detail[name]}
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    )
}

export default PartnerCard;