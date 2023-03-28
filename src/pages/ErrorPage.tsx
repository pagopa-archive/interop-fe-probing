import { Grid, Typography } from "@mui/material";

const Errorpage = () => {
  return (
    <Grid container direction="column" sx={{ height: "100%" }}>
      <Grid item sx={{ textAlign: "center" }} my={5}>
        <Typography
          sx={{ fontSize: "1.6em", fontWeight: "bold", color: "#17324D" }}
        >
          Cerchi qualcosa in particolare?
        </Typography>
        <Typography variant="body1" sx={{ color: "#17324D" }}>
          L’indirizzo inserito corrisponde ad una pagina non presente sul nostro
          sito.
        </Typography>
      </Grid>
    </Grid>
  );
};
export default Errorpage;
