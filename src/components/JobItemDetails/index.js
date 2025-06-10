import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import Header from '../Header'

import './index.css'

class JobItemDetails extends Component {
  state = {
    isLoading: true,
    jobDetails: {},
    similarJobs: [],
    jobsLoaded: false,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedJobDetails = {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        id: data.job_details.id,
        jobDescription: data.job_details.job_description,
        skills: data.job_details.skills,
        lifeAtCompany: data.job_details.life_at_company,
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        title: data.job_details.title,
      }
      const updatedSimilarJobs = data.similar_jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        rating: eachJob.rating,
        title: eachJob.title,
      }))

      this.setState({
        jobDetails: updatedJobDetails,
        similarJobs: updatedSimilarJobs,
        isLoading: false,
        jobsLoaded: true,
      })
    }
  }

  renderJobDetails = () => {
    const {jobDetails, similarJobs, jobsLoaded} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      skills,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      title,
    } = jobDetails
    if (jobsLoaded) {
      return (
        <div className="job-item-details-container">
          <div className="job-item-main-details">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="company-logo"
            />
            <div className="title-rating-container">
              <h1 className="job-title">{title}</h1>
              <p className="rating">⭐ {rating}</p>
            </div>
            <div className="location-package-container">
              <p className="location">{location}</p>
              <p className="employment-type">{employmentType}</p>
              <p className="package">{packagePerAnnum}</p>
            </div>
            <hr />
            <div className="description-section">
              <h1>Description</h1>
              <p>{jobDescription}</p>
              <a href={companyWebsiteUrl} target="_blank" rel="noreferrer">
                Visit Website
              </a>
            </div>

            <div className="skills-section">
              <h1>Skills</h1>
              <ul className="skills-list">
                {skills.map(skill => (
                  <li key={skill.name} className="skill-item">
                    <img
                      src={skill.image_url}
                      alt={skill.name}
                      className="skill-icon"
                    />
                    <p>{skill.name}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="life-at-company-section">
              <h1>Life at Company</h1>
              <div className="life-at-company-content">
                <p>{lifeAtCompany.description}</p>
                <img
                  src={lifeAtCompany.image_url}
                  alt="life at company"
                  className="life-at-company-img"
                />
              </div>
            </div>
          </div>

          <div className="similar-jobs-section">
            <h2>Similar Jobs</h2>
            <ul className="similar-jobs-list">
              {similarJobs.map(job => (
                <li key={job.id} className="similar-job-card">
                  <img
                    src={job.companyLogoUrl}
                    alt="similar job company logo"
                    className="company-logo"
                  />
                  <h3>{job.title}</h3>
                  <p className="rating">⭐ {job.rating}</p>
                  <p>{job.location}</p>
                  <p>{job.employmentType}</p>
                  <h1 className="similar-heading">Description</h1>
                  <p>{job.jobDescription}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )
    }
    return (
      <div className="error-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
        />
        <h1 className="error-heading">Oops! Something Went Wrong</h1>
        <p className="error-paragraph">
          We cannot seem to find the page you are looking for
        </p>
        <button className="retry-btn" type="button">
          Retry
        </button>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }

    return (
      <>
        <Header />
        <div className="job-item-details-route-container">
          {isLoading ? (
            <div className="loader-container" data-testid="loader">
              <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
            </div>
          ) : (
            this.renderJobDetails()
          )}
        </div>
      </>
    )
  }
}

export default JobItemDetails
