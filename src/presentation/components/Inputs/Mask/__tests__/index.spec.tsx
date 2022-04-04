import { render, screen } from '@testing-library/react';

import { InputMask } from '..';

describe('Input mask component', () => {
  it('should be able to render message error', () => {
    render(
      <InputMask
        mask="99"
        label="Test"
        name="test"
        placeholder="Password"
        error="its error"
      />,
    );

    expect(screen.getByText('its error')).toBeTruthy();
  });
});
