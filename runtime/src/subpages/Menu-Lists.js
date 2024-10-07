import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';


const mainListItems = [
    { nest: 'True', text: 'Dashboard', icon: <HomeRoundedIcon /> },
    { nest: 'False', text: 'Analytics', icon: <AnalyticsRoundedIcon />, target:  },
    { nest: 'False', text: 'Unscheduled Events', icon: <PeopleRoundedIcon /> },
    { nest: 'False', text: 'Scheduled Events', icon: <AssignmentRoundedIcon /> },
    { nest: 'True', text: 'Creators', icon: <AssignmentRoundedIcon /> },
  ];
  
  const secondaryListItems = [
    { nest: 'true', text: 'Settings', icon: <SettingsRoundedIcon /> },
    { nest: 'False', text: 'About', icon: <InfoRoundedIcon /> },
    { nest: 'False', text: 'AP Feedback', icon: <HelpRoundedIcon /> },
    { nest: 'False', text: 'Check for updates', icon: <HelpRoundedIcon /> },
    { nest: 'False', text: 'Documentation', icon: <HelpRoundedIcon /> },
    { nest: 'False', text: 'Github Site', icon: <HelpRoundedIcon /> },
  ];

  const SubListItems = [
    { list: 0, text: 'Edit Dashboard', icon: <HomeRoundedIcon />, target: '/dashboard?edit' },
    { list: 0, text: 'New Dashboard', icon: <AnalyticsRoundedIcon />, target: '/dashboard?new' },
    { list: 0, text: 'Select Dashboard', icon: <PeopleRoundedIcon />, target: 'dashboard?select' },
    { list: 0, text: 'Add to Favorites', icon: <PeopleRoundedIcon />, target: '/dfashboard?favorite' },
    { list: 4, text: 'Tasks', icon: <AnalyticsRoundedIcon />, target: '/tasks' },
    { list: 5, text: 'Users', icon: <PeopleRoundedIcon />, target: '/users' },
    { list: 5, text: 'Groups', icon: <PeopleRoundedIcon />, target: '/groups' },
  ];

  export {mainListItems, secondaryListItems, SubListItems};