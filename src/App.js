import React from 'react';
import Emojies from './components/Emojies';
import"./appStyles.css"
import Winner from './components/Winner';



const App = () => {
    return (
    <>
    <div className='center-container'>
    <h1 className='title'>Best Emoji Contest</h1>
    </div>
    <Emojies/>
    <Winner/>
    </>
    )
}

export default App;