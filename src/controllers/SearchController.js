export default class SearchController {
  async getTagResult(req, res, next) {
    try {
      const { query } = req.params;
      const client = req.app.get('client');
      const results = await client.search({
        index: 'search-items',
        body: {
          query: {
            multi_match: {
              query: query,
              fields: ['tags'],
            },
          },
        },
      });
      return res.status(200).json({ results });
    } catch (err) {
      next(err);
    }
  }

  async getResult(req, res, next) {
    try {
      const { query } = req.params;
      const client = req.app.get('client');
      const results = await client.search({
        index: ['search-collections', 'search-items', 'search-comments'],
        body: {
          query: {
            multi_match: {
              query: query,
              fields: ['*'],
              type: 'phrase_prefix',
            },
          },
        },
      });
      return res.status(200).json({ results });
    } catch (err) {
      next(err);
    }
  }
}
