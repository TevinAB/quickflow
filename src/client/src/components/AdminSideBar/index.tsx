import './index.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Collapse } from '@mui/material';
import { Typography } from '@mui/material';
import ArrowDown from '@mui/icons-material/KeyboardArrowDown';

const sideBarData = [
  {
    title: 'customization',
    links: [
      { text: 'contact form', link: '/customization/contact' },
      { text: 'account form', link: '/customization/account' },
      { text: 'deal form', link: '/customization/deal' },
      { text: 'pipelines', link: '/customization/pipeline' },
      { text: 'lists', link: '/customization/lists' },
    ],
  },
  {
    title: 'roles',
    links: [{ text: 'roles', link: '/customization/roles' }],
  },
  {
    title: 'profiles',
    links: [{ text: 'profiles', link: '/customization/profiles' }],
  },
];

export default function AdminSideBar() {
  return (
    <div className="admin-sidebar">
      {sideBarData.map((panel) => (
        <Panel panelData={panel} />
      ))}
    </div>
  );
}

type PanelProps = {
  panelData: typeof sideBarData[0];
};

function Panel({ panelData }: PanelProps) {
  const [open, setOpen] = useState(false);
  const { title, links } = panelData;

  //rotate arrow
  let arrowClass = '';
  if (open) arrowClass += 'panel-open';

  return (
    <div className="admin-sidebar__panel">
      <div
        onClick={() => setOpen(!open)}
        className="admin-sidebar__panel-title"
      >
        <Typography className="side-bar__panel-title-text" fontWeight="bold">
          {title}
        </Typography>

        <ArrowDown className={arrowClass} />
      </div>
      <Collapse orientation="vertical" in={open}>
        <ul className="side-bar__panel-list">
          {links.map(({ link, text }) => (
            <li>
              <Link to={link}>
                <div className="side-bar__panel-text">{text}</div>
              </Link>
            </li>
          ))}
        </ul>
      </Collapse>
    </div>
  );
}
