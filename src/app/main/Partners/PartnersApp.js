import PartnerCard from "./PartnerCard";
import { Channels } from 'src/app/model/Global';

function PartnersApp() {
    return (
        <div className="flex md:flex-row flex-col mx-24 my-32 gap-24">
            {
                Channels.map((item, index) => (
                    <PartnerCard key={index} name={item} />
                ))
            }
        </div>
    );
}

export default PartnersApp;
