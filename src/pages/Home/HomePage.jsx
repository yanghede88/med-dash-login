import './Home.css'
import React from 'react';
import { Image } from 'antd';
import { Flex, Progress, Button } from 'antd';
import '/src/App.css'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // default styling


const WelcomeHeader = () => (
  <h1 className="welcome-header">Welcome, Ben!</h1>
);


const MedDashImg = () => (

  <div className='container'>
    
    <div className='button-container'>
      <Link to="/healthAnalysis"><Button className='linkbtn'>Health Analysis</Button></Link>
      <Link to="/diary"><Button className='linkbtn'>Diary</Button></Link>
      <Link to="/healthTracker"><Button className='linkbtn'>Health Habit Tracker</Button></Link>
      {/* <Link to="/clinicianComm"><Button className='linkbtn'>Clinician Communication</Button></Link> */}
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

const MoodSurvey = () => {
  const [date, setDate] = useState(new Date());
  const [moods, setMoods] = useState({}); // Object to store moods with date keys

  const handleMoodSelect = (selectedDate, mood) => {
    setMoods({ ...moods, [selectedDate.toISOString().split('T')[0]]: mood });
  };

  const renderCalendarDay = ({ date, view }) => {
    if (view === 'month') {
      const moodEmoji = moods[date.toISOString().split('T')[0]];
      return (
        <div>
          {moodEmoji && <span>{moodEmoji}</span>}
        </div>
      );
    }
  };
  

  return (
    <div class = "shift">
      <MoodSelector onMoodSelect={(mood) => handleMoodSelect(date, mood)} />
      <Calendar
        onChange={setDate}
        value={date}
        tileContent={({ date, view }) => renderCalendarDay({ date, view })}
      />
    </div>
  );
};

const MoodSelector = ({ onMoodSelect }) => {
  const moods = ['😃', '😊', '😐', '😞', '😢'];
  return (
    <div>
      {moods.map((mood, index) => (
        <button key={index} className="mood-button" onClick={() => onMoodSelect(mood)}>
          {mood}
        </button>
      ))}
    </div>
  );
};



const Home = () => (
    <div>
      <WelcomeHeader/>
      <MoodSurvey/>
      <MedDashImg />
      <ProgressCheck />
    </div>
  );
  
  export default Home;