import { makeAutoObservable } from "mobx";

export default class ShopStore {
	constructor() {
		this._products = [];
		this._filterType = {};
		this._filterBrands = [];
		this._filterText = null;
		this._page = 1;
		this._totalCount = 0;
		this._limit = 6;
		makeAutoObservable(this);
	}

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

	get filterBrands() {
		return this._filterBrands;
	}
	setFilterBrands(brands) {
		this.setPage(1);
		this._filterBrands = brands;
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
