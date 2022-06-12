import { observer } from "mobx-react-lite";
import React, { useContext, useMemo, useState } from "react";
import { ListGroup } from "react-bootstrap";
import { Context } from "..";
import { fetchTypes } from "../http/productAPI";

const TypesBar = observer(() => {
	const { shop } = useContext(Context);
	const [types, setTypes] = useState([]);

	useMemo(() => {
		fetchTypes().then((data) => setTypes(data));
	}, []);

	return (
		<div>
			<ListGroup horizontal>
				{types.map((type) => (
					<ListGroup.Item
						action
						variant="light"
						style={{ cursor: "pointer" }}
						active={shop.filterType.id === type.id}
						onClick={() => shop.setFilterType(shop.filterType.id === type.id ? {} : type)}
						key={type.id}
					>
						{type.name}
					</ListGroup.Item>
				))}
			</ListGroup>
		</div>
	);
});

export default TypesBar;
