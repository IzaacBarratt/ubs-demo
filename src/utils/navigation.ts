import { Application } from "../interfaces/application";
import { NavTreeHierarchy } from "../interfaces/navigation_tree";

// Function used to split up business capabilities of application so tree hierarchy so can more accurately order/structure data
export function getBCAPIndexfromApplication(application: Application): number[] {
    try {
        const fullBCAP = application.BCAP3;
        const parsedBCAPNumbers = fullBCAP.match(/\d+/g)

        if (parsedBCAPNumbers != null) {
            const bcapNumbers  = parsedBCAPNumbers.map((n) => parseInt(n));

            if (!bcapNumbers) {
                throw Error()
            }
            return bcapNumbers;
        }
    } catch (e) {
        console.error(`
             Unable to get bcap numbers from application ${application.id}
             BCAP3: ${application.BCAP3}
        `)
    }

    return [];
}

export function buildBcapsArrayIntoNavTree(totalItems: number[][], index: number = 0): NavTreeHierarchy[] {
    // Bonus that using a numeric index on map means Object.keys() prints ordered list
    let splitList: { [title: number]: number[][] } = {}

    if (totalItems == null || totalItems.length === 0) {
        return [];
    }

    totalItems.forEach((n) => {
        const bCapToUse = n[index]
        // If this item is at it's max depth in hierarchy, skip to next 
        // This lets you work with arbitrary list of depths without getting null values
        if (!bCapToUse) return;

        if (splitList[bCapToUse] == null) {
            splitList[bCapToUse] = []
        }

        splitList[bCapToUse].push(n)
    })

    const keysAtIndex = Object.keys(splitList)

    return keysAtIndex.map((n) => ({
        title: n,
        children: buildBcapsArrayIntoNavTree(splitList[parseInt(n)], index + 1)
    }))
}
