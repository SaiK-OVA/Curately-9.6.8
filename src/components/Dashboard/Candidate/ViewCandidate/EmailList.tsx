import { Typography } from "../../../../shared/modules/MaterialImports/Typography";
import { Box } from "../../../../shared/modules/MaterialImports/Box";
// import Card from '@mui/material/Card';
// import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
// import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
// import CardHeader from '@mui/material/CardHeader';
// import CardMedia from '@mui/material/CardMedia';
import { CardContent } from "../../../../shared/modules/MaterialImports/Card";
// import Dialog from '@mui/material/Dialog';
// import DialogTitle from '@mui/material/DialogTitle';
// import DialogContent from '@mui/material/DialogContent';
// import DialogActions from "@mui/material/DialogActions";
// import IconButton from '@mui/material/IconButton';
// import CloseIcon from '@mui/icons-material/Close';
// import { trackPromise } from 'react-promise-tracker';
import { Stack } from "../../../../shared/modules/MaterialImports/Stack";
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemText from '@mui/material/ListItemText';

// import Grid from "@mui/material/Grid";
// import Button from "@mui/material/Button";
// import Divider from "@mui/material/Divider";
// import ListItemAvatar from '@mui/material/ListItemAvatar';
//import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
//import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import "./Emaillist.scss";
import ApiRequests from "../../../../shared/api/api";
import { useEffect, useState } from "../../../../shared/modules/React";
import { DateTime } from "../../../../shared/modules/Luxon";
// import DOMPurify from "dompurify";

//import { convert } from 'html-to-text';

// import ShowMoreText from "react-show-more-text";
import ReadMoreMaster from "./ReadMoreMaster";
import { Tooltip } from "../../../../shared/modules/MaterialImports/ToolTip";
import ParseHTML from "../../../../shared/utils/ParseHTML";
// import { showToaster } from '../../../shared/SnackBar/SnackBar';
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { userLocalData } from "../../../../shared/services/userData";
import LuxonDateParser from "../../../../shared/services/LuxonDateParser";
//import OpenInFullRoundedIcon from "@mui/icons-material/OpenInFullRounded";
import LaunchOutlinedIcon from '@mui/icons-material/LaunchOutlined';
import { Grid } from "../../../../shared/modules/MaterialImports/Grid";
import { Button } from "@mui/material";
import EmailPopup from "./EmailPopup";
import { Id } from "@hello-pangea/dnd";

export interface emailsProps {
	candidateId?: string;
	contactId?: string;
	emailId?: string;
	refreshList: boolean;
}

const EmailList = ({ candidateId, emailId, contactId, refreshList }: emailsProps) => {
	const [emailList, setEmailList] = useState<any[]>([]);
	// const [emailOid, updateEmailOid] = useState('');
	// const [email, updateEmail] = useState([]);
	// const [candValue, setCandValue] = useState('');
	// const [emailSubject, setEmailSubject] = useState('');
	// const [showEmailDetailsPopup, setShowEmailDetailsPopup] = useState(false);
	const [expandedEmails, setExpandedEmails] = useState<{ [key: string]: boolean }>({});
	const [openEmailPopup, setOpenEmailPopup] = useState(false);
	const [candidateData, setCandidateData] = useState<any>([]);
	// const optionsHtmlToText = {
	//     wordwrap: 320,
	//     // ...
	// };

	const loadEmailList = () => {
		try {
			// https://www4.accuick.com/Accuick_API/Curately/Email/email_log.jsp?clientId=2&userId=39
			// ApiRequests.getByParams(193, 'Curately/Email/email_log.jsp', {
			ApiRequests.postWithData("admin", "emailLog", {
				userId: candidateId ? candidateId : "",
				contId: contactId ? contactId : "",
				page: 0,
				clientId: userLocalData.getvalue("clientId"),
				recrId: userLocalData.getvalue("recrId"),
			}).then((response: any) => {
				if (response.data.Message === "Success") {
					let jsonObj = response.data.emailslog;
					let objCloneByJsonStringfy = JSON.parse(JSON.stringify(jsonObj));
					for (let i = 0; i < objCloneByJsonStringfy.length; i++) {
						// objCloneByJsonStringfy[i] = JSON.parse(objCloneByJsonStringfy[i]);
						// if (objCloneByJsonStringfy[i].body) {
						//  console.log(objCloneByJsonStringfy[i].body);

						objCloneByJsonStringfy[i].body = ParseHTML.RemoveStyleTag(
							objCloneByJsonStringfy[i].body
						);

						objCloneByJsonStringfy[i].subject = objCloneByJsonStringfy[i].subject
							? objCloneByJsonStringfy[i].subject.replace(
									/[^a-zA-Z0-9~`!@#$%^&*()_+-={}|:;<>,.?\/ \n[\]']/g,
									""
							  )
							: "";

						objCloneByJsonStringfy[i].textBody = ParseHTML.ToText(
							objCloneByJsonStringfy[i].body
						);
					}
					objCloneByJsonStringfy = objCloneByJsonStringfy.sort(
						(a: { date: string }, b: { date: string }) => {
							return new Date(b.date).getTime() - new Date(a.date).getTime();
						}
					);
					setEmailList(objCloneByJsonStringfy);
					setCandidateData(response.data.emailslog);
					console.log(response.data.emailslog);
				}
			});
		} catch (e) {
			// console.log('Error:', e);
		}
	};
	// const getTextFromHTML = (html: string) => {
	//     let divContainer = document.createElement("textarea");
	//     divContainer.innerHTML = html;
	//     // return divContainer.value || divContainer.innerText || "";

	//     // var textarea = document.getElementById('textarea');
	//     var temporalDivElement = document.createElement("div");
	//     temporalDivElement.innerHTML = divContainer?.value;
	//     var tempText = temporalDivElement.textContent || temporalDivElement.innerText || "";
	//     return tempText.replace(/\r?\n/g, '<br />');
	// }

	// const handleClosePopup = () => {
	//     setShowEmailDetailsPopup(false);
	//     // setCandValue('');
	//     setEmailSubject('');
	//     loadEmailDetails('');
	//     // updateEmailOid('');
	// };
	const handleExpandClick = (emailId: string) => {
		setExpandedEmails((prevState) => ({
			...prevState,
			[emailId]: !prevState[emailId],
		}));
	};

	// const emailOnClickHandler = (oid: string) => {
	//     updateEmailOid(oid);

	//     emailList.map((item: any) => {
	//         if (item._id.$oid == oid) {
	//             setCandValue(item.candid);
	//             setEmailSubject(item.subject);
	//             loadEmailDetails(item.body);
	//             setShowEmailDetailsPopup(true);
	//         }

	//     }
	//     )
	// }

	// const loadEmailDetails = (emailData: any) => {
	//     updateEmail(emailData);
	// }
	
	const dateFormatHandler = (date: string) => {
		return DateTime.fromFormat(date.substring(0, 19), "yyyy-MM-dd hh:mm:ss").toFormat(
			"MM/dd/yyyy, t"
		);
	};

	useEffect(() => {
		loadEmailList();
	}, [refreshList]);

	// const rawHTML = `<div> ${email} </div>`;
	// console.log(emailList);
	return (
		<div className="EmailList">
			<Stack className="mainStack">
				<Stack sx={{ width: "100%" }}>
					<Box className="" sx={{ padding: "0 !important" }}>
						<Box className="mainHeadBox px-0">
							<Typography className="Emails-Style">Email History</Typography>
						</Box>
						<Stack>
							<div className="cardBottom">
								{emailList.map((item: any, index) => {
									const emailId = item._id?.$oid || item.emailId || index; // Safely access the email ID

									return (
										<CardContent
											className="cardContentHover handcursor px-0 d-flex"
											key={index + "emailList"}
											//onClick={() => handleExpandClick(emailId)} // Handle click to expand
										>
											{/* <div className='arrow_div'>
                                                {item.type === "OUT" ? (
                                                    <Tooltip title="Sent"><ArrowUpwardIcon id="up_arrow" /></Tooltip>
                                                ) : (
                                                    <Tooltip title="Received"><ArrowDownwardIcon id="down_arrow" /></Tooltip>
                                                )}
                                            </div> */}
											<div className="email_maindiv">
												{item.type === "OUT" ? (
													<Typography
														className="email-recruiter"
														sx={{ paddingBottom: "2px !important" }}
													>
														<Tooltip title={item.senderEmail}>
															{item.recrName}
														</Tooltip>
														{item.candidateName && (
															<>
																&nbsp;to&nbsp;
																<Tooltip
																	title={item.candidateEmail}
																>
																	<u>{item.candidateName}</u>
																</Tooltip>
															</>
														)}
													</Typography>
												) : (
													<Typography
														className="email-recruiter"
														sx={{ paddingBottom: "2px !important" }}
														onClick={() => handleExpandClick(emailId)}
													>
														<Tooltip title={item.candidateEmail}>
															<u>{item.candidateName}</u>
														</Tooltip>
														{item.candidateName && (
															<>
																&nbsp;to&nbsp;
																<Tooltip title={item.senderEmail}>
																	{item.recrName}
																</Tooltip>
															</>
														)}
													</Typography>
												)}

												<Typography className="email-subject tt-capital" onClick={() => handleExpandClick(emailId)}>
													{item.subject.length > 50
														? item.subject.trim().substring(0, 50) +
														  "..."
														: item.subject.trim()}
												</Typography>
												<Typography variant="subtitle2" color="text.secondary" onClick={() => handleExpandClick(emailId)}>

                                                    <ReadMoreMaster
                                                        content={item.body}
                                                        maxLines={1}
                                                        expanded={!!expandedEmails[emailId]}
                                                    />
                                                </Typography>

												<div className="dateSection">
													<Typography
														variant="body2"
														color="text.secondary"
														sx={{
															fontSize: "12px",
															fontWeight: "500",
														}}
													>
														<Tooltip
															title={
																item.type === "OUT"
																	? `Sent on ${dateFormatHandler(
																			item.date
																	  )}`
																	: `Received on ${dateFormatHandler(
																			item.date
																	  )}`
															}
														>
															<EmailOutlinedIcon
																sx={{
																	fontSize: "16px",
																	verticalAlign: "middle",
																	paddingRight: "2px",
																}}
															/>
														</Tooltip>
														&nbsp;
														{item.date
															? LuxonDateParser.ServerEDTToSystem(
																	item.date.substring(0, 19),
																	"yyyy-MM-dd hh:mm:ss",
																	"MM/dd/yyyy hh:mm a"
															  )
															: null}
													</Typography>
												</div>
											</div>
											<Grid
												container
												direction="row"
												justifyContent="flex-end"
												alignItems="flex-start"
											>
												<Button
													style={{ color: "grey", padding:"2px" }}
													onClick={() => setOpenEmailPopup(true)}
													size="small"
												>
													<LaunchOutlinedIcon />
												</Button>
											</Grid>
											{candidateData.map((email:any, index:Id) =>
												openEmailPopup ? (
													<EmailPopup
														key={index}
														open={openEmailPopup}
														closePopup={() => setOpenEmailPopup(false)}
														title={email.subject}
														htmlData={email.body}
                                                        
													/>
												) : null
											)}
										</CardContent>
									);
								})}
							</div>
						</Stack>
					</Box>
				</Stack>
			</Stack>
		</div>
	);
};
export default EmailList;
