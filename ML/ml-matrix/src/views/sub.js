let MLMatrixSubView;
{
    let BaseView = MLMatrixBaseView;
    let util = MLMatrixUtil;

    class MatrixSubView extends BaseView {
        constructor(matrix, startRow, endRow, startColumn, endColumn) {
            util.checkRange(matrix, startRow, endRow, startColumn, endColumn);
            super(matrix, endRow - startRow + 1, endColumn - startColumn + 1);
            this.startRow = startRow;
            this.startColumn = startColumn;
        }

        set(rowIndex, columnIndex, value) {
            this.matrix.set(this.startRow + rowIndex, this.startColumn + columnIndex, value);
            return this;
        }

        get(rowIndex, columnIndex) {
            return this.matrix.get(this.startRow + rowIndex, this.startColumn + columnIndex);
        }
    }

    MLMatrixSubView = MatrixSubView;
}