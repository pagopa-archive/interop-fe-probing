import { Grid, Card } from "@mui/material";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { fieldsProperties } from "../fieldsProperties";
import _ from "lodash";
import { AppField } from "../appField";
import Chips from "../../chips/chips";

/**
 * default values of the form fields
 */
const defaultFormValues: { [key: string]: any } = {
  eService: [],
  regulator: [],
  statusEService: "",
  statusProbing: "",
};

/**
 * form fields
 */
const fields = ["eService", "regulator", "statusEService"];

const MonitoraggioSearchForm = () => {
  const [tags, setTags]: any[] = useState([]);
  /**
   * form functionalities from react-hook-forms
   */
  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
    setValue,
    watch,
  } = useForm({
    defaultValues: defaultFormValues,
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  /**
   * delete tags from the search
   */
  const deleteTag = (id: string) => {
    console.log(getValues(["eService", "regulator"]));
    let tagsArray = tags;
    tagsArray = _.remove(tagsArray, (tag: any) => tag.id !== id);
    setTags(tagsArray);
    // delete also from autocompletes values from the arrays
    setValue(
      "eService",
      _.remove(getValues("eService"), (item: any) => item.id !== id)
    );
    setValue(
      "regulator",
      _.remove(getValues("regulator"), (item: any) => item.id !== id)
    );
  };

  return (
    <>
      <Card
        elevation={0}
        sx={{
          boxShadow: "0px 1px rgba(0,0,0,0.12)",
        }}
      >
        <form>
          <Grid
            container
            direction="row"
            spacing={2}
            alignItems="center"
            sx={{
              py: 2,
            }}
          >
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
                    return (
                      <AppField
                        field={fieldsProperties[field]}
                        onChange={(value: any) => {
                          if (fieldsProperties[field].type === "autocomplete") {
                            let newTags = [...tags, _.last(value)];
                            newTags = _.uniqWith(newTags, _.isEqual);
                            setTags(newTags);
                          }
                          onChange(value);
                        }}
                        value={value}
                      />
                    );
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </form>
      </Card>
      <Chips tags={tags} deleteTag={deleteTag} />
    </>
  );
};
export default MonitoraggioSearchForm;
