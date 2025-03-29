const ItemsPerPageSelector = ({ itemsPerPage, setItemsPerPage }) => {
  return (
    <div className="flex items-center">
      <label htmlFor="itemsPerPage" className="mr-2 text-xs font-medium text-gray-500 uppercase">
        Itens por página:
      </label>
      <select
        id="itemsPerPage"
        value={itemsPerPage}
        onChange={(e) => setItemsPerPage(Number(e.target.value))}
        className="border rounded px-0.5 border-zinc-400 outline-0 text-sm font-medium text-gray-500 uppercase"
      >
        {[5, 10, 15, 20, 25].map((number) => (
          <option key={number} value={number}>
            {number}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ItemsPerPageSelector;
