
import HouseService from "../Services/HouseService.js";

//private
let _houseService = new HouseService()

function _draw() {
  let houses = _houseService.Houses
  let template = ''
  houses.forEach(h => template += h.Template)
  document.getElementById('houses-cards').innerHTML = template
}



export default class HouseController {
  constructor() {
    //register all subscribers
    _houseService.addSubscriber("houses", _draw)

    //retrieve data
    _houseService.getApiHouses();
  }

  addHouse(event) {
    event.preventDefault()
    let form = event.target
    let data = {
      bedrooms: form.bedrooms.value,
      bathrooms: form.bathrooms.value,
      imgUrl: form.imgUrl.value,
      levels: form.levels.value,
      year: form.year.value,
      price: form.price.value,
      description: form.description.value
    }
    _houseService.addHouse(data)
    form.reset()
  }

  delete(id) {
    if (window.confirm("Are you sure you want to delete:")) {
      _houseService.deleteHouse(id)
    }
  }

  bid(id) {
    _houseService.bid(id)
  }










}