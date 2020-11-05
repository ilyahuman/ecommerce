import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

export const SearchBox = () => {
    const [keyword, setKeyword] = useState('');
    const history = useHistory();

    const onSearchHandler = (event: React.FormEvent<HTMLElement>) => {
        event.preventDefault();

        if (keyword.trim()) {
            history.push(`/search/${keyword}`);
            setKeyword('');
        }
    };

    return (
        <div>
            <Form inline onSubmit={onSearchHandler}>
                <Form.Group>
                    <Form.Control
                        type="text"
                        name="search"
                        value={keyword}
                        placeholder="Search Products..."
                        className="mr-sm-2 ml-sm-5"
                        onChange={(event) => setKeyword(event.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Button variant="outline-success" type="submit" className="p-2">
                    Search
                </Button>
            </Form>
        </div>
    );
};
