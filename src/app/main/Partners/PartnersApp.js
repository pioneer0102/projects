import PartnerCard from "./PartnerCard";
import { Channels } from 'src/app/model/Global';
import PartnerBreadcrumb from "./PartnerBreadCrumb";

function PartnersApp() {
    return (
        <>
            <PartnerBreadcrumb />
            <div className="flex">
                {
                    Channels.map((item, index) => (
                        <PartnerCard key={index} name={item} />
                    ))
                }
            </div>
        </>
    );
}

export default PartnersApp;
