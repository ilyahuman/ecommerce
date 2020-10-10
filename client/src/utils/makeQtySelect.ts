export function makeQtySelect(qty: number): number[] {
    const qtyArray = [];

    for (let i = 1; i <= qty; i++) {
        qtyArray.push(i);
    }

    return [...qtyArray];
}
