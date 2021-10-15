import './index.css';
import logo from '../../assets/logo2.png';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Collapse from '@mui/material/Collapse';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ContactPageOutlinedIcon from '@mui/icons-material/ContactPageOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import TodayOutlinedIcon from '@mui/icons-material/TodayOutlined';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import { Typography } from '@mui/material';
import { Tooltip } from '@mui/material';
import IconButton from '../IconButton';

const Links = [
  {
    icon: HomeOutlinedIcon,
    text: 'dashboard',
    link: '/',
  },
  {
    icon: ContactPageOutlinedIcon,
    text: 'contacts',
    link: '/contacts',
  },
  {
    icon: BusinessOutlinedIcon,
    text: 'accounts',
    link: '/accounts',
  },
  {
    icon: MonetizationOnOutlinedIcon,
    text: 'deals',
    link: '/deals',
  },
  {
    icon: AssignmentTurnedInOutlinedIcon,
    text: 'tasks',
    link: '/tasks',
  },
  {
    icon: TodayOutlinedIcon,
    text: 'events',
    link: '/events',
  },
];

type SideBarProps = {
  renderLogo: boolean;
  renderCollapseButton: boolean;
};

export default function SideBar({
  renderLogo,
  renderCollapseButton,
}: SideBarProps) {
  const [isOpen, setOpen] = useState(true);
  const location = useLocation();
  let collapseButtonClasses = '';

  //rotate the arrow icon
  if (!isOpen) collapseButtonClasses += ' side-bar--open';

  return (
    <nav className="side-bar">
      {renderLogo && <Logo showText={isOpen} />}

      <NavLinks isOpen={isOpen} currentUrl={location.pathname} />

      {renderCollapseButton && (
        <div className="side-bar__footer">
          <IconButton
            className={collapseButtonClasses}
            onClick={() => setOpen(!isOpen)}
          >
            <ArrowBackIosNewOutlinedIcon color="secondary" />
          </IconButton>
        </div>
      )}
    </nav>
  );
}

type NavLinksProps = {
  isOpen: boolean;
  currentUrl?: string;
};

export function NavLinks({ isOpen, currentUrl }: NavLinksProps) {
  return (
    <ul className="side-bar__links">
      {Links.map(({ text, link, icon }) => (
        <NavItem
          text={text}
          link={link}
          icon={icon}
          showText={isOpen}
          isActive={currentUrl === link}
        />
      ))}
    </ul>
  );
}

const iconSize = 26;
type NavItemProps = {
  showText: boolean;
  isActive: boolean;
} & typeof Links[0];

function NavItem({ icon: Icon, text, link, showText, isActive }: NavItemProps) {
  let classes = 'side-bar__item';

  if (isActive) {
    classes += ' side-bar__item--selected';
  }

  return (
    <li className={classes}>
      <Link to={link}>
        <Tooltip
          sx={{ backgroundColor: 'black' }}
          title={text}
          placement="right"
        >
          <div className="side-bar__wrapper">
            <span className="side-bar__icon-wrapper">
              <Icon sx={{ fontSize: iconSize }} />
            </span>
            <Collapse orientation="horizontal" in={showText}>
              <span className="side-bar__link-text">{text}</span>
            </Collapse>
          </div>
        </Tooltip>
      </Link>
    </li>
  );
}

export function Logo({ showText }: { showText: boolean }) {
  return (
    <div className="logo">
      <img className="logo__img" src={logo} alt="Quick flow logo" />
      <Collapse orientation="horizontal" in={showText}>
        <Typography
          fontWeight="bold"
          component="h1"
          variant="h5"
          fontSize="22px"
        >
          QuickFlow
        </Typography>
      </Collapse>
    </div>
  );
}
