"use client"
import React, { useEffect, useRef, useState } from 'react'
import Header from '@repo/ui/header'
import Chats from '@repo/ui/chat'
export default function () {
  const ws = useRef<WebSocket | null>(null);
  const username = useRef<string>("");
  useEffect(() => {
    ws.current = new WebSocket(process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8080');
    ws.current.onopen = () => console.log('WebSocket Client Connected');
    ws.current.onclose = () => console.log('WebSocket Client Disconnected');
    ws.current.onmessage = (message) => {
      const data = JSON.parse(message.data);
      console.log(data)
      if(data.text) {
        setMessages((prev:any) => [...prev, data]);
      } 

      if (data.userid) {
        username.current = data.userid;
        console.log('Assigned UserID:', username.current);
      } 
    };
    return () => {
      ws.current?.close();
    };
  }
, []);

   const [messages, setMessages] = useState([
      { id: '1', text: 'Welcome to Breeze! Say hi 👋', sender: 'them', time: new Date().toLocaleTimeString() },
    ])

    
  const [input, setInput] = useState('')
  const bottomRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  function sendMessage() {
    if (!input.trim()) return
    const msg = {
      id: String(Date.now()),
      text: input.trim(),
      sender: 'me',
      time: new Date().toLocaleTimeString(),
    }
    ws.current?.send(JSON.stringify(msg))
    setMessages((prev:any) => [...prev, msg])
    setInput('')
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') sendMessage()
  }
  return (
    <div className="h-screen px-1 bg-gray-900 text-white">
      <Header height={8}/>
      <Chats height={92} messages={messages} setMessages={setMessages} input={input} setInput={setInput} onKeyDown={onKeyDown} bottomRef={bottomRef} sendMessage={sendMessage}  />
    </div>
  )
}
