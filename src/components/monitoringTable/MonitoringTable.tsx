import {
  Table,
  TableRow,
  Filters,
  useFilters,
  Pagination,
  usePagination,
} from "../../../interop-fe-commons";
import { Chip, Grid } from "@mui/material";
import { ButtonNaked } from "@pagopa/mui-italia";
import { includes, slice, filter, map, toUpper, isEqual } from "lodash";
import { useState, useEffect } from "react";

const tableData = [
  {
    name: "Anagrafica comunale",
    version: "1",
    producerName: "Comune di Milano",
    state: "online",
    date: "13/03/2023, ore 12:30",
  },
  {
    name: "Anagrafica comunale",
    version: "2",
    producerName: "Comune di Torino",
    state: "offline",
    date: "13/03/2023, ore 12:30",
  },
  {
    name: "Erogazione borse di studio",
    version: "3",
    producerName:
      "A.Di.S.U.R.C. Azienda per Il Diritto allo Studio Universitario della Regione Campania",
    state: "online",
    date: "13/03/2023, ore 12:30",
  },
  {
    name: "Anagrafica comunale",
    version: "4",
    producerName: "Comune di Brindisi",
    state: "offline",
    date: "13/03/2023, ore 12:30",
  },
  {
    name: "Erogazione borse di studio",
    version: "5",
    producerName:
      "A.Di.S.U.R.C. Azienda per Il Diritto allo Studio Universitario della Regione Campania",
    state: "offline",
    date: "13/03/2023, ore 12:30",
  },
  {
    name: "Anagrafica comunale",
    version: "6",
    producerName: "Comune di Milano",
    state: "online",
    date: "13/03/2023, ore 12:30",
  },
  {
    name: "Anagrafica comunale",
    version: "7",
    producerName: "Comune di Torino",
    state: "offline",
    date: "13/03/2023, ore 12:30",
  },
  {
    name: "Erogazione borse di studio",
    version: "8",
    producerName:
      "A.Di.S.U.R.C. Azienda per Il Diritto allo Studio Universitario della Regione Campania",
    state: "online",
    date: "13/03/2023, ore 12:30",
  },
  {
    name: "Anagrafica comunale",
    version: "9",
    producerName: "Comune di Brindisi",
    state: "offline",
    date: "13/03/2023, ore 12:30",
  },
  {
    name: "Erogazione borse di studio",
    version: "10",
    producerName:
      "A.Di.S.U.R.C. Azienda per Il Diritto allo Studio Universitario della Regione Campania",
    state: "offline",
    date: "13/03/2023, ore 12:30",
  },
  {
    name: "Anagrafica comunale",
    version: "11",
    producerName: "Comune di Milano",
    state: "online",
    date: "13/03/2023, ore 12:30",
  },
  {
    name: "Anagrafica comunale",
    version: "12",
    producerName: "Comune di Torino",
    state: "offline",
    date: "13/03/2023, ore 12:30",
  },
  {
    name: "Erogazione borse di studio",
    version: "13",
    producerName:
      "A.Di.S.U.R.C. Azienda per Il Diritto allo Studio Universitario della Regione Campania",
    state: "online",
    date: "13/03/2023, ore 12:30",
  },
  {
    name: "Anagrafica comunale",
    version: "14",
    producerName: "Comune di Brindisi",
    state: "offline",
    date: "13/03/2023, ore 12:30",
  },
  {
    name: "Erogazione borse di studio",
    version: "15",
    producerName:
      "A.Di.S.U.R.C. Azienda per Il Diritto allo Studio Universitario della Regione Campania",
    state: "offline",
    date: "13/03/2023, ore 12:30",
  },
];

type EServiceListQueryFilters = {
  name?: string;
  version?: string;
  producerName?: string;
  state?: string;
};

export const MonitoringTable: React.FC = () => {
  const headLabels = [
    "Nome e-service",
    "Versione",
    "Erogatore",
    "Stato e-service",
    "Data ultima rilevazione",
    "",
  ];

  const { filtersParams, ...handlers } = useFilters<EServiceListQueryFilters>([
    { name: "name", type: "freetext", label: "Cerca per nome e-service" },
    {
      name: "producerName",
      type: "freetext",
      label: "Cerca per erogatore e-service",
    },
    {
      name: "version",
      type: "freetext",
      label: "Cerca per versione e-service",
    },
    {
      name: "state",
      type: "autocomplete-multiple",
      label: "Cerca stato e-service",
      options: [
        { value: "online", label: "online" },
        { value: "offline", label: "offline" },
        { value: "n/d", label: "n/d" },
      ],
    },
  ]);

  const { paginationParams, paginationProps, getTotalPageCount } =
    usePagination({ limit: 10 });

  const [totalPages, setTotalpages] = useState(
    getTotalPageCount(tableData.length)
  );

  const [listFiltered, setListFiltered] = useState(
    slice(
      tableData,
      paginationParams.offset,
      paginationParams.offset + paginationParams.limit
    )
  );
  const [state, setState] = useState(Date.now());

  useEffect(() => {
    let list = tableData;
    if (
      filtersParams.name ||
      filtersParams.version ||
      filtersParams.producerName ||
      filtersParams.state
    ) {
      list = filter(
        list,
        (service) =>
          (!filtersParams.name ||
            toUpper(service.name) === toUpper(filtersParams.name)) &&
          (!filtersParams.version ||
            service.version === filtersParams.version) &&
          (!filtersParams.producerName ||
            service.producerName === filtersParams.producerName) &&
          (!filtersParams.state || includes(filtersParams.state, service.state))
      );
    }
    let totalPages = getTotalPageCount(list.length);
    list = slice(
      list,
      paginationParams.offset,
      paginationParams.offset + paginationParams.limit
    );
    if (!isEqual(list, listFiltered)) {
      setListFiltered(list);
      setTotalpages(totalPages);
      setState(Date.now());
    }
  }, [filtersParams, paginationParams]);

  return (
    <Grid container direction="column">
      <Grid item>
        <Filters {...handlers} />
      </Grid>
      <Grid item key={state}>
        <Table
          isEmpty={listFiltered.length === 0}
          headLabels={headLabels}
          noDataLabel="La ricerca non ha prodotto risultati"
        >
          {map(listFiltered, (data) => (
            <TableRow
              key={data.name}
              cellData={[
                data.name,
                data.version,
                data.producerName,
                <Chip
                  key={data.name}
                  label={data.state}
                  color={data.state === "online" ? "success" : "error"}
                />,
                data.date,
              ]}
            >
              <ButtonNaked size="small" color="primary">
                Approfondisci
              </ButtonNaked>
            </TableRow>
          ))}
        </Table>
      </Grid>
      <Grid item>
        <Pagination totalPages={totalPages} {...paginationProps} />
      </Grid>
    </Grid>
  );
};
export default MonitoringTable;
