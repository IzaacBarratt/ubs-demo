import React, {FC, useState} from 'react';
import { buildBcapsArrayIntoNavTree, getBCAPIndexfromApplication } from '../../utils/navigation';
import './styles.css';
import { Application } from '../../interfaces/application';
import { NavTreeHierarchy } from '../../interfaces/navigation_tree';

interface NavigationTreeProps {
    onUpdateSelection: Function | undefined
    applications: Application[]
}

/**
 * Wasn't really sure what approach I should take, ie, use simple static list for time/speed + effieincy.
 * I don't really know what the future and intention of this service is for (assume this is intended as part of the test)
 * So I decided for this compoent to deliberatly go down the dyanmic route. Was a bit harder but a better display
 * of using functional / recursive programming for more built-in flexibility down the line
 * 
 */

const NavigationTree: FC<NavigationTreeProps> = (props) => {
    const {
        applications,
        onUpdateSelection,
    } = props;

    // String representation of selection as easy to use with key comparison
    const [selectedLayer, setSelectedLayer] = useState("")
    // Used hashmap to reference keys and their state as this is easier than looping through array (also more effieint for processing)
    const [expandedLayers, setExpandedLayers] = useState<{ [path: string]: boolean | null }>({})

    let allBCaps = applications.map((n) => getBCAPIndexfromApplication(n))
    const navTree = buildBcapsArrayIntoNavTree(allBCaps);

    // Recursive function so we can generate any arbitrary amount of children deep
    function generateDomElementsForTree(elements: NavTreeHierarchy[], parentPath: string = "") {
        return elements.map((n) => {
            const currentPath = parentPath.length > 0
                ? parentPath + '.' + n.title
                : n.title
            const isSelectedClass = (currentPath === selectedLayer)
                ? 'nav-tree_item--selected'
                : ''

            // Component has it's own internal state for knowing whats selected
            // But parent needs to be aware too, so if function is set - emit selection upwards
            function sendUpdate() {
                setSelectedLayer(currentPath);
                if (onUpdateSelection) {
                    onUpdateSelection(currentPath)
                }
            }

            function togglePath() {
                // o(1) for check + update
                if (!expandedLayers[currentPath]) {
                    setExpandedLayers({
                        ...expandedLayers,
                        [currentPath]: true
                    })
                } else {
                    setExpandedLayers({
                        ...expandedLayers,
                        [currentPath]: false
                    })
                }
            }

            // Check if current child is on open list
            const pathIsOpen = expandedLayers[currentPath] === true
            const hasChildren = n.children != null && n.children.length > 0;
            const activeClass = pathIsOpen 
                ? "nav-tree_item-dropdown-toggle--active"
                : ""

            return <>
                <div className={"nav-tree__item "} key={currentPath}>
                    <div className={"nav-tree__item-title " + isSelectedClass} onClick={sendUpdate}>
                        <p>{"Business Capabilities " + currentPath}</p>
                        {
                            hasChildren
                                ? <div onClick={togglePath} className={"nav-tree_item-dropdown-toggle " + activeClass}/> 
                                : <></>
                        }
                    </div>
                    {
                        hasChildren && pathIsOpen
                            ?   <div className="nav-tree__item-children">
                                    {generateDomElementsForTree(n.children, currentPath)}
                                </div>
                            :   <></>
                    }
                </div>
            </>
        })
    }

    const domElements = generateDomElementsForTree(navTree)

    return (
        <div className="nav-tree"> 
            {domElements} 
        </div>
    )
}

export default NavigationTree;