import {MLMatrixMatrix} from './matrix.js'
export let MLMatrix = {};
{
    MLMatrix = MLMatrixMatrix.Matrix;
    MLMatrix.Decompositions = MLMatrix.DC = MLMatrixDecompositions;
}