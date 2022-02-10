export function escapeRegex(stringToEscape: string): string {
    return stringToEscape.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}