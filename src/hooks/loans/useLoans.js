import { useState, useEffect, useCallback } from "react";

// Hooks
import { usePaginatedFetch } from "../usePaginatedFetch";

// Serviços
import { getAllLoans } from "../../services/loansService";

export const useLoans = () => {
  const [isAttributesLoaded, setIsAttributesLoaded] = useState(false);
  const [status, setStatus] = useState([]);

  const { data, setFilter, ...rest } = usePaginatedFetch({
    fetchService: getAllLoans,
  });

  const collectStatus = useCallback((formattedData) => {
    const uniqueStatus = new Set();

    formattedData?.forEach(({ status }) => {
      if (status) {
        uniqueStatus.add(status);
      }
    });

    setStatus([...uniqueStatus]);
  }, []);

  useEffect(() => {
    if (!isAttributesLoaded && formattedData.length > 0) {
      collectStatus(formattedData);
      setIsAttributesLoaded(true);
    }
  }, [data, isAttributesLoaded, collectStatus]);

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
    status,
    setFilterField: (key, value) => setFilter({ [key]: value }),
    ...rest,
  };
};
