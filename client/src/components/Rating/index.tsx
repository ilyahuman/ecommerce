import React, { CSSProperties, StyleHTMLAttributes } from 'react';

interface RatingProps {
    value: number;
    text?: string;
    color?: string;
    reviewsStyle?: CSSProperties;
}

export const Rating: React.FC<RatingProps> = ({
    value,
    text,
    color,
    reviewsStyle,
}: RatingProps): JSX.Element => {
    return (
        <div className="rating">
            <span>
                <i
                    style={{ color }}
                    className={
                        value >= 1
                            ? 'fas fa-star'
                            : value >= 0.5
                            ? 'fas fa-star-half-alt'
                            : 'far fa-star'
                    }
                ></i>
            </span>
            <span>
                <i
                    style={{ color }}
                    className={
                        value >= 2
                            ? 'fas fa-star'
                            : value >= 1.5
                            ? 'fas fa-star-half-alt'
                            : 'far fa-star'
                    }
                ></i>
            </span>
            <span>
                <i
                    style={{ color }}
                    className={
                        value >= 3
                            ? 'fas fa-star'
                            : value >= 2.5
                            ? 'fas fa-star-half-alt'
                            : 'far fa-star'
                    }
                ></i>
            </span>
            <span>
                <i
                    style={{ color }}
                    className={
                        value >= 4
                            ? 'fas fa-star'
                            : value >= 3.5
                            ? 'fas fa-star-half-alt'
                            : 'far fa-star'
                    }
                ></i>
            </span>
            <span>
                <i
                    style={{ color }}
                    className={
                        value >= 5
                            ? 'fas fa-star'
                            : value >= 4.5
                            ? 'fas fa-star-half-alt'
                            : 'far fa-star'
                    }
                ></i>
            </span>
            <span style={reviewsStyle}>{text}</span>
        </div>
    );
};

Rating.defaultProps = {
    color: '#ffcf33',
    reviewsStyle: {
        marginLeft: '5px',
    },
};
