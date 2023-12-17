import { describe, it, expect, beforeEach, jest } from '@jest/globals'
import Service from '../../src/02_stubs/service'
import crypto from 'node:crypto'
import fs from 'node:fs/promises'

describe('Service Test Suite', () => {
    let _service
    const filename = 'users.ndjson'
    const MOCKED_HASH_PWD = 'hashedpassword'

    describe('#create - spies', () => {
      beforeEach(() => {
        jest.spyOn(crypto, 'createHash')
            .mockReturnValue({
              update: jest.fn().mockReturnThis(),
              digest: jest.fn().mockReturnValue(MOCKED_HASH_PWD)
            })

        jest.spyOn(fs, 'appendFile').mockResolvedValue()
        _service = new Service({filename})
      })

      it('should calla appendfile with rights params', async () => {
        // AAA - Arrange, Act, Assert
        const input = {
          username: 'username',
          password: 'passs1'
        }
        const expectCreatedAtt = new Date().toISOString()
        // Arrange
        jest.spyOn(Date.prototype, 'toISOString').mockReturnValue(expectCreatedAtt)

        // Act
        await _service.create(input)
        
        // Assert
        expect(crypto.createHash).toHaveBeenCalledTimes(1)
        expect(crypto.createHash).toHaveBeenCalledWith('sha256')

        const hash = crypto.createHash('sha256')
        expect(hash.update).toHaveBeenCalledWith(input.password)
        expect(hash.digest).toHaveBeenCalledWith('hex')

        const expected = JSON.stringify({
          ...input,
          createAt: expectCreatedAtt,
          password: MOCKED_HASH_PWD
        }).concat('\n')

        expect(fs.appendFile).toHaveBeenCalledWith(filename, expected)
      })
    });
})

