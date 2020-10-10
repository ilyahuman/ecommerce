import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

interface FormContainerProps {
    children: React.ReactNode;
}

export const FormContainer: React.FC<FormContainerProps> = ({
    children,
}: FormContainerProps) => {
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
