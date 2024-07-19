/* ########################################################################################## */

document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault();
    showLoadingOverlay();

    const formData = new FormData(event.target);
    const data = {};
    formData.forEach((value, key) => (data[key] = value));
    data.cids = Array.from(document.querySelectorAll('.cid-input')).map(input => input.value);

    fetch('https://script.google.com/macros/s/AKfycbxdt4vZ_oUZBq82wqhqTTMmfVWmGk60b1W9k6V63UrbErWZtGdeAvEjyMQDG4IhgQOl/exec', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        hideLoadingOverlay();
        showConfirmation('Dados enviados com sucesso!');
    })
    .catch(error => {
        hideLoadingOverlay();
        showConfirmation('Erro ao enviar os dados: ' + error.message);
    });
});

/* ########################################################################################## */

/*Número do seu pedido no nosso site*/
$('#n_pedido').mask('0000');
/*Data*/
$('#data').mask('00/00/0000');

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

/*FIM ENVIO DE FORMULÁRIO*/

