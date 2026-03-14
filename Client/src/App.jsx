import React from 'react'
import {Route,Routes} from 'react-router-dom'
const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='ai' element={<Layout />}>
        <Route index element={<Dashboard/>}/>
         <Route path='write-article' element={<WriteArticle/>}/>
        <Route path='blog-titles' element={<BlogTitles />}/>
        
        </Route>
     
      </Routes>
    </div>
  )
}

export default App
