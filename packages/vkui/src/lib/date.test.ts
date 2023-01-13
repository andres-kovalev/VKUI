import {
  parse,
  startOfWeek,
  endOfWeek,
  isLastDayOfMonth,
  isWithinInterval,
  eachDayOfInterval,
  format,
  startOfDay,
  endOfDay,
  startOfMonth,
  endOfMonth,
  isFirstDayOfMonth,
  isBefore,
  isAfter,
  isSameDay,
  isSameMonth,
  setMinutes,
  setHours,
  setMonth,
  setYear,
  addDays,
  subDays,
  addWeeks,
  subWeeks,
  addMonths,
  subMonths,
  isMatch,
  getMillisecondsToTomorrow,
} from './date';

describe(startOfDay, () => {
  it('check', () => {
    const date = new Date(2022, 3, 1, 10, 10, 10);
    const expected = new Date(2022, 3, 1, 0, 0, 0);
    expect(startOfDay(date)).toEqual(expected);
  });
});

describe(endOfDay, () => {
  it('check', () => {
    const date = new Date(2022, 3, 1, 10, 10, 10);
    const expected = new Date(2022, 3, 1, 23, 59, 59, 999);
    expect(endOfDay(date)).toEqual(expected);
  });
});

describe(startOfWeek, () => {
  it('check', () => {
    const date = new Date(2022, 3, 1);
    const expected = new Date(2022, 2, 27);
    expect(startOfWeek(date)).toEqual(expected);
  });

  it("Doesn't change start of the week", () => {
    // 2022-04-04, Monday
    const date = new Date(2022, 3, 4);
    const result = startOfWeek(date, 1);
    expect(format(result, 'YYYY-MM-DD')).toEqual('2022-04-04');
  });

  it('Changes start of the week to Sunday', () => {
    // 2022-04-04, Monday
    const date = new Date(2022, 3, 4);
    const result = startOfWeek(date, 0);
    expect(format(result, 'YYYY-MM-DD')).toEqual('2022-04-03');
  });

  it('Changes start of the week to Tuesday', () => {
    // 2022-04-04, Monday
    const date = new Date(2022, 3, 4);
    const result = startOfWeek(date, 2);
    expect(format(result, 'YYYY-MM-DD')).toEqual('2022-03-29');
  });
});

describe(endOfWeek, () => {
  it('check', () => {
    const date = new Date(2022, 3, 1);
    expect(endOfWeek(date)).toEqual(new Date(2022, 3, 2));
  });

  it("Doesn't change end of the week", () => {
    // 2022-04-04, Monday
    const date = new Date(2022, 3, 4);
    const result = endOfWeek(date, 1);
    expect(format(result, 'YYYY-MM-DD')).toEqual('2022-04-10');
  });

  it('Changes end of the week to Saturday', () => {
    // 2022-04-04, Monday
    const date = new Date(2022, 3, 4);
    const result = endOfWeek(date, 0);
    expect(format(result, 'YYYY-MM-DD')).toEqual('2022-04-09');
  });

  it('Changes start of the week to Monday', () => {
    // 2022-04-04, Monday
    const date = new Date(2022, 3, 4);
    const result = endOfWeek(date, 2);
    expect(format(result, 'YYYY-MM-DD')).toEqual('2022-04-04');
  });
});

describe(startOfMonth, () => {
  it('check', () => {
    const date = new Date(2022, 3, 2);
    const expected = new Date(2022, 3, 1);
    expect(startOfMonth(date)).toEqual(expected);
  });
});

describe(endOfMonth, () => {
  it('check', () => {
    const date = new Date(2022, 3, 2);
    const expected = new Date(2022, 3, 30, 23, 59, 59, 999);
    expect(endOfMonth(date)).toEqual(expected);
  });

  it('leap year', () => {
    expect(endOfMonth(new Date(2022, 1, 2))).toEqual(new Date(2022, 1, 28, 23, 59, 59, 999));
    expect(endOfMonth(new Date(2024, 1, 2))).toEqual(new Date(2024, 1, 29, 23, 59, 59, 999));
  });
});

describe(isFirstDayOfMonth, () => {
  it('check', () => {
    expect(isFirstDayOfMonth(new Date(2022, 3, 1))).toBeTruthy();
    expect(isFirstDayOfMonth(new Date(2022, 3, 30))).toBeFalsy();
  });
});

describe(isBefore, () => {
  it('check', () => {
    const date1 = new Date(2022, 3, 1);
    const date2 = new Date(2022, 3, 2);

    expect(isBefore(date1, date2)).toBeTruthy();
    expect(isBefore(date2, date1)).toBeFalsy();

    expect(isBefore(date1, date1)).toBeFalsy();
    expect(isBefore(date2, date2)).toBeFalsy();
  });
});

