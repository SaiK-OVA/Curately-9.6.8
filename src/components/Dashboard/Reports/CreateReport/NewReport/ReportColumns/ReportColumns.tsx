import { useContext, FC  } from "react";
import { useMemo, useEffect, useState } from "../../../../../../shared/modules/React";
import {
	useMaterialReactTable,
	type MRT_ColumnDef,
	type MRT_Row,
	MRT_TableContainer,
} from "material-react-table";
import ClearIcon from "@mui/icons-material/Clear";
import {TextField,FormControlLabel} from "../../../../../../shared/modules/MaterialImports/FormInputs";
import {MenuItem} from "../../../../../../shared/modules/MaterialImports/Menu";
// import ButtonGroup from "@mui/material/ButtonGroup";
import {Typography} from "../../../../../../shared/modules/MaterialImports/Typography";
import {Tooltip} from "../../../../../../shared/modules/MaterialImports/ToolTip";
import "./ReportColumns.scss";
// import { useDroppable } from "@dnd-kit/core";
import "../NewReport.scss";
// import { CSS } from "@dnd-kit/utilities";
import {Grid,Button}  from "../../../../../../shared/modules/commonImports";
// import Box from "@mui/material/Box";
import {Checkbox} from "../../../../../../shared/modules/MaterialImports/FormElements";

import { addDynamicGroup as addGroup } from "../AddDynamicReport";
import { summaryFunctionList, optionalFunctionList } from "../AddDynamicReport";
import { DynamicReportStore } from "../../CreateReport";
import { DynamicFieldStore } from "../../CreateReport";
import { DndProvider, useDrag, useDrop } from 'react-dnd';
// import { Store } from '../../CreateReport';

import './ReportColumns.scss';

interface IColumnDropable {
	id: string;
	//items: addGroup["columns"] | any;
	//  onCallback: (updatedColumnObjects: addGroup["columns"][]) => void;
}

