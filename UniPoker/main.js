import {Player, playHands, playerExpectations} from './Game.js';
class PokerBenchmark {
    constructor()
    {
        this._players = [];
        this._players.push(new Player("Player 1"));
        this._players.push(new Player("Player 2"));
        this._players.push(new Player("Player 3"));
        this._players.push(new Player("Player 4"));
    }

    runIteration()
    {
        playHands(this._players);
    }

    validate()
    {
        if (this._players.length != playerExpectations.length)
            throw "Expect " + playerExpectations.length + ", but actually have " + this._players.length;

        for (let playerIdx = 0; playerIdx < playerExpectations.length; playerIdx++)
            playerExpectations[playerIdx].validate(this._players[playerIdx]);
    }
}

let currentTime;
if (self.performance && performance.now)
    currentTime = function() { return performance.now() };
else if (self.preciseTime)
    currentTime = function() { return preciseTime() * 1000; };
else
    currentTime = function() { return new Date(); };


    
var benchmark = undefined
var numIterations = undefined
self.loadBenchmark = function(){
    const verbose = 0;
    // benchmark = new AirBenchmark(verbose); numIterations = 150;
    // benchmark = new BasicBenchmark(verbose); numIterations = 150;
    benchmark = new PokerBenchmark(); numIterations = 60;
//   benchmark = new BabylonBenchmark(); numIterations = 150;
    // benchmark = new MLBenchmark(); numIterations = 60;

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