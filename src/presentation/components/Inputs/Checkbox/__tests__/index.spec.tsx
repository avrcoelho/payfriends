import { render, screen, fireEvent } from '@testing-library/react';

import { InputChackbox } from '..';

describe('Input checkbox component', () => {
  it('should be able to change check', () => {
    const mockOnChange = jest.fn();
    render(<InputChackbox onChange={mockOnChange} />);

    fireEvent.click(screen.getByLabelText('Status do pagamento'));

    expect(mockOnChange).toBeCalled();
  });
});
