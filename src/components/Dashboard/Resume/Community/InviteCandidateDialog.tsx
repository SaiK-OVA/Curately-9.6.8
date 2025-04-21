import { useState, useCallback } from '../../../../shared/modules/React';
import { useFormik, Yup } from '../../../../shared/modules/Formik';
import { useDropzone, FileWithPath, FileRejection } from 'react-dropzone';
import Papa from 'papaparse';
import { showToaster } from '../../../shared/SnackBar/SnackBar';
import ApiService from '../../../../shared/api/api'
import { userLocalData } from '../../../../shared/services/userData';
import IsValidUrl from '../../../../shared/utils/IsValidUrl';
import { Grid, Button, IconButton, TextField, InputAdornment, } from '../../../../shared/modules/commonImports'
import { Dialog, DialogTitle, DialogContent, DialogActions, } from "../../../../shared/modules/MaterialImports/Dialog";
import { Card, CardContent } from '../../../../shared/modules/MaterialImports/Card';
import { Stack } from '../../../../shared/modules/MaterialImports/Stack';
import { Typography } from "../../../../shared/modules/MaterialImports/Typography";
import Link from "@mui/material/Link";
import { Divider } from '../../../../shared/modules/MaterialImports/Divider';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { Box } from "../../../../shared/modules/MaterialImports/Box";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import MarkEmailReadOutlinedIcon from '@mui/icons-material/MarkEmailReadOutlined';
import DownloadSampleCsv from './DownloadSampleCsv';


import './InviteCandidateDialogue.scss'


interface InviteCandidateDialogProps {
  open: boolean;
  onClose: () => void;
}
interface CsvDataRow {
  Name: string;
  Email: string;

}
interface FormValues {
  inviteUrl: string;
  inviteCandidates: Array<{
    name: string;
    email: string;
  }>;
}

