import { fireEvent, render, screen } from '@testing-library/react';

import { SelectLimitPerPage } from '..';

describe('SelectLimitPerPage component', () => {
  const props = {
    onChange: jest.fn(),
    currentLimit: 5,
  };
  it('should be able to call onchage function', () => {
    render(<SelectLimitPerPage {...props} />);

    fireEvent.change(screen.getByRole('combobox'), { target: { value: 10 } });

    expect(props.onChange).toBeCalledWith(10);
  });
});
