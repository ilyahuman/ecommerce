import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StoreRootState } from '../store';
import { asyncSignIn } from '../store/user';
import { User } from '../types';

export const useAuth = () => {
    const dispatch = useDispatch();
    const { isSignedIn: isSignedInState, currentUser } = useSelector(
        (state: StoreRootState) => state.user
    );

    const [user, setUser] = useState<User>(currentUser);
    const [isSignedIn, setIsSignedIn] = useState(isSignedInState);

    useEffect(() => {
        setUser(currentUser);
        setIsSignedIn(isSignedInState);
    }, [isSignedInState, currentUser]);

    const signIn = (email: string, password: string) => {
        dispatch(asyncSignIn({ email, password }));
    };

    const signout = () => {};

    return {
        user,
        isSignedIn,
        signIn,
        signout,
    };
};
