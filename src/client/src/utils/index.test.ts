import { groupBy, toPicklistData } from '.';

const data = {
  result: [
    {
      _id: '61566801642c753073fe012e',
      name: 'Rick flame',
      __type: 'Contact',
      timeline_id: '61566801642c753073fe012f',
    },
    {
      _id: '61566801642c753073fe015s',
      name: 'Johnny wang',
      __type: 'Contact',
      timeline_id: '61566801642c753073s5h12f',
    },
    {
      _id: '61566801642c753073fe034s',
      name: 'Bruce wayne',
      __type: 'Contact',
      timeline_id: '61566801642c753073s5h12f',
    },
    {
      _id: '61566801642c673073fe015s',
      name: 'Selina kylye',
      __type: 'Account',
      timeline_id: '61566801642c753073s5h12f',
    },
  ],
};

type objType = typeof data.result[0];

describe('groupBy tests.', () => {
  const expectedResult = [
    {
      categoryTitle: 'Contact',
      categoryItems: [
        {
          _id: '61566801642c753073fe012e',
          name: 'Rick flame',
          __type: 'Contact',
          timeline_id: '61566801642c753073fe012f',
        },
        {
          _id: '61566801642c753073fe015s',
          name: 'Johnny wang',
          __type: 'Contact',
          timeline_id: '61566801642c753073s5h12f',
        },
        {
          _id: '61566801642c753073fe034s',
          name: 'Bruce wayne',
          __type: 'Contact',
          timeline_id: '61566801642c753073s5h12f',
        },
      ],
    },
    {
      categoryTitle: 'Account',
      categoryItems: [
        {
          _id: '61566801642c673073fe015s',
          name: 'Selina kylye',
          __type: 'Account',
          timeline_id: '61566801642c753073s5h12f',
        },
      ],
    },
  ];

  it('should return the correct result', () => {
    const result = groupBy<objType>(data.result, (item) => item.__type);

    expect(result).toEqual(expectedResult);
  });
});

describe('toPicklistData tests.', () => {
  const expectedResult = [
    { value: '61566801642c753073fe012e', text: 'Rick flame', selected: false },
    { value: '61566801642c753073fe015s', text: 'Johnny wang', selected: false },
    { value: '61566801642c753073fe034s', text: 'Bruce wayne', selected: true },
    {
      value: '61566801642c673073fe015s',
      text: 'Selina kylye',
      selected: false,
    },
  ];

  it('should return the correct result', () => {
    const result = toPicklistData<objType>(data.result, {
      valueKey: '_id',
      textKey: 'name',
      selected: { name: 'Bruce wayne' },
    });

    expect(result).toEqual(expectedResult);
  });
});
