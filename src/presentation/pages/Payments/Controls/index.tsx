import { FiSearch } from 'react-icons/fi';

import { Pagination } from '@/presentation/components/Pagination';
import { SelectLimitPerPage } from '@/presentation/components/Inputs/LimitPerPage';
import { Colors } from '@/presentation/constants/Colors';
import {
  Container,
  InputSearch,
  SearchContainer,
  PaginationAndLimitContainer,
} from './styles';

type ControlsProps = {
  onUpdateLimit(limit: number): void;
  onUpdatePage(page: number): void;
  onSetSearch(value: string): void;
  search: string;
  limit: number;
  page: number;
  total: number;
};

export const Controls = ({
  limit,
  onUpdateLimit,
  onUpdatePage,
  page,
  total,
  onSetSearch,
  search,
}: ControlsProps): JSX.Element => {
  return (
    <Container>
      <SearchContainer>
        <FiSearch size={20} color={Colors.SecondaryText} />
        <InputSearch
          placeholder="Pesquisar por usuário"
          value={search}
          onChange={event => onSetSearch(event.target.value)}
        />
      </SearchContainer>
      <PaginationAndLimitContainer>
        <SelectLimitPerPage onChange={onUpdateLimit} currentLimit={limit} />
        <Pagination
          amount={total}
          currentPage={page}
          limit={limit}
          onUpdatePage={onUpdatePage}
        />
      </PaginationAndLimitContainer>
    </Container>
  );
};
