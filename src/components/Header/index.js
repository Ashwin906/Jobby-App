import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiFillHome} from 'react-icons/ai'
import {IoBagSharp, IoExitOutline} from 'react-icons/io5'
import './index.css'

const Header = props => {
  const {history} = props

  const logoutUser = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  const redirectToHome = () => {
    history.push('/')
  }
  const redirectToJobs = () => {
    history.push('/jobs')
  }

  return (
    <>
      <div className="header-container">
        <div className="logo-container">
          <Link to="/">
            <img
              alt="website logo"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              className="wesbite-logo"
            />
          </Link>
        </div>
        <ul className="nav-items-container">
          <Link to="/">
            <li className="nav-item">Home</li>
          </Link>
          <Link to="/jobs">
            <li className="nav-item">Jobs</li>
          </Link>

          <li>
            <div className="logout-btn-container">
              <button type="button" className="logout-btn" onClick={logoutUser}>
                Logout
              </button>
            </div>
          </li>
        </ul>
      </div>

      <div className="header-container-mobile">
        <div className="logo-container">
          <img
            alt="website logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            className="wesbite-logo"
          />
        </div>
        <div className="nav-items-container-mobile">
          <AiFillHome onClick={redirectToHome} />
          <IoBagSharp onClick={redirectToJobs} />
          <IoExitOutline onClick={logoutUser} />
        </div>
      </div>
    </>
  )
}

export default withRouter(Header)
