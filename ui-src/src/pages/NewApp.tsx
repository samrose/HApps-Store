import * as React from "react";
import { render } from "react-dom";
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import CircularProgress from '@material-ui/core/CircularProgress';
import AppCard from '../components/AppCard'

import { AppCreationSpec, defaultAppCreationSpec } from '../types/app'
import snakecase from 'snakecase-keys'

const styles = (theme: Theme) =>
  createStyles({
      root: {
      ...theme.mixins.gutters(),
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2,
      color: "#fff",
      backgroundColor: "#016e76f7"
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
    progress: {
      margin: theme.spacing.unit * 2,
    },
  });


export interface Props extends WithStyles<typeof styles> {
  createApp: (app: AppCreationSpec) => Promise<string>,
  awaitingResponse: boolean,
}

export interface State {
  previewOpen: boolean,
  appInput: AppCreationSpec,
}


class NewApp extends React.Component<Props, State> {

  public state: State = {
    previewOpen: false,
    appInput: defaultAppCreationSpec
  }

  public render() {

    const { classes } = this.props

    return (
      <div>
      <Paper className={classes.root}>
        <Typography variant="h5" component="h3">
          LALAL Provide the following details to post a new hApp to the store
        </Typography>
        <Typography component="p">
          Keep in mind that anything submitted will be visible to all participants for the lifetime of the hApp store.<br/>
          Please be considerate, check submissions carefully and keep cruft to a minimum.
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

        { /* TODO: update for multiple DNAs and ability to supply or detect hash */}
        <Grid item={true} xs={12} sm={6}>
          <TextField
            id="dna-field"
            required={true}
            label="DNA URL (dna.json file)"
            value={(this.state.appInput.dnas[0] || {location: ''} as any).location}
            onChange={this.handleChange('dnaUrl')}
            className={classes.textField}
          />
        </Grid>

        { /* TODO: update for multiple DNAs and ability to supply or detect hash */}
        <Grid item={true} xs={12} sm={6}>
          <TextField
            id="dna-field"
            required={true}
            label="DNA URL (dna.json file)"
            value={(this.state.appInput.dnas[0] || {location: ''} as any).location}
            onChange={this.handleChange('dnaUrl')}
            className={classes.textField}
          />
        </Grid>

        <Grid item={true} xs={12} sm={6}>
          <TextField
            id="ui-field"
            label="UI URL (zip file)"
            value={(this.state.appInput.ui || {location: ''} as any).location}
            onChange={this.handleChange('uiUrl')}
            className={classes.textField}
          />
        </Grid>

        <Grid item={true} xs={6} sm={6}>
          <AppCard app={ {
            author: "<your holochain ID will go here>",
            address: "",
            upvotes: 0,
            upvotedByMe: false,
            appEntry: this.state.appInput
          } }/>
        </Grid>

        </Grid>

          <Button variant="contained" size="large" color="primary" onClick={this.handleClickSubmit(this.state.appInput)}>
            Submit
          </Button>

        </Paper>

        <Dialog open={this.props.awaitingResponse}>
          <CircularProgress className={classes.progress}/>
        </Dialog>


        </div>
    );
  }

  private handleChange = (name: keyof AppCreationSpec | 'dnaUrl' | 'uiUrl') => (event: React.ChangeEvent<HTMLInputElement>) => {
    // UPDATE THE DNA to accept hash as well...
    let update
    const value = event.target.value
    if (name === 'dnaUrl') {
      update = { ...this.state.appInput, dnas: [{ location: value, hash: 'TODO' }] }
    } else if (name === 'uiUrl') {
      update = { ...this.state.appInput, ui: { location: value, hash: 'TODO' } }
    } else {
      update = { ...this.state.appInput, [name]: value }
    }
    this.setState({ appInput: update as AppCreationSpec});
  }

  private handleClickSubmit = (app: AppCreationSpec) => (event: React.MouseEvent<HTMLElement>) => {
    this.props.createApp(app).then(() => {
      // @ts-ignore
      this.props.history.push('/')
    })
  }

  private handleSetPreviewState = (open: boolean) => (event: any) => {
    this.setState({previewOpen: open})
  }

}

import { CreateApp } from '../actions'

const mapStateToProps = ({ awaitingResponse }) => ({ awaitingResponse });

const mapDispatchToProps = dispatch => ({
  createApp: (app: AppCreationSpec) => dispatch(CreateApp.create(snakecase(app))),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withRouter(NewApp)));
