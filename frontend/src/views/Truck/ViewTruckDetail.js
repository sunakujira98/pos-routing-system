import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import moment from 'moment'

import TableInstance from '../../components/Table/TableInstance'
import { useTruckByIdQuery } from '../../hooks/useTruckQuery'

const columnsHeader = [
  {
    Header: 'Truck Pengiriman',
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
    Header: "Aksi",
    accessor: "id",
    Cell: ({ cell }) => (
      <>
        <a href={`/admin/shipment/list/${cell.row.values.id}`} value={cell.row.values.id} className='bg-blue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150' target='_blank' rel='noreferrer'>
          Lihat Detail Pengiriman
        </a>
      </>
    )
  }
]

const ViewTruckDetail = () => {
  const { id } = useParams();
  const { data, isLoading, isSuccess } = useTruckByIdQuery(id)

  const TableQuery = () => {
    const [tableData, setTableData] = useState(null);
  
    useEffect(() => {
      setTableData(data?.shipments);
    }, [])

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
        <div className='flex flex-wrap justify-between'>
          <div className='px-2'>
            <h3 className='font-semibold text-lg'>
              Riwayat Penggunaan Truck {data?.name}
            </h3>
          </div>
          <div className='px-2'>
            <h3 className='font-semibold text-lg'>
            <Link
              to="/admin/truck/create"
            >
              <button
              className='bg-blue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150'
              >
                Tambah Truck
              </button>
            </Link>
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

export default ViewTruckDetail