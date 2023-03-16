interface IFieldProperties {
  name: string;
  label: string;
  type: string;
  size?: number;
  selectItems?: [];
}

export const fieldsProperties: { [key: string]: IFieldProperties } = {
  eService: {
    name: "eService",
    label: "E-Service",
    type: "input",
    size: 3,
  },
  version: {
    name: "version",
    label: "Versione",
    type: "input",
    size: 2,
  },
  statusEService: {
    name: "statusEService",
    label: "Stato E-Service",
    type: "select",
    selectItems: [],
    size: 3,
  },
  statusProbing: {
    name: "statusProbing",
    label: "Stato Probing",
    type: "select",
    size: 3,
  },
};