const ReportColumns: FC<IColumnDropable> = ({ id }) => {
	// const { id, items } = props;
	// const { setNodeRef } = useDroppable({
	// 	id,
	// });
	const [cartItems, setCartItems] = useState<any>([]);
	const [dataFieldList, setDataFieldLsit] = useContext(DynamicFieldStore);
	const [, drop] = useDrop({
		accept: 'LIST_ITEM',
		drop: (e: React.DragEvent<HTMLDivElement>) => {
			// console.log('event',e)

			const newItem = e?.data?.title;
			// alert(e.over?.id);
			// if (e.over?.id !== "rptGroups" || !newItem) return;

			if (id === "rptColumns") {

				let maxValue = 0;
				const temp1 = [...addDynamicList];
				temp1[0].columns.map((el: any) => {
					const valueFromObject = el.id;
					maxValue = Math.max(maxValue, valueFromObject);
				});

				let idval = (temp1[0].columns.length > 0) ? maxValue + 1 : 1;
				let CtValue = "true";
				const nextShapes = dataFieldList.map((dlist: any) => {
					dlist.columns.map((innerdlist: any) => {
						if (innerdlist.displayName === newItem) {
							const newState = addDynamicList[0].columns.map((obj: any) => {
								if (obj.displayName === innerdlist.displayName) {
									CtValue = "false";
									idval = obj.id;
								}
								return obj;
							});

							if (CtValue === "true") {
								const newItem1 = {
									id: idval.toString(), module_id: innerdlist.moduleName, tablename: innerdlist.moduleName, dataFieldName: innerdlist.columnName,
									displayName: innerdlist.displayName,
									displayNameToShow: innerdlist.displayName,
									sortenabled: "false", sortorder: "ASC", columnType: innerdlist.columnType, summaryFunction: "", optionalFunctionValue: "",
									optionalFunction: [{
										substring: { starting_Point: "", length_of_String: "" },
										left: { Number_of_characters_from_left: "" },
										right: { Number_of_characters_from_right: "" },
										dateFormat: ""
									}], SuppressDuplicates: "true",
									WordWrap: "true",
									ColumnWidth: "auto",
									formula: (innerdlist.formula) ? innerdlist.formula : "",
									separator: (innerdlist.separator) ? innerdlist.separator : "",
									json: (innerdlist.json) ? innerdlist.json : "",
								};
								temp1[0].columns.push(newItem1);
							}
						}
					});
				});
				//  setAddDynamicList(temp1);
				setTimeout(() => {
					setAddDynamicList(temp1);
				}, 200);
				//            // console.log(addDynamicList);
			}
			//             setAddBoolean(true);
			const temp = [...cartItems];
			setCartItems(temp);
		}
		//   setTableItems((prevItems) => [...prevItems, newItem]);
	},
	)

	// const [updatedObjects, setUpdatedObjects] = useState<addGroup["columns"]>();
	//   const [data, setData] = useState<any>([]);
	// const [dynamicSummaryList, setDynamicSummaryList] = useState<any>([]);
	const [addDynamicList, setAddDynamicList] = useContext(DynamicReportStore);
	const [data, setData] = useState<addGroup["columns"][]>(
		addDynamicList[0].columns
	);

	useEffect(() => {
		const temp1 = [...addDynamicList];
		const mutationOfData = addDynamicList[0].columns.map((row: any) => {
			return row;
		});
		temp1[0].columns = mutationOfData;
		// setAddDynamicList(temp1);
	}, [addDynamicList[0].columns, addDynamicList[0].columns.length]);

	const handleJSONUpdate = (
		e: any,
		id: any,
		field: keyof addGroup["columns"]
	) => {
		// Update the data when the input changes
		const temp1 = [...addDynamicList];
		const updatedData = addDynamicList[0].columns.map((row: any) => {
			if (row.id === id) {
				return { ...row, [field]: e.target.value };
			}
			return row;
		});
		temp1[0].columns = updatedData;
		setAddDynamicList(temp1);
	};

	const handleSubstringJSONUpdate = (
		e: any,
		id: any,
		field: keyof addGroup["columns"]["optionalFunction"][0]["substring"]
	) => {
		// Update the data when the input changes
		const temp1 = [...addDynamicList];
		const updatedData = addDynamicList[0].columns.map((row: any) => {
			if (row.id === id) {
				return {
					...row,
					optionalFunction: {
						...row.optionalFunction,
						[0]: {
							...row.optionalFunction[0],
							substring: {
								...row.optionalFunction[0].substring,
								[field]: e.target.value,
							},
						},
					},
				};
			}
			return row;
		});
		temp1[0].columns = updatedData;
		setAddDynamicList(temp1);
	};

	const handleLeftJSONUpdate = (
		e: any,
		id: any,
		field: keyof addGroup["columns"]["optionalFunction"][0]["left"]
	) => {
		// Update the data when the input changes
		const temp1 = [...addDynamicList];
		const updatedData = addDynamicList[0].columns.map((row: any) => {
			if (row.id === id) {
				return {
					...row,
					optionalFunction: {
						...row.optionalFunction,
						[0]: {
							...row.optionalFunction[0],
							left: {
								...row.optionalFunction[0].left,
								[field]: e.target.value,
							},
						},
					},
				};
			}
			return row;
		});
		temp1[0].columns = updatedData;
		setAddDynamicList(temp1);
	};

	const handleRightJSONUpdate = (
		e: any,
		id: any,
		field: keyof addGroup["columns"]["optionalFunction"][0]["right"]
	) => {
		// Update the data when the input changes
		const temp1 = [...addDynamicList];
		const updatedData = addDynamicList[0].columns.map((row: any) => {
			if (row.id === id) {
				return {
					...row,
					optionalFunction: {
						...row.optionalFunction,
						[0]: {
							...row.optionalFunction[0],
							right: {
								...row.optionalFunction[0].right,
								[field]: e.target.value,
							},
						},
					},
				};
			}
			return row;
		});
		temp1[0].columns = updatedData;
		setAddDynamicList(temp1);
	};

	const removeRowTable = (id: any) => {
		const temp1 = [...addDynamicList];
		const updatedData = addDynamicList[0].columns.filter((todo: any) => {
			return todo.id !== id;
		});
		temp1[0].columns = updatedData;
		setAddDynamicList(temp1);
	};

	const columns = useMemo(
		() =>
			[
				{
					accessorKey: "id",
					header: "ID",
					size: 50,
				},
				{
					accessorKey: "module_id",
					header: "Module",
				},
				{
					accessorKey: "displayNameToShow",
					header: "Data Field Name",
				},
				{
					accessorKey: "displayName",
					header: "Display Name",
					Cell: ({ renderedCellValue, row }) => (
						<span>
							<TextField
								fullWidth
								id={`displayName-${row.original.id}`}
								name={`displayName-${row.original.id}`}
								size="small"
								value={row.original.displayName}
								onChange={e =>
									handleJSONUpdate(e, row.original.id, "displayName")
								}
							/>
						</span>
					),
					size: 80,
				},
				{
					accessorKey: "sortorder",
					header: "Sort Order",
					Cell: ({ renderedCellValue, row }) => (
						<span>
							<TextField
								fullWidth
								id={`sortorder-${row.original.id}`}
								name="mileradius"
								size="small"
								value={row.original.sortorder}
								onChange={e =>
									handleJSONUpdate(e, row.original.id, "sortorder")
								}
								select
							>
								<MenuItem value="">Select Order</MenuItem>
								<MenuItem value="ASC">ASC</MenuItem>
								<MenuItem value="DESC">DESC</MenuItem>
							</TextField>
						</span>
					),
					size: 80,
				},
				{
					accessorKey: "Actions",
					header: "",
					Cell: ({ renderedCellValue, row }) => (
						<span>
							<Tooltip title="Delete" placement="top">
								<Button
									className="customButtonForHover"
									sx={{
										borderColor: "var(--c-secondary-color)",
										backgroundColor: "#ffffff",
										color: "#919191",
										width: "33px",
									}}
									onClick={() => removeRowTable(row.original.id)}
								>
									<ClearIcon
										sx={{
											fontSize: "16px",
										}}
									/>
								</Button>
							</Tooltip>
						</span>
					),
					size: 50,
				},
			] as MRT_ColumnDef<addGroup["columns"]>[],
		[addDynamicList]
	);

	const table = useMaterialReactTable({
		autoResetPageIndex: false,
		columns,
		data: addDynamicList[0].columns,
		initialState: { density: "compact" },
		enableRowOrdering: true,
		enableSorting: false,
		enableBottomToolbar: true,
		enableStickyHeader: true,
		enableStickyFooter: true,
		enablePagination: false,
		muiTableContainerProps: { sx: { maxHeight: "300px" } },

		renderDetailPanel: ({ row }) => (
			<Grid container spacing={2}>
				<Grid size={3}>
					<Typography
						sx={{
							margin: "auto",
						}}
					>
						{" "}
						<span>
							<label title="Summary Function(optional)">
								Summary Function(optional)
							</label>
							<TextField
								fullWidth
								id={`summaryfun-${row.original.id}`}
								name="mileradius"
								size="small"
								value={row.original.summaryFunction}
								onChange={e =>
									handleJSONUpdate(e, row.original.id, "summaryFunction")
								}
								select
							>
								<MenuItem value="">Select</MenuItem>

								{summaryFunctionList.map((option, index) => {
									if (
										row.original.columnType === "Number" &&
										(option.type === "Number" || option.type !== "Number")
									) {
										return (
											<MenuItem key={index} value={option.value}>
												{" "}
												{option.name}{" "}
											</MenuItem>
										);
									} else if (option.type !== "Number") {
										return (
											<MenuItem key={index} value={option.value}>
												{" "}
												{option.name}{" "}
											</MenuItem>
										);
									}
								})}
							</TextField>
						</span>{" "}
					</Typography>
				</Grid>
				<Grid size={3}>
					<Typography
						sx={{
							margin: "auto",
						}}
					>
						{" "}
						<FormControlLabel
							value={row.original.SuppressDuplicates}
							control={<Checkbox />}
							label="Suppress Duplicates(optional)"
							labelPlacement="top"
							onChange={e =>
								handleJSONUpdate(e, row.original.id, "SuppressDuplicates")
							}
						/>{" "}
					</Typography>
				</Grid>
				<Grid size={3}>
					<Typography
						sx={{
							margin: "auto",
						}}
					>
						<FormControlLabel
							value={row.original.WordWrap}
							control={<Checkbox />}
							label="Word Wrap(optional)"
							labelPlacement="top"
							onChange={e => handleJSONUpdate(e, row.original.id, "WordWrap")}
						/>{" "}
					</Typography>
				</Grid>
				<Grid size={3}>
					<Typography
						sx={{
							margin: "auto",
						}}
					>
						<label title="Column Width %(optional)">
							Column Width %(optional)
						</label>
						<TextField
							size="small"
							sx={{ margin: "2px" }}
							value={row.original.ColumnWidth}
							onChange={e =>
								handleJSONUpdate(e, row.original.id, "ColumnWidth")
							}
						></TextField>{" "}
					</Typography>
				</Grid>
				<Grid size={3}>
					<Typography>
						{" "}
						<span>
							<label title="Optional Function(optional)">
								Function(optional)
							</label>
							<TextField
								fullWidth
								id={`optionalfun-${row.original.id}`}
								name={`optionalfun-${row.original.id}`}
								size="small"
								value={row.original.optionalFunctionValue}
								onChange={e =>
									handleJSONUpdate(e, row.original.id, "optionalFunctionValue")
								}
								select
							>
								<MenuItem value="">Select</MenuItem>

								{optionalFunctionList.map((option, index) => {
									if (
										row.original.columnType === "Date" &&
										option.type === "Date"
									) {
										return (
											<MenuItem key={index} value={option.value}>
												{" "}
												{option.name}{" "}
											</MenuItem>
										);
									} else if (option.type !== "Date") {
										return (
											<MenuItem key={index} value={option.value}>
												{" "}
												{option.name}{" "}
											</MenuItem>
										);
									}
								})}
							</TextField>
						</span>{" "}
					</Typography>
				</Grid>
				<Grid size="grow">
					<Typography
						sx={{
							margin: "auto",
						}}
						className={`${row.original.optionalFunctionValue === "substring"
							? "d-block"
							: "d-none"
							}`}
					>
						<span>
							<label title="starting_Point">Starting Point</label>
							<TextField
								size="small"
								id={`starting_Point.${row.id}`}
								sx={{ margin: "2px" }}
								value={
									row.original.optionalFunction[0].substring.starting_Point
								}
								onChange={e =>
									handleSubstringJSONUpdate(
										e,
										row.original.id,
										"starting_Point"
									)
								}
							></TextField>{" "}
						</span>{" "}
					</Typography>
					<Typography
						sx={{
							margin: "auto",
						}}
						className={`${row.original.optionalFunctionValue === "left"
							? "d-block"
							: "d-none"
							}`}
					>
						<span>
							{" "}
							<label title="Number_of_characters_from_left">
								Number of characters from Left
							</label>
							<TextField
								size="small"
								id={`Number_of_characters_from_left.${row.id}`}
								sx={{ margin: "2px" }}
								value={
									row.original.optionalFunction[0].left
										.Number_of_characters_from_left
								}
								onChange={e =>
									handleLeftJSONUpdate(
										e,
										row.original.id,
										"Number_of_characters_from_left"
									)
								}
							></TextField>{" "}
						</span>
					</Typography>

					<Typography
						sx={{
							margin: "auto",
						}}
						className={`${row.original.optionalFunctionValue === "right"
							? "d-block"
							: "d-none"
							}`}
					>
						<span>
							{" "}
							<label title="Number_of_characters_from_right">
								Number of characters from Right
							</label>
							<TextField
								size="small"
								id={`Number_of_characters_from_right.${row.id}`}
								sx={{ margin: "2px" }}
								value={
									row.original.optionalFunction[0].right
										.Number_of_characters_from_right
								}
								onChange={e =>
									handleRightJSONUpdate(
										e,
										row.original.id,
										"Number_of_characters_from_right"
									)
								}
							></TextField>{" "}
						</span>{" "}
					</Typography>
				</Grid>
				<Grid size={3}>
					<Typography
						className={`${row.original.optionalFunctionValue === "substring"
							? "d-block"
							: "d-none"
							}`}
					>
						<span>
							{" "}
							<label title="length_of_String">Length of String</label>
							<TextField
								size="small"
								id={`length_of_String.${row.id}`}
								sx={{ margin: "2px" }}
								value={
									row.original.optionalFunction[0].substring.length_of_String
								}
								onChange={e =>
									handleSubstringJSONUpdate(
										e,
										row.original.id,
										"length_of_String"
									)
								}
							></TextField>{" "}
						</span>{" "}
					</Typography>
				</Grid>
				<Grid size={3}></Grid>
			</Grid>
		),
		muiRowDragHandleProps: ({ table }) => ({
			onDragEnd: () => {
				const { draggingRow, hoveredRow } = table.getState();
				if (hoveredRow && draggingRow) {
					if (
						addDynamicList[0].columns &&
						Array.isArray(addDynamicList[0].columns)
					) {
						const temp1 = [...addDynamicList];
						temp1[0].columns.splice(
							(hoveredRow as MRT_Row<addGroup["columns"]>).index,
							0,
							temp1[0].columns.splice(draggingRow.index, 1)[0]
						);
						// temp1[0].columns = temp1[0].columns;
						setAddDynamicList(temp1);
						// addDynamicList.splice(
						//   (hoveredRow as MRT_Row<addGroup["columns"]>).index,
						//   0,
						//   addDynamicList.splice(draggingRow.index, 1)[0],
						// );
						// setAddDynamicList({ ...addDynamicList, columns: addDynamicList[0].columns });
					}
				}
			},
		}),
	});

	return (

		<div id="ReportColumns" className="px-4 py-2">
			{/*  style={{ boxShadow: '0px 0px 1px 1px rgba(0, 0, 0, 0.1)' }} */}
			{/* <Typography sx={{ textAlign: "left", margin: "1px", fontWeight: "Bold" }}>
        {" "}
        Columns{" "}
      </Typography> */}
			<div ref={drop}>
				<Grid className="routerHeight1 MRTableCustom" sx={{ height: 330, backgroundColor: "#ffffff" }}>
					<MRT_TableContainer table={table} />
					<Grid
						container
						direction={'row'}
						justifyContent="center"
						alignItems="center"
						className="cart p-2 fw-7 mt-1"
						ref={drop}
						sx={{
							position: "relative",
							top: "-38px"
						}}
					>
						<span>Drop fileds here to columns by in the report</span>
					</Grid>
				</Grid>
			</div>
			{/* <div className="cart" ref={setNodeRef}>
				Drop fileds here to add to the report
			</div> */}
			{/* {props.items.map((item, idx) => (
				<div key={`${item}-${idx}`} className={styles["cart-item"]}>
				{item}
				</div>
			))} */}
		</div>


	);
};

export default ReportColumns;
