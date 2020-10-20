import React from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

export const GoBack = () => {
    const history = useHistory();
    return (
        <>
            <Button
                size="sm"
                className="my-2"
                onClick={() => history.goBack()}
                variant="outline-primary"
            >
                Go Back
            </Button>{' '}
        </>
    );
};
