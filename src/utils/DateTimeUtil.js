
const month_to_vi = {
    1: 'tháng 1',
    2: 'tháng 2',
    3: 'tháng 3',
    4: 'tháng 4',
    5: 'tháng 5',
    6: 'tháng 6',
    7: 'tháng 7',
    8: 'tháng 8',
    9: 'tháng 9',
    10: 'tháng 10',
    11: 'tháng 11',
    12: 'tháng 12'
}
export default class DateTimeUtil {
    static toString(timestamp) {
        let date = new Date(timestamp);
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        return day + ' ' + month_to_vi[month] + ', ' + year;
    }

}

