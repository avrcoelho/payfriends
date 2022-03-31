import { ReactComponent as Logo } from '@/presentation/assets/svgs/logo.svg';
import { ReactComponent as ManDoingOnlinePayment } from '@/presentation/assets/svgs/man-doing-online-payment.svg';
import { InputText } from '@/presentation/components/Inputs/Text';
import { Container, SignContainer, Button } from './styles';

export const SignIn = () => {
  return (
    <Container>
      <SignContainer>
        <Logo />
        <h1>Bem vindo de volta</h1>

        <form>
          <InputText label="E-mail" type="email" />
          <InputText label="Senha" type="password" />

          <Button type="submit" isLoading={false}>
            Entrar
          </Button>
        </form>
      </SignContainer>

      <ManDoingOnlinePayment />
    </Container>
  );
};
