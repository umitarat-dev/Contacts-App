import { useForm, Controller } from "react-hook-form";
import Grid from "@mui/material/Grid";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  MenuItem,
  Select,
  Button,
  Container,
  Box,
  Typography,
} from "@mui/material";

import InputAdornment from '@mui/material/InputAdornment';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import { AddUser, UpdateUser } from "../../utils/functions";
import { useEffect, useRef } from "react";
import { toastSuccess, toastError } from "../../utils/toastify";

import { isDuplicatePhone } from "../../utils/validators";


const FormComponent = ({ editId, editData, clearEdit, users }) => {
  const defaultValues = {
    userName: "",
    phoneNumber: "",
    gender: "",
  };
  const { control, handleSubmit, reset } = useForm({
    defaultValues,
  });
  const formRef = useRef(null);

  // First step, Add - Create; 
  // const onSubmit = async (formData) => {
  //   // console.log("FORM DATA:", formData);
  //   try {
  //     await AddUser(formData);
  //     console.log("User added successfully");
  //     reset(); // FORM TEMİZLENİR
  //   } catch (error) {
  //     console.error("Error adding user:", error);
  //   }
  // };


  // // Second step, for Update - Edit;
  // useEffect(() => {
  //   if ( !editId || !editData) return; 
  //     reset({
  //       userName: editData.user_name,
  //       phoneNumber: editData.phone_number,
  //       gender: editData.gender,
  //     });
  // }, [editId, editData, reset]);


  // Second step, for Update - Edit;
  useEffect(() => {
    if ( !editId || !editData) return; 
    reset({
      userName: editData.user_name,
      phoneNumber: editData.phone_number,
      gender: editData.gender,
    });

    // Form’a scroll et
    setTimeout(() => {
      if (!formRef.current) return;
      const navbarOffset = 120; // 🔥 Navbar + boşluk (ayarlanabilir)
      const elementPosition = formRef.current.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navbarOffset;
      window.scroll({
        top: offsetPosition,
        behavior: "smooth",
      });
      
    }, 50);  
    
  }, [editId, editData, reset]);



  // First-Second step, Add - Update - Edit;
  const isFormValid = ({ userName, phoneNumber, gender }) =>
  userName && phoneNumber && gender; // Boş form kontrol!

  const onSubmit = async (formData) => {
    // Form boş ise Hata ver!
    if (!isFormValid(formData)) {
      toastError("Please fill all fields ❌");
      return;
    }

    if (isDuplicatePhone(users, formData.phoneNumber, editId)) {
      toastError("This phone number already exists 📞❌");
      return;
    }

    try {
      if (editId) {
        await UpdateUser(editId, formData);
        clearEdit(); // Edit moddan çık, Add moda dön
        toastSuccess("User updated successfully ✅");
      } else {
        await AddUser(formData);
        toastSuccess("User added successfully 🎉");
      }

      reset(defaultValues); 

    } catch (error) {
        toastError("Something went wrong ❌");
        console.error("Error adding user:", error);
    }
  };


  return (
    <Container 
      maxWidth="xs"
      sx={{
      }}>

    {/* Header */}
    <Box 
      textAlign="center" 
      mb={2}
      p={0.7}
      sx={{ 
        borderRadius: 1,
        // backgroundColor: "white",
        bgcolor: "background.paper", // dark-light mode için
      }}

    >
      <Typography 
        component='a'
        href="https://clarusway.com"
        target="_blank"
        rel="noopener noreferrer"
        sx={{ 
          fontFamily: "'Girassol', cursive",
          fontSize: '2rem',
          display: 'block',
          textDecoration: 'none',
          "&:hover": {
            textDecoration: 'underline',
          },
        }}
      >
        {"<UmitDev/>"}  
      </Typography>

      <Typography        
        sx={{ 
          fontFamily: "'Girassol', cursive",
          fontSize: '1.5rem'
        }}
      >
        Design
      </Typography>
    </Box>

    <Box 
      textAlign="center" 
      mb={2}
    >
      <Typography
        p={1} 
        sx={{ 
          fontFamily: "'Girassol', cursive",
          // backgroundColor: "white",
          bgcolor: "background.paper", // dark-light mode için
          borderRadius: 1,
          fontSize: '1.5rem'
        }}
      >   
        {/* Add Contact */}
        {editId ? "Edit Contact" : "Add Contact"}
      </Typography>

    </Box>

    <Box ref={formRef}>
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid 
        container 
        spacing={2}
        sx={{
          display:"flex",
          flexDirection: 'column',
          // backgroundColor: 'white',
          bgcolor: 'background.paper', // dark-light mode için
          color: "text.primary",
          padding: 2,
          borderRadius: 1,
        }}
      >

        {/* Name */}
        <Grid >
          <Controller
            name="userName"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel>Name</InputLabel>
                <OutlinedInput 
                  id="name-input"
                  {...field} 
                  label="Name"
                  startAdornment= {
                    <InputAdornment position="start">
                      <AccountCircleIcon />
                    </InputAdornment>
                  }
                  sx={{
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "divider",
                    },
                  }}
                 />
              </FormControl>
            )}
          />
        </Grid>

        {/* Phone */}
        <Grid >
          <Controller
            name="phoneNumber"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel>Phone</InputLabel>
                <OutlinedInput 
                  id="phone-input"
                  {...field} 
                  label="Phone" 
                  startAdornment= {
                    <InputAdornment position="start">
                      <PhoneEnabledIcon />
                    </InputAdornment>
                  }
                  sx={{
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "divider",
                    },
                  }}
                />
              </FormControl>
            )}
          />
        </Grid>

        {/* Gender */}
        <Grid  >
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel>Gender</InputLabel>
                <Select {...field} label="Gender">
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="others">Others</MenuItem>
                </Select>
              </FormControl>
            )}
          />
        </Grid>

        {/* Submit */}
        <Grid >
          <Box mb={2}>
          <Button 
            type="submit" 
            variant="contained" 
            fullWidth
        >
            {editId ? "Update" : "Add"}
          </Button>
          </Box>


          <Box mb={2}>
          {editId && (
            <Button
              variant="outlined"
              fullWidth
              color="secondary"
              onClick={() => {
                clearEdit();
                reset(defaultValues);
              }}
            >
              Cancel
            </Button>
          )}
          </Box>

        </Grid>

      </Grid>
    </form>
    </Box>

    </Container>
  );
};

export default FormComponent;


