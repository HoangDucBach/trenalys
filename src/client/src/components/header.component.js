export function HeaderTop() {
    return (
        <div className="header-top">
            <div className="container-logo">
                <div className="logo-img">
                    <img src={'/img/logo50.png'} alt={'logo-image'}/>
                </div>
                <div className="logo-title">
                    Trenalys
                </div>
            </div>
            <div className="container-menu">
                <div className="menu-item">
                    <a href={'/'}>Home</a>
                </div>
                <div className="menu-item">
                    <a href={'/about'}>About</a>
                </div>
                <div className="menu-item">
                    <a href={'/contact'}>Contact</a>
                </div>
            </div>
        </div>
    );
}