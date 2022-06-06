import { makeAutoObservable } from "mobx";

export default class ProductStore {
	constructor() {
		this._types = [];
		this._brands = [];
		this._products = [];

		this._selectedType = {};
		this._selectedBrand = {};
		this._filter = "";
		this._page = 1;
		this._totalCount = 0;
		this._limit = 8;
		makeAutoObservable(this);
	}

	get types() {
		return this._types;
	}
	setTypes(types) {
		this._types = types;
	}

	get brands() {
		return this._brands;
	}
	setBrands(brands) {
		this._brands = brands;
	}

	get products() {
		return this._products;
	}
	setProducts(products) {
		this._products = products;
	}

	get selectedType() {
		return this._selectedType;
	}
	setSelectedType(type) {
		this.setPage(1);
		this._selectedType = type;
	}

	get selectedBrand() {
		return this._selectedBrand;
	}
	setSelectedBrand(brand) {
		this._selectedBrand = brand;
	}

	get filter() {
		return this._filter;
	}
	setFilter(filter) {
		this._filter = filter;
	}

	get page() {
		return this._page;
	}
	setPage(page) {
		this._page = page;
	}

	get totalCount() {
		return this._totalCount;
	}
	setTotalCount(count) {
		this._totalCount = count;
	}

	get limit() {
		return this._limit;
	}
	setLimit(limit) {
		this._totalCount = limit;
	}
}
