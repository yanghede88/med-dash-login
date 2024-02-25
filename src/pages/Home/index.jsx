import './Home.css'
import React from 'react';
import { Image } from 'antd';
import { Flex, Progress, Button } from 'antd';
import '/src/App.css'
import { useState } from 'react';
import { Link } from 'react-router-dom'

const WelcomeHeader = () => (
  <h1 className="welcome-header">Welcome, Ben!</h1>
);


const MedDashImg = () => (

  <div className='container'>
    
    <div className='button-container'>
      <Link to="/healthAnalysis"><Button className='linkbtn'>Health Analysis</Button></Link>
      <Link to="/diary"><Button className='linkbtn'>Diary</Button></Link>
      <Link to="/healthTracker"><Button className='linkbtn'>Health Habit Tracker</Button></Link>
      <Link to="/clinicianComm"><Button className='linkbtn'>Clinician Communication</Button></Link>
    </div>
    <Image
        width={500}
        preview={false}
        src="https://med-dash.github.io/static/media/dashboard-growth.9e985101d7d337104387.png" className='right-align'
    />
  </div>


);

const x = 50;
const ProgressCheck = () => (

  <div className = 'center-align'>
    <Flex gap="large" style={{ gap: '50px' }}>
      <Progress type="circle" percent={10} strokeColor = "red"/>
      <Progress type="circle" percent={100 - x} />
      <Progress type="circle" percent={100} />
      <Progress type="circle" percent={70}  />
      <Progress type="circle" percent={5} strokeColor = "red" />
    </Flex>
  </div>
);

// Emoji component
const Emoji = ({ symbol, onClick }) => (
  <span
    onClick={() => onClick(symbol)}
    style={{ cursor: 'pointer', fontSize: '24px', margin: '0 10px' }}
    role="img"
    aria-label="Mood Emoji"
  >
    {symbol}
  </span>
);

// Main component
const MoodSurvey = () => {
  const [selectedMood, setSelectedMood] = useState(null);

  const handleEmojiClick = (emoji) => {
    setSelectedMood(emoji);
    // Additional actions can be performed here
  };

  return (
    <div className='left-align'>
      <p>How are you doing today?</p>
      <div>
        <Emoji symbol="😄" onClick={handleEmojiClick} /> {/* Smiley */}
        <Emoji symbol="🙂" onClick={handleEmojiClick} /> {/* Slightly Smiley */}
        <Emoji symbol="😐" onClick={handleEmojiClick} /> {/* Neutral */}
        <Emoji symbol="🙁" onClick={handleEmojiClick} /> {/* Slightly Sad */}
        <Emoji symbol="😢" onClick={handleEmojiClick} /> {/* Sad */}
      </div>
      {selectedMood && <p>You selected: {selectedMood}</p>}
    </div>
  );
};


const Home = () => (
    <div >
      <WelcomeHeader/>
      <MoodSurvey/>
      <MedDashImg />
      <ProgressCheck />
    </div>
  );
  
  export default Home;