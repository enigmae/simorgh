import loggerMock from '#testHelpers/loggerMock';

import fetchMarkup from '.';

import {
  INCLUDE_ERROR,
  INCLUDE_FETCH_ERROR,
  INCLUDE_REQUEST_RECEIVED,
} from '#lib/logger.const';

const includeMarkup = `<div>Include Markup</div><script type="text/javascript" src="localhost/idt1.js"></script>`;

describe('fetchMarkup', () => {
  afterEach(() => {
    fetch.resetMocks();
    loggerMock.error.mockClear();
    loggerMock.info.mockClear();
  });
  it('should fetch include html markup succesfully', async () => {
    fetch.mockResponse(() => Promise.resolve(includeMarkup));

    const actual = await fetchMarkup(
      'https://foobar.com/includes/indepthtoolkit/quizzes/123-456',
    );

    expect(actual).toEqual(includeMarkup);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      'https://foobar.com/includes/indepthtoolkit/quizzes/123-456',
      {
        timeout: 3000,
      },
    );
    expect(loggerMock.info).toHaveBeenCalledWith(INCLUDE_REQUEST_RECEIVED, {
      url: 'https://foobar.com/includes/indepthtoolkit/quizzes/123-456',
    });
  });

  it('should return null when the fetch call returns a non 200 status', async () => {
    fetch.mockResponse(() => Promise.resolve({ status: 304 }));

    const actual = await fetchMarkup(
      'https://foobar.com/includes/indepthtoolkit/quizzes/123-456',
    );

    expect(actual).toEqual(null);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      'https://foobar.com/includes/indepthtoolkit/quizzes/123-456',
      {
        timeout: 3000,
      },
    );
    expect(loggerMock.info).toHaveBeenCalledWith(INCLUDE_REQUEST_RECEIVED, {
      url: 'https://foobar.com/includes/indepthtoolkit/quizzes/123-456',
    });
    expect(loggerMock.error).toHaveBeenCalledWith(INCLUDE_FETCH_ERROR, {
      status: 304,
      url: 'https://foobar.com/includes/indepthtoolkit/quizzes/123-456',
    });
  });

  it('should return null when the fetch call throws an exception', async () => {
    fetch.mockResponse(() => {
      throw new Error('Invalid request');
    });

    const actual = await fetchMarkup(
      'https://foobar.com/includes/indepthtoolkit/quizzes/123-456',
    );

    expect(actual).toEqual(null);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      'https://foobar.com/includes/indepthtoolkit/quizzes/123-456',
      {
        timeout: 3000,
      },
    );
    expect(loggerMock.info).toHaveBeenCalledWith(INCLUDE_REQUEST_RECEIVED, {
      url: 'https://foobar.com/includes/indepthtoolkit/quizzes/123-456',
    });
    expect(loggerMock.error).toHaveBeenCalledWith(INCLUDE_ERROR, {
      error: 'Error: Invalid request',
      url: 'https://foobar.com/includes/indepthtoolkit/quizzes/123-456',
    });
  });
});
