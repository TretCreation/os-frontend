import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "..";

const Search = observer(() => {
    const { product } = useContext(Context);

    return (
        <div className="form-group">
            {/* <form className="d-flex"> */}
            <input
                type="search"
                className="form-control"
                placeholder="Search"
                aria-label="Search"
                onChange={(e) => product.setFilter(e.target.value)}
                style={{ width: "20rem" }}
            />
            {/* </form> */}
        </div>
    );
});

export default Search;
