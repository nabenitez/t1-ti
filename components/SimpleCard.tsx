import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  media: {
    height: 120,
  },
});

type Card = {
  title?: string;
  subTitle?: string;
  body?: React.ReactNode;
  cb?: Function;
  media?: string;
};

export default function SimpleCard(props: Card) {
  const classes = useStyles();
  const { title, subTitle, body, cb, media } = props;

  return (
    <Card className={classes.root}>
      {media && <CardMedia className={classes.media} image={media} title={title} />}
      <CardContent>
        <Typography variant="h5" component="h2">
          {title}
        </Typography>
        {subTitle && (
          <Typography className={classes.pos} color="textSecondary">
            Located in {subTitle}
          </Typography>
        )}
        {body}
      </CardContent>
      {cb && (
        <CardActions>
          <Button onClick={() => cb()} size="small">
            Show more
          </Button>
        </CardActions>
      )}
    </Card>
  );
}
