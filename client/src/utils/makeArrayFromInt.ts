export function makeArrayFromInt(int: number): number[] {
    return new Array(int).fill('').map((x: number, z: number) => z);
}
