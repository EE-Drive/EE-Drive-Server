
module.exports.extractData = ({ data }) => data;

module.exports.filterByCarType = (arr, id) => arr.filter(({ carTypeId }) => carTypeId === id);

module.exports.avg = arr => {
  if(!Array.isArray(arr)) return arr;
  else if(arr.length < 1) return 0;
  else return arr.reduce((prev, current) => prev + Number(current), 0) / arr.length;
};