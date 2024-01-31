import { before } from "lodash";
import { Uuid } from "../../shared/domain/value-objects/uuid.vo";
import { Category } from "./category.entity";

describe('Category Unit Tests', () => {
    
    let validateSpy : any;

    beforeEach(() => {
        validateSpy = jest.spyOn(Category, 'validate');
    })

    test('Should create a category with name', () => {

        const category = Category.create({
            name: 'Category 1',
        });
        expect(category.category_id).toBeInstanceOf(Uuid); 
        expect(category.name).toBe('Category 1');
        expect(category.is_active).toBe(true);
        expect(category.created_at).toBeInstanceOf(Date);
        expect(validateSpy).toHaveBeenCalledTimes(1);
        
    });
    test('Should create a category with name and description', () => {
            
        const category = Category.create({
            name: 'Category 1',
            description: 'Description 1'
        });
        expect(category.category_id).toBeInstanceOf(Uuid); 
        expect(category.name).toBe('Category 1');
        expect(category.description).toBe('Description 1');
        expect(category.is_active).toBe(true);
        expect(category.created_at).toBeInstanceOf(Date);
        expect(validateSpy).toHaveBeenCalledTimes(1);
    })
    test('Should create a category with name, description and is_active', () => {
            
        const category = Category.create({
            name: 'Category 1',
            description: 'Description 1',
            is_active: false
        });
        expect(category.category_id).toBeInstanceOf(Uuid); 
        expect(category.name).toBe('Category 1');
        expect(category.description).toBe('Description 1');
        expect(category.is_active).toBe(false);
        expect(category.created_at).toBeInstanceOf(Date);
        expect(validateSpy).toHaveBeenCalledTimes(1);
    })
    test('Should create a category with name, description, is_active and created_at', () => {
            
        const created_at = new Date();
        const category = new Category({
            name: 'Category 1',
            description: 'Description 1',
            is_active: false,
            created_at
        });
        expect(category.category_id).toBeInstanceOf(Uuid); 
        expect(category.name).toBe('Category 1');
        expect(category.description).toBe('Description 1');
        expect(category.is_active).toBe(false);
        expect(category.created_at).toBe(created_at);
    })
    test('Should create a category with all properties', () => {
            
        const created_at = new Date();
        const category = new Category({
            category_id: new Uuid(),
            name: 'Category 1',
            description: 'Description 1',
            is_active: false,
            created_at
        });
        expect(category.category_id).toBeInstanceOf(Uuid); 
        expect(category.name).toBe('Category 1');
        expect(category.description).toBe('Description 1');
        expect(category.is_active).toBe(false);
        expect(category.created_at).toBe(created_at);
    })
    test('Should create a command', () => {
        const category = Category.create({
            name: 'Category 1'
        });
        expect(category.category_id).toBeInstanceOf(Uuid); 
        expect(category.name).toBe('Category 1');
        expect(category.description).toBeNull();
        expect(category.is_active).toBe(true);
        expect(category.created_at).toBeInstanceOf(Date);

    })
    test('Should change name', () => {
        const category = Category.create({
            name: 'Category 1'
        });
        category.changeName('Category 1');
        expect(category.name).toBe('Category 1');
        expect(validateSpy).toHaveBeenCalledTimes(2);
    })
    test('Should change description', () => {
        const category = Category.create({
            name: 'Category 1'
        });
        category.changeDescription('Description 1');
        expect(category.description).toBe('Description 1');
        expect(validateSpy).toHaveBeenCalledTimes(2);
    })
    test('Should activate', () => {
        const category = Category.create({
            name: 'Category 1'
        });
        category.desativate();
        category.activate();
        expect(category.is_active).toBe(true);
    })
    test('Should desactivate', () => {
        const category = Category.create({
            name: 'Category 1'
        });
        category.activate();
        category.desativate();
        expect(category.is_active).toBe(false);
    });

    test('Should update name and description', () => {
        const category = Category.create({
            name: 'Category 1',
            description: 'Description 1'
        });
        category.update('Category 2', 'Description 2');
        expect(category.name).toBe('Category 2');
        expect(category.description).toBe('Description 2');
        expect(validateSpy).toHaveBeenCalledTimes(2);
    });

    
});

describe('category_id field', () => {
    const arrange = [
        { category_id: null}, 
        { category_id: undefined}, 
        { category_id: new Uuid()}
    ];

    test.each(arrange)('id = %j', ({category_id}) => {
        const category = new Category({
            category_id: category_id as any,            
            name: 'Category 1'
        });
        expect(category.category_id).toBeInstanceOf(Uuid);
        if(category_id instanceof Uuid){
            expect(category.category_id).toBe(category_id);
        }

        expect(() => category.changeName(5 as any)).containsErrorMessages({
            name: ['name must be a string',
            'name must be shorter than or equal to 255 characters']
        });
    });
});

describe('Category Validator', () => {

    describe('create command', () => {
        
        test('should an invalid category with name property', () => {
            expect(() => Category.create({name: null })).containsErrorMessages({
                name: [
                    'name should not be empty',
                    'name must be a string',
                    'name must be shorter than or equal to 255 characters'
                ]
            });

            expect(() => Category.create({name: '' })).containsErrorMessages({
                name: ['name should not be empty']
            });

            
            expect(() => Category.create({name: "s".repeat(256) })).containsErrorMessages({
                name: [
                    'name must be shorter than or equal to 255 characters'
                ]
            });

            expect(() => Category.create({name: 5 as any })).containsErrorMessages({
                name: ['name must be a string',
                'name must be shorter than or equal to 255 characters']
            });


        });

        

    })
});

