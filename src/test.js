const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const res = arr.reduce(
    (acc, e, i) => {
        acc[acc.length - 1].length > 1 ? acc.push([e]) : acc[acc.length - 1].push(e);
        return acc;
    },
    [[]],
);

console.log(res);
// [[0,1],[2,3],[4,5],[6,7],[8,9]]
