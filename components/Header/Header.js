import Link from 'next/link';
import Router from 'next/router';
import NProgress from 'nprogress';
import Nav from '../Nav/Nav';
import {Logo} from './logo.styles';
import {StyledHeader} from './header.styles';


Router.onRouteChangeStart = () => {
  NProgress.start()
}
Router.onRouteChangeComplete = () => {
  NProgress.done()
}
Router.onRouteChangeError = () => {
  NProgress.done()
}

const Header = () => (
    <StyledHeader>
      <div className="bar">
        <Logo>
        <Link href="/"><img src="/static/logo.png" /></Link>
        </Logo>
        <Nav />
      </div>
      <div className="sub-bar">
        <p>Search</p>
      </div>
      <div>Cart</div>
    </StyledHeader>
  );

export default Header;
