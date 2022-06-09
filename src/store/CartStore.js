import { makeAutoObservable } from "mobx";

export default class CartStore {
	constructor() {
		let cartLS = localStorage.getItem("cart") || "[]";
		cartLS = JSON.parse(cartLS);
		this._items = cartLS.reduce((prev, curr) => prev + curr.count, 0);
		this._summary = cartLS.reduce((prev, curr) => prev + curr.count * curr.price, 0);
		makeAutoObservable(this);
	}

	recalculate() {
		let cartLS = localStorage.getItem("cart") || "[]";
		cartLS = JSON.parse(cartLS);
		this._items = cartLS.reduce((prev, curr) => prev + curr.count, 0);
		this._summary = cartLS.reduce((prev, curr) => prev + curr.count * curr.price, 0);
	}

	get items() {
		return this._items;
	}
	setItems(items) {
		this._items = items;
	}

	get summary() {
		return this._summary;
	}
	setSummary(summary) {
		this._summary = summary;
	}
}
