import { FiSearch } from 'react-icons/fi';

import { Pagination } from '@/presentation/components/Pagination';
import { SelectLimitPerPage } from '@/presentation/components/Inputs/LimitPerPage';
import { Colors } from '@/presentation/constants/Colors';
import { Container, InputSearch, SearchContainer } from './styles';

type ControlsProps = {
  onUpdateLimit(limit: number): void;
  onUpdatePage(page: number): void;
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
}: ControlsProps): JSX.Element => {
  return (
    <Container>
      <SearchContainer>
        <FiSearch size={20} color={Colors.SecondaryText} />
        <InputSearch placeholder="Pesquisar por usuário" />
      </SearchContainer>
      <div>
        <SelectLimitPerPage onChange={onUpdateLimit} currentLimit={limit} />
        <Pagination
          amount={total}
          currentPage={page}
          limit={limit}
          onUpdatePage={onUpdatePage}
        />
      </div>
    </Container>
  );
};
