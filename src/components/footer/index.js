import './index.css';

export function Footer() {
    return (
        <footer className="p-2">
            <div className="copy_rights text_center flex_column">
                <p>Made with 💛 By Naveen Chandar 🚀 </p>
                <ul className="flex_row align_center font_bold">
                    <li className="ml-2">
                        <a href="https://github.com/Naveenchandar" target="_blank" rel="noreferrer">
                            <i className="fa fa-github social_icons"></i>
                        </a>
                    </li>
                    <li className="ml-2">
                        <a href="https://www.linkedin.com/in/naveen-ram/" target="_blank" rel="noreferrer">
                            <i className="fa fa-linkedin-square social_icons"></i>
                        </a>
                    </li>
                </ul>
                <p>© <span id="copy_right_year">2022</span> Copyrights: Retro Tube</p>
            </div>
        </footer>
    )
}