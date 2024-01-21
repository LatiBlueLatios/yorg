import { randomInt } from "../global/functions.js";

const PREFIX = "x.9" + randomInt(1e4, 9e4),
    MULTIPLIER_BASE = 2,
    ADD_BASE = 68234,
    ATTRIBUTE_NAMES = ["\0"];

class CSVar {
    constructor(value) {
        this.checksum = "";
        this.setValue(value);
    }

    getValue() {
        return this.getChecksum() !== this.checksum && this.setValue(0), this.decode(this[ATTRIBUTE_NAMES[0]], 0);
    }

    encode(value, index) {
        return `${PREFIX}${(value * (MULTIPLIER_BASE + index) + ADD_BASE).toString()}`;
    }

    decode(encodedValue, index) {
        if (!encodedValue.startsWith(PREFIX)) {
            console.error("Bad value:", encodedValue);
            return 0;
        }

        const rawValue = encodedValue.substr(PREFIX.length);

        try {
            return Math.floor((parseInt(rawValue, 10) - ADD_BASE) / (MULTIPLIER_BASE + index));
        } catch (error) {
            console.error("Failed to parse int:", encodedValue, "raw:", rawValue);
            return 0;
        }
    }

    getChecksum() {
        return ATTRIBUTE_NAMES.map((attribute) => this[attribute]).join(",");
    }

    setValue(value) {
        const integerValue = Math.floor(Number(value));

        ATTRIBUTE_NAMES.forEach((attribute, index) => {
            this[attribute] = this.encode(integerValue, index);
        });

        this.checksum = this.getChecksum();
    }
}

export default CSVar;
