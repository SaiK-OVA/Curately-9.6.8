import { CheckBoxRounded, FilterAltOutlined, FilterAltRounded, IndeterminateCheckBoxRounded } from "@mui/icons-material";
import { Grid } from "../../../shared/modules/commonImports";
import { Button } from "../../../shared/modules/MaterialImports/Button";
import { Divider } from "../../../shared/modules/MaterialImports/Divider";
import { Checkbox } from "../../../shared/modules/MaterialImports/FormElements";
import { FormControlLabel } from "../../../shared/modules/MaterialImports/FormInputs";
import { List, ListItem } from "../../../shared/modules/MaterialImports/List";
import { Menu } from "../../../shared/modules/MaterialImports/Menu";
import { Stack } from "../../../shared/modules/MaterialImports/Stack";
import { Typography } from "../../../shared/modules/MaterialImports/Typography";
import { React, useEffect, useMemo, useRef, useState } from "../../../shared/modules/React";
import "./TableHeaderFilter.scss";

interface ITableHeaderFilter {
    title: string;
    columnFilter: string;
    setColumnFilter: (value: string) => void;
    options: any[];
    optionKeys: { id: string, label: string };
}

const TableHeaderFilter = React.memo(({ title, columnFilter, setColumnFilter, options, optionKeys }: ITableHeaderFilter) => {
    const [openModal, setOpenModal] = useState(false);
    const modalRef = useRef(null);
    const [filterValue, setFilterValue] = useState(columnFilter);

    useEffect(() => {
        setFilterValue(columnFilter)
    }, [columnFilter]);

    useEffect(() => {
        if (!openModal) {
            setFilterValue(columnFilter)
        }
    }, [openModal])

    const isAllSelected = useMemo((): boolean | "partial" => {
        if (["", undefined, null].includes(filterValue)) {
            return false;
        }

        const values = filterValue.split(",");
        if (options.length === values.length) {
            return true
        } else if (!!values?.length) {
            return "partial"
        } else return false;
    }, [filterValue])

    const handleSelectAllChange = () => {
        if ([false, "partial"].includes(isAllSelected)) {
            let tempValue = options.map((each) => each[optionKeys.id]);
            setFilterValue(tempValue.join(","));
        } else {
            setFilterValue("");
        }
    }

    const handleOptionSelect = (optionValue: any) => {
        if (["", null, undefined].includes(filterValue)) {
            setFilterValue(optionValue);
        } else {
            let values = filterValue.split(",");
            if (values.includes(optionValue)) {
                const index = values.findIndex((each) => each === optionValue)
                values.splice(index, 1);
            } else values.push(optionValue);
            setFilterValue(values.join(","));
        }
    }

    return (
        <div id="TableHeaderFilter">
            <Button
                size='small'
                onClick={() => setOpenModal(true)}
                disableElevation
                disableRipple
                startIcon={columnFilter ? <FilterAltRounded /> : <FilterAltOutlined />}
                ref={modalRef}
            >{title}</Button>
            <Menu
                open={openModal}
                onClose={() => setOpenModal(false)}
                anchorEl={modalRef.current}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                transformOrigin={{ vertical: "top", horizontal: "left" }}
                slotProps={{
                    paper: {
                        sx: {
                            overflow: "auto", maxHeight: '24rem', pt: 0
                        }
                    }
                }}
            >
                <Stack className="header-filter-container">
                    <FormControlLabel
                        label={"Select all"}
                        control={<Checkbox
                            checked={[true, "partial"].includes(isAllSelected)}
                            size="small"
                            checkedIcon={(isAllSelected === "partial") ? <IndeterminateCheckBoxRounded /> : <CheckBoxRounded />}
                        />}
                        onChange={handleSelectAllChange}
                        sx={{ px: 2 }}
                    />
                    <Divider />

                    {!!options?.length ?
                        <List disablePadding sx={{ px: 2 }}>
                            {options && options.map((each: any, index: number) => (
                                <ListItem key={index}>
                                    <FormControlLabel
                                        id={each[optionKeys.id]}
                                        name={each[optionKeys.id]}
                                        label={each[optionKeys.label]}
                                        control={<Checkbox
                                            size='small'
                                            checked={filterValue.includes(each[optionKeys.id])}
                                        />}
                                        onChange={() => handleOptionSelect(each[optionKeys.id])}
                                    />
                                </ListItem>))}
                        </List>
                        :
                        <Typography color="textDisabled" textAlign={"center"} p={"0.5rem 1.25rem"}>No filters found</Typography>
                    }

                    <Divider />
                    <Grid container size={12} px={2} mt={1} spacing={1}>

                        <Grid size={6}>
                            <Button
                                variant="outlined"
                                color="secondary"
                                size="small"
                                fullWidth
                                onClick={() => {
                                    setColumnFilter("");
                                    setFilterValue("");
                                    setOpenModal(false);
                                }}
                            >Reset</Button>
                        </Grid>

                        <Grid size={6}>
                            <Button
                                variant="contained"
                                color="primary" size="small"
                                fullWidth
                                onClick={() => {
                                    setColumnFilter(filterValue);
                                    setOpenModal(false)
                                }}>Apply</Button>
                        </Grid>

                    </Grid>
                </Stack>
            </Menu>
        </div>
    )
});

export default TableHeaderFilter;