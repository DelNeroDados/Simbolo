/* ########################################################################################## */

document.getElementById('dataForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = {};
    formData.forEach((value, key) => (data[key] = value));

    fetch('URL_DO_SEU_SCRIPT', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then(data => {
      alert('Dados enviados com sucesso!');
    })
    .catch(error => {
      console.error('Erro ao enviar os dados:', error);
    });
  });

/* ########################################################################################## */

        /*document.getElementById('dataForm').addEventListener('submit', function(event) {
            event.preventDefault();

            const formData = new FormData(event.target);
            const data = {};
            formData.forEach((value, key) => (data[key] = value));

            fetch('URL_DO_SEU_SCRIPT', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
            })
            .then(response => response.json())
            .then(data => {
            alert('Dados enviados com sucesso!');
            })
            .catch(error => {
            console.error('Erro ao enviar os dados:', error);
            });
        });

         ########################################################################################## */

        /*Número do seu pedido no nosso site*/
        $('#n_pedido').mask('0000');
        /*Data*/
        $('#date').mask('00/00/0000');

        function applyPhoneMask(input, isCellular) {
            var mask = isCellular ? '(00) 00000-0000' : '(00) 0000-0000';
            $(input).mask(mask, { clearIfNotMatch: true });
        }

        function updatePhoneMask() {
            var emerg1Type = $('input[name="contato1"]:checked').val();
            var emerg2Type = $('input[name="contato2"]:checked').val();
            
            applyPhoneMask('#emerg1', emerg1Type === 'Celular');
            applyPhoneMask('#emerg2', emerg2Type === 'Celular');
        }

        $(document).ready(function () {
            // Inicializa as máscaras com base na seleção inicial
            updatePhoneMask();

            // Atualiza as máscaras quando a seleção de rádio muda
            $('input[name="contato1"]').on('change', function () {
                applyPhoneMask('#emerg1', $(this).val() === 'Celular');
            });

            $('input[name="contato2"]').on('change', function () {
                applyPhoneMask('#emerg2', $(this).val() === 'Celular');
            });
        });

        /*INICIO CID IMPUT*/
        function createCIDInput(index) {
        return `
            <div class="mb-3">
            <label class="form-label">CID ${index + 1}</label>
            <input type="text" class="form-control cid-input" placeholder="CID ${index + 1}" required>
            </div>
        `;
        }

        function applyCIDMask(input) {
        $(input).on('input', function () {
            let value = $(this).val().toUpperCase();
            let maskedValue = value;

            if (/^[A-Z][0-9]{0,2}$/.test(value)) {
            maskedValue = value;
            } else if (/^[A-Z][0-9]{2}\.?[0-9]?$/.test(value)) {
            maskedValue = value.replace(/^([A-Z][0-9]{2})([0-9])$/, '$1.$2');
            } else if (/^[0-9][A-Z][0-9]{2}$/.test(value)) {
            maskedValue = value;
            } else if (/^[0-9][A-Z][0-9]{2}\.?[A-Z0-9]?$/.test(value)) {
            maskedValue = value.replace(/^([0-9][A-Z][0-9]{2})([A-Z0-9])$/, '$1.$2');
            } else {
            maskedValue = value.substring(0, 5);
            }
            $(this).val(maskedValue);
        });
        }

        $('#numCIDs').on('change', function () {
        const numCIDs = parseInt($(this).val());
        const cidInputsContainer = $('#cidInputs');
        cidInputsContainer.empty();
        for (let i = 0; i < numCIDs; i++) {
            const cidInputHTML = createCIDInput(i);
            cidInputsContainer.append(cidInputHTML);
        }
        $('.cid-input').each(function () {
            applyCIDMask(this);
        });
        });

        /*FIM CID IMPUT*/


        /*TELA DE CONFIRMAÇÃO*/

        // Exibe o overlay de carregamento
        function showLoadingOverlay() {
        document.getElementById('loading-overlay').style.display = 'block';
        }

        // Oculta o overlay de carregamento
        function hideLoadingOverlay() {
        document.getElementById('loading-overlay').style.display = 'none';
        }

        // Exibe o popup de confirmação
        function showConfirmation(message) {
        document.getElementById('confirmation-popup').style.display = 'block';
        document.getElementById('confirmation-message').textContent = message;
        }

        // Fecha o popup de confirmação
        document.getElementById('confirmation-button').addEventListener('click', function () {
        document.getElementById('confirmation-popup').style.display = 'none';

        });
            
        function handleSubmit(event) {
            event.preventDefault();
            showLoadingOverlay();

            var formData = {
                n_pedido: $('#n_pedido').val(),
                email: $('#email').val(),
                numCIDs: $('#numCIDs').val(),
                cids: $('.cid-input').map(function () { return $(this).val(); }).get(),
                termo: $('input[name="termo"]:checked').val(),
                colar: $('input[name="colar"]:checked').val(),
                cor: $('input[name="cor"]:checked').val(),
                simbolo: $('input[name="simbolo"]:checked').val(),
                nome: $('#nome').val(),
                data: $('#data').val(),
                emerg1: $('#emerg1').val(),
                emerg2: $('#emerg2').val()
            };

            google.script.run
                .withSuccessHandler(function (response) {
                    hideLoadingOverlay();
                    showConfirmation('Formulário enviado com sucesso! Por favor, verifique seu e-mail.');
                })
                .withFailureHandler(function (error) {
                    hideLoadingOverlay();
                    showConfirmation('Erro ao enviar o formulário: ' + error.message);
                })
                .enviarDados(formData);
        }

        $(document).ready(function () {
            $('#myForm').on('submit', handleSubmit);
        });
        /*FIM ENVIO DE FORMULÁRIO*/


