import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
import React, { useContext, useMemo, useState } from "react";
import { Card, Row } from "react-bootstrap";
import { Context } from "..";
import { fetchBrands } from "../http/productAPI";

const BrandsBar = observer(() => {
    const { shop } = useContext(Context);
    const [brands, setBrands] = useState([]);

    useMemo(() => {
        fetchBrands().then((data) => setBrands(data));
    }, []);

    const handleFilterBrands = (brand) => {
        const idx = shop.filterBrands.findIndex((item) => item.id === brand.id);
        if (idx !== -1) {
            const fb = toJS(shop.filterBrands).filter(
                (item) => item.id !== brand.id
            );
            shop.setFilterBrands(fb);
        } else {
            const fb = toJS(shop.filterBrands);
            fb.push(brand);
            shop.setFilterBrands(fb);
        }
    };

    const getButtonBorder = (brand) =>
        shop.filterBrands.findIndex((item) => item.id === brand.id) !== -1
            ? "danger"
            : "light";

    return (
        <Row className="d-flex brand-container">
            {brands.map((brand) => (
                <Card
                    key={brand.id}
                    className="p-3 brand-container-item"
                    onClick={() => handleFilterBrands(brand)}
                    border={getButtonBorder(brand)}
                    style={{ cursor: "pointer", width: "10rem" }}
                >
                    {brand.name}
                </Card>
            ))}
        </Row>
    );
});

export default BrandsBar;
