// ml-stat array.js
const MLStatArray = {}; // 2
{
    self.compareNumbers = function compareNumbers(a, b) {
        return a - b;
    }

    /**
     * Computes the sum of the given values
     * @param {Array} values
     * @returns {number}
     */
    MLStatArray.sum = function sum(values) {
        var sum = 0;
        for (var i = 0; i < values.length; i++) {
            sum += values[i];
        }
        return sum;
    };

    /**
     * Computes the maximum of the given values
     * @param {Array} values
     * @returns {number}
     */
    MLStatArray.max = function max(values) {
        var max = values[0];
        var l = values.length;
        for (var i = 1; i < l; i++) {
            if (values[i] > max) max = values[i];
        }
        return max;
    };

    /**
     * Computes the minimum of the given values
     * @param {Array} values
     * @returns {number}
     */
    MLStatArray.min = function min(values) {
        var min = values[0];
        var l = values.length;
        for (var i = 1; i < l; i++) {
            if (values[i] < min) min = values[i];
        }
        return min;
    };

    /**
     * Computes the min and max of the given values
     * @param {Array} values
     * @returns {{min: number, max: number}}
     */
    MLStatArray.minMax = function minMax(values) {
        var min = values[0];
        var max = values[0];
        var l = values.length;
        for (var i = 1; i < l; i++) {
            if (values[i] < min) min = values[i];
            if (values[i] > max) max = values[i];
        }
        return {
            min: min,
            max: max
        };
    };

    /**
     * Computes the arithmetic mean of the given values
     * @param {Array} values
     * @returns {number}
     */
    MLStatArray.arithmeticMean = function arithmeticMean(values) {
        var sum = 0;
        var l = values.length;
        for (var i = 0; i < l; i++) {
            sum += values[i];
        }
        return sum / l;
    };

    /**
     * {@link arithmeticMean}
     */
    MLStatArray.mean = MLStatArray.arithmeticMean;

    /**
     * Computes the geometric mean of the given values
     * @param {Array} values
     * @returns {number}
     */
    MLStatArray.geometricMean = function geometricMean(values) {
        var mul = 1;
        var l = values.length;
        for (var i = 0; i < l; i++) {
            mul *= values[i];
        }
        return Math.pow(mul, 1 / l);
    };

    /**
     * Computes the mean of the log of the given values
     * If the return value is exponentiated, it gives the same result as the
     * geometric mean.
     * @param {Array} values
     * @returns {number}
     */
    MLStatArray.logMean = function logMean(values) {
        var lnsum = 0;
        var l = values.length;
        for (var i = 0; i < l; i++) {
            lnsum += Math.log(values[i]);
        }
        return lnsum / l;
    };

    /**
     * Computes the weighted grand mean for a list of means and sample sizes
     * @param {Array} means - Mean values for each set of samples
     * @param {Array} samples - Number of original values for each set of samples
     * @returns {number}
     */
    MLStatArray.grandMean = function grandMean(means, samples) {
        var sum = 0;
        var n = 0;
        var l = means.length;
        for (var i = 0; i < l; i++) {
            sum += samples[i] * means[i];
            n += samples[i];
        }
        return sum / n;
    };

    /**
     * Computes the truncated mean of the given values using a given percentage
     * @param {Array} values
     * @param {number} percent - The percentage of values to keep (range: [0,1])
     * @param {boolean} [alreadySorted=false]
     * @returns {number}
     */
    MLStatArray.truncatedMean = function truncatedMean(values, percent, alreadySorted) {
        if (alreadySorted === undefined) alreadySorted = false;
        if (!alreadySorted) {
            values = [].concat(values).sort(compareNumbers);
        }
        var l = values.length;
        var k = Math.floor(l * percent);
        var sum = 0;
        for (var i = k; i < (l - k); i++) {
            sum += values[i];
        }
        return sum / (l - 2 * k);
    };

    /**
     * Computes the harmonic mean of the given values
     * @param {Array} values
     * @returns {number}
     */
    MLStatArray.harmonicMean = function harmonicMean(values) {
        var sum = 0;
        var l = values.length;
        for (var i = 0; i < l; i++) {
            if (values[i] === 0) {
                throw new RangeError('value at index ' + i + 'is zero');
            }
            sum += 1 / values[i];
        }
        return l / sum;
    };

    /**
     * Computes the contraharmonic mean of the given values
     * @param {Array} values
     * @returns {number}
     */
    MLStatArray.contraHarmonicMean = function contraHarmonicMean(values) {
        var r1 = 0;
        var r2 = 0;
        var l = values.length;
        for (var i = 0; i < l; i++) {
            r1 += values[i] * values[i];
            r2 += values[i];
        }
        if (r2 < 0) {
            throw new RangeError('sum of values is negative');
        }
        return r1 / r2;
    };

    /**
     * Computes the median of the given values
     * @param {Array} values
     * @param {boolean} [alreadySorted=false]
     * @returns {number}
     */
    MLStatArray.median = function median(values, alreadySorted) {
        if (alreadySorted === undefined) alreadySorted = false;
        if (!alreadySorted) {
            values = [].concat(values).sort(compareNumbers);
        }
        var l = values.length;
        var half = Math.floor(l / 2);
        if (l % 2 === 0) {
            return (values[half - 1] + values[half]) * 0.5;
        } else {
            return values[half];
        }
    };

    /**
     * Computes the variance of the given values
     * @param {Array} values
     * @param {boolean} [unbiased=true] - if true, divide by (n-1); if false, divide by n.
     * @returns {number}
     */
    MLStatArray.variance = function variance(values, unbiased) {
        if (unbiased === undefined) unbiased = true;
        var theMean = MLStatArray.mean(values);
        var theVariance = 0;
        var l = values.length;

        for (var i = 0; i < l; i++) {
            var x = values[i] - theMean;
            theVariance += x * x;
        }

        if (unbiased) {
            return theVariance / (l - 1);
        } else {
            return theVariance / l;
        }
    };

    /**
     * Computes the standard deviation of the given values
     * @param {Array} values
     * @param {boolean} [unbiased=true] - if true, divide by (n-1); if false, divide by n.
     * @returns {number}
     */
    MLStatArray.standardDeviation = function standardDeviation(values, unbiased) {
        return Math.sqrt(MLStatArray.variance(values, unbiased));
    };

    MLStatArray.standardError = function standardError(values) {
        return MLStatArray.standardDeviation(values) / Math.sqrt(values.length);
    };

    /**
     * IEEE Transactions on biomedical engineering, vol. 52, no. 1, january 2005, p. 76-
     * Calculate the standard deviation via the Median of the absolute deviation
     *  The formula for the standard deviation only holds for Gaussian random variables.
     * @returns {{mean: number, stdev: number}}
     */
    MLStatArray.robustMeanAndStdev = function robustMeanAndStdev(y) {
        var mean = 0, stdev = 0;
        var length = y.length, i = 0;
        for (i = 0; i < length; i++) {
            mean += y[i];
        }
        mean /= length;
        var averageDeviations = new Array(length);
        for (i = 0; i < length; i++)
            averageDeviations[i] = Math.abs(y[i] - mean);
        averageDeviations.sort(compareNumbers);
        if (length % 2 === 1) {
            stdev = averageDeviations[(length - 1) / 2] / 0.6745;
        } else {
            stdev = 0.5 * (averageDeviations[length / 2] + averageDeviations[length / 2 - 1]) / 0.6745;
        }

        return {
            mean: mean,
            stdev: stdev
        };
    };

    MLStatArray.quartiles = function quartiles(values, alreadySorted) {
        if (typeof (alreadySorted) === 'undefined') alreadySorted = false;
        if (!alreadySorted) {
            values = [].concat(values).sort(compareNumbers);
        }

        var quart = values.length / 4;
        var q1 = values[Math.ceil(quart) - 1];
        var q2 = MLStatArray.median(values, true);
        var q3 = values[Math.ceil(quart * 3) - 1];

        return {q1: q1, q2: q2, q3: q3};
    };

    MLStatArray.pooledStandardDeviation = function pooledStandardDeviation(samples, unbiased) {
        return Math.sqrt(MLStatArray.pooledVariance(samples, unbiased));
    };

    MLStatArray.pooledVariance = function pooledVariance(samples, unbiased) {
        if (typeof (unbiased) === 'undefined') unbiased = true;
        var sum = 0;
        var length = 0, l = samples.length;
        for (var i = 0; i < l; i++) {
            var values = samples[i];
            var vari = MLStatArray.variance(values);

            sum += (values.length - 1) * vari;

            if (unbiased)
                length += values.length - 1;
            else
                length += values.length;
        }
        return sum / length;
    };

    MLStatArray.mode = function mode(values) {
        var l = values.length,
            itemCount = new Array(l),
            i;
        for (i = 0; i < l; i++) {
            itemCount[i] = 0;
        }
        var itemArray = new Array(l);
        var count = 0;

        for (i = 0; i < l; i++) {
            var index = itemArray.indexOf(values[i]);
            if (index >= 0)
                itemCount[index]++;
            else {
                itemArray[count] = values[i];
                itemCount[count] = 1;
                count++;
            }
        }

        var maxValue = 0, maxIndex = 0;
        for (i = 0; i < count; i++) {
            if (itemCount[i] > maxValue) {
                maxValue = itemCount[i];
                maxIndex = i;
            }
        }

        return itemArray[maxIndex];
    };

    MLStatArray.covariance = function covariance(vector1, vector2, unbiased) {
        if (typeof (unbiased) === 'undefined') unbiased = true;
        var mean1 = MLStatArray.mean(vector1);
        var mean2 = MLStatArray.mean(vector2);

        if (vector1.length !== vector2.length)
            throw 'Vectors do not have the same dimensions';

        var cov = 0, l = vector1.length;
        for (var i = 0; i < l; i++) {
            var x = vector1[i] - mean1;
            var y = vector2[i] - mean2;
            cov += x * y;
        }

        if (unbiased)
            return cov / (l - 1);
        else
            return cov / l;
    };

    MLStatArray.skewness = function skewness(values, unbiased) {
        if (typeof (unbiased) === 'undefined') unbiased = true;
        var theMean = MLStatArray.mean(values);

        var s2 = 0, s3 = 0, l = values.length;
        for (var i = 0; i < l; i++) {
            var dev = values[i] - theMean;
            s2 += dev * dev;
            s3 += dev * dev * dev;
        }
        var m2 = s2 / l;
        var m3 = s3 / l;

        var g = m3 / (Math.pow(m2, 3 / 2.0));
        if (unbiased) {
            var a = Math.sqrt(l * (l - 1));
            var b = l - 2;
            return (a / b) * g;
        } else {
            return g;
        }
    };

    MLStatArray.kurtosis = function kurtosis(values, unbiased) {
        if (typeof (unbiased) === 'undefined') unbiased = true;
        var theMean = MLStatArray.mean(values);
        var n = values.length, s2 = 0, s4 = 0;

        for (var i = 0; i < n; i++) {
            var dev = values[i] - theMean;
            s2 += dev * dev;
            s4 += dev * dev * dev * dev;
        }
        var m2 = s2 / n;
        var m4 = s4 / n;

        if (unbiased) {
            var v = s2 / (n - 1);
            var a = (n * (n + 1)) / ((n - 1) * (n - 2) * (n - 3));
            var b = s4 / (v * v);
            var c = ((n - 1) * (n - 1)) / ((n - 2) * (n - 3));

            return a * b - 3 * c;
        } else {
            return m4 / (m2 * m2) - 3;
        }
    };

    MLStatArray.entropy = function entropy(values, eps) {
        if (typeof (eps) === 'undefined') eps = 0;
        var sum = 0, l = values.length;
        for (var i = 0; i < l; i++)
            sum += values[i] * Math.log(values[i] + eps);
        return -sum;
    };

    MLStatArray.weightedMean = function weightedMean(values, weights) {
        var sum = 0, l = values.length;
        for (var i = 0; i < l; i++)
            sum += values[i] * weights[i];
        return sum;
    };

    MLStatArray.weightedStandardDeviation = function weightedStandardDeviation(values, weights) {
        return Math.sqrt(MLStatArray.weightedVariance(values, weights));
    };

    MLStatArray.weightedVariance = function weightedVariance(values, weights) {
        var theMean = MLStatArray.weightedMean(values, weights);
        var vari = 0, l = values.length;
        var a = 0, b = 0;

        for (var i = 0; i < l; i++) {
            var z = values[i] - theMean;
            var w = weights[i];

            vari += w * (z * z);
            b += w;
            a += w * w;
        }

        return vari * (b / (b * b - a));
    };

    MLStatArray.center = function center(values, inPlace) {
        if (typeof (inPlace) === 'undefined') inPlace = false;

        var result = values;
        if (!inPlace)
            result = [].concat(values);

        var theMean = MLStatArray.mean(result), l = result.length;
        for (var i = 0; i < l; i++)
            result[i] -= theMean;
    };

    MLStatArray.standardize = function standardize(values, standardDev, inPlace) {
        if (typeof (standardDev) === 'undefined') standardDev = MLStatArray.standardDeviation(values);
        if (typeof (inPlace) === 'undefined') inPlace = false;
        var l = values.length;
        var result = inPlace ? values : new Array(l);
        for (var i = 0; i < l; i++)
            result[i] = values[i] / standardDev;
        return result;
    };

    MLStatArray.cumulativeSum = function cumulativeSum(array) {
        var l = array.length;
        var result = new Array(l);
        result[0] = array[0];
        for (var i = 1; i < l; i++)
            result[i] = result[i - 1] + array[i];
        return result;
    };
}


