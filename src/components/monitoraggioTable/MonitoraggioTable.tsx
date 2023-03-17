import { DataGrid, gridClasses } from "@mui/x-data-grid";

// TODO: to be replaced with the table component from mui italia
const MonitoraggioTable = (props: any) => {
  return (
    <DataGrid
      autoHeight
      rows={props.rows}
      columns={props.columns}
      disableRowSelectionOnClick
      disableColumnMenu
      pageSizeOptions={[4]}
      initialState={{
        pagination: { paginationModel: { pageSize: 4 } },
      }}
      sx={{
        backgroundColor: "white",
        [`& .${gridClasses.columnHeader}`]: {
          backgroundColor: "#F9FAFB",
        },
        [`& .${gridClasses.footerContainer}`]: {
          border: "none",
        },
      }}
    />
  );
};
export default MonitoraggioTable;
