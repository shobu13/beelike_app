export class User {
    private _id: number;
    private _amis: User[];
    private _last_login: Date;
    private _is_superuser: boolean;
    private _username: string;
    private _password: string;
    private _first_name: string;
    private _last_name: string;
    private _email: string;
    private _is_staff: boolean;
    private _is_active: boolean;
    private _date_joined: Date;
    private _city: string;
    private _postal_code: string;
    private _phone_number: string;
    private _birth_date: Date;
    private _photo: string;
    private _act_prop_tous;
    private _act_part_visible;
    private _act_part_tous;
    private _est_verif;
    private _stay_connected;

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get amis(): User[] {
        return this._amis;
    }

    set amis(value: User[]) {
        this._amis = value;
    }

    get last_login(): Date {
        return this._last_login;
    }

    set last_login(value: Date) {
        this._last_login = value;
    }

    get is_superuser(): boolean {
        return this._is_superuser;
    }

    set is_superuser(value: boolean) {
        this._is_superuser = value;
    }

    get username(): string {
        return this._username;
    }

    set username(value: string) {
        this._username = value;
    }

    get password(): string {
        return this._password;
    }

    set password(value: string) {
        this._password = value;
    }

    get first_name(): string {
        return this._first_name;
    }

    set first_name(value: string) {
        this._first_name = value;
    }

    get last_name(): string {
        return this._last_name;
    }

    set last_name(value: string) {
        this._last_name = value;
    }

    get email(): string {
        return this._email;
    }

    set email(value: string) {
        this._email = value;
    }

    get is_staff(): boolean {
        return this._is_staff;
    }

    set is_staff(value: boolean) {
        this._is_staff = value;
    }

    get is_active(): boolean {
        return this._is_active;
    }

    set is_active(value: boolean) {
        this._is_active = value;
    }

    get date_joined(): Date {
        return this._date_joined;
    }

    set date_joined(value: Date) {
        this._date_joined = value;
    }

    get city(): string {
        return this._city;
    }

    set city(value: string) {
        this._city = value;
    }

    get postal_code(): string {
        return this._postal_code;
    }

    set postal_code(value: string) {
        this._postal_code = value;
    }

    get phone_number(): string {
        return this._phone_number;
    }

    set phone_number(value: string) {
        this._phone_number = value;
    }

    get birth_date(): Date {
        return this._birth_date;
    }

    set birth_date(value: Date) {
        this._birth_date = value;
    }

    get photo(): string {
        return this._photo;
    }

    set photo(value: string) {
        this._photo = value;
    }

    get act_prop_tous() {
        return this._act_prop_tous;
    }

    set act_prop_tous(value) {
        this._act_prop_tous = value;
    }

    get act_part_visible() {
        return this._act_part_visible;
    }

    set act_part_visible(value) {
        this._act_part_visible = value;
    }

    get act_part_tous() {
        return this._act_part_tous;
    }

    set act_part_tous(value) {
        this._act_part_tous = value;
    }

    get est_verif() {
        return this._est_verif;
    }

    set est_verif(value) {
        this._est_verif = value;
    }

    get stay_connected() {
        return this._stay_connected;
    }

    set stay_connected(value) {
        this._stay_connected = value;
    }


    constructor(input: any) {
        Object.assign(this, input);
    }
}
