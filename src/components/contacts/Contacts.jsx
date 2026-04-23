import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { DeleteUser } from "../../utils/functions";
import { toastSuccess, toastError } from "../../utils/toastify";
import { useState } from "react";



const Contacts = ({ users, loading, onEdit, editId }) => {
  const [deletingId, setDeletingId] = useState(null);

  // 🔥 DELETE HANDLER
  const handleDelete = async (id) => {
    // Silmeden önce onay al
    const ok = window.confirm("Are you sure?");
    if (!ok) return;

    try {
      setDeletingId(id); // 🔒 disable başlasın
      await DeleteUser(id);
      toastSuccess("Contact deleted successfully 🗑️ ✅");
    } catch (error) {
      toastError("Delete failed ❌");
      console.error("Delete failed:", error);
    } finally {
      setDeletingId(null); // 🔓 disable bitsin, tekrar aktif
    }
  };

  return (
    <Box 
        // mt={3}
        sx={{
            width: "100%",
            maxWidth: {
              xs: "100%",
              md: 800,
            },
            mx: "auto",

            bgcolor: "background.paper",
            color: "text.primary",
            p: 2,
            borderRadius: 2,
            mb: 1,
            boxShadow: 1,
        }}
    >
      {/* Header */}
      <Typography
        variant="h4"
        align="center"
        mb={1}
        sx={{ 
            fontFamily: "'Girassol', cursive",
            borderRadius: 1,
            // backgroundColor: "white",
            bgColor: "background.paper", // dark-light mode için
            color: "text.primary",
        }}
      >
        Contacts
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          {/* Table Head */}
          <TableHead >
            <TableRow 
              sx={{
                bgcolor: "background.paper",
              }} 
            >
              <TableCell 
                sx={{ 
                  fontFamily: "'Girassol', cursive",
                  fontWeight: "bold",
                  color: "text.primary",
                  fontSize: "1.1rem",
                }}
              >Contact Name</TableCell>
              <TableCell 
                sx={{ 
                  fontFamily: "'Girassol', cursive",
                  fontWeight: "bold",
                  color: "text.primary",
                  fontSize: "1.1rem",

                }}
              >Phone Number</TableCell>
              <TableCell 
                sx={{ 
                  fontFamily: "'Girassol', cursive",
                  fontWeight: "bold",
                  color: "text.primary",
                  fontSize: "1.1rem",
                }}
              >Gender</TableCell>
              <TableCell 
                align="center"
                sx={{ 
                  fontFamily: "'Girassol', cursive",
                  fontWeight: "bold",
                  color: "text.primary",
                  fontSize: "1.1rem",
                }}
                >Edit</TableCell>
              <TableCell 
                align="center"
                sx={{ 
                  fontFamily: "'Girassol', cursive",
                  fontWeight: "bold",
                  color: "text.primary",
                  fontSize: "1.1rem",
                }}
              >Delete</TableCell>
            </TableRow>
          </TableHead>

          {/* Table Body */}
          <TableBody>

          {loading ? (
            // 1️⃣ LOADING
            <TableRow>
              <TableCell colSpan={5} align="center">
                Loading...
              </TableCell>
            </TableRow>
            ) : (users.length === 0 ? (
                // 2️⃣ BOŞ DURUM
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      No user found
                    </TableCell>
                  </TableRow>
                  ) : (
                  // 3️⃣ DATA DURUMU
                  users.map((user) => (
                    <TableRow 
                      key={user.id}
                      sx={(theme)=>({
                        bgcolor: editId === user.id ? theme.palette.action.selected : "inherit",
                        "&:hover": {
                          bgcolor: theme.palette.action.hover,
                        },
                        transition: "0.3s",
                      })}
                    >
                      <TableCell>{user.user_name}</TableCell>
                      <TableCell>{user.phone_number}</TableCell>
                      <TableCell>{user.gender}</TableCell>
                  
                      <TableCell align="center">
                        <IconButton
                          color="primary"
                          onClick={() => onEdit?.(user)}
                        >✏️
                          <EditIcon />
                        </IconButton>
                      </TableCell>
                  
                      <TableCell align="center">
                        <IconButton
                          color="error"
                          disabled={deletingId === user.id} // 🔒 disable
                          onClick={() => handleDelete?.(user.id)}
                        >🗑
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                    )
                  )
                )
              )
          }
            
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Contacts;
