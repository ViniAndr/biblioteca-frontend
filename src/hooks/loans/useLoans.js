import { useState, useRef, useEffect } from "react";

// Hooks
import { usePaginatedData } from "../../hooks/usePaginatedData";

// Servicos
import { getAllLoans } from "../../services/loansService";

export const useLoans = () => {
  const [filters, setFilters] = useState({
    book: "",
    status: "",
  });

  const { data, loading, page, setPage, itemsPerPage, setItemsPerPage, totalPages, totalItems, error, refetch } =
    usePaginatedData({
      initialFilter: "",
      fetchService: (_, page, itemsPerPage) => getAllLoans(filters, page, itemsPerPage),
    });

  // // formatar dados e ordenar
  const formattedData =
    data.emprestimos?.map((loan) => {
      return {
        id: loan.id,
        book: loan.livro.titulo,
        isbn: loan.livro.isbn,
        date: loan.dataSolicitacao,
        client: loan.cliente.nome,
        status: loan.status,
      };
    }) || [];

  const handleSetFilter = (name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
    setPage(1);
  };

  // Evita Buscar ao ficar segurando alguam tecla
  useEffect(() => {
    const timer = setTimeout(() => {
      refetch();
    }, 500); // Debounce de 500ms

    return () => clearTimeout(timer);
  }, [filters, refetch]);

  return {
    data: formattedData,
    loading,
    filters,
    setFilter: handleSetFilter, // Para atualizar filtros individuais
    page,
    setPage,
    totalPages,
    itemsPerPage,
    setItemsPerPage,
    totalItems,
    error,
    refetch,
  };
};
