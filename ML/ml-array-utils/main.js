import {MLStat} from '../ml-stat/main.js';

// ml-array-utils ArrayUtils.js
const MLArrayUtilsArrayUtils = {}; //4
{
    const Stat = MLStat.array;
    /**
     * Function that returns an array of points given 1D array as follows:
     *
     * [x1, y1, .. , x2, y2, ..]
     *
     * And receive the number of dimensions of each point.
     * @param array
     * @param dimensions
     * @returns {Array} - Array of points.
     */
    self.coordArrayToPoints = function coordArrayToPoints(array, dimensions) {
        if(array.length % dimensions !== 0) {
            throw new RangeError('Dimensions number must be accordance with the size of the array.');
        }

        var length = array.length / dimensions;
        var pointsArr = new Array(length);

        var k = 0;
        for(var i = 0; i < array.length; i += dimensions) {
            var point = new Array(dimensions);
            for(var j = 0; j < dimensions; ++j) {
                point[j] = array[i + j];
            }

            pointsArr[k] = point;
            k++;
        }

        return pointsArr;
    }


    /**
     * Function that given an array as follows:
     * [x1, y1, .. , x2, y2, ..]
     *
     * Returns an array as follows:
     * [[x1, x2, ..], [y1, y2, ..], [ .. ]]
     *
     * And receives the number of dimensions of each coordinate.
     * @param array
     * @param dimensions
     * @returns {Array} - Matrix of coordinates
     */
    self.coordArrayToCoordMatrix = function coordArrayToCoordMatrix(array, dimensions) {
        if(array.length % dimensions !== 0) {
            throw new RangeError('Dimensions number must be accordance with the size of the array.');
        }

        var coordinatesArray = new Array(dimensions);
        var points = array.length / dimensions;
        for (var i = 0; i < coordinatesArray.length; i++) {
            coordinatesArray[i] = new Array(points);
        }

        for(i = 0; i < array.length; i += dimensions) {
            for(var j = 0; j < dimensions; ++j) {
                var currentPoint = Math.floor(i / dimensions);
                coordinatesArray[j][currentPoint] = array[i + j];
            }
        }

        return coordinatesArray;
    }

    /**
     * Function that receives a coordinate matrix as follows:
     * [[x1, x2, ..], [y1, y2, ..], [ .. ]]
     *
     * Returns an array of coordinates as follows:
     * [x1, y1, .. , x2, y2, ..]
     *
     * @param coordMatrix
     * @returns {Array}
     */
    self.coordMatrixToCoordArray = function coordMatrixToCoordArray(coordMatrix) {
        var coodinatesArray = new Array(coordMatrix.length * coordMatrix[0].length);
        var k = 0;
        for(var i = 0; i < coordMatrix[0].length; ++i) {
            for(var j = 0; j < coordMatrix.length; ++j) {
                coodinatesArray[k] = coordMatrix[j][i];
                ++k;
            }
        }

        return coodinatesArray;
    }

    /**
     * Tranpose a matrix, this method is for coordMatrixToPoints and
     * pointsToCoordMatrix, that because only transposing the matrix
     * you can change your representation.
     *
     * @param matrix
     * @returns {Array}
     */
    self.transpose= function transpose(matrix) {
        var resultMatrix = new Array(matrix[0].length);
        for(var i = 0; i < resultMatrix.length; ++i) {
            resultMatrix[i] = new Array(matrix.length);
        }

        for (i = 0; i < matrix.length; ++i) {
            for(var j = 0; j < matrix[0].length; ++j) {
                resultMatrix[j][i] = matrix[i][j];
            }
        }

        return resultMatrix;
    }

    /**
     * Function that transform an array of points into a coordinates array
     * as follows:
     * [x1, y1, .. , x2, y2, ..]
     *
     * @param points
     * @returns {Array}
     */
    self.pointsToCoordArray = function pointsToCoordArray(points) {
        var coodinatesArray = new Array(points.length * points[0].length);
        var k = 0;
        for(var i = 0; i < points.length; ++i) {
            for(var j = 0; j < points[0].length; ++j) {
                coodinatesArray[k] = points[i][j];
                ++k;
            }
        }

        return coodinatesArray;
    }

    /**
     * Apply the dot product between the smaller vector and a subsets of the
     * largest one.
     *
     * @param firstVect scale
     * @param secondVector
     * @returns {Array} each dot product of size of the difference between the
     *                  larger and the smallest one.
     */
    self.applyDotProduct = function applyDotProduct(firstVector, secondVector) {
        var largestVector, smallestVector;
        if(firstVector.length <= secondVector.length) {
            smallestVector = firstVector;
            largestVector = secondVector;
        } else {
            smallestVector = secondVector;
            largestVector = firstVector;
        }

        var difference = largestVector.length - smallestVector.length + 1;
        var dotProductApplied = new Array(difference);

        for (var i = 0; i < difference; ++i) {
            var sum = 0;
            for (var j = 0; j < smallestVector.length; ++j) {
                sum += smallestVector[j] * largestVector[i + j];
            }
            dotProductApplied[i] = sum;
        }

        return dotProductApplied;
    }
    /**
     * To scale the input array between the specified min and max values. The operation is performed inplace
     * if the options.inplace is specified. If only one of the min or max parameters is specified, then the scaling
     * will multiply the input array by min/min(input) or max/max(input)
     * @param input
     * @param options
     * @returns {*}
     */
    self.scale = function scale(input, options){
        var y;
        if(options.inPlace){
            y = input;
        }
        else{
            y = new Array(input.length);
        }
        const max = options.max;
        const min = options.min;
        if(typeof max === "number"){
            if(typeof min === "number"){
                var minMax = Stat.minMax(input);
                var factor = (max - min)/(minMax.max-minMax.min);
                for(var i=0;i< y.length;i++){
                    y[i]=(input[i]-minMax.min)*factor+min;
                }
            }
            else{
                var currentMin = Stat.max(input);
                var factor = max/currentMin;
                for(var i=0;i< y.length;i++){
                    y[i] = input[i]*factor;
                }
            }
        }
        else{
            if(typeof min === "number"){
                var currentMin = Stat.min(input);
                var factor = min/currentMin;
                for(var i=0;i< y.length;i++){
                    y[i] = input[i]*factor;
                }
            }
        }
        return y;
    }

    MLArrayUtilsArrayUtils.coordArrayToPoints = coordArrayToPoints;
    MLArrayUtilsArrayUtils.coordArrayToCoordMatrix = coordArrayToCoordMatrix;
    MLArrayUtilsArrayUtils.coordMatrixToCoordArray = coordMatrixToCoordArray;
    MLArrayUtilsArrayUtils.coordMatrixToPoints = transpose;
    MLArrayUtilsArrayUtils.pointsToCoordArray = pointsToCoordArray;
    MLArrayUtilsArrayUtils.pointsToCoordMatrix = transpose;
    MLArrayUtilsArrayUtils.applyDotProduct = applyDotProduct;
    MLArrayUtilsArrayUtils.scale = scale;
}


