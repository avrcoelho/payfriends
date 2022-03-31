import { ReactComponent as Logo } from '@/presentation/assets/svgs/logo.svg';
import { ReactComponent as ManDoingOnlinePayment } from '@/presentation/assets/svgs/man-doing-online-payment.svg';
import { InputText } from '@/presentation/components/Inputs/Text';
import { SignIn as SignInUsecase } from '@/useCases/SignIn';
import { Container, SignContainer, Button } from './styles';
import { useController } from './useController';

type SignInProps = {
  signIn(): SignInUsecase;
};

export const SignIn = ({ signIn }: SignInProps) => {
  const { errors, handleSubmit, isLoading, onSubmit, register } = useController(
    { signIn },
  );

  return (
    <Container>
      <SignContainer>
        <Logo />
        <h1>Bem vindo de volta</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <InputText
            register={register('email')}
            label="E-mail"
            type="email"
            error={errors?.email?.message}
          />
          <InputText
            register={register('password')}
            label="Senha"
            type="password"
            error={errors?.password?.message}
          />

          <Button type="submit" isLoading={isLoading}>
            Entrar
          </Button>
        </form>
      </SignContainer>

      <ManDoingOnlinePayment />
    </Container>
  );
};
