import { expect } from 'chai';
import 'mocha';
import {
  makeKidNumber,
  verifyKidNumber,
  makeAccountNumber,
  verifyAccountNumber,
  makeOrganisationNumber,
  verifyOrganisationNumber,
  makeBirthNumber,
  verifyBirthNumber
} from '../src/norwegian-numbers';

describe('Testing of makeKidNumber and verifyKidNumber', function () {
  context('makeKidNumber 234567', function () {
    it('should return 2345676', function () {
      expect(makeKidNumber('234567')).to.equal('2345676')
      expect(verifyKidNumber('2345676')).to.be.true
    })
  })

  context('makeKidNumber 0', function () {
    it('should return 00', function () {
      expect(makeKidNumber('0')).to.equal('00')
      expect(verifyKidNumber('00')).to.be.true
    })
  })

  context('makeKidNumber abc', function () {
    it('should throw error', function () {
      expect(function () {
        makeKidNumber('abc')
      }).to.throw(Error, 'Value "abc" was not an integer.')
      expect(verifyKidNumber('abc')).to.be.false
    })
  })

  context('makeKidNumber blank', function () {
    it('should throw error', function () {
      expect(function () {
        makeKidNumber('')
      }).to.throw(Error, 'Invalid value length for "". Must be from 1 to 24 characters, inclusive.')
      expect(verifyKidNumber('')).to.be.false
    })
  })

  context('makeKidNumber 01234567890123456789012345', function () {
    it('should throw error', function () {
      expect(function () {
        makeKidNumber('01234567890123456789012345')
      }).to.throw(Error, 'Invalid value length for "01234567890123456789012345". Must be from 1 to 24 characters, inclusive.')
      expect(verifyKidNumber('01234567890123456789012345')).to.be.false
    })
  })

  context('makeKidNumber (MOD11) 1234567890', function () {
    it('should return 12345678903', function () {
      expect(makeKidNumber('1234567890', 'MOD11')).to.equal('12345678903')
      expect(verifyKidNumber('12345678903', 'MOD11')).to.be.true
    })
  })

  context('makeKidNumber (MOD11) 31', function () {
    it('should return 310', function () {
      expect(makeKidNumber('31', 'MOD11')).to.equal('310')
      expect(verifyKidNumber('310', 'MOD11')).to.be.true
    })
  })

  context('makeKidNumber (MOD11) 40', function () {
    it('should return 40-', function () {
      expect(makeKidNumber('40', 'MOD11')).to.equal('40-')
      expect(verifyKidNumber('40-', 'MOD11')).to.be.true
    })
  })

  context('makeKidNumber (MOD11) abc', function () {
    it('should throw error', function () {
      expect(function () {
        makeKidNumber('abc', 'MOD11')
      }).to.throw(Error, 'Value "abc" was not an integer.')
      expect(verifyKidNumber('abc', 'MOD11')).to.be.false
    })
  })

  context('makeKidNumber (MOD11) blank', function () {
    it('should throw error', function () {
      expect(function () {
        makeKidNumber('', 'MOD11')
      }).to.throw(Error, 'Invalid value length for "". Must be from 1 to 24 characters, inclusive.')
      expect(verifyKidNumber('', 'MOD11')).to.be.false
    })
  })

  context('makeKidNumber (MOD11) 01234567890123456789012345', function () {
    it('should throw error', function () {
      expect(function () {
        makeKidNumber('01234567890123456789012345', 'MOD11')
      }).to.throw(Error, 'Invalid value length for "01234567890123456789012345". Must be from 1 to 24 characters, inclusive.')
      expect(verifyKidNumber('01234567890123456789012345', 'MOD11')).to.be.false
    })
  })
})

describe('Testing of makeAccountNumber and verifyAccountNumber', function () {
  context('makeAccountNumber 1234567890', function () {
    it('should return 12345678903', function () {
      expect(makeAccountNumber('1234567890')).to.equal('12345678903')
      expect(verifyAccountNumber('12345678903')).to.be.true
    })
  })

  context('makeAccountNumber 0000002001', function () {
    it('should throw error', function () {
      expect(function () {
        makeAccountNumber('0000002001')
      }).to.throw(Error, 'Rejected due to invalid control digit.')
      expect(verifyAccountNumber('0000002001-')).to.be.false
    })
  })
})

describe('Testing of makeOrganisationNumber and verifyOrganisationNumber', function () {
  context('makeOrganisationNumber 12345678', function () {
    it('should return 123456785', function () {
      expect(makeOrganisationNumber('12345678')).to.equal('123456785')
      expect(verifyOrganisationNumber('123456785')).to.be.true
    })
  })

  context('makeOrganisationNumber 00002001', function () {
    it('should throw error', function () {
      expect(function () {
        makeOrganisationNumber('00002001')
      }).to.throw(Error, 'Rejected due to invalid control digit.')
      expect(verifyOrganisationNumber('0000002001-')).to.be.false
    })
  })
})

describe('Testing of makeBirthNumber and verifyBirthNumber', function () {
  context('makeBirthNumber 311299567', function () {
    it('should return 31129956715', function () {
      expect(makeBirthNumber('311299567')).to.equal('31129956715')
      expect(verifyBirthNumber('31129956715')).to.be.true
    })
  })

  context('makeBirthNumber 000000021', function () {
    it('should throw error', function () {
      expect(function () {
        makeBirthNumber('000000021')
      }).to.throw(Error, 'Rejected due to invalid control digit.')
      expect(verifyBirthNumber('000000021-2')).to.be.false
    })
  })

  context('makeBirthNumber 101000000', function () {
    it('should throw error', function () {
      expect(function () {
        makeBirthNumber('101000000')
      }).to.throw(Error, 'Rejected due to invalid control digit.')
      expect(verifyBirthNumber('1010000002-')).to.be.false
    })
  })
})