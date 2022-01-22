import logo from '../logo.svg';

function Header() {
    return(
    <header className="header">
    <img src={logo} alt="логотип в шапке" className="header__logo"/>
    </header>
    )
}

export default Header