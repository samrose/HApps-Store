import * as React from 'react';
import * as redux from 'redux';
import Grid from '@material-ui/core/Grid'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Map } from 'immutable'
import './AllAppsPage.css'
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

import store from '../store'
import { GetAllApps, Whoami } from '../actions'

import { Hash } from '../../../holochain';

import AppCard from '../components/AppCard';
import { App } from '../types/app'

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing.unit * 2,
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    formControl: {
      margin: theme.spacing.unit,
      minWidth: 120,
    }
});

const sortFunctions = {
  'alphabetical': (a, b) => {
      const textA = a.title.toUpperCase();
      const textB = b.title.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
  },
  'upvotes': (a, b) => (a.upvotes > b.upvotes) ? -1 : (a.upvotes < b.upvotes) ? 1 : 0,
  'favourites': (a, b) => a.upvotedByMe === b.upvotedByMe ? 0 : a.upvotedByMe ? -1 : 1
}

interface Props extends WithStyles<typeof styles> {
  apps: Array<App>,
  currentAgent: {agent: {Hash: Hash, Name: string}},

  fetchAgent: () => void,
  fetchAllApps: () => void,
  fetchAppDetails: () => void
}

interface State {
  sortBy: string
}

class AllAppsPage extends React.Component<Props, State> {

  public constructor(props) {
    super(props)
    this.state = {
      sortBy: "alphabetical"
    }
  }

  public componentDidMount() {
    this.props.fetchAgent();
    this.props.fetchAllApps();
  }

  public render() {
    const { classes } = this.props;
    let greeting: string

    if (!this.props.currentAgent) {
      greeting = "Not connected to Holochain"
      return (
        <div style={{ textAlign: 'center' }}>
            <h1 className="all-apps-header">{ greeting }</h1>
            <hr/>
        </div>
      )
    } else if (this.props.apps.length < 1) {
      greeting = "No hApps to display"
      return (
        <div style={{ textAlign: 'center' }}>
            <h1 className="all-apps-header">{ greeting }</h1>
            <hr/>
        </div>
      )
    } else {
      greeting = "All hApps"
    }

    return (
      <div className={classes.root}>
        <div style={{ textAlign: 'center' }}>
            <h1 className="all-apps-header">{ greeting }</h1>
            <hr/>
        </div>
        <Grid container={true} justify="center" spacing={16}>
          <Grid item={true} xs={12}>
            <Paper className={classes.paper}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="sort-by-helper">Sort By:</InputLabel>
                <Select
                  value={this.state.sortBy}
                  onChange={this.sortSelectChanged}
                  input={<Input name="sort-by" id="sort-by-helper" />}
                >
                  <MenuItem value={'alphabetical'}>Alphabetical</MenuItem>
                  <MenuItem value={'upvotes'}>Most Upvoted</MenuItem>
                  <MenuItem value={'favourites'}>Your Favourites</MenuItem>
                </Select>
              </FormControl>
            </Paper>
          </Grid>
          {
          this.props.apps
          .sort(sortFunctions[this.state.sortBy])
          .map((app, i) =>
            {
              return (
                <Grid item={true} key={i}>
                  <AppCard app={app}/>
                </Grid>
              )
            })
          }
        </Grid>
      </div>
    );
  }

  private sortSelectChanged = (e) => {
    this.setState({ sortBy: e.target.value});
  }

}


const mapStateToProps = ({ apps, currentAgent }) => ({ apps, currentAgent });
const mapDispatchToProps = dispatch => ({
  fetchAgent: () => dispatch(Whoami.create({})),
  fetchAllApps: () => dispatch(GetAllApps.create({})),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AllAppsPage));
