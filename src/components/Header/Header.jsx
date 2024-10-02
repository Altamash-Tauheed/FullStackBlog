import { useState } from 'react';
import { Container, Logo, LogoutBtn } from '../index';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  
  const [isOpen, setIsOpen] = useState(false); // State to manage burger menu

  const navItems = [
    {
      name: 'Home',
      slug: '/',
      active: true,
    },
    {
      name: 'Login',
      slug: '/login',
      active: !authStatus,
    },
    {
      name: 'Signup',
      slug: '/signup',
      active: !authStatus,
    },
    {
      name: 'All Posts',
      slug: '/all-posts',
      active: authStatus,
    },
    {
      name: 'Add Post',
      slug: '/add-post',
      active: authStatus,
    },
  ];

  return (
    <header className='py-3 shadow bg-[#C4DAD2]'>
      <Container>
        <nav className='flex items-center justify-between'>
          <div className='mr-4'>
            <Link to='/'>
              <Logo width='100px' />
            </Link>
          </div>
          
          {/* Burger Icon for small devices */}
          <div className='md:hidden'>
            <button onClick={() => setIsOpen(!isOpen)} className='focus:outline-none'>
              <svg
                className='w-6 h-6'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16m-7 6h7' />
              </svg>
            </button>
          </div>

          {/* Nav items */}
          <ul
  className={`${
    isOpen ? 'flex' : 'hidden'
  } flex-col md:flex md:flex-row md:visible fixed md:static top-16 left-0 w-full md:w-auto bg-[#C4DAD2] md:bg-transparent md:space-x-4 p-4 md:p-0 z-10`}>
  {navItems.map(
    (item) =>
      item.active && (
        <li key={item.name} className="text-center md:text-left">
          <button
            className="block font-bold text-[#16423C] px-6 py-2 duration-200 hover:bg-[#6A9C89] rounded-full"
            onClick={() => {
              navigate(item.slug);
              setIsOpen(false); // Close the menu after navigating
            }}
          >
            {item.name}
          </button>
        </li>
      )
  )}
  {authStatus && (
    <li>
      <LogoutBtn />
    </li>
  )}
</ul>

        </nav>
      </Container>
    </header>
  );
}

export default Header;
