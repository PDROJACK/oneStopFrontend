import axios from "axios";


export default axios.create({
    baseURL: "https://api.mapbox.com/geocoding/v5/mapbox.places",
    params: {
        access_token: "pk.eyJ1IjoicGRyb2phY2siLCJhIjoiY2thdGF0NGJ3MGcyejJ4bzN2ZHJtOWQxeSJ9.C6EcMsG90AUSH3sL-YeZfA"
    }
})

