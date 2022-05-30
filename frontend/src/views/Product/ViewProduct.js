import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";

import TableInstance from '../../components/Table/TableInstance'
import { useAllProductQuery } from '../../hooks/useProductQuery'

const columnsHeader = [
  {
    Header: 'Nama Pelanggan',
    accessor: 'name',
  },
  {
    Header: 'Berat',
    accessor: 'weight',
  },
  {
    Header: 'Harga',
    accessor: 'price',
  },
  {
    width: 300,
    Header: "Aksi",
    accessor: "id",
    Cell: ({ cell }) => (
      <a href={`/admin/product/update/${cell.row.values.id}`} value={cell.row.values.id} className='bg-blue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150' target='_blank' rel='noreferrer'>
        Ubah data  
      </a>
    )
  }
]

const ViewProduct = () => {
  const TableQuery = () => {
    const { data, isLoading, isSuccess } = useAllProductQuery()

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
        <div className='flex flex-wrap justify-between'>
          <div className='px-2'>
            <h3 className='font-semibold text-lg'>
              Data Produk
            </h3>
          </div>
          <div className='px-2'>
            <h3 className='font-semibold text-lg'>
            <Link
              to="/admin/product/create"
            >
              <button
              className='bg-blue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150'
              >
                Tambah Produk
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

export default ViewProduct