import type { FormFieldTypes, PicklistData, SearchData } from 'src/types';
import {
  sanitizeProperties,
  singleFieldValidation,
  filterObjectKeys,
} from './helpers';

describe('sanitizeProperties', () => {
  it('should sanitize all properties', () => {
    const mockScript = '<script>code..</script>';

    const testObj = {
      prop1: mockScript,
      prop2: '<a href="javascript:void(0)">link text</a>',
      prop3: 'John Smith',
      prop4: 25,
      prop5: {
        prop5a: 'text',
        prop5b: mockScript,
      },
      prop6: [mockScript, 'regular_text'],
      prop7: [{ prop70a: 'text' }, { prop71a: mockScript }],
    };
    sanitizeProperties(testObj);

    expect(testObj.prop1).toBe('');
    expect(testObj.prop2).toBe('<a>link text</a>');
    expect(testObj.prop3).toBe(testObj.prop3);
    expect(testObj.prop4).toBe(testObj.prop4);
    expect(testObj.prop5.prop5a).toEqual(testObj.prop5.prop5a);
    expect(testObj.prop5.prop5b).toEqual('');
    expect(testObj.prop6[0]).toEqual('');
    expect(testObj.prop6[1]).toEqual(testObj.prop6[1]);

    expect(testObj.prop7[0].prop70a).toEqual(testObj.prop7[0].prop70a);
    expect(testObj.prop7[1].prop71a).toEqual('');
  });
});

describe('singleFieldValidation', () => {
  function testValidation(fieldValue: unknown, fieldType: FormFieldTypes) {
    try {
      singleFieldValidation(fieldValue, fieldType, '');
      return true;
    } catch (e) {
      return false;
    }
  }
  it('should validate emails', () => {
    expect(testValidation('test@gmail.com', 'Email')).toBe(true);
    expect(testValidation('test@xyz', 'Email')).toBe(true);

    expect(testValidation('test', 'Email')).toBe(false);
    expect(testValidation('test@', 'Email')).toBe(false);
    expect(testValidation('.test.@', 'Email')).toBe(false);
  });

  it('should validate numbers', () => {
    expect(testValidation(12, 'Number')).toBe(true);
    expect(testValidation('12', 'Number')).toBe(true);
    expect(testValidation('012', 'Number')).toBe(true);
    expect(testValidation('32.12', 'Number')).toBe(true);
    expect(testValidation(' 32', 'Number')).toBe(true);

    expect(testValidation('x32', 'Number')).toBe(false);
    expect(testValidation('444,212', 'Number')).toBe(false);
    expect(testValidation('one', 'Number')).toBe(false);
  });

  it('should validate dates', () => {
    expect(testValidation('12-01-2021', 'Date')).toBe(true);
    expect(testValidation('Jan-12-2020', 'Date')).toBe(true);
    expect(testValidation('01/12/2020', 'Date')).toBe(true);
    expect(testValidation('January,1,2021', 'Date')).toBe(true);
    expect(testValidation('January.1.2021', 'Date')).toBe(true);

    const milliseconds = 1638130427952;
    expect(testValidation(milliseconds, 'Date')).toBe(true);

    expect(testValidation('Jan-32-2020', 'Date')).toBe(false);
    expect(testValidation('01-32-2021', 'Date')).toBe(false);
  });

  it('should validate urls', () => {
    expect(testValidation('https://www.foo.com', 'Url')).toBe(true);
    expect(testValidation('https://www.foo.co', 'Url')).toBe(true);
    expect(
      testValidation('https://www.example.com/foo/?bar=baz&inga=42&quux', 'Url')
    ).toBe(true);
    expect(testValidation('http://142.42.1.1/', 'Url')).toBe(true);

    expect(testValidation('https://$foo.com', 'Url')).toBe(false);
    expect(testValidation('www.foo.com', 'Url')).toBe(false);
    expect(testValidation('www.foo.co', 'Url')).toBe(false);
    expect(testValidation('mailto:emailaddress@gmail.com', 'Url')).toBe(false);
    expect(testValidation('foo.com', 'Url')).toBe(false);
  });

  it('should validate passwords', () => {
    expect(testValidation('-_-aBBc9', 'Password')).toBe(true);
    expect(testValidation('$xoxo*4OP', 'Password')).toBe(true);

    //too short
    expect(testValidation('aBBc9', 'Password')).toBe(false);
    //not enough lowercase
    expect(testValidation('-_-ABBC9', 'Password')).toBe(false);
    //not enough uppercase
    expect(testValidation('-_-abbc9', 'Password')).toBe(false);
    //not enough special characters from set [-#$*_]
    expect(testValidation('abbc901x', 'Password')).toBe(false);
  });

  it('should validate picklists', () => {
    expect(
      testValidation(
        { __type: 'Picklist', text: '', value: '' } as PicklistData,
        'Picklist'
      )
    ).toBe(true);

    //missing text field
    expect(
      testValidation(
        { __type: 'Picklist', value: '' } as PicklistData,
        'Picklist'
      )
    ).toBe(false);

    //missing value field
    expect(
      testValidation(
        { __type: 'Picklist', text: '' } as PicklistData,
        'Picklist'
      )
    ).toBe(false);
  });

  it('should validate search result items', () => {
    expect(testValidation({ _id: '', name: '' } as SearchData, 'Search')).toBe(
      true
    );

    //missing _id field
    expect(testValidation({ name: '' } as SearchData, 'Search')).toBe(false);
    //missing name field
    expect(testValidation({ _id: '' } as SearchData, 'Search')).toBe(false);
  });
});

describe('filterObjectKeys', () => {
  let testObject: Record<string, any>;
  const whitelist = ['prop1', 'prop5', 'prop3'];

  beforeEach(() => {
    testObject = {
      prop1: '...',
      prop2: '...',
      prop3: {},
      prop4: { prop4a: '...' },
      prop5: [''],
    };
  });

  it('should remove properties not included in whitelist', () => {
    const resultObject = filterObjectKeys(testObject, whitelist);

    expect(resultObject['prop1']).not.toBeUndefined();
    expect(resultObject['prop5']).not.toBeUndefined();
    expect(resultObject['prop3']).not.toBeUndefined();

    expect(resultObject['prop2']).toBeUndefined();
    expect(resultObject['prop4']).toBeUndefined();
  });
});
