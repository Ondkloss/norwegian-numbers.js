# Norwegian numbers

![npm](https://img.shields.io/npm/v/norwegian-numbers.svg) [![Build Status](https://travis-ci.com/Ondkloss/norwegian-numbers.js.svg?branch=master)](https://travis-ci.com/Ondkloss/norwegian-numbers.js)

Make and verify official Norwegian numbers:

* KID-nummer: `makeKidNumber(value, mode = 'MOD10')` and `verifyKidNumber(value, mode = 'MOD10')`
* Organisasjonsnummer: `makeOrganisationNumber(value)` and `verifyOrganisationNumber(value)`
* Fødselsnummer: `makeBirthNumber(value)` and `verifyBirthNumber(value)`
* Kontonummer: `makeAccountNumber(value)` and `verifyAccountNumber(value)`

This currently only concerns itself with the control digits.

## Installation

To install from NPM as a package in your environment:

    npm install norwegian-numbers

## Code usage from installation

Example code usages after installation:

    > const nn = require('norwegian-numbers');
    undefined
    > nn
    { makeKidNumber: [Function: makeKidNumber],
    verifyKidNumber: [Function: verifyKidNumber],
    makeBirthNumber: [Function: makeBirthNumber],
    verifyBirthNumber: [Function: verifyBirthNumber],
    makeAccountNumber: [Function: makeAccountNumber],
    verifyAccountNumber: [Function: verifyAccountNumber],
    makeOrganisationNumber: [Function: makeOrganisationNumber],
    verifyOrganisationNumber: [Function: verifyOrganisationNumber] }
    > nn.makeKidNumber('1234');
    '12344'
    > nn.makeKidNumber('1234', 'MOD11');
    '12343'
    > nn.makeBirthNumber('311299567');
    '31129956715'
    > nn.makeAccountNumber('1234567890');
    '12345678903'
    > nn.makeOrganisationNumber('12345678');
    '123456785'

## Testing from source

To run the tests:

    mocha

Or:

    npm test

## Distribution

The distribution was created by the following commands:

    npm publish --access public

## Changes

### 1.0.6

* Added JSDoc

## Notes

Mainly made as a TypeScript NPM package test bed. Check out these packages:
* [norwegian-validation](https://www.npmjs.com/package/norwegian-validation)
* [norwegian-national-id-validator](https://www.npmjs.com/package/norwegian-national-id-validator)
