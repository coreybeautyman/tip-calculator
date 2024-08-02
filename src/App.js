import { useState } from 'react';
import './App.css';

function App() {
  const [billAmount, setBillAmount] = useState(0);
  const [yourService, setYourService] = useState(0);
  const [friendsService, setFriendsService] = useState(0);

  function toggleReset() {
    setBillAmount(null);
    setYourService(0);
    setFriendsService(0);
  }

  return (
    <div>
      <BillPrice onSetBillAmount={setBillAmount} billAmount={billAmount} />
      <Service onSetService={setYourService} service={yourService}>
        How did you like the service?
      </Service>
      <Service onSetService={setFriendsService} service={friendsService}>
        How did your friend like the service?
      </Service>
      <Total
        billAmount={billAmount}
        yourService={yourService}
        friendsService={friendsService}
      />
      <Reset toggleReset={toggleReset} />
    </div>
  );
}

function BillPrice({ onSetBillAmount }) {
  return (
    <p>
      How much was the bill?
      <span>
        {'  '}
        <input
          type='text'
          placeholder='Bill value'
          onChange={(e) => onSetBillAmount(+e.target.value)}
        ></input>
      </span>
    </p>
  );
}

function Service({ children, onSetService, service }) {
  return (
    <p>
      <span>{children} </span>
      <select value={service} onChange={(e) => onSetService(+e.target.value)}>
        <option value={0}>It was terrible (0%)</option>
        <option value={5}>It was okay (5%)</option>
        <option value={10}>It was good (10%)</option>
        <option value={20}>It was amazing (20%)</option>
      </select>
    </p>
  );
}

function Total({ billAmount, yourService, friendsService }) {
  const totalTipPercent = (yourService + friendsService) / 2;

  const totalTip = (billAmount / 100) * totalTipPercent;

  const totalBill = billAmount + totalTip;

  return (
    <div>
      <h2>
        You pay {`£${totalBill}`}{' '}
        {totalTip > 0 ? `(£${billAmount} + £${totalTip} tip)` : ''}
      </h2>
    </div>
  );
}

function Reset({ toggleReset }) {
  return <button onClick={toggleReset}>Reset</button>;
}

export default App;
