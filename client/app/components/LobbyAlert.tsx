import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

interface props {
    isSuccess: boolean
}

export function LobbyAlert({isSuccess}: props) {
    const errorDescription = "Lobby not found or it's in progress!"
    const successDescription = "Connecting to lobby..."
    const severity = isSuccess ? "success" : "error";
    const description = isSuccess ? successDescription : errorDescription

    return (
        <Alert severity={severity}>
            <strong>{description}</strong>
        </Alert>
    )
}