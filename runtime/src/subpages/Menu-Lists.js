import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';


const mainListItems = [
    { text: 'Dashboard', icon: <HomeRoundedIcon />, target: '/' },
    { text: 'Analytics', icon: <AnalyticsRoundedIcon /> },
    { text: 'Unscheduled Events', icon: <PeopleRoundedIcon /> },
    { text: 'Scheduled Events', icon: <AssignmentRoundedIcon /> },
    { text: 'Creators', icon: <AssignmentRoundedIcon />,
      target: 'tasks/' },
  ];
  
  const secondaryListItems = [
    { text: 'Settings', icon: <SettingsRoundedIcon /> },
    { text: 'About', icon: <InfoRoundedIcon /> },
    { text: 'AP Feedback', icon: <HelpRoundedIcon /> },
    { text: 'Check for updates', icon: <HelpRoundedIcon /> },
    { text: 'Documentation', icon: <HelpRoundedIcon /> },
    { text: 'Github Site', icon: <HelpRoundedIcon /> },
  ];

  const SubListItems = [
    { index: 0, text: 'Edit Dashboard', icon: <HomeRoundedIcon /> },
    { index: 0, text: 'New Dashboard', icon: <AnalyticsRoundedIcon /> },
    { index: 0, text: 'Select Dashboard', icon: <PeopleRoundedIcon /> },
    { index: 0, text: 'Add to Favorites', icon: <PeopleRoundedIcon /> },
  ];

  export {mainListItems, secondaryListItems, SubListItems};