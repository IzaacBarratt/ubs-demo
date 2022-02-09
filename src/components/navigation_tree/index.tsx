import React, {FC} from 'react';
import { getBCAPIndexfromApplication } from '../../utils/navigation';
import './styles.css';
import { Application } from '../../interfaces/application';

interface NavigationTreeProps {
    onUpdateSelection: Function | undefined
    selectedLayer: string | undefined,
    applications: Application[]
}

function generateDomElementsForTree(elements: string[], onSelectUpdate?: Function, selected?: string | undefined) {

    return elements.map((n) => {
        const isSelectedClass = (n == selected)
            ? 'selected'
            : ''

        function sendUpdate() {
            if (onSelectUpdate != undefined) {
                onSelectUpdate(n);
            }
        }
        return <>
            <div onClick={sendUpdate}>
                <p className={isSelectedClass}>{n}</p>
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

    const orderedApplications = applications.sort((a, b) => {
        const aCaps = getBCAPIndexfromApplication(a)
        const bCaps = getBCAPIndexfromApplication(b)


        let largestLength = (aCaps.length > bCaps.length)
            ? aCaps.length
            : bCaps.length;

        for (let i = 0; i < largestLength; i++) {
            let aCapIndex = aCaps[i]
            let bCapIndex = bCaps[i]

            if (aCapIndex == bCapIndex) continue;
            return aCapIndex - bCapIndex
        }

        return 0
    })

    let uniqueObjKey: { [bcaps: string]: boolean } = {}

    orderedApplications.forEach((n) => {
        const bcaps = getBCAPIndexfromApplication(n)
        const key = bcaps.join('.')

        if (!uniqueObjKey[key]) {
            uniqueObjKey[key] = true
        }
    })

    const uniqueBcapKeys = Object.keys(uniqueObjKey)
    const domElements = generateDomElementsForTree(uniqueBcapKeys, onUpdateSelection, selectedLayer)

    return (
        <>
            {domElements}
        </>
    )
}

export default NavigationTree;