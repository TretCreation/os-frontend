import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "..";

const Search = observer(() => {
    const { shop } = useContext(Context);

    return (
        <div className="form-group d-flex">
            <input
                data-hover="input"
                type="search"
                className="form-control me-2"
                placeholder="Пошук"
                aria-label="Search"
                onChange={(e) => shop.setFilterText(e.target.value)}
                style={{
                    width: "20rem",
                    outline: "0",
                    boxShadow: "none",
                    borderColor: "#313132",
                }}
            />
        </div>
    );
});

export default Search;
