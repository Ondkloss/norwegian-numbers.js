/**
 * Make and verify official Norwegian numbers like:
 * KID-nummer, organisasjonsnummer, fødselsnummer, kontonummer
 * @module norwegian-numbers
 */

const INVALID_CONTROL_DIGIT = 'Rejected due to invalid control digit.';

/**
 * Makes a KID-number in either MOD10 or MOD11.
 * Valid input lengths are from 1 to 24 characters, inclusive.
 * The output length will be one character longer.
 * @param {string} value The value to make the KID-number based on
 * @param {string} mode MOD10 (default) or MOD11
 * @returns {string} The resulting KID-number
 * @throws Error If invalid length, non-integer or invalid mode
 */
export function makeKidNumber(value: string, mode: string = 'MOD10') {
    validateLength(value, 1, 24);
    validateInteger(value);
    if (mode.toUpperCase() === 'MOD10') {
        const controlDigit = makeMod10ControlDigit(value);
        return value + String(controlDigit);
    }
    else if (mode.toUpperCase() === 'MOD11') {
        const controlDigit = makeMod11ControlDigit(value);
        return value + String(controlDigit);
    }
    else {
        throw Error(`Invalid mode "${mode}".`);
    }
}

/**
 * Verifies a KID-number in either MOD10 or MOD11.
 * @param {string} value The KID-number value to verify
 * @param {string} mode MOD10 (default) or MOD11
 * @returns {boolean} If the value is a valid KID-number or not
 */
export function verifyKidNumber(value: string, mode: string = 'MOD10') {
    try {
        return value === makeKidNumber(value.substring(0, value.length - 1), mode);
    }
    catch (err) {
        return false;
    }
}

/**
 * Makes a birth number.
 * Valid input length is 9 characters.
 * The output length will be 11 character.
 * @param {string} value The value to make the birth number based on
 * @returns {string} The resulting birth number
 * @throws Error If invalid length, non-integer or illegal control digits
 */
export function makeBirthNumber(value: string) {
    validateLength(value, 9, 9);
    validateInteger(value);
    const firstControlDigit = makeMod11ControlDigit(value, [2, 5, 4, 9, 8, 1, 6, 7, 3]);
    const secondControlDigit = makeMod11ControlDigit(value + String(firstControlDigit));
    validateInteger(String(firstControlDigit), INVALID_CONTROL_DIGIT);
    validateInteger(String(secondControlDigit), INVALID_CONTROL_DIGIT);
    return value + String(firstControlDigit) + String(secondControlDigit)
}

/**
 * Verifies a birth number.
 * @param {string} value The birth number value to verify
 * @returns {boolean} If the value is a valid birth number or not
 */
export function verifyBirthNumber(value: string) {
    try {
        return value === makeBirthNumber(value.substring(0, value.length - 2));
    }
    catch (err) {
        return false;
    }
}

/**
 * Makes an account number.
 * Valid input length is 10 characters.
 * The output length will be 11 character.
 * @param {string} value The value to make the account number based on
 * @returns {string} The resulting account number
 * @throws Error If invalid length, non-integer or illegal control digits
 */
export function makeAccountNumber(value: string) {
    validateLength(value, 10, 10);
    validateInteger(value);
    const controlDigit = makeMod11ControlDigit(value);
    validateInteger(String(controlDigit), INVALID_CONTROL_DIGIT);
    return value + String(controlDigit);
}

/**
 * Verifies an account number.
 * @param {string} value The account number value to verify
 * @returns {boolean} If the value is a valid account number or not
 */
export function verifyAccountNumber(value: string) {
    try {
        return value === makeAccountNumber(value.substring(0, value.length - 1));
    }
    catch (err) {
        return false;
    }
}

/**
 * Makes an organisation number.
 * Valid input length is 8 characters.
 * The output length will be 9 character.
 * @param {string} value The value to make the organisation number based on
 * @returns {string} The resulting organisation number
 * @throws Error If invalid length, non-integer or illegal control digits
 */
export function makeOrganisationNumber(value: string) {
    validateLength(value, 8, 8);
    validateInteger(value);
    const controlDigit = makeMod11ControlDigit(value);
    validateInteger(String(controlDigit), INVALID_CONTROL_DIGIT);
    return value + String(controlDigit);
}

/**
 * Verifies an organisation number.
 * @param {string} value The organisation number value to verify
 * @returns {boolean} If the value is a valid organisation number or not
 */
export function verifyOrganisationNumber(value: string) {
    try {
        return value === makeOrganisationNumber(value.substring(0, value.length - 1));
    }
    catch (err) {
        return false;
    }
}
function makeMod10ControlDigit(value: string, multiplicands: Array<number> = [2, 1]) {
    const control = 10 - (multiplyDigitsByWeight(value, multiplicands, sumOfDigits) % 10);

    if (control == 10) {
        return 0;
    }

    return control;
}

function makeMod11ControlDigit(value: string, multiplicands: Array<number> = [2, 3, 4, 5, 6, 7]) {
    const control = 11 - (multiplyDigitsByWeight(value, multiplicands, doNothing) % 11);

    if (control == 11) {
        return 0;
    }
    if (control == 10) {
        return '-';
    }
    return control;
}

// While this could be made more dense, maybe this has some hope of being readable
function multiplyDigitsByWeight(value: string, multiplicands: Array<number>, operation: (n: number) => number) {
    const number = parseInt(value);
    const digits = String(number).split('');
    let index = 0;
    let total = 0;

    for (let i = digits.length - 1; i >= 0; i--) {
        const digit = digits[i];
        const multiplicand = multiplicands[index % multiplicands.length];
        const result = parseInt(digit) * multiplicand;
        total += operation(result);
        index += 1;
    }

    return total;
}

// https://stackoverflow.com/a/10834843
function validateInteger(value: string, errorMessage: string = `Value "${value}" was not an integer.`) {
    const result = /^[0-9]+$/.test(value);

    if (!result) {
        throw new Error(errorMessage);
    }
}

function validateLength(value: string, min: number, max: number) {
    if (value.length < min || value.length > max) {
        throw new Error(`Invalid value length for "${value}". Must be from ${min} to ${max} characters, inclusive.`);
    }
}

// https://stackoverflow.com/a/14940026
function sumOfDigits(n: number) {
    let r = 0;
    while (n > 0) {
        r += n % 10;
        n = Math.floor(n / 10);
    }
    return r;
}

function doNothing(n: number) {
    return n;
}
