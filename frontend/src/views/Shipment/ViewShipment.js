import React, { useEffect, useState } from 'react'
import moment from 'moment'

import TableInstance from '../../components/Table/TableInstance'
import { useAllShipmentQuery } from '../../hooks/useShipmentQuery'

const columnsHeader = [
  {
    Header: 'Truk Pengiriman',
    accessor: 'truck.name',
  },
  {
    Header: 'Status',
    accessor: 'status',
  },
  {
    Header: 'Tanggal Pengiriman',
    accessor: 'shipment_date',
    Cell: ({ cell }) => (
      <p>{moment.utc(cell.row.original.shipment_date).format('YYYY-MMM-DD HH:mm')}</p>
    )
  },
  {
    width: 300,
    Header: "Total Berat",
    accessor: "total_weight",
    Cell: ({ cell }) => {
      const { shipment_details } = cell.row.original
      let totalWeight = 0
      for (let i = 0; i < shipment_details.length; i++) {
        totalWeight += shipment_details[i].total_weight
      }
      return (<p>{totalWeight} kg</p>)
    }
  },
  {
    width: 300,
    Header: "Aksi",
    accessor: "id",
    Cell: ({ cell }) => (
      <a href={`/admin/shipment/list/${cell.row.values.id}`} value={cell.row.values.id} className='bg-blue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150' target='_blank' rel='noreferrer'>
        Lihat  
      </a>
    )
  }
]

const ViewShipment = () => {
  const TableQuery = () => {
    const { data, isLoading, isSuccess } = useAllShipmentQuery()

    const [tableData, setTableData] = useState(null);
  
    useEffect(() => {
      setTableData(data);
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
              Data Pengiriman
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

export default ViewShipment