describe(isAfter, () => {
  it('check', () => {
    const date1 = new Date(2022, 3, 2);
    const date2 = new Date(2022, 3, 1);

    expect(isAfter(date1, date2)).toBeTruthy();
    expect(isAfter(date2, date1)).toBeFalsy();

    expect(isAfter(date1, date1)).toBeFalsy();
    expect(isAfter(date2, date2)).toBeFalsy();
  });
});

describe(isSameDay, () => {
  it('truthy', () => {
    expect(isSameDay(new Date(2022, 3, 2), new Date(2022, 3, 2, 1))).toBeTruthy();
  });
  it('falsy', () => {
    expect(isSameDay(new Date(2022, 3, 2), new Date(2022, 3, 1))).toBeFalsy();
  });
});

describe(isSameMonth, () => {
  it('truthy', () => {
    expect(isSameMonth(new Date(2022, 3, 1), new Date(2022, 3, 29))).toBeTruthy();
  });
  it('falsy', () => {
    expect(isSameMonth(new Date(2022, 2, 1), new Date(2022, 3, 1))).toBeFalsy();
  });
});

describe(setMinutes, () => {
  it('check', () => {
    const date = new Date(2022, 3, 1, 0, 0);
    const minute = 59;
    const expected = new Date(2022, 3, 1, 0, 59);

    expect(setMinutes(date, minute)).toEqual(expected);
  });
});

describe(setHours, () => {
  it('check', () => {
    const date = new Date(2022, 3, 1);
    const hour = 23;
    const expected = new Date(2022, 3, 1, 23);

    expect(setHours(date, hour)).toEqual(expected);
  });
});

describe(setMonth, () => {
  it('check', () => {
    const date = new Date(2022, 3, 1);
    const month = 4;
    const expected = new Date(2022, 4, 1);

    expect(setMonth(date, month)).toEqual(expected);
  });
});

describe(setYear, () => {
  it('check', () => {
    const date = new Date(2022, 3, 1);
    const year = 2023;
    const expected = new Date(2023, 3, 1);

    expect(setYear(date, year)).toEqual(expected);
  });
});

describe(addDays, () => {
  it('check', () => {
    const date = new Date(2022, 3, 1);
    const day = 1;
    const expected = new Date(2022, 3, 2);

    expect(addDays(date, day)).toEqual(expected);
  });
});

describe(subDays, () => {
  it('check', () => {
    const date = new Date(2022, 3, 2);
    const day = 1;
    const expected = new Date(2022, 3, 1);

    expect(subDays(date, day)).toEqual(expected);
  });
});

describe(addWeeks, () => {
  it('check', () => {
    const date = new Date(2022, 3, 1);
    const week = 1;
    const expected = new Date(2022, 3, 8);

    expect(addWeeks(date, week)).toEqual(expected);
  });
});

describe(subWeeks, () => {
  it('check', () => {
    const date = new Date(2022, 3, 8);
    const week = 1;
    const expected = new Date(2022, 3, 1);

    expect(subWeeks(date, week)).toEqual(expected);
  });
});

describe(addMonths, () => {
  it('check', () => {
    const date = new Date(2022, 3, 1);
    const month = 1;
    const expected = new Date(2022, 4, 1);

    expect(addMonths(date, month)).toEqual(expected);
  });
});

describe(subMonths, () => {
  it('check', () => {
    const date = new Date(2022, 4, 1);
    const month = 1;
    const expected = new Date(2022, 3, 1);

    expect(subMonths(date, month)).toEqual(expected);
  });
});

