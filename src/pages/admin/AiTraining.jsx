import { useState, useRef, useEffect } from "react";
import { FaMicrophone, FaStop, FaPaperPlane, FaUpload } from "react-icons/fa";
import toast from "react-hot-toast";
import Navbar from "../../components/Navbar/Navbar";
import styles from "../../css/ia.module.css";
import globalcss from "../../css/global.module.css";
import ChatMessage from "../../components/Admin/AiTraining/ChatMessage";
import ReportDisplay from "../../components/Admin/AiTraining/ReportDisplay";
import useAudioRecorder from "../../hooks/useAudioRecorder";


function useAiTrainingMock() {
  const [jobTitle, setJobTitle] = useState("");
  const [file, setFile] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [report, setReport] = useState(null);
  const [interviewComplete, setInterviewComplete] = useState(false);

  const startTraining = () => {
    if (!jobTitle) return toast.error("Digite o nome do emprego.");
    if (file && file.type !== "application/pdf") {
      return toast.error("Envie um arquivo PDF válido.");
    }

    setReport(null);
    setInterviewComplete(false);
    setMessages([]);

    const mockSession = `session_${Date.now()}`;
    setSessionId(mockSession);
    
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1500)),
      {
        loading: "Iniciando treinamento...",
        success: () => {
          setMessages([
            { role: "ai", content: `Olá! Vamos iniciar o treinamento para a vaga de ${jobTitle}. Como você se descreveria profissionalmente?` }
          ]);
          return "Treinamento iniciado com sucesso!";
        },
        error: "Erro ao iniciar."
      }
    );
  };

  const sendChatMessage = (messageContent) => {
    if (!messageContent.trim() || !sessionId || interviewComplete) return;

    const userMessage = messageContent.trim();
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setInputMessage("");

    setTimeout(() => {
      const mockReplies = [
        "Interessante! Me fale mais sobre uma situação desafiadora que você enfrentou.",
        "Entendi. Quais são suas maiores qualidades para esse cargo?",
        "Muito bom. Para finalizar, por que deveríamos te contratar?"
      ];
      
      const isLast = messages.length >= 4; // Finaliza após algumas mensagens

      if (isLast) {
        setMessages((prev) => [...prev, { role: "ai", content: "Obrigado pelas respostas! Entrevista concluída." }]);
        setInterviewComplete(true);
        setSessionId(null);
        setReport("Relatório Mockado:\n- Comunicação: Excelente\n- Experiência: Adequada\n- Pontos fortes: Proatividade e clareza.");
        toast.success("Entrevista concluída!");
      } else {
        const randomReply = mockReplies[Math.floor(Math.random() * mockReplies.length)];
        setMessages((prev) => [...prev, { role: "ai", content: randomReply }]);
      }
    }, 1000);
  };

  const sendAudioMessage = () => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 2000)),
      {
        loading: "Transcrevendo áudio...",
        success: () => {
          const mockedTranscription = "Esta é uma transcrição mockada do áudio enviado.";
          sendChatMessage(mockedTranscription);
          return "Áudio transcrito com sucesso!";
        },
        error: "Erro ao transcrever."
      }
    );
  };

  const gerarRelatorioManual = () => {
    if (!sessionId) return toast.error("Nenhuma sessão ativa.");
    
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1000)),
      {
        loading: "Gerando relatório...",
        success: () => {
          setReport("Relatório Gerado Manualmente (Mock)\n\nO candidato apresentou boas respostas...");
          return "Relatório gerado!";
        },
        error: "Erro ao gerar."
      }
    );
  };

  return {
    jobTitle, setJobTitle,
    file, setFile,
    sessionId,
    messages,
    inputMessage, setInputMessage,
    report,
    interviewComplete,
    startTraining,
    sendChatMessage,
    sendAudioMessage,
    gerarRelatorioManual
  };
}

// ==========================================
// COMPONENTS
// ==========================================

