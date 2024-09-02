import styles from "./NewClient.module.css";
import InputText from "../../components/InputText/InputText";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ComboBox from "../../components/ComboBox/ComboBox";
import PopupModal from "../../components/PopupModal/PopupModal";
import SwitchButton from "../../components/SwitchButton/SwitchButton";
import { usePostData } from "../../hooks/usePostData";

const NewClient = () => {
  const navigate = useNavigate();
  const { postApiData, loading, error, setError, response } = usePostData();

  // Dados Pessoais
  const [clienteError, setClienteError] = useState("");
  const [clienteNome, setClienteNome] = useState("");
  const [clienteGenero, setClienteGenero] = useState("");
  const [clienteTelefone, setClienteTelefone] = useState("");
  const [wrongTel, setWrongTel] = useState(false);
  const [clienteCpf, setClienteCpf] = useState("");
  const [wrongCpf, setWrongCpf] = useState(false);
  const [clienteEmail, setClienteEmail] = useState("");
  const [wrongEmail, setWrongEmail] = useState(false);
  const [clienteNasc, setClienteNasc] = useState("");
  const [wrongNasc, setWrongNasc] = useState(false);
  const [clienteSenha, setClienteSenha] = useState("");
  const [clienteConfirmarSenha, setClienteConfirmarSenha] = useState("");
  const [wrongSenha, setWrongSenha] = useState(false);
  const [wrongConfirmarSenha, setWrongConfirmarSenha] = useState(false);

  // Dados endereço
  const [showEnderecoModal, setShowEnderecoModal] = useState(false);
  const [enderecoError, setEnderecoError] = useState("");
  const [enderecoNome, setEnderecoNome] = useState("");
  const [enderecoTipoResidencia, setEnderecoTipoResidencia] = useState("");
  const [enderecoTipoLogradouro, setEnderecoTipoLogradouro] = useState("");
  const [enderecoCep, setEnderecoCep] = useState("");
  const [enderecoPais, setEnderecoPais] = useState("");
  const [enderecoEstado, setEnderecoEstado] = useState("");
  const [enderecoCidade, setEnderecoCidade] = useState("");
  const [enderecoBairro, setEnderecoBairro] = useState("");
  const [enderecoNumero, setEnderecoNumero] = useState("");
  const [enderecoLogradouro, setEnderecoLogradouro] = useState("");
  const [enderecoObs, setEnderecoObs] = useState("");
  const [enderecoCobranca, setEnderecoCobranca] = useState(false);
  const [enderecoEntrega, setEnderecoEntrega] = useState(false);
  const [enderecoFavorito, setEnderecoFavorito] = useState(false);

  // Dados Pagamento
  const [showPagamentoModal, setShowPagamentoModal] = useState(false);
  const [pagamentoError, setPagamentoError] = useState("");
  const [pagamentoNome, setPagamentoNome] = useState("");
  const [pagamentoNumero, setPagamentoNumero] = useState("");
  const [pagamentoNomeImpresso, setPagamentoNomeImpresso] = useState("");
  const [pagamentoBandeira, setPagamentoBandeira] = useState("");
  const [pagamentoCodSeguranca, setPagamentoCodSeguranca] = useState("");
  const [pagamentoFavorito, setPagamentoFavorito] = useState(false);
  const BANDEIRASPERMITIDAS = ["Visa", "MasterCard", "Elo"];

  const [contentEnderecos, setContentEnderecos] = useState([
    // {
    //   id: 1,
    //   nomeEndereco: "Minha Casa",
    //   tipoResidencia: "casa",
    //   tipoLogradouro: "rua",
    //   logradouro: "lilia",
    //   numero: "225",
    //   bairro: "calmon",
    //   cep: "08560250",
    //   cidade: "poa",
    //   estado: "sp",
    //   pais: "brasil",
    //   obsEndereco: "Essa é minha casa",
    //   enderecoEntrega: true,
    //   enderecoCobranca: false,
    //   favorito: true,
    //   clienteId: 1,
    // },
  ]);

  const [contentPagamentos, setContentPagamentos] = useState([
    // {
    //   id: 1,
    //   nomeCartao: "Nubank",
    //   numeroCartao: "1234-1234-1234-1234",
    //   nomeImpresso: "kevin",
    //   bandeiraCartao: "master",
    //   codigoSeguranca: "123",
    //   favorito: true,
    //   clienteId: 1,
    // },
  ]);

  useEffect(() => {
    const limparEndereco = () => {
      setEnderecoError("");
      setEnderecoNome("");
      setEnderecoTipoResidencia("");
      setEnderecoTipoLogradouro("");
      setEnderecoCep("");
      setEnderecoPais("");
      setEnderecoEstado("");
      setEnderecoCidade("");
      setEnderecoBairro("");
      setEnderecoNumero("");
      setEnderecoLogradouro("");
      setEnderecoObs("");
      setEnderecoCobranca(false);
      setEnderecoEntrega(false);
      setEnderecoFavorito(false);
    };

    limparEndereco();
  }, [showEnderecoModal]);

  useEffect(() => {
    const limparPagamento = () => {
      setPagamentoError("");
      setPagamentoNome("");
      setPagamentoNumero("");
      setPagamentoNomeImpresso("");
      setPagamentoBandeira("");
      setPagamentoCodSeguranca("");
      setPagamentoFavorito(false);
    };

    limparPagamento();
  }, [showPagamentoModal]);

  const validateEmail = (email) => {
    if (email === "") return;
    // Expressão regular para validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Testa se o email corresponde ao padrão
    setWrongEmail(!emailRegex.test(email));
  };

  const validateMask = (input, requiredQuantity) => {
    // Validar se tamanho do input é o requerido pela máscara
    return input.length == requiredQuantity;
  };

  const validateSenha = (senha) => {
    // Expressão regular para validar a senha
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?=.*\d)[A-Za-z\d\W]{8,}$/;

    setWrongSenha(!regex.test(senha));
  };

  const salvarEndereco = () => {
    // Validação básica dos campos obrigatórios
    if (
      !enderecoNome ||
      !enderecoTipoResidencia ||
      !enderecoTipoLogradouro ||
      !enderecoLogradouro ||
      !enderecoNumero ||
      !enderecoBairro ||
      !enderecoCep ||
      !enderecoCidade ||
      !enderecoEstado ||
      !enderecoPais
    ) {
      setEnderecoError(
        "Por favor, preencha todos os campos obrigatórios marcados com um *."
      );
      return;
    }

    const novoEndereco = {
      nomeEndereco: enderecoNome,
      tipoResidencia: enderecoTipoResidencia,
      tipoLogradouro: enderecoTipoLogradouro,
      logradouro: enderecoLogradouro,
      numero: enderecoNumero,
      bairro: enderecoBairro,
      cep: enderecoCep,
      cidade: enderecoCidade,
      estado: enderecoEstado,
      pais: enderecoPais,
      obsEndereco: enderecoObs,
      enderecoEntrega: enderecoEntrega,
      enderecoCobranca: enderecoCobranca,
      favorito: enderecoFavorito,
    };

    setContentEnderecos((prevEnderecos) => [...prevEnderecos, novoEndereco]);

    setShowEnderecoModal(false);
  };

  const salvarPagamento = () => {
    // Validação básica dos campos obrigatórios
    if (
      !pagamentoNome ||
      !pagamentoNumero ||
      !pagamentoNomeImpresso ||
      !pagamentoBandeira ||
      !pagamentoCodSeguranca
    ) {
      setPagamentoError(
        "Por favor, preencha todos os campos obrigatórios marcados com um *."
      );
      return;
    }

    // Validação de número do cartão (número de exemplo, ajustar conforme a necessidade)
    const numeroCartaoRegex = /^\d{4}-\d{4}-\d{4}-\d{4}$/; // Exemplo: cartão com 16 dígitos
    if (!numeroCartaoRegex.test(pagamentoNumero)) {
      setPagamentoError("O número do cartão deve ter 16 dígitos.");
      return;
    }

    const novoPagamento = {
      nomeCartao: pagamentoNome,
      numeroCartao: pagamentoNumero,
      nomeImpresso: pagamentoNomeImpresso,
      bandeiraCartao: pagamentoBandeira,
      codigoSeguranca: pagamentoCodSeguranca,
      favorito: pagamentoFavorito,
    };

    setContentPagamentos((prevPagamentos) => [
      ...prevPagamentos,
      novoPagamento,
    ]);

    setShowPagamentoModal(false);
  };

  const salvarCliente = () => {
    // Validação básica dos campos obrigatórios
    if (
      !clienteNome ||
      !clienteGenero ||
      !clienteTelefone ||
      !clienteCpf ||
      !clienteEmail ||
      !clienteNasc ||
      !clienteSenha ||
      !clienteConfirmarSenha
    ) {
      setClienteError(
        "Por favor, preencha todos os campos obrigatórios marcados com um *."
      );
      return;
    }

    // Validação do CPF (simples, ajustar conforme necessidade)
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    if (!cpfRegex.test(clienteCpf)) {
      setClienteError("O CPF deve ter 11 dígitos.");
      return;
    }

    // Validação do e-mail
    if (wrongEmail) {
      setClienteError("Por favor, insira um e-mail válido.");
      return;
    }

    // Validação do telefone (exemplo de telefone brasileiro)
    const telefoneRegex = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;
    if (!telefoneRegex.test(clienteTelefone)) {
      setClienteError("O número de telefone deve ser válido.");
      return;
    }

    // Validação da data de nascimento (Exemplo de formato DD/MM/AAAA)
    const nascRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    if (!nascRegex.test(clienteNasc)) {
      setClienteError("A data de nascimento deve estar no formato DD/MM/AAAA.");
      return;
    }

    // Verificação de pelo menos um pagamento salvo
    if (contentPagamentos.length === 0) {
      setClienteError("Por favor, adicione pelo menos uma forma de pagamento.");
      return;
    }

    if (wrongSenha) return;

    // Verificação de endereço de entrega e cobrança
    const temEnderecoEntrega = contentEnderecos.some(
      (endereco) => endereco.enderecoEntrega
    );
    const temEnderecoCobranca = contentEnderecos.some(
      (endereco) => endereco.enderecoCobranca
    );

    if (!temEnderecoEntrega) {
      setClienteError("Por favor, adicione pelo menos um endereço de entrega.");
      return;
    }

    if (!temEnderecoCobranca) {
      setClienteError(
        "Por favor, adicione pelo menos um endereço de cobrança."
      );
      return;
    }

    const body = {
      genero:
        clienteGenero === "Masculino"
          ? "M"
          : clienteGenero === "Feminino"
          ? "F"
          : clienteGenero === "Outros"
          ? "O"
          : "N",
      nome: clienteNome,
      dataNascimento: clienteNasc, // Certifique-se de que a data está no formato "YYYY-MM-DD"
      cpf: clienteCpf.replace(/\D/g, ""), // Remove qualquer formatação de CPF
      telefoneTipo: "Cel", // Aqui você pode ajustar se necessário
      telefoneNumero: clienteTelefone.replace(/\D/g, ""), // Remove a formatação do telefone
      email: clienteEmail,
      senha: clienteSenha,
      enderecos: contentEnderecos.map((endereco) => ({
        id: endereco.id || null, // Se já existir, use o ID, senão defina como null ou remova esta linha
        nomeEndereco: endereco.nomeEndereco,
        tipoResidencia: endereco.tipoResidencia,
        tipoLogradouro: endereco.tipoLogradouro,
        logradouro: endereco.logradouro,
        numero: endereco.numero,
        bairro: endereco.bairro,
        cep: endereco.cep,
        cidade: endereco.cidade,
        estado: endereco.estado,
        pais: endereco.pais,
        obsEndereco: endereco.obsEndereco,
        enderecoEntrega: endereco.enderecoEntrega,
        enderecoCobranca: endereco.enderecoCobranca,
        favorito: endereco.favorito,
        clienteId: 1, // Substitua pelo ID do cliente ou ajuste conforme necessário
      })),
      cartoesCredito: contentPagamentos.map((pagamento) => ({
        id: pagamento.id || null, // Se já existir, use o ID, senão defina como null ou remova esta linha
        nomeCartao: pagamento.nomeCartao,
        numeroCartao: pagamento.numeroCartao.replace(/\D/g, ""), // Remove formatação de número do cartão
        nomeImpresso: pagamento.nomeImpresso,
        bandeiraCartao: pagamento.bandeiraCartao,
        codigoSeguranca: pagamento.codigoSeguranca,
        favorito: pagamento.favorito,
        clienteId: 1, // Substitua pelo ID do cliente ou ajuste conforme necessário
      })),
    };

    postApiData(body, "cliente");
  };

  useEffect(() => {
    if (error)
      // Se todas as validações forem passadas
      alert(error);
    setError(null);

    // navigate("/clients");
  }, [error]);

  const preencherDadosTeste = () => {
    // Dados Pessoais
    setClienteNome("João da Silva");
    setClienteGenero("Masculino");
    setClienteTelefone("(11) 91234-5678"); // Usando formato brasileiro de telefone
    setClienteCpf("123.123.123-42"); // Exemplo de CPF válido
    setClienteEmail("joao.silva@example.com");
    setClienteNasc("01/01/1990"); // Exemplo de data de nascimento válida
    setClienteSenha("Teste@123"); // Senha com letras maiúsculas, minúsculas, números e caractere especial
    setClienteConfirmarSenha("Teste@123"); // Senha de confirmação

    // Adicionando endereço de teste em contentEnderecos
    const novoEndereco = {
      nomeEndereco: "Casa",
      tipoResidencia: "Apartamento",
      tipoLogradouro: "Rua",
      logradouro: "Rua Exemplo",
      numero: "123",
      bairro: "Centro",
      cep: "12345-678",
      cidade: "São Paulo",
      estado: "SP",
      pais: "Brasil",
      obsEndereco: "Perto da praça",
      enderecoEntrega: true,
      enderecoCobranca: true,
      favorito: true,
    };

    setContentEnderecos([novoEndereco]);

    // Adicionando pagamento de teste em contentPagamentos
    const novoPagamento = {
      nomeCartao: "João da Silva",
      numeroCartao: "1231-2312-3123-1231",
      nomeImpresso: "JOAO DA SILVA",
      bandeiraCartao: "VISA",
      codigoSeguranca: "123",
      favorito: true,
    };

    setContentPagamentos([novoPagamento]);
  };

  return (
    <>
      <div className={styles.main_container}>
        <h1>Cadastrar Usuário</h1>
        <div className={styles.content_container}>
          <div className={styles.data_container}>
            <div className={styles.data_row}>
              <h1>Dados Pessoais</h1>
            </div>
            <div className={styles.data_row}>
              <InputText
                label={"Nome"}
                placeholder={"Nome do cliente"}
                isMandatory={true}
                value={clienteNome}
                onChange={setClienteNome}
              />
              <ComboBox
                label={"Gênero"}
                placeholder={"Gênero do cliente"}
                isMandatory={true}
                options={[
                  "Feminino",
                  "Masculino",
                  "Outros",
                  "Prefiro não informar",
                ]}
                value={clienteGenero}
                onChange={setClienteGenero}
              />
            </div>
            <div className={styles.data_row}>
              <InputText
                label={"CPF"}
                placeholder={"CPF do cliente"}
                isMandatory={true}
                isWrong={wrongCpf}
                onBlur={() => {
                  setWrongCpf(!validateMask(clienteCpf, 14));
                }}
                value={clienteCpf}
                onChange={setClienteCpf}
                mask="999.999.999-99"
              />
              <InputText
                label={"Tel."}
                placeholder={"Telefone do Cliente"}
                isMandatory={true}
                isWrong={wrongTel}
                onBlur={() => {
                  setWrongTel(!validateMask(clienteTelefone, 15));
                }}
                value={clienteTelefone}
                onChange={setClienteTelefone}
                mask="(99) 99999-9999"
              />
            </div>
            <div className={styles.data_row}>
              <InputText
                label={"Email"}
                placeholder={"Email do cliente"}
                isMandatory={true}
                isWrong={wrongEmail}
                onBlur={() => validateEmail(clienteEmail)}
                value={clienteEmail}
                onChange={setClienteEmail}
              />
              <InputText
                label={"Data Nasc."}
                placeholder={"Data Nasc. do cliente"}
                isMandatory={true}
                isWrong={wrongNasc}
                onBlur={() => {
                  setWrongNasc(!validateMask(clienteNasc, 10));
                }}
                value={clienteNasc}
                onChange={setClienteNasc}
                mask="99/99/9999"
              />
            </div>
            <div className={styles.data_row}>
              <InputText
                label={"Senha"}
                placeholder={"Senha do cliente"}
                isMandatory={true}
                isWrong={wrongSenha || wrongConfirmarSenha}
                onBlur={() => {
                  validateSenha(clienteSenha);
                }}
                value={clienteSenha}
                onChange={(e) => {
                  setClienteSenha(e);
                  if (clienteConfirmarSenha != "")
                    setWrongConfirmarSenha(e !== clienteConfirmarSenha);
                }}
                isPassword={true}
              />
              <InputText
                label={"Confirmar Senha"}
                placeholder={"Confirmar Senha"}
                isMandatory={true}
                isWrong={wrongConfirmarSenha}
                onBlur={() => {
                  setWrongConfirmarSenha(
                    clienteSenha !== clienteConfirmarSenha
                  );
                }}
                value={clienteConfirmarSenha}
                onChange={setClienteConfirmarSenha}
                isPassword={true}
              />
            </div>
            <div className={styles.data_row}>
              {(wrongSenha || wrongConfirmarSenha) && (
                <p className="error">
                  {wrongSenha
                    ? "Sua senha deve conter ao menos 8 dígitos tendo pelo menos uma letra maiúscula, uma minúscula e um caractere especial"
                    : "As senhas digitadas não coincidem, verifique se digitou corretamente e tente novamente"}
                </p>
              )}
            </div>
          </div>
          <div className={styles.data_container}>
            <div className={styles.end_row}>
              <div className={styles.data_row}>
                <h1>Endereços</h1>
              </div>
              <div className={styles.cards_container}>
                {contentEnderecos.map((endereco, index) => (
                  <div key={index} className={styles.address_card}>
                    <p>{endereco.nomeEndereco}</p>
                    <p>{endereco.logradouro}</p>
                  </div>
                ))}
                <div
                  className={`${styles.address_card} ${styles.add_card}`}
                  onClick={() => setShowEnderecoModal(true)}
                >
                  <p>+</p>
                </div>
              </div>
            </div>
            <div className={styles.end_row}>
              <div className={styles.data_row}>
                <h1>Pagamentos</h1>
              </div>
              <div className={styles.cards_container}>
                {contentPagamentos.map((pagamento, index) => (
                  <div key={index} className={styles.address_card}>
                    <p>{pagamento.nomeCartao}</p>
                    <p>****-****-****-{pagamento.numeroCartao.slice(15, 20)}</p>
                  </div>
                ))}
                <div
                  className={`${styles.address_card} ${styles.add_card}`}
                  onClick={() => setShowPagamentoModal(true)}
                >
                  <p>+</p>
                </div>
              </div>
            </div>

            {clienteError && (
              <div className={styles.data_row}>
                <p className="error">{clienteError}</p>
              </div>
            )}
          </div>
        </div>
        <div className={styles.buttons_row}>
          <Button text={"Teste"} onClick={preencherDadosTeste} />
          <Button
            text={"Cancelar"}
            darkBtn={true}
            onClick={() => navigate("/clients")}
          />
          <Button text={"Confirmar"} onClick={salvarCliente} />
        </div>
      </div>

      {/* Modal de Endereço */}
      <PopupModal
        title={"Novo Endereço"}
        isOpen={showEnderecoModal}
        onCancel={() => setShowEnderecoModal(false)}
        onConfirm={salvarEndereco}
      >
        <div className={styles.data_container}>
          <div className={styles.data_row}>
            <InputText
              label={"Nome do Endereço"}
              placeholder={"Nome do Endereço"}
              isMandatory={true}
              value={enderecoNome}
              onChange={setEnderecoNome}
            />
            <InputText
              label={"Tipo Residência"}
              placeholder={"Tipo Residência"}
              isMandatory={true}
              value={enderecoTipoResidencia}
              onChange={setEnderecoTipoResidencia}
            />
          </div>
          <div className={styles.data_row}>
            <InputText
              label={"Tipo Logradouro"}
              placeholder={"Tipo Logradouro"}
              isMandatory={true}
              value={enderecoTipoLogradouro}
              onChange={setEnderecoTipoLogradouro}
            />
            <InputText
              label={"CEP"}
              placeholder={"CEP"}
              isMandatory={true}
              value={enderecoCep}
              onChange={setEnderecoCep}
              mask="99999-999"
            />
          </div>
          <div className={styles.data_row}>
            <InputText
              label={"País"}
              placeholder={"País"}
              isMandatory={true}
              value={enderecoPais}
              onChange={setEnderecoPais}
            />
            <InputText
              label={"Estado"}
              placeholder={"Estado"}
              isMandatory={true}
              value={enderecoEstado}
              onChange={setEnderecoEstado}
            />
          </div>
          <div className={styles.data_row}>
            <InputText
              label={"Cidade"}
              placeholder={"Cidade"}
              isMandatory={true}
              value={enderecoCidade}
              onChange={setEnderecoCidade}
            />
            <InputText
              label={"Bairro"}
              placeholder={"Bairro"}
              isMandatory={true}
              value={enderecoBairro}
              onChange={setEnderecoBairro}
            />
          </div>
          <div className={styles.data_row}>
            <InputText
              label={"Número"}
              placeholder={"Número"}
              isMandatory={true}
              value={enderecoNumero}
              onChange={setEnderecoNumero}
            />
            <InputText
              label={"Logradouro"}
              placeholder={"Logradouro"}
              isMandatory={true}
              value={enderecoLogradouro}
              onChange={setEnderecoLogradouro}
            />
          </div>
          <div className={styles.data_row}>
            <InputText
              label={"Observação"}
              placeholder={"Observação"}
              value={enderecoObs}
              onChange={setEnderecoObs}
            />
          </div>
          <div className={styles.data_row}>
            <p>Cobrança</p>
            <SwitchButton
              checked={enderecoCobranca}
              onChange={() => setEnderecoCobranca(!enderecoCobranca)}
            />
            <p>Entrega</p>
            <SwitchButton
              checked={enderecoEntrega}
              onChange={() => setEnderecoEntrega(!enderecoEntrega)}
            />
            <p>Favorito</p>
            <SwitchButton
              checked={enderecoFavorito}
              onChange={() => setEnderecoFavorito(!enderecoFavorito)}
            />
          </div>

          {enderecoError && (
            <div className={styles.data_row}>
              <p className="error">{enderecoError}</p>
            </div>
          )}
        </div>
      </PopupModal>

      {/* Modal de Pagamento */}
      <PopupModal
        title={"Nova Forma de Pagamento"}
        isOpen={showPagamentoModal}
        onCancel={() => setShowPagamentoModal(false)}
        onConfirm={salvarPagamento}
      >
        <div className={styles.data_container} style={{ padding: "16px 8px" }}>
          <div className={styles.data_row}>
            <InputText
              label={"Nome do Cartão"}
              placeholder={"Nome do Cartão"}
              isMandatory={true}
              value={pagamentoNome}
              onChange={setPagamentoNome}
            />
            <div style={{ width: "100%" }}>
              <p>Favorito</p>
              <SwitchButton
                checked={pagamentoFavorito}
                onChange={() => setPagamentoFavorito(!pagamentoFavorito)}
              />
            </div>
          </div>
          <div className={styles.data_row}>
            <InputText
              label={"Nº do Cartão"}
              placeholder={"Nº do Cartão"}
              isMandatory={true}
              value={pagamentoNumero}
              onChange={setPagamentoNumero}
              mask="9999-9999-9999-9999"
            />
            <ComboBox
              label={"Bandeira"}
              placeholder={"Bandeira"}
              isMandatory={true}
              options={BANDEIRASPERMITIDAS}
              value={pagamentoBandeira}
              onChange={setPagamentoBandeira}
            />
          </div>
          <div className={styles.data_row}>
            <InputText
              label={"Nome Impresso no Cartão"}
              placeholder={"Nome Impresso no Cartão"}
              isMandatory={true}
              value={pagamentoNomeImpresso}
              onChange={setPagamentoNomeImpresso}
            />
            <InputText
              label={"Cód. de Segurança"}
              placeholder={"Cód. de Segurança"}
              isMandatory={true}
              value={pagamentoCodSeguranca}
              onChange={setPagamentoCodSeguranca}
            />
          </div>

          {pagamentoError && (
            <div className={styles.data_row}>
              <p className="error">{pagamentoError}</p>
            </div>
          )}
        </div>
      </PopupModal>
    </>
  );
};

export default NewClient;
