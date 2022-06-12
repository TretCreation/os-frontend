import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "..";

const Search = observer(() => {
	const { shop } = useContext(Context);

	return (
		<div className="form-group">
			<input
				type="search"
				className="form-control"
				placeholder="Search"
				aria-label="Search"
				onChange={(e) => shop.setFilterText(e.target.value)}
				style={{ width: "20rem" }}
			/>
		</div>
	);
});

export default Search;
