/**
 * Persistence layer with expiration based on localStorage.
 */

class NamespacedLocalStorage {
    protected key: string;
    protected localStorage: Storage;

    constructor(localStorage: Storage, key: string) {
        this.localStorage = localStorage;
        this.key = key;
    }

    _makeKey(key: string) {
        return `${this.key}__${key}`;
    }

    getItem(name: string) {
        return this.localStorage.getItem(this._makeKey(name));
    }

    setItem(name: string, value: any) {
        return this.localStorage.setItem(this._makeKey(name), value);
    }

    removeItem(name: string) {
        return this.localStorage.removeItem(this._makeKey(name));
    }
}

export class BrowserPersistence {
    static KEY = 'ecommerce';
    protected localStorage: Storage = window.localStorage;
    protected storage: NamespacedLocalStorage;

    static storage(): BrowserPersistence {
        return new BrowserPersistence(window.localStorage);
    }

    constructor(localStorage: Storage) {
        this.storage = new NamespacedLocalStorage(
            localStorage,
            BrowserPersistence.KEY
        );
    }

    getItem(name: string) {
        const item = this.storage.getItem(name);

        if (!item) {
            return undefined;
        }

        const { value } = JSON.parse(item);

        return JSON.parse(value);
    }

    setItem(name: string, value: any) {
        const timeStored = Date.now();

        this.storage.setItem(
            name,
            JSON.stringify({
                value: JSON.stringify(value),
                timeStored,
            })
        );

        return this;
    }

    removeItem(name: string) {
        this.storage.removeItem(name);

        return this;
    }
}

export const storage = BrowserPersistence.storage();
