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
import MoreVertIcon from '@mui/icons-material/MoreVert';
import styles from './style.module.scss';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import { logoSrc, backImgSrc } from 'src/app/model/PartnerModel';
import { Channels } from 'src/app/model/Global';
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
    const [anchorEl, setAnchorEl] = useState(null);
    const [partner, setPartner] = useState(null);

    const navigate = useNavigate();

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setPartner(name);
    }

    const handleEdit = () => {
        setAnchorEl(null);
        navigate(`/partners/edit/${partner}`);
    }

    const handleAdd = () => {
        setAnchorEl(null);
        navigate(`/partners/add/${partner}`);
    }

    const handleClose = () => setAnchorEl(null);
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
                <Typography variant="body2" color="text.secondary">
                    {name === "DoorDash" && 'Doordash provides food delivery services connecting customers with local businesses.'}
                    {name === "Uber" && 'Uber provides ride-hailing services, food delivery, and freight transport.'}
                    {name === "GrubHub" && 'Grubhub helps you find and order food from wherever you are.'}
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
                    {
                        name === "DoorDash" &&
                        <Typography variant="body2" color="text.secondary">
                            DoorDash, Inc. is a San Francisco–based company that operates an online food ordering and food delivery platform. It trades under the symbol DASH. With a 56% market share, DoorDash is the largest food delivery company in the United States. It also has a 60% market share in the convenience delivery category.
                        </Typography>
                    }
                    {
                        name === "Uber" &&
                        <Typography variant="body2" color="text.secondary">
                            Uber Technologies, Inc. provides ride-hailing services, food delivery, and freight transport. It is headquartered in San Francisco and operates in approximately 70 countries and 10,500 cities worldwide.
                        </Typography>
                    }
                    {
                        name === "GrubHub" &&
                        <Typography variant="body2" color="text.secondary">
                            Grubhub Inc. is an American online and mobile prepared food ordering and delivery platform based in Chicago, Illinois. Founded in 2004, it is a subsidiary of the Dutch company Just Eat Takeaway since 2021.
                        </Typography>
                    }
                </CardContent>
            </Collapse>
        </Card>
    )
}

export default PartnerCard;