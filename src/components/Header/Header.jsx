import './Header.scss';
import logo from '../../images/logo.svg';

function Header({ sidebarIsVisible, setSidebarIsVisible }) {
  return (
    <div className='Header'>
      <h1>
        <img src={logo} alt='' />
        ListBump
      </h1>
      <button
        className='toggle-list-tray-btn'
        title={sidebarIsVisible ? 'Hide lists panel' : 'Show lists panel'}
        aria-label={sidebarIsVisible ? 'Hide lists panel' : 'Show lists panel'}
        onClick={() => setSidebarIsVisible((prevState) => !prevState)}>
        <svg width='46' height='46' viewBox='0 0 46 46' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <rect x='2' y='2' width='42' height='42' rx='5' stroke='#999' strokeWidth='4' />
          <line x1='33' y1='1' x2='33' y2='45' stroke='#999' strokeWidth='4' />
          <path
            d='M14 17L20 23L14 29'
            stroke='#999'
            strokeWidth='4'
            strokeLinecap='round'
            strokeLinejoin='round'
            className={sidebarIsVisible ? '' : 'flip-horizontal'}
          />
        </svg>
      </button>
    </div>
  );
}

export default Header;
