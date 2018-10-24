module.exports = function (allVertex, distanceBetweenAnyTwoVertex) {
    let source = [0],
        toBeProcess = [],
        path = [],
        distance = [],
        shortest = Infinity,
        shortestTemp = Infinity,
        newInsertIdTemp = 0,
        newInsertId = 0;

    for (let k = 0; k < allVertex.length; k++) {
        path[k] = [0,k];
        distance[k] = distanceBetweenAnyTwoVertex[0][k];
    }
    for (let j = 1; j < allVertex.length; j++) {
        shortestTemp = Infinity;
        for (let i = 1; i < allVertex.length; i++) {
            if(source.indexOf(i)==-1){
                if(distance[i]>(shortest+distanceBetweenAnyTwoVertex[newInsertId][i])){
                    distance[i] = shortest+distanceBetweenAnyTwoVertex[newInsertId][i];
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
        source.push(newInsertId);
    }
    return {distance,path,source};
}