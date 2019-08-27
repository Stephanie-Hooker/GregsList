

export default class Job {
  constructor(data) {
    this._id = data._id
    this.company = data.company
    this.jobTitle = data.jobTitle
    this.hours = data.hours
    this.rate = data.rate
    this.description = data.description

  }

  get Template() {
    return `
        <div class="col-3">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">company${this.company}</h5>
                    <h5 class="card-text">jobTitle${this.jobTitle}</h5>
                    <h5 class="card-text">hours${this.hours} - rate${this.rate}>/h5>
                    <p class="card-text">${this.description}</p>
                    <button class="btn btn-info" onclick="app.controllers.jobController.bid('${this._id}')">Bid</button>
                    <button class="btn btn-danger" onclick="app.controllers.jobController.delete('${this._id}')">Delete Job</button>
                </div >
            </div >
        </div >
            `
  }
}