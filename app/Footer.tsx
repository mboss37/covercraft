import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


function Footer() {
    return (
        <footer className="flex w-full h-32 items-center bg-gray-600">
            <div className="flex justify-between w-full mx-auto max-w-screen-2xl px-10">
                <div className="sm:text-base text-sm font-medium text-white">
                    Powered by ChatGPT
                </div>
                <div className="flex space-x-2">
                    {/* Replace these divs with your icons */}
                    <FontAwesomeIcon
                        className="text-white"
                        icon={faTwitter} />
                </div>
            </div>
        </footer>
    );
}

export default Footer;