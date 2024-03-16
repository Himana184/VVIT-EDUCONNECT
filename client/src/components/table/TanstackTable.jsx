/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useReactTable, getCoreRowModel, flexRender, getSortedRowModel, getPaginationRowModel, getFilteredRowModel } from "@tanstack/react-table"
import { useMemo, useRef, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { Input } from "../ui/input";
import * as XLSX from "xlsx";
import { DownloadTableExcel } from 'react-export-table-to-excel';
import Papa from 'papaparse';

const TanstackTable = ({ tableData, columns }) => {


  // console.log("Table data : ", tableData)
  // Memorizing the data using useMemo
  const data = useMemo(() => tableData, [tableData]);
  const tableRef = useRef(null);
  // states for sorting and filtering of the data in the table
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");
  const [pagination, setPagination] = useState({
    pageIndex: 0, //initial page index
    pageSize: 10, //default page size
  });


  // Tanstack table 
  const table = useReactTable({
    data, columns, getCoreRowModel: getCoreRowModel(), getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting: sorting,
      globalFilter: filtering,
      pagination: pagination

    }, onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
    getSortedRowModel: getSortedRowModel(),
  })
  const downloadData = async () => {
    try {
      // Get all columns, even those not currently visible
      const columnNames = table.getAllColumns().map((column) => column.id);

      // Retrieve all rows, considering pagination if applicable
      // console.log(table.getAllColumns())
      const allRows = sorting // Fetch all pages


      const studentData = allRows.map((row) => {
        const student = [];
        columnNames.forEach((columnName) => {
          // Use optional chaining for safer access
          student.push(row?.[columnName]);
        });
        return student;
      });

      generateExcel(columnNames, studentData, "data.xlsx");
    } catch (error) {
      console.error("Error downloading data:", error);
      // Handle the error gracefully, e.g., display a user-friendly message
    }
  };

  const generateExcel = (headers, formattedData, filename) => {
    console.log("Formateed Data : ", formattedData)
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet([headers, ...formattedData]);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
  };

  const downloadCSV = () => {
    const { rows, prepareRow } = table;
    const pages = table.getPageCount();
    var currentPage = 0;
    while (currentPage < pages) {
      table.setPageIndex(currentPage)
      console.log(table.getPaginationRowModel({ pageIndex: currentPage }))
      currentPage = currentPage + 1
    }
    const csvData = rows.map((row) => prepareRow(row.original).values);
    const csvString = Papa.unparse(csvData);

    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'data.csv';
    link.click();
  };



  if (tableData?.length == 0) {
    return <p>Nothing to display</p>
  }
  return (
    <div>

      {/* Pagination and Filtering */}
      <div className="flex flex-row items-center justify-between py-2">


        <Button onClick={downloadCSV}>Download Data</Button>

        <div className="flex items-center">
          <Button
            variant="text"
            className="flex items-center gap-2 select-none"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ArrowLeftIcon strokeWidth={2} className="w-4 h-4" />
            <p className="hidden lg:block">Previous</p>
          </Button>
          <p className="select-none">{table.getState().pagination.pageIndex + 1} of{" "} {table.getPageCount()}</p>
          <Button
            variant="text"
            className="flex items-center gap-2 select-none"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ArrowRightIcon strokeWidth={2} className="w-4 h-4" />
            <p className="hidden lg:block">Next</p>
          </Button>
        </div>
        <Input type="text" value={filtering} onChange={e => setFiltering(e.target.value)} className="justify-end w-52 lg:w-72" placeholder="Search Anything" />
      </div>

      {/* Table */}
      <Table className="overflow-auto mt-5" ref={tableRef}>
        {
          table.getHeaderGroups().map((headerGroup, index) => (
            <TableRow key={index}>
              {
                headerGroup.headers.map(header => (
                  <TableHead key={header.id}
                    className="cursor-pointer select-none"
                    onClick={header.column.getToggleSortingHandler()}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {{
                      asc: ' 🔼',
                      desc: ' 🔽',
                    }[header.column.getIsSorted()] ?? null}
                  </TableHead>
                ))
              }
            </TableRow>
          ))
        }
        <TableBody>
          {
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {
                  row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {
                        flexRender(cell.column.columnDef.cell, cell.getContext())
                      }
                    </TableCell>
                  ))
                }
              </TableRow>
            ))
          }
        </TableBody>
      </Table>


    </div >
  )
}

export default TanstackTable