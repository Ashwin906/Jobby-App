import {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {FaSearch, FaStar, FaMapMarkerAlt, FaSuitcase} from 'react-icons/fa'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import './index.css'

const employmentTypesList = [
  {label: 'Full Time', employmentTypeId: 'FULLTIME'},
  {label: 'Part Time', employmentTypeId: 'PARTTIME'},
  {label: 'Freelance', employmentTypeId: 'FREELANCE'},
  {label: 'Internship', employmentTypeId: 'INTERNSHIP'},
]

const salaryRangesList = [
  {salaryRangeId: '1000000', label: '10 LPA and above'},
  {salaryRangeId: '2000000', label: '20 LPA and above'},
  {salaryRangeId: '3000000', label: '30 LPA and above'},
  {salaryRangeId: '4000000', label: '40 LPA and above'},
]

class Jobs extends Component {
  state = {
    jobsList: [],
    isLoading: true,
    searchInput: '',
    employmentType: '',
    salaryRange: '',
    userProfileDetails: {},
    dataLoaded: false,
    profileLoaded: false,
  }

  componentDidMount() {
    this.getJobsData()
    this.getUserProfileDetails()
  }

  getUserProfileDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/profile'
    const option = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, option)
    console.log(response.ok)
    const data = await response.json()
    const profileData = {
      name: data.profile_details.name,
      profileImageUrl: data.profile_details.profile_image_url,
      shortBio: data.profile_details.short_bio,
    }
    console.log(data)
    console.log(profileData)
    this.setState({userProfileDetails: profileData, profileLoaded: true})
  }

  getJobsData = async () => {
    const {searchInput, employmentType, salaryRange} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentType}&minimum_package=${salaryRange}&search=${searchInput}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const updatedJobs = data.jobs.map(job => ({
        id: job.id,
        title: job.title,
        companyLogoUrl: job.company_logo_url,
        employmentType: job.employment_type,
        jobDescription: job.job_description,
        location: job.location,
        packagePerAnnum: job.package_per_annum,
        rating: job.rating,
      }))
      this.setState({
        jobsList: updatedJobs,
        isLoading: false,
        dataLoaded: true,
      })
    }
  }

  handleSearchChange = event => {
    this.setState({searchInput: event.target.value})
  }

  handleSearchKeyDown = event => {
    if (event.key === 'Enter') {
      this.getJobsData()
    }
  }

  handleEmploymentChange = event => {
    this.setState({employmentType: event.target.value}, this.getJobsData)
  }

  handleSalaryChange = event => {
    this.setState({salaryRange: event.target.value}, this.getJobsData)
  }

  renderFilters = () => (
    <div className='filters-section'>
      <div className='filter-group'>
        <h1>Type of Employment</h1>
        {employmentTypesList.map(item => (
          <div key={item.employmentTypeId}>
            <input
              type='checkbox'
              value={item.label}
              id={item.employmentTypeId}
              onChange={this.handleEmploymentChange}
            />
            <label htmlFor={item.employmentTypeId}>{item.label}</label>
          </div>
        ))}
      </div>
      <div className='filter-group'>
        <h1>Salary Range</h1>
        {salaryRangesList.map(item => (
          <div key={item.salaryRangeId}>
            <input
              type='radio'
              name='salary'
              value={item.salaryRangeId}
              id={`salary-${item.salaryRangeId}`}
              onChange={this.handleSalaryChange}
            />
            <label htmlFor={`salary-${item.salaryRangeId}`}>{item.label}</label>
          </div>
        ))}
      </div>
    </div>
  )

  onRetry = () => {
    const {history} = this.props
    history.push('/jobs')
  }

  userProfile = () => {
    const {userProfileDetails} = this.state
    const {name, profileImageUrl, shortBio} = userProfileDetails

    return (
      <div className='user-profile-container'>
        <img alt='profile' src={profileImageUrl} className='profile-img' />
        <h1 className='profile-heading'>{name}</h1>
        <p className='profile-description'>{shortBio}</p>
      </div>
    )
  }

  renderJobs = () => {
    const {jobsList, dataLoaded} = this.state
    const {history} = this.props
    if (dataLoaded) {
      return (
        <ul className='jobs-list'>
          {jobsList.map(job => (
            <li
              className='job-card'
              key={job.id}
              onClick={() => history.push(`/jobs/${job.id}`)}
            >
              <div className='job-header'>
                <img
                  src={job.companyLogoUrl}
                  alt='company logo'
                  className='job-logo'
                />
                <div>
                  <h1>{job.title}</h1>
                  <p className='job-rating'>
                    <FaStar className='star-icon' /> {job.rating}
                  </p>
                </div>
              </div>
              <div className='job-info'>
                <p>
                  <FaMapMarkerAlt /> {job.location}
                </p>
                <p>
                  <FaSuitcase /> {job.employmentType}
                </p>
                <p className='job-salary'>{job.packagePerAnnum}</p>
              </div>
              <hr />
              <h1>Description</h1>
              <p>{job.jobDescription}</p>
            </li>
          ))}
        </ul>
      )
    }
    return (
      <div className='error-container'>
        <img
          src='https://assets.ccbp.in/frontend/react-js/failure-img.png'
          alt='failure view'
        />
        <h1 className='error-heading'>Oops! Something Went Wrong</h1>
        <p className='error-paragraph'>
          We cannot seem to find the page you looking for.
        </p>
        <button className='retry-btn' type='button' onClick={this.onRetry}>
          Retry
        </button>
      </div>
    )
  }

  render() {
    const {isLoading, searchInput, profileLoaded} = this.state
    // const {
    //   isLoading,
    //   searchInput,
    //   userProfileDetails,
    //   profileLoaded,
    // } = this.state
    return (
      <>
        <Header />
        <div className='jobs-page'>
          <div className='jobs-content'>
            <div className='sidebar'>
              {profileLoaded ? (
                this.userProfile()
              ) : (
                <button className='retry-btn' type='button'>
                  Retry
                </button>
              )}

              {this.renderFilters()}
            </div>
            <div className='main-content'>
              <div className='search-bar'>
                <input
                  type='search'
                  placeholder='Search jobs'
                  value={searchInput}
                  onChange={this.handleSearchChange}
                  onKeyDown={this.handleSearchKeyDown}
                />
                <button
                  type='button'
                  onClick={this.getJobsData}
                  data-testid='searchButton'
                >
                  <FaSearch />
                </button>
              </div>
              {isLoading ? (
                <div className='loader'>
                  <Loader
                    type='ThreeDots'
                    color='#fff'
                    height={50}
                    width={50}
                  />
                </div>
              ) : (
                this.renderJobs()
              )}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default withRouter(Jobs)
