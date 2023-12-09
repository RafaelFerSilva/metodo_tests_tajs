import { describe, it, expect } from '@jest/globals'
import Person from '../src/person'

describe('#Person Suite', () => {
    describe('#validate', () => {
        it('should throw an error if the name is not present', () => {
            // mock é a entrada necessário para que o teste funcione
            const mockInvalidPerson = {
                name: '',
                cpf: '123.456.789-00'
            }
            expect(() => Person.validate(mockInvalidPerson))
            .toThrow(new Error('name is required'))
        })

        it('should throw an error if the cpf is not present', () => {
            // mock é a entrada necessário para que o teste funcione
            const mockInvalidPerson = {
                name: 'Zezin',
                cpf: ''
            }
            expect(() => Person.validate(mockInvalidPerson))
            .toThrow(new Error('cpf is required'))
        })

        it('should not throw an error if person is valid', () => {
            // mock é a entrada necessário para que o teste funcione
            const mockInvalidPerson = {
                name: 'Zezin',
                cpf: '123.456.789-00'
            }
            expect(() => Person.validate(mockInvalidPerson))
            .not.toThrow()
        })
    })

    describe('#format', () => {
        it('should format the person name and CPF', () => {
            // AAA

            // Arrange
            const mockPerson = {
                name: 'Zezinho da Silva',
                cpf: '000.000.444-11'
            }

            // Act
            const formattedPerson = Person.format(mockPerson)

            // Assert
            const expected = {
                name: 'Zezinho',
                cpf: '00000044411',
                lastName: 'da Silva'
            }
            expect(formattedPerson).toStrictEqual(expected)
        })
    })

    describe('#save', () => {
        it('should throw a erro if person is invalid', () => {
            const mockPerson = {
                name: 'Rafael Silva',
                cpf: '387.458.968-23'
            }
            expect(() => Person.save(mockPerson)).toThrow()
        })

        it('should not throw a erro if person is valid', () => {
            const mockPerson = {
                name: 'Rafael Silva',
                cpf: '387.458.968-23',
                lastName: 'Silva'
            }
            expect(() => Person.save(mockPerson)).not.toThrow()
        })

        it('should returned a success message if the user is saved', () => {
            const mockPerson = {
                name: 'Rafael Silva',
                cpf: '38745896823',
                lastName: 'Silva'
            }
            expect(Person.save(mockPerson)).toEqual({message: 'registrado com sucesso!!'})
        })
    })
})