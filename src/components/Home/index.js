import Cookies from 'js-cookie'
import {Redirect, Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = props => {
  const token = Cookies.get('jwt_token')
  const {history} = props

  if (token === undefined) {
    return <Redirect to="/login" />
  }

  const redirectToJobs = () => {
    history.push('/jobs')
  }

  return (
    <>
      <Header />
      <div className="home-container">
        <div className="home-text-content-container">
          <h1 className="home-heading">Find The Job That Fits Your Life.</h1>
          <p className="home-description">
            Millions of people are searching for jobs, salary information,
            company reviews. Find the job that fits your abilities and
            potential.
          </p>
          <Link to="/jobs">
            <button
              type="button"
              className="home-to-jobs-btn"
              onClick={redirectToJobs}
            >
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Home
