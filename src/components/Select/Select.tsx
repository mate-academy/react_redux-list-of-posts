import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useEffect } from 'react';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';

export function BasicSelect() {
  const { users, selectedUserId } = useTypedSelector(state => state.users);
  const { fetchUsers, setSelectedUser } = useActions();

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedUser(Number(event.target.value));
  };

  const selectStyle = {
    minWidth: 360,
    backgroundColor: 'white',
    marginBottom: 2,
  };

  return (
    <Box sx={selectStyle}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Users</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={String(selectedUserId)}
          label="User"
          onChange={handleChange}
        >
          <MenuItem key={0} value="null">All users</MenuItem>
          {users.map(user => (
            <MenuItem key={user.id} value={user.id}>{user.name}</MenuItem>
          ))}

        </Select>
      </FormControl>
    </Box>
  );
}
