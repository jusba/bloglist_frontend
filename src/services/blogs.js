import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  console.log('settoken')
  token = `bearer ${newToken}`
}

const getAll = async() => {
  const request = await axios.get(baseUrl)
  return request.data
}

const update = async newObject => {
  console.log(newObject)
  const blog =
    {
      user: newObject.id,
      likes: newObject.likes,
      author: newObject.author,
      title: newObject.title,
      url: newObject.url
    }

  const response = await axios.put(`/api/blogs/${newObject.id}`,blog)
  return(response.data)

}

const create = async newObject => {
  console.log(newObject)
  console.log(token)
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newObject, config)
  return (response.data)

}
const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token }
  }
  console.log()
  const request = await axios.delete(`/api/blogs/${id}`,config)

  return request.data

}

export default { getAll, create, update, deleteBlog, setToken, }