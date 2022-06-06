import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "..";

const Search = observer(() => {
	const { product } = useContext(Context);

	return (
		<div>
			<form className="d-flex">
				<input
					type="search"
					className="form-control me-2"
					placeholder="Search"
					aria-label="Search"
					onChange={(e) => product.setFilter(e.target.value)}
				/>
			</form>
		</div>
	);
});

export default Search;
