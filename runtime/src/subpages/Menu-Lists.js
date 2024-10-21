import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';


const mainListItems = [
    { nest: 'True', text: 'Dashboard', icon: <HomeRoundedIcon /> },
    { nest: 'False', text: 'Analytics', icon: <AnalyticsRoundedIcon /> },
    { nest: 'False', text: 'Unscheduled Events', icon: <PeopleRoundedIcon /> },
    { nest: 'False', text: 'Scheduled Events', icon: <AssignmentRoundedIcon /> },
    { nest: 'True', text: 'Creators', icon: <AssignmentRoundedIcon /> },
  ];
  
  const secondaryListItems = [
    { nest: 'True', text: 'Settings', icon: <SettingsRoundedIcon /> },
    { nest: 'False', text: 'About', icon: <InfoRoundedIcon /> },
    { nest: 'False', text: 'Documentation', icon: <HelpRoundedIcon /> },
    { nest: 'False', text: 'Github Site', icon: <HelpRoundedIcon /> },
    { nest: 'False', text: 'Feedback', icon: <HelpRoundedIcon /> },
  ];

  const SubListItems = [
    { list: 0, text: 'Edit Dashboard', icon: <HomeRoundedIcon />, target: '/dashboard?edit' },
    { list: 0, text: 'New Dashboard', icon: <AnalyticsRoundedIcon />, target: '/dashboard/new' },
    { list: 0, text: 'Select Dashboard', icon: <PeopleRoundedIcon />, target: '/dashboard/select' },
    { list: 0, text: 'Add to Favorites', icon: <PeopleRoundedIcon />, target: '/dashboard/favorites' },
    { list: 4, text: 'Create Form', icon: <PeopleRoundedIcon />, target: '/forms' },
    { list: 4, text: 'Create Function', icon: <PeopleRoundedIcon />, target: '/functions' },
    { list: 4, text: 'Create Workflow', icon: <PeopleRoundedIcon />, target: '/workflows' },
  ];

  const SubListItemsSect2 = [
    { list: 0, text: 'Tasks', icon: <AnalyticsRoundedIcon />, target: '/tasks' },
    { list: 0, text: 'Scripts', icon: <AnalyticsRoundedIcon />, target: '/scripts' },
    { list: 0, text: 'Assets', icon: <PeopleRoundedIcon />, target: '/assets' },
    { list: 0, text: 'Triggers', icon: <PeopleRoundedIcon />, target: '/triggers' },
    { list: 0, text: 'Schedules', icon: <PeopleRoundedIcon />, target: '/schedules' },
    { list: 0, text: 'Permissions', icon: <PeopleRoundedIcon />, target: '/permissions' },
  ];

  export {mainListItems, secondaryListItems, SubListItems, SubListItemsSect2};