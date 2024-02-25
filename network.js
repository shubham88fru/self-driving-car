class NeuralNetwork {
  constructor(neuronCounts) {
    this.levels = [];
    for (let i = 0; i < neuronCounts.length - 1; i++) {
      this.levels.push(new Level(neuronCounts[i], neuronCounts[i + 1]));
    }
  }

  static feedForward(givenInputs, network) {
    let outputs = Level.feedForward(givenInputs, network.levels[0]);
    //keep passing prev level's output as input to next level
    //in the network.
    for (let i = 1; i < network.levels.length; i++) {
      outputs = Level.feedForward(outputs, network.levels[i]);
    }

    return outputs;
  }
}

/**
 * A level is pack of input and out output neurons.
 * Not just a single layer of neurons.
 */
class Level {
  constructor(inputNeuronCount, outputNeuronCount) {
    this.inputs = new Array(inputNeuronCount);
    this.outputs = new Array(outputNeuronCount);
    this.biases = new Array(outputNeuronCount); //threshold over which, output neurons will fire.

    this.weights = [];
    for (let i = 0; i < inputNeuronCount; i++) {
      this.weights[i] = new Array(outputNeuronCount);
    }

    Level.#randomize(this);
  }

  static #randomize(level) {
    for (let i = 0; i < level.inputs.length; i++) {
      for (let j = 0; j < level.outputs.length; j++) {
        level.weights[i][j] = Math.random() * 2 - 1;
      }
    }

    for (let i = 0; i < level.biases.length; i++) {
      level.biases[i] = Math.random() * 2 - 1;
    }
  }

  static feedForward(givenInputs, level) {
    for (let i = 0; i < level.inputs.length; i++) {
      level.inputs[i] = givenInputs[i];
    }

    for (let i = 0; i < level.outputs.length; i++) {
      let sum = 0;
      for (let j = 0; j < level.inputs.length; j++) {
        sum += level.inputs[j] * level.weights[j][i];
      }

      //fire/notfire
      if (sum > level.biases[i]) level.outputs[i] = 1;
      else level.outputs[i] = 0;
    }

    return level.outputs;
  }
}
