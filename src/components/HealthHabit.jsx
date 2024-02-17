import { useState } from 'react';

//Create an editable today's entry page
export default function HealthHabitEntries() {
  const [editingEntries, setEditingEntries] = useState(false);
  const [weight, setWeight] = useState('');
  const [water, setWater] = useState('');
  const [sleep, setSleep] = useState('');

  //edit entries after clicking the corresponding button
  function editEntries(e) {
    setEditingEntries(true);
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
      <button onClick={editEntries}>Edit Today's Entries</button>

    </>
  );
}

