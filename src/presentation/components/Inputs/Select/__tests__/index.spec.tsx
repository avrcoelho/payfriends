import { render, screen, fireEvent } from '@testing-library/react';

import { InputSelect } from '..';

describe('Input select component', () => {
  const options = [{ value: '1', label: 'Andre' }];
  it('should be able to render message error', () => {
    render(
      <InputSelect
        label="Test"
        name="test"
        options={options}
        error="its error"
        register={{} as any}
      />,
    );

    expect(screen.getByText('its error')).toBeTruthy();
  });
});
