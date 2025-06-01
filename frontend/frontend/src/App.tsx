import React, { useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/home';
import Ujcar from './components/ujcar';
function App() {
  const homeRef = useRef<HTMLDivElement>(null)
  const ujRef = useRef<HTMLDivElement>(null)

  const [refresh, setRefresh] = useState(0)

  const roll = (e: React.RefObject<HTMLDivElement| null>) =>{
    e.current?.scrollIntoView({behavior:'smooth'})
  }
  return (
    <><div className='container'>
      <header className='mb-3'>
        <nav >
<a className='m-2'
href='#'
onClick={(e)=>{
  e.preventDefault()
  roll(ujRef)
}}>
  uj auto
</a>
<span className='m-3' > </span>
<a
href='#'>
  Petrik
</a>
        </nav>
    <h1>petrik</h1>
    </header>
    </div>
    <main>
    <div ref={homeRef}>
      <Home key={refresh}
      />
    </div>
    <div ref={ujRef}>
      <Ujcar onCarAdded={() => setRefresh(prev => prev + 1)}/>
    </div>
    </main>
    <footer>
      asdasdasdasd
    </footer>
    </>
  )
}

export default App
