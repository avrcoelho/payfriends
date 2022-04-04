import { Controller } from 'react-hook-form';

import { CreatePayment } from '@/useCases/CreatePayment';
import { UpdatePayment } from '@/useCases/updatePayment';
import { GetUsers } from '@/useCases/GetUsers';
import { InputText } from '@/presentation/components/Inputs/Text';
import { InputSelect } from '@/presentation/components/Inputs/Select';
import { Colors } from '@/presentation/constants/Colors';
import { Container, ButtonsContainer, InputsContainer, Button } from './styles';
import { useController } from './useController';

type CreateOrUpdateProps = {
  createPayment: typeof CreatePayment.prototype['execute'];
  updatePayment: typeof UpdatePayment.prototype['execute'];
  getUsers(): GetUsers;
};

export const CreateOrUpdate = ({
  createPayment,
  updatePayment,
  getUsers,
}: CreateOrUpdateProps): JSX.Element => {
  const {
    isLoading,
    handleSubmit,
    errors,
    onSubmit,
    users,
    register,
    onCloseModal,
    modalType,
    control,
  } = useController({
    createPayment,
    updatePayment,
    getUsers,
  });

  return (
    <Container>
      <h3>{modalType === 'create' ? 'Adicionar' : 'Editar'} pagamento</h3>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <InputsContainer>
            <Controller
              name="userId"
              control={control}
              render={({ field: { onChange, value } }) => (
                <InputSelect
                  label="Usuário"
                  options={users}
                  parentBgColor={Colors.White}
                  error={errors?.userId?.message}
                  value={value}
                  onChange={onChange}
                />
              )}
            />
            <InputText
              register={register('value')}
              label="Valor"
              error={errors?.value?.message}
              parentBgColor={Colors.White}
            />
            <InputText
              register={register('date')}
              label="Data"
              error={errors?.date?.message}
              parentBgColor={Colors.White}
            />
            <InputText
              register={register('title')}
              label="Titulo"
              error={errors?.title?.message}
              parentBgColor={Colors.White}
            />
          </InputsContainer>

          <ButtonsContainer>
            <Button
              type="button"
              className="cancel"
              onClick={onCloseModal}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button type="submit" isLoading={isLoading}>
              Salvar
            </Button>
          </ButtonsContainer>
        </div>
      </form>
    </Container>
  );
};
