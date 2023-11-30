import PartnerCard from "./PartnerCard";
import { Channels } from 'src/app/model/Global';
import styles from './style.module.scss';
import Grid from "@mui/system/Unstable_Grid/Grid";

function PartnersApp() {
    return (
        <div className={`w-full p-16`}>
            <Grid container spacing={0}>
                {
                    Channels.map((item, index) => (
                        <Grid item lg={4} md={4} sm={12} xs={12}>
                            <PartnerCard key={index} name={item} />
                        </Grid>
                    ))
                }
            </Grid>            
        </div>
    );
}

export default PartnersApp;