const TrainingSetupCard = ({ jobTitle, setJobTitle, file, setFile, sessionId, startTraining }) => (
  <div className={styles.card}>
    <h2>Realizar Treinamento</h2>
    <p>Faça o treinamento da IA para um novo emprego</p>

    <input
      type="text"
      value={jobTitle}
      onChange={(e) => setJobTitle(e.target.value)}
      placeholder="Nome do Emprego"
      disabled={sessionId !== null}
      className={styles.inputField}
    />

    <div className={styles.fileUploadArea}>
      <input
        type="file"
        id="file-upload"
        accept="application/pdf"
        style={{ display: "none" }}
        disabled={sessionId !== null}
        onChange={(e) => setFile(e.target.files[0])}
      />
      <label htmlFor="file-upload" className={styles.uploadButton}>
        <FaUpload /> {file ? file.name : "Enviar Currículo (opcional)"}
      </label>
    </div>

    <button
      onClick={startTraining}
      disabled={sessionId !== null}
      className={styles.primaryButton}
    >
      Iniciar Treinamento
    </button>
  </div>
);

const TrainingStatusCard = ({ sessionId, gerarRelatorioManual }) => (
  <>
    <div className={styles.card}>
      <h2>Status do Treinamento</h2>
      <p>Sessão: {sessionId ? "Ativa" : "Inativa"}</p>
      <p>Última atualização: {new Date().toLocaleString("pt-BR")}</p>
    </div>

    {sessionId && (
      <div className={styles.card}>
        <button
          onClick={gerarRelatorioManual}
          className={styles.primaryButton}
        >
          Gerar Relatório Manualmente
        </button>
      </div>
    )}
  </>
);

const ChatArea = ({
  sessionId,
  messages,
  inputMessage,
  setInputMessage,
  interviewComplete,
  sendChatMessage,
  isRecording,
  startRecording,
  stopRecording
}) => {
  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendChatMessage(inputMessage);
  };

  return (
    <div className={styles.card}>
      <h2>Interagir com a IA</h2>
      <p>Envie consultas e revise as respostas da IA.</p>

      <div className={styles.chatWindow} ref={chatRef}>
        {messages.length === 0 && !sessionId && (
          <p className={styles.chatPlaceholder}>
            Inicie um treinamento para começar a conversar.
          </p>
        )}

        {messages.map((msg, index) => (
          <ChatMessage key={index} role={msg.role} content={msg.content} />
        ))}
      </div>

      {!interviewComplete && sessionId && (
        <div className={styles.chatInputArea}>
          <input
            type="text"
            placeholder="Digite sua mensagem..."
            value={inputMessage}
            disabled={isRecording}
            onKeyPress={handleKeyPress}
            onChange={(e) => setInputMessage(e.target.value)}
            className={styles.inputField}
          />

          {isRecording ? (
            <button className={styles.stopRecordingButton} onClick={stopRecording}>
              <FaStop /> Parar
            </button>
          ) : (
            <button className={styles.recordButton} onClick={startRecording}>
              <FaMicrophone /> Voz
            </button>
          )}

          <button className={styles.sendButton} onClick={() => sendChatMessage(inputMessage)}>
            <FaPaperPlane />
          </button>
        </div>
      )}
    </div>
  );
};

// ==========================================
// MAIN PAGE
// ==========================================
export default function AiInterviewPage() {
  const {
    jobTitle, setJobTitle,
    file, setFile,
    sessionId,
    messages,
    inputMessage, setInputMessage,
    report,
    interviewComplete,
    startTraining,
    sendChatMessage,
    sendAudioMessage,
    gerarRelatorioManual
  } = useAiTrainingMock();

  const { isRecording, startRecording, stopRecording } = useAudioRecorder(sendAudioMessage);

  return (
    <>
      <Navbar />

      <div className={styles.pageContainer}>
        <div className={styles.pageHeader}>
          <h2 className={globalcss.poppinsBold}>
            Gerenciamento de Treinamento de IA
          </h2>
        </div>

        <div className={styles.contentGrid}>
          <div className={styles.leftColumn}>
            <TrainingSetupCard
              jobTitle={jobTitle}
              setJobTitle={setJobTitle}
              file={file}
              setFile={setFile}
              sessionId={sessionId}
              startTraining={startTraining}
            />
            <TrainingStatusCard
              sessionId={sessionId}
              gerarRelatorioManual={gerarRelatorioManual}
            />
          </div>

          <div className={styles.rightColumn}>
            <ChatArea
              sessionId={sessionId}
              messages={messages}
              inputMessage={inputMessage}
              setInputMessage={setInputMessage}
              interviewComplete={interviewComplete}
              sendChatMessage={sendChatMessage}
              isRecording={isRecording}
              startRecording={startRecording}
              stopRecording={stopRecording}
            />
            {report && <ReportDisplay report={report} />}
          </div>
        </div>
      </div>
    </>
  );
}

