import React, { useState, useRef, useEffect } from 'react';
//Create an editable today's entry page


export default function MyApp() {
  return (
    <div>
      <h1>Health Habits and Heart Rate Analysis</h1>
      <HealthHabit />
      <HeartRateAnalysis />
	<GoalTracker/>
	<HabitTracker/>
    </div>
  );
}


function HealthHabit() {
  const [editingEntries, setEditingEntries] = useState(false);
  const [addingGoal, setAddingGoal] = useState(false);
  const [isRepeatable, setRepeatable] = useState(false);
  const [numberByDate, setNumberByDate] = useState('');
  const [date, setDate] = useState('')
  const [addNewGoal, setNewGoal] = useState('')
  const [editingGoal, setEditingGoal] = useState(false);
  const [weight, setWeight] = useState('');
  const [water, setWater] = useState('');
  const [sleep, setSleep] = useState('');




  //implement target number by date

  //edit entries after clicking the corresponding button
  function editEntries(e) {
    setEditingEntries(true);
    //setEditingEntries(e.editingEntries);
  }
  

//   function StopEditingEntries(e) {
//     setEditingEntries(false);
//   }

function addGoal(e) {
    setAddingGoal(true);
}

function isRepeating(e) {
    setRepeatable(e.target.checked);
}

function numByDate(e) {
    setNumberByDate(e.target.value);
}

function byDate(e) {
    setDate(e.target.value)
}

function editGoal() {
    setEditingGoal(true);
}

  function changeWeight(e) {
    setWeight(e.target.value);
  }

  function changeWater(e) {
    setWater(e.target.value);
  }

  function changeSleep(e) {
    setSleep(e.target.value);
  }

  function addingNewGoal(e) {
    setNewGoal(true);
  }
  //Stop editting feature not used rn: <div onClick={StopEditingEntries}></div>

  // Aesthetic <span style={{ color: habits.exercise[day] >= goal.exercise ? 'green' : 'red' }}>
  return (
    <>

    <p> Today's Entries </p>

      <p>Weight: {weight}</p>
      <input value={weight} onChange={changeWeight} disabled={!editingEntries} />
      
      <p>Water: {water}</p>
      <input value={water} onChange={changeWater} disabled={!editingEntries} />
      
      <p>Sleep: {sleep}</p>
      <input value={sleep} onChange={changeSleep} disabled={!editingEntries} />
      <p></p>

      {addNewGoal &&(<label>
        Goal is {numberByDate} by {byDate}
      </label>

      )}
      <p></p>

      <button onClick={editEntries}>Edit Today's Entries </button>

      <button onClick={addGoal}>Add Goal </button>
      <button onClick={editGoal}>Edit/Delete Goal</button>
      <p></p>
      {addingGoal && (<label>
      <input type="checkbox" checked={isRepeatable} onChange={isRepeating} />
      Goal is {isRepeatable ? 'Repeatable' : 'One Time'}
      <p></p>
      Achieve <input value={numberByDate} onChange={numByDate} /> by 
      <input value={date} onChange={byDate} />
      <p></p>
      <button onClick={addingNewGoal}>Add New Goal</button>
      </label>
      )}
      <p></p>
    </>
  );
}
function HeartRateAnalysis() {
  // Define state for today's heart rate and weekly average heart rate
  const [todayHeartRate, setTodayHeartRate] = useState(0);
  const [weeklyAverageHeartRate, setWeeklyAverageHeartRate] = useState(0);
  const [comparison, setComparison] = useState('');

  // Simulated function to fetch today's heart rate (Replace with actual logic)
  const fetchTodaysHeartRate = () => {
    // Simulated logic to fetch today's heart rate from an API or database
    // For demonstration purposes, generating a random heart rate between 60 and 100
    return Math.floor(Math.random() * (100 - 60 + 1) + 60);
  };

  // Simulated function to fetch weekly average heart rate (Replace with actual logic)
  const fetchWeeklyAverageHeartRate = () => {
    // Simulated logic to fetch weekly average heart rate from an API or database
    // For demonstration purposes, generating a random weekly average between 65 and 85
    return Math.floor(Math.random() * (85 - 65 + 1) + 65);
  };

  useEffect(() => {
    // Fetch today's heart rate and update state
    const todayRate = fetchTodaysHeartRate();
    setTodayHeartRate(todayRate);

    // Fetch weekly average heart rate and update state
    const weeklyAverageRate = fetchWeeklyAverageHeartRate();
    setWeeklyAverageHeartRate(weeklyAverageRate);

    // Compare today's heart rate with weekly average heart rate
    if (todayRate > weeklyAverageRate) {
      setComparison('HIGHER');
    } else if (todayRate < weeklyAverageRate) {
      setComparison('LOWER');
    } else {
      setComparison('EQUAL');
    }
  }, []);

  return (
    <div>
      <h2>Heart Rate Analysis</h2>
      <p>Today's Heart Rate: {todayHeartRate}</p>
      <p>Weekly Average Heart Rate: {weeklyAverageHeartRate}</p>
      <p>Today's heart rate was {comparison} than your typical heart rate average over the week.</p>
    </div>
  );
}











