// import React, { useState ,useEffect } from 'react';
import { useState ,useEffect } from '../../../../../../shared/modules/React';
import {  Checkbox} from '../../../../../../shared/modules/MaterialImports/FormElements';
import {  Dialog, DialogActions, DialogContent, DialogTitle } from '../../../../../../shared/modules/MaterialImports/Dialog';
import { Accordion, AccordionSummary, AccordionDetails} from '../../../../../../shared/modules/MaterialImports/Accordion';
import { Button, Grid } from '../../../../../../shared/modules/commonImports';
import {FormControlLabel } from '../../../../../../shared/modules/MaterialImports/FormInputs';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Typography } from '../../../../../../shared/modules/MaterialImports/Typography';

const data = {
    
    "screen_quiz": {
        "questions": {
            "Data Modeling": [
                {
                    "choices": {
                        "choice_1": "To create user interfaces",
                        "choice_2": "To optimize server performance",
                        "choice_3": "To define the structure and relationships of data",
                        "choice_4": "To implement encryption algorithms"
                    },
                    "correct_choice": "choice_3",
                    "question_1": "What is the purpose of data modeling in database design?",
                    "reason": "Data modeling helps define the structure and relationships of data in a database."
                },
                {
                    "choices": {
                        "choice_1": "Conceptual data modeling",
                        "choice_2": "Physical data modeling",
                        "choice_3": "Spatial data modeling",
                        "choice_4": "Logical data modeling"
                    },
                    "correct_choice": "choice_3",
                    "question_2": "Which of the following is NOT a type of data modeling approach?",
                    "reason": "Spatial data modeling is not a common type of data modeling approach."
                },
                {
                    "choices": {
                        "choice_1": "A database user",
                        "choice_2": "A data attribute",
                        "choice_3": "A distinct object or concept in the real world",
                        "choice_4": "A database table"
                    },
                    "correct_choice": "choice_3",
                    "question_3": "What is an entity in data modeling?",
                    "reason": "In data modeling, an entity represents a distinct object or concept in the real world."
                },
                {
                    "choices": {
                        "choice_1": "By limiting data storage",
                        "choice_2": "By increasing data redundancy",
                        "choice_3": "By improving data consistency and integrity",
                        "choice_4": "By restricting data access"
                    },
                    "correct_choice": "choice_3",
                    "question_4": "How does data modeling contribute to database development?",
                    "reason": "Data modeling helps improve data consistency and integrity in database systems."
                },
                {
                    "choices": {
                        "choice_1": "Testing",
                        "choice_2": "Deployment",
                        "choice_3": "Requirements analysis",
                        "choice_4": "Design"
                    },
                    "correct_choice": "choice_4",
                    "question_5": "Which phase of software development lifecycle involves data modeling?",
                    "reason": "Data modeling is typically done during the design phase of software development."
                }
            ],
                "Design Specifications": [
                    {
                        "choices": {
                            "choice_1": "Requirements defined by the client",
                            "choice_2": "Detailed guidelines for visual and functional elements",
                            "choice_3": "Server configurations for hosting",
                            "choice_4": "Database schemas"
                        },
                        "correct_choice": "choice_2",
                        "question_1": "What are design specifications in web development?",
                        "reason": "Design specifications provide detailed guidelines for visual and functional elements of a website."
                    },
                    {
                        "choices": {
                            "choice_1": "Back-end developers",
                            "choice_2": "Database administrators",
                            "choice_3": "Front-end developers and designers",
                            "choice_4": "Project managers"
                        },
                        "correct_choice": "choice_3",
                        "question_2": "Who is primarily responsible for creating design specifications?",
                        "reason": "Front-end developers and designers are typically responsible for creating design specifications."
                    },
                    {
                        "choices": {
                            "choice_1": "To increase server performance",
                            "choice_2": "To ensure consistent design and user experience",
                            "choice_3": "To optimize database queries",
                            "choice_4": "To install security patches"
                        },
                        "correct_choice": "choice_2",
                        "question_3": "What is the purpose of following design specifications in web development?",
                        "reason": "Following design specifications helps maintain consistent design and user experience."
                    },
                    {
                        "choices": {
                            "choice_1": "Design specifications include technical details, while wireframes are visual blueprints",
                            "choice_2": "Design specifications focus on database structure, while wireframes focus on UI elements",
                            "choice_3": "Design specifications are optional, while wireframes are mandatory",
                            "choice_4": "Design specifications are created by clients, while wireframes are created by developers"
                        },
                        "correct_choice": "choice_1",
                        "question_4": "How are design specifications different from wireframes?",
                        "reason": "Design specifications provide technical details, while wireframes are visual representations."
                    },
                    {
                        "choices": {
                            "choice_1": "By reducing browser compatibility",
                            "choice_2": "By streamlining the development process",
                            "choice_3": "By increasing server downtime",
                            "choice_4": "By automating UI testing"
                        },
                        "correct_choice": "choice_2",
                        "question_5": "How do design specifications contribute to efficient web development?",
                        "reason": "Design specifications help streamline the development process by providing clear guidelines."
                    }
                ],
                    "HighCharts": [
                        {
                            "choices": {
                                "choice_1": "HighCharts",
                                "choice_2": "Bootstrap",
                                "choice_3": "jQuery",
                                "choice_4": "React"
                            },
                            "correct_choice": "choice_1",
                            "question_1": "Which JavaScript charting library is commonly used for data visualization?",
                            "reason": "HighCharts is a popular JavaScript charting library for data visualization."
                        },
                        {
                            "choices": {
                                "choice_1": "Only pie charts",
                                "choice_2": "Only bar charts",
                                "choice_3": "Various types of charts like line, bar, pie, etc.",
                                "choice_4": "Only scatter plots"
                            },
                            "correct_choice": "choice_3",
                            "question_2": "Which type of charts can be created using HighCharts?",
                            "reason": "HighCharts supports creating various types of charts including line, bar, pie, etc."
                        },
                        {
                            "choices": {
                                "choice_1": "Static images",
                                "choice_2": "Dynamic and interactive charts",
                                "choice_3": "Text documents",
                                "choice_4": "Audio files"
                            },
                            "correct_choice": "choice_2",
                            "question_3": "HighCharts provides interactive charts for which of the following?",
                            "reason": "HighCharts provides dynamic and interactive charts for web applications."
                        },
                        {
                            "choices": {
                                "choice_1": "Java",
                                "choice_2": "Python",
                                "choice_3": "JavaScript",
                                "choice_4": "C++"
                            },
                            "correct_choice": "choice_3",
                            "question_4": "Which programming language is commonly used with HighCharts?",
                            "reason": "HighCharts is typically used with JavaScript for web development."
                        },
                        {
                            "choices": {
                                "choice_1": "For playing videos",
                                "choice_2": "For adding text content",
                                "choice_3": "For creating interactive charts and graphs",
                                "choice_4": "For generating sound effects"
                            },
                            "correct_choice": "choice_3",
                            "question_5": "What is the purpose of using HighCharts in web development?",
                            "reason": "HighCharts is used in web development to create interactive charts and graphs."
                        }
                    ],
                        "Kendo UI": [
                            {
                                "choices": {
                                    "choice_1": "CSS framework",
                                    "choice_2": "JavaScript framework",
                                    "choice_3": "Python framework",
                                    "choice_4": "Ruby framework"
                                },
                                "correct_choice": "choice_2",
                                "question_1": "What type of framework is Kendo UI?",
                                "reason": "Kendo UI is a comprehensive JavaScript framework for building web apps."
                            },
                            {
                                "choices": {
                                    "choice_1": "Google",
                                    "choice_2": "Microsoft",
                                    "choice_3": "Oracle",
                                    "choice_4": "Amazon"
                                },
                                "correct_choice": "choice_2",
                                "question_2": "Which company develops Kendo UI?",
                                "reason": "Kendo UI is developed by Progress, formerly known as Telerik."
                            },
                            {
                                "choices": {
                                    "choice_1": "User Interaction",
                                    "choice_2": "User Interface",
                                    "choice_3": "User Integration",
                                    "choice_4": "User Identification"
                                },
                                "correct_choice": "choice_2",
                                "question_3": "What does the UI in Kendo UI stand for?",
                                "reason": "UI in Kendo UI stands for User Interface, indicating its focus on UI components."
                            },
                            {
                                "choices": {
                                    "choice_1": "Grid",
                                    "choice_2": "Charts",
                                    "choice_3": "Database",
                                    "choice_4": "Dropdown"
                                },
                                "correct_choice": "choice_3",
                                "question_4": "Which of the following is NOT a component of Kendo UI?",
                                "reason": "Kendo UI includes components like Grid, Charts, Dropdown, but not Database."
                            },
                            {
                                "choices": {
                                    "choice_1": "3D modeling",
                                    "choice_2": "Web development and UI design",
                                    "choice_3": "Sound editing",
                                    "choice_4": "Data analysis"
                                },
                                "correct_choice": "choice_2",
                                "question_5": "What is Kendo UI primarily used for?",
                                "reason": "Kendo UI is used for web development and creating user interfaces."
                            }
                        ],
                            "Web Development": [
                                {
                                    "choices": {
                                        "choice_1": "Only Java",
                                        "choice_2": "C++ and Python",
                                        "choice_3": "JavaScript, HTML, and CSS",
                                        "choice_4": "Ruby and Perl"
                                    },
                                    "correct_choice": "choice_3",
                                    "question_1": "Which programming languages are commonly used in web development?",
                                    "reason": "Web development often involves JavaScript, HTML, and CSS for front-end."
                                },
                                {
                                    "choices": {
                                        "choice_1": "To define the structure of web pages",
                                        "choice_2": "To add interactivity and dynamic content",
                                        "choice_3": "To style the visual presentation of web pages",
                                        "choice_4": "To store and manage data"
                                    },
                                    "correct_choice": "choice_3",
                                    "question_2": "What is the purpose of CSS in web development?",
                                    "reason": "CSS is used to style the visual presentation of web pages in web development."
                                },
                                {
                                    "choices": {
                                        "choice_1": "React",
                                        "choice_2": "Node.js",
                                        "choice_3": "Angular",
                                        "choice_4": "Vue.js"
                                    },
                                    "correct_choice": "choice_2",
                                    "question_3": "Which of the following is NOT a front-end technology used in web development?",
                                    "reason": "Node.js is a back-end technology, not a front-end technology."
                                },
                                {
                                    "choices": {
                                        "choice_1": "Hypertext Markup Language",
                                        "choice_2": "High Tech Multimedia Language",
                                        "choice_3": "Hyperlink and Text Markup Language",
                                        "choice_4": "Home Tool Markup Language"
                                    },
                                    "correct_choice": "choice_1",
                                    "question_4": "What does HTML stand for in web development?",
                                    "reason": "HTML stands for Hypertext Markup Language, used for creating web pages."
                                },
                                {
                                    "choices": {
                                        "choice_1": "Database management",
                                        "choice_2": "Server configuration",
                                        "choice_3": "Version control using Git",
                                        "choice_4": "Responsive web design"
                                    },
                                    "correct_choice": "choice_4",
                                    "question_5": "Which skill is essential for front-end web developers?",
                                    "reason": "Front-end web developers need to understand responsive web design principles."
                                }
                            ]
        }
    }
}



