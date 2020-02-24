import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, cleanup } from '@testing-library/react'
import Blog from '../components/Blog_component'
import BlogForm from '../components/Blog'


const blog = {

  author: 'tekijä',
  title: 'otsikko',
  url: 'www.testit.fi',
  likes:0 ,
  user: {
    username: 'käyttäjänimi',
    name: 'nimi',
    password: 'salasana',
    token: 'perkele'
  }
}
const component = render(
  <Blog blog={blog} user ={blog.user}  />
)
const button = component.getByText('show')
fireEvent.click(button)





test('show url/likes after button', () => {

  expect(component.container).toHaveTextContent(
    `${blog.title} ${blog.author} show${blog.url}${blog.likes} Like${blog.user.name}remove`
  )


})

test('renders only title and author', () => {



  const component = render(
    <Blog blog={blog} user ={blog.user} />
  )



  expect(component.container).toHaveTextContent(
    blog.title
  )
  expect(component.container).toHaveTextContent(
    blog.author
  )
  expect(component.container).not.toHaveTextContent(
    blog.url
  )
  expect(component.container).not.toHaveTextContent(
    blog.likes
  )
})



test('like gets pressed twice -> onClick gets pressed twice', () => {
  const blog2 = {

    author: 'tekijä',
    title: 'otsikko',
    url: 'www.testit.fi',
    likes:0 ,
    user: {
      username: 'käyttäjänimi',
      name: 'nimi',
      password: 'salasana',
      token: 'perkele'
    }
  }
  const component2 = render(
    <Blog blog={blog2} user ={blog2.user}  />
  )
  const button2 = component2.getByText('show')
  fireEvent.click(button2)



  const button3 = component.getByText('Like')
  fireEvent.click(button3)
  fireEvent.click(button3)


  expect(blog2.likes).toBe(2)


})


