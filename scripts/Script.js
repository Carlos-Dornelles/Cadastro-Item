    let itensCadastrados = []; // Array para armazenar os itens cadastrados

        function pesquisarItem() {
            let searchTerm = document.getElementById('pesquisaInput').value.toLowerCase();

            // Limpa a lista de itens
            document.getElementById('itens').innerHTML = '';

            // Filtra os itens pelo termo de pesquisa
            itensCadastrados.forEach(item => {
                if (item.nome.toLowerCase().includes(searchTerm)) {
                    adicionarItemNaLista(item);
                }
            });
        }

        function cadastrarItem() {
            let nome = document.getElementById('nomeItem').value;
            let valor = document.getElementById('valorItem').value;
            let descricao = document.getElementById('descricaoItem').value;
            let quantidade = document.getElementById('quantidadeItem').value;
            let codigo = document.getElementById('codigoItem').value;

            // Obter o caminho da imagem selecionada
            let fotoInput = document.getElementById('imagem');
            let foto = '';

            if (fotoInput.files.length > 0) {
                foto = URL.createObjectURL(fotoInput.files[0]);
            }

            // Cria um objeto item
            let novoItem = {
                nome: nome,
                valor: valor,
                descricao: descricao,
                quantidade: quantidade,
                codigo: codigo,
                foto: foto
            };

            // Adiciona o item ao array de itens cadastrados
            itensCadastrados.push(novoItem);

            // Limpa os campos de entrada após cadastrar o item
            limparCampos();

            // Adiciona o novo item na lista de itens exibidos
            adicionarItemNaLista(novoItem);
        }

        function adicionarItemNaLista(item) {
            let itensDiv = document.getElementById('itens');

            // Cria um novo elemento para exibir o item
            let novoItemDiv = document.createElement('div');
            novoItemDiv.classList.add('item');
            novoItemDiv.innerHTML = `
		<div id="divitem">
		<div><strong>Imagem:</strong> <img src="${item.foto}" alt="Imagem do item"></div>
		<div>
                <div><strong>Nome:</strong> ${item.nome}</div>
                <div><strong>Valor:</strong> ${item.valor}</div>
                <div><strong>Descrição:</strong> ${item.descricao}</div>
                <div><strong>Código:</strong> ${item.codigo}</div>
                <div><strong>Quantidade:</strong> ${item.quantidade}</div>
		<div>
		</div>
		<div class="item-actions">
                    <button onclick="editarItem('${item.codigo}')">Editar</button>
                    <button onclick="removerItem('${item.codigo}')">Remover</button>
                </div>
            `;

            // Adiciona o novo item à lista de itens
            itensDiv.appendChild(novoItemDiv);
        }

        function editarItem(codigo) {
            // Encontra o índice do item com o código fornecido no array de itens cadastrados
            let index = itensCadastrados.findIndex(item => item.codigo === codigo);

            if (index !== -1) {
                // Atualiza os campos de entrada com os dados do item encontrado
                document.getElementById('nomeItem').value = itensCadastrados[index].nome;
                document.getElementById('valorItem').value = itensCadastrados[index].valor;
                document.getElementById('descricaoItem').value = itensCadastrados[index].descricao;
                document.getElementById('quantidadeItem').value = itensCadastrados[index].quantidade;
                document.getElementById('codigoItem').value = itensCadastrados[index].codigo;

                // Remove o item do array de itens cadastrados
                itensCadastrados.splice(index, 1);

                // Atualiza a lista de itens exibidos
                atualizarListaItens();
            }
        }

        function removerItem(codigo) {
            // Encontra o índice do item com o código fornecido no array de itens cadastrados
            let index = itensCadastrados.findIndex(item => item.codigo === codigo);

            if (index !== -1) {
                // Remove o item do array de itens cadastrados
                itensCadastrados.splice(index, 1);

                // Atualiza a lista de itens exibidos
                atualizarListaItens();
            }
        }

        function atualizarListaItens() {
            // Limpa a lista de itens exibidos
            document.getElementById('itens').innerHTML = '';

            // Recria os itens na lista com base no array atualizado de itens cadastrados
            itensCadastrados.forEach(item => {
                adicionarItemNaLista(item);
            });
        }

        function limparCampos() {
            // Limpa os campos de entrada após cadastrar o item ou iniciar edição
            document.getElementById('nomeItem').value = '';
            document.getElementById('valorItem').value = '';
            document.getElementById('descricaoItem').value = '';
            document.getElementById('quantidadeItem').value = '';
            document.getElementById('codigoItem').value = '';
            document.getElementById('imagem').value = ''; // Limpa o input de imagem
        }

        function carregarImagem(event) {
            // Exibe a imagem selecionada antes de cadastrá-la
            let imagemPreview = document.createElement('img');
            imagemPreview.src = URL.createObjectURL(event.target.files[0]);
            imagemPreview.style.maxWidth = '100px';
            imagemPreview.style.maxHeight = '100px';

            let fotoDiv = document.getElementById('cadastrarItem').querySelector('.item img');
            fotoDiv.innerHTML = ''; // Limpa qualquer imagem anterior
            fotoDiv.appendChild(imagemPreview);
        }