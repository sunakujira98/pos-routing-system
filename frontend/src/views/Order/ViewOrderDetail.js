import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

import TableInstance from '../../components/Table/TableInstance'
import { useOrderByIdQuery } from '../../hooks/useOrderQuery'

const columnsHeader = [
  {
    Header: 'Barang',
    accessor: 'product.name',
  },
  {
    Header: 'Banyaknya',
    accessor: 'qty',
  },
  {
    Header: 'Harga satuan',
    accessor: 'product.price'
  }
]

const ViewOrderDetail = () => {
  const { id } = useParams();

  const TableQuery = () => {
    const {data, isSuccess, isLoading} = useOrderByIdQuery(id)

    const [tableData, setTableData] = useState(null);
  
    useEffect(() => {
      setTableData(data?.orderDetails);
    }, [isSuccess, data])

    if (isLoading || !tableData) {
      return <div>Loading...</div>
    }
  
    return (
      <TableInstance columnsHeader={columnsHeader} tableData={tableData} />
    );
  }
  
  return (
    <div className='relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded'>
      <div className='rounded-t mb-0 px-4 py-3 border-0'>
        <div className='flex flex-wrap items-center'>
          <div className='relative w-full px-4 max-w-full flex-grow flex-1'>
            <h3 className='font-semibold text-lg'>
              Data Order {id}
            </h3>
          </div>
        </div>
        <div className='mt-4'>
          <TableQuery />
        </div>
      </div>
    </div>
  )
}

export default ViewOrderDetail