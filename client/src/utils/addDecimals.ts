export const addDecimals = (num: number): number => {
    return Number(((num * 100) / 100).toFixed(2));
};
