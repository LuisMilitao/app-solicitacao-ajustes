document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('formulario');
    const empresaSelect = document.getElementById('empresa_responsavel');

    // Carregar empresas ao carregar a página
    fetch('https://app-solicitacao-ajustes-production.up.railway.app/api/fornecedores')
        .then(response => response.json())
        .then(empresas => {
            empresas.forEach(empresa => {
                const option = document.createElement('option');
                option.value = empresa.id;
                option.textContent = empresa.empresa;
                empresaSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Erro ao carregar empresas:', error));

    formulario.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('numero_chamado', document.getElementById('numero_chamado').value);
        formData.append('nome_projeto', document.getElementById('nome_projeto').value);
        formData.append('versao', document.getElementById('versao').value);
        formData.append('empresa_responsavel', empresaSelect.value);
        formData.append('contatos', document.getElementById('contatos').value);
        formData.append('resumo_ajuste', document.getElementById('resumo_ajuste').value);
        formData.append('ambiente', document.getElementById('ambiente').value);
        formData.append('tipo_usuario', document.getElementById('tipo_usuario').value);
        formData.append('rota_para_tela', document.getElementById('rota_para_tela').value);
        formData.append('o_que_esta_acontecendo', document.getElementById('o_que_esta_acontecendo').value);
        formData.append('midia', document.getElementById('midia').files[0]);
        formData.append('justificacao', document.getElementById('justificacao').value);
        formData.append('solucao_a_ser_tomada', document.getElementById('solucao_a_ser_tomada').value);
        formData.append('sugestao', document.getElementById('sugestao').value);
        formData.append('resolvido_por', document.getElementById('resolvido_por').value);

        fetch('https://app-solicitacao-ajustes-production.up.railway.app/api/formulario', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            alert('Solicitação enviada com sucesso!');
            formulario.reset();
        })
        .catch(error => console.error('Erro ao enviar solicitação:', error));
    });
});
