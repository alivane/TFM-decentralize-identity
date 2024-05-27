// src/GuidedTour.js
import React, { useState } from 'react';
import Joyride, { STATUS } from 'react-joyride';

const GuidedTour = ( props ) => {
  const { steps } = props;
  const [run, setRun] = useState(true);

  const handleJoyrideCallback = (data) => {
    const { status } = data;
    const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      setRun(false);
    }
  };

  return (
    <Joyride
      steps={steps}
      run={run}
      continuous
      scrollToFirstStep
      showProgress
      showSkipButton
      callback={handleJoyrideCallback}
      styles={{
        options: {
          zIndex: 10000,
        },
      }}
    />
  );
};

export default GuidedTour;
