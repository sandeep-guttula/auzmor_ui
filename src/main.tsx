import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Button } from './components/ui/button'
import { Badge } from './components/ui/badge'
// import { Button, Badge } from 'auzmor_ui'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className='bg-primary' >Hello</div>
    <Button>Click me</Button>
    <Badge variant='secondary'>Badge</Badge>
  </StrictMode>,
)
