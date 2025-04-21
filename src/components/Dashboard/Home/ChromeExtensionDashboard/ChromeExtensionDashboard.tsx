
import { lazy, Suspense } from '../../../../shared/modules/React';
import { CircularProgress } from '../../../../shared/modules/MaterialImports/CircularProgress';
const ChromeExtensioncontacts = lazy(() => import('./SubComponents/ChromeExtensionContacts'));
const ChromeExtensionHeader = lazy(() => import('./SubComponents/ChromeExtensionHeader'));
// import ChromeExtensionStats from './SubComponents/ChromeExtensionStats';
// import ChromeExtensionStatusBar from './SubComponents/ChromeExtensionStatusBar';

import './ChromeExtensionDashboard.scss';

const ChromeExtensionDashboard = () => {
    return <div id="ChromeExtensionDashboard">
        {/* <ChromeExtensionStatusBar/> */}
        <Suspense fallback={<CircularProgress className="centered" />}>
            <ChromeExtensionHeader />
        </Suspense>
        <Suspense fallback={<CircularProgress className="centered" />}>
            {/* <ChromeExtensionStats /> */}
            <ChromeExtensioncontacts />
        </Suspense>
    </div>
}

export default ChromeExtensionDashboard;