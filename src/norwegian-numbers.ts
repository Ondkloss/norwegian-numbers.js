function makeKidNumber(value: string, mode: string = 'MOD10') {
    validateLength(value, 1, 24);
    validateInteger(value);
    if (mode.toUpperCase() === 'MOD10') {
        const controlDigit = makeMod10ControlDigit(value, [2, 1]);
        return value + String(controlDigit);
    }
    else if (mode.toUpperCase() === 'MOD11') {
        const controlDigit = makeMod11ControlDigit(value, [2, 3, 4, 5, 6, 7]);
        return value + String(controlDigit);
    }
}

function verifyKidNumber(value: string, mode: string = 'MOD10') {
    try {
        return value === makeKidNumber(value.substring(0, value.length - 1), mode);
    }
    catch (err) {
        return false;
    }
}

function makeBirthNumber(value: string) {
    validateLength(value, 9, 9);
    validateInteger(value);
    const firstControlDigit = makeMod11ControlDigit(value, [3, 7, 6, 1, 8, 9, 4, 5, 2]);
    const secondControlDigit = makeMod11ControlDigit(value + String(firstControlDigit), [5, 4, 3, 2, 7, 6, 5, 4, 3, 2]);
    validateInteger(String(firstControlDigit));
    validateInteger(String(secondControlDigit));
    return value + String(firstControlDigit) + String(secondControlDigit)
}

function verifyBirthNumber(value: string) {
    try {
        return value === makeBirthNumber(value.substring(0, value.length - 2));
    }
    catch (err) {
        return false;
    }
}

function makeAccountNumber(value: string) {
    validateLength(value, 10, 10);
    validateInteger(value);
    const controlDigit = makeMod11ControlDigit(value, [5, 4, 3, 2, 7, 6, 5, 4, 3, 2]);
    validateInteger(String(controlDigit));
    return value + String(controlDigit);
}

function verifyAccountNumber(value: string) {
    try {
        return value === makeAccountNumber(value.substring(0, value.length - 1));
    }
    catch (err) {
        return false;
    }
}

function makeOrganisationNumber(value: string) {
    validateLength(value, 8, 8);
    validateInteger(value);
    const controlDigit = makeMod11ControlDigit(value, [3, 2, 7, 6, 5, 4, 3, 2]);
    validateInteger(String(controlDigit));
    return value + String(controlDigit);
}

function verifyOrganisationNumber(value: string) {
    try {
        return value === makeOrganisationNumber(value.substring(0, value.length - 1));
    }
    catch (err) {
        return false;
    }
}
function makeMod10ControlDigit(value: string, multiplicands: Array<number>) {
    const control = 10 - (multiplyDigitsByWeight(value, multiplicands, sumOfDigits) % 10);

    if (control == 10) {
        return 0;
    }

    return control;
}

function makeMod11ControlDigit(value: string, multiplicands: Array<number>) {
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
function validateInteger(value: string) {
    const result = /^[0-9]+$/.test(value);

    if (!result) {
        throw new Error(`Value "${value}" was not an integer.`);
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

export default {
    makeKidNumber,
    verifyKidNumber,
    makeBirthNumber,
    verifyBirthNumber,
    makeAccountNumber,
    verifyAccountNumber,
    makeOrganisationNumber,
    verifyOrganisationNumber
};