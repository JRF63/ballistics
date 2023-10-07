import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Toolbar from "@mui/material/Toolbar";

// import Grid from "@mui/material/Unstable_Grid2";
// import { GridTextFieldWithUnits } from "./GridTextFieldWithUnits";

export default function TrajectoryCalculatorInputs() {
  return (
    <>
      <Toolbar />

      <FormControl fullWidth>
        <FormLabel id="drag-function-group-label">Drag function</FormLabel>
        <RadioGroup
          row
          aria-labelledby="drag-function-group-label"
          name="row-radio-buttons-group"
          defaultValue="G7"
        >
          <FormControlLabel value="G1" control={<Radio />} label="G1" />
          <FormControlLabel value="G7" control={<Radio />} label="G7" />
          <FormControlLabel
            value="Custom"
            disabled
            control={<Radio />}
            label="Custom"
          />
        </RadioGroup>
      </FormControl>

      {/* <Grid container spacing={0.5}>
        <GridTextFieldWithUnits></GridTextFieldWithUnits>
      </Grid> */}
    </>
  );
}

// import Divider from "@mui/material/Divider";
// import InboxIcon from "@mui/icons-material/MoveToInbox";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import MailIcon from "@mui/icons-material/Mail";
// import Toolbar from "@mui/material/Toolbar";

// export default function TrajectoryCalculatorInputs() {
//   return (
//     <div>
//       <Toolbar />
//       <Divider />
//       <List>
//         {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
//           <ListItem key={text} disablePadding>
//             <ListItemButton>
//               <ListItemIcon>
//                 {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//               </ListItemIcon>
//               <ListItemText primary={text} />
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List>
//       <Divider />
//       <List>
//         {["All mail", "Trash", "Spam"].map((text, index) => (
//           <ListItem key={text} disablePadding>
//             <ListItemButton>
//               <ListItemIcon>
//                 {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//               </ListItemIcon>
//               <ListItemText primary={text} />
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List>
//     </div>
//   );
// }
