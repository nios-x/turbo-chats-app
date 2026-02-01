"use client"
import React, { useEffect, useRef, useState } from 'react'

export default function Chat({messages, setMessages, height, input, setInput, onKeyDown, bottomRef, sendMessage}:any) {
    
  return (
    <div className={`flex flex-col border rounded-lg overflow-hidden shadow-sm bg-white dark:bg-gray-800`} style={{height: `${height}%`}}>
      <div className="overflow-y-auto p-4 space-y-3   h-full">
        {messages.map((m:any) => (
          <div key={m.id} className={`flex ${m.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`${m.sender === 'me' ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100'} px-3 py-2 rounded-lg`}
              style={{ maxWidth: '80%' }}
            >
              <div className="text-sm break-words">{m.text}</div>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="p-3 border-t bg-gray-50 dark:bg-gray-900 flex flex-col sm:flex-row gap-2">
        <input
          aria-label="Message"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          className="w-full px-3 py-2 rounded-md border focus:outline-none"
          placeholder="Type a message..."
        />
        <button onClick={sendMessage} className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-md">Send</button>
      </div>
    </div>
  )
}
