import React, { useMemo } from 'react'
import {
  useTable,
  useGlobalFilter,
  useSortBy,
  usePagination
} from 'react-table';

import TableLayout from './TableLayout'

const TableInstance = ({ columnsHeader, tableData }) => {
  const [columns, data] = useMemo(
    () => {
      const columns = columnsHeader;
      return [columns, tableData];
    },
    [columnsHeader, tableData]
  );

  const tableInstance = useTable(
    { columns, data, initialState: { pageIndex: 0 } },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  return (
    <TableLayout {...tableInstance} />
  );
}

export default TableInstance