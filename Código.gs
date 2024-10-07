
const doPost = (e = {}) => {
    const { parameter, postData: { contents, type } = {} } = e;
    var lock = LockService.getScriptLock();
    lock.tryLock(10000);

    try {
        var sheet = SpreadsheetApp.openById("1VHRmHIs5w5MKiBKvDIVaOePQklWgcFUcRO6n5EkVGEk").getActiveSheet();
        var nextRow = sheet.getLastRow() + 1;
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
            columns.cidInputs, // Aqui ele deve salvar como uma string
            columns.termo,
            columns.c1,
            columns.c2,


        ]);

        return ContentService
            .createTextOutput(JSON.stringify({ 'result': 'success' }))
            .setMimeType(ContentService.MimeType.JSON);
    } catch (e) {
        return ContentService
            .createTextOutput(JSON.stringify({ 'result': 'error', 'error': e.message }))
            .setMimeType(ContentService.MimeType.JSON);
    } finally {
        lock.releaseLock();
    }
};


