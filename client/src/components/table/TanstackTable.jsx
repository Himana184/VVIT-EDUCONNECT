/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useReactTable, getCoreRowModel, flexRender, getSortedRowModel, getPaginationRowModel, getFilteredRowModel } from "@tanstack/react-table"
import { useMemo, useState } from "react";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { Input } from "../ui/input";
import * as XLSX from "xlsx";
import { Download } from "lucide-react";


const TanstackTable = ({ tableData, columns }) => {

  // ("Table data : ", tableData)
  // Memorizing the data using useMemo
  const data = useMemo(() => tableData, [tableData]);

  // states for sorting and filtering of the data in the table
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");

  // Tanstack table 
  const table = useReactTable({
    data, columns, getCoreRowModel: getCoreRowModel(), getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting: sorting,
      globalFilter: filtering

    }, onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
    getSortedRowModel: getSortedRowModel()
  })

  if (tableData?.length == 0) {
    return <p>Nothing to display</p>
  }

  const handleBtnClick = () => {
    const headers = columns.filter((column) => {
      if (column.accessorKey) {
        return column.accessorKey;
      }
    });
    const headerNames = headers.map((header) => header.accessorKey);
    (headerNames)
    const data = table.getFilteredRowModel().flatRows.map((row) => row.original);
    (data);
    (headerNames);
    const accessNestedProperty = (obj, path) => {
      const parts = path.split('[').map(part => part.replace(']', ''));
      let value = obj;
      for (const part of parts) {
        value = value[part];
        if (value === undefined) return undefined;
      }
      return value;
    };

    const formattedData = data.map((student) => [
      ...headerNames.map((name) => {
        if (name.includes('[')) {
          return accessNestedProperty(student, name);
        } else {
          return student[name];
        }
      })
    ]);
    generateExcel(headerNames, formattedData, "Student-Contacts.xlsx");
  };


  const generateExcel = (headers, formattedData, filename) => {
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

  return (
    <div>

      {/* Pagination and Filtering */}
      <div className="flex flex-row items-center justify-between py-2">
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
        <div className="flex gap-3">
          <Button variant="icon" onClick={handleBtnClick}><Download /></Button>
          <Input type="text" value={filtering} onChange={e => setFiltering(e.target.value)} className="justify-end w-52 lg:w-72" placeholder="Search Anything" />
        </div>
      </div>

      {/* Table */}
      <Table className="overflow-auto mt-5">
        <TableHeader>
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
        </TableHeader>
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