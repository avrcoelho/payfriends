import { ButtonDefault } from '../../components/Buttons/Default';
import { InputSelect } from '../../components/Inputs/Select';
import { InputText } from '../../components/Inputs/Text';
import { Container } from './styles';

const Home = () => {
  return (
    <Container>
      <ButtonDefault>Test</ButtonDefault>
      <br />
      <br />
      <InputText label="E-mail" type="password" />
      <InputSelect
        label="E-mail"
        type="password"
        options={[
          { value: 1, label: 1 },
          { value: 1, label: 1 },
          { value: 1, label: 1 },
          { value: 1, label: 1 },
        ]}
      />
    </Container>
  );
};

export default Home;
