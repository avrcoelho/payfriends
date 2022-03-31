import { render, screen } from '@testing-library/react';

import { ButtonDefault } from '..';

describe('Button default', () => {
  it('should be able to render children', () => {
    render(<ButtonDefault>Text default</ButtonDefault>);

    expect(screen.getByText('Text default')).toBeTruthy();
  });

  it('should be able to render children', () => {
    render(<ButtonDefault isLoading>Text default</ButtonDefault>);

    expect(screen.getByLabelText('Loading...')).toBeTruthy();
  });
});
