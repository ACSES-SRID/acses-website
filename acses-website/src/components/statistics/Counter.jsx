import { useState } from "react";
import CountUp from "react-countup";
import ScrollTrigger from "react-scroll-trigger";

const Counter = ({ stat }) => {
    const [counterOn, setCounterOn] = useState(false);

  return (
    <>
      <ScrollTrigger
        onEnter={() => setCounterOn(true)}
        onExit={() => setCounterOn(false)}
      >
        {counterOn && (
          <CountUp start={0} end={stat} duration={2} delay={0} />
        )}
      </ScrollTrigger>
    </>
  );
};

export default Counter;
