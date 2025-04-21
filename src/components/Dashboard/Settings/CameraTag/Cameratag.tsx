import React, { forwardRef, useEffect } from "react";

type CameratagProps = {
	appUuid?: string;
	cameraId?: string;
	saveUrl?: (arg1: string) => void;
};

const defaultCameratagValues = {
	appUuid: "a-fa1219f0-641d-013b-999e-0abe8b919efd",
	cameraId: "myCamera",
};

const CameraTagComponent: React.FC<CameratagProps> = forwardRef(
	(
		{ appUuid = defaultCameratagValues.appUuid, cameraId = defaultCameratagValues.cameraId },
		ref
	) => {

		useEffect(() => {
			(window as any)?.CameraTag?.init("CameraPlaceHolder", "camera", { appUuid, id: cameraId, ref })
		}, []);

		return (
			<>
				<div id="CameraPlaceHolder"></div>
			</>
		);
	}
);

export default CameraTagComponent;
