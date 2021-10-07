import { serverWorker } from '../../mock-sw/serverWorker';
import { getActivities } from '.';

describe('test the function that fetches activites', () => {
  beforeAll(() => {
    serverWorker.listen();
  });

  it('should have a valid response if data is valid', async () => {
    const result = await getActivities(
      'Event',
      'token',
      '10-7-2021',
      '10-8-2021'
    );

    expect(result.responseHeaders.statusText).toBe('OK');
    expect(result.data).toEqual(
      expect.objectContaining({ result: expect.any(Array) })
    );
  });

  it('should fail if date format is incorrect', async () => {
    async function errorWrapper() {
      try {
        const result = await getActivities(
          'Event',
          'token',
          '12x-0-12',
          'as-4-13'
        );
        return result;
      } catch (error) {
        return error as Error;
      }
    }

    const error = await errorWrapper();

    expect(error).toHaveProperty('message');
    expect(error).toHaveProperty('name', 'TypeError');
  });

  afterAll(() => {
    serverWorker.close();
  });
});
