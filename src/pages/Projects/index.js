import { useState } from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { AlertDialog, ProjectItem } from '../../components';

import s from './styles.module.css';

import PROJECTS from '../../data/project.json';
import DEVICES from '../../data/device.json';
import USERS from '../../data/user.json';


export const Projects = () => {
  const [projects, setProjects] = useState(PROJECTS);
  const [devices, setDevices] = useState(DEVICES);
  const [users, setUsers] = useState(USERS);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [toDeleteId, setToDeleteId] = useState(null);

  const handleProjectDelete = (id) => {
    setIsDialogOpen(true);
    setToDeleteId(id);
  }

  const handleCloseDialog = (confirmDelete) => {
    setIsDialogOpen(false);
    if (confirmDelete) {
      setProjects((prevVal) => {
        return prevVal.map((val) => val.id === toDeleteId ?
          { ...val, delete: 1 } : { ...val}
        )
      })
    }
    setToDeleteId(null);
  }

  const handleProjectChanges = ({
    id,
    selectedUsers,
    selectedDevices,
    beginDate,
    expirationDate
  }) => {
    setProjects((prevVal) => {
      return prevVal.map((val) => val.id === id ?
        { ...val, beginDate, expirationDate } : { ...val}
      )
    });

    setUsers((prevVal) => {
      const filteredUsers = prevVal.filter(({ projectId }) => projectId !== id);
      return [...filteredUsers, ...selectedUsers];
    });

    setDevices((prevVal) => {
      const filteredDevices = prevVal.filter(({ projectId }) => projectId !== id);
      return [...filteredDevices, ...selectedDevices];
    });
  }

  return (
    <>
      <div className={ s.root }>
        <Grid container spacing={ 3 }>
          <Grid item xs={ 12 }>
          <Typography variant="h3" component="h1" gutterBottom align="center">
            Projects
          </Typography>
          </Grid>
            { projects.map((project) =>
              !project.delete ?
                <Grid key={ project.id } item xs={ 12 } sm={ 6 } md={ 4 } lg={ 3 }>
                  <ProjectItem
                    id={ project.id }
                    title={ project.title }
                    beginDate={ project.beginDate }
                    expirationDate={ project.expirationDate }
                    devices={ devices.filter(({ projectId }) => projectId === project.id) }
                    users={ users.filter(({ projectId }) => projectId === project.id) }
                    handleProjectDelete={ handleProjectDelete }
                    handleProjectChanges={ handleProjectChanges }
                  />
                </Grid> :
                null
              )
            }
        </Grid>
      </div>

      <AlertDialog
        isOpen={ isDialogOpen }
        handleCloseDialog={ handleCloseDialog }
        title="Delete project?"
        contentText={ `Project name: ${ projects.find(({ id }) => id === toDeleteId)?.title }.` }
      />
    </>
  );
}