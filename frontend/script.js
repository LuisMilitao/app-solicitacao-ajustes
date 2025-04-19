document.addEventListener('DOMContentLoaded', () => {
    const empresaSelect = document.getElementById('empresa_responsavel');
    const empresaProjetoSelect = document.getElementById('empresa_responsavel_projeto');
    const projetoSelect = document.getElementById('nome_projeto');
    const formulario = document.getElementById('formulario');
    const fornecedorForm = document.getElementById('form-fornecedor');
    const projetoForm = document.getElementById('form-projeto');
    const mensagem = document.getElementById('mensagem');
    const loginForm = document.getElementById('login-form');
    const content = document.querySelector('.content');
    const sidebar = document.querySelector('.sidebar');
    const logoutBtn = document.createElement('button');
    logoutBtn.textContent = 'Sair';
    logoutBtn.style.marginTop = '20px';
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('token');
        content.style.display = 'none';
        sidebar.style.display = 'none';
        document.getElementById('login-section').style.display = 'block';
    });
    sidebar?.appendChild(logoutBtn);

    function authHeader() {
        return { 'Authorization': 'Bearer ' + localStorage.getItem('token') };
    }

    loginForm?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const usuario = document.getElementById('usuario').value;
        const senha = document.getElementById('senha').value;

    try {
        const res = await fetch('https://app-solicitacao-ajustes-production.up.railway.app/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', ...authHeader() },
            body: JSON.stringify({ usuario, senha })
        });

        const data = await res.json();
        console.log('[DEBUG] Resposta do login:', data);


        if (res.ok) {
            localStorage.setItem('token', data.token);
            document.getElementById('login-section').style.display = 'none';
            document.getElementById('main-app').style.display = 'flex';
            content.style.display = 'block';
            sidebar.style.display = 'block';
            carregarFornecedores();
            carregarProjetos();
            carregarFormularios();
        } else {
            exibirMensagem(data.message || 'Erro ao autenticar', 'error');
        }
    } catch (error) {
        exibirMensagem('Erro na conexão com servidor', 'error');
    }
    });
    if (!localStorage.getItem('token')) {
        content.style.display = 'none';
        sidebar.style.display = 'none';
    }

    function exibirMensagem(texto, tipo = 'success') {
        mensagem.className = `message ${tipo}`;
        mensagem.textContent = texto;
        mensagem.style.display = 'block';
        setTimeout(() => mensagem.style.display = 'none', 4000);
    }

    function carregarFornecedores() {
        if (empresaSelect) empresaSelect.innerHTML = '<option value="">Selecione uma empresa</option>';
        if (empresaProjetoSelect) empresaProjetoSelect.innerHTML = '<option value="">Selecione uma empresa</option>';

        fetch('https://app-solicitacao-ajustes-production.up.railway.app/api/fornecedores', { headers: authHeader() })
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

        fetch('https://app-solicitacao-ajustes-production.up.railway.app/api/projetos', { headers: authHeader() })
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

    
    

    formulario?.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(formulario);
        const midiaInput = document.getElementById('midia');
        if (midiaInput?.files.length > 0) {
            formData.append('midia', midiaInput.files[0]);
        }

        fetch('https://app-solicitacao-ajustes-production.up.railway.app/api/formulario', {
            method: 'POST',
            headers: authHeader(),
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
                headers: { 'Content-Type': 'application/json', ...authHeader() },
                body: JSON.stringify(data)
            });
            await res.json();
            exibirMensagem('Fornecedor cadastrado com sucesso!', 'success');
            fornecedorForm.reset();
            
        } catch (error) {
            console.error('Erro ao cadastrar fornecedor:', error);
            exibirMensagem('Erro ao cadastrar fornecedor.', 'error');
        }
    });

    projetoForm?.addEventListener('submit', async (e) => {
        e.preventDefault();

        const data = {
            nome: document.getElementById('nome').value,
            empresa_id: document.getElementById('empresa_responsavel_projeto').value,
        };

        try {
            const res = await fetch('https://app-solicitacao-ajustes-production.up.railway.app/api/projetos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', ...authHeader() },
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
        const response = await fetch('https://app-solicitacao-ajustes-production.up.railway.app/api/formulario', { headers: authHeader() });
        const formularios = await response.json();
        const tabela = document.getElementById('tabela-formularios').querySelector('tbody');
        tabela.innerHTML = '';
        
        formularios.forEach(form => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${form.numero_chamado}</td>
                <td>${form.nome_projeto}</td>
                <td>${form.nome_empresa}</td>
                <td>${form.resumo_ajuste}</td>
                <td>
                    <button class="btn-editar" onclick="editarFormulario(${form.id})">Editar</button>
                    <button class="btn-excluir" onclick="confirmarExclusao(${form.id})">Excluir</button>
                    <button class="btn-imprimir" onclick="imprimirFormulario(${form.id})">Imprimir</button>
                </td>
            `;
            tabela.appendChild(row);
        });
    } catch (error) {
        console.error('Erro ao carregar formulários:', error);
        exibirMensagem('Erro ao carregar formulários.', 'error');
    }
}
async function carregarFornecedoresLista() {
    try {
        const response = await fetch('https://app-solicitacao-ajustes-production.up.railway.app/api/fornecedores', { headers: authHeader() });
        const fornecedores = await response.json();
        const tabela = document.getElementById('tabela-fornecedores').querySelector('tbody');
        tabela.innerHTML = '';

        fornecedores.forEach(f => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${f.empresa}</td>
                <td>${f.contatos}</td>
                <td>${f.email}</td>
                <td>${f.telefone}</td>
                <td>
                    <button class="btn-editar" onclick="editarFornecedor(${f.id})">Editar</button>
                    <button class="btn-excluir" onclick="confirmarExclusaoFornecedor(${f.id})">Excluir</button>
                </td>
            `;
            tabela.appendChild(row);
        });
    } catch (error) {
        console.error('Erro ao carregar fornecedores:', error);
        exibirMensagem('Erro ao carregar fornecedores.', 'error');
    }
}
async function carregarProjetosLista() {
    try {
        const response = await fetch('https://app-solicitacao-ajustes-production.up.railway.app/api/projetos', { headers: authHeader() });
        const projetos = await response.json();
        const tabela = document.getElementById('tabela-projetos').querySelector('tbody');
        tabela.innerHTML = '';

        projetos.forEach(p => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${p.nome}</td>
                <td>${p.empresa || '-'}</td>
                <td>
                    <button class="btn-editar" onclick="editarProjeto(${p.id})">Editar</button>
                    <button class="btn-excluir" onclick="confirmarExclusaoProjeto(${p.id})">Excluir</button>
                </td>
            `;
            tabela.appendChild(row);
        });
    } catch (error) {
        exibirMensagem('Erro ao carregar projetos.', 'error');
    }
}

// Função para editar formulário
async function editarFormulario(id) {
    try {
        const response = await fetch(`https://app-solicitacao-ajustes-production.up.railway.app/api/formulario/${id}`, { headers: authHeader() });
        const formulario = await response.json();

        const fornecedores = await fetch('https://app-solicitacao-ajustes-production.up.railway.app/api/fornecedores', { headers: authHeader() }).then(r => r.json());

        let selectOptions = '<option value="">Selecione uma empresa</option>';
        fornecedores.forEach(f => {
            selectOptions += `<option value="${f.id}" ${f.id == formulario.empresa_responsavel ? 'selected' : ''}>${f.empresa}</option>`;
        });

        const modal = document.getElementById('modal-edicao');
        const conteudoModal = document.getElementById('conteudo-modal');

        conteudoModal.innerHTML = `
            <h2>Editar Solicitação #${formulario.numero_chamado}</h2>
            <form id="form-edicao">
                <input type="hidden" name="id" value="${formulario.id}">
                <label>Número do Chamado: <input type="text" name="numero_chamado" value="${formulario.numero_chamado}" required></label>
                <label>Versão: <input type="text" name="versao" value="${formulario.versao || ''}"></label>
                <label>Empresa Responsável:
                    <select name="empresa_responsavel" required>${selectOptions}</select>
                </label>
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

        document.getElementById('form-edicao').addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData.entries());

            try {
                const res = await fetch(`https://app-solicitacao-ajustes-production.up.railway.app/api/formulario/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json', ...authHeader()
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
async function editarFornecedor(id) {
    try {
        const response = await fetch(`https://app-solicitacao-ajustes-production.up.railway.app/api/fornecedores/${id}`, { headers: authHeader() });
        const fornecedor = await response.json();

        const modal = document.getElementById('modal-edicao');
        const conteudoModal = document.getElementById('conteudo-modal');

        conteudoModal.innerHTML = `
            <h2>Editar Fornecedor</h2>
            <form id="form-edicao-fornecedor">
                <input type="hidden" name="id" value="${fornecedor.id}">
                <label>Empresa: <input type="text" name="empresa" value="${fornecedor.empresa}" required></label>
                <label>Contatos: <input type="text" name="contatos" value="${fornecedor.contatos || ''}"></label>
                <label>E-mail: <input type="email" name="email" value="${fornecedor.email || ''}"></label>
                <label>Telefone: <input type="text" name="telefone" value="${fornecedor.telefone || ''}"></label>
                <button type="submit">Salvar Alterações</button>
            </form>
        `;

        modal.style.display = 'block';

        document.getElementById('form-edicao-fornecedor').addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData.entries());

            const res = await fetch(`https://app-solicitacao-ajustes-production.up.railway.app/api/fornecedores/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', ...authHeader() },
                body: JSON.stringify(data)
            });

            if (res.ok) {
                exibirMensagem('Fornecedor atualizado com sucesso!', 'success');
                modal.style.display = 'none';
                carregarFornecedoresLista();
                 // atualiza selects
            } else {
                exibirMensagem('Erro ao atualizar fornecedor.', 'error');
            }
        });

    } catch (error) {
        console.error('Erro ao editar fornecedor:', error);
        exibirMensagem('Erro ao carregar fornecedor.', 'error');
    }
}
async function editarProjeto(id) {
    try {
        const response = await fetch(`https://app-solicitacao-ajustes-production.up.railway.app/api/projetos/${id}`, {
            headers: authHeader()
        });

        if (!response.ok) throw new Error('Erro ao buscar projeto');

        const projeto = await response.json();

        const fornecedores = await fetch('https://app-solicitacao-ajustes-production.up.railway.app/api/fornecedores', {
            headers: authHeader()
        }).then(r => r.json());

        let selectOptions = '<option value="">Selecione uma empresa</option>';
        fornecedores.forEach(f => {
            selectOptions += `<option value="${f.id}" ${f.id == projeto.empresa_id ? 'selected' : ''}>${f.empresa}</option>`;
        });

        const modal = document.getElementById('modal-edicao');
        const conteudoModal = document.getElementById('conteudo-modal');

        conteudoModal.innerHTML = `
            <h2>Editar Projeto</h2>
            <form id="form-edicao">
                <input type="hidden" name="id" value="${projeto.id}">
                <label>Nome do Projeto:
                    <input type="text" name="nome" value="${projeto.nome || ''}" required>
                </label>
                <label>Empresa Responsável:
                    <select name="empresa_id" required>${selectOptions}</select>
                </label>
                <button type="submit">Salvar Alterações</button>
            </form>
        `;

        modal.style.display = 'block';

        document.getElementById('form-edicao').addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData.entries());

            try {
                const res = await fetch(`https://app-solicitacao-ajustes-production.up.railway.app/api/projetos/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        ...authHeader()
                    },
                    body: JSON.stringify(data)
                });

                if (res.ok) {
                    exibirMensagem('Projeto atualizado com sucesso!', 'success');
                    modal.style.display = 'none';
                    carregarProjetos();
                } else {
                    throw new Error('Falha na atualização');
                }
            } catch (error) {
                console.error('Erro ao atualizar projeto:', error);
                exibirMensagem('Erro ao atualizar projeto.', 'error');
            }
        });

    } catch (error) {
        console.error('Erro ao carregar projeto:', error);
        exibirMensagem('Erro ao carregar projeto para edição.', 'error');
    }
}

// Função para confirmar exclusão
function confirmarExclusao(id) {
    if (confirm('Tem certeza que deseja excluir este registro?')) {
        excluirFormulario(id);
    }
}
function confirmarExclusaoFornecedor(id) {
    if (confirm('Tem certeza que deseja excluir este fornecedor?')) {
        excluirFornecedor(id);
    }
}
function confirmarExclusaoProjeto(id) {
    if (confirm('Tem certeza que deseja excluir este projeto?')) {
        excluirProjeto(id);
    }
}

async function excluirProjeto(id) {
    try {
        const response = await fetch(`https://app-solicitacao-ajustes-production.up.railway.app/api/projetos/${id}`, {
            method: 'DELETE',
            headers: authHeader()
        });

        if (response.ok) {
            exibirMensagem('Projeto excluído com sucesso!', 'success');
            carregarProjetosLista();
             // se usado em selects
        } else {
            throw new Error('Erro ao excluir projeto');
        }
    } catch (error) {
        exibirMensagem('Erro ao excluir projeto.', 'error');
    }
}

