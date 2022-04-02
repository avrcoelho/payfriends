import { GetUser } from '@/useCases/GetUser';
import { GetPayments } from '@/useCases/GetPayments';
import { Header } from '@/presentation/components/Header';
import { Pagination } from '@/presentation/components/Pagination';
import { SelectLimitPerPage } from '@/presentation/components/Inputs/LimitPerPage';
import { Colors } from '@/presentation/constants/Colors';
import { useController } from './useController';
import {
  Container,
  Content,
  Title,
  ButtonAddPayment,
  PaymentsGrid,
  GridControls,
  SearchContainer,
  InputSearch,
} from './styles';
import { FiSearch } from 'react-icons/fi';

type PaymentsProps = {
  getUser: () => GetUser;
  getPayments: () => GetPayments;
};

export const Payments = ({
  getPayments,
  getUser,
}: PaymentsProps): JSX.Element => {
  const { user, onUpdateLimit, onUpdatePage, page, limit } = useController({
    getPayments,
    getUser,
  });

  return (
    <>
      {!!user && <Header user={user} />}
      <Container>
        <Content>
          <Title>Meus pagamentos</Title>
          <ButtonAddPayment type="button">Adicionar pagamento</ButtonAddPayment>

          <PaymentsGrid>
            <GridControls>
              <SearchContainer>
                <FiSearch size={20} color={Colors.SecondaryText} />
                <InputSearch placeholder="Pesquisar por usuário" />
              </SearchContainer>
              <div>
                <SelectLimitPerPage
                  onChange={onUpdateLimit}
                  currentLimit={limit}
                />
                <Pagination
                  amount={52}
                  currentPage={page}
                  limit={limit}
                  onUpdatePage={onUpdatePage}
                />
              </div>
            </GridControls>
          </PaymentsGrid>
        </Content>
      </Container>
    </>
  );
};
