/**
 * Returns whether the given object is empty ({}).
 *
 * @param obj
 */
export function isObjectEmpty(obj: object) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
}

export function isObjectEmptyByValues(obj: object): boolean {
    if (isObjectEmpty(obj)) return false;
    return (
        Object.values(obj).filter((x) => x !== '' && x !== undefined).length ===
        0
    );
}

export function isObjectFull(obj: object): boolean {
    if (isObjectEmpty(obj)) return false;
    const objLength = Object.keys(obj).length;

    return (
        Object.values(obj).filter(
            (x) => x !== '' && x !== undefined && x !== null
        ).length === objLength
    );
}
