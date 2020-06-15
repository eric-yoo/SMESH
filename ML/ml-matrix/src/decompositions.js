let MLMatrixDecompositions = {};
{
    let Matrix = MLMatrixMatrix.Matrix;

    let SingularValueDecomposition = MLMatrixDCSVD;
    let EigenvalueDecomposition = MLMatrixDCEVD;
    let LuDecomposition = MLMatrixDCLU;
    let QrDecomposition = MLMatrixDCQR
    let CholeskyDecomposition = MLMatrixDCCholesky;

    self.inverse = function inverse(matrix) {
        matrix = Matrix.checkMatrix(matrix);
        return solve(matrix, Matrix.eye(matrix.rows));
    }

    /**
     * Returns the inverse
     * @memberOf Matrix
     * @static
     * @param {Matrix} matrix
     * @return {Matrix} matrix
     * @alias inv
     */
    Matrix.inverse = Matrix.inv = inverse;

    /**
     * Returns the inverse
     * @memberOf Matrix
     * @static
     * @param {Matrix} matrix
     * @return {Matrix} matrix
     * @alias inv
     */
    Matrix.prototype.inverse = Matrix.prototype.inv = function () {
        return inverse(this);
    };

    self.solve = function solve(leftHandSide, rightHandSide) {
        leftHandSide = Matrix.checkMatrix(leftHandSide);
        rightHandSide = Matrix.checkMatrix(rightHandSide);
        return leftHandSide.isSquare() ? new LuDecomposition(leftHandSide).solve(rightHandSide) : new QrDecomposition(leftHandSide).solve(rightHandSide);
    }

    Matrix.solve = solve;
    Matrix.prototype.solve = function (other) {
        return solve(this, other);
    };

    MLMatrixDecompositions = {
        SingularValueDecomposition: SingularValueDecomposition,
        SVD: SingularValueDecomposition,
        EigenvalueDecomposition: EigenvalueDecomposition,
        EVD: EigenvalueDecomposition,
        LuDecomposition: LuDecomposition,
        LU: LuDecomposition,
        QrDecomposition: QrDecomposition,
        QR: QrDecomposition,
        CholeskyDecomposition: CholeskyDecomposition,
        CHO: CholeskyDecomposition,
        inverse: inverse,
        solve: solve
    };
}
