import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

const ProjectItemContent = ({
  title,
  beginDate,
  expirationDate,
  devices,
  users
}) => {
  const showDate = (date) => {
    return date ? new Intl.DateTimeFormat().format(new Date(date)) : '-'
  }

  return (
    <>
      <Typography gutterBottom variant="h5" component="h2">
        { title }
      </Typography>
      <Divider />
      <Typography gutterBottom variant="h6" component="h3">
        Users
      </Typography>
      <Typography gutterBottom variant="body2" color="textSecondary" component="p">
        { users.length ?
          users.map((user) => `${ user.firstName } ${ user.lastName }`).join(', ') :
          'empty'
        }
      </Typography>
      <Typography gutterBottom variant="h6" component="h3">
        Devices
      </Typography>
      <Typography gutterBottom variant="body2" color="textSecondary" component="p">
        { devices.length ?
          devices.map(({ serialNumber }) => serialNumber).join(', ') :
          'empty'
        }
      </Typography>
      <Typography gutterBottom variant="h6" component="h3">
        Begin date
      </Typography>
      <Typography gutterBottom variant="body2" color="textSecondary" component="p">
        { showDate(beginDate) }
      </Typography>
      <Typography gutterBottom variant="h6" component="h3">
        Expiration date
      </Typography>
      <Typography gutterBottom variant="body2" color="textSecondary" component="p">
        { showDate(expirationDate) }
      </Typography>
    </>
  );
}

export default ProjectItemContent;