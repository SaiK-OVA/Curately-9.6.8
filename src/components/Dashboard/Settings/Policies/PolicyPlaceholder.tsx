// PolicyPlaceholders.tsx
import React, { useState } from 'react';
import { Box, Popover, IconButton } from '@mui/material';
import DataObjectIcon from '@mui/icons-material/DataObject';

interface PolicyPlaceholdersProps {
    onInsertField: (field: string) => void;
    policyPlaceholderData?: any;
}

const defaultPolicyPlaceholderData = {
    "Policy Info": [
        { viewfieldname: "Policy Link" },
        // { viewfieldname: "Terms and conditions", columnvalue: "Terms and conditions" },
    ],
};

const PolicyPlaceholders: React.FC<PolicyPlaceholdersProps> = ({ onInsertField, policyPlaceholderData }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const isOpen = Boolean(anchorEl);
    const data = policyPlaceholderData || defaultPolicyPlaceholderData;

    const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton onClick={handleOpen} title="Policy Placeholders">
                <DataObjectIcon sx={{ color: '#444' }} />
            </IconButton>
            <Popover
                id="policy-placeholders-popover"
                open={isOpen}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
            >
                <Box p={2}>
                    {/* <Typography variant="subtitle1">Policy Placeholders</Typography> */}
                    {Object.keys(data).map((category, index) => (
                        <Box key={index} mt={1}>
                            {/* <Box>
                <Typography variant="subtitle1" className="mt-1 mb-1 categoryName" >
                {category}
              </Typography>
                </Box> */}

                            {data[category].map((item: any, idx: number) => (
                                <Box
                                    key={idx}
                                    sx={{
                                        m: 0.5,
                                        p: 0.5,
                                        borderRadius: 1,
                                        backgroundColor: '#f0f0f0',
                                        cursor: 'pointer'
                                    }}
                                    onClick={() => {
                                        onInsertField(item.viewfieldname);
                                        handleClose();
                                    }}

                                >
                                    {`{{${item.viewfieldname}}}`}
                                </Box>
                            ))}
                        </Box>
                    ))}
                </Box>

            </Popover>
        </div>
    );
};

export default PolicyPlaceholders;

