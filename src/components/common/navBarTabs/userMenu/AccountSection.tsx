import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Avatar,
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Menu,
  MenuItem,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Logout from "@mui/icons-material/Logout";
import Settings from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import { useState } from "react";
import { useAuth } from "../../../../context/AuthContext";

const AccountSection = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { user, signOut } = useAuth();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleLogout = async () => {
    setAnchorEl(null);
    await signOut();
  };

  const displayName = user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email || "Guest";
  const firstLetter = displayName.charAt(0).toUpperCase() || "?";
  const avatarUrl = user?.user_metadata?.avatar_url || user?.user_metadata?.picture;

  if (isMobile) {
    // Small screen → Accordion inside Drawer
    return (
      <Accordion sx={{ mt: "auto", boxShadow: "none" }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Avatar src={avatarUrl} sx={{ width: 32, height: 32 }}>{firstLetter}</Avatar>
            <Typography variant="subtitle1">{displayName}</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <List dense>
            <ListItemButton>
              <ListItemIcon>
                <PersonIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItemButton>
            <Divider sx={{ my: 1 }} />
            <ListItemButton onClick={handleLogout}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </List>
        </AccordionDetails>
      </Accordion>
    );
  }

  // Large screen → Dropdown menu
  return (
    <Box>
      <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
        <Avatar src={avatarUrl} sx={{ width: 32, height: 32 }}>{firstLetter}</Avatar>
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
        <MenuItem onClick={() => setAnchorEl(null)}>
          <PersonIcon fontSize="small" style={{ marginRight: 8 }} />
          Profile
        </MenuItem>
        <MenuItem onClick={() => setAnchorEl(null)}>
          <Settings fontSize="small" style={{ marginRight: 8 }} />
          Settings
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <Logout fontSize="small" style={{ marginRight: 8 }} />
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default AccountSection;
