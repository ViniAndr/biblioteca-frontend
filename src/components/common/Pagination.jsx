import { LuChevronRight, LuChevronLeft } from "react-icons/lu";
import Button from "./Button";

const Pagination = ({ page, setPage, total }) => {
  const handleNextPage = () => {
    if (page < total && page < total) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div className="flex gap-4 items-center">
      <Button size="square" onClick={handlePreviousPage} disabled={page === 1}>
        <LuChevronLeft />
      </Button>
      <span className="text-xs font-medium text-gray-500 uppercase">
        Página {page} de {total}
      </span>
      <Button size="square" onClick={handleNextPage} disabled={page === total}>
        <LuChevronRight />
      </Button>
    </div>
  );
};

export default Pagination;
