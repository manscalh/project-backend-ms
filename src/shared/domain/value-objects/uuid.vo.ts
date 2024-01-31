import { ValueObject } from "../value-object";
import { v4 as uuid, validate as uuidValidate } from 'uuid';

export class Uuid extends ValueObject {
    readonly id: string;

    constructor(id?: string) {
        super();
        this.id = id || uuid();
        this.validate()
    }   

    private validate(){
        const isValid = uuidValidate(this.id);
        if(!isValid){
            throw new InvalidUuidError()
        }
    }
}

export class InvalidUuidError extends Error{
    constructor(message?: string){
        super(message || 'ID Must be a valid UUID');
        this.name = 'InvalidUuidError';
    }
}