

export default class House {
  constructor(data) {
    this._id = data._id
    this.bedrooms = data.bedrooms
    this.bathrooms = data.bathrooms
    this.imgUrl = data.imgUrl
    this.levels = data.levels
    this.year = data.year
    this.price = data.price
    this.description = data.description
  }

  get Template() {
    return `
        <div class="col-3">
            <div class="card">
                <img class="card-img-top" src="${this.imgUrl}" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">${this.year} - ${this.bedrooms} - ${this.bathrooms} - ${this.levels}</h5>
                    <p class="card-text">${this.description}</p>
                    <p><sm>${this.price}</sm></p>
                    <button class="btn btn-info" onclick="app.controllers.houseController.bid('${this._id}')">Bid</button>
                    <button class="btn btn-danger" onclick="app.controllers.houseController.delete('${this._id}')">Delete House</button>
                </div >
            </div >
        </div >
            `
  }

}