const QuizDialog = ({ openn, setOpen }) => {
    const [expanded, setExpanded] = useState(false);
    const [selected, setSelected] = useState({});
    const [expandedd, setExpandedd] = useState(false);

    const handleClose = () => {
        setOpen();
    };

    const handleAccordionChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    
    const handleAccordionChangee = (panel) => (event, isExpanded) => {
        setExpandedd(isExpanded ? panel : false);
    };

    useEffect(() => {
        const initialSelected = {};
        Object.entries(data.screen_quiz.questions).forEach(([section, questions]) => {
            questions.forEach((question, qIndex) => {
                initialSelected[`${section}_${qIndex}`] = true;
                Object.keys(question.choices).forEach((key) => {
                    initialSelected[`${section}_${qIndex}_${key}`] = true;
                });
            });
        });
        setSelected(initialSelected);
    }, [data]);

   

    const handleCheckboxChange = (key, isQuestion, section, qIndex) => (event) => {
        const checked = event.target.checked;
        const newSelected = { ...selected, [key]: checked };

        if (isQuestion) {
            Object.keys(data.screen_quiz.questions[section][qIndex].choices).forEach((choiceKey) => {
                newSelected[`${section}_${qIndex}_${choiceKey}`] = checked;
            });
        }

        setSelected(newSelected);
    };

   

    // const generateJson = () => {
    //     const result = {
    //         screen_quiz: {
    //             questions: {},
    //         },
    //     };

    //     Object.entries(data.screen_quiz.questions).forEach(([section, questions]) => {
    //         result.screen_quiz.questions[section] = questions
    //             .filter((question, qIndex) => selected[`${section}_${qIndex}`])
    //             .map((question, qIndex) => {
    //                 const selectedChoices = Object.entries(question.choices)
    //                     .filter(([key]) => selected[`${section}_${qIndex}_${key}`])
    //                     .reduce((acc, [key, value]) => {
    //                         acc[key] = value;
    //                         return acc;
    //                     }, {});

    //                 return {
    //                     ...question,
    //                     choices: selectedChoices,
    //                 };
    //             });
    //     });

    //     console.log(JSON.stringify(result, null, 2));
    // }

    const generateJson = () => {
        const result = {
            screen_quiz: [],
        };

        Object.entries(data.screen_quiz.questions).forEach(([section, questions]) => {
            questions.forEach((question, qIndex) => {
                if (selected[`${section}_${qIndex}`]) {
                    const selectedChoices = Object.entries(question.choices)
                        .filter(([key]) => selected[`${section}_${qIndex}_${key}`])
                        .reduce((acc, [key, value]) => {
                            acc[key] = value;
                            return acc;
                        }, {});

                    result.screen_quiz.push({
                        ...question,
                        choices: selectedChoices,
                    });
                }
            });
        });

        console.log(JSON.stringify(result, null, 2));
    };



    return (
        //   <div>
        //         <Button variant="contained" color="primary" >
        //             Generate
        //         </Button>
        //         <Dialog open={openn} onClose={handleClose} maxWidth="md" fullWidth>
        //             <DialogTitle>Quiz</DialogTitle>
        //             <DialogContent>
        //                 <Grid container spacing={2}>
        //                     {Object.entries(data.screen_quiz.questions).map(([section, questions], sIndex) => (
        //                         <Grid size={12} key={sIndex}>
        //                             <Typography variant="h6">{section}</Typography>
        //                             {questions.map((question, qIndex) => (
        //                                 <Accordion
        //                                     expanded={expanded === `${section}_${qIndex}`}
        //                                     onChange={handleAccordionChange(`${section}_${qIndex}`)}
        //                                     key={`${section}_${qIndex}`}
        //                                 >
        //                                     <AccordionSummary
        //                                         expandIcon={<ExpandMoreIcon />}
        //                                         aria-controls={`panel${qIndex}-content`}
        //                                         id={`panel${qIndex}-header`}
        //                                     >
        //                                         <FormControlLabel
        //                                             control={
        //                                                 <Checkbox
        //                                                     checked={selected[`${section}_${qIndex}`] || false}
        //                                                     onChange={handleCheckboxChange(`${section}_${qIndex}`, true, section, qIndex)}
        //                                                 />
        //                                             }
        //                                             label={question[`question_${qIndex + 1}`]}
        //                                         />
        //                                     </AccordionSummary>
        //                                     <AccordionDetails>
        //                                         {Object.entries(question.choices).map(([key, value]) => (
        //                                             <FormControlLabel
        //                                                 key={key}
        //                                                 control={
        //                                                     <Checkbox
        //                                                         checked={selected[`${section}_${qIndex}_${key}`] || false}
        //                                                         onChange={handleCheckboxChange(`${section}_${qIndex}_${key}`, false)}
        //                                                     />
        //                                                 }
        //                                                 label={value}
        //                                             />
        //                                         ))}
        //                                     </AccordionDetails>
        //                                 </Accordion>
        //                             ))}
        //                         </Grid>
        //                     ))}
        //                 </Grid>
        //             </DialogContent>
        //             <DialogActions>
        //                 <Button onClick={handleClose} color="primary" variant="contained" size="small">
        //                     Cancel
        //                 </Button>
        //                 <Button onClick={generateJson} color="primary" variant="contained" size="small">
        //                     Generate JSON
        //                 </Button>
        //             </DialogActions>
        //         </Dialog>
        //     </div>
        (<div>
            <Button variant="contained" color="primary" onClick={generateJson}>
                Generate
            </Button>
            <Dialog open={openn} onClose={handleClose} maxWidth="md" fullWidth>
                <DialogTitle>Quiz</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        {Object.entries(data.screen_quiz.questions).map(([section, questions], sIndex) => (
                            <Grid size={12} key={sIndex}>
                                <Accordion expanded={expandedd === section} onChange={handleAccordionChangee(section)}>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                        <Typography variant="h6" style={{ fontWeight: '200px' }}>
                                            {section}
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Grid container spacing={2}>
                                            {questions.map((question, qIndex) => (
                                                <Grid size={12} key={qIndex}>
                                                    <Accordion
                                                        expanded={expanded === `${section}_${qIndex}`}
                                                        onChange={handleAccordionChange(`${section}_${qIndex}`)}
                                                        key={`${section}_${qIndex}`}
                                                    >
                                                        <AccordionSummary
                                                            expandIcon={<ExpandMoreIcon />}
                                                            aria-controls={`panel${qIndex}-content`}
                                                            id={`panel${qIndex}-header`}
                                                        >
                                                            <div style={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                                                               
                                                                <Typography
                                                                    variant="body1"
                                                                    style={{ fontWeight: '200px', fontSize: '1.2rem', flexGrow: 1 }}
                                                                >
                                                                    {question[`question_${qIndex + 1}`]}
                                                                </Typography>
                                                                <FormControlLabel
                                                                    control={
                                                                        <Checkbox
                                                                            checked={selected[`${section}_${qIndex}`] || false}
                                                                            onChange={handleCheckboxChange(`${section}_${qIndex}`, true, section, qIndex)}
                                                                        />
                                                                    }
                                                                    style={{ marginRight: '16px' }}
                                                                />
                                                            </div>
                                                        </AccordionSummary>
                                                        <AccordionDetails>
                                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                                {Object.entries(question.choices).map(([key, value]) => (
                                                                    <Typography key={key} style={{ fontSize: '1rem' }}>
                                                                        {value}
                                                                    </Typography>
                                                                ))}
                                                            </div>
                                                        </AccordionDetails>
                                                    </Accordion>
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </AccordionDetails>
                                </Accordion>
                            </Grid>
                        ))}
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" variant="outlined" size="small">
                        Cancel
                    </Button>
                    <Button onClick={generateJson} color="primary" variant="contained" size="small">
                        Generate JSON
                    </Button>
                </DialogActions>
            </Dialog>
        </div>)
    );
};

export default QuizDialog;
