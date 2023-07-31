import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import { TextField } from '@mui/material';
import Modal from '@mui/material/Modal';
import { DataGrid, GridToolbarContainer } from '@mui/x-data-grid';
import { randomCreatedDate, randomTraderName, randomId, randomArrayItem } from '@mui/x-data-grid-generator';
import Typography from '@mui/material/Typography';


const StyledButton = styled(Button)({
  marginTop: '1rem',
});
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const StyledForm = styled('form')({
  display: 'flex',
  flexDirection: 'column',
});

const StyledTextField = styled(TextField)({
  marginBottom: '1rem',
});


const initialRows = [
  {
    id: randomId(),
    key:'test1',
    name: 'scrum project',
    lead: 'imane',
    joinDate: randomCreatedDate(),
    
  },
  {
    id: randomId(),
    key:'test2',
    name: 'scrum project',
    lead: 'amal',
    joinDate: randomCreatedDate(),
    
  },
  // Add more initial rows as needed
];



const handleRowEditStop = (params, event) => {
  if (params.reason === 'rowBlur') {
    event.defaultMuiPrevented = true;
  }
};



export default function Projects() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState({});

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: 'edit' } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: 'view' } });
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };
  
  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: 'view', ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };
  function EditToolbar(props) {
    const { setRows, setRowModesModel } = props;

    
  }
 
  const columns = [
    { field: 'key', headerName: 'Key', width: 180, editable: true },
    { field: 'name', headerName: 'Project Name', width: 180, editable: true },
   
 
    {
      field: 'lead',
      headerName: 'Lead',
      width: 220,
      editable: true,
      
    },  
     {
      field: 'joinDate',
      headerName: 'Creation date',
      type: 'date',
      width: 180,
      editable: true,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        const { id } = params.row;
        const isInEditMode = rowModesModel[id]?.mode === 'edit';

        if (isInEditMode) {
          return (
            <>
              <Button
                // startIcon={<SaveIcon />}
                onClick={handleSaveClick(id)}
                color="primary"
              >
                Save
              </Button>
              <Button
                // startIcon={<CancelIcon />}
                onClick={handleCancelClick(id)}
                color="secondary"
              >
                Cancel
              </Button>
            </>
          );
        }

        return (
          <>
          
            <Button
              startIcon={<EditIcon />}
              onClick={handleEditClick(id)}
              color="primary"
            >
                
            </Button>
            <Button
              startIcon={<DeleteIcon />}
              onClick={handleDeleteClick(id)}
              color="secondary"
            >
              
            </Button>
          </>
        );
      },
    },
  ];

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20vh' }}>
      
     


      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          width: '80%',
          height: 'auto', // Set height to 'auto' for automatic adjustment based on content
        }}
      >

<Button color="primary" startIcon={<AddIcon />} onClick={handleOpen} >
        Add Project
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add New Project
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {/* Modal content */}
            <StyledForm>
              <StyledTextField
                label="Project Name"
                variant="outlined"
                fullWidth
                margin="normal"
                // Add your onChange and value props to handle input changes
              />
              <StyledTextField
                label="Key"
                variant="outlined"
                fullWidth
                margin="normal"
                // Add your onChange and value props to handle input changes
              />
              <StyledButton variant="contained" color="primary" fullWidth onClick={handleClose}>
                Save
              </StyledButton>
            </StyledForm>
          </Typography>
        </Box>
      </Modal>

        <DataGrid
          rows={rows}
          columns={columns}
          editMode="row"
          rowModes={rowModesModel}
          onRowEditStop={handleRowEditStop}
          onEditRowModelChange={handleRowModesModelChange}
          onEditRowChange={processRowUpdate}
        />
      </Box>
    </div>
  );
}

function CustomModal({ open, handleClose, children }) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Add New Project
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {children}
        </Typography>
        {/* Rest of the Modal content */}
      </Box>
    </Modal>
  );
}


