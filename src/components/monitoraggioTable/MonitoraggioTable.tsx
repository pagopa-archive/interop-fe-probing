import { DataGrid, gridClasses } from "@mui/x-data-grid";

const MonitoraggioTable = (props: any) => {
  return (
    <DataGrid
      rows={props.rows}
      columns={props.columns}
      disableRowSelectionOnClick
      disableColumnMenu
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
