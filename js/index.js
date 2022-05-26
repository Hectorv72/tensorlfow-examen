const grafico_canvas = document.getElementById("grafico");
const mensaje = document.getElementById("mensaje");

const TfModel = async () => {
  const metrics = ["loss", "acc"]; // "val_loss",  "val_acc"
  const BATCH_SIZE = 64;

  const surface = {
    name: "Model",
    tab: "Training",
    styles: {
      height: "500px",
    },
  };

  const fitCallbacks = tfvis.show.fitCallbacks(surface, metrics);

  const model = tf.sequential();

  model.add(tf.layers.dense({ units: 1, inputShape: [1] }));
  const xs = [];
  const ys = [];

  for (let i = 0; i <= 15; i += 1) {
    xs.push(i);
    ys.push(2 * i + 3);
  }
  console.log(xs);
  console.log(ys);

  const entrada = tf.tensor2d(xs, [xs.length, 1]);
  const salida = tf.tensor2d(ys, [ys.length, 1]);

  model.compile({
    loss: "meanSquaredError",
    optimizer: "sgd",
    metrics: ["accuracy"],
  });

  // await model.fit(entrada, salida, {epochs: 500})
  await model.fit(entrada, salida, {
    batchSize: BATCH_SIZE,
    epochs: 200,
    callbacks: fitCallbacks,
  });

  mensaje.innerHTML = "Modelo entrenado";

  return {
    calcular: async (list) => {
      const elements = list.length;
      const result = await model
        .predict(tf.tensor(list, [elements, 1]))
        .dataSync();
      return result;
    },
    modelo: model,
  };
};

const drawLine = (labels, result) => {
  const speedData = {
    labels: labels,
    datasets: [
      {
        label: "Y = 2X+3",
        data: result,
        borderColor: "rgba(54,162,235,1)",
        backgroundColor: "rgba(54,162,235,1)",
      },
    ],
  };

  const chartOptions = {
    legend: {
      display: true,
      position: "top",
      labels: {
        boxWidth: 20,
        fontColor: "black",
      },
    },
  };

  const config = {
    type: "line",
    data: speedData,
    options: chartOptions,
  };
  new Chart(grafico_canvas, config);
};

const run = async () => {
  const model = await TfModel();
  const list = [9, 10, 11, 23, 15];
  const result = await model.calcular(list);

  drawLine(list, result);
};

run();
