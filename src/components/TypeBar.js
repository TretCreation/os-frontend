import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { ListGroup } from "react-bootstrap";
import { Context } from "..";

const TypeBar = observer(() => {
    const { product } = useContext(Context);
    return (
        <div>
            <ListGroup horizontal>
                {product.types.map((type) => (
                    <ListGroup.Item
                        action
                        variant="light"
                        style={{ cursor: "pointer" }}
                        active={type.id === product.selectedType.id}
                        onClick={() =>
                            product.setSelectedType(
                                product.selectedType.id === type.id ? {} : type
                            )
                        }
                        key={type.id}
                    >
                        {type.name}
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
});

export default TypeBar;
