let MLMatrixBaseView;
{
    let abstractMatrix = MLMatrixAbstractMatrix;
    let Matrix = MLMatrixMatrix;

    class BaseView extends abstractMatrix() {
        constructor(matrix, rows, columns) {
            super();
            this.matrix = matrix;
            this.rows = rows;
            this.columns = columns;
        }

        static get [Symbol.species]() {
            return Matrix.Matrix;
        }
    }

    MLMatrixBaseView = BaseView;
}