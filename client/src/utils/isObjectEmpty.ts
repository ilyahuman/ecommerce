/**
 * Returns whether the given object is empty ({}).
 *
 * @param obj
 */
export function isObjectEmpty(obj: object) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
}
