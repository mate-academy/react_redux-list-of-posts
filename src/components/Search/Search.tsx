import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';

export const Search: React.FC = () => {
  const { searchQuery } = useTypedSelector(state => state.posts);
  const { setSearchQuery } = useActions();
  const boxStyle = {
    '& > :not(style)': { minWidth: '50ch' },
  };

  return (
    <Box
      component="form"
      sx={boxStyle}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-basic"
        label="Search"
        variant="outlined"
        value={searchQuery}
        onChange={(event) => {
          setSearchQuery(event.target.value);
        }}
        sx={{ backgroundColor: 'white' }}
      />
    </Box>
  );
};
