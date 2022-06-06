import { makeAutoObservable } from "mobx";

export default class UserStore {
	constructor() {
		this._isAuth = false;
		this._id = {};
		this._role = "";
		this._email = "";
		makeAutoObservable(this);
	}

	get isAuth() {
		return this._isAuth;
	}
	setIsAuth(bool) {
		this._isAuth = bool;
	}

	get role() {
		return this._role;
	}
	setRole(role) {
		this._role = role;
	}

	get id() {
		return this._id;
	}
	setId(id) {
		this._id = id;
	}

	get email() {
		return this._email;
	}
	setEmail(email) {
		this._email = email;
	}
}
