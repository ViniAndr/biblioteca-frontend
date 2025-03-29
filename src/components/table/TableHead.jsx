const TableHead = ({ columns }) => {
  return (
    <thead className="bg-gray-100">
      <tr>
        {columns.map((column, index) => (
          <th key={index} className="px-6 py-3 text-xs font-medium text-gray-500 uppercase text-left">
            {column}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHead;
