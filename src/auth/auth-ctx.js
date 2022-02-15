import React, { useEffect, createContext, useState, useContext } from 'react'
import firebaseApp from './firebase'
import API from '../utils/api'
import { merge } from 'lodash'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    firebaseApp.auth().onAuthStateChanged(fetchUserData)
  }, [])

  // merge the Firebase User with our Mongo User
  const fetchUserData = async user => {
    if (user) {
      const token = await user.getIdToken()
      const headers = { headers: { authorization: `Bearer ${token}` } }
      const mongoUser = await API.User.findOne(headers, null, user.uid)
      const currUser = merge(user, mongoUser.data)
      setCurrentUser(currUser)
    } else {
      setCurrentUser(null)
    }
  }

  // passed down to views
  const doAuthenticatedAPICall = async (endpoint, methodName, data, id) => {
    const token = await currentUser.getIdToken()
    const headers = { headers: { authorization: `Bearer ${token}` } }
    return API[endpoint][methodName](headers, data, id)
  }

  return (
    <AuthContext.Provider value={{ currentUser, doAuthenticatedAPICall }}>
      { children }
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)