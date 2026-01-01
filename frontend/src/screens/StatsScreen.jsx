import React from 'react';
import ScorecardSmallCompressed from '../components/scorecards/ScorecardSmallCompressed';
import TimeScaleBtnGroup from '../components/stats/TimeScaleBtnGroup';
import GolfStatsDonuts from '../components/stats/GolfStatsDonuts';
import GolfScoreChart from '../components/stats/GolfScoreChart';
import GolfStepper from '../components/stats/GolfStepper';

const StatsScreen = () => {
  const handleTimeScaleChange = (scale) => {
    console.log('Time scale changed:', scale);
  };

  return (
    <div>
      <ScorecardSmallCompressed />
      <TimeScaleBtnGroup onTimeScaleChange={handleTimeScaleChange} />
      <GolfStatsDonuts birdiesPerRound={3} parsPerRound={8} bogeysPerRound={7} />
      <GolfScoreChart />
      <GolfStepper
        steps={['Upload Scorecard', 'Review Stats', 'Analyze Performance', 'Share Results']}
        currentStep={1}
        layout="horizontal"
      />
    </div>
  );
};

export default StatsScreen;
