import axios from 'axios'

export default axios.create({
    baseURL: "https://api.mix.ainitivirus.ai/v1"
})

// export default axios.create({
//     baseURL: "http://localhost:8000/v1"
// })