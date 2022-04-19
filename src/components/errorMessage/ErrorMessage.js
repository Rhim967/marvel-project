import errorImg from "./error.png"

import "./errorMessage.scss"

const ErrorMessage = () => {
    return (
        <div class="errorwrapper">
            <img src={errorImg} alt="error" />
            <span>the is an error please try again later</span>
        </div>
    )
}

export default ErrorMessage
