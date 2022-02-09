import { Application } from "../interfaces/application";
import { getBCAPIndexfromApplication } from "./navigation";

export function filterApplicationsByBCap(applications: Application[], selectedBCaps?: string): Application[] {
    if (!selectedBCaps) return []

    let matchingApps: Application[] = []
    applications.forEach((n) => {
        const bcaps = n.BCAP3

        // Simple string comparison to test, can be improved by using actual numbers and possibly regex
        if (bcaps.match(' ' + selectedBCaps)) {
            matchingApps.push(n)
        }
    })

    return matchingApps;
}