import './App.css'
import MainContent from './components/MainContent';
import Container from '@mui/material/Container';

function App() {

  return (
    <div style={{width:"100%", display:"flex",alignItems:"center",justifyContent:"center", position:"absolute" ,marginTop:"10px"}}>
    <Container maxWidth={'xl'}>
    
    {/* <h1>بسم الله الرحمن الرحيم</h1> */}

      <MainContent/>
    </Container>
      </div>
  )
}

export default App
