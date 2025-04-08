document.addEventListener('DOMContentLoaded', () => {
    const empresaSelect = document.getElementById('empresa_responsavel');
    const empresaProjetoSelect = document.getElementById('empresa_responsavel_projeto');
    const formulario = document.getElementById('formulario');
    const fornecedorForm = document.getElementById('form-fornecedor');
    const projetoForm = document.getElementById('form-projeto');
    const mensagem = document.getElementById('mensagem');

    function exibirMensagem(texto, tipo = 'success') {
        mensagem.className = `message ${tipo}`;
        mensagem.textContent = texto;
        mensagem.style.display = 'block';
        setTimeout(() => mensagem.style.display = 'none', 4000);
    }

    function carregarFornecedores() {
        empresaSelect.innerHTML = '<option value="">Selecione uma empresa</option>';
        empresaProjetoSelect.innerHTML = '<option value="">Selecione uma empresa</option>';

        fetch('https://app-solicitacao-ajustes-production.up.railway.app/api/fornecedores')
            .then(response => response.json())
            .then(empresas => {
                empresas.forEach(empresa => {
                    const option1 = document.createElement('option');
                    option1.value = empresa.id;
                    option1.textContent = empresa.empresa;
                    empresaSelect.appendChild(option1);

                    const option2 = document.createElement('option');
                    option2.value = empresa.id;
                    option2.textContent = empresa.empresa;
                    empresaProjetoSelect.appendChild(option2);
                });
            })
            .catch(error => {
                console.error('Erro ao carregar empresas:', error);
                exibirMensagem('Erro ao carregar empresas.', 'error');
            });
    }

    carregarFornecedores();

    formulario.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(formulario);
        formData.append('midia', document.getElementById('midia').files[0]);

        fetch('https://app-solicitacao-ajustes-production.up.railway.app/api/formulario', {
            method: 'POST',
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                exibirMensagem('Solicitação enviada com sucesso!', 'success');
                formulario.reset();
            })
            .catch(error => {
                console.error('Erro ao enviar solicitação:', error);
                exibirMensagem('Erro ao enviar solicitação.', 'error');
            });
    });

    fornecedorForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const data = {
            empresa: document.getElementById('empresa').value,
            contatos: document.getElementById('contatos_fornecedor').value,
            email: document.getElementById('email').value,
            telefone: document.getElementById('telefone').value,
        };

        try {
            const res = await fetch('https://app-solicitacao-ajustes-production.up.railway.app/api/fornecedores', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            await res.json();
            exibirMensagem('Fornecedor cadastrado com sucesso!', 'success');
            fornecedorForm.reset();
            carregarFornecedores(); // Atualiza ambas as listas
        } catch (error) {
            console.error('Erro ao cadastrar fornecedor:', error);
            exibirMensagem('Erro ao cadastrar fornecedor.', 'error');
        }
    });

    projetoForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const data = {
            nome: document.getElementById('nome').value,
            empresa_responsavel: document.getElementById('empresa_responsavel_projeto').value,
        };

        try {
            const res = await fetch('https://app-solicitacao-ajustes-production.up.railway.app/api/projetos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            await res.json();
            exibirMensagem('Projeto cadastrado com sucesso!', 'success');
            projetoForm.reset();
        } catch (error) {
            console.error('Erro ao cadastrar projeto:', error);
            exibirMensagem('Erro ao cadastrar projeto.', 'error');
        }
    });
});
