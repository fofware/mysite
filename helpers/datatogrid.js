function toGrid(respuesta){
	if (!respuesta.data) return respuesta;
	const data = respuesta.data;
	let jqGriddata = {
		page: data.page,
		total: data.totalPage,
		records: data.tableRowsCount,
		rowsByPage: data.rowsByPage,
		rowIni: data.rowIni,
		rowsShow: data.rowsShow,
		cols: [],
		rows: []
	}
	for ( const fldn in data.rows[0] ) jqGriddata.cols.push(fldn);
	data.rows.map((row) => {
		let cell = [];
		jqGriddata.cols.map((key) => cell.push(row[key]))
		const newRow = {id:row.id,cell}
		jqGriddata.rows.push(newRow)
	})
	return jqGriddata;
}

module.exports = toGrid;