/*Número do seu pedido no nosso site*/
$('#n_pedido').mask('0000');
/*Data*/
$('#date').mask('00/00/0000');

function applyPhoneMask(input, isCellular) {
    var mask = isCellular ? '(00) 00000-0000' : '(00) 0000-0000';
    $(input).mask(mask, { clearIfNotMatch: true });
}

function updatePhoneMask() {
    var emerg1Type = $('input[name="contato1"]:checked').val();
    var emerg2Type = $('input[name="contato2"]:checked').val();
    
    applyPhoneMask('#emerg1', emerg1Type === 'Celular');
    applyPhoneMask('#emerg2', emerg2Type === 'Celular');
}

$(document).ready(function () {
    // Inicializa as máscaras com base na seleção inicial
    updatePhoneMask();

    // Atualiza as máscaras quando a seleção de rádio muda
    $('input[name="contato1"]').on('change', function () {
        applyPhoneMask('#emerg1', $(this).val() === 'Celular');
    });

    $('input[name="contato2"]').on('change', function () {
        applyPhoneMask('#emerg2', $(this).val() === 'Celular');
    });
});

/*INICIO CID IMPUT*/
function createCIDInput(index) {
return `
    <div class="mb-3">
    <label class="form-label">CID ${index + 1}</label>
    <input type="text" class="form-control cid-input" placeholder="CID ${index + 1}" required>
    </div>
`;
}

function applyCIDMask(input) {
$(input).on('input', function () {
    let value = $(this).val().toUpperCase();
    let maskedValue = value;

    if (/^[A-Z][0-9]{0,2}$/.test(value)) {
    maskedValue = value;
    } else if (/^[A-Z][0-9]{2}\.?[0-9]?$/.test(value)) {
    maskedValue = value.replace(/^([A-Z][0-9]{2})([0-9])$/, '$1.$2');
    } else if (/^[0-9][A-Z][0-9]{2}$/.test(value)) {
    maskedValue = value;
    } else if (/^[0-9][A-Z][0-9]{2}\.?[A-Z0-9]?$/.test(value)) {
    maskedValue = value.replace(/^([0-9][A-Z][0-9]{2})([A-Z0-9])$/, '$1.$2');
    } else {
    maskedValue = value.substring(0, 5);
    }
    $(this).val(maskedValue);
});
}

$('#numCIDs').on('change', function () {
const numCIDs = parseInt($(this).val());
const cidInputsContainer = $('#cidInputs');
cidInputsContainer.empty();
for (let i = 0; i < numCIDs; i++) {
    const cidInputHTML = createCIDInput(i);
    cidInputsContainer.append(cidInputHTML);
}
$('.cid-input').each(function () {
    applyCIDMask(this);
});
});

/*FIM CID IMPUT*/


/*TELA DE CONFIRMAÇÃO*/

// Exibe o overlay de carregamento
function showLoadingOverlay() {
document.getElementById('loading-overlay').style.display = 'block';
}

// Oculta o overlay de carregamento
function hideLoadingOverlay() {
document.getElementById('loading-overlay').style.display = 'none';
}

// Exibe o popup de confirmação
function showConfirmation(message) {
document.getElementById('confirmation-popup').style.display = 'block';
document.getElementById('confirmation-message').textContent = message;
}

// Fecha o popup de confirmação
document.getElementById('confirmation-button').addEventListener('click', function () {
document.getElementById('confirmation-popup').style.display = 'none';

});
    
function handleSubmit(event) {
    event.preventDefault();
    showLoadingOverlay();

    var formData = {
        n_pedido: $('#n_pedido').val(),
        email: $('#email').val(),
        numCIDs: $('#numCIDs').val(),
        cids: $('.cid-input').map(function () { return $(this).val(); }).get(),
        termo: $('input[name="termo"]:checked').val(),
        colar: $('input[name="colar"]:checked').val(),
        cor: $('input[name="cor"]:checked').val(),
        simbolo: $('input[name="simbolo"]:checked').val(),
        nome: $('#nome').val(),
        data: $('#data').val(),
        emerg1: $('#emerg1').val(),
        emerg2: $('#emerg2').val()
    };

    google.script.run
        .withSuccessHandler(function (response) {
            hideLoadingOverlay();
            showConfirmation('Formulário enviado com sucesso! Por favor, verifique seu e-mail.');
        })
        .withFailureHandler(function (error) {
            hideLoadingOverlay();
            showConfirmation('Erro ao enviar o formulário: ' + error.message);
        })
        .enviarDados(formData);
}

$(document).ready(function () {
    $('#myForm').on('submit', handleSubmit);
});
/*FIM ENVIO DE FORMULÁRIO*/