/**
 * Returns the current time and date in the specified formats.
 *
 * @return {{time: string, date: string}} The current time and date.
 */

type CurrentDataReturn = {
  time: string;
  date: string;
};

export const getCurrentData = (): CurrentDataReturn => {
  const formatter = new Intl.DateTimeFormat('ru', {
    hour: 'numeric',
    minute: 'numeric',
  });
  const time = `${formatter.format(new Date())}`;

  const dateFormatter = new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
  const date = `${dateFormatter.format(new Date())}`;

  return { time, date };
};
