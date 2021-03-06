import { useState } from 'react';

import {
  Divider,
  Typography,
  FormControl,
  InputLabel,
  Select,
  Input,
  MenuItem,
  Checkbox,
  ListItemText
} from '@material-ui/core';

import DateFnsUtils from '@date-io/date-fns';

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import s from './styles.module.css';

import DEVICES from '../../../data/device.json';
import USERS from '../../../data/user.json';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const userList = USERS.reduce((res, user) => {
  const { appuserId, firstName, lastName } = user;
  return res.find((uniqueUser) => uniqueUser.appuserId === appuserId) ?
    res : [
      ...res,
      { appuserId, firstName, lastName }
    ]
  }, []);

const deviceList = DEVICES.reduce((res, device) => {
  const { deviceId, serialNumber } = device;
  return res.find((uniqueDevice) => uniqueDevice.deviceId === deviceId) ?
    res : [
      ...res,
      { deviceId, serialNumber }
    ]
  }, []);

const ProjectItemForm = ({
  title,
  beginDate,
  expirationDate,
  devices,
  users,
  projectId,
  handleChanges
}) => {
  const [selectedUsersId, setSelectedUsersId] = useState(users.map(({ appuserId }) => appuserId));
  const [selectedDeviceId, setSelectedDeviceId] = useState(devices.map(({ deviceId }) => deviceId));
  const [selectedBeginDate, setSelectedBeginDate] = useState(beginDate ? new Date(beginDate) : null);
  const [selectedExpirationDate, setSelectedExpirationDate] = useState(expirationDate ? new Date(expirationDate) : null);

  const handleChangeUsers = (e) => {
    setSelectedUsersId(e.target.value);
  }

  const getSelectedUsers = (selected) => {
    return userList.reduce((res, user) => selected.includes(user.appuserId) ?
      [...res, { ...user, projectId, disabled: 0 }] : res
    , []);
  }

  const handleChangeDevices = (e) => {
    setSelectedDeviceId(e.target.value);
  }

  const getSelectedDevices = (selected) => {
    return deviceList.reduce((res, device) => selected.includes(device.deviceId) ?
      [...res, { ...device, projectId }] : res
    , []);
  }

  const handleBeginDateChange = (date) => {
    setSelectedBeginDate(date);
  }

  const handleExpirationDateChange = (date) => {
    setSelectedExpirationDate(date);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedUsers = getSelectedUsers(selectedUsersId);
    const selectedDevices = getSelectedDevices(selectedDeviceId);
    handleChanges && handleChanges({
      selectedUsers, selectedDevices,
      id: projectId,
      beginDate: selectedBeginDate?.toISOString(),
      expirationDate: selectedExpirationDate?.toISOString()
    })
  }

  return (
    <form className={ s.root } onSubmit={ handleSubmit } id={ `ProjectItemForm-${ projectId }` }>
      <Typography gutterBottom variant="h5" component="h2">
        { title }
      </Typography>
      <Divider />
      <Typography gutterBottom variant="h6" component="h3">
        Users
      </Typography>
      <FormControl className={ s.formControl }>
        <InputLabel id={ `users-checkbox-label-${ projectId }` }>Select users</InputLabel>
        <Select
          labelId="users-checkbox-label"
          id={ `users-checkbox-${ projectId }` }
          multiple
          value={ selectedUsersId }
          onChange={ handleChangeUsers }
          input={<Input />}
          renderValue={ (selected) => getSelectedUsers(selected).map(({ firstName, lastName }) => `${ firstName} ${ lastName }`).join(', ') }
          MenuProps={ MenuProps }
        >
          { userList.map((user) => (
            <MenuItem key={ user.appuserId } value={ user.appuserId }>
              <Checkbox checked={ !!selectedUsersId.find((id) => user.appuserId === id) } />
              <ListItemText primary={ `${ user.firstName} ${ user.lastName }` } />
            </MenuItem>
          )) }
        </Select>
      </FormControl>
      <Typography gutterBottom variant="h6" component="h3">
        Devices
      </Typography>
      <FormControl className={ s.formControl }>
        <InputLabel id={ `devices-checkbox-label-${ projectId }` }>Select devices</InputLabel>
        <Select
          labelId="devices-checkbox-label"
          id={ `devices-checkbox-${ projectId }` }
          multiple
          value={ selectedDeviceId }
          onChange={ handleChangeDevices }
          input={<Input />}
          renderValue={ (selected) => getSelectedDevices(selected).map(({ serialNumber }) => serialNumber).join(', ') }
          MenuProps={ MenuProps }
        >
          { deviceList.map((device) => (
            <MenuItem key={ device.deviceId } value={ device.deviceId }>
              <Checkbox checked={ !!selectedDeviceId.find((id) => device.deviceId === id) } />
              <ListItemText primary={ device.serialNumber } />
            </MenuItem>
          )) }
        </Select>
      </FormControl>
      <Typography gutterBottom variant="h6" component="h3">
        Begin date
      </Typography>
      <MuiPickersUtilsProvider utils={ DateFnsUtils }>
        <KeyboardDatePicker
          className={ s.formControl }
          disableToolbar
          variant="inline"
          format="dd/MM/yyyy"
          margin="normal"
          id={ `begin-date-${ projectId }` }
          label="Begin date"
          value={ selectedBeginDate }
          onChange={ handleBeginDateChange }
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </MuiPickersUtilsProvider>
      <Typography gutterBottom variant="h6" component="h3">
        Expiration date
      </Typography>
      <MuiPickersUtilsProvider utils={ DateFnsUtils }>
        <KeyboardDatePicker
          className={ s.formControl }
          disableToolbar
          variant="inline"
          format="dd/MM/yyyy"
          margin="normal"
          id={ `expiration-date-${ projectId }` }
          label="Expiration date"
          value={ selectedExpirationDate }
          onChange={ handleExpirationDateChange }
          minDate={ selectedBeginDate }
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </MuiPickersUtilsProvider>
    </form>
  );
}

export default ProjectItemForm;