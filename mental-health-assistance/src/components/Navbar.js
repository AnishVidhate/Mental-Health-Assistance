import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

const Navbar = ({ userType }) => {
  const navItems = userType === 'user' ? [
    { name: 'Homepage', link: '/' },
    { name: 'Community Forums', link: '/forums' },
    { name: 'Resources', link: '/resources' },
    { name: 'Therapists', link: '#' },
    { name: 'Mood Tracker', link: '#' }
  ] : [
    { name: 'Homepage', link: '/' },
    { name: 'Community Forums', link: '/forums' },
    { name: 'Patients', link: '#' },
    { name: 'Reports', link: '#' },
    { name: 'Profile', link: '#' }
  ];

  return (
    <nav className="navbar navbar-expand-lg navbar-custom">
      <a className="navbar-brand pl-4" href="#">Mental Health Support</a>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ml-auto">
          {navItems.map((item, index) => (
            <li className="nav-item" key={index}>
              <Link className="nav-link" to={item.link}>{item.name}</Link>
            </li>
          ))}
          <li className="nav-item">
            <Link className="nav-link" to="#profile">
              <FaUserCircle size={24} />
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;



// import React from 'react';
// import { FaUserCircle } from 'react-icons/fa';

// const Navbar = ({ userType }) => {
//   const navItems = userType === 'user' ? [
//     { name: 'Homepage', link: '#' },
//     { name: 'Community Forums', link: '#' },
//     { name: 'Resources', link: '#' },
//     { name: 'Therapists', link: '#' },
//     { name: 'Mood Tracker', link: '#' }
//   ] : [
//     { name: 'Homepage', link: '#' },
//     { name: 'Community Forums', link: '#' },
//     { name: 'Patients', link: '#' },
//     { name: 'Reports', link: '#' },
//     { name: 'Profile', link: '#' }
//   ];

//   return (
//     <nav className="navbar navbar-expand-lg navbar-custom">
//       <a className="navbar-brand pl-4" href="#">Mental Health Support</a>
//       <div className="collapse navbar-collapse">
//         <ul className="navbar-nav ml-auto">
//           {navItems.map((item, index) => (
//             <li className="nav-item" key={index}>
//               <a className="nav-link" href={item.link}>{item.name}</a>
//             </li>
//           ))}
//           <li className="nav-item"> <a className="nav-link" href="#profile"> <FaUserCircle size={24} /> </a> </li>
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
