import './Home.css'
import React from 'react';
import { Image, ConfigProvider } from 'antd';
import { Flex, Progress, Button } from 'antd';
import '/src/App.css'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // default styling
import useFetchDataPercentages from '@/components/useFetchDataPercentages';



const WelcomeHeader = () => (
  <h1 className="welcome-header">Welcome, Ben!</h1>
);


const MedDashImg = () => (

  <div className='container'>
    
    <div className='button-container'>
      <Link to="/healthAnalysis"><Button className='linkbtn'>Health Analysis</Button></Link>
      <Link to="/diary"><Button className='linkbtn'>Diary</Button></Link>
      <Link to="/healthTracker"><Button className='linkbtn'>Health Habit Tracker</Button></Link>
    </div>
    <Image
        width={500}
        preview={false}
        src="https://med-dash.github.io/static/media/dashboard-growth.9e985101d7d337104387.png" className='right-align'
    />
  </div>


);
const csvs = ['analysis_cal.csv','analysis_dist.csv','analysis_heart.csv','analysis_steps.csv']
const x = 50;

const ProgressCheck = () => {
  useFetchDataPercentages(csvs[0])
  return (
  // This will display 100 if the data from the requested date range is successfully imported, and if not it will display the percentage of data successfully imported
  
  <div className = 'center-align'>
    <Flex gap="large" style={{ gap: '50px' }}>
      <ConfigProvider theme={{
          components: {
            Progress: {
              circleTextFontSize: "0.75em"
            },
          },
        }}> 
        <Progress type="circle" percent={useFetchDataPercentages(csvs[0])} format = {(percent) => `Calorie Data: ${percent}%`} />
        <Progress type="circle" percent={useFetchDataPercentages(csvs[1])} format = {(percent) => `Dist. Data: ${percent}%`} />
        <Progress type="circle" percent={useFetchDataPercentages(csvs[2])} format = {(percent) => `Heartrate Data: ${percent}%`} />
        <Progress type="circle" percent={useFetchDataPercentages(csvs[3])} format = {(percent) => `Step Data: ${percent}%`}/>
      </ConfigProvider>
    </Flex>
  </div>  
  )   
};

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
    <div className = "shift">
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