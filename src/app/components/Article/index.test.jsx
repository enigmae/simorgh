import React from 'react';
import Article from './index';
import { shouldMatchSnapshot } from '../../helpers/tests/testHelpers';
import { textBlock } from '../../models/blocks';

const title = 'This is a title!';
const lang = 'en-GB';

const data = {
  blocks: [
    {
      type: 'headline',
      blockId: '1',
      model: textBlock('This is a headline!'),
    },
    {
      type: 'text',
      blockId: '2',
      model: {
        blocks: [
          {
            blockId: '2-1',
            type: 'paragraph',
            model: {
              text: 'This is some text content!',
            },
          },
          {
            blockId: '2-2',
            type: 'paragraph',
            model: {
              text: 'More text content!',
            },
          },
        ],
      },
    },
    {
      type: 'test',
      blockId: '3',
      model: {
        blocks: [
          {
            blockId: '3-1',
            type: 'test-something',
            model: {
              text: 'This is some test content!',
            },
          },
        ],
      },
    },
  ],
};

describe('Article', () => {
  shouldMatchSnapshot(
    'should render correctly',
    <Article title={title} lang={lang} data={data} />,
  );
});
