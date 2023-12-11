import withReducer from "app/store/withReducer";
import reducer from '../store'
import PosTabs from "./PosTabs";

function PosSettings() {
    return (
        <PosTabs />
    );
}

export default withReducer('settingsApp', reducer)(PosSettings);
