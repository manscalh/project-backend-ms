import { ValueObject } from "./value-object";

class StringValueObject extends ValueObject{
  constructor(readonly value: string) {
    super();
  }
}

class ComplexValueObject extends ValueObject{
  constructor(readonly value: string, readonly value2: number) {
    super();
  }
}

describe('ValueObject', () => {
  test('should be equal', () => {
    const valueObject1 = new StringValueObject('value');
    const valueObject2 = new StringValueObject('value');
    expect(valueObject1.equals(valueObject2)).toBe(true);

    const valueObject3 = new ComplexValueObject('value', 1);
    const valueObject4 = new ComplexValueObject('value', 1);
    expect(valueObject3.equals(valueObject4)).toBe(true);

  });

  test('should not be equal', () => {
    const valueObject1 = new StringValueObject('value');
    const valueObject2 = new StringValueObject('value2');
    expect(valueObject1.equals(valueObject2)).toBe(false);
    expect(valueObject1.equals(null as any)).toBe(false);
    expect(valueObject1.equals(undefined as any)).toBe(false);
    expect(valueObject2.equals(null as any)).toBe(false);
    expect(valueObject2.equals(undefined as any)).toBe(false);
  });


});