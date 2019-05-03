import { expect } from 'chai';
import 'mocha';
import nn from '../src/norwegian-numbers';

describe('#mod10()', function () {

  context('makeKidNumber 234567', function () {
    it('should return 2345676', function () {
      expect(nn.makeKidNumber('234567')).to.equal('2345676')
    })
  })

  context('makeKidNumber 0', function () {
    it('should return 00', function () {
      expect(nn.makeKidNumber('0')).to.equal('00')
    })
  })

  context('makeKidNumber abc', function () {
    it('should throw error', function () {
      expect(function () {
        nn.makeKidNumber('abc')
      }).to.throw(Error, 'Value "abc" was not an integer.')
    })
  })

  context('makeKidNumber blank', function () {
    it('should throw error', function () {
      expect(function () {
        nn.makeKidNumber('')
      }).to.throw(Error, 'Invalid value length for "". Must be from 1 to 24 characters, inclusive.')
    })
  })

  context('makeKidNumber 01234567890123456789012345', function () {
    it('should throw error', function () {
      expect(function () {
        nn.makeKidNumber('01234567890123456789012345')
      }).to.throw(Error, 'Invalid value length for "01234567890123456789012345". Must be from 1 to 24 characters, inclusive.')
    })
  })

  context('makeKidNumber (MOD11) 1234567890', function () {
    it('should return 12345678903', function () {
      expect(nn.makeKidNumber('1234567890', 'MOD11')).to.equal('12345678903')
    })
  })

  context('makeKidNumber (MOD11) 31', function () {
    it('should return 310', function () {
      expect(nn.makeKidNumber('31', 'MOD11')).to.equal('310')
    })
  })

  context('makeKidNumber (MOD11) 40', function () {
    it('should return 40-', function () {
      expect(nn.makeKidNumber('40', 'MOD11')).to.equal('40-')
    })
  })

  context('makeKidNumber (MOD11) abc', function () {
    it('should throw error', function () {
      expect(function () {
        nn.makeKidNumber('abc', 'MOD11')
      }).to.throw(Error, 'Value "abc" was not an integer.')
    })
  })

  context('makeKidNumber (MOD11) blank', function () {
    it('should throw error', function () {
      expect(function () {
        nn.makeKidNumber('', 'MOD11')
      }).to.throw(Error, 'Invalid value length for "". Must be from 1 to 24 characters, inclusive.')
    })
  })

  context('makeKidNumber (MOD11) 01234567890123456789012345', function () {
    it('should throw error', function () {
      expect(function () {
        nn.makeKidNumber('01234567890123456789012345', 'MOD11')
      }).to.throw(Error, 'Invalid value length for "01234567890123456789012345". Must be from 1 to 24 characters, inclusive.')
    })
  })
})