# Norwegian numbers

[![Build Status](https://travis-ci.com/Ondkloss/norwegian-numbers.js.svg?branch=master)](https://travis-ci.com/Ondkloss/norwegian-numbers.js)

Make and verify official Norwegian numbers:

* KID-nummer: `makeKidNumber` and `verifyKidNumber`
* Organisasjonsnummer: `makeOrganisationNumber` and `verifyOrganisationNumber`
* Fødselsnummer: `makeBirthNumber` and `verifyBirthNumber`
* Kontonummer: `makeAccountNumber` and `verifyAccountNumber`

This currently only concerns itself with the control digits.

## Installation

To install from NPM as a package in your environment:

    npm install norwegian-numbers

## Code usage from installation

Example code usages after installation:

    > const nn = require('norwegian-numbers');
    undefined
    > kid.makeKidNumber('1234');
    '12344'

## Testing from source

To run the tests:

    mocha

Or:

    npm test

## Distribution

The distribution was created by the following commands:

    npm publish --access public

## Notes

Mainly made as a TypeScript NPM package test bed. Check out these packages:
* [norwegian-validation](https://www.npmjs.com/package/norwegian-validation)
* [norwegian-national-id-validator](https://www.npmjs.com/package/norwegian-national-id-validator)
