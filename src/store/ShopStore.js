import { makeAutoObservable } from "mobx";

export default class ShopStore {
    constructor() {
        // this._types = [];
        // this._brands = [];
        this._products = [];

        this._filterType = {};
        this._filterBrand = {};
        this._filterText = null;
        this._page = 1;
        this._totalCount = 0;
        this._limit = 6;
        makeAutoObservable(this);
    }

    // get types() {
    // 	return this._types;
    // }
    // setTypes(types) {
    // 	this._types = types;
    // }

    // get brands() {
    // 	return this._brands;
    // }
    // setBrands(brands) {
    // 	this._brands = brands;
    // }

    get products() {
        return this._products;
    }
    setProducts(products) {
        this._products = products;
    }

    get filterType() {
        return this._filterType;
    }
    setFilterType(type) {
        this.setPage(1);
        this._filterType = type;
    }

    get filterBrand() {
        return this._filterBrand;
    }
    setFilterBrand(brand) {
        this._filterBrand = brand;
    }

    get filterText() {
        return this._filterText;
    }
    setFilterText(filterText) {
        this._filterText = filterText;
    }

    get page() {
        return this._page;
    }
    setPage(page) {
        this._page = page;
    }

    get limit() {
        return this._limit;
    }
    setLimit(limit) {
        this._totalCount = limit;
    }

    get totalCount() {
        return this._totalCount;
    }
    setTotalCount(count) {
        this._totalCount = count;
    }
}
