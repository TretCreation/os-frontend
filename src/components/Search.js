import React, { useContext, useState } from 'react';
import { Context } from '..';

const Search = () => {
    const [searchTerm, setSearchTerm] = useState("")

    return (
        <div>
            <form class="d-flex">
            <input
                type="search"
                class="form-control me-2"
                placeholder="Search"
                aria-label="Search"
                // value={}
                // onChange={}
            />
            {/* <i class="bi bi-search"></i> */}
            <button class="btn btn-danger" type="submit">Search</button>
                
            </form>
        </div>
    );
};

export default Search;