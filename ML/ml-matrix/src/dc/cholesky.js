export let MLMatrixDCCholesky = {};
{
    let Matrix = MLMatrixMatrix.Matrix;

    // https://github.com/lutzroeder/Mapack/blob/master/Source/CholeskyDecomposition.cs
    self.CholeskyDecomposition= function CholeskyDecomposition(value) {
        if (!(this instanceof CholeskyDecomposition)) {
            return new CholeskyDecomposition(value);
        }
        value = Matrix.checkMatrix(value);
        if (!value.isSymmetric()) {
            throw new Error('Matrix is not symmetric');
        }

        var a = value,
            dimension = a.rows,
            l = new Matrix(dimension, dimension),
            positiveDefinite = true,
            i, j, k;

        for (j = 0; j < dimension; j++) {
            var Lrowj = l[j];
            var d = 0;
            for (k = 0; k < j; k++) {
                var Lrowk = l[k];
                var s = 0;
                for (i = 0; i < k; i++) {
                    s += Lrowk[i] * Lrowj[i];
                }
                Lrowj[k] = s = (a[j][k] - s) / l[k][k];
                d = d + s * s;
            }

            d = a[j][j] - d;

            positiveDefinite &= (d > 0);
            l[j][j] = Math.sqrt(Math.max(d, 0));
            for (k = j + 1; k < dimension; k++) {
                l[j][k] = 0;
            }
        }

        if (!positiveDefinite) {
            throw new Error('Matrix is not positive definite');
        }

        this.L = l;
    }

    CholeskyDecomposition.prototype = {
        get lowerTriangularMatrix() {
            return this.L;
        },
        solve: function (value) {
            value = Matrix.checkMatrix(value);

            var l = this.L,
                dimension = l.rows;

            if (value.rows !== dimension) {
                throw new Error('Matrix dimensions do not match');
            }

            var count = value.columns,
                B = value.clone(),
                i, j, k;

            for (k = 0; k < dimension; k++) {
                for (j = 0; j < count; j++) {
                    for (i = 0; i < k; i++) {
                        B[k][j] -= B[i][j] * l[k][i];
                    }
                    B[k][j] /= l[k][k];
                }
            }

            for (k = dimension - 1; k >= 0; k--) {
                for (j = 0; j < count; j++) {
                    for (i = k + 1; i < dimension; i++) {
                        B[k][j] -= B[i][j] * l[i][k];
                    }
                    B[k][j] /= l[k][k];
                }
            }

            return B;
        }
    };

    MLMatrixDCCholesky = CholeskyDecomposition;
}