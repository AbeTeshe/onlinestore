import { TextField, Grid,InputLabel, InputAdornment, IconButton} from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'
const Input = (props) => {
    return (
        <Grid item xs={12} sm = {props.half ? 6 : 12} style={{marginBottom: '10px'}}>
            <InputLabel style={{ fontWeight: '600', fontSize: '18px', marginBottom: '5px'}}>{props.label}</InputLabel>
            <TextField 
            {...props}
            label=""
            onChange={props.handleChange}
            variant="outlined"
            fullWidth
            InputProps={props.name === 'password' ? {
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton onClick={props.handleShowPassword}>
                            {props.type === 'password' ? <Visibility />: <VisibilityOff/>}
                        </IconButton>
                    </InputAdornment>
                )
            }: null}
            />
        </Grid> 
    )
}

export default Input;