function GoalTracker() {
  const [habits, setHabits] = useState([]);
  const [habitName, setHabitName] = useState('');
  const [habitType, setHabitType] = useState('');
  const [habitAmount, setHabitAmount] = useState('');
  const [habitTimePeriod, setHabitTimePeriod] = useState('');
  const [habitStartDate, setHabitStartDate] = useState('');

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

  const handleHabitSubmit = (e) => {
    e.preventDefault();
    const newHabit = {
      name: habitName,
      type: habitType,
      amount: habitAmount,
      timePeriod: habitTimePeriod,
      startDate: habitStartDate
    };
    setHabits([...habits, newHabit]);
    setHabitName('');
    setHabitType('');
    setHabitAmount('');
    setHabitTimePeriod('');
    setHabitStartDate('');
  };

  const resetForm = () => {
    setHabitName('');
    setHabitType('');
    setHabitAmount('');
    setHabitTimePeriod('');
    setHabitStartDate('');
  };

  return (
    <div>
      <h1>Goal Tracker</h1>
      <form onSubmit={handleHabitSubmit}>
        <label>
          Name Your Goal:
          <input type="text" value={habitName} onChange={handleHabitNameChange} />
        </label>
        <label>
          Select Goal Type:
          <select value={habitType} onChange={handleHabitTypeChange}>
            <option value="">Select</option>
            <option value="habit">Habit: Repeating Action</option>
            <option value="target">Target: Number by Date</option>
            <option value="average">Average: Repeating Number</option>
          </select>
        </label>
        {habitType === 'habit' && (
          <>
            <label>
              How Many Times?:
              <input type="number" value={habitAmount} onChange={handleHabitAmountChange} />
            </label>
            <label>
              Time Period:
              <select value={habitTimePeriod} onChange={handleHabitTimePeriodChange}>
                <option value="">Select</option>
                <option value="per day">Per Day</option>
                <option value="per week">Per Week</option>
                <option value="per month">Per Month</option>
                <option value="per year">Per Year</option>
              </select>
            </label>
            <label>
              Start Date:
              <input type="date" value={habitStartDate} onChange={handleHabitStartDateChange} />
            </label>
          </>
        )}
        {habitType === 'target' && (
          <>
            <label>
              Start Value:
              <input type="number" value={habitAmount} onChange={handleHabitAmountChange} />
            </label>
            <label>
              Goal Value:
              <input type="number" value={habitAmount} onChange={handleHabitAmountChange} />
            </label>
            <label>
              Start Date:
              <input type="date" value={habitStartDate} onChange={handleHabitStartDateChange} />
            </label>
          </>
        )}
        {habitType === 'average' && (
          <>
            <label>
              Goal:
              <input type="number" value={habitAmount} onChange={handleHabitAmountChange} />
            </label>
            <label>
              <input type="radio" value="or more" name="averageType" />
              Or More
            </label>
            <label>
              <input type="radio" value="or less" name="averageType" />
              Or Less
            </label>
            <label>
              Time Period:
              <select value={habitTimePeriod} onChange={handleHabitTimePeriodChange}>
                <option value="">Select</option>
                <option value="per day">Per Day</option>
                <option value="per week">Per Week</option>
                <option value="per month">Per Month</option>
                <option value="per year">Per Year</option>
              </select>
            </label>
            <label>
              Start Date:
              <input type="date" value={habitStartDate} onChange={handleHabitStartDateChange} />
            </label>
          </>
        )}
        <button type="submit">Set Goal</button>
      </form>

      <div>
        <h2>Goals</h2>
        <ul>
          {habits.map((habit, index) => (
            <li key={index}>
              {habit.name} - {habit.type}
              {habit.type === 'habit' && (
                <>
                  <p>Amount: {habit.amount}</p>
                  <p>Time Period: {habit.timePeriod}</p>
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

      <button onClick={resetForm}>Add Another Goal</button>
    </div>
  );
}






function HabitTracker() {
  const [habits, setHabits] = useState({
    //filled with 7 since there are 7 days in a week
    exercise: Array(7).fill(0),
    waterIntake: Array(7).fill(0),
    sleep: Array(7).fill(0)
  });
  const [goal, setGoal] = useState({
    exercise: 0,
    waterIntake: 0,
    sleep: 0
  });
  const [summary, setSummary] = useState(null);
  const [newHabit, setNewHabit] = useState('');
  const [showGraph, setShowGraph] = useState(false);
  const [selectedHabits, setSelectedHabits] = useState({
    exercise: true,
    waterIntake: true,
    sleep: true
  });

  const canvasRef = useRef(null);

  const toggleHabit = (habit, day) => {
    setHabits(prevHabits => ({
      ...prevHabits,
      [habit]: prevHabits[habit].map((item, index) =>
        index === day ? !item : item
      )
    }));
  };

  const calculateSuccessRate = (habit) => {
    const successCount = habits[habit].filter(value => value >= goal[habit]).length;
    return ((successCount / 7) * 100).toFixed(2);
  };

  const generateSummary = () => {
    const exerciseSuccessRate = calculateSuccessRate('exercise');
    const waterIntakeSuccessRate = calculateSuccessRate('waterIntake');
    const sleepSuccessRate = calculateSuccessRate('sleep');

    setSummary({
      exerciseSuccessRate,
      waterIntakeSuccessRate,
      sleepSuccessRate
    });
  };

  const handleAddNewHabit = (habit) => {
    if (habit.trim() !== '') {
      setHabits(prevHabits => ({
        ...prevHabits,
        [habit]: Array(7).fill(0)
      }));
      setGoal(prevGoal => ({
        ...prevGoal,
        [habit]: 0
      }));
      setNewHabit('');
    }
  };

  useEffect(() => {
    if (showGraph) {
      drawChart();
    }
  },);

  const drawChart = () => {
    const canvas = canvasRef.current;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const labels = [...Array(7)].map((_, day) => day + 1);

  ctx.beginPath();
  ctx.moveTo(50, 10);
  ctx.lineTo(50, 350);
  ctx.lineTo(500, 350);
  ctx.strokeStyle = '#000';
  ctx.stroke();

  const habitColors = {
    exercise: '#FF5733',
    waterIntake: '#33FF57',
    sleep: '#3357FF'
  };

  const habitNames = Object.keys(habits);

  habitNames.forEach((habit, i) => {
    if (selectedHabits[habit]) {
      ctx.beginPath();
      ctx.strokeStyle = habitColors[habit];
      ctx.lineWidth = 2;
      habits[habit].forEach((value, index) => {
        const x = 50 + (index * 60);
        const y = 350 - (value * 10);
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
        // Draw y-axis labels for each variable
        ctx.fillText(value, x - 10, y - 5);
      });
      ctx.stroke();
      ctx.fillText(habit, 510, 40 + i * 20);
    }
  });

  labels.forEach((label, index) => {
    ctx.fillText(label, 45 + (index * 60), 370);
  });

  habitNames.forEach((habit, i) => {
    const y = 50 + i * 20;
    ctx.fillStyle = habitColors[habit];
    ctx.fillText(habit, 10, y);
  });

  ctx.save();
  ctx.translate(30, 180);
  ctx.rotate(-Math.PI / 2);
  ctx.fillText("Value", 0, 0);
  ctx.restore();
  };

  const handleCheckboxChange = (habit) => {
    setSelectedHabits(prevState => ({
      ...prevState,
      [habit]: !prevState[habit]
    }));
  };

  return (
    <div>
      <h1>Personalized Health Habit Tracker</h1>
      <h2>Add New Habit</h2>
      <div>
        <input
          type="text"
          placeholder="Enter new habit..."
          value={newHabit}
          onChange={e => setNewHabit(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              handleAddNewHabit(newHabit);
            }
          }}
        />
        <button onClick={() => handleAddNewHabit(newHabit)}>Add Habit</button>
      </div>
      <h2>Goals</h2>
      <div>
        {Object.keys(habits).map(habit => (
          <div key={habit}>
            <label>
              {habit} Goal:
              <input
                type="number"
                value={goal[habit] || 0}
                onChange={e => setGoal({ ...goal, [habit]: parseInt(e.target.value, 10) })}
              />
            </label>
          </div>
        ))}
      </div>
      <h2>Habit Tracker</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            {Object.keys(habits).map(habit => (
              <th key={habit}>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedHabits[habit]}
                    onChange={() => handleCheckboxChange(habit)}
                  />
                  {habit}
                </label>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[...Array(7)].map((_, day) => (
            <tr key={day}>
              <td>{day + 1}</td>
              {Object.keys(habits).map(habit => (
                <td key={habit}>
                  <input
                    type="number"
                    value={habits[habit] ? habits[habit][day] : ''}
                    onChange={e => setHabits(prevHabits => ({
                      ...prevHabits,
                      [habit]: prevHabits[habit].map((value, index) =>
                        index === day ? parseInt(e.target.value, 10) : value
                      )
                    }))}
                  />
                  <span style={{ color: habits[habit] && habits[habit][day] >= goal[habit] ? 'green' : 'red' }}>
                    {habits[habit] ? habits[habit][day] : 0} / {goal[habit] || 0}
                  </span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={generateSummary}>Generate Summary</button>
      <button onClick={() => setShowGraph(!showGraph)}>
        {showGraph ? 'Hide Graph' : 'Show Graph'}
      </button>
      {showGraph && (
        <div>
          <h2>Graph</h2>
          <canvas ref={canvasRef} width="550" height="400" style={{ border: '1px solid black' }}></canvas>
          <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '20px' }}>
            {Object.keys(habits).map(habit => (
              <label key={habit} style={{ marginBottom: '5px' }}>
                <input
                  type="checkbox"
                  checked={selectedHabits[habit]}
                  onChange={() => handleCheckboxChange(habit)}
                />
                {habit}
              </label>
            ))}
          </div>
        </div>
      )}
      {summary && (
        <div>
          <h2>Summary</h2>
          {Object.keys(summary).map(habit => (
            <p key={habit}>
              {habit}: {summary[habit]}%
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
