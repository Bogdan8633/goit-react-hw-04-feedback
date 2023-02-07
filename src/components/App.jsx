import { useState } from 'react';
import Statistics from './Statistics';
import FeedbackOptions from './FeedbackOptions';
import Section from './Section';
import Notification from './Notification';

import styles from './app.module.css';

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const votes = { good, neutral, bad };

  const leaveVote = value => {
    switch (value) {
      case 'good':
        setGood(prevState => prevState + 1);
        break;
      case 'neutral':
        setNeutral(prevState => prevState + 1);
        break;
      case 'bad':
        setBad(prevState => prevState + 1);
        break;

      default:
        return;
    }
  };

  const total = good + neutral + bad;

  const calcPositivePercentage = () => {
    if (!total) {
      return 0;
    }
    const result = ((good / total) * 100).toFixed();
    return Number(result);
  };

  const variants = Object.keys(votes);

  return (
    <div className={styles.totalWrapper}>
      <Section title="Please leave feedback">
        <FeedbackOptions options={variants} onLeaveFeedback={leaveVote} />
      </Section>
      <Section title="Statistics">
        {total ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={total}
            positivePercentage={calcPositivePercentage()}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>
    </div>
  );
};

export default App;

// const App = () => {
//   const [votes, setVotes] = useState({
//     good: 0,
//     neutral: 0,
//     bad: 0,
//   });

//   const leaveVote = name => {
//     setVotes(prevState => {
//       const value = prevState[name];
//       return { ...prevState, [name]: value + 1 };
//     });
//   };

//   const total = votes.good + votes.neutral + votes.bad;

//   const calcPercentage = propName => {
//     if (!total) {
//       return 0;
//     }
//     const value = votes[propName];
//     const result = ((value / total) * 100).toFixed();
//     return Number(result);
//   };

//   const { good, neutral, bad } = votes;
//   const variants = Object.keys(votes);
//   const goodPercentage = calcPercentage('good');

//   return (
//     <div className={styles.totalWrapper}>
//       <Section title="Please leave feedback">
//         <FeedbackOptions options={variants} onLeaveFeedback={leaveVote} />
//       </Section>
//       <Section title="Statistics">
//         {total ? (
//           <Statistics
//             good={good}
//             neutral={neutral}
//             bad={bad}
//             total={total}
//             positivePercentage={goodPercentage}
//           />
//         ) : (
//           <Notification message="There is no feedback" />
//         )}
//       </Section>
//     </div>
//   );
// };
