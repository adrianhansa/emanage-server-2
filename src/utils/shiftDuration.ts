const calculateShiftDuration = (startTime: string, endTime: string) => {
  let duration: number = 0;
  const startHour = parseInt(startTime.split(":")[0]);
  const startMin = parseInt(startTime.split(":")[1]);
  const startTimeInSeconds = startHour * 3600 + startMin * 60;

  const endHour = parseInt(endTime.split(":")[0]);
  const endMin = parseInt(endTime.split(":")[1]);
  const endTimeInSeconds = endHour * 3600 + endMin * 60;
  if (endTimeInSeconds < startTimeInSeconds) {
    duration = 86400 - startTimeInSeconds + endTimeInSeconds;
  } else {
    duration = endTimeInSeconds - startTimeInSeconds;
  }

  return (duration / 3600).toFixed(2);
};

export default calculateShiftDuration;
