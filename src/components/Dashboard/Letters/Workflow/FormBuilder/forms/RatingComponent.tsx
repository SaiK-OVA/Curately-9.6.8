import {Box} from '../../../../../../shared/modules/MaterialImports/Box';
import StarBorderIcon from '@mui/icons-material/StarBorder';
const RatingComponent = () => {
    return (
        <Box sx={{ display: "flex", justifyContent: "space-between", width: "34%", mt: 3 }}>
            <StarBorderIcon sx={{ fontSize: "28px", cursor: 'pointer', color: "#1565c0" }} />
            <StarBorderIcon sx={{ fontSize: "28px", cursor: 'pointer', color: "#1565c0" }} />
            <StarBorderIcon sx={{ fontSize: "28px", cursor: 'pointer', color: "#1565c0" }} />
            <StarBorderIcon sx={{ fontSize: "28px", cursor: 'pointer', color: "#1565c0" }} />
            <StarBorderIcon sx={{ fontSize: "28px", cursor: 'pointer', color: "#1565c0" }} />
        </Box>
    )
}

export default RatingComponent