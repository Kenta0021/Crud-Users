import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'

const defaultValues = {
  email: '',
  password: '',
  first_name: '',
  last_name: '',
  birthday: ''
}

const FormUsers = ({ createUser, userUpdate, updateUser, isShowForm, handleChangeShowModal }) => {

  const { handleSubmit, register, reset } = useForm()

  const submitForm = (data) => {
    if (userUpdate) {
      updateUser(userUpdate.id, data)
    } else {
      createUser(data)
    }
    reset(defaultValues)
  }

  const titleForm = userUpdate ? 'Edit User' : 'New User'
  const textButton = userUpdate ? 'Edit User' : 'Add New User'

  useEffect(() => {
    if (userUpdate) {
      reset(userUpdate)
    }
  }, [userUpdate])

  return (
    <div className={`container-form ${isShowForm && 'disable-form'}`}>
      <form className='form' onSubmit={handleSubmit(submitForm)}>
      <i onClick={handleChangeShowModal} className='form__x bx bx-x'></i>
        <h2 className='form__title'>{titleForm}</h2>
        <div className='form__div'>
          <label className='form__label' htmlFor="">Email: </label>
          <input className='form__input' placeholder='Enter Your Email' type="email"  {...register('email')} />
        </div>
        <div className='form__div'>
          <label className='form__label' htmlFor="">Password: </label>
          <input className='form__input' placeholder='Enter Your Password' type="password" {...register('password')} />
        </div>
        <div className='form__div'>
          <label className='form__label' htmlFor="">First Name: </label>
          <input className='form__input' placeholder='Enter Your First Name' type="text" {...register('first_name')} />
        </div>
        <div className='form__div'>
          <label className='form__label' htmlFor="">Last Name: </label>
          <input className='form__input' placeholder='Enter Your Last Name' type="text" {...register('last_name')} />
        </div>
        <div className='form__div'>
          <label className='form__label' htmlFor="">Birthday: </label>
          <input className='form__input' type="date" {...register('birthday')} />
        </div>
        <button className='form__btn'>{textButton}</button>
      </form>
    </div>
  )
}

export default FormUsers