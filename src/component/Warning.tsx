import { Box, Typography, Button } from "@mui/material";

interface WarningProps {
  message: string;
  handleClose: () => void;
  handleAction: () => void;
  isLoading: boolean;

}

const Warning: React.FC<WarningProps> = ({
  message,
  handleClose,
  handleAction,
  isLoading,
}) => {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff3cd",
          border: "1px solid #ffeeba",
          color: "#856404",
          padding: "2rem",
          borderRadius: "0.5rem",
          boxShadow: 3,
          textAlign: "center",
        }}
      >
        <Typography variant="h6" component="h2" sx={{ marginBottom: 2 }}>
          Warning
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 3 }}>
          {message}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            width: "100%",
          }}
        >
          <Box sx={{ width: "45%" }}>
            <Button
              variant="outlined"
              color="inherit"
              onClick={handleClose}
              fullWidth
            >
              Close
            </Button>
          </Box>
          <Box sx={{ width: "45%" }}>
            <Button
              variant="contained"
              color="warning"
              onClick={handleAction}
              disabled={isLoading}
              fullWidth
            >
              {isLoading ? "Loading..." : "Confirm"}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Warning;