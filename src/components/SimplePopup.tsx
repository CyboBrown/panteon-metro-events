import * as React from "react";
import { Unstable_Popup as BasePopup } from "@mui/base/Unstable_Popup";
import { styled } from "@mui/system";
import { ListItemText, Typography, ListItem, ButtonBase } from "@mui/material";
import { List } from "@mui/material";
import { Divider } from "@mui/material";


interface SimplePopupProp {
  anchor: any;
  open: any;
  id: any;
  notifList: any;
}

const SimplePopup: React.FC<SimplePopupProp> = ({ anchor, open, id, notifList }) => {

  //Some code subject to change and deletion
  
  //   const [anchor, setAnchor] = React.useState<null | HTMLElement>(null);

  //   const handleClick = (event: React.MouseEvent<HTMLElement>) => {
  //     setAnchor(anchor ? null : event.currentTarget);
  //   };

  //   const open = Boolean(anchor);
  //   const id = open ? 'simple-popup' : undefined;

  return (
    <div>
        <BasePopup 
        id={id}
        open={open} 
        anchor={anchor} 
        placement="bottom-end"
        >
          <PopupBody>
            <List sx={{ width: 250, maxHeight: 400, overflow: 'auto', bgcolor: 'background.paper' }}>
            {//map out notifList from ".Home.tsx"
            //Subject to change, scroll wheel and styling css
            notifList.map((curr: any, index: any) => (
              <React.Fragment key={index}>
                <ListItem 
                  alignItems="flex-start"
                  sx={{ 
                    cursor: 'pointer',
                    '&:hover': {
                      boxShadow: '0 0 10px 0 rgba(0,0,0,0.3)'
                    }
                  }}
                  >
                  <ListItemText
                    sx={{ maxHeight: 400 }}
                    primary={curr.title}
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="body2"
                          color="text.primary">
                            {curr.description}
                        </Typography>
                      </React.Fragment>
                    }>
                  </ListItemText>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
            </List>
          </PopupBody>
        </BasePopup>
    </div>
  );
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const PopupBody = styled("div")(
  ({ theme }) => `
  width: max-content;
  padding: 12px 16px;
  margin: 8px;
  border-radius: 8px;
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  background-color: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  box-shadow: ${
    theme.palette.mode === "dark"
      ? `0px 4px 8px rgb(0 0 0 / 0.7)`
      : `0px 4px 8px rgb(0 0 0 / 0.1)`
  };
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 500;
  font-size: 0.875rem;
  z-index: 1;
`
);

export default SimplePopup;
