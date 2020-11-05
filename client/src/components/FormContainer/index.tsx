import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { StoreRootState } from '../../store';

import { userActions } from '../../store/user';

interface FormContainerProps {
    children: React.ReactNode;
}

export const FormContainer: React.FC<FormContainerProps> = ({
    children,
}: FormContainerProps) => {
    const dispatch = useDispatch();
    const { error } = useSelector((state: StoreRootState) => state.user);

    useEffect(() => {
        if (error) {
            setTimeout(() => {
                dispatch(userActions.clearError());
            }, 5000);
        }
    }, [error]);

    return (
        <Container>
            <Row>
                <Col xs={12} md={6}>
                    {children}
                </Col>
            </Row>
        </Container>
    );
};
