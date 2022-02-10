import { Application } from "../interfaces/application";
import { MinMaxRange } from "../interfaces/common";
import { escapeRegex } from "./common";

export function filterApplicationsByBCap(applications: Application[], selectedBCaps?: string): Application[] {
    if (!selectedBCaps) return []

    let matchingApps: Application[] = []
    applications.forEach((n) => {
        const bCapString = n.BCAP3
        const regexFriendlyBCaps = escapeRegex(selectedBCaps)
        // Regex used to check before match is not (number or .) and checks that after there is no digit 
        // So will match for end of line, space and larger numbers (ie 2 will match 2.2 but not 3.2)
        const selectionRegex = new RegExp("(?<!\\d|\\.)" + regexFriendlyBCaps + "(?!\\d)")
        if (bCapString.match(selectionRegex)) {
            matchingApps.push(n)
        }
    })

    return matchingApps;
}

export function getSliderRangeForApplications(applications: Application[]): MinMaxRange {
    const defaultMin = 0;
    let maxValue = 0;

    applications.forEach((n) => {
        if (n.spend > maxValue) {
            maxValue = n.spend
        }
    })

    return {
        minValue: defaultMin,
        maxValue
    }
}

export function filterApplicationsBySpending(applications: Application[], spending?: number): Application[] {
    if (spending == null || spending == undefined) return applications;
    return applications.filter((n) => n.spend <= spending);
}