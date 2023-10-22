import "./footer.scss";
import telegramIco from "../../static/icons/telegram.svg";
import gitHubIco from "../../static/icons/github.svg";
import linkedInIco from "../../static/icons/linkedin.svg";
import gmailIco from "../../static/icons/gmail.svg";

function FooterElement() {
    return (
        <footer>
			<div className="author_links">
                <span>
                    find me on ...
                </span>
				<a href="https://t.me/magenta_human">
					<img className="icon" src={telegramIco} alt="magenta_human" />
				</a>
				<a href="https://github.com/LaDunne15" target="_blank" rel="noreferrer">
					<img className="icon" src={gitHubIco} alt="gitHub"/>
				</a>
				<a href="https://www.linkedin.com/in/владислав-кошельний-a56226265/" target="_blank" rel="noreferrer">
					<img className="icon" src={linkedInIco} alt="LinkedIn"/>
				</a>
				<a href="mailto:koshelnyi.vladyslav@gmail.com">
					<img className="icon" src={gmailIco} alt="Gmail"/>
				</a>
			</div>
            <div className="copyright">
                <span>2023</span>
                <span>© Made with * by Osh</span>
            </div>
		</footer>
    )
}

export default FooterElement;