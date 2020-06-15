let MLMatrixTransposeView;
{
    let BaseView = MLMatrixBaseView;

    class MatrixTransposeView extends BaseView {
        constructor(matrix) {
            super(matrix, matrix.columns, matrix.rows);
        }

        set(rowIndex, columnIndex, value) {
            this.matrix.set(columnIndex, rowIndex, value);
            return this;
        }

        get(rowIndex, columnIndex) {
            return this.matrix.get(columnIndex, rowIndex);
        }
    }

    MLMatrixTransposeView = MatrixTransposeView;
}