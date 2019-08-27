import Car from "../Models/Car.js";

// @ts-ignore
let _carApi = axios.create({
    baseURL: 'http://bcw-sandbox.herokuapp.com/api/cars'
})



//Private
let _state = {
    cars: []
}

//NOTE methods to run when a given property in state changes
let _subscribers = {
    cars: []
}

function _setState(propName, data) {
    //NOTE add the data to the state
    _state[propName] = data
    //NOTE run every subscriber function that is watching that data
    _subscribers[propName].forEach(fn => fn());
}

//Public
export default class CarService {
    //NOTE adds the subscriber function to the array based on the property it is watching
    addSubscriber(propName, fn) {
        _subscribers[propName].push(fn)
    }

    get Cars() {
        return _state.cars.map(c => new Car(c))
    }


    getApiCars() {
        _carApi.get()
            .then(res => {
                let carsData = res.data.data.map(c => new Car(c))
                _setState('cars', carsData)
            })
            .catch(err => {
                console.error(err)
            })
    }
    addCar(data) {
        //NOTE A post request takes in the URLExtension and the data object to create from.
        _carApi.post('', data)
            .then(res => {
                // this.getApiCars()
                _state.cars.push(res.data.data)
                _setState('cars', _state.cars)
            })
            .catch(err => {
                console.error(err)
            })
    }

    //cars/:id
    deleteCar(id) {
        //NOTE delete only requires the id, there is no "body"
        _carApi.delete(id)
            .then(res => {
                // this.getApiCars();
                //get the index of the object with a given id
                let index = _state.cars.findIndex(car => car._id == id)
                _state.cars.splice(index, 1)
                _setState('cars', _state.cars)
            })
            .catch(err => {
                console.error(err)
            })
    }

    bid(id) {
        //find the object, increase its price by $1
        let car = _state.cars.find(c => c._id == id)
        car.price++
        //NOTE put will require the id, and the body with the update
        _carApi.put(id, { price: car.price })
            .then(res => {
                _setState('cars', _state.cars)
            })
    }

}
