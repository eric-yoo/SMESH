let MLMatrixSelectionView;
{
    let BaseView = MLMatrixBaseView;
    let util = MLMatrixUtil;

    class MatrixSelectionView extends BaseView {
        constructor(matrix, rowIndices, columnIndices) {
            var indices = util.checkIndices(matrix, rowIndices, columnIndices);
            super(matrix, indices.row.length, indices.column.length);
            this.rowIndices = indices.row;
            this.columnIndices = indices.column;
        }

        set(rowIndex, columnIndex, value) {
            this.matrix.set(this.rowIndices[rowIndex], this.columnIndices[columnIndex], value);
            return this;
        }

        get(rowIndex, columnIndex) {
            return this.matrix.get(this.rowIndices[rowIndex], this.columnIndices[columnIndex]);
        }
    }

    MLMatrixSelectionView = MatrixSelectionView;
}