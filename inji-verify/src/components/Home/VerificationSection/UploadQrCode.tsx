import {scanFilesForQr} from "../../../utils/qr-utils";
import {ScanStatus} from "../../../types/data-types";
import {SetScanResultFunction} from "../../../types/function-types";
import {useActiveStepContext, useAlertMessages} from "../../../pages/Home";
import {AlertMessages, UploadFileSizeLimits, VerificationSteps} from "../../../utils/config";

function UploadButton({ displayMessage }: {displayMessage: string}) {
    return (
        <label
            style={{
                background: `#FFFFFF 0% 0% no-repeat padding-box`,
                border: '2px solid #FF7F00',
                borderRadius: '9999px',
                opacity: 1,
                padding: '18px 0',
                color: '#FF7F00',
                width: '100%',
                cursor: 'pointer'
            }}
            htmlFor={"upload-qr"}
        >
            {displayMessage}
        </label>
    );
}

export const UploadQrCode = ({setScanResult, displayMessage, setScanStatus}:
                                   { setScanResult: SetScanResultFunction,
                                       displayMessage: string,
                                       setScanStatus: (status: ScanStatus) => void
                                   }) => {
    const {setActiveStep} = useActiveStepContext();
    const {setAlertInfo} = useAlertMessages();
    return (
        <div style={{margin: "6px auto", display: "flex", placeContent: "center", width: "350px"}}>
            <UploadButton displayMessage={displayMessage}/>
            <br/>
            <input
                type="file"
                id="upload-qr"
                name="upload-qr"
                accept=".png, .jpeg, .jpg, .pdf"
                style={{
                    margin: "8px auto",
                    display: "none",
                    height: 0
                }}
                onChange={e => {
                    const file = e?.target?.files && e?.target?.files[0];
                    if (!file) return;
                    if (file.size < UploadFileSizeLimits.min || file.size > UploadFileSizeLimits.max) {
                        console.log(`File size: `, file?.size);
                        setActiveStep(VerificationSteps.ScanQrCodePrompt);
                        setAlertInfo({...AlertMessages.unsupportedFileSize, open: true})
                        return;
                    }
                    scanFilesForQr(file)
                        .then(scanResult => {
                            setScanStatus(!!scanResult.data ? "Success" : "Failed")
                            setScanResult(scanResult);
                        });
                }}
            />
        </div>);
}