describe(parse, () => {
  it('Parses valid date', () => {
    const result = parse('12-25-1995', 'MM-DD-YYYY');
    expect(format(result, 'MM-DD-YYYY')).toEqual('12-25-1995');
  });

  it('Parses valid date with reference', () => {
    const reference = new Date(2022, 3, 4, 20, 34);
    const result = parse('12-25-1995', 'MM-DD-YYYY', reference);
    expect(format(result, 'MM-DD-YYYY HH:mm')).toEqual('12-25-1995 20:34');
  });

  it('Parses valid date and time', () => {
    const result = parse('12-25-1995 16:36', 'MM-DD-YYYY HH:mm');
    expect(format(result, 'MM-DD-YYYY HH:mm')).toEqual('12-25-1995 16:36');
  });

  it('Parses valid date and time with reference', () => {
    const reference = new Date(2022, 3, 4, 20, 34, 52);
    const result = parse('12-25-1995 16:36', 'MM-DD-YYYY HH:mm', reference);
    expect(format(result, 'MM-DD-YYYY HH:mm:ss')).toEqual('12-25-1995 16:36:52');
  });

  it('Validates identical non-formatting symbols', () => {
    const result = parse('12 xxx 25 yyy 1995', 'MM yyy DD xxx YYYY');
    expect(result.toString()).toEqual('Invalid Date');
  });

  it('Fails with bad input', () => {
    const result = parse('12-1x-2022', 'MM-DD-YYYY');
    expect(result.toString()).toEqual('Invalid Date');
  });

  it('Fails if formatting not found', () => {
    const result = parse('12 xxx 25 yyy 1995', 'foo yyy bar xxx baz');
    expect(result.toString()).toEqual('Invalid Date');
  });

  it('Fails with year month overflow', () => {
    const result = parse('13-15-2022', 'MM-DD-YYYY');
    expect(result.toString()).toEqual('Invalid Date');
  });

  it('Fails with month day overflow', () => {
    const result = parse('02-31-2022', 'MM-DD-YYYY');
    expect(result.toString()).toEqual('Invalid Date');
  });

  it('Fails with day hours overflow', () => {
    const result = parse('04-04-2022 25:31', 'MM-DD-YYYY HH:mm');
    expect(result.toString()).toEqual('Invalid Date');
  });

  it('Fails with hours minutes overflow', () => {
    const result = parse('04-04-2022 14:61', 'MM-DD-YYYY HH:mm');
    expect(result.toString()).toEqual('Invalid Date');
  });
});

describe(isLastDayOfMonth, () => {
  it('is the last day of the month', () => {
    const date = new Date(2022, 2, 31);
    const result = isLastDayOfMonth(date);
    expect(result).toBeTruthy();
  });

  it('is NOT the last day of the month', () => {
    const date = new Date(2022, 2, 30);
    const result = isLastDayOfMonth(date);
    expect(result).toBeFalsy();
  });

  it('is NOT the last day of the month 2', () => {
    const date = new Date(2022, 3, 1);
    const result = isLastDayOfMonth(date);
    expect(result).toBeFalsy();
  });
});

describe(isWithinInterval, () => {
  it('is within interval', () => {
    const date = new Date(2022, 3, 4);
    const start = new Date(2022, 3, 3);
    const end = new Date(2022, 3, 5);
    const result = isWithinInterval(date, start, end);
    expect(result).toBeTruthy();
  });

  it('is within interval 2', () => {
    const date = new Date(2022, 3, 4);
    const start = new Date(2022, 3, 3, 23, 59, 59, 999);
    const end = new Date(2022, 3, 5);
    const result = isWithinInterval(date, start, end);
    expect(result).toBeTruthy();
  });

  it('is NOT within interval', () => {
    const date = new Date(2022, 3, 4);
    const start = new Date(2022, 3, 1);
    const end = new Date(2022, 3, 3);
    const result = isWithinInterval(date, start, end);
    expect(result).toBeFalsy();
  });

  it('is NOT within interval 2', () => {
    const date = new Date(2022, 3, 4);
    const start = new Date(2022, 3, 5);
    const end = new Date(2022, 3, 3);
    const result = isWithinInterval(date, start, end);
    expect(result).toBeFalsy();
  });
});

describe(eachDayOfInterval, () => {
  it('generates days within internal', () => {
    const start = new Date(2022, 3, 1);
    const end = new Date(2022, 3, 5);
    const result = eachDayOfInterval(start, end).map((date: Date) => {
      return format(date, 'DD-MM-YYYY HH:mm');
    });
    expect(result.join()).toEqual(
      '01-04-2022 00:00,02-04-2022 00:00,' + '03-04-2022 00:00,04-04-2022 00:00,05-04-2022 00:00',
    );
  });
});

describe(isMatch, () => {
  it('truthy', () => {
    expect(isMatch('12-25-1995', 'MM-DD-YYYY')).toBeTruthy();
    expect(isMatch('12-25-1995 16:36', 'MM-DD-YYYY HH:mm')).toBeTruthy();
  });

  it('falsy', () => {
    expect(isMatch('13-15-2022', 'MM-DD-YYYY')).toBeFalsy();
  });
});

describe(getMillisecondsToTomorrow, () => {
  it('check', () => {
    const date = new Date(2022, 1, 1);
    const expected = 86400000 - 1;
    expect(getMillisecondsToTomorrow(date)).toEqual(expected);
  });
});
