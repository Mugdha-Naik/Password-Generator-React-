import React, { useCallback, useEffect, useRef, useState } from 'react';
import photo from './assets/photo.jpg'
const App = () => {
  const [length, setLength] = useState(8)
  const [numAllowed, setNumAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  const passwordRef = useRef(null)

  //method of copying
  
  const copyPasswordToClipboard = useCallback(
    () => {
      passwordRef.current?.select();
      passwordRef.current?.setSelectionRange(0,99)
      window.navigator.clipboard.writeText(password)
    },
    [password],
  )
  

  const passwordGenerator = useCallback(() => {
    let passwordContainer = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numAllowed){
      str += "0123456789"
    }
    if(charAllowed){
      str += "@!#$%^&*?/"
    }

    for(let i = 0; i < length; i++){
      let char = Math.floor(Math.random() * str.length)
      passwordContainer += str.charAt(char)
    }

    setPassword(passwordContainer)
  }, [length, numAllowed, charAllowed])

  //yaha upar wale hook me hum optimization ki baat kar rahe hai (memoization)

  useEffect(() => {
    passwordGenerator()
  }, [length, numAllowed, charAllowed, passwordGenerator])

  //yaha upar hum keh rahe hai ki agar in dependencies me kuch me bhi change ho toh function dobara se run kardo

  return (
    <>
      <div
        className="min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${photo})` }}
      >
        <div className='w-full max-w-xl min-h-[200px] mx-auto shadow-md rounded-lg px-8 text-orange-600 bg-gray-600 bg-opacity-80 flex flex-col justify-center'>
            <h1 className='text-white my-3 text-center'>Password Generator</h1>
              <div className='flex shadow rounded-lg overflow-hidden my-3 mb-4 pb-6'> 
                  <input type="text"
                  value={password}
                  className='outline-none w-full py-1 px-3'
                  placeholder='Password'
                  readOnly
                  ref={passwordRef} />

                  <button onClick={copyPasswordToClipboard} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>Copy</button>
              </div>

              <div className='flex text-sm gap-2 pb-3'>
                <div className='flex items-center gap-x-1'>
                  <input type="range" 
                  value={length}
                  min={6}
                  max={100}
                  className='cursor-pointer'
                  onChange={(e) => {setLength(e.target.value)}}/>
                  <label>Length: {length}</label>
                </div>

                <div className='flex items-center gap-x-1'>
                  <input type="checkbox"
                   defaultChecked={numAllowed}
                   id='numberInput'
                   onChange={() => {
                    setNumAllowed((prev) => !prev)
                   }}/>
                   <label htmlFor="numberInput">Numbers</label>
                </div>

                <div className='flex items-center gap-x-1'>
                      <input type="checkbox"
                      defaultChecked={charAllowed}
                      id='charInput'
                      onChange={() => {
                        setCharAllowed((prev) => !prev);
                      }} />    
                      <label htmlFor="charInput">Characters</label>                
                </div>
              </div>
        </div>
        </div>
    </>
  )
}

export default App