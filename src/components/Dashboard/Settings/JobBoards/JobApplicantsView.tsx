import { useEffect, useState, useCallback } from "../../../../shared/modules/React";
// import { userLocalData } from "../../../../shared/services/userData";
import { Typography } from "../../../../shared/modules/MaterialImports/Typography";
import { Grid } from '../../../../shared/modules/MaterialImports/Grid2';
// import { MRT_RowSelectionState } from "material-react-table";
import { trackPromise } from '../../../../shared/modules/PromiseTrackter';
import ApiService from "../../../../shared/api/api";
import { Button } from '../../../../shared/modules/MaterialImports/Button';
import CloseIcon from '@mui/icons-material/Close';
import { Divider } from '../../../../shared/modules/MaterialImports/Divider';
import { Loader } from "../../../shared/Loader/Loader";
import { Dialog, DialogTitle, DialogContent } from '../../../../shared/modules/MaterialImports/Dialog';
import { showToaster } from '../../../shared/SnackBar/SnackBar';
import './JobApplicantsView.scss'
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { DateTime } from '../../../../shared/modules/Luxon';
import { debounce } from 'lodash';

interface ApplicantData {
    id: string;
    name: string;
    jobId: string;
    portalId: string;
    portalDate: string;
    subject: string;
}


const JobApplicantsView = (
    { open, closePopup, ApplicantsData, portalName }: {
        open: boolean;
        closePopup: () => void;
        ApplicantsData: any;
        portalName: any;
    }
) => {
    const [listAppDetails, setListAppDetails] = useState<any>([]);
    const [applicantData, setApplicantData] = useState<ApplicantData[]>([]);

    // const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});
    const [jobAppId, setJobAppId] = useState();
    // const recrID = userLocalData.getvalue('recrId');

    const getApplicantsList = useCallback(debounce(() => {
        let tempBoardIds: any = [];
        let itemId = null;

        ApplicantsData && ApplicantsData?.applicants?.applicant?.map((item: any, idx: number) => {
            let PortName = "";
            if (idx === 0) {
                setJobAppId(item.id);
                itemId = item.id;
            }
            trackPromise(
                ApiService.getCall('admin', 'listAllPublishedJobs').then((response) => {
                    const tempIndex = response.data.idibu.response?.jobs?.job.findIndex((jobitem: { id: number }) => jobitem.id == item.job.id);
                    PortName = response.data.idibu.response?.jobs?.job[tempIndex].title + "( Ref: " + response.data.idibu.response?.jobs?.job[tempIndex].reference + ")";
                    //    console.log(PortName);
                })
            )

            tempBoardIds.push(
                {
                    id: item.id,
                    name: item.name,
                    jobId: item.job.id,
                    portalId: item.email,
                    portalDate: item.date,
                    subject: PortName,
                }
            )
        });
        setApplicantData(tempBoardIds);
        console.log(tempBoardIds);
        JobBoardApplicantsData(itemId);
    }, 600),
        []
    );

    const removeJunkText = (val: string) => {
        // eslint-disable-next-line no-useless-escape
        return val ? val.replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '') : "";
    }

    const JobBoardApplicantsData = (appId: any) => {

        let tempdata = {
            "applicantId": appId
        }

        trackPromise(
            ApiService.postWithData('admin', 'getApplicantDetailedView', tempdata).then((response) => {
                if (response.data.Status === 200) {
                    setListAppDetails(response.data.idibu.response);
                    console.log(response.data.idibu.response)
                } else {
                    showToaster((response.data.Message) ? response.data.Message : 'An error occured', 'error')
                }
            })
        )
    }

    useEffect(() => {
        ApplicantsData && getApplicantsList();

    }, []);


    return (
        <Dialog
            maxWidth={'xl'}
            fullWidth={true} open={open} id='JobApplicantsView'
        >      <Loader />
            <DialogTitle
                className='py-2'
            >

                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <span className='addHeader'>
                        {portalName} - {ApplicantsData?.total} Applicants
                    </span>
                    <div>
                        <Grid
                            container
                            direction="row"
                            justifyContent="end"
                            alignItems="center"
                        >

                            <CloseIcon onClick={() => closePopup()} />
                        </Grid>
                    </div>
                </Grid>
            </DialogTitle>
            <Divider />
            <DialogContent className='py-0 pt-0 customCard' >
                <Grid
                    container
                    direction={'row'}
                    justifyContent="start"
                    alignItems="start"
                    className="mainReport"
                    spacing={2}

                >
                    <Grid size={3}   >
                        <Grid
                            size={12}
                            className="customCard"
                        >
                            {applicantData?.map((item: any, idx: number) => (
                                <div>
                                    <Grid key={idx}
                                        container
                                        direction="row"
                                        justifyContent="space-between"
                                        alignItems="center"
                                        spacing={1}
                                    >
                                        {/* <Grid size={1}><CheckBox /></Grid> */}
                                        <Grid size={8} onClick={() => JobBoardApplicantsData(item.id)} >  {item?.name}</Grid>
                                        <Grid size={3}>  {DateTime.fromFormat(
                                            item?.portalDate?.substring(0, 19),
                                            "yyyy-MM-dd hh:mm:ss"
                                        ).toFormat("MM/dd/yyyy ")} </Grid>


                                    </Grid>
                                </div>
                            ))}
                        </Grid>

                    </Grid>

                    <Grid size={9}  >
                        <Grid size={12} className="customCard" direction={"row"}  >
                            {
                                //  listAppDetails && listAppDetails?.map((item: any, idx: number) => (
                                <div>
                                    <Grid container
                                        direction="row"
                                        justifyContent="space-between"
                                        alignItems="center" >  <Grid size={8}   >
                                            <span className='addHeader'>
                                                From :  {listAppDetails?.name}
                                            </span>
                                        </Grid>
                                        <Grid size={4}  >
                                            <Button href={listAppDetails?.files?.file?.link} target="_blank" ><AttachFileIcon /></Button>
                                            {listAppDetails?.portal?.name}
                                        </Grid>
                                    </Grid>
                                    <Grid container
                                        direction="row"
                                        justifyContent="space-between"
                                        alignItems="center">
                                        <span >
                                            <div> {listAppDetails?.message?.subject} </div>

                                            <div> {listAppDetails?.date}
                                                {/* {DateTime.fromFormat(
                                        listAppDetails?.date?.substring(0, 19),   "yyyy-MM-dd hh:mm:ss"  ).toFormat("MMM dd yyyy h:m a")} 
                                         */}
                                            </div>
                                        </span>

                                    </Grid>
                                    <Grid
                                        container
                                        size={12}

                                    >
                                        <Typography className='desc' dangerouslySetInnerHTML={{
                                            __html:
                                                ((listAppDetails?.parsed && listAppDetails?.parsed?.summary && listAppDetails?.parsed?.summary.trim()) ? removeJunkText(listAppDetails?.parsed?.summary) : "")
                                        }}></Typography>
                                    </Grid>
                                </div>
                                //  ))
                            }

                        </Grid>
                    </Grid>

                </Grid>
            </DialogContent>
        </Dialog >
    )
}

export default JobApplicantsView;