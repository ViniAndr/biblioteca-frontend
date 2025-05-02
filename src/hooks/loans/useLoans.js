import { usePaginatedFetch } from "../usePaginatedFetch";
import { getAllLoans } from "../../services/loansService";

export const useLoans = () => {
  const { data, filter, setFilter, ...rest } = usePaginatedFetch({
    fetchService: getAllLoans,
  });

  const formattedData =
    data.emprestimos?.map((loan) => ({
      id: loan.id,
      book: loan.livro.titulo,
      isbn: loan.livro.isbn,
      date: loan.dataSolicitacao,
      client: loan.cliente.nome,
      status: loan.status,
    })) || [];

  return {
    data: formattedData,
    ...rest,
  };
};
