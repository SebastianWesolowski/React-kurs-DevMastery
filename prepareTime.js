const improveTimeDisplay = (time) => {
  const timeObject = Object.entries(time).map(([key, value], index) => {
    if (key !== "milliseconds") {
      if (value < 10 && value >= 1) {
        return [key, `0${value}`];
      }

      if (key === 0) {
        return [key, `0`];
      }
    }

    return [key, value];
  });

  return Object.fromEntries(timeObject);
};

const normalizeTime = (time) => {
  const timeArray = time.split(".");

  let normalizeObjectTime = {
    hours: parseInt(timeArray[0].split(":")[0]),
    minutes: parseInt(timeArray[0].split(":")[1]),
    seconds: parseInt(timeArray[0].split(":")[2]),
    milliseconds: parseInt(timeArray[1]),
  };

  Object.entries(normalizeObjectTime).forEach(([key, value]) => {
    switch (key) {
      case "hours":
        if (value >= 24) {
          normalizeObjectTime.hours = 23;
        }
        break;
      case "minutes":
        if (value >= 60) {
          normalizeObjectTime.minutes = 59;
        }
        break;
      case "seconds":
        if (value >= 60) {
          normalizeObjectTime.seconds = 59;
        }
        break;
      case "milliseconds":
        if (value >= 1000) {
          normalizeObjectTime.milliseconds = 999;
        }
      default:
        console.log(`out of ${key}.`);
    }
  });

  return normalizeObjectTime;
};

const prepareTimeText = (time) => {
  //Add check time without any value ex 00:10:00.000 -> 10 min , 00:00:10.000 -> 10 sec
  const normalizeObjectTime = normalizeTime(time);
  const { hours, minutes, seconds, milliseconds } =
    improveTimeDisplay(normalizeObjectTime);

  const createSufix = (
    timeProps,
    base,
    singularForm = "a",
    plurarForm = "y"
  ) => {
    const normalizeTimePros = parseInt(timeProps);
    let suffix = normalizeTimePros === 1 ? `${base}${singularForm}` : `${base}`;
    suffix =
      normalizeTimePros >= 2 && normalizeTimePros <= 9
        ? `${base}${plurarForm}`
        : `${base}`;
    return suffix;
  };

  const hoursDisplay = createSufix(hours, "godzin");
  const minutesDisplay = createSufix(minutes, "minut");
  const secondsDisplay = createSufix(seconds, "sekund");
  const millisecondsDisplay = createSufix(milliseconds, "milisekund");

  let timeText = [];

  const allowDisplay = {
    hours: false,
    minutes: false,
    seconds: false,
    milliseconds: false,
  };

  Object.entries({ hours, minutes, seconds, milliseconds }).map(
    (key, index) => {
      console.log("-> hours", hours);
      if (key[0] === "hours" && parseInt(key[1]) !== 0) {
        timeText.push(`${key[1]} ${hoursDisplay}`);
        allowDisplay.minutes = true;
        allowDisplay.seconds = true;
        allowDisplay.milliseconds = true;
      }
      if (
        (key[0] === "minutes" && allowDisplay.minutes) ||
        (parseInt(key[1]) !== 0 && timeText.length === 0)
      ) {
        timeText.push(`${key[1]} ${minutesDisplay}`);
        allowDisplay.seconds = true;
        allowDisplay.milliseconds = true;
      }
      if (
        (key[0] === "seconds" && allowDisplay.seconds) ||
        (parseInt(key[1]) !== 0 && timeText.length === 0)
      ) {
        allowDisplay.milliseconds = true;
        if (key[1] === 0) {
          timeText.push(`zero sekund i`);
        } else {
          timeText.push(`${key[1]} ${secondsDisplay}`);
        }
      }
      if (
        (key[0] === "milliseconds" && allowDisplay.milliseconds) ||
        (parseInt(key[1]) !== 0 && timeText.length === 0)
      ) {
        timeText.push(`${key[1]} ${millisecondsDisplay}`);
      }
    }
  );

  return timeText.join(" ");
};
