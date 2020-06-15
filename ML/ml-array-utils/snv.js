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