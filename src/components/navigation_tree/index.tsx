import React, {FC} from 'react';
import { buildBcapsArrayIntoNavTree, getBCAPIndexfromApplication } from '../../utils/navigation';
import './styles.css';
import { Application } from '../../interfaces/application';
import { NavTreeHierarchy } from '../../interfaces/navigation_tree';

interface NavigationTreeProps {
    onUpdateSelection: Function | undefined
    selectedLayer: string | undefined,
    applications: Application[]
}

function generateDomElementsForTree(elements: NavTreeHierarchy[], onSelectUpdate?: Function, selected?: string | undefined) {
    return elements.map((n) => {
        const isSelectedClass = (n.title == selected)
            ? 'selected'
            : ''

        function sendUpdate() {
            if (onSelectUpdate != undefined) {
                onSelectUpdate(n);
            }
        }
        return <>
            <div onClick={sendUpdate} key={n.title}>
                <p className={isSelectedClass}>{n.title}</p>
                {
                    n.children != null && n.children.length > 0
                        ? <div className="child">
                            {generateDomElementsForTree(n.children, onSelectUpdate, selected)}
                            </div>
                        : <></>
                }
            </div>
        </>
    })
}

const NavigationTree: FC<NavigationTreeProps> = (props) => {
    const {
        applications,
        onUpdateSelection,
        selectedLayer
    } = props;

    let allBCaps = applications.map((n) => getBCAPIndexfromApplication(n))
    const navTree = buildBcapsArrayIntoNavTree(allBCaps);

    const domElements = generateDomElementsForTree(navTree, onUpdateSelection, selectedLayer)

    return (
        <>
            {domElements}
        </>
    )
}

export default NavigationTree;