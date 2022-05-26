const div = document.getElementById("div-multiplicar");
const tensor_table = document.getElementById("tensor-table");
const manual_table = document.getElementById("manual-table");

const listToArray = (list, range) => {
  return [...Array(range)].map((_, index) => {
    return list.slice(index * range, index * range + range);
  });
};

const getRandom = (max, min) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const matrixGenerator = (rows, cols) => {
  return [...Array(rows).values()].map(() => {
    return [...Array(cols).values()].map(() => getRandom(1, 10));
  });
};

const multiplicateMatrix = (matrix1, matrix2) => {
  return [...matrix1].map((rows) => {
    const list = [];

    for (let i = 0; i < matrix2[0].length; i++) {
      let sum = 0;

      [...rows].forEach((value, key) => {
        sum += value * matrix2[key][i];
      });

      list.push(sum);
    }

    return list;
  });
};

const renderTable = (table, matrix) => {
  matrix.forEach((rows) => {
    const row = table.insertRow();
    rows.forEach((value) => {
      const cell = row.insertCell();
      cell.innerHTML = value;
    });
  });
};

const matrizA = matrixGenerator(3, 3);
const matrizB = matrixGenerator(3, 3);

const matrixC = multiplicateMatrix(matrizA, matrizB);

const tensorMA = tf.tensor(matrizA);
const tensorMB = tf.tensor(matrizB);
const tensorMC = tf.matMul(tensorMA, tensorMB);

renderTable(manual_table, matrixC);
renderTable(tensor_table, tensorMC.arraySync());

console.table(matrixC);
console.table(tensorMC.arraySync());
