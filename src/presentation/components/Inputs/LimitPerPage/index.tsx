import { Container, Label, Select } from './styles';

type SelectLimitPerPageProps = {
  onChange(value: number): void;
};

const options = [
  { value: 5, label: 5 },
  { value: 10, label: 10 },
  { value: 20, label: 20 },
];

export const SelectLimitPerPage = ({
  onChange,
}: SelectLimitPerPageProps): JSX.Element => {
  return (
    <Container>
      <Label htmlFor="per-page">Exibir</Label>
      <Select
        name="per-page"
        options={options}
        onChange={e => onChange(Number(e.target.value))}
      />
    </Container>
  );
};
