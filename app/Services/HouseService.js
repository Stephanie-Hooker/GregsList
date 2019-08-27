import House from "../Models/House.js";
import Car from "../Models/Car.js";



//private
let _houseApi = axios.create({
  baseURL: 'http://bcw-sandbox.herokuapp.com/api/houses'
})

let _state = {
  houses: []
}


let _subscribers = {
  houses: []
}

function _setState(propName, data) {
  //NOTE add the data to the state
  _state[propName] = data
  //NOTE run every subscriber function that is watching that data
  _subscribers[propName].forEach(fn => fn());
}




//public
export default class HouseService {
  //NOTE adds the subscriber function to the array based on the property it is watching
  addSubscriber(propName, fn) {
    _subscribers[propName].push(fn)
  }

  get Houses() {
    return _state.houses.map(h => new House(h))
  }

  getApiHouses() {
    _houseApi.get()
      .then(response => {
        let housesData = response.data.data.map(h => new House(h))
        _setState("houses", housesData)
      })
      .catch(err => {
        console.error(err)
      })
  }

  addHouse(data) {
    // /NOTE A post request takes in the URLExtension and the data object to create from.
    _houseApi.post('', data)
      .then(res => {
        //this.getApiHouses()
        _state.houses.push(res.data.data)
        _setState("houses", _state.houses)
      })
      .catch(err => {
        console.error(err)
      })
  }

  deleteHouse(id) {
    // delete only requires the id, there is no "body"
    _houseApi.delete(id)
      .then(response => {
        // this .getApiHouses()
        // get the index of the object with a given id
        let index = _state.houses.findIndex(house => house._id == id)
        _state.houses.splice(index, 1)
        _setState("houses", _state.houses)
      })
  }

  bid(id) {
    // find the object, increase it's price by S1
    let house = _state.houses.find(h => h._id == id)
    house.price++
    // put will require the id, and the body with the update
    _houseApi.put(id, { price: house.price })
      .then(res => {
        _setState("houses", _state.houses)
      })
  }

}