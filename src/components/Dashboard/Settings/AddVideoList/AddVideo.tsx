import { React, useEffect, useRef, useState } from "../../../../shared/modules/React";
import { useLayoutEffect } from "react";
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
} from "../../../../shared/modules/MaterialImports/Dialog";
import { Button, IconButton } from "../../../../shared/modules/MaterialImports/Button";
import { TextField } from "../../../../shared/modules/MaterialImports/FormInputs";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "../../../../shared/modules/Formik";
import "./AddVideo.scss";
import { trackPromise } from "../../../../shared/modules/PromiseTrackter";
import { Stack } from "../../../../shared/modules/MaterialImports/Stack";
import ApiService from "../../../../shared/api/api";
import { showToaster } from "../../../shared/SnackBar/SnackBar";
import { userLocalData } from "../../../../shared/services/userData";
import CameraTagWrapper from "../CameraTag/CameraTagWrapper";
interface AddVideoDialogProps {
	open: boolean;
	handleClose: (addorUpdate: boolean) => void;
	videoData: any;
	add: boolean;
	onVideoSaveSuccess: () => void;
}

const AddVideo: React.FC<AddVideoDialogProps> = ({
	open,
	handleClose,
	add,
	videoData,
	onVideoSaveSuccess,
}) => {
	// let clientId = userLocalData.getvalue("clientId");

	// const [isFormSubmitted, setIsFormSubmitted] = useState(false);

	const initialAddVideoDetails = videoData
		? {
				Cameratagid: videoData ? videoData.Cameratagid : "",
				autoId: videoData ? videoData.autoId : "",
				clientId: userLocalData.getvalue("clientId"),
				createdDate: videoData ? videoData.createdDate : "",
				label: videoData ? videoData.label : "",
				recrId: videoData ? videoData.recrId : "",
				recrName: videoData ? videoData.recrName : "",
		  }
		: {
				Cameratagid: "",
				autoId: "",
				createdDate: "",
				label: "",
				recrId: "",
				recrName: "",
				clientId: userLocalData.getvalue("clientId"),
		  };
	// console.log(videoData.label, "video..");

	// load requisites for cameratag on mount

	const addVideoFormik = useFormik({
		initialValues: initialAddVideoDetails,
		// validationSchema: addSourceSchema,
		onSubmit: () => {
			// setIsFormSubmitted(true);
		},
		validateOnMount: true,
	});

	const handleCloseAddVideoDialog = () => {
		handleClose(false);
		addVideoFormik.resetForm();
	};

	const [commonUrl, setCommonUrl] = useState("");
	const [cameraData, setCameraData] = useState({ cameratagId: "", label: "" });
	const [openDialog, setOpenDialog] = useState(false);

	useLayoutEffect(() => {
		setCommonUrl(
			`${
				window.location.protocol === "https:"
					? "https://app.curately.ai"
					: "http://52.41.18.83:41088"
			}/Accuick_API/CameraTagAccountManager.html?recrId=${userLocalData.getvalue("recrId")}`
		);

		window.addEventListener("message", handlerForRecruiterRecording);

		return () => window.removeEventListener("message", handlerForRecruiterRecording);
	}, []);

	const iframeRef: any = useRef(null);
	useEffect(() => {
		const iframe = iframeRef.current;
		const onIframeLoad = () => {
			// if (iframe && iframe.contentWindow) {
			//   const iframeDoc =
			//     iframe.contentDocument || iframe.contentWindow.document;
			//   const inputElement = iframeDoc.getElementById("videoTitle");
			//   console.log(inputElement, "input..");
			//   if (inputElement) {
			//     alert("test..");
			//     inputElement.value = "Default Value";
			//   }
			// }
		};

		if (iframe) {
			iframe.addEventListener("load", onIframeLoad);
		}
		return () => {
			if (iframe) {
				iframe.removeEventListener("load", onIframeLoad);
			}
		};
	}, [commonUrl, iframeRef]);

	const handlerForRecruiterRecording = (
		ev: MessageEvent<{
			addCameraTagVideo: boolean;
			title: string;
			videoUrl: string;
			action: string;
		}>
	) => {
		if (ev.data.addCameraTagVideo) {
			let videoInfoData = {
				cameratagId: ev.data.videoUrl,
				label: ev.data.title,
				createdBy: userLocalData.getvalue("recrId"),
				clientId: userLocalData.getvalue("clientId"),
			};
			setCameraData({
				cameratagId: ev.data.videoUrl,
				label: ev.data.title,
			});
			setCommonUrl("");
			// passedStageData.video
			// http://35.155.202.216:8080/QADemoCurately/savevideo
			trackPromise(
				ApiService.postWithData("admin", "savevideo", videoInfoData).then(
					(response: any) => {
						console.log(response.data);
						if (response.data.Success) {
							setOpenDialog(false);
							handleClose(false);
							onVideoSaveSuccess();
							showToaster("Video added successfully.", "success");
							setCommonUrl(
								`${
									window.location.protocol === "https:"
										? "https://app.curately.ai"
										: "http://52.41.18.83:41088"
								}/Accuick_API/CameraTagAccountManager.html?recrId=${userLocalData.getvalue(
									"recrId"
								)}`
							);
							setCameraData({ cameratagId: "", label: "" });
						} else {
							setOpenDialog(true);
							// setCommonUrl(`${(window.location.protocol === 'https:') ? 'https://app.curately.ai' : 'http://52.41.18.83:41088'}/Accuick_API/CameraTagAccountManager.html?recrId=${userLocalData.getvalue('recrId')}`);
							showToaster(response.data.Message, "error");
						}
					}
				)
			);
		}
	};

	const handleUpdateClick = () => {
		if (![null, undefined, "", 0].includes(cameraData.label)) {
			handlerForRecruiterRecording({
				data: {
					addCameraTagVideo: true,
					title: cameraData.label,
					videoUrl: cameraData.cameratagId,
					action: "",
				},
			} as MessageEvent);
		}
	};

	const updateVideo = () => {
		if (addVideoFormik.values.label.trim() === "") {
			showToaster("Please Enter label name", "error");
			return false;
		} else if (addVideoFormik.values.autoId === "") {
			showToaster("Please select 'title Type", "error");
			return false;
		}

		// setIsFormSubmitted(true);

		//http://35.155.202.216:8080/QADemoCurately/updateVideo
		if (addVideoFormik.isValid) {
			trackPromise(
				//   ApiService.postWithData(214, 'saveSource', { ...addSourcesFormik.values }).then(
				//  ApiService.postWithData(216, 'QADemoCurately/updateVideo', { ...addSourcesFormik.values }).then(
				ApiService.postWithData("admin", "updateVideo", {
					...addVideoFormik.values,
				}).then((response: any) => {
					if (response?.data?.Success) {
						showToaster("Video has been updated successfully.", "success");

						addVideoFormik.resetForm();
						handleClose(true);
					} else {
						showToaster(
							response.data.Message ? response.data.Message : "An error occured",
							"error"
						);
					}
				})
			);
		} else {
			showToaster("Please fill all fields.", "error");
		}
	};

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			maxWidth={openDialog ? "xs" : "md"}
			fullWidth={true}
		>
			<DialogTitle>{openDialog ? "Update Title" : add ? "Add" : "Update"} Video</DialogTitle>
			<IconButton
				aria-label="close"
				onClick={handleCloseAddVideoDialog}
				sx={{
					position: "absolute",
					right: 8,
					top: 8,
					color: (theme) => theme.palette.grey[500],
				}}
			>
				<CloseIcon />
			</IconButton>
			<DialogContent className="modal-height">
				<CameraTagWrapper />
			</DialogContent>
			{openDialog ? (
				<Stack alignItems={"flex-end"} spacing={2} py={1.5}>
					<TextField
						fullWidth
						size="small"
						label={"Video Title"}
						placeholder={"Enter video title"}
						name="add_video"
						value={cameraData.label}
						onChange={(e: any) =>
							setCameraData({ ...cameraData, label: e.target.value })
						}
					/>
					<Button variant="contained" onClick={handleUpdateClick}>
						Update
					</Button>
				</Stack>
			) : null}
			{!add && (
				<DialogActions>
					<Button
						variant="outlined"
						type="button"
						size="small"
						color="secondary"
						className="mr-2"
						onClick={handleCloseAddVideoDialog}
					>
						Cancel
					</Button>

					{/* <Button color="primary" variant='contained' size="small" onClick={videoData && videoData.autoId ? updateVideo : saveVideo} >{add ? "Add" : "Update"} Video</Button> */}
					<Button color="primary" variant="contained" size="small" onClick={updateVideo}>
						Update Video
					</Button>
				</DialogActions>
			)}
		</Dialog>
	);
};

export default AddVideo;
