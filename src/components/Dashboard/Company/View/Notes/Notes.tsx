import {React} from '../../../../../shared/modules/React';
import {Card, CardContent} from '../../../../../shared/modules/MaterialImports/Card';
import {Grid, Button} from '../../../../../shared/modules/commonImports';
import { useFormik, Yup } from "../../../../../shared/modules/Formik";


import './Notes.scss';


const Notes = () => {
    const [userinfo, setUserinfo] = React.useState();
    const initialNotesDetails = {
        "textarea": "",

    }
    const notesSchema = Yup.object().shape({
        "textarea": Yup.string(),
    });
    const notesFormik = useFormik({
        initialValues: initialNotesDetails,
        validationSchema: notesSchema,
        onSubmit: (values: any) => {
            setUserinfo(values);
            // console.log(values);
        }
    });
    return (
        <>
            <div>
                <form
                    onSubmit={notesFormik.handleSubmit}
                >
                    <Card>
                        <CardContent>
                            <Grid>
                                <label>Notes:</label>
                                <div>
                                    <textarea id="textarea"
                                        name="textarea"
                                        value={notesFormik.values.textarea}
                                        onChange={notesFormik.handleChange} />
                                </div>
                            </Grid>
                            <Grid
                                container
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                                className="py-3"
                            >
                                <Button
                                    type="submit"
                                    variant="contained"
                                >
                                    Submit
                                </Button>
                            </Grid>
                        </CardContent>
                    </Card>
                </form>
            </div>
        </>
    )
}
export default Notes;