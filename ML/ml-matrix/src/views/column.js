let MLMatrixColumnView;
{
    let BaseView = MLMatrixBaseView;

    class MatrixColumnView extends BaseView {
        constructor(matrix, column) {
            super(matrix, matrix.rows, 1);
            this.column = column;
        }

        set(rowIndex, columnIndex, value) {
            this.matrix.set(rowIndex, this.column, value);
            return this;
        }

        get(rowIndex) {
            return this.matrix.get(rowIndex, this.column);
        }
    }

    MLMatrixColumnView = MatrixColumnView;
}
