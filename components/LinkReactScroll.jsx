import { Link } from 'react-scroll';

const LinkReactScroll = ({to,text}) => {
    return (
      <Link
       to={to}
       className='nav-link scrollto'
       spy={true}
       smooth={true}
       offset={-70}
       duration={500}>
           {text}
       </Link>
    );
}

export default LinkReactScroll;