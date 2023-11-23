import { Paper } from "@mui/material";
import Input from '@mui/material/Input';
import { Box } from '@mui/system';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { motion } from 'framer-motion';
import { Typography } from "@mui/material";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from "@mui/material/Button";

function UserManagement(props) {
    const headers = [
        {
            id: 'id',
            align: 'center',
            disablePadding: true,
            label: 'NO',
            sort: false,
        },
        {
            id: 'customer',
            align: 'center',
            disablePadding: false,
            label: 'Customer',
            sort: true,
        },
        {
            id: 'email',
            align: 'center',
            disablePadding: false,
            label: 'Email',
            sort: true,
        },
        {
            id: 'role',
            align: 'center',
            disablePadding: false,
            label: 'Role',
            sort: true,
        },
        {
            id: 'action',
            align: 'center',
            disablePadding: false,
            label: 'Action',
            sort: true,
        }
    ];

    return (
        <>
            <Paper
                className="p-24 sm:p-32 border-b-1 mt-32 mx-32"
                component={motion.div}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
            >
                <div className="flex flex-col items-center sm:items-start">
                    <Typography
                        className="inline text-20 text-center font-bold"
                        component={motion.div}
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
                        variant="body2"
                        color="text.secondary"
                    >
                        Search Filters
                    </Typography>
                </div>
                <div className="flex flex-col sm:flex-row space-y-16 sm:space-y-0 flex-1 items-center mt-16 -mx-8">
                    <Box
                        component={motion.div}
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
                        className="flex flex-1 w-full sm:w-auto items-center px-16 mx-8 border-1 rounded-full"
                    >
                        <FuseSvgIcon color="action" size={20}>
                            heroicons-outline:search
                        </FuseSvgIcon>

                        <Input
                            placeholder="Search"
                            className="flex flex-1 px-16"
                            disableUnderline
                            fullWidth
                            // value={searchText}
                            inputProps={{
                                'aria-label': 'Search',
                            }}
                        // onChange={(ev) => dispatch(setContactsSearchText(ev))}
                        />
                    </Box>
                </div>
            </Paper>
            <Paper
                className="flex flex-col flex-auto p-24 sm:p-32 border-b-1 mt-32 mx-32"
                component={motion.div}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
            >
                <Button
                    className="mx-8"
                    variant="contained"
                    color="secondary"
                    sx={{ alignSelf: 'flex-end' }}
                >
                    Add User
                </Button>
                {/* <div className="flex">
                    <div className="w-full">

                    </div>
                    <Button
                        className="mx-8"
                        variant="contained"
                        color="secondary"
                        sx = {{ flexShrink: 0}}
                    >
                        Add User
                    </Button>
                </div> */}
                <Table className="simple w-full mt-16">
                    <TableHead>
                        <TableRow>
                            {headers.map((item, index) => (
                                <TableCell
                                    key={index}
                                    align={item.align}
                                    padding={item.disablePadding ? 'none' : 'normal'}
                                >
                                    <Typography
                                        color="text.secondary"
                                        className="font-semibold text-12 whitespace-nowrap"
                                    >
                                        {item.label}
                                    </Typography>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>

                    <TableBody></TableBody>
                </Table>
            </Paper>
        </>
    )
}

export default UserManagement;