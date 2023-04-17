function Nav() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">Conference GO!</a>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex flex-row">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" aria-current="page" href="new-location.html">New location</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" aria-current="page" href="new-conference.html">New conference</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" aria-current="page" href="new-presentation.html">New presentation</a>
            </li>
          </ul>
        </div>
    </nav>
    );
}

export default Nav;
