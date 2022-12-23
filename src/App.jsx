import axios from 'axios'
import { useEffect, useState } from 'react'
import { set } from 'react-hook-form'
import './App.css'
import FormUsers from './components/FormUsers'
import UserCard from './components/UserCard'

const BASE_URL = 'https://users-crud.academlo.tech/'

function App() {

  const [users, setUsers] = useState()

  const [userUpdate, setUserUpdate] = useState()

  const [isShowForm, setIsShowForm] = useState(false)

  const getAllUsers = () => {
    const URL = `${BASE_URL}users/`
    axios.get(URL)
      .then(res => setUsers(res.data))
      .catch(err => console.log(err))
  }

  const createUser = (data) => {
    const URL = `${BASE_URL}users/`
    axios.post(URL, data)
      .then(res => {
        console.log(res.data)
        getAllUsers()
        handleChangeShowModal()
      })
      .catch(err => console.log(err))
  }

  const deleteUsers = (id) => {
    const URL = `${BASE_URL}users/${id}/`
    axios.delete(URL)
      .then(res => {
        console.log(res.data)
        getAllUsers()
      })
      .catch(err => console.log(err))
  }

  const updateUser = (id, data) => {
    const URL = `${BASE_URL}users/${id}/`
    axios.patch(URL, data)
      .then(res => {
        console.log(res.data)
        getAllUsers()
        setUserUpdate()
        handleChangeShowModal()
      })
      .catch(err => console.log(err))
  }

  const handleChangeShowModal = () => {
    setIsShowForm(!isShowForm)
  }

  const handleClickNewUser = () => {
    handleChangeShowModal()
    setUserUpdate()
  }

  useEffect(() => {
    getAllUsers()
  }, [])

  return (
    <div className="App">
      <div className='header__container'>
        <h1>Crud Users</h1>
        <button onClick={handleClickNewUser} className='header__btn'><i class='bx bx-plus'></i> Create New User</button>
      </div>
      <FormUsers
        createUser={createUser}
        userUpdate={userUpdate}
        updateUser={updateUser}
        isShowForm={isShowForm}
        handleChangeShowModal={handleChangeShowModal}
      />

      <div className='users-container'>
        {
          users?.map(user => (
            <UserCard
              key={user.id}
              user={user}
              deleteUsers={deleteUsers}
              setUserUpdate={setUserUpdate}
              handleChangeShowModal={handleChangeShowModal}
            />
          ))
        }
      </div>
    </div>
  )
}

export default App
