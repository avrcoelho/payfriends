import { render } from '@testing-library/react';

import { Header } from '..';

describe('Header component', () => {
  it('should be able to render component', () => {
    const user = {
      id: '7',
      name: 'John Doe',
      nickname: 'johndoe',
      email: 'john@doe.com',
      avatar: 'https://github.com/avrcoelho.png',
    };

    expect(() => render(<Header user={user} />)).not.toThrow();
  });
});
