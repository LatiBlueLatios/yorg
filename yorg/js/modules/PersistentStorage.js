class PersistentStorage {
    getString(key, defaultValue = null) {
        const value = localStorage.getItem(key);
        return value !== null ? value : defaultValue;
    }

    setString(key, value) {
        localStorage.setItem(key, value);
    }

    getNumber(key, defaultValue = 0) {
        const value = this.getString(key, defaultValue.toString());
        return parseInt(value, 10);
    }

    setNumber(key, value) {
        this.setString(key, value.toString());
    }

    setMaximumStat(key, value, defaultValue = 0) {
        const currentValue = this.getNumber(key, defaultValue);
        this.setNumber(key, Math.max(currentValue, value));
    }

    getBool(key, defaultValue = false) {
        const value = this.getString(key, defaultValue ? "1" : "0");
        return value === "1";
    }

    setBool(key, value) {
        this.setString(key, value ? "1" : "0");
    }

    remove(key) {
        localStorage.removeItem(key);
    }
}

export default PersistentStorage;