// ml-stat matrix.js
const MLStatMatrix = {}; //3
{
    let arrayStat = MLStatArray;

    self.compareNumbers = function compareNumbers(a, b) {
        return a - b;
    }

    MLStatMatrix.max = function max(matrix) {
        var max = -Infinity;
        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] > max) max = matrix[i][j];
            }
        }
        return max;
    };

    MLStatMatrix.min = function min(matrix) {
        var min = Infinity;
        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] < min) min = matrix[i][j];
            }
        }
        return min;
    };

    MLStatMatrix.minMax = function minMax(matrix) {
        var min = Infinity;
        var max = -Infinity;
        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] < min) min = matrix[i][j];
                if (matrix[i][j] > max) max = matrix[i][j];
            }
        }
        return {
            min:min,
            max:max
        };
    };

    MLStatMatrix.entropy = function entropy(matrix, eps) {
        if (typeof (eps) === 'undefined') {
            eps = 0;
        }
        var sum = 0,
            l1 = matrix.length,
            l2 = matrix[0].length;
        for (var i = 0; i < l1; i++) {
            for (var j = 0; j < l2; j++) {
                sum += matrix[i][j] * Math.log(matrix[i][j] + eps);
            }
        }
        return -sum;
    };

    MLStatMatrix.mean = function mean(matrix, dimension) {
        if (typeof (dimension) === 'undefined') {
            dimension = 0;
        }
        var rows = matrix.length,
            cols = matrix[0].length,
            theMean, N, i, j;

        if (dimension === -1) {
            theMean = [0];
            N = rows * cols;
            for (i = 0; i < rows; i++) {
                for (j = 0; j < cols; j++) {
                    theMean[0] += matrix[i][j];
                }
            }
            theMean[0] /= N;
        } else if (dimension === 0) {
            theMean = new Array(cols);
            N = rows;
            for (j = 0; j < cols; j++) {
                theMean[j] = 0;
                for (i = 0; i < rows; i++) {
                    theMean[j] += matrix[i][j];
                }
                theMean[j] /= N;
            }
        } else if (dimension === 1) {
            theMean = new Array(rows);
            N = cols;
            for (j = 0; j < rows; j++) {
                theMean[j] = 0;
                for (i = 0; i < cols; i++) {
                    theMean[j] += matrix[j][i];
                }
                theMean[j] /= N;
            }
        } else {
            throw new Error('Invalid dimension');
        }
        return theMean;
    };

    MLStatMatrix.sum = function sum(matrix, dimension) {
        if (typeof (dimension) === 'undefined') {
            dimension = 0;
        }
        var rows = matrix.length,
            cols = matrix[0].length,
            theSum, i, j;

        if (dimension === -1) {
            theSum = [0];
            for (i = 0; i < rows; i++) {
                for (j = 0; j < cols; j++) {
                    theSum[0] += matrix[i][j];
                }
            }
        } else if (dimension === 0) {
            theSum = new Array(cols);
            for (j = 0; j < cols; j++) {
                theSum[j] = 0;
                for (i = 0; i < rows; i++) {
                    theSum[j] += matrix[i][j];
                }
            }
        } else if (dimension === 1) {
            theSum = new Array(rows);
            for (j = 0; j < rows; j++) {
                theSum[j] = 0;
                for (i = 0; i < cols; i++) {
                    theSum[j] += matrix[j][i];
                }
            }
        } else {
            throw new Error('Invalid dimension');
        }
        return theSum;
    };

    MLStatMatrix.product = function product(matrix, dimension) {
        if (typeof (dimension) === 'undefined') {
            dimension = 0;
        }
        var rows = matrix.length,
            cols = matrix[0].length,
            theProduct, i, j;

        if (dimension === -1) {
            theProduct = [1];
            for (i = 0; i < rows; i++) {
                for (j = 0; j < cols; j++) {
                    theProduct[0] *= matrix[i][j];
                }
            }
        } else if (dimension === 0) {
            theProduct = new Array(cols);
            for (j = 0; j < cols; j++) {
                theProduct[j] = 1;
                for (i = 0; i < rows; i++) {
                    theProduct[j] *= matrix[i][j];
                }
            }
        } else if (dimension === 1) {
            theProduct = new Array(rows);
            for (j = 0; j < rows; j++) {
                theProduct[j] = 1;
                for (i = 0; i < cols; i++) {
                    theProduct[j] *= matrix[j][i];
                }
            }
        } else {
            throw new Error('Invalid dimension');
        }
        return theProduct;
    };

    MLStatMatrix.standardDeviation = function standardDeviation(matrix, means, unbiased) {
        var vari = MLStatMatrix.variance(matrix, means, unbiased), l = vari.length;
        for (var i = 0; i < l; i++) {
            vari[i] = Math.sqrt(vari[i]);
        }
        return vari;
    };

    MLStatMatrix.variance = function variance(matrix, means, unbiased) {
        if (typeof (unbiased) === 'undefined') {
            unbiased = true;
        }
        means = means || MLStatMatrix.mean(matrix);
        var rows = matrix.length;
        if (rows === 0) return [];
        var cols = matrix[0].length;
        var vari = new Array(cols);

        for (var j = 0; j < cols; j++) {
            var sum1 = 0, sum2 = 0, x = 0;
            for (var i = 0; i < rows; i++) {
                x = matrix[i][j] - means[j];
                sum1 += x;
                sum2 += x * x;
            }
            if (unbiased) {
                vari[j] = (sum2 - ((sum1 * sum1) / rows)) / (rows - 1);
            } else {
                vari[j] = (sum2 - ((sum1 * sum1) / rows)) / rows;
            }
        }
        return vari;
    };

    MLStatMatrix.median = function median(matrix) {
        var rows = matrix.length, cols = matrix[0].length;
        var medians = new Array(cols);

        for (var i = 0; i < cols; i++) {
            var data = new Array(rows);
            for (var j = 0; j < rows; j++) {
                data[j] = matrix[j][i];
            }
            data.sort(compareNumbers);
            var N = data.length;
            if (N % 2 === 0) {
                medians[i] = (data[N / 2] + data[(N / 2) - 1]) * 0.5;
            } else {
                medians[i] = data[Math.floor(N / 2)];
            }
        }
        return medians;
    };

    MLStatMatrix.mode = function mode(matrix) {
        var rows = matrix.length,
            cols = matrix[0].length,
            modes = new Array(cols),
            i, j;
        for (i = 0; i < cols; i++) {
            var itemCount = new Array(rows);
            for (var k = 0; k < rows; k++) {
                itemCount[k] = 0;
            }
            var itemArray = new Array(rows);
            var count = 0;

            for (j = 0; j < rows; j++) {
                var index = itemArray.indexOf(matrix[j][i]);
                if (index >= 0) {
                    itemCount[index]++;
                } else {
                    itemArray[count] = matrix[j][i];
                    itemCount[count] = 1;
                    count++;
                }
            }

            var maxValue = 0, maxIndex = 0;
            for (j = 0; j < count; j++) {
                if (itemCount[j] > maxValue) {
                    maxValue = itemCount[j];
                    maxIndex = j;
                }
            }

            modes[i] = itemArray[maxIndex];
        }
        return modes;
    };

    MLStatMatrix.skewness = function skewness(matrix, unbiased) {
        if (typeof (unbiased) === 'undefined') unbiased = true;
        var means = MLStatMatrix.mean(matrix);
        var n = matrix.length, l = means.length;
        var skew = new Array(l);

        for (var j = 0; j < l; j++) {
            var s2 = 0, s3 = 0;
            for (var i = 0; i < n; i++) {
                var dev = matrix[i][j] - means[j];
                s2 += dev * dev;
                s3 += dev * dev * dev;
            }

            var m2 = s2 / n;
            var m3 = s3 / n;
            var g = m3 / Math.pow(m2, 3 / 2);

            if (unbiased) {
                var a = Math.sqrt(n * (n - 1));
                var b = n - 2;
                skew[j] = (a / b) * g;
            } else {
                skew[j] = g;
            }
        }
        return skew;
    };

    MLStatMatrix.kurtosis = function kurtosis(matrix, unbiased) {
        if (typeof (unbiased) === 'undefined') unbiased = true;
        var means = MLStatMatrix.mean(matrix);
        var n = matrix.length, m = matrix[0].length;
        var kurt = new Array(m);

        for (var j = 0; j < m; j++) {
            var s2 = 0, s4 = 0;
            for (var i = 0; i < n; i++) {
                var dev = matrix[i][j] - means[j];
                s2 += dev * dev;
                s4 += dev * dev * dev * dev;
            }
            var m2 = s2 / n;
            var m4 = s4 / n;

            if (unbiased) {
                var v = s2 / (n - 1);
                var a = (n * (n + 1)) / ((n - 1) * (n - 2) * (n - 3));
                var b = s4 / (v * v);
                var c = ((n - 1) * (n - 1)) / ((n - 2) * (n - 3));
                kurt[j] = a * b - 3 * c;
            } else {
                kurt[j] = m4 / (m2 * m2) - 3;
            }
        }
        return kurt;
    };

    MLStatMatrix.standardError = function standardError(matrix) {
        var samples = matrix.length;
        var standardDeviations = MLStatMatrix.standardDeviation(matrix);
        var l = standardDeviations.length;
        var standardErrors = new Array(l);
        var sqrtN = Math.sqrt(samples);

        for (var i = 0; i < l; i++) {
            standardErrors[i] = standardDeviations[i] / sqrtN;
        }
        return standardErrors;
    };

    MLStatMatrix.covariance = function covariance(matrix, dimension) {
        return MLStatMatrix.scatter(matrix, undefined, dimension);
    };

    MLStatMatrix.scatter = function scatter(matrix, divisor, dimension) {
        if (typeof (dimension) === 'undefined') {
            dimension = 0;
        }
        if (typeof (divisor) === 'undefined') {
            if (dimension === 0) {
                divisor = matrix.length - 1;
            } else if (dimension === 1) {
                divisor = matrix[0].length - 1;
            }
        }
        var means = MLStatMatrix.mean(matrix, dimension);
        var rows = matrix.length;
        if (rows === 0) {
            return [[]];
        }
        var cols = matrix[0].length,
            cov, i, j, s, k;

        if (dimension === 0) {
            cov = new Array(cols);
            for (i = 0; i < cols; i++) {
                cov[i] = new Array(cols);
            }
            for (i = 0; i < cols; i++) {
                for (j = i; j < cols; j++) {
                    s = 0;
                    for (k = 0; k < rows; k++) {
                        s += (matrix[k][j] - means[j]) * (matrix[k][i] - means[i]);
                    }
                    s /= divisor;
                    cov[i][j] = s;
                    cov[j][i] = s;
                }
            }
        } else if (dimension === 1) {
            cov = new Array(rows);
            for (i = 0; i < rows; i++) {
                cov[i] = new Array(rows);
            }
            for (i = 0; i < rows; i++) {
                for (j = i; j < rows; j++) {
                    s = 0;
                    for (k = 0; k < cols; k++) {
                        s += (matrix[j][k] - means[j]) * (matrix[i][k] - means[i]);
                    }
                    s /= divisor;
                    cov[i][j] = s;
                    cov[j][i] = s;
                }
            }
        } else {
            throw new Error('Invalid dimension');
        }

        return cov;
    };

    MLStatMatrix.correlation = function correlation(matrix) {
        var means = MLStatMatrix.mean(matrix),
            standardDeviations = MLStatMatrix.standardDeviation(matrix, true, means),
            scores = MLStatMatrix.zScores(matrix, means, standardDeviations),
            rows = matrix.length,
            cols = matrix[0].length,
            i, j;

        var cor = new Array(cols);
        for (i = 0; i < cols; i++) {
            cor[i] = new Array(cols);
        }
        for (i = 0; i < cols; i++) {
            for (j = i; j < cols; j++) {
                var c = 0;
                for (var k = 0, l = scores.length; k < l; k++) {
                    c += scores[k][j] * scores[k][i];
                }
                c /= rows - 1;
                cor[i][j] = c;
                cor[j][i] = c;
            }
        }
        return cor;
    };

    MLStatMatrix.zScores = function zScores(matrix, means, standardDeviations) {
        means = means || MLStatMatrix.mean(matrix);
        if (typeof (standardDeviations) === 'undefined') standardDeviations = MLStatMatrix.standardDeviation(matrix, true, means);
        return MLStatMatrix.standardize(MLStatMatrix.center(matrix, means, false), standardDeviations, true);
    };

    MLStatMatrix.center = function center(matrix, means, inPlace) {
        means = means || MLStatMatrix.mean(matrix);
        var result = matrix,
            l = matrix.length,
            i, j, jj;

        if (!inPlace) {
            result = new Array(l);
            for (i = 0; i < l; i++) {
                result[i] = new Array(matrix[i].length);
            }
        }

        for (i = 0; i < l; i++) {
            var row = result[i];
            for (j = 0, jj = row.length; j < jj; j++) {
                row[j] = matrix[i][j] - means[j];
            }
        }
        return result;
    };

    MLStatMatrix.standardize = function standardize(matrix, standardDeviations, inPlace) {
        if (typeof (standardDeviations) === 'undefined') standardDeviations = MLStatMatrix.standardDeviation(matrix);
        var result = matrix,
            l = matrix.length,
            i, j, jj;

        if (!inPlace) {
            result = new Array(l);
            for (i = 0; i < l; i++) {
                result[i] = new Array(matrix[i].length);
            }
        }

        for (i = 0; i < l; i++) {
            var resultRow = result[i];
            var sourceRow = matrix[i];
            for (j = 0, jj = resultRow.length; j < jj; j++) {
                if (standardDeviations[j] !== 0 && !isNaN(standardDeviations[j])) {
                    resultRow[j] = sourceRow[j] / standardDeviations[j];
                }
            }
        }
        return result;
    };

    MLStatMatrix.weightedVariance = function weightedVariance(matrix, weights) {
        var means = MLStatMatrix.mean(matrix);
        var rows = matrix.length;
        if (rows === 0) return [];
        var cols = matrix[0].length;
        var vari = new Array(cols);

        for (var j = 0; j < cols; j++) {
            var sum = 0;
            var a = 0, b = 0;

            for (var i = 0; i < rows; i++) {
                var z = matrix[i][j] - means[j];
                var w = weights[i];

                sum += w * (z * z);
                b += w;
                a += w * w;
            }

            vari[j] = sum * (b / (b * b - a));
        }

        return vari;
    };

    MLStatMatrix.weightedMean = function weightedMean(matrix, weights, dimension) {
        if (typeof (dimension) === 'undefined') {
            dimension = 0;
        }
        var rows = matrix.length;
        if (rows === 0) return [];
        var cols = matrix[0].length,
            means, i, ii, j, w, row;

        if (dimension === 0) {
            means = new Array(cols);
            for (i = 0; i < cols; i++) {
                means[i] = 0;
            }
            for (i = 0; i < rows; i++) {
                row = matrix[i];
                w = weights[i];
                for (j = 0; j < cols; j++) {
                    means[j] += row[j] * w;
                }
            }
        } else if (dimension === 1) {
            means = new Array(rows);
            for (i = 0; i < rows; i++) {
                means[i] = 0;
            }
            for (j = 0; j < rows; j++) {
                row = matrix[j];
                w = weights[j];
                for (i = 0; i < cols; i++) {
                    means[j] += row[i] * w;
                }
            }
        } else {
            throw new Error('Invalid dimension');
        }

        var weightSum = arrayStat.sum(weights);
        if (weightSum !== 0) {
            for (i = 0, ii = means.length; i < ii; i++) {
                means[i] /= weightSum;
            }
        }
        return means;
    };

    MLStatMatrix.weightedCovariance = function weightedCovariance(matrix, weights, means, dimension) {
        dimension = dimension || 0;
        means = means || MLStatMatrix.weightedMean(matrix, weights, dimension);
        var s1 = 0, s2 = 0;
        for (var i = 0, ii = weights.length; i < ii; i++) {
            s1 += weights[i];
            s2 += weights[i] * weights[i];
        }
        var factor = s1 / (s1 * s1 - s2);
        return MLStatMatrix.weightedScatter(matrix, weights, means, factor, dimension);
    };

    MLStatMatrix.weightedScatter = function weightedScatter(matrix, weights, means, factor, dimension) {
        dimension = dimension || 0;
        means = means || MLStatMatrix.weightedMean(matrix, weights, dimension);
        if (typeof (factor) === 'undefined') {
            factor = 1;
        }
        var rows = matrix.length;
        if (rows === 0) {
            return [[]];
        }
        var cols = matrix[0].length,
            cov, i, j, k, s;

        if (dimension === 0) {
            cov = new Array(cols);
            for (i = 0; i < cols; i++) {
                cov[i] = new Array(cols);
            }
            for (i = 0; i < cols; i++) {
                for (j = i; j < cols; j++) {
                    s = 0;
                    for (k = 0; k < rows; k++) {
                        s += weights[k] * (matrix[k][j] - means[j]) * (matrix[k][i] - means[i]);
                    }
                    cov[i][j] = s * factor;
                    cov[j][i] = s * factor;
                }
            }
        } else if (dimension === 1) {
            cov = new Array(rows);
            for (i = 0; i < rows; i++) {
                cov[i] = new Array(rows);
            }
            for (i = 0; i < rows; i++) {
                for (j = i; j < rows; j++) {
                    s = 0;
                    for (k = 0; k < cols; k++) {
                        s += weights[k] * (matrix[j][k] - means[j]) * (matrix[i][k] - means[i]);
                    }
                    cov[i][j] = s * factor;
                    cov[j][i] = s * factor;
                }
            }
        } else {
            throw new Error('Invalid dimension');
        }

        return cov;
    };
}

// ml-stat index.js
export const MLStat = {}; //don't need
{
    MLStat.array = MLStatArray;
    MLStat.matrix = MLStatMatrix;
}
