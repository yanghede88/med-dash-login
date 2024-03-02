import React, { useState } from 'react';
function HealthHabit() {
  const [habits, setHabits] = useState([]);
  const [habitName, setHabitName] = useState('');
  const [habitType, setHabitType] = useState('');
  const [habitAmount, setHabitAmount] = useState('');
  const [habitTimePeriod, setHabitTimePeriod] = useState('');
  const [habitStartDate, setHabitStartDate] = useState('');
  const [habitEndDate, setHabitEndDate] = useState('');
  const [startValue, setStartValue] = useState('');
  const [goalValue, setGoalValue] = useState('');
  const handleHabitNameChange = (e) => {
    setHabitName(e.target.value);
  };
  const handleHabitTypeChange = (e) => {
    setHabitType(e.target.value);
  };
  const handleHabitAmountChange = (e) => {
    setHabitAmount(e.target.value);
  };
  const handleHabitTimePeriodChange = (e) => {
    setHabitTimePeriod(e.target.value);
  };
  const handleHabitStartDateChange = (e) => {
    setHabitStartDate(e.target.value);
  };
  const handleHabitEndDateChange = (e) => {
    setHabitEndDate(e.target.value);
  };
  const handleStartValueChange = (e) => {
    setStartValue(e.target.value);
  };
  const handleGoalValueChange = (e) => {
    setGoalValue(e.target.value);
  };
  const handleHabitSubmit = (e) => {
    e.preventDefault();
    const newHabit = {
      name: habitName,
      type: habitType,
      amount: habitAmount,
      timePeriod: habitTimePeriod,
      startDate: habitStartDate,
      endDate: habitEndDate,
      startValue: habitType === 'target' ? startValue : null,
      goalValue: habitType === 'target' ? goalValue : null,
      progress: 0 // Track progress for habit completion
    };
    setHabits([...habits, newHabit]);
    resetForm();
  };
  const resetForm = () => {
    setHabitName('');
    setHabitType('');
    setHabitAmount('');
    setHabitTimePeriod('');
    setHabitStartDate('');
    setHabitEndDate('');
    setStartValue('');
    setGoalValue('');
  };
  const updateProgress = (index, increment) => {
    const updatedHabits = [...habits];
    updatedHabits[index].progress += increment;
    setHabits(updatedHabits);
  };
  // Function to check if the goal was accomplished
  const isGoalAccomplished = (habit) => {
    return habit.type === 'habit' && habit.progress === habit.amount;
  };
  // Function to check if the goal has reached the desired compound
  const isGoalReached = (habit) => {
    return habit.type === 'target' && habit.progress >= habit.goalValue;
  };
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto', backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '10px' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>Goal Tracker</h1>
      <form onSubmit={handleHabitSubmit} style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        <div style={{ marginBottom: '15px' }}>
          <label>Name Your Goal:</label>
          <input type="text" value={habitName} onChange={handleHabitNameChange} style={{ marginLeft: '10px' }} />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Select Goal Type:</label>
          <select value={habitType} onChange={handleHabitTypeChange} style={{ marginLeft: '10px' }}>
            <option value="">Select</option>
            <option value="habit">Habit: Repeating Action</option>
            <option value="target">Target: Number by Date</option>
            <option value="average">Average: Repeating Number</option>
          </select>
        </div>
        {habitType === 'habit' && (
          <>
            <div style={{ marginBottom: '15px' }}>
              <label>How Many Times?:</label>
              <input type="number" value={habitAmount} onChange={handleHabitAmountChange} style={{ marginLeft: '10px' }} />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label>Time Period:</label>
              <select value={habitTimePeriod} onChange={handleHabitTimePeriodChange} style={{ marginLeft: '10px' }}>
                <option value="">Select</option>
                <option value="per day">Per Day</option>
                <option value="per week">Per Week</option>
                <option value="per month">Per Month</option>
                <option value="per year">Per Year</option>
              </select>
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label>Start Date:</label>
              <input type="date" value={habitStartDate} onChange={handleHabitStartDateChange} style={{ marginLeft: '10px' }} />
            </div>
          </>
        )}
        {habitType === 'target' && (
          <>
            <div style={{ marginBottom: '15px' }}>
              <label>Start Value:</label>
              <input type="number" value={startValue} onChange={handleStartValueChange} style={{ marginLeft: '10px' }} />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label>Goal Value:</label>
              <input type="number" value={goalValue} onChange={handleGoalValueChange} style={{ marginLeft: '10px' }} />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label>Start Date:</label>
              <input type="date" value={habitStartDate} onChange={handleHabitStartDateChange} style={{ marginLeft: '10px' }} />
            </div>
          </>
        )}
        {habitType === 'average' && (
          <>
            <div style={{ marginBottom: '15px' }}>
              <label>Goal:</label>
              <input type="number" value={habitAmount} onChange={handleHabitAmountChange} style={{ marginLeft: '10px' }} />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label><input type="radio" value="or more" name="averageType" /> Or More</label>
              <label><input type="radio" value="or less" name="averageType" /> Or Less</label>
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label>Time Period:</label>
              <select value={habitTimePeriod} onChange={handleHabitTimePeriodChange} style={{ marginLeft: '10px' }}>
                <option value="">Select</option>
                <option value="per day">Per Day</option>
                <option value="per week">Per Week</option>
                <option value="per month">Per Month</option>
                <option value="per year">Per Year</option>
              </select>
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label>Start Date:</label>
              <input type="date" value={habitStartDate} onChange={handleHabitStartDateChange} style={{ marginLeft: '10px' }} />
            </div>
          </>
        )}
        <button type="submit" style={{ marginLeft: '110px', marginTop: '10px', padding: '8px 20px', backgroundColor: '#4caf50', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Set Goal</button>
      </form>
      <div style={{ marginTop: '30px', backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        <h2 style={{ color: '#333' }}>Goals</h2>
        <ul>
          {habits.map((habit, index) => (
            <li key={index} style={{ color: isGoalReached(habit) ? 'green' : '' }}>
              {habit.name} - {habit.type}
              {habit.type === 'habit' && (
                <>
                  <p>Amount: {habit.amount}</p>
                  <p>Time Period: {habit.timePeriod}</p>
                  <p>Progress: {habit.progress}/{habit.amount}</p>
                  <button onClick={() => updateProgress(index, -1)} disabled={habit.progress === 0}>-</button>
                  <button onClick={() => updateProgress(index, 1)} disabled={habit.progress === habit.amount}>+</button>
                </>
              )}
              {habit.type === 'target' && (
                <>
                  <p>Start Value: {habit.startValue}</p>
                  <p>Goal Value: {habit.goalValue}</p>
                </>
              )}
              {habit.type === 'average' && (
                <>
                  <p>Goal: {habit.amount}</p>
                  <p>Time Period: {habit.timePeriod}</p>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export default HealthHabit;