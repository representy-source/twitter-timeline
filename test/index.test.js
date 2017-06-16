import TwitterTimeline from '../src/';

describe('TwitterTimeline', () => {
  describe('load', async () => {
    test('w/ required params', async () => {
      const timeline = new TwitterTimeline();
      expect.assertions(2);
      try {
        await timeline.load();
      } catch (e) {
        expect(e).not.toBeNull();
        expect(e.message).toEqual(expect.stringContaining('username is required'));
      }
    });

    test('w/ all options', async () => {
      const timeline = new TwitterTimeline(
        {
          username: 'salimkayabasi',
          width: 400,
          height: 300,
          dnt: true,
          theme: 'dark',
          linkColor: '#292',
        });
      const result = await timeline.load();
      expect(result).toEqual(expect.stringContaining('class="twitter-timeline"'));
      expect(result).toEqual(expect.stringContaining('data-width="400"'));
      expect(result).toEqual(expect.stringContaining('data-height="300"'));
      expect(result).toEqual(expect.stringContaining('data-dnt="true"'));
      expect(result).toEqual(expect.stringContaining('data-theme="dark"'));
      expect(result).toEqual(expect.stringContaining('data-link-color="#292"'));
      expect(result).toEqual(expect.stringContaining('https://twitter.com/salimkayabasi'));
      expect(result).toEqual(expect.stringContaining('Tweets by salimkayabasi'));
    });
  });
});
