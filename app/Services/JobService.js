import Job from "../Models/Job.js";

//private
let _JobApi = axios.create({
  baseURL: "http://bcw-sandbox.herokuapp.com/api/jobs"
})

let _state = {
  jobs: []
}

let _subscribers = {
  jobs: []
}

function _setState(propName, data) {
  //NOTE add the data to the state
  _state[propName] = data
  //NOTE run every subscriber function that is watching that data
  _subscribers[propName].forEach(fn => fn());
}

//public
export default class JobService {
  addSubscriber(propName, fn) {
    _subscribers[propName].push(fn)
  }

  get Jobs() {
    return _state.jobs.map(j => new Job(j))
  }

  getApiJobs() {
    _JobApi.get()
      .then(res => {
        let jobsData = res.data.data.map(j => new Job(j))
        _setState("jobs", jobsData)
      })
      .catch(err => {
        console.error(err)
      })
  }

  addJob(data) {
    _JobApi.post('', data)
      .then(res => {
        _state.jobs.push(res.data.data)
        _setState("jobs", _state.jobs)
      })
  }

  deleteJob(id) {
    _JobApi.delete(id)
      .then(res => {
        let index = _state.jobs.findIndex(job => job._id == id)
        _state.jobs.splice(index, 1)
        _setState("jobs", _state.jobs)
      })
      .catch(err => {
        console.error(err)
      })

  }

  bid(id) {
    let job = _state.jobs.find(j => j._id == id)
    job.price++
    _JobApi.put(id, { price: job.price })
      .then(res => {
        _setState("jobs", _state.jobs)
      })
  }

}