function InviteCandidatesDialog({ open, onClose }: InviteCandidateDialogProps) {
  const [fileTypeError, setFileTypeError] = useState('');
  // const [copiedValue, setCopiedValue] = useState('');
  const [isFileRejectionDialogOpen, setFileRejectionDialogOpen] = useState(false);
  const [isFileSelectedDialogOpen, setFileSelectedDialogOpen] = useState(false);
  const [isInvitationSent, setIsInvitationSent] = useState(false);

  const inviteCandidateSchema = Yup.object({
    inviteUrl: Yup.string(),
    inviteCandidates: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().required('Required'),
        email: Yup.string().required('Required').email('Invalid email format')
      })
    )
  });
  const csvCandidateSchema = Yup.object({
    csvCandidates: Yup.array().of(
      Yup.object().shape({
        Name: Yup.string().required('Required'),
        Email: Yup.string().required('Required').email('Invalid email format')
      })
    )
  });

  const inviteCandidatesFormik = useFormik<FormValues>({
    initialValues: {
      // clientId=${window.btoa(userLocalData.getvalue('clientId'))}&
      inviteUrl: `https://careers.curately.ai/signup?shortName=${window.btoa(userLocalData.getvalue('shortName'))}`,
      inviteCandidates: [{ name: '', email: '' }],

    },
    validationSchema: inviteCandidateSchema,
    onSubmit: () => {
      handleSendInvitePostApiCall('form')
    },
    validateOnMount: true
  });

  const csvCandidatesFormik = useFormik({
    initialValues: {
      csvCandidates: [] as CsvDataRow[],
    },
    validationSchema: csvCandidateSchema,
    onSubmit: () => {
      handleSendInvitePostApiCall('csv')
    },
    validateOnMount: true,
  });

  const handleAddEmail = () => {
    const nextCandidates = [
      ...inviteCandidatesFormik.values.inviteCandidates,
      { name: '', email: '' }
    ];
    inviteCandidatesFormik.setFieldValue('inviteCandidates', nextCandidates);
  };

  const handleDeleteEmail = (index: any) => {
    const nextCandidates = inviteCandidatesFormik.values.inviteCandidates.filter((_, i) => i !== index);
    inviteCandidatesFormik.setFieldValue('inviteCandidates', nextCandidates);
  };

  const handleSendInvitePostApiCall = (source: 'form' | 'csv') => {
    let userList: any = [];
    if (source === 'form') {
      userList = inviteCandidatesFormik.values.inviteCandidates.map(({ name, email }) => ({
        name,
        email,
      }));
    } else if (source === 'csv') {
      userList = csvCandidatesFormik.values.csvCandidates.map(({ Name, Email }) => ({
        name: Name,
        email: Email,
      }));
    }
    const payload = {
      clientId: userLocalData.getvalue('clientId'),
      link: "",
      userList: userList,
      recrId : userLocalData.getvalue('recrId'),
    };
    console.log("Payload for API:", payload);
    // API call
    ApiService.postWithData('admin', 'inviteCommunity', payload)
      .then((response: any) => {
        if (response.status === 200) {
          if (source === 'form') {
            inviteCandidatesFormik.resetForm();

          } else if (source === 'csv') {
            csvCandidatesFormik.resetForm();
            setFileSelectedDialogOpen(false);

          }
          setIsInvitationSent(true);
          onClose();
        } else {
          showToaster('Error sending team invite!', 'error');
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        showToaster('Error occurred.', 'error');
      });
  };


  const handleCloseConfirmation = () => {
    setIsInvitationSent(false); // Close the confirmation dialog
    onClose(); // Close the Invite dialog
  };
  const handleFileRead = (file: any) => {
    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (results) => {
        const parsedData = results.data as CsvDataRow[];
        csvCandidatesFormik.setValues({ csvCandidates: parsedData });
        setFileSelectedDialogOpen(true);
      }
    });
  };

  const onDrop = useCallback((acceptedFiles: FileWithPath[], fileRejections: FileRejection[]) => {
    if (fileRejections.length > 0) {
      setFileRejectionDialogOpen(true);
    } else if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      if (file.type === 'text/csv') {
        handleFileRead(file);
      } else {
        setFileTypeError('Only CSV files are allowed');
      }
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    onDrop,
    multiple: false,
    accept:
    {
      'text/csv': ['.csv']
    }

  });

  const files = acceptedFiles.map((file: any) => (
    <span key={file.path}>
      {file.path} - {(file.size / (1024 * 1024)).toFixed(2)} MB
    </span>
  ));
  const handleAddRow = () => {
    const nextCandidates = [
      ...csvCandidatesFormik.values.csvCandidates,
      { Name: '', Email: '' }
    ];
    csvCandidatesFormik.setFieldValue('csvCandidates', nextCandidates);
  };
  const handleDeleteRow = (index: any) => {
    const updatedCsvCandidates = csvCandidatesFormik.values.csvCandidates.filter((_, i) => i !== index);
    csvCandidatesFormik.setFieldValue('csvCandidates', updatedCsvCandidates);
  };

  function getValidUrl(url: string) {
    if (IsValidUrl.check(url)) {
      navigator.clipboard.writeText(url);
      showToaster('Link Copied', 'success');
    } else {
      showToaster('Not a Valid URL', 'error');
    }
    console.log("copy link clicked")
    console.log(inviteCandidatesFormik.errors)
  }
  return (
    <>

      <Dialog open={open} onClose={onClose} maxWidth={'sm'} fullWidth={true}>
        <form >
          <DialogTitle >
            <Grid container direction="row" justifyContent="space-between" alignItems="center">
              <span style={{ fontWeight: 'bold' }}>Invite Candidate</span>
              <Stack direction="row" spacing={1}>
                <Button color="primary" variant="contained" size="small" onClick={() => inviteCandidatesFormik.submitForm()}>
                  Send Invite
                </Button>
                <Button color="secondary" variant="outlined" size="small" onClick={onClose}>
                  Cancel
                </Button>
              </Stack>
            </Grid>
          </DialogTitle>
          <Divider />

          <div style={{ maxHeight: '80vh', overflowY: 'auto' }}>
            <DialogContent>
              <Typography paragraph>
                Build your talent community using any of the various methods below.
              </Typography>

              <Typography variant="subtitle1">Method 1: Unique Invitation Link</Typography>
              <Grid mx={1} alignContent="center"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}>
                <TextField
                  className={`mt-2 pr-0`}
                  fullWidth
                  id="inviteUrl"
                  variant="outlined"
                  type="text"
                  size="small"
                  onChange={inviteCandidatesFormik.handleChange}
                  value={inviteCandidatesFormik.values.inviteUrl}
                  sx={{
                    '.MuiInputBase-formControl': {
                      paddingRight: '0 !important'
                    }
                  }}
                  InputProps={{
                    endAdornment: <div>
                      <InputAdornment position="end">
                        <Button onClick={() => getValidUrl(inviteCandidatesFormik.values.inviteUrl)} variant="contained"
                          color="primary"
                          sx={{ minHeight: '35px !important' }}
                        >Copy Link</Button>

                      </InputAdornment>
                    </div>
                  }}
                />
              </Grid>

              <Divider sx={{ mt: 2 }}>OR</Divider>
              <div className='dropZone'>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography variant="subtitle1">
                    Method 2: Upload CSV file
                  </Typography>
                  <Link href="#" underline="hover" onClick={() => { }}>
                    <DownloadSampleCsv />
                  </Link>
                </Stack>
              </div>
              <Box sx={{ width: '100%', marginBottom: '20px' }}>
                <div className='customDropZone'>
                  <div {...getRootProps({ className: `dropzone ${acceptedFiles.length > 0 ? 'fileDroped' : ''}` })}>
                    <input {...getInputProps()} multiple={false} />
                    {isDragActive ? <p>Drop the CSV here ...</p> : files.length > 0 ? <p>{files}</p> : <Stack
                      direction="column"
                      justifyContent="center"
                      alignItems="center"
                      spacing={1}
                    >
                      <UploadFileIcon />
                      <Typography>Drag drop resume here</Typography>
                      <Typography>or click here to browse your device<span style={{ color: 'red' }}>*</span></Typography>
                    </Stack>}
                  </div>
                </div>
                {fileTypeError && <Typography color="error">{fileTypeError}</Typography>}
              </Box>
              <Divider sx={{ my: 2 }}>OR</Divider>
              <Typography variant="subtitle1">Method 3: Send personalized emails to candidates</Typography>
              <Stack m={1}>
                {inviteCandidatesFormik.values.inviteCandidates.map((entry, index) => (
                  <Stack key={index} direction="row" spacing={1} alignItems="center">
                    <TextField
                      label="Name"
                      name={`inviteCandidates[${index}].name`}
                      variant="outlined"
                      size="small"
                      fullWidth
                      value={entry.name}
                      onChange={inviteCandidatesFormik.handleChange}
                      error={inviteCandidatesFormik.touched.inviteCandidates?.[index]?.name && Boolean(inviteCandidatesFormik.errors.inviteCandidates?.[index]?.name)}
                      helperText={(inviteCandidatesFormik.touched.inviteCandidates?.[index]?.name && inviteCandidatesFormik.errors.inviteCandidates?.[index]?.name) || ' '}
                    />
                    <TextField
                      label="Email"
                      name={`inviteCandidates[${index}].email`}
                      value={entry.email}
                      onChange={inviteCandidatesFormik.handleChange}
                      variant="outlined"
                      size="small"
                      fullWidth
                      //error={Boolean(inviteCandidatesFormik.errors.inviteCandidates?.[index]?.email) && isFormSubmitted}
                      error={inviteCandidatesFormik.touched.inviteCandidates?.[index]?.email && Boolean(inviteCandidatesFormik.errors.inviteCandidates?.[index]?.email)}
                      helperText={(inviteCandidatesFormik.touched.inviteCandidates?.[index]?.email && inviteCandidatesFormik.errors.inviteCandidates?.[index]?.email) || ' '}
                    />
                    {
                      inviteCandidatesFormik.values.inviteCandidates.length > 1 ? (
                        <IconButton
                          color="error"
                          onClick={() => handleDeleteEmail(index)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      ) : null
                    }

                  </Stack>
                ))}
                <Grid container justifyContent="flex-end">
                  <Button variant="outlined" startIcon={<AddIcon />} onClick={handleAddEmail}>
                    Add More
                  </Button>
                </Grid>
              </Stack>
            </DialogContent>
          </div>
        </form>
      </Dialog>
      <Dialog maxWidth="md" open={isFileRejectionDialogOpen} onClose={() => setFileRejectionDialogOpen(false)}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          {/* fileRejection dialog */}
          <Card className='customCard px-4 py-2'>
            <CardContent>
              <Box textAlign="center">
                <ErrorOutlineIcon
                  sx={{

                    fontSize: "4rem"
                  }} color="error" />
                <Typography color="textSecondary" gutterBottom>
                  Oops !!
                </Typography>
                <Typography variant="h5" component="p">
                  This is not what we expected.
                </Typography>
              </Box>
              <Box sx={{ p: 2 }}>
                <Typography variant="body2" component="p">
                  Please make sure uploaded file matches these points
                  <ul>
                    <li>It must contain in either excel or csv format.</li>
                    <li>Must contain atleast one record.</li>
                    <li>File size should NOT be more than 1MB.</li>
                    <li>Your internet connection must be stable during the process.</li>
                  </ul>
                </Typography>
                <Typography variant="body2" component="p">   You also can
                  <Button variant="text">
                    Download Sample File
                  </Button>
                  to make it easy</Typography>
              </Box>

              <Box textAlign="center" sx={{ pl: 17 }}>
                <Button variant="contained" color="primary" onClick={() => setFileRejectionDialogOpen(false)}>
                  Lets Try Again
                </Button>
              </Box>
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>
      <Dialog open={isFileSelectedDialogOpen} onClose={() => setFileSelectedDialogOpen(false)} maxWidth={'sm'} fullWidth>

        <DialogTitle>
          <Grid container direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant='h5'>Invite Candidate</Typography>
            <Stack direction="row" spacing={1}>
              <Button color="primary" variant="contained" size="small" onClick={() => csvCandidatesFormik.submitForm()}>
                Send Invite
              </Button>
              <Button color="secondary" variant="outlined" size="small" onClick={() => setFileSelectedDialogOpen(false)}>
                Cancel & Go Back
              </Button>
            </Stack>
          </Grid>
        </DialogTitle>
        <Divider />
        <DialogContent>
          {/* <Card className='customCard px-4 py-2'> */}
          <Stack direction="column" spacing={1}>
            <Typography variant="subtitle1" gutterBottom sx={{ color: "green" }}>
              We found  {csvCandidatesFormik.values.csvCandidates.length} people to invite from your sheet.
            </Typography>
            {csvCandidatesFormik.values.csvCandidates.map((row, index) => (
              <Stack key={index} direction="row" spacing={1} alignItems="center">
                <TextField
                  label="Name"
                  name={`csvCandidates[${index}].Name`}
                  variant="outlined"
                  size="small"
                  value={row.Name}
                  onChange={csvCandidatesFormik.handleChange}
                  error={csvCandidatesFormik.touched.csvCandidates?.[index]?.Name && Boolean(csvCandidatesFormik.errors.csvCandidates?.[index]?.Name)}
                  helperText={(csvCandidatesFormik.touched.csvCandidates?.[index]?.Name && csvCandidatesFormik.errors.csvCandidates?.[index]?.Name) || " "}
                />
                <TextField
                  label="Email"
                  variant="outlined"
                  size="small"
                  value={row.Email}
                  name={`csvCandidates[${index}].Email`}
                  onChange={csvCandidatesFormik.handleChange}
                  error={csvCandidatesFormik.touched.csvCandidates?.[index]?.Email && Boolean(csvCandidatesFormik.errors.csvCandidates?.[index]?.Email)}
                  helperText={(csvCandidatesFormik.touched.csvCandidates?.[index]?.Email && csvCandidatesFormik.errors.csvCandidates?.[index]?.Email) || " "}
                />
                {
                  csvCandidatesFormik.values.csvCandidates.length > 1 ? (
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteRow(index)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  ) : null
                }

              </Stack>
            ))}
          </Stack>
          {/* </Card> */}
        </DialogContent>
        <DialogActions>
          <Grid container justifyContent="flex-end">
            <Button variant="outlined" startIcon={<AddIcon />} onClick={handleAddRow}>
              Add More
            </Button>
          </Grid>
        </DialogActions>

      </Dialog>
      <Dialog open={isInvitationSent} onClose={handleCloseConfirmation}>
        <DialogTitle>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <MarkEmailReadOutlinedIcon
              sx={{
                color: "primary.main",
                fontSize: "4rem"
              }}
            />
            <Typography variant="h6" component="div">
              Invitation Sent to Candidates
            </Typography>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <Box textAlign="center">
            <Typography>
              We've sent an invitation email with application form link to the candidates. Stay tuned, we'll notify updates to your dashboard.
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmation} variant="contained" color="primary">Thanks</Button>
        </DialogActions>
      </Dialog>

    </>
  );
}

export default InviteCandidatesDialog
