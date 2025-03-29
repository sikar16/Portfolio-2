// import { useMemo, useState } from 'react';
// import {
//     MaterialReactTable,
//     useMaterialReactTable,
//     type MRT_ColumnDef,
// } from 'material-react-table';
// import {
//     Box,
//     Dialog,
//     ListItemIcon,
//     MenuItem,
//     TextField,
// } from '@mui/material';
// import { useDeleteServiceMutation, useGetAllserviceQuery } from '../../../service/serviceApi.tsx';
// import Warning from '../../../component/Warning.tsx';

// export type Service = {
//     id: number;
//     name: string;
//     description: string;
//     image: string;
// };

// // Custom toolbar component for filtering
// const CustomToolbar = ({ table }) => (
//     <Box display="flex" alignItems="center" justifyContent="space-between" p={1}>
//         <TextField
//             {...table.getColumnFilterProps('global')}
//             size="small"
//             variant="outlined"
//             placeholder="Search..."
//             sx={{ marginRight: 'auto' }}
//         />
//     </Box>
// );

// export const ServiceTable = () => {
//     const { isError, isLoading, data, refetch } = useGetAllserviceQuery();
//     const [openDelete, setOpenDelete] = useState(false);
//     const [selectedRowData, setSelectedRowData] = useState(null);
//     const [deleteservice, { isLoading: isDeleting }] = useDeleteServiceMutation();

//     // Close delete confirmation dialog
//     const handleCloseDelete = () => {
//         setOpenDelete(false);
//         setSelectedRowData(null);
//     };

//     // Open delete confirmation dialog
//     const handleClickOpenDelete = (rowData) => {
//         setSelectedRowData(rowData);
//         setOpenDelete(true);
//     };

//     // Handle service deletion
//     const handleDeleteService = () => {
//         if (selectedRowData) {
//             deleteservice({ params: selectedRowData.id })
//                 .unwrap()
//                 .then(() => {
//                     handleCloseDelete();
//                     refetch();
//                 })
//                 .catch((err) => console.error("Failed to delete service: ", err));
//         } else {
//             console.error("No service selected for deletion.");
//         }
//     };

//     // Define table columns
//     const columns = useMemo<MRT_ColumnDef<Service>[]>(
//         () => [
//             { accessorKey: 'id', header: 'ID', size: 20 },
//             { accessorKey: 'name', header: 'Service Name', size: 150 },
//             { accessorKey: 'description', header: 'Description', size: 300 },
//             {
//                 accessorKey: 'image',
//                 header: 'Service Image',
//                 size: 100,
//                 Cell: ({ cell }) => (
//                     <img
//                         alt="service"
//                         height={50}
//                         width={50}
//                         src={cell.getValue<string>()}
//                         loading="lazy"
//                         style={{ borderRadius: '4px' }}
//                     />
//                 ),
//             },
//             {
//                 id: 'action',
//                 header: 'Action',
//                 size: 100,
//                 Cell: ({ row }) => (


//                     <Box>
//                         <div className='flex'>
//                             <MenuItem onClick={() => { }}>
//                                 <ListItemIcon>
//                                     <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
//                                         <path fill="#F57920" d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h8.925l-2 2H5v14h14v-6.95l2-2V19q0 .825-.587 1.413T19 21zm4-6v-4.25l9.175-9.175q.3-.3.675-.45t.75-.15q.4 0 .763.15t.662.45L22.425 3q.275.3.425.663T23 4.4t-.137.738t-.438.662L13.25 15zM21.025 4.4l-1.4-1.4zM11 13h1.4l5.8-5.8l-.7-.7l-.725-.7L11 11.575zm6.5-6.5l-.725-.7zl.7.7z"></path>
//                                     </svg>
//                                 </ListItemIcon>
//                             </MenuItem>
//                             <MenuItem onClick={() => handleClickOpenDelete(row.original)}>
//                                 <ListItemIcon>
//                                     {/* Delete Icon */}
//                                     <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 48 48">
//                                         <path fill="#e30202" d="M20 10.5v.5h8v-.5a4 4 0 0 0-8 0m-2.5.5v-.5a6.5 6.5 0 1 1 13 0v.5h11.25a1.25 1.25 0 1 1 0 2.5h-2.917l-2 23.856A7.25 7.25 0 0 1 29.608 44H18.392a7.25 7.25 0 0 1-7.224-6.644l-2-23.856H6.25a1.25 1.25 0 1 1 0-2.5zm-3.841 26.147a4.75 4.75 0 0 0 4.733 4.353h11.216a4.75 4.75 0 0 0 4.734-4.353L36.324 13.5H11.676zM21.5 20.25a1.25 1.25 0 1 0-2.5 0v14.5a1.25 1.25 0 1 0 2.5 0zM27.75 19c.69 0 1.25.56 1.25 1.25v14.5a1.25 1.25 0 1 1-2.5 0v-14.5c0-.69.56-1.25 1.25-1.25"></path>
//                                     </svg>
//                                 </ListItemIcon>
//                             </MenuItem>
//                         </div >
//                     </Box>

//                 ),
//             },
//         ],
//         []
//     );

//     const table = useMaterialReactTable({
//         columns,
//         data: isLoading ? [] : data || [],
//         enableRowActions: false,
//         enableColumnFilterModes: true,
//         enableColumnOrdering: true,
//         enableGrouping: true,
//         enableColumnPinning: true,
//         enableFacetedValues: true,
//         enableRowSelection: true,
//         initialState: {
//             showColumnFilters: true,
//             showGlobalFilter: true,
//             columnPinning: {
//                 left: ['mrt-row-expand', 'mrt-row-select'],
//                 right: ['mrt-row-actions'],
//             },
//         },
//         paginationDisplayMode: 'pages',
//         positionToolbarAlertBanner: 'bottom',
//         renderToolbar: (props) => <CustomToolbar table={props.table} />,
//         muiPaginationProps: {
//             color: 'secondary',
//             rowsPerPageOptions: [10, 20, 30],
//             shape: 'rounded',
//             variant: 'outlined',
//         },
//     });

//     return (
//         <>
//             <MaterialReactTable table={table} />
//             <Dialog open={openDelete} onClose={handleCloseDelete}>
//                 {/* Warning dialog for deletion */}
//                 <Warning
//                     handleClose={handleCloseDelete}
//                     handleAction={handleDeleteService}
//                     message={`Are you sure you want to delete this service?`}
//                     isLoading={isDeleting}
//                 />
//             </Dialog>
//             <Dialog open={open} onClose={handleClickClose} className="">
//                 <DialogTitle className="text-lg font-semibold text-gray-700">Add Service</DialogTitle>
//                 <hr className='text-black shadow-lg my-[2px]' />
//                 <AddService onClose={handleClickClose} />
//             </Dialog>
//         </>
//     );
// };