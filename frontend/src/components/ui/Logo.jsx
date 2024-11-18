import logo from '../../assets/logo.png';
import { GoBook } from "react-icons/go";

function Logo() {
  return (
    <div>
      {/* <img src={logo} alt="logo" className='w-10 filter invert'/>
       */}
       <GoBook className='text-4xl text-white' />
    </div>
  );
}

export default Logo
