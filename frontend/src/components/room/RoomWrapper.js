/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useRef, useState} from 'react';
import { useParams } from 'react-router';
import socket from '../../socket/socket';
import Room from './Room';
import auth from '../../config/auth'

const RoomWrapper = () => {
  const { id } = useParams();
  
  const [messages, setMessages] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const [price, setPrice] = useState(null);
  const [users, setUsers] = useState(null);
  const setUsersRef = useRef();
  const addMessageRef = useRef();
  const setPriceRef = useRef();
  
  useEffect(() => {
    auth.currentUser.getIdToken(true).then((idToken) => {
      setUserToken(idToken);
    })
  }, [])

  useEffect(() => {
    addMessageRef.current = (message) => {
      setMessages(messages.concat([message]));
    }
  }, [messages, setMessages])
  
  useEffect(() => {
    setPriceRef.current = (price) => {
      setPrice(price);
    }
  }, [price, setPrice])

  useEffect(() => {
    setUsersRef.current = (users) => {
      setUsers(users);
    }
  }, [users, setUsers])

  useEffect(() => {
    if (userToken) { 
      return (socket.useEffectSocket({
        symbol: id.toUpperCase(),
        addMessage: addMessageRef,
        userToken,
        setCurrentPrice: setPriceRef,
        setUsersList: setUsersRef
      })());
    }
  }, [userToken, id])

  

 
    
  return (
    userToken ?<Room
      id={id}
      messages={messages}
      setMessages={setMessages}
      price={price}
      setPrice={setPrice}
      userToken={userToken}
      users={users}
      setUsers={setUsers}
    />
      :<div>Loading...</div>
  )
}

export default RoomWrapper;