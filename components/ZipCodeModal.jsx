import {
    Modal,
    Box,
    Button,
    Typography,
    TextField,
} from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";


export default function ZipCodeModal({ open, handleClose }) {
    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        // border: "2px solid #000",
        boxShadow: 24,
        outline: 0,
        py: 2,
        px: 4,
    };

    const [zipCode, setZipCode] = useState("");
    const router = useRouter();

    const zipCodeHandler = () => {
        if (zipCode) {
            router.push(`/products?zipCode=${zipCode}`);
            handleClose();
        }
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h8" component="h2">
                    Please enter your zip code
                </Typography>
                <Box sx={{
                    margin: "10px 0",
                    display: "flex",
                }}>
                    <TextField
                        fullWidth
                        size="small"
                        label="Enter Zip Code Here"
                        id="fullWidth"
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                    />
                    <Button variant="contained"
                        onClick={zipCodeHandler}
                        sx={{ margin: "0 10px", width: 120 }}>
                        Update
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}