async function excluirFornecedor(id) {
    try {
        const response = await fetch(`https://app-solicitacao-ajustes-production.up.railway.app/api/fornecedores/${id}`, {
            method: 'DELETE',
            headers: authHeader()
        });

        if (response.ok) {
            exibirMensagem('Fornecedor excluído com sucesso!', 'success');
            carregarFornecedoresLista();
             // atualiza selects
        } else {
            throw new Error('Erro ao excluir fornecedor');
        }
    } catch (error) {
        console.error('Erro ao excluir fornecedor:', error);
        exibirMensagem('Erro ao excluir fornecedor.', 'error');
    }
}

// Função para excluir formulário
async function excluirFormulario(id) {
    try {
        const response = await fetch(`https://app-solicitacao-ajustes-production.up.railway.app/api/formulario/${id}`, {
            method: 'DELETE',
            headers: authHeader()
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

// Função para mostrar listagem
function mostrarLista(id) {
    document.querySelectorAll('.form-section').forEach(form => {
        form.classList.remove('active');
    });

    const section = document.getElementById(id);
    section.classList.add('active');

    switch (id) {
        case 'lista-formularios':
            carregarFormularios();
            break;
        case 'lista-fornecedores':
            carregarFornecedoresLista();
            break;
        case 'lista-projetos':
            carregarProjetosLista(); // futura função
            break;
    }
}

// Torna acessível globalmente
window.mostrarLista = mostrarLista;
window.editarFormulario = editarFormulario;
window.confirmarExclusao = confirmarExclusao;
// Torna acessível globalmente
window.mostrarFormulario = mostrarFormulario;
window.editarFornecedor = editarFornecedor;
window.confirmarExclusaoFornecedor = confirmarExclusaoFornecedor;
window.editarProjeto = editarProjeto;
window.confirmarExclusaoProjeto = confirmarExclusaoProjeto;
window.imprimirFormulario = async function (id) {
    try {
        const res = await fetch(`https://app-solicitacao-ajustes-production.up.railway.app/api/formulario/${id}`, {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
        });

        const form = await res.json();
        const printArea = document.getElementById('print-area');

        printArea.innerHTML = `
            <style>
                body { font-family: Arial; padding: 20px; }
                h2 { text-align: center; }
                .linha { margin-bottom: 10px; }
                .label { font-weight: bold; }
            </style>
            <h2>Solicitação de Ajuste #${form.numero_chamado}</h2>
            <div class="linha"><span class="label">Projeto:</span> ${form.nome_projeto}</div>
            <div class="linha"><span class="label">Empresa:</span> ${form.nome_empresa || form.empresa_responsavel}</div>
            <div class="linha"><span class="label">Versão:</span> ${form.versao || '-'}</div>
            <div class="linha"><span class="label">Contatos:</span> ${form.contatos || '-'}</div>
            <div class="linha"><span class="label">Resumo:</span> ${form.resumo_ajuste || '-'}</div>
            <div class="linha"><span class="label">Ambiente:</span> ${form.ambiente || '-'}</div>
            <div class="linha"><span class="label">Tipo de Usuário:</span> ${form.tipo_usuario || '-'}</div>
            <div class="linha"><span class="label">Rota para Tela:</span> ${form.rota_para_tela || '-'}</div>
            <div class="linha"><span class="label">Descrição:</span> ${form.o_que_esta_acontecendo || '-'}</div>
            <div class="linha"><span class="label">Justificação:</span> ${form.justificacao || '-'}</div>
            <div class="linha"><span class="label">Solução:</span> ${form.solucao_a_ser_tomada || '-'}</div>
            <div class="linha"><span class="label">Sugestão:</span> ${form.sugestao || '-'}</div>
            <div class="linha"><span class="label">Resolvido por:</span> ${form.resolvido_por || '-'}</div>
            ${form.midia_url ? `<div class="linha"><span class="label">Mídia:</span> <a href="${form.midia_url}" target="_blank">${form.midia_url}</a></div>` : ''}
        `;

        const printWindow = window.open('', '', 'width=800,height=600');
        printWindow.document.write(printArea.innerHTML);
        printWindow.document.close();
        printWindow.print();
    } catch (err) {
        alert('Erro ao carregar dados para impressão.');
        console.error(err);
    }
}
});