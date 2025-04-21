import { useCallback, useEffect, useRef, useState } from "react";
import "./CameratagWrapper.scss";
import { userLocalData } from "../../../../shared/services/userData";
import { showToaster } from "../../../shared/SnackBar/SnackBar";
import CameraTagComponent from "./Cameratag";
import { Button } from "./../../../../shared/modules/MaterialImports/Button";
import { TextField } from "./../../../../shared/modules/MaterialImports/TextField";
import ApiService from "./../../../../shared/api/api";

const appUuid = "a-fa1219f0-641d-013b-999e-0abe8b919efd";
const cameraId = "myCamera";

const CameraTagWrapper = () => {
	// cameratag related values
	const [titleValue, setTitleValue] = useState("");
	const [showCameraTag, setShowCameraTag] = useState(false);
	const [videoLabelError, setVideoLabelError] = useState({
		msg: "",
		error: false,
	});
	const [disabled, setDisabled] = useState(false);
	const cameraTagRef = useRef(null);
	const [videoUrl, setVideoUrl] = useState("");

	useEffect(() => {
		const timeStamp = Date.now();

		// load css for cameratag
		const link = document.createElement("link");
		link.rel = "stylesheet";
		link.href = `https://www.cameratag.com/v15/css/cameratag.css?${timeStamp}`;
		document.head.appendChild(link);

		// load js for cameratag
		const script = document.createElement("script");
		script.src = `https://www.cameratag.com/v15/js/cameratag.min.js?${timeStamp}`;
		script.async = true;
		document.body.appendChild(script);

		script.onload = () => {
			if ((window as any)?.CameraTag) {
				waitForCameraTagToRender(`#${cameraId}`, () => {
					(window as any)?.CameraTag.setup();
					(window as any)?.CameraTag.observe(cameraId, "published", function () {
						const myCamera = (window as any)?.CameraTag.cameras[cameraId];
						const myVideo = myCamera.getVideo();
						const mp4Url = myVideo.medias["mp4"];
						console.log("Cameratag Video URL:", mp4Url);
						setVideoUrl(mp4Url);
					});
				})
			}
		};

		return () => {
			document.body.removeChild(script);
			document.head.removeChild(link);
			destroyCamera();
		};
	}, []);

	useEffect(() => {
		if (videoUrl.trim()) {
			saveUrl(videoUrl);
		}
	}, [videoUrl]);

	function waitForCameraTagToRender(selector: string, callback: () => void) {
		const interval = setInterval(() => {
			const element = document.querySelector(selector);
			if (element) {
				clearInterval(interval);
				callback();
			}
		}, 100);

		// Timeout after 5s to avoid infinite wait
		setTimeout(() => clearInterval(interval), 5000);
	}

	const destroyCamera = () => {
		if ((window as any)?.CameraTag?.cameras?.[cameraId]) {
			try {
				(window as any)?.CameraTag.cameras[cameraId]?.destroy();
			} catch (e) {
				console.log("Error -- ", e);
			}
		}
	};

	// handle record cta on add-video dialog
	const handleRecord = () => {
		if (showCameraTag) {
			if (cameraTagRef.current) {
				if ((window as any)?.CameraTag?.cameras?.[cameraId]) {
					try {
						(window as any)?.CameraTag?.cameras[cameraId]?.reset();
					} catch (e) {
						console.log("Error -- ", e);
					}
				}
			}
		} else {
			if (!titleValue.trim()) {
				setVideoLabelError({
					error: true,
					msg: "Label is required",
				});
				return;
			}
			setShowCameraTag(true);
			setDisabled(true);
		}
	};

	const handleTitleValue = (e: any) => {
		const value = e?.target?.value;
		setVideoLabelError({
			error: false,
			msg: "",
		});
		setTitleValue(value);
	};

	// handle save url after publishing cameratag video
	const saveUrl = useCallback(
		(url: string) => {
			try {
				const clientId = userLocalData.getvalue("clientId");
				const recrId = userLocalData.getvalue("recrId");
				ApiService.postWithData("admin", "savevideo", {
					clientId,
					createdBy: recrId,
					label: titleValue,
					cameratagId: url,
				})
					.then((res: any) => {
						if (res?.data?.Message) {
							showToaster(res?.data?.Message, "success");
						}
					})
					.catch((err: any) => {
						console.log(err);
						showToaster("Some error occurred while uploading video", "error");
					});
			} catch (err) {
				console.log(err);
				showToaster("Some error occurred while uploading video", "error");
			}
		},
		[titleValue]
	);

	return (
		<div className="align-middle">
			<div className="align-input">
				<TextField
					label="Video Title"
					required
					size="small"
					placeholder="Enter video title"
					value={titleValue}
					onChange={handleTitleValue}
					error={videoLabelError.error}
					helperText={videoLabelError.msg}
					disabled={disabled}
				/>
				<Button className="h-38" variant="outlined" onClick={handleRecord}>
					{showCameraTag ? "Re-record Video" : "Update or Record"}
				</Button>
			</div>
			<div className={showCameraTag ? "show" : "hide"}>
				<CameraTagComponent appUuid={appUuid} cameraId={cameraId} ref={cameraTagRef} />
			</div>
		</div>
	);
};

export default CameraTagWrapper;
