import { render, screen } from '@testing-library/react';

import { InputCurrency } from '..';

describe('Input currency component', () => {
  it('should be able to render message error', () => {
    render(<InputCurrency label="Test" name="test" error="its error" />);

    expect(screen.getByText('its error')).toBeTruthy();
  });
});
