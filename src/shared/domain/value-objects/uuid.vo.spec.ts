import { InvalidUuidError, Uuid } from "./uuid.vo";
import { validate as uuidValidate } from "uuid";

describe('Uuid Unit Test', () => {
    const validateSpy = jest.spyOn(Uuid.prototype as any, 'validate');

    test('should throw error when uuid is invalid', () => {
        expect(() =>{
            new Uuid('invalid-uuid');
        }).toThrowError(new InvalidUuidError());
        expect(validateSpy).toHaveBeenCalledTimes(1);
    });

    test('should create a valid uuid', () => {
        const uuid = new Uuid();
        expect(uuid).toBeDefined();
        expect(uuidValidate(uuid.id)).toBeTruthy();
        expect(validateSpy).toHaveBeenCalledTimes(1);
    });

    test('should accept a valid uuid', () => {
        const uuid = new Uuid('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11');
        expect(uuid.id).toBe('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11');
        expect(validateSpy).toHaveBeenCalledTimes(1);
    });
});