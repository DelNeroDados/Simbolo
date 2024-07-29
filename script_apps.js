var sheetName = 'Página1';
var scriptProp = PropertiesService.getScriptProperties();

const intialSetup = (e = {}) =>
{
	var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet()
	scriptProp.setProperty('key', activeSpreadsheet.getId())
}

const doPost = (e = {}) =>
{
	const { parameter, postData: { contents, type } = {} } = e;
	const { source } = parameter;
	var lock = LockService.getScriptLock()
	lock.tryLock(10000)

	try
	{
		// esse id é o id da planilha (abra a planilha em uma aba ao lado e veja o id na url)
		var sheet = SpreadsheetApp.openById("1VHRmHIs5w5MKiBKvDIVaOePQklWgcFUcRO6n5EkVGEk").getActiveSheet();
		var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]
		var nextRow = sheet.getLastRow() + 1

		const columns = JSON.parse(contents);

		var newRow = sheet.appendRow([
			new Date(), // timestamp
			columns.n_pedido,
			columns.cor,
			columns.simbolo,
			columns.email,
			columns.nome,
			columns.data,
			columns.contato_1,
			columns.contato_2,
			columns.numCIDs,
			columns.cidInputs,
			columns.termo,
		])
	
		return ContentService
			.createTextOutput(JSON.stringify({ 'result': 'success'}))
			.setMimeType(ContentService.MimeType.JSON)
	}
	catch (e)
	{
		return ContentService
			.createTextOutput(JSON.stringify({ 'result': 'error', 'error': e.message }))
			.setMimeType(ContentService.MimeType.JSON)
	}
	finally
	{
		lock.releaseLock()
	}
}