// ml-array-utils getEquallySpaced.js
const MLArrayUtilsGetEquallySpaced = {}; //5
{
    /**
     *
     * Function that returns a Number array of equally spaced numberOfPoints
     * containing a representation of intensities of the spectra arguments x
     * and y.
     *
     * The options parameter contains an object in the following form:
     * from: starting point
     * to: last point
     * numberOfPoints: number of points between from and to
     * variant: "slot" or "smooth" - smooth is the default option
     *
     * The slot variant consist that each point in the new array is calculated
     * averaging the existing points between the slot that belongs to the current
     * value. The smooth variant is the same but takes the integral of the range
     * of the slot and divide by the step size between two points in the new array.
     *
     * @param x - sorted increasing x values
     * @param y
     * @param options
     * @returns {Array} new array with the equally spaced data.
     *
     */
    self.getEquallySpacedData = function getEquallySpacedData(x, y, options) {
        if (x.length>1 && x[0]>x[1]) {
            x=x.slice().reverse();
            y=y.slice().reverse();
        }

        var xLength = x.length;
        if(xLength !== y.length)
            throw new RangeError("the x and y vector doesn't have the same size.");

        if (options === undefined) options = {};

        var from = options.from === undefined ? x[0] : options.from
        if (isNaN(from) || !isFinite(from)) {
            throw new RangeError("'From' value must be a number");
        }
        var to = options.to === undefined ? x[x.length - 1] : options.to;
        if (isNaN(to) || !isFinite(to)) {
            throw new RangeError("'To' value must be a number");
        }

        var reverse = from > to;
        if(reverse) {
            var temp = from;
            from = to;
            to = temp;
        }

        var numberOfPoints = options.numberOfPoints === undefined ? 100 : options.numberOfPoints;
        if (isNaN(numberOfPoints) || !isFinite(numberOfPoints)) {
            throw new RangeError("'Number of points' value must be a number");
        }
        if(numberOfPoints < 1)
            throw new RangeError("the number of point must be higher than 1");

        var algorithm = options.variant === "slot" ? "slot" : "smooth"; // default value: smooth

        var output = algorithm === "slot" ? getEquallySpacedSlot(x, y, from, to, numberOfPoints) : getEquallySpacedSmooth(x, y, from, to, numberOfPoints);

        return reverse ? output.reverse() : output;
    }

    /**
     * function that retrieves the getEquallySpacedData with the variant "smooth"
     *
     * @param x
     * @param y
     * @param from - Initial point
     * @param to - Final point
     * @param numberOfPoints
     * @returns {Array} - Array of y's equally spaced with the variant "smooth"
     */
    self.getEquallySpacedSmooth = function getEquallySpacedSmooth(x, y, from, to, numberOfPoints) {
        var xLength = x.length;

        var step = (to - from) / (numberOfPoints - 1);
        var halfStep = step / 2;

        var start = from - halfStep;
        var output = new Array(numberOfPoints);

        var initialOriginalStep = x[1] - x[0];
        var lastOriginalStep = x[x.length - 1] - x[x.length - 2];

        // Init main variables
        var min = start;
        var max = start + step;

        var previousX = Number.MIN_VALUE;
        var previousY = 0;
        var nextX = x[0] - initialOriginalStep;
        var nextY = 0;

        var currentValue = 0;
        var slope = 0;
        var intercept = 0;
        var sumAtMin = 0;
        var sumAtMax = 0;

        var i = 0; // index of input
        var j = 0; // index of output

        function getSlope(x0, y0, x1, y1) {
            return (y1 - y0) / (x1 - x0);
        }

        main: while(true) {
            while (nextX - max >= 0) {
                // no overlap with original point, just consume current value
                var add = integral(0, max - previousX, slope, previousY);
                sumAtMax = currentValue + add;

                output[j] = (sumAtMax - sumAtMin) / step;
                j++;

                if (j === numberOfPoints)
                    break main;

                min = max;
                max += step;
                sumAtMin = sumAtMax;
            }

            if(previousX <= min && min <= nextX) {
                add = integral(0, min - previousX, slope, previousY);
                sumAtMin = currentValue + add;
            }

            currentValue += integral(previousX, nextX, slope, intercept);

            previousX = nextX;
            previousY = nextY;

            if (i < xLength) {
                nextX = x[i];
                nextY = y[i];
                i++;
            } else if (i === xLength) {
                nextX += lastOriginalStep;
                nextY = 0;
            }
            // updating parameters
            slope = getSlope(previousX, previousY, nextX, nextY);
            intercept = -slope*previousX + previousY;
        }

        return output;
    }

    /**
     * function that retrieves the getEquallySpacedData with the variant "slot"
     *
     * @param x
     * @param y
     * @param from - Initial point
     * @param to - Final point
     * @param numberOfPoints
     * @returns {Array} - Array of y's equally spaced with the variant "slot"
     */
    self.getEquallySpacedSlot=function getEquallySpacedSlot(x, y, from, to, numberOfPoints) {
        var xLength = x.length;

        var step = (to - from) / (numberOfPoints - 1);
        var halfStep = step / 2;
        var lastStep = x[x.length - 1] - x[x.length - 2];

        var start = from - halfStep;
        var output = new Array(numberOfPoints);

        // Init main variables
        var min = start;
        var max = start + step;

        var previousX = -Number.MAX_VALUE;
        var previousY = 0;
        var nextX = x[0];
        var nextY = y[0];
        var frontOutsideSpectra = 0;
        var backOutsideSpectra = true;

        var currentValue = 0;

        // for slot algorithm
        var currentPoints = 0;

        var i = 1; // index of input
        var j = 0; // index of output

        main: while(true) {
            if (previousX>=nextX) throw (new Error('x must be an increasing serie'));
            while (previousX - max > 0) {
                // no overlap with original point, just consume current value
                if(backOutsideSpectra) {
                    currentPoints++;
                    backOutsideSpectra = false;
                }

                output[j] = currentPoints <= 0 ? 0 : currentValue / currentPoints;
                j++;

                if (j === numberOfPoints)
                    break main;

                min = max;
                max += step;
                currentValue = 0;
                currentPoints = 0;
            }

            if(previousX > min) {
                currentValue += previousY;
                currentPoints++;
            }

            if(previousX === -Number.MAX_VALUE || frontOutsideSpectra > 1)
                currentPoints--;

            previousX = nextX;
            previousY = nextY;

            if (i < xLength) {
                nextX = x[i];
                nextY = y[i];
                i++;
            } else {
                nextX += lastStep;
                nextY = 0;
                frontOutsideSpectra++;
            }
        }

        return output;
    }
    /**
     * Function that calculates the integral of the line between two
     * x-coordinates, given the slope and intercept of the line.
     *
     * @param x0
     * @param x1
     * @param slope
     * @param intercept
     * @returns {number} integral value.
     */
    self.integral = function integral(x0, x1, slope, intercept) {
        return (0.5 * slope * x1 * x1 + intercept * x1) - (0.5 * slope * x0 * x0 + intercept * x0);
    }

    MLArrayUtilsGetEquallySpaced.getEquallySpacedData = getEquallySpacedData;
    MLArrayUtilsGetEquallySpaced.integral = integral;
}


// ml-array-utils snv.js
const MLArrayUtilsSNV = {}; //6
{
    

    /**
     * Function that applies the standard normal variate (SNV) to an array of values.
     *
     * @param data - Array of values.
     * @returns {Array} - applied the SNV.
     */
    self.SNV =function SNV(data) {
        var mean = Stat.mean(data);
        var std = Stat.standardDeviation(data);
        var result = data.slice();
        for (var i = 0; i < data.length; i++) {
            result[i] = (result[i] - mean) / std;
        }
        return result;
    }
    MLArrayUtilsSNV.SNV = SNV;
    let Stat = MLStat.array;
}

// ml-array-utils index.js
export const MLArrayUtils = {}; // don need
{
    MLArrayUtils.getEquallySpacedData = MLArrayUtilsGetEquallySpaced.getEquallySpacedData;
    MLArrayUtils.SNV = MLArrayUtilsSNV.SNV;
}
