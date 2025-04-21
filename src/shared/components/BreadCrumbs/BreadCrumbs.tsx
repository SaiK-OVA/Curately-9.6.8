import { Typography } from './../../../shared/modules/MaterialImports/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
// import Link from '@mui/material/Link';

import { useLocation, Link } from 'react-router-dom';
import { useEffect, useState } from './../../../shared/modules/React';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import './BreadCrumbs.scss';


export default function BasicBreadcrumbs() {


    const location = useLocation();
    // const data = location.state ? location.state : [];
    // const { data, ...rest }: any = location.state;

    const [links, setLinks] = useState<{ link: string; text: string }[]>([]);

    useEffect(() => {
        if (location?.state?.data?.length) {
            setLinks(location.state.data);
        } else {
            setLinks([]);
        }
    }, [location]);


    return links.length ?
        <div role="breadcrumbnav" id="breadCrumbNav">
            <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextIcon />}>
                {
                    links.map((item) => {
                        return item.link ?
                            <Link to={item.link} key={item.text} >
                                {/* state={rest ? { ...rest } : null}  */}
                                {item.text}
                            </Link>
                            :
                            <Typography className='titleDisplay tt-capital' key={item.text}>{item.text}</Typography>
                    })
                }
            </Breadcrumbs>
        </div>
        :
        <></>
}
