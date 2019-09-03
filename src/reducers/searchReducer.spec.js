import filterReducer from './searchReducer';

const initialState = {
  searchQuery: '',
  page: 1,
  displayFields: {
    categories: 'show',
    authors: 'show',
    tags: 'show',
  },
  updateFields: {
    categories: [],
    authors: [],
    tags: [],
  },
  searchResults: [],
};

describe('Search Reducer', () => {
  it('should return default state', () => {
    expect(filterReducer(undefined, {})).toEqual(initialState);
  });

  it('should return new state', () => {
    const payload = {
      field: 'categories',
      value: 'lifestyle',
    };
    const action = {
      type: 'UPDATE_FILTER',
      payload,
    };

    const newState = {
      searchQuery: '',
      page: 1,
      displayFields: {
        categories: 'show',
        authors: 'show',
        tags: 'show',
      },
      updateFields: {
        categories: ['lifestyle'],
        authors: [],
        tags: [],
      },
      searchResults: [],
    };

    expect(filterReducer(initialState, action)).toEqual(newState);
  });

  it('should return new state (display filter)', () => {
    const payload = 'categories';
    const action = {
      type: 'DISPLAY_FILTER',
      payload,
    };

    const newState = {
      searchQuery: '',
      page: 1,
      displayFields: {
        categories: 'hide',
        authors: 'show',
        tags: 'show',
      },
      updateFields: {
        categories: [],
        authors: [],
        tags: [],
      },
      searchResults: [],
    };

    expect(filterReducer(initialState, action)).toEqual(newState);
  });

  it('should return new state (remove filter)', () => {
    const payload = {
      field: 'categories',
      value: 'lifestyle',
    };
    const action = {
      type: 'REMOVE_FILTER',
      payload,
    };

    const presentState = {
      searchQuery: '',
      page: 1,
      displayFields: {
        categories: 'show',
        authors: 'show',
        tags: 'show',
      },
      updateFields: {
        categories: ['lifestyle'],
        authors: [],
        tags: [],
      },
      searchResults: [],
    };

    expect(filterReducer(presentState, action)).toEqual(initialState);
  });

  it('should return new state (Update artifles)', () => {
    const payload = [{ a: 'b' }, { c: 'd' }];
    const action = {
      type: 'UPDATE_ARTICLES',
      payload,
    };

    const newState = {
      searchQuery: '',
      page: 1,
      displayFields: {
        categories: 'show',
        authors: 'show',
        tags: 'show',
      },
      updateFields: {
        categories: [],
        authors: [],
        tags: [],
      },
      searchResults: [{ a: 'b' }, { c: 'd' }],
    };

    expect(filterReducer(undefined, action)).toEqual(newState);
  });

  it('should return new state (search query)', () => {
    const payload = 'mon';
    const action = {
      type: 'UPDATE_SEARCHQUERY',
      payload,
    };

    const newState = {
      searchQuery: 'mon',
      page: 1,
      displayFields: {
        categories: 'show',
        authors: 'show',
        tags: 'show',
      },
      updateFields: {
        categories: [],
        authors: [],
        tags: [],
      },
      searchResults: [],
    };

    expect(filterReducer(undefined, action)).toEqual(newState);
  });

  it('should return new state (page)', () => {
    const payload = 2;
    const action = {
      type: 'UPDATE_PAGENUMBER',
      payload,
    };

    const newState = {
      searchQuery: '',
      page: 2,
      displayFields: {
        categories: 'show',
        authors: 'show',
        tags: 'show',
      },
      updateFields: {
        categories: [],
        authors: [],
        tags: [],
      },
      searchResults: [],
    };

    expect(filterReducer(undefined, action)).toEqual(newState);
  });
});
