import { fireEvent, render, screen } from '@testing-library/react';

import { Pagination } from '..';

describe('Pagination component', () => {
  const props = {
    amount: 52,
    currentPage: 2,
    limit: 20,
    onUpdatePage: jest.fn(),
  };
  it('should be able to render 5 buttons', () => {
    render(<Pagination {...props} />);

    expect(screen.getAllByRole('button')).toHaveLength(5);
  });

  it('should be able to button 2 is current', () => {
    render(<Pagination {...props} />);

    expect(screen.getByText('2').getAttribute('aria-current')).toBe('true');
  });

  it('should be able to call on change page when click in number button', () => {
    render(<Pagination {...props} />);

    fireEvent.click(screen.getByText('1'));

    expect(props.onUpdatePage).toBeCalledWith(1);
  });

  it('should be able to call on change page when click in previous button', () => {
    render(<Pagination {...props} />);

    fireEvent.click(
      screen.getByRole('button', {
        name: /</i,
      }),
    );

    expect(props.onUpdatePage).toBeCalledWith(1);
  });

  it('should be able to call on change page when click in next button', () => {
    render(<Pagination {...props} />);

    fireEvent.click(
      screen.getByRole('button', {
        name: />/i,
      }),
    );

    expect(props.onUpdatePage).toBeCalledWith(3);
  });
});
