import { Chip, Grid } from "@mui/material";

interface IProps {
  tags: any[];
  deleteTag: Function;
}

// TODO: to be replaced with the chips component from mui italia
const Chips = ({ tags, deleteTag }: IProps) => {
  return (
    <Grid
      container
      sx={{
        pt: 2,
      }}
      spacing={1}
    >
      {tags.map((tag: any) => (
        <Grid item key={tag.id}>
          <Chip
            label={tag.title}
            onDelete={() => deleteTag(tag.id)}
            variant="outlined"
          />
        </Grid>
      ))}
    </Grid>
  );
};
export default Chips;
