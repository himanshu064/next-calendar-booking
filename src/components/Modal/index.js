import React from "react";
import {
  Box,
  Stack,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  useMediaQuery,
  useTheme,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const MUIDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const Modal = ({
  open,
  setOpen,
  size,
  title,
  hideFooter,
  closeOnBackdrop,
  closeOnEscapeKeyDown,
  children,
  footer,
  onConfirm,
  minHeight = 75,
}) => {
  const theme = useTheme();
  const isMobileScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [fullScreen, setFullScreen] = React.useState(false);
  const handleClose = (_, reason) => {
    if (reason === "backdropClick") {
      if (!closeOnBackdrop) {
        return;
      }
    }
    setOpen(false);
  };

  const isFullScreen = isMobileScreen ? true : fullScreen;

  return (
    <MUIDialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      fullWidth
      fullScreen={isFullScreen}
      maxWidth={size}
      sx={{
        "& .MuiDialogContent-root": {
          padding: "0 !important",
          overflow: "hidden",
          borderBottom: hideFooter ? "none" : undefined,
        },
      }}
      disableEscapeKeyDown={!closeOnEscapeKeyDown}
    >
      <DialogTitle sx={{ m: 0, px: 1, py: 1 }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box sx={{ width: "calc(100% - 96px)" }}>
            <Typography
              variant="subtitle1"
              sx={{
                width: "100%",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                fontWeight: 500,
                paddingLeft: "10px",
              }}
            >
              {title}
            </Typography>
          </Box>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-end"
            sx={{
              width: "80px",
            }}
          >
            {!isMobileScreen && (
              <IconButton
                onClick={() => setFullScreen(!fullScreen)}
                sx={{
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                {fullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
              </IconButton>
            )}
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </Stack>
        </Stack>
      </DialogTitle>
      <DialogContent
        dividers
        sx={{
          overflowY: "auto !important",
        }}
      >
        <Box
          sx={{
            minHeight: `${minHeight}vh`,
            maxHeight: "100%",
            overflow: "auto",
            padding: 2,
          }}
        >
          {children}
        </Box>
      </DialogContent>
      {!hideFooter && !footer && (
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Disagree</Button>
          <Button onClick={onConfirm}>Agree</Button>
        </DialogActions>
      )}
      {footer && <DialogActions>{footer}</DialogActions>}
    </MUIDialog>
  );
};

export default Modal;
