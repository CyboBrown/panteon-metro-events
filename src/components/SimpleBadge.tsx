import * as React from 'react';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SimplePopup from './SimplePopup';
import { ClickAwayListener } from "@mui/material";

interface SimpleBadgeProps {
  notifNumber: number;
  callBackClearNotif: () => void;
  notifList: any;
}

const SimpleBadge: React.FC<SimpleBadgeProps> = ({ notifNumber, callBackClearNotif, notifList }) => {

  const [anchor, setAnchor] = React.useState<null | HTMLElement>(null);

  //closes popup at onClickAway listener
  const closePopUp = () => {
    setAnchor(null)
  }

  //Popup event
  const onClickHandler = (event: any) => {
    setAnchor(anchor ? null : event.currentTarget);
    callBackClearNotif();
    console.log("Notification Clicked");
  }

  //Tied to setAnchor, sends data to popup component to spawn popup at location. See ".SimplePopup"
  const open = Boolean(anchor);
  const id = open ? 'simple-popup' : undefined;

  return (
    <ClickAwayListener onClickAway={closePopUp}>
      <Badge badgeContent={notifNumber} color='secondary' sx={{ marginRight: 2}}>
        <NotificationsIcon onClick={onClickHandler} sx={{ cursor: 'pointer' }}/>
        <SimplePopup anchor={anchor} open={open} id={id} notifList={notifList}/>
      </Badge>
    </ClickAwayListener>
  );
}

export default SimpleBadge;