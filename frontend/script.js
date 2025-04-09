document.addEventListener('DOMContentLoaded', () => {
    const empresaSelect = document.getElementById('empresa_responsavel');
    const empresaProjetoSelect = document.getElementById('empresa_responsavel_projeto');
    const projetoSelect = document.getElementById('nome_projeto');
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
        if (empresaSelect) empresaSelect.innerHTML = '<option value="">Selecione uma empresa</option>';
        if (empresaProjetoSelect) empresaProjetoSelect.innerHTML = '<option value="">Selecione uma empresa</option>';

        fetch('https://app-solicitacao-ajustes-production.up.railway.app/api/fornecedores')
            .then(response => response.json())
            .then(empresas => {
                empresas.forEach(empresa => {
                    if (empresaSelect) {
                        const option1 = document.createElement('option');
                        option1.value = empresa.id;
                        option1.textContent = empresa.empresa;
                        empresaSelect.appendChild(option1);
                    }
                    if (empresaProjetoSelect) {
                        const option2 = document.createElement('option');
                        option2.value = empresa.id;
                        option2.textContent = empresa.empresa;
                        empresaProjetoSelect.appendChild(option2);
                    }
                });
            })
            .catch(error => {
                console.error('Erro ao carregar empresas:', error);
                exibirMensagem('Erro ao carregar empresas.', 'error');
            });
    }

    function carregarProjetos() {
        if (!projetoSelect) return;

        projetoSelect.innerHTML = '<option value="">Selecione um projeto</option>';

        fetch('https://app-solicitacao-ajustes-production.up.railway.app/api/projetos')
            .then(response => response.json())
            .then(projetos => {
                projetos.forEach(projeto => {
                    const option = document.createElement('option');
                    option.value = projeto.nome;
                    option.textContent = projeto.nome;
                    projetoSelect.appendChild(option);
                });
            })
            .catch(error => {
                console.error('Erro ao carregar projetos:', error);
                exibirMensagem('Erro ao carregar projetos.', 'error');
            });
    }

    carregarFornecedores();
    carregarProjetos();

    formulario?.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(formulario);
        formData.append('midia', document.getElementById('midia')?.files[0]);

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

    fornecedorForm?.addEventListener('submit', async (e) => {
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
            carregarFornecedores();
        } catch (error) {
            console.error('Erro ao cadastrar fornecedor:', error);
            exibirMensagem('Erro ao cadastrar fornecedor.', 'error');
        }
    });

    projetoForm?.addEventListener('submit', async (e) => {
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
            carregarProjetos();
        } catch (error) {
            console.error('Erro ao cadastrar projeto:', error);
            exibirMensagem('Erro ao cadastrar projeto.', 'error');
        }
    });

    // ✅ Corrigido: função para alternar formulários do menu lateral
    function mostrarFormulario(id) {
        document.querySelectorAll('.form-section').forEach(form => {
            form.classList.remove('active');
        });
        document.getElementById(id)?.classList.add('active');
    }
    // Adicionar após as funções existentes
// Função para carregar todos os formulários
async function carregarFormularios() {
    try {
        const response = await fetch('https://app-solicitacao-ajustes-production.up.railway.app/api/formulario');
        const formularios = await response.json();
        const tabela = document.getElementById('tabela-formularios').querySelector('tbody');
        tabela.innerHTML = '';
        
        formularios.forEach(form => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${form.numero_chamado}</td>
                <td>${form.nome_projeto}</td>
                <td>${form.empresa_responsavel}</td>
                <td>${form.resumo_ajuste}</td>
                <td>
                    <button class="btn-editar" onclick="editarFormulario(${form.id})">Editar</button>
                    <button class="btn-excluir" onclick="confirmarExclusao(${form.id})">Excluir</button>
                </td>
            `;
            tabela.appendChild(row);
        });
    } catch (error) {
        console.error('Erro ao carregar formulários:', error);
        exibirMensagem('Erro ao carregar formulários.', 'error');
    }
}

// Função para editar formulário
async function editarFormulario(id) {
    try {
        const response = await fetch(`https://app-solicitacao-ajustes-production.up.railway.app/api/formulario/${id}`);
        const formulario = await response.json();

        const modal = document.getElementById('modal-edicao');
        const conteudoModal = document.getElementById('conteudo-modal');

        conteudoModal.innerHTML = `
            <h2>Editar Solicitação #${formulario.numero_chamado}</h2>
            <form id="form-edicao">
                <input type="hidden" name="id" value="${formulario.id}">
                <label>Número do Chamado: <input type="text" name="numero_chamado" value="${formulario.numero_chamado}" required></label>
                <label>Nome do Projeto: <input type="text" name="nome_projeto" value="${formulario.nome_projeto}" required></label>
                <label>Versão: <input type="text" name="versao" value="${formulario.versao || ''}"></label>
                <label>Empresa Responsável: <input type="text" name="empresa_responsavel" value="${formulario.empresa_responsavel}" required></label>
                <label>Contatos: <input type="text" name="contatos" value="${formulario.contatos || ''}"></label>
                <label>Resumo do Ajuste: <textarea name="resumo_ajuste">${formulario.resumo_ajuste || ''}</textarea></label>
                <label>Ambiente: <input type="text" name="ambiente" value="${formulario.ambiente || ''}"></label>
                <label>Tipo de Usuário: <input type="text" name="tipo_usuario" value="${formulario.tipo_usuario || ''}"></label>
                <label>Rota para Tela: <input type="text" name="rota_para_tela" value="${formulario.rota_para_tela || ''}"></label>
                <label>O que está acontecendo?: <textarea name="o_que_esta_acontecendo">${formulario.o_que_esta_acontecendo || ''}</textarea></label>
                <label>Justificação: <textarea name="justificacao">${formulario.justificacao || ''}</textarea></label>
                <label>Solução a Ser Tomada: <textarea name="solucao_a_ser_tomada">${formulario.solucao_a_ser_tomada || ''}</textarea></label>
                <label>Sugestão: <textarea name="sugestao">${formulario.sugestao || ''}</textarea></label>
                <label>Resolvido Por: <input type="text" name="resolvido_por" value="${formulario.resolvido_por || ''}"></label>
                <button type="submit">Salvar Alterações</button>
            </form>
        `;

        modal.style.display = 'block';

        // Evento de submissão do formulário de edição
        document.getElementById('form-edicao').addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData.entries());

            try {
                const res = await fetch(`https://app-solicitacao-ajustes-production.up.railway.app/api/formulario/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                if (res.ok) {
                    exibirMensagem('Formulário atualizado com sucesso!', 'success');
                    modal.style.display = 'none';
                    carregarFormularios();
                } else {
                    throw new Error('Falha na atualização');
                }
            } catch (error) {
                console.error('Erro ao atualizar:', error);
                exibirMensagem('Erro ao atualizar formulário.', 'error');
            }
        });

    } catch (error) {
        console.error('Erro ao carregar formulário:', error);
        exibirMensagem('Erro ao carregar formulário para edição.', 'error');
    }
}


// Função para confirmar exclusão
function confirmarExclusao(id) {
    if (confirm('Tem certeza que deseja excluir este registro?')) {
        excluirFormulario(id);
    }
}

// Função para excluir formulário
async function excluirFormulario(id) {
    try {
        const response = await fetch(`https://app-solicitacao-ajustes-production.up.railway.app/api/formulario/${id}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            exibirMensagem('Registro excluído com sucesso!', 'success');
            carregarFormularios();
        } else {
            throw new Error('Erro ao excluir registro');
        }
    } catch (error) {
        console.error('Erro ao excluir formulário:', error);
        exibirMensagem('Erro ao excluir registro.', 'error');
    }
}

// Fechar modal ao clicar no X
document.querySelector('.close')?.addEventListener('click', () => {
    document.getElementById('modal-edicao').style.display = 'none';
});

// Fechar modal ao clicar fora dele
window.addEventListener('click', (event) => {
    const modal = document.getElementById('modal-edicao');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Adicionar botão para listagem no menu lateral
document.querySelector('.sidebar').innerHTML += `
    <button onclick="mostrarLista('lista-formularios')">Listar Solicitações</button>
`;

// Função para mostrar listagem
function mostrarLista(id) {
    document.querySelectorAll('.form-section').forEach(form => {
        form.classList.remove('active');
    });
    document.getElementById(id).classList.add('active');
    if (id === 'lista-formularios') carregarFormularios();
}
// Torna acessível globalmente
window.mostrarLista = mostrarLista;
window.editarFormulario = editarFormulario;
window.confirmarExclusao = confirmarExclusao;
// Torna acessível globalmente
window.mostrarFormulario = mostrarFormulario;
});
