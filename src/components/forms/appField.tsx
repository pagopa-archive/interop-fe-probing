import { Autocomplete } from "@mui/material";
import {
  TextField,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { IFieldProperties } from "./fieldsProperties";
import SearchIcon from "@mui/icons-material/Search";
import { autocompleteClasses } from "@mui/material/Autocomplete";
import _ from "lodash";

interface IProps {
  field: IFieldProperties;
  onChange: any;
  value: any;
}

/**
 * Generating different components by specific properties
 * @component
 * @param {Props} props
 */
export const AppField = ({ field, onChange, value }: IProps) => {
  return (
    <Grid item container>
      {field.type === "autocomplete" && (
        <FormControl sx={{ width: "100%" }}>
          <Autocomplete
            value={value}
            renderTags={() => null}
            multiple
            size="small"
            id={field.name}
            options={field.options ?? []}
            getOptionLabel={(option) => {
              return option.title;
            }}
            onChange={(e, newValue) => {
              // to not add the same values nevermind if they are selected
              const uniqueValue = _.uniqWith(newValue, _.isEqual);
              onChange(uniqueValue);
            }}
            popupIcon={<SearchIcon />}
            sx={{
              [`& .${autocompleteClasses.popupIndicatorOpen}`]: {
                transform: "none",
              },
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                label={field.label}
                variant="outlined"
              />
            )}
          />
        </FormControl>
      )}

      {field.type === "select" && (
        <FormControl sx={{ width: "100%" }} size="small">
          <InputLabel id={FileSystemDirectoryHandle.name}>
            {field.label}
          </InputLabel>
          <Select
            displayEmpty
            labelId={field.label}
            id={field.label}
            label={field.label}
            onChange={onChange}
            value={value}
          >
            {field.options?.map((item) => (
              <MenuItem key={item.id} value={item.label}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </Grid>
  );
};
