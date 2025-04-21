import { React } from '../../../../../shared/modules/React';
import { TextField, Grid } from '../../../../../shared/modules/commonImports';
import { Card, CardContent } from '../../../../../shared/modules/MaterialImports/Card';
import { useFormik, Yup } from "../../../../../shared/modules/Formik";


import './MSPProgramInformation.scss';


const MSPProgramInformation = () => {
    const [userinfo, setUserinfo] = React.useState();
    const initialProgrammingDetails = {
        "msp": "",

    }
    const programmingSchema = Yup.object().shape({
        "msp": Yup.string(),
    });
    const programmingFormik = useFormik({
        initialValues: initialProgrammingDetails,
        validationSchema: programmingSchema,
        onSubmit: (values: any) => {
            setUserinfo(values);
            // console.log(values);
        }
    });
    return (
        <>
            <div>
                <form
                    onSubmit={programmingFormik.handleSubmit}
                >
                    <Card>
                        <CardContent>
                            <Grid container spacing={2}>
                                <Grid size={10}>
                                    <label>MSP:</label>
                                    <div>
                                        <TextField
                                            id="msp"
                                            name="msp"
                                            size="small"
                                            margin="dense"
                                            value={programmingFormik.values.msp}
                                            onChange={programmingFormik.handleChange}
                                        />
                                    </div>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </form>
            </div>
        </>
    )
}
export default MSPProgramInformation;