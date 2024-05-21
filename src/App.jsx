import { createBrowserRouter as cbr, RouterProvider as Rp } from 'react-router-dom'
import React from 'react'
import Home from './pages/home'
import About from './pages/about'
import Gallery from './pages/gallery'
import Contact from './pages/contact'
import Layout from './component/layout/layout'

const Routes = cbr([
  {
    path: '/',
    element: (
      <Layout children={<Home/>}/>
  )},
  {
    path: '/about',
    element: (
      <Layout children={<About />}/>
  )},
  {
    path: '/gallery',
    element: (
      <Layout children={<Gallery/>}/>
  )},
  {
    path: '/contact',
    element: (
      <Layout children={<Contact />}/>
  )},
  {
    path: '*',
    element: (
      <Layout children={<Home />}/>
  )},
])

function App() {
  return (
    <>
      <Rp router={Routes}/>
    </>
  )
}

export default App
