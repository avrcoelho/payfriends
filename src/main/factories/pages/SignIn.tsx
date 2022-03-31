import { SignIn } from '@/presentation/pages/SignIn';
import { makeSignIn } from '../useCases/signIn';

export const MakeSignIn = (): JSX.Element => {
  return <SignIn signIn={makeSignIn} />;
};
