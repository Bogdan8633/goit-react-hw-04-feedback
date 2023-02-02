import { useState } from 'react';
import Statistics from './Statistics';
import FeedbackOptions from './FeedbackOptions';
import Section from './Section';
import Notification from './Notification';

import styles from './app.module.css';

const App = () => {
  const [votes, setVotes] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const leaveVote = name => {
    setVotes(prevState => {
      const value = prevState[name];
      return { ...prevState, [name]: value + 1 };
    });
  };

  const total = votes.good + votes.neutral + votes.bad;

  const calcPercentage = propName => {
    if (!total) {
      return 0;
    }
    const value = votes[propName];
    const result = ((value / total) * 100).toFixed();
    return Number(result);
  };

  const { good, neutral, bad } = votes;
  const variants = Object.keys(votes);
  const goodPercentage = calcPercentage('good');

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
            positivePercentage={goodPercentage}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>
    </div>
  );
};

export default App;
