import PartnerCard from "./PartnerCard";
import { Channels } from 'src/app/model/Global';
import styles from './style.module.scss';

function PartnersApp() {
    return (
        <div className={`flex md:flex-row flex-col mx-32 my-32 ${styles.wrapper}`}>
            {
                Channels.map((item, index) => (
                    <PartnerCard key={index} name={item} />
                ))
            }
        </div>
    );
}

export default PartnersApp;
