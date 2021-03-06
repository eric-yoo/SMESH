import {MLMatrix} from './ml-matrix/main.js'
import {FeedforwardNeuralNetwork, FeedforwardNeuralNetworksActivationFunctions} from './feedforward-neural-networks/FeedForwardNeuralNetwork.js'
class MLBenchmark {
    constructor() { }

    runIteration()
    {
        let Matrix = MLMatrix;
        let ACTIVATION_FUNCTIONS = FeedforwardNeuralNetworksActivationFunctions;

        function run() {
            
            let it = (name, f) => {
                f();
            };

            function assert(b) {
                if (!b)
                    throw new Error("Bad");
            }

            var functions = Object.keys(ACTIVATION_FUNCTIONS);

            it('Training the neural network with XOR operator', function () {
                var trainingSet = new Matrix([[0, 0], [0, 1], [1, 0], [1, 1]]);
                var predictions = [false, true, true, false];

                for (var i = 0; i < functions.length; ++i) {
                    var options = {
                        hiddenLayers: [4],
                        iterations: 40,
                        learningRate: 0.3,
                        activation: functions[i]
                    };
                    var xorNN = new FeedforwardNeuralNetwork(options);

                    xorNN.train(trainingSet, predictions);
                    var results = xorNN.predict(trainingSet);
                }
            });

            it('Training the neural network with AND operator', function () {
                var trainingSet = [[0, 0], [0, 1], [1, 0], [1, 1]];
                var predictions = [[1, 0], [1, 0], [1, 0], [0, 1]];

                for (var i = 0; i < functions.length; ++i) {
                    var options = {
                        hiddenLayers: [3],
                        iterations: 75,
                        learningRate: 0.3,
                        activation: functions[i]
                    };
                    var andNN = new FeedforwardNeuralNetwork(options);
                    andNN.train(trainingSet, predictions);

                    var results = andNN.predict(trainingSet);
                }
            });

            it('Export and import', function () {
                var trainingSet = [[0, 0], [0, 1], [1, 0], [1, 1]];
                var predictions = [0, 1, 1, 1];

                for (var i = 0; i < functions.length; ++i) {
                    var options = {
                        hiddenLayers: [4],
                        iterations: 40,
                        learningRate: 0.3,
                        activation: functions[i]
                    };
                    var orNN = new FeedforwardNeuralNetwork(options);
                    orNN.train(trainingSet, predictions);

                    var model = JSON.parse(JSON.stringify(orNN));
                    var networkNN = FeedforwardNeuralNetwork.load(model);

                    var results = networkNN.predict(trainingSet);
                }
            });

            it('Multiclass clasification', function () {
                var trainingSet = [[0, 0], [0, 1], [1, 0], [1, 1]];
                var predictions = [2, 0, 1, 0];

                for (var i = 0; i < functions.length; ++i) {
                    var options = {
                        hiddenLayers: [4],
                        iterations: 40,
                        learningRate: 0.5,
                        activation: functions[i]
                    };
                    var nn = new FeedforwardNeuralNetwork(options);
                    nn.train(trainingSet, predictions);

                    var result = nn.predict(trainingSet);
                }
            });

            it('Big case', function () {
                var trainingSet = [[1, 1], [1, 2], [2, 1], [2, 2], [3, 1], [1, 3], [1, 4], [4, 1],
                                    [6, 1], [6, 2], [6, 3], [6, 4], [6, 5], [5, 5], [4, 5], [3, 5]];
                var predictions = [[1, 0], [1, 0], [1, 0], [1, 0], [1, 0], [1, 0], [1, 0], [1, 0],
                                    [0, 1], [0, 1], [0, 1], [0, 1], [0, 1], [0, 1], [0, 1], [0, 1]];
                for (var i = 0; i < functions.length; ++i) {
                    var options = {
                        hiddenLayers: [20],
                        iterations: 60,
                        learningRate: 0.01,
                        activation: functions[i]
                    };
                    var nn = new FeedforwardNeuralNetwork(options);
                    nn.train(trainingSet, predictions);

                    var result = nn.predict([[5, 4]]);

                    assert(result[0][0] < result[0][1]);
                }
            });
        }

        run();
    }
}

let currentTime;
if (self.performance && performance.now)
    currentTime = function() { return performance.now() };
else if (self.preciseTime)
    currentTime = function() { return preciseTime() * 1000; };
else
    currentTime = function() { return +new Date(); };



self.benchmark = undefined
self.numIterations = undefined
self.loadBenchmark = function(){
    const verbose = 0;
    // benchmark = new AirBenchmark(verbose); numIterations = 150;
    // benchmark = new BasicBenchmark(verbose); numIterations = 150;
    // benchmark = new PokerBenchmark(); numIterations = 60;
    // benchmark = new BabylonBenchmark(); numIterations = 150;
    benchmark = new MLBenchmark(); numIterations = 60;

    let before = currentTime();
    benchmark.runIteration()
    let after = currentTime();
    return after - before;
}

self.runBenchmark = function runBenchmark()
{
    let before = currentTime();
        for (let iteration = 1; iteration < numIterations; ++iteration)
            benchmark.runIteration();
        let after = currentTime();
        return after - before;
}