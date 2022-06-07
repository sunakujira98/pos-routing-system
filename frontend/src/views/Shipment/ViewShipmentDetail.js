import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import TableInstance from '../../components/Table/TableInstance'
import { useShipmentByIdQuery, useUpdateStatusShipmentQuery } from '../../hooks/useShipmentQuery'

const columnsHeader = [
  {
    Header: 'Id Order',
    accessor: 'order_id',
  },
  {
    Header: 'Jarak dari toko menggunakan kendaraan',
    accessor: 'distance_from_store',
    Cell: ({ cell }) => (
      <p>
        {cell.row.values.distance_from_store} meter
      </p>
    )
  },
  {
    Header: 'Jarak dari destinasi sebelumnya menggunakan kendaraan',
    accessor: 'distance_from_previous_origin',
    Cell: ({ cell }) => (
      <p>
        {cell.row.values.distance_from_previous_origin} meter
      </p>
    )
  },
  {
    Header: 'Alamat tujuan',
    accessor: 'order.customer.address'
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
  },
  {
    width: 300,
    Header: "Aksi",
    accessor: "id",
    Cell: ({ cell }) => (
      <a href={`/admin/order/list/${cell.row.original.order.id}`} value={cell.row.original.order.id} className='bg-blue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150' target='_blank' rel='noreferrer'>
        Lihat Data Order
      </a>
    )
  }
]

const ViewShipmentDetail = () => {
  const { id } = useParams();

  const updateStatusShipmentMutation = useUpdateStatusShipmentQuery(id)
  const { 
    isLoading: isLoadingUpdateShipment, 
    isSuccess: isSuccessUpdateShipment, 
    isError: isErrorUpdateShipment, 
    data: dataUpdateShipment, 
    error: errorUpdateShipment
  } = updateStatusShipmentMutation

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
        {isSuccessUpdateShipment && toast.success(dataUpdateShipment?.message, {toastId: "unique-random-text-xAu9C9-"})}
        {isErrorUpdateShipment && toast.error(errorUpdateShipment?.message)}
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
        <div className='float-left'>
          <button className='bg-blue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none mr-1' onClick={() => updateStatusShipmentMutation.mutate({status: 'OUT_FOR_DELIVERY'})}>
            Kirim Pesanan  
          </button>

          <button className='bg-orange-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none mr-1' onClick={() => updateStatusShipmentMutation.mutate({status: 'SHIPMENT_DONE'})}>
            Selesaikan Pengiriman
          </button>
        </div>
      </div>
    </div>
  )
}

export default ViewShipmentDetail