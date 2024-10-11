import axios from 'axios';

export async function getEvents() {
  return axios.get('http://localhost:8000/events').then(res => {
    return res.data
  })
}

export async function getEventById(id) {
  return axios.get(`http://localhost:8000/events?id=${id}`).then(res => {
    return res.data
  })
}

export async function getMessagesByEventId(id) {
  return axios.get(`http://localhost:8000/messages?eventID=${id}`).then(res => {
    return res.data
  })
}

export async function postNewEvent(name, date, location, recipients) {

  const newEvent = {
    "hosts": [
      "Ollie"
    ],
    "occassion": name,
    "date": date,
    "location": location,
    "invited": recipients,
    "accepted": 0,
    "thumbnail": ""
  }

  return axios.post('http://localhost:8000/events', newEvent).then(res => {
    return res.data
  })
}

export async function postNewMessage(id, message) {
  const newMessage = {
    "eventID": id,
    "sender": "Ollie",
    "message": message
  }

  return axios.post('http://localhost:8000/messages', newMessage).then(res => {
    return res.data
  })
}

export async function deleteEventById(id) {
  return axios.delete(`http://localhost:8000/events/${id}`).then(res => {
    return res
  })
}

export async function getProducts() {
  return axios.get('http://localhost:8000/products').then(res => {
    return res.data
  })
}


export async function getProductById(id) {
  return axios.get(`http://localhost:8000/products?id=${id}`).then(res => {
    return res.data
  })
}

export async function getBasket() {
  return axios.get('http://localhost:8000/basket').then(res => {
    return res.data
  })
}

export async function addToBasket(product){
  delete product.id
  return axios.post('http://localhost:8000/basket', product).then(res => {
    return res.data
  })
}

export async function removeFromBasket(id) {
  return axios.delete(`http://localhost:8000/basket/${id}`).then(res => {
    return res
  })
}