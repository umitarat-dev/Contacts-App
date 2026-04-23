import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

import InputAdornment from '@mui/material/InputAdornment';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';  

const FormComponent = () => {
    return (
        <Grid 
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{
                width: '300px', 
                textAlign: 'center', 
                margin: '20px auto'}}
        >
            <div className='contact-header'>
                <div>
                    <a 
                        href="https://clarusway.com/"
                        className='brand'
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <code>{'<UmitDev/>'}</code>
                    </a>
                </div>
                <span className='brand'>design</span>
            </div>
            
            <h2 className='contact-header'>Add Contact</h2>

            <Box 
                sx={{
                    // backgroundColor: 'white', 
                    bgColor: 'backgroun.paper', 
                    padding: '20px',
                    // width: '100%', 
                    // p:2, 
                    // borderRadius: 2
                }}
            >
                <Stack 
                    spacing={3}
                    direction="column"
                >
                    <TextField 
                        variant='outlined'
                        label="Name"
                        // placeholder='Name'
                        name='username'
                        // value={""}
                        onChange={() => {}}
                        
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircleIcon />
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />



                    <TextField/>

                    <TextField/>

                </Stack>
            </Box>
        </Grid>
    )
};

export default FormComponent;













// import { useState } from "react";
// import {
//   Grid,
//   TextField,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Button,
// } from "@mui/material";


// const FormComponent = () => {
//   const [form, setForm] = useState({
//     name: "",
//     phone: "",
//     gender: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(form);
//   };

//   return (
//     <Grid
//       container
//       direction="column"
//       spacing={2}
//       sx={{
//         width: 300,
//         p: 2,
//         backgroundColor: "white",
//         borderRadius: 2,
//       }}
//     >
//       <Grid item>
//         <TextField
//           fullWidth
//           label="Name"
//           name="name"
//           value={form.name}
//           onChange={handleChange}
//         />
//       </Grid>

//       <Grid item>
//         <TextField
//           fullWidth
//           label="Phone Number"
//           name="phone"
//           value={form.phone}
//           onChange={handleChange}
//         />
//       </Grid>

//       <Grid item>
//         <FormControl fullWidth>
//           <InputLabel id="gender-label">Gender</InputLabel>
//           <Select
//             labelId="gender-label"
//             name="gender"
//             value={form.gender}
//             label="Gender"
//             onChange={handleChange}
//           >
//             <MenuItem value="female">Female</MenuItem>
//             <MenuItem value="male">Male</MenuItem>
//             <MenuItem value="others">Others</MenuItem>
//           </Select>
//         </FormControl>
//       </Grid>

//       <Grid item>
//         <Button
//           variant="contained"
//           fullWidth
//           onClick={handleSubmit}
//         >
//           Submit
//         </Button>
//       </Grid>
//     </Grid>
//   );
// };

// export default FormComponent;
