import { groupBy } from '.';

describe('groupBy tests.', () => {
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
    type objType = typeof data.result[0];
    const result = groupBy<objType>(data.result, (item) => item.__type);

    expect(result).toEqual(expectedResult);
  });
});
