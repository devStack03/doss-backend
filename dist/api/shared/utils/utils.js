"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomCode = exports.validateEmail = void 0;
const crypto = require("crypto");
function validateEmail(email) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return true;
    }
    return false;
}
exports.validateEmail = validateEmail;
function randomCode(howMany, chars) {
    chars = chars
        || "0123456789";
    const rnd = crypto.randomBytes(howMany), value = new Array(howMany), len = chars.length;
    for (let i = 0; i < howMany; i++) {
        value[i] = chars[rnd[i] % len];
    }
    return value.join('');
}
exports.randomCode = randomCode;
;
//# sourceMappingURL=utils.js.map