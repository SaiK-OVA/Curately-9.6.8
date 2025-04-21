
import { Box, CircularProgress, Typography } from "@mui/material";
import  Grid  from "@mui/material/Grid2";
import './VoiceAI.scss';
import { useEffect, useState } from "react";
import axios from "axios";

interface data {
  name: string;
  email: string;
  contact: string;
  userData: Array<{ totalQuestions: string; goodAnswers: string; averageAnswers: string; badAnswers: string }>;
  questionsData: Array<{ id: number; question: string; answer: string }>;
  conversationData: Array<{ time: string; speaker: string; message: string }>;
}

function CircularProgressWithLabel({size,value}:{size:number,value:number}) {
  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress size={size} variant="determinate" value={value} />
      <Typography
        variant="caption"
        sx={{ position: "absolute", color: "text.secondary",fontSize:"1.3rem",fontWeight:"bold" }}
      >
        {`${Math.round(value)}%`}
      </Typography>
    </Box>
  );
}

const candidateData = {
  name: "test",
  email:"test12@gmail.com",
  contact: "+1 64152389",
  userData:[
    {'totalQuestions':'10'},
    {'goodAnswers' : '7'},
    {'averageAnswers' : '2'},
    {'badAnswers' : '1'}    
  ],
  questionsData: [
    {
      id: 1,
      question: "Could you please confirm your current work status? Are you currently employed, or would you say you're between jobs?",
      answer: "Answer"
    },
    {
      id: 2,
      question: "If selected, how soon would you be available to start a new opportunity?",
      answer: "Answer"
    },
    {
      id: 3,
      question: "Could you please tell me where you're currently located?",
      answer: "Answer"
    },
    {
      id: 4,
      question: "Could you please confirm your work authorization status? Are you a U.S. citizen, a Green Card holder, working on an H-1B visa, or do you have another type of work authorization?",
      answer: "Answer"
    },
    {
      id: 5,
      question: "If offered the role, would you be willing to proceed after a comprehensive background check and drug test?",
      answer: "Answer"
    },
    {
      id: 6,
      question: "Could you please share your expected pay rate for this role?",
      answer: "Answer"
    },
    {
      id: 7,
      question: "Do you recall being submitted by any other staffing agency to this exact role today, or in the last few days?",
      answer: "Answer"
    },
    {
      id: 8,
      question: "Are you currently interviewing for other positions?",
      answer: "Answer"
    },
    {
      id: 9,
      question: "Are you close to receiving any offers for other positions?",
      answer: "Answer"
    },
    {
      id: 10,
      question: "Are you comfortable working in an onsite setting, which is, located in Tacoma, Washington?",
      answer: "Answer"
    },
    {
      id: 11,
      question: "How many years of experience do you have, with inventory, or asset management?",
      answer: "Answer"
    },
    {
      id: 12,
      question: "Do you have experience providing technical support, for desktop, laptop, and mobile hardware?",
      answer: "Answer"
    },
    {
      id: 13,
      question: "Could you share, the best time, for one of our recruiters, to reach out? And move forward, with the process?",
      answer: "Answer"
    }
  ],
  conversationData: [
    { time: "00:00", speaker: "AGENT", message: "Hi, I'm Sarah, an AI recruiter with Ask Consulting on a recorded line. We came across your profile and believe you'd be a strong match for our Inventory Control Associate position.Would you be interested to learn more?" },
    { time: "00:12", speaker: "USER", message: "Hello? Okay" },
    { time: "00:12", speaker: "AGENT", message: "Nice to meet you, Susy. I'm here to collect some information related to you. Shall we proceed?" },
    { time: "00:21", speaker: "USER", message: "Yes. Yeah" },
    { time: "00:21", speaker: "AGENT", message: "All right. Let me pull up the details of the job. The details might be rather long, so bear with me. Feel free to ask these questions about it afterwards." },
    { time: "00:50", speaker: "USER", message: "Yes" },
    { time: "00:50", speaker: "AGENT", message: "Now, I have some questions I need to ask you in order for me to, you know, submit some information onto the system. Would you mind answering a few questions?" },
    { time: "00:59", speaker: "USER", message: "Yes" },
    { time: "00:59", speaker: "AGENT", message: "Could you please confirm your current work status? … Are you currently employed, or would you say you're between jobs?" },
    { time: "01:10", speaker: "USER", message: "Current employee" },
    { time: "01:10", speaker: "AGENT", message: "If selected, how soon would you be available to start a new opportunity?" },
    { time: "01:18", speaker: "USER", message: "2 weeks. By January 16" },
    { time: "01:29", speaker: "AGENT", message: "Could you please tell me where you're currently located?" },
    { time: "01:35", speaker: "USER", message: "And Tacoma" },
    { time: "01:35", speaker: "AGENT", message: "Could you please confirm your current work status? Are you currently employed, or would you say you're between jobs?" },
    { time: "01:47", speaker: "USER", message: "My contract is ending January 15" },
    { time: "01:47", speaker: "AGENT", message: "Could you please tell me where you,re currently located?" },
    { time: "02:01", speaker: "USER", message: "Dotcoma" },
    { time: "02:01", speaker: "AGENT", message: "I'm sorry, Susy, but I didn't quite understand your last response. Could you please clarify what you meant by 'Dotcoma'?" },
    { time: "02:16", speaker: "USER", message: "Tacoma. Dotcoma. I'm located in Tacoma, Washington." },
    { time: "02:16", speaker: "AGENT", message: "Could you please confirm your work authorization status? Are you a U.S. citizen, a Green Card holder, working on an H-1B visa, or do you have another type of work authorization?" },
    { time: "02:27", speaker: "USER", message: "US citizen" },
    { time: "02:27", speaker: "AGENT", message: "If offered the role, would you be willing to proceed after a comprehensive background check and drug test?" },
    { time: "02:36", speaker: "USER", message: "Yes" },
    { time: "02:36", speaker: "AGENT", message: "Could you please share your expected pay rate for this role?" },
    { time: "02:47", speaker: "USER", message: "$35" },
    { time: "02:47", speaker: "AGENT", message: "I'm sorry, but the expected pay rate for this role is between 20 and 22 USD per hour. Would you like to adjust your expected pay rate to align with that range?" },
    { time: "03:01", speaker: "USER", message: "I'm making $35 right now" },
    { time: "03:01", speaker: "AGENT", message: "Do you recall being submitted by any other staffing agency to this exact role today, or in the last few days?" },
    { time: "03:13", speaker: "USER", message: "No" },
    { time: "03:13", speaker: "AGENT", message: "Are you currently interviewing for other positions?" },
    { time: "03:19", speaker: "USER", message: "Yes" },
    { time: "03:19", speaker: "AGENT", message: "Are you close to receiving any offers for other positions?" },
    { time: "03:25", speaker: "USER", message: "No" },
    { time: "03:25", speaker: "AGENT", message: "How many years of experience do you have, with inventory, or asset management?" },
    { time: "03:36", speaker: "USER", message: "10 years" },
    { time: "03:36", speaker: "AGENT", message: "Do you have experience providing technical support, for desktop, laptop, and mobile hardware?" },
    { time: "03:45", speaker: "USER", message: "Yes" },
    { time: "03:45", speaker: "AGENT", message: "Could you share, the best time, for one of our recruiters, to reach out? And move forward, with the process?" },
    { time: "03:57", speaker: "USER", message: "8 in the morning and at Pacific time" },
    { time: "03:57", speaker: "AGENT", message: "I now have all the information I need on my end to submit to the client. Do you have any questions related to the job before we end the call?" },
    { time: "04:07", speaker: "USER", message: "No" },
    { time: "04:07", speaker: "AGENT", message: "Okay, I'm really excited to pass on your screening results to the real recruiter. So, I hope you have an awesome rest of your day. Goodbye" }
  ]
}


const VoiceAI = () => {

  const [data, setData] = useState<data | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('');
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error as Error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">Error fetching data: {error.message}</Typography>;
  }

  return (
    <div id="VoiceAI">
      <div className="VoiceAI-header">
        <Typography variant="h4"><strong>Name  : </strong> {candidateData.name} </Typography>
        <Typography variant="h4"><strong>Email  : </strong>{candidateData.email} </Typography>
        <Typography variant="h4"><strong>Contact : </strong> {candidateData.contact}</Typography>
      </div>
      <div className="voiceAI-container1">
         <Grid container>
            <Grid id="circularProgress" size={2}>
              <CircularProgressWithLabel size={120} value={90}/>
            </Grid>
            <Grid size={8}>
              <ul>
                <li > Total Questions : {candidateData.userData[0]["totalQuestions"]}</li>
                <li>Good Answers : {candidateData.userData[1]["goodAnswers"]}</li>
                <li>Average Answers : {candidateData.userData[2]["averageAnswers"]}</li>
                <li>Bad Answers : {candidateData.userData[3]["badAnswers"]}</li>
              </ul>
            </Grid>
          </Grid>
      </div>
      <div  className="voiceAI-container2">
        <Typography variant="h4">Total Match Score</Typography>
        {
            candidateData.questionsData.map(({id,question,answer})=>(
                <Box key={id} sx={{ flexGrow: 1 }} >
                    <Grid container id="box2" spacing={{ xs: 2, md: 3, lg:4}} columns={{ xs: 2, sm: 4, md: 8,lg:12 }}>
                        <Grid id="circularProgress" size={2}>
                          <CircularProgressWithLabel size={100} value={70}/>
                        </Grid>
                        <Grid id="description" size={9}>
                          <Typography variant="h6">{question}</Typography>
                          <Typography variant="h6">{answer}</Typography>
                        </Grid>
                    </Grid>
                </Box>
            ))
        }
      </div>
      <div   className="voiceAI-container3">
        <Typography variant="h4">Screen questions and time duration</Typography>
              {candidateData.conversationData.map(({time,speaker,message},index)=>(
                <Box key={index} sx={{ flexGrow: 1 }}>
                  <Grid container spacing={{ xs: 2, md: 3, lg:4}} columns={{ xs: 2, sm: 4, md: 8, lg:12 }}>
                     <Grid size={1}>
                       <Typography variant="h5"><strong> {time} </strong></Typography>
                     </Grid>
                     <Grid size={11}>
                      <Typography variant="h5">
                        <strong>  {speaker} :   </strong>{message}
                      </Typography>
                     </Grid>
                  </Grid>
                </Box>
              ))}
      </div>
    </div>
  );
};

export default VoiceAI;
