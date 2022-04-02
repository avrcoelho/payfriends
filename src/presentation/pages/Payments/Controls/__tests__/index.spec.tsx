import { render } from '@testing-library/react';

import { Controls } from '..';

describe('Payments Controls component', () => {
  const props = {
    limit: 10,
    onUpdateLimit: jest.fn(),
    onUpdatePage: jest.fn(),
    page: 7,
    total: 70,
  };
  it('should be able to render component', () => {
    expect(() => render(<Controls {...props} />)).not.toThrow();
  });
});
