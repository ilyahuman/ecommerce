import React from 'react';
import { Alert } from 'react-bootstrap';

interface MessageProps {
    variant?: string;
    children?: React.ReactNode;
}

export const Message: React.FC<MessageProps> = ({
    variant = 'info',
    children,
}: MessageProps): JSX.Element => {
    return <Alert variant={variant}>{children}</Alert>;
};

Message.defaultProps = {
    variant: 'info',
};
