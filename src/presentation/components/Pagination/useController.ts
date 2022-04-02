type UseControllerProps = {
  limit: number;
  amount: number;
};

type UseControllerHook = (props: UseControllerProps) => {
  pages: number[];
};

export const useController: UseControllerHook = ({ amount, limit }) => {
  const amountPages = Math.ceil(amount / limit);

  const pages = [...new Array(amountPages)].map((_, index) => index + 1);

  return { pages };
};
