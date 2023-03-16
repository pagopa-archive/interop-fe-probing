import {
  TextField,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { fieldsProperties } from "./fieldsProperties";

export const createField = (field: string, onChange: any, value: string) => {
  const fieldProperties = fieldsProperties[field];
  const componentType: string = fieldProperties.type;
  return (
    <Grid item container>
      {componentType === "input" && (
        <FormControl sx={{ width: "100%" }}>
          <TextField
            fullWidth
            id={fieldProperties.name}
            label={fieldProperties.label}
            variant="outlined"
            onChange={onChange}
            size="small"
          />
        </FormControl>
      )}

      {componentType === "select" && (
        <FormControl sx={{ width: "100%" }} size="small">
          <InputLabel id={fieldProperties.name}>
            {fieldProperties.label}
          </InputLabel>
          <Select
            labelId={fieldProperties.label}
            id={fieldProperties.label}
            label={fieldProperties.label}
            onChange={onChange}
            value={value}
          >
            {fieldProperties.selectItems?.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </Grid>
  );
};
