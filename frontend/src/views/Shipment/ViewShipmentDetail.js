import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

import TableInstance from '../../components/Table/TableInstance'
import { useShipmentByIdQuery } from '../../hooks/useShipmentQuery'

const columnsHeader = [
  {
    Header: 'Id Order',
    accessor: 'order_id',
  },
  {
    Header: 'Jarak dari toko',
    accessor: 'distance_from_store',
    Cell: ({ cell }) => (
      <p>
        {cell.row.values.distance_from_store} meter
      </p>
    )
  },
  {
    Header: 'Jarak dari destinasi sebelumnya',
    accessor: 'distance_from_previous_origin',
    Cell: ({ cell }) => (
      <p>
        {cell.row.values.distance_from_previous_origin} meter
      </p>
    )
  },
  {
    Header: 'Status',
    accessor: 'status',
  },
  {
    Header: 'Urutan',
    accessor: 'sequence',
  },
  {
    Header: 'Berat pengiriman',
    accessor: 'total_weight',
    Cell: ({ cell }) => (
      <p>
        {cell.row.values.total_weight} kg
      </p>
    )
  }
]

const ViewShipmentDetail = () => {
  const { id } = useParams();


  const TableQuery = () => {
    const { data, isLoading, isSuccess } = useShipmentByIdQuery(id)

    const [ tableData, setTableData ] = useState(null);
  
    useEffect(() => {
      setTableData(data?.shipment_details);
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
              Data Pengiriman dengan id {id}
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

export default ViewShipmentDetail