import React from 'react'
import Footer from './Footer'
import AddTodo from '../containers/AddTodo'
import VisibleTodoList from '../containers/VisibleTodoList'
import Branches from '../containers/BranchesContainer'

const App = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
    <div style={{position: "absolute", bottom: 0}}>
      <Branches />
    </div>
  </div>
)

export default App
