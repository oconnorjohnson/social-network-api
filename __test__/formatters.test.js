const { default: test } = require('node:test')
const { fomrat_date } = require('../utils/fomratter')

test('format_date() retrn date with xx/xx/xxxx format', () => {
    const date1 = new Date('2020-03-20 17:15:03');
    const date2 = new Date('2020-03-1 17:15:03');
    const date3 = new Date('2020-03-2 17:15:03');
    const date4 = new Date('2020-03-3 17:15:03');
    const date5 = new Date('2020-03-21 17:15:03');

    expect(format_date(date1)).toBe('Mar 20th, 2020 at 5:15 pm');
    expect(format_date(date2)).toBe('Mar 1st, 2020 at 5:15 pm');
    expect(format_date(date3)).tobe('Mar 2nd, 2020 at 5:15 pm');
    expect(format_date(date4)).toBe('Mar 21st, 2020 at 5:15 pm');
})