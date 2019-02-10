import * as React from "react";
import { render } from "react-dom";

import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppCard from '../components/AppCard'

const styles = (theme: Theme) =>
  createStyles({
      root: {
      ...theme.mixins.gutters(),
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2,
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200,
    },
    dense: {
      marginTop: 19,
    },
    menu: {
      width: 200,
    },
  });


export interface Props extends WithStyles<typeof styles> {}

export interface State {
  previewOpen: boolean,
  appInput: AppInput,
}

export interface AppInput {
  title: string,
  description: string,
  thumbnailUrl: string,
  homepageUrl: string,
  dnaUrl: string,
  uiUrl: string,
}


class NewApp extends React.Component<Props, State> {

  public state: State = {
    previewOpen: false,
    appInput: {
      title: '',
      description: '',
      thumbnailUrl: '',
      homepageUrl: '',
      dnaUrl: '',
      uiUrl: '',
    }
  }
  
  public render() {

    const { classes } = this.props

    return (
      <div>
      <Paper className={classes.root}>
        <Typography variant="h5" component="h3">
          Provide the following details to post a new hApp to the store
        </Typography>
         <Grid container={true} spacing={24}>
           <Grid item={true} xs={12} sm={6}>
            <TextField
              id="title-field"
              required={true}
              label="Title"
              value={this.state.appInput.title}
              onChange={this.handleChange('title')}
              className={classes.textField}
 
            />
           </Grid>

        <Grid item={true} xs={12}>
          <TextField
            id="description-field"
            label="Description"
            multiline={true}
            fullWidth={true}
            value={this.state.appInput.description}
            onChange={this.handleChange('description')}
            className={classes.textField}
          />
           </Grid>

        <Grid item={true} xs={12} sm={6}>
          <TextField
            id="thumburl-field"
            label="Thumbnail URL"
            value={this.state.appInput.thumbnailUrl}
            onChange={this.handleChange('thumbnailUrl')}
            className={classes.textField}
          />
           </Grid>

        <Grid item={true} xs={12} sm={6}>
          <TextField
            id="homepage-field"
            required={true}
            label="hApp Homepage URL"
            value={this.state.appInput.homepageUrl}
            onChange={this.handleChange('homepageUrl')}
            className={classes.textField}
          />
           </Grid>

        <Grid item={true} xs={12} sm={6}>
          <TextField
            id="dna-field"
            required={true}
            label="DNA hcpkg URL"
            value={this.state.appInput.dnaUrl}
            onChange={this.handleChange('dnaUrl')}
            className={classes.textField}
          />
           </Grid>

        <Grid item={true} xs={12} sm={6}>
          <TextField
            id="ui-field"
            label="UI static folder URL"
            value={this.state.appInput.uiUrl}
            onChange={this.handleChange('uiUrl')}
            className={classes.textField}
          />
         </Grid>
        </Grid>

          <Button variant="contained" size="large" onClick={this.handleSetPreviewState(true)}>
            Preview
          </Button>
          <Button variant="contained" size="large" color="primary">
            Submit
          </Button>

        </Paper>

        <Dialog open={this.state.previewOpen} onClose={this.handleSetPreviewState(false)}>
          <AppCard app={ {...this.state.appInput, author: "<your holochain ID will go here>"} }/>
        </Dialog>
        </div>
    );
  }

  private handleChange = (name: keyof AppInput) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const update = { ...this.state.appInput, [name]: event.target.value } as Pick<AppInput, keyof AppInput>
    this.setState({ appInput: update});
  }

  private handleSetPreviewState = (open: boolean) => (event: any) => {
    this.setState({previewOpen: open})
  }

}

export default withStyles(styles)(NewApp);