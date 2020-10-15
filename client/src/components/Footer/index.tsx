import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function simpleHOC(WrappedComponent: any) {
    // And return a new anonymous component
    return class ASD extends React.Component {
        render() {
            return <WrappedComponent {...this.props} />;
        }
    };
}

export const Footer = () => {
    return (
        <div>
            <Container>
                <Row>
                    <Col className="text-center">Copyright</Col>
                </Row>
            </Container>
        </div>
    );
};

export default simpleHOC(Footer);
