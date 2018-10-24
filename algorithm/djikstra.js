module.exports = function (allVertex, distanceBetweenAnyTwoVertex) {
    let source = [0],//算法中的S数组
        toBeProcess = [],
        path = [],//原点到任意一点最短路径所经过的点
        distance = [],//原点到任意一点的最短距离
        shortest = Infinity,
        shortestTemp = Infinity,
        newInsertIdTemp = 0,
        newInsertId = 0;//新选入S数组中的点

    for (let k = 0; k < allVertex.length; k++) {//初始化
        path[k] = [0, k];
        distance[k] = distanceBetweenAnyTwoVertex[0][k];
    }
    for (let j = 1; j < allVertex.length; j++) {
        shortestTemp = Infinity;
        for (let i = 1; i < allVertex.length; i++) {
            if (source.indexOf(i) == -1) {//将非source中的点再进行计算，其实就是计算T中的点
                if (distance[i] > (shortest + distanceBetweenAnyTwoVertex[newInsertId][i])) {
                    distance[i] = shortest + distanceBetweenAnyTwoVertex[newInsertId][i];
                    path[i] = source.concat(i);
                }
                if (distance[i] < shortestTemp) {
                    newInsertIdTemp = i;
                    shortestTemp = distance[i];
                }
            }
        }
        shortest = shortestTemp;
        newInsertId = newInsertIdTemp;
        console.log('shortest:'+shortest);
        console.log('newInsertId:'+newInsertId);
        source.push(newInsertId);
        console.log('source:'+source);
    }
    return { distance, path, source };
}