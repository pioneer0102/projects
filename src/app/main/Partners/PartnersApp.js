import PartnerCard from "./PartnerCard";
import { Channels } from 'src/app/model/Global';
import Grid from "@mui/system/Unstable_Grid/Grid";

function PartnersApp() {
    return (
        <div className={`w-full p-16`}>
            <Grid container spacing={0}>
                {
                    Channels.map((item, index) => (
                        <Grid key={index} item lg={4} md={6} sm={12} xs={12}>
                            <PartnerCard key={index} name={item} />
                        </Grid>
                    ))
                }
            </Grid>
        </div>
    );
}

export default PartnersApp;
