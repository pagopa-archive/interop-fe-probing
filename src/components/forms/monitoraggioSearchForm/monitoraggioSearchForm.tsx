import { Button, Grid, Typography, Card } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { createField } from "../createField";
import { fieldsProperties } from "../fieldsProperties";

/**
 * default values of the form fields
 */
const defaultFormValues: { [key: string]: string } = {
  eService: "",
  version: "",
  statusEService: "",
  statusProbing: "",
};

const MonitoraggioSearchForm = () => {
  /**
   * form fields
   */
  const fields = ["eService", "version", "statusEService", "statusProbing"];

  /**
   * form functionalities from react-hook-forms
   */
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: defaultFormValues,
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const onSubmit = (data: { [x: string]: string }) => {
    console.log(data);
  };

  return (
    <Card
      elevation={0}
      sx={{
        padding: "1%",
        boxShadow: "none",
        backgroundColor: "background.paper",
      }}
    >
      <form onSubmit={handleSubmit((data) => onSubmit(data))}>
        <Grid container direction="row" spacing={2} alignItems="center">
          {fields.map((field) => (
            <Grid
              item
              key={field}
              xs={12}
              lg={fieldsProperties[field].size}
              xl={fieldsProperties[field].size}
              sx={{ pr: 0 }}
            >
              <Controller
                control={control}
                name={field}
                render={({
                  field: { onChange, onBlur, value, name, ref },
                  fieldState: { invalid, isTouched, isDirty, error },
                  formState,
                }) => {
                  return createField(field, onChange, value);
                }}
              />
            </Grid>
          ))}

          <Grid item lg={1} xl={1} xs={12}>
            <Button
              sx={{
                backgroundColor: "primary.main",
                "&:hover": { backgroundColor: "primary.dark" },
              }}
              fullWidth
              size="small"
              type="submit"
              variant="outlined"
            >
              <Typography sx={{ color: "white" }}>Cerca</Typography>
            </Button>
          </Grid>
        </Grid>
      </form>
    </Card>
  );
};
export default MonitoraggioSearchForm;
