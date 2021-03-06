import { useState } from 'react';

import {
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import ProjectItemContent from './ProjectItemContent';
import ProjectItemForm from './ProjectItemForm';

import s from './styles.module.css';

export const ProjectItem = ({
  id,
  title,
  beginDate,
  expirationDate,
  devices,
  users,
  handleProjectDelete,
  handleProjectChanges
}) => {
  const [isEditMode, setIsEditMode] = useState(false);

  const handleEdit = () => {
    setIsEditMode((prevVal) => !prevVal);
  }

  const handleDelete = () => {
    handleProjectDelete && handleProjectDelete(id);
  }

  const handleChanges = (changes) => {
    handleProjectChanges && handleProjectChanges(changes);
    handleEdit();
  }

  return(
    <Card className={ s.root }>
      <CardContent>
        { isEditMode ?
          <ProjectItemForm
            title={ title }
            beginDate={ beginDate }
            expirationDate={ expirationDate }
            devices={ devices }
            users={ users }
            projectId={ id }
            handleChanges={ handleChanges }
          /> :
          <ProjectItemContent
            title={ title }
            beginDate={ beginDate }
            expirationDate={ expirationDate }
            devices={ devices }
            users={ users }
          />
        }
      </CardContent>
      <CardActions className={ s.actions }>
        { isEditMode ?
          <>
          <Button variant="outlined" onClick={ handleEdit }>Cancel</Button>
          <Button form={ `ProjectItemForm-${ id  }` } type="submit" variant="outlined" color="primary">Save</Button>
          </> :
          <>
            <IconButton
              onClick={ handleEdit }
              size="small" color="primary" aria-label="Edit"
            >
              <EditIcon />
            </IconButton>
            <IconButton
              onClick={ handleDelete }
              size="small" color="secondary" aria-label="Delete"
            >
              <DeleteIcon />
            </IconButton>
          </>
        }
      </CardActions>
    </Card>
  );
}