import React, {FC} from 'react';
import { Application } from '../../interfaces/application';
import { filterApplicationsByBCap } from '../../utils/application';

interface ApplicationViewerProps {
    applications: Application[],
    selectedBCaps?: string
}

const ApplicationViewer: FC<ApplicationViewerProps> = (props) => {
    const {
        applications,
        selectedBCaps
    } = props;

    const selectedApplications = filterApplicationsByBCap(applications, selectedBCaps)

    return <>{selectedApplications.map((n) => <p key={n.id}>{n.BCAP3}</p>)}</>
}

export default ApplicationViewer;