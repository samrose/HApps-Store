import * as React from 'react'
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
import FavoriteIcon from '@material-ui/icons/Favorite'
import ShareIcon from '@material-ui/icons/Share'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import MoreVertIcon from '@material-ui/icons/MoreVert'

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
}

class AppCard extends React.Component<Props> {

  public render() {
    const { classes, app } = this.props;

    return (
      <Card className={classes.card}>
        <CardHeader
          title={app.title}
          subheader={app.author}
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
}


export default withStyles(styles)(AppCard);
