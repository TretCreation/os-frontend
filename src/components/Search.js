import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "..";

const Search = observer(() => {
    const { shop } = useContext(Context);

    return (
        <div
            className="form-group d-flex"
            style={{
                width: "100%",
            }}
        >
            <input
                data-hover="input"
                type="search"
                className="form-control form-search-item"
                placeholder="Пошук"
                aria-label="Search"
                onChange={(e) => shop.setFilterText(e.target.value)}
            />
        </div>
    );
});

export default Search;
