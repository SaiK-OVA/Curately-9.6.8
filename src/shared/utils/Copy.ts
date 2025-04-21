import { showToaster } from "../modules/commonImports";

const Copy = {

    text(textToCopy: string, toasterMessage?: string) {
        navigator.clipboard.writeText(textToCopy);
        showToaster((toasterMessage ? toasterMessage : "") + " Copied", 'success');
    }


}

export default Copy;