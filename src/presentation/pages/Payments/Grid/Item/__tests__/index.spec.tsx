import { render } from '@testing-library/react';

import { GridItem } from '..';

const user = {
  id: '7',
  name: 'John Doe',
  nickname: 'johndoe',
  email: 'john@doe.com',
  avatar: 'https://github.com/avrcoelho.png',
};
const props = {
  user,
  title: 'Boeleto',
  id: '7',
  value: 700,
  timestamp: Date.now(),
  status: true,
};

describe('GridItem component', () => {
  it('should be able to render component', () => {
    expect(() => render(<GridItem {...props} />)).not.toThrow();
  });
});
