import { Button, Container } from './styles';
import { useController } from './useController';

type PaginationProps = {
  amount: number;
  currentPage: number;
  limit: number;
  onUpdatePage(page: number): void;
};

export const Pagination = ({
  amount,
  limit,
  currentPage,
  onUpdatePage,
}: PaginationProps): JSX.Element => {
  const { pages } = useController({ amount, limit });

  return (
    <Container>
      {currentPage > 1 && (
        <Button onClick={() => onUpdatePage(currentPage - 1)}>&lt;</Button>
      )}
      {pages.map(page => (
        <Button
          key={String(page)}
          $isCurrent={page === currentPage}
          onClick={() => onUpdatePage(page)}
          aria-current={page === currentPage}
        >
          {String(page)}
        </Button>
      ))}
      {currentPage < pages.length && (
        <Button onClick={() => onUpdatePage(currentPage + 1)}>&gt;</Button>
      )}
    </Container>
  );
};
