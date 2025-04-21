import {Button} from "../../../../shared/modules/MaterialImports/Button";
import {Stack} from "../../../../shared/modules/MaterialImports/Stack";
import {Typography} from "../../../../shared/modules/MaterialImports/Typography";
import { useState,useMemo} from "../../../../shared/modules/React";
import AddUser from "./AddUser";
import  { MaterialReactTable ,type MRT_ColumnDef} from "../../../../shared/modules/MaterialReactTable";
import './Users.scss';
import AddRole from "./AddRole/AddRole";
import AddCompany from "./AddCompany/AddCompany";
const Users = () => {
    
    // const [filtersExpand, setFiltersExpand] = useState(false);
    const [openAddUserModal, setOpenAddUserModal] = useState(false);
    const [openAddRoleModal, setOpenAddRoleModal] = useState(false);
    const [openAddCompanyModal, setOpenAddCompanyModal] = useState(false);

    // const toggleFilers = () => {
    //     setFiltersExpand(!filtersExpand);
    // }
    const data=[{
        firstName:'Sid',
        password:"123",
        fullName:'SidSam',
        email:'sid@gmail.com',
        phoneNo:'1234567890',
        jobTitle:'Developer'
    },{
        firstName:"Sam",
        password:"456",
        fullName:"SamBin",
        email:"bin@gmail.com",
        phoneNo:"9876543210",
        jobTitle:"Engineer",
    },{
        firstName:"Asd",
        password:"45697",
        fullName:"AsdKim",
        email:"trdff@gmail.com",
        phoneNo:"6543219870",
        jobTitle:"Developer",
    },{
        firstName:"Ben",
        password:"852",
        fullName:"BenHgf",
        email:"hngfv@uijk.com",
        phoneNo:"852475893",
        jobTitle:"Developer",
    },{
        firstName:"Gen",
        password:"54",
        fullName:"GenZen",
        email:"hgf@gt.com",
        phoneNo:"32106549887",
        jobTitle:"Developer",
    }
]
console.log(data);
    const columns: MRT_ColumnDef<(typeof data)[0]>[] = useMemo(
        () => [
            {
                accessorKey: 'firstName',
                header: 'Username'
            },
            {
                accessorKey: 'password',
                header: 'Password',
            },
            {
                accessorKey: 'fullName',
                header: 'Fullname',
            },
            {
                accessorKey: 'email',
                header: 'Email',
            },
            {
                accessorKey: 'phoneNo',
                header: 'Phone',
            },
            {
                accessorKey: 'jobTitle',
                header: 'Role',
            },
        ],[]);
    return (
        <div className="findContact MRTableCustom pt-3">
            <Stack
                direction="row"
                className="customCard px-4 py-2"
                justifyContent="space-between"
                alignItems="center"
                sx={{ minHeight: 'auto !important' }}
            >
                <Typography variant="h6" className="header">
                    Users
                </Typography>
                <Stack direction="row" className="btn-container" spacing={1}>
                <Button variant="contained" color="primary" size="small" onClick={() => setOpenAddCompanyModal(true)}
                    >
                        Add Company
                    </Button>
                <Button variant="contained" color="primary" size="small" onClick={() => setOpenAddRoleModal(true)}
                    >
                        Add Role
                    </Button>
                    <Button variant="contained" color="primary" size="small" onClick={() => setOpenAddUserModal(true)}
                    >
                        Add User
                    </Button>
                    {
                        (openAddUserModal) ?
                            <AddUser
                                open={openAddUserModal}
                                closePopup={() => setOpenAddUserModal(false)}
                            />
                            :
                            null
                    }
                    {
                        (openAddRoleModal) ?
                            <AddRole
                                open={openAddRoleModal}
                                closePopup={() => setOpenAddRoleModal(false)}
                            />
                            :
                            null
                    }
                     {
                        (openAddCompanyModal) ?
                            <AddCompany
                                open={openAddCompanyModal}
                                closePopup={() => setOpenAddCompanyModal(false)}
                            />
                            :
                            null
                    }
                </Stack>
            </Stack>
            <MaterialReactTable
                            columns={columns}
                            enableRowSelection
                            data={data}
        />
        </div>
    )
}

export default Users;