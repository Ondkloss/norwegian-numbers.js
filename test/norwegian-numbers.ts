import { expect } from 'chai';
import 'mocha';
import rewire from 'rewire';
import {
  makeKidNumber,
  verifyKidNumber,
  makeAccountNumber,
  verifyAccountNumber,
  makeOrganisationNumber,
  verifyOrganisationNumber,
  makeBirthNumber,
  verifyBirthNumber,
} from '../src/norwegian-numbers';

context('Testing of makeKidNumber and verifyKidNumber', function () {
  it('234567 should return 2345676 and verify', function () {
    expect(makeKidNumber('234567')).to.equal('2345676')
    expect(verifyKidNumber('2345676')).to.be.true
  })

  it('0 should return 00 and verify', function () {
    expect(makeKidNumber('0')).to.equal('00')
    expect(verifyKidNumber('00')).to.be.true
  })

  it('abc should throw error and not verify', function () {
    expect(function () {
      makeKidNumber('abc')
    }).to.throw(Error, 'Value "abc" was not an integer.')
    expect(verifyKidNumber('abc')).to.be.false
  })

  it('blank should throw error and not verify', function () {
    expect(function () {
      makeKidNumber('')
    }).to.throw(Error, 'Invalid value length for "". Must be from 1 to 24 characters, inclusive.')
    expect(verifyKidNumber('')).to.be.false
  })

  it('01234567890123456789012345 should throw error nad not verify', function () {
    expect(function () {
      makeKidNumber('01234567890123456789012345')
    }).to.throw(Error, 'Invalid value length for "01234567890123456789012345". Must be from 1 to 24 characters, inclusive.')
    expect(verifyKidNumber('01234567890123456789012345')).to.be.false
  })

  it('1234567890 (MOD11) should return 12345678903 and verify', function () {
    expect(makeKidNumber('1234567890', 'MOD11')).to.equal('12345678903')
    expect(verifyKidNumber('12345678903', 'MOD11')).to.be.true
  })

  it('31 (MOD11) should return 310 and verify', function () {
    expect(makeKidNumber('31', 'MOD11')).to.equal('310')
    expect(verifyKidNumber('310', 'MOD11')).to.be.true
  })

  it('40 (MOD11) should return 40- and verify', function () {
    expect(makeKidNumber('40', 'MOD11')).to.equal('40-')
    expect(verifyKidNumber('40-', 'MOD11')).to.be.true
  })

  it('abc (MOD11) should throw error and not verify', function () {
    expect(function () {
      makeKidNumber('abc', 'MOD11')
    }).to.throw(Error, 'Value "abc" was not an integer.')
    expect(verifyKidNumber('abc', 'MOD11')).to.be.false
  })

  it('blank (MOD11) should throw error', function () {
    expect(function () {
      makeKidNumber('', 'MOD11')
    }).to.throw(Error, 'Invalid value length for "". Must be from 1 to 24 characters, inclusive.')
    expect(verifyKidNumber('', 'MOD11')).to.be.false
  })

  it('WRONGMOD should throw error and not verify', function () {
    expect(function () {
      makeKidNumber('1234', 'WRONGMOD')
    }).to.throw(Error, 'Invalid mode "WRONGMOD".')
    expect(verifyKidNumber('', 'MOD11')).to.be.false
  })

  it('01234567890123456789012345 (MOD11) should throw error and not verify', function () {
    expect(function () {
      makeKidNumber('01234567890123456789012345', 'MOD11')
    }).to.throw(Error, 'Invalid value length for "01234567890123456789012345". Must be from 1 to 24 characters, inclusive.')
    expect(verifyKidNumber('01234567890123456789012345', 'MOD11')).to.be.false
  })
})

context('Testing of makeAccountNumber and verifyAccountNumber', function () {
  it('1234567890 should return 12345678903 and verify', function () {
    expect(makeAccountNumber('1234567890')).to.equal('12345678903')
    expect(verifyAccountNumber('12345678903')).to.be.true
  })

  it('0000002001 should throw error and not verify', function () {
    expect(function () {
      makeAccountNumber('0000002001')
    }).to.throw(Error, 'Rejected due to invalid control digit.')
    expect(verifyAccountNumber('0000002001-')).to.be.false
  })
})

context('Testing of makeOrganisationNumber and verifyOrganisationNumber', function () {
  it('12345678 should return 123456785 and verify ', function () {
    expect(makeOrganisationNumber('12345678')).to.equal('123456785')
    expect(verifyOrganisationNumber('123456785')).to.be.true
  })

  it('00002001 should throw error and not verify', function () {
    expect(function () {
      makeOrganisationNumber('00002001')
    }).to.throw(Error, 'Rejected due to invalid control digit.')
    expect(verifyOrganisationNumber('0000002001-')).to.be.false
  })
})

context('Testing of makeBirthNumber and verifyBirthNumber', function () {
  it('311299567 should return 31129956715 and verify', function () {
    expect(makeBirthNumber('311299567')).to.equal('31129956715')
    expect(verifyBirthNumber('31129956715')).to.be.true
  })

  it('000000021 should throw error and not verify', function () {
    expect(function () {
      makeBirthNumber('000000021')
    }).to.throw(Error, 'Rejected due to invalid control digit.')
    expect(verifyBirthNumber('000000021-2')).to.be.false
  })

  it('101000000 should throw error and not verify', function () {
    expect(function () {
      makeBirthNumber('101000000')
    }).to.throw(Error, 'Rejected due to invalid control digit.')
    expect(verifyBirthNumber('1010000002-')).to.be.false
  })
})

context('makeMod10ControlDigit', function () {
  const nnRewired = rewire('../src/norwegian-numbers')
  const makeMod10ControlDigit = nnRewired.__get__('makeMod10ControlDigit')

  it('75 should return 4', function () {
    expect(makeMod10ControlDigit('75', [3, 4])).to.equal(4)
  })
})