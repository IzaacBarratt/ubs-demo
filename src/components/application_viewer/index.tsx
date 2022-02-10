import React, {FC} from 'react';
import { Application } from '../../interfaces/application';
import { filterApplicationsByBCap, filterApplicationsBySpending } from '../../utils/application';
import "./styles.css";

interface ApplicationViewerProps {
    applications: Application[],
    selectedBCaps?: string,
    selectedSpending?: number
}

const ApplicationViewer: FC<ApplicationViewerProps> = (props) => {
    const {
        applications,
        selectedBCaps,
        selectedSpending
    } = props;

    function renderApp(app: Application) {
        return <div className="app-viewer_element">
            <h3>{app.name}</h3>
            <h5>${app.spend}</h5>
        </div>
    }

    const selectedApplications = filterApplicationsByBCap(applications, selectedBCaps)
    const pricedApplications = filterApplicationsBySpending(selectedApplications, selectedSpending)

    return <div className="app-viewer">
        <div className="app-viewer_element-container">
            {pricedApplications.map((n) => renderApp(n))}
        </div>
    </div>
}

export default ApplicationViewer;