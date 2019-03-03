import * as React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import classnames from 'classnames'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Collapse from '@material-ui/core/Collapse'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import red from '@material-ui/core/colors/red'
import ShareIcon from '@material-ui/icons/Share'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import MoreVertIcon from '@material-ui/icons/MoreVert'

import FavoriteIconOutline from '@material-ui/icons/FavoriteBorderOutlined';
import FavoriteIconShaded from '@material-ui/icons/Favorite';

import { App } from '../types/app'

const styles = theme => ({
  card: {
    maxWidth: 400,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
});

interface Props {
	classes: any,
	app: App,
  upvoteApp: (app: App) => Promise<string>
}

class AppCard extends React.Component<Props> {

  public render() {
    const { classes, app } = this.props;

    return (
      <Card className={classes.card}>
        <CardHeader
          title={app.title}
          subheader={app.author}
          action={
            <IconButton onClick={this.handleUpvoteClick}>
              {this.props.app.upvotedByMe ? <FavoriteIconShaded fontSize="large"/> : <FavoriteIconOutline fontSize="large"/>}
            </IconButton>
          }
        />
        <CardMedia
          className={classes.media}
          image={app.thumbnailUrl}
          title="hApp Image"
        />
        <CardContent>
          <Typography component="p">
            {app.description}
          </Typography>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing={true}>
			    <Button size="small" color="primary" href={app.dnaUrl}>
	          Download DNA
	        </Button>
	        <Button size="small" color="primary" href={app.uiUrl}>
	          Download UI
	        </Button>
	        <Button size="small" color="primary" href={app.homepageUrl}>
	          Visit Homepage
	        </Button>
        </CardActions>
      </Card>
    );
  }

  private handleUpvoteClick = () => {
    console.log("upvoting", this.props.app)
    return this.props.upvoteApp(this.props.app)
  }

}

import { UpvoteApp } from '../actions'

const mapStateToProps = (state) => ({ });

const mapDispatchToProps = dispatch => ({
  upvoteApp: (app: App) => dispatch(UpvoteApp.create({app_address: app.address})),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AppCard));