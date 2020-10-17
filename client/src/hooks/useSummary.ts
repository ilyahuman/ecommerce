import { useEffect, useState } from 'react';

import { CartProduct } from '../types';

import { addDecimals } from '../utils/addDecimals';

export const useSummary = (cart: CartProduct[]) => {
    // add consts
    const [itemsPrice, setItemsPrice] = useState<number>();
    const [shippingPrice, setShippingPrice] = useState<number>();
    const [taxPrice, setTaxPrice] = useState<number>();
    const [totalPrice, setTotalPrice] = useState<number>();

    const itemsPriceCalc = (cart: CartProduct[]): number => {
        return Number(
            cart
                .reduce(
                    (acc: number, current: CartProduct) =>
                        acc + current.qty * current.price,
                    0
                )
                .toFixed(2)
        );
    };

    const shippingPriceCalc = (itemsPrice: number): number =>
        itemsPrice > 100 ? 0 : 100;

    const taxPriceCalc = (itemsPrice: number): number => {
        return addDecimals(Number((0.15 * itemsPrice).toFixed(2)));
    };

    const totalPriceCalc = (
        itemsPrice: number,
        shippingPrice: number,
        taxPrice: number
    ) => {
        return Number((itemsPrice + shippingPrice + taxPrice).toFixed(2));
    };

    useEffect(() => {
        setItemsPrice(itemsPriceCalc(cart));
    }, [cart]);

    useEffect(() => {
        setShippingPrice(shippingPriceCalc(itemsPrice as number));
        setTaxPrice(taxPriceCalc(itemsPrice as number));
    }, [itemsPrice]);

    useEffect(() => {
        setTotalPrice(
            totalPriceCalc(
                itemsPrice as number,
                shippingPrice as number,
                taxPrice as number
            )
        );
    }, [itemsPrice, shippingPrice, taxPrice]);

    return [itemsPrice, shippingPrice, taxPrice, totalPrice];
};
