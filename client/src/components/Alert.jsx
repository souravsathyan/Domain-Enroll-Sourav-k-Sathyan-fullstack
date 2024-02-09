import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Alert from '@mui/material/Alert';

const AlertComponent = ({setIsSuccess}) => {
  return(
    <Collapse in={open}>
  <Alert
    action={
      <IconButton
        aria-label="close"
        color="inherit"
        size="small"
        onClick={() => {
          setIsSuccess(null);
        }}
      >
        <CloseIcon fontSize="inherit" />
      </IconButton>
    }
    sx={{ mb: 2 }}
  >
    Product Added Successfully
  </Alert>
  </Collapse>
  )
}

export default AlertComponent