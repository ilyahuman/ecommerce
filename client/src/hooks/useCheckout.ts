import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { AppRoutes } from '../config';
import { StoreRootState } from '../store';

export const useCheckout = () => {
    const history = useHistory();
    const { cartItems } = useSelector((state: StoreRootState) => state.cart);

    if (cartItems.length === 0) {
        history.push(AppRoutes.HOME);
    }
};
