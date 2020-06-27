import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const classes = makeStyles(theme => ({
  Typo:{
    margin:theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1),
  },
  Icon: {
    margin: theme.spacing(1),
  },
}));

const Land = ({user,candies,candy_name,onAuth,onLogout,handleChange,sendCandy}) => {

  const userState =
    user?(
      <Grid container
        direction="row"
        justify="flex-end"
        alignItems="center"
      >
      <Grid item xs={2}>
        <Typography classname={classes.Typo}>
          {user.displayName}
        </Typography>
      </Grid>
      <Grid item>
        <Button
          classname={classes.button}
          variant="contained"
          color='secondary'
          onClick={onLogout}
          >
           Logout
        </Button>
      </Grid>
      </Grid>
    ):
    (
      <Button
        classname={classes.button}
        variant="contained"
        color='secondary'
        onClick={onAuth}
        >
        login with Google
      </Button>
    );

  const data= 
    <Grid
    container
    direction="column"
    justify="center"
    alignItems="center"
    >
      <TextField
                id="candy_name"
                className={classes.textField}
                label="candy name"
                margin="normal"
                variant="filled"
                value={candy_name}
                onChange={handleChange('candy_name')}
      />
      <Button
        onClick={sendCandy}
      >
        add candy
      </Button>
      {
          <List>
            {candies.map((i)=>{
                    return <ListItem>
                        <ListItemText
                          primary={i.name}
                        />
                      </ListItem>
            })}
          </List>
        }
    </Grid> 
  

   
      
  return(
      <div>
        <AppBar position='static'>
          <Toolbar>
            <Grid>
            <Typography variant="h6" noWrap>
                Candy!
            </Typography>
            </Grid>
            <Grid container justify='flex-end' spacing={2}>
              {userState}
            </Grid>
          </Toolbar>
        </AppBar>
        {data}
      </div>
    );
}


export default Land;
