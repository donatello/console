import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Button } from "mds";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Theme } from "@mui/material/styles";
import createStyles from "@mui/styles/createStyles";
import withStyles from "@mui/styles/withStyles";
import { deleteDialogStyles } from "../FormComponents/common/styleLibrary";
import { ButtonProps } from "../../types";

const styles = (theme: Theme) =>
  createStyles({
    ...deleteDialogStyles,
  });

type ConfirmDialogProps = {
  isOpen?: boolean;
  onClose: () => void;
  onCancel?: () => void;
  onConfirm: () => void;
  classes?: any;
  title: string;
  isLoading?: boolean;
  confirmationContent: React.ReactNode | React.ReactNode[];
  cancelText?: string;
  confirmText?: string;
  confirmButtonProps?: ButtonProps &
    React.ButtonHTMLAttributes<HTMLButtonElement>;
  cancelButtonProps?: ButtonProps &
    React.ButtonHTMLAttributes<HTMLButtonElement>;
  titleIcon?: React.ReactNode;
};

const ConfirmDialog = ({
  isOpen = false,
  onClose,
  onCancel,
  onConfirm,
  classes = {},
  title = "",
  isLoading,
  confirmationContent,
  cancelText = "Cancel",
  confirmText = "Confirm",
  confirmButtonProps = undefined,
  cancelButtonProps = undefined,
  titleIcon = null,
}: ConfirmDialogProps) => {
  return (
    <Dialog
      open={isOpen}
      onClose={(event, reason) => {
        if (reason !== "backdropClick") {
          onClose(); // close on Esc but not on click outside
        }
      }}
      className={classes.root}
      sx={{
        "& .MuiPaper-root": {
          padding: "1rem 2rem 2rem 1rem",
        },
      }}
    >
      <DialogTitle className={classes.title}>
        <div className={classes.titleText}>
          {titleIcon} {title}
        </div>
        <div className={classes.closeContainer}>
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={onClose}
            disableRipple
            size="small"
          >
            <CloseIcon />
          </IconButton>
        </div>
      </DialogTitle>

      <DialogContent className={classes.content}>
        {confirmationContent}
      </DialogContent>
      <DialogActions className={classes.actions}>
        <Button
          onClick={onCancel || onClose}
          disabled={isLoading}
          type="button"
          {...cancelButtonProps}
          variant="regular"
          id={"confirm-cancel"}
          label={cancelText}
        />
        <Button
          id={"confirm-ok"}
          onClick={onConfirm}
          label={confirmText}
          disabled={isLoading}
          variant={"secondary"}
          {...confirmButtonProps}
        />
      </DialogActions>
    </Dialog>
  );
};

export default withStyles(styles)(ConfirmDialog);
