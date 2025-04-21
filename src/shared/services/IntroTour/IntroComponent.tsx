import Joyride from "react-joyride";

// import { useState,useEffect } from "react";

const IntroComponent = (
  { data }: { data: { className: string; content: string; placement?: string; }[] }
) => {

  const generateSteps = (data: any[]) => {
    return data.map((item) => ({
      target: `.${item.className}`,
      content: item.content,
      placement: item.placement || 'right',
    }));
  };

  const steps = generateSteps(data);

  // console.log(steps);

  return (

    <Joyride
      showProgress
      run={true}
      steps={steps}
      showSkipButton
      continuous
      scrollToFirstStep
      styles={{
        options: {
          backgroundColor: 'var(--curatelyLightGrey)',
          primaryColor: 'var(--c-neutral-80)',
          textColor: 'var(--c-neutral-80)',
        },
        buttonSkip: {
          color: 'var(--c-neutral-80)',
          cursor: 'pointer',
        },
        // tooltip: {
        //   width: '40%',
        // },
      }}
    />
  );
};

export default IntroComponent;
