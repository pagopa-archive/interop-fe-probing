import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import _ from "lodash";

const listItems = [
  {
    title: "Probing",
    type: "dropdown",
    subitems: [
      {
        title: "Monitoraggio",
        url: "/monitoraggio",
        active: true,
      },
      {
        title: "Some other page",
        url: "/monitoraggio",
        active: false,
      },
    ],
  },
  {
    title: "Tracing",
    type: "dropdown",
    subitems: [
      {
        title: "Monitoraggio",
        url: "/monitoraggio",
        active: false,
      },
    ],
  },
];

const Sidebar = () => {
  return (
    <Drawer
      sx={{
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
          position: "inherit !important",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <List>
        {listItems.map((item, index) => {
          if (item.type === "dropdown") {
            return (
              <Accordion
                key={item.title}
                elevation={0}
                sx={
                  _.some(item.subitems, ["active", true])
                    ? {
                        "&:before": {
                          display: "none",
                        },
                        "& .Mui-expanded": {
                          color: "#0073E6",
                        },
                      }
                    : {
                        "&:before": {
                          display: "none",
                        },
                      }
                }
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography
                    sx={
                      _.some(item.subitems, ["active", true])
                        ? { fontWeight: "bold" }
                        : null
                    }
                  >
                    {item.title}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <List>
                    {item.subitems.map((subitem, index) => (
                      <ListItem
                        key={subitem.title}
                        disablePadding
                        sx={
                          subitem.active
                            ? { "color": "#0073E6" }
                            : { "color": "black" }
                        }
                      >
                        <ListItemButton>
                          <ListItemText>
                            <Box
                              sx={
                                subitem.active ? { fontWeight: "bold" } : null
                              }
                            >
                              {subitem.title}
                            </Box>
                          </ListItemText>
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </AccordionDetails>
              </Accordion>
            );
          } else {
            return (
              <ListItem key={item.title} disablePadding>
                <ListItemButton>
                  <ListItemText primary={item.title} />
                </ListItemButton>
              </ListItem>
            );
          }
        })}
      </List>
    </Drawer>
  );
};
export default Sidebar;
