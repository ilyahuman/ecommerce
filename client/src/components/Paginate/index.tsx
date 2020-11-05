import React from 'react';
import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { makeArrayFromInt } from '../../utils/makeArrayFromInt';

interface PaginateProps extends RouteComponentProps {
    pages: number;
    activePage: number;
}

export const Paginate: React.FC<PaginateProps> = ({
    pages,
    activePage = 1,
    history,
    location,
    match,
}: PaginateProps): JSX.Element => {
    console.log(history);
    console.log(location);
    console.log(match);

    return (
        <>
            {pages > 1 && (
                <Pagination>
                    {makeArrayFromInt(pages).map((page: number) => {
                        return (
                            <LinkContainer to={`/page/${page + 1}`}>
                                <Pagination.Item
                                    key={page + 1}
                                    active={page + 1 === activePage}
                                >
                                    {page + 1}
                                </Pagination.Item>
                            </LinkContainer>
                        );
                    })}
                </Pagination>
            )}
        </>
    );
};
