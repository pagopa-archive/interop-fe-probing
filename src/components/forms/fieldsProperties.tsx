export interface IFieldProperties {
  name: string;
  label: string;
  type: string;
  size?: number;
  options?: ReadonlyArray<any>;
}

export const fieldsProperties: { [key: string]: IFieldProperties } = {
  eService: {
    name: "eService",
    label: "Cerca per nome e-service",
    type: "autocomplete",
    options: [
      { title: "Test 1", id: "aa5sw-ak73hd" },
      { title: "Test 2", id: "asxs-12sxa" },
    ],
    size: 3,
  },
  regulator: {
    name: "regulator",
    label: "Cerca per erogatore",
    type: "autocomplete",
    options: [
      { title: "Test 3", id: "aa5sw-ak73hd55" },
      { title: "Test 4", id: "asxs-12sxazaaa" },
    ],
    size: 3,
  },
  statusEService: {
    name: "statusEService",
    label: "Cerca per stato e-service",
    type: "select",
    options: [
      {
        label: "Option 1",
        id: "option1",
      },
      {
        label: "Option 2",
        id: "option2",
      },
    ],
    size: 3,
  },
};
