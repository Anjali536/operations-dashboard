function Header({ darkMode, setDarkMode }) {
    return (
        <header className="header">

            <div className="header-left">
                <h1>AutoCare</h1>
            </div>

            <div className="header-right">
                <button
                    className="theme-toggle"
                    onClick={() => setDarkMode(!darkMode)}
                    title={
                        darkMode
                            ? "Switch to light mode"
                            : "Switch to dark mode"
                    }
                >
                    {darkMode ? "☀" : "☾"}
                </button>
            </div>

        </header>
    );
}

export default Header;