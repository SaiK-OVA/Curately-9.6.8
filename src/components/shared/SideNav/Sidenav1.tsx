import styles from "./sidenav.module.css"
import { NavLink } from "react-router-dom";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';

// import { Grid } from '../../../shared/modules/commonImports';
// import { useState } from "react";
import { HeaderList } from "../Header/HeaderList";
import { Tooltip } from "../../../shared/modules/MaterialImports/ToolTip";

const Sidenav = ({ open, toggleOpen }: { open: boolean, toggleOpen: any }) => {
    // const [open, setopen] = useState(false);
    // const toggleOpen = () => {
    //     setopen(!open)
    // }
    return (
        <div className={open ? styles.sidenav : styles.sidenavClosed} >
            <button className={styles.menuBtn} onClick={toggleOpen} >
                {open ? <KeyboardDoubleArrowLeftIcon /> : <KeyboardDoubleArrowRightIcon />}
            </button>
            <div className="pt-5 mt-5">
                {
                    HeaderList.map(item => {
                        return (item.icon) ?
                            (item.externalRoute) ?
                                <NavLink key={item.label} className={styles.sideitem} to={(item.route) ? item.route : ""} target="_blank" rel="noopener noreferrer" >
                                    <Tooltip title={item.label} placement="right">
                                        {item.icon}
                                    </Tooltip>
                                    < span className={styles.linkText} > {item.label} </span>
                                </NavLink>
                                :
                                <NavLink key={item.label} className={styles.sideitem} to={(item.route) ? item.route : ""}  >
                                    <Tooltip title={item.label} placement="right">
                                        {item.icon}
                                    </Tooltip>
                                    < span className={styles.linkText} > {item.label} </span>
                                </NavLink>
                            :
                            null
                    })
                }
            </div>
        </div>
    )
}

export default Sidenav;
