import TableBody from "./TableBody";
import TableFooter from "./TableFooter";
import TableHead from "./TableHead";

const Table = ({ data, headerColumn, page, setPage, totalPages, itemsPerPage, setItemsPerPage, actions }) => {
  return (
    <div className="rounded border border-zinc-200">
      <div className="overflow-x-scroll lg:overflow-x-hidden">
        <table className="w-full">
          <TableHead columns={headerColumn} />
          <TableBody data={data} actions={actions} />
        </table>
      </div>
      {/* Rodapé */}
      <TableFooter
        page={page}
        setPage={setPage}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
      />
    </div>
  );
};

export default Table;
