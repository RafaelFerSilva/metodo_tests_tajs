import { it, expect, describe, beforeEach, jest } from '@jest/globals';
import { mapPerson } from '../src/person.js';

describe('Person Test Suite', () => {
  describe('happy path', () => {
    it('should map person', async () => {
      const personStr = '{"name":"rafael","age":34}'
      const personObje = mapPerson(personStr)
      expect(personObje).toEqual({
        name: 'rafael',
        age: 34,
        createdAt: expect.any(Date)
      })
    })
  })
  
  describe('what coverage doesnt tell you', () => {
    it('should not map person given invalid JSON string', async () => {
      const personStr = '{"name":'
      expect(() => mapPerson(personStr)).toThrow('Unexpected end of JSON input')
    })

    it('should not map person given invalid JSON data', async () => {
      const personStr = '{}'
      const personObje = mapPerson(personStr)
      expect(personObje).toEqual({
        name: undefined,
        age: undefined,
        createdAt: expect.any(Date)
      })
    })
  })
})


