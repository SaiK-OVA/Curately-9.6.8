
import { Grid } from '../../../../shared/modules/MaterialImports/Grid';
import { TextField } from '../../../../shared/modules/MaterialImports/TextField';
import { MenuItem } from '../../../../shared/modules/MaterialImports/Menu';
import { ChangeEvent } from 'react';


const ClientList = (
    {
        selectedClientId,
        handleClientChange,
        clientList
    }
        :
        {
            selectedClientId: string;
            handleClientChange: (event: ChangeEvent<HTMLInputElement>) => void;
            clientList: {
                id: number;
                logo: string;
                name: string;
                status: boolean;
            }[];
        }
) => {
    return (
        <TextField
            id="clientsList"
            value={selectedClientId}
            // label="Client"
            onChange={handleClientChange}
            size='small'
            select
            className='ml-3'
        >
            {
                clientList.map((i) => {
                    return <MenuItem value={i.id}>
                        <Grid
                            container
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="center"
                        >
                            <div className='clientListLogoSpan'>
                                {
                                    i.logo ?
                                        <img alt={i.name} src={`${import.meta.env.VITE_URL_AWS}curately/${i.logo}`} className='clientListLogo'
                                        />
                                        :
                                        null
                                }
                            </div>
                            <div className='pl-3'>{i.name}</div>
                        </Grid>
                    </MenuItem>
                })
            }
        </TextField>
    )
}

export default ClientList