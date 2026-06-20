import { useState, useRef, useEffect } from "react";
import { FaMicrophone, FaStop, FaPaperPlane, FaUpload } from "react-icons/fa";
import toast from "react-hot-toast";
import Navbar from "../../components/Navbar/Navbar";
import axiosInstance from "../../api/axiosInstance";
import styles from "../../css/ia.module.css";
import globalcss from "../../css/global.module.css";

const ChatMessage = ({ role, content }) => {
  const className = role === "user" ? styles.userMessage : styles.aiMessage;
  return (
    <div className={`${styles.chatMessage} ${className}`}>
      <p>{content}</p>
    </div>
  );
};

const ReportDisplay = ({ report }) => {
  if (!report) return null;

  const formattedReport = report.split("\n").map((line, index) => {
    const boldedLine = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    return <p key={index} dangerouslySetInnerHTML={{ __html: boldedLine }} />;
  });

  return (
    <div className={styles.reportDisplay}>
      <h2>Relatório de Avaliação do Candidato</h2>
      <div className={styles.reportContent}>{formattedReport}</div>
    </div>
  );
};

const AI_API_URL = "";

export default function AiInterviewPage() {
  const [jobTitle, setJobTitle] = useState("");
  const [file, setFile] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [report, setReport] = useState(null);
  const [interviewComplete, setInterviewComplete] = useState(false);

  // Áudio
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);

  // Loading geral

  // ================================
  // SCROLL AUTOMÁTICO DO CHAT
  // ================================
  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  // ==================================
  // GERAR RELATÓRIO MANUAL
  // ==================================
  // Substitua sua função gerarRelatorioManual por esta:
  const gerarRelatorioManual = async () => {
    if (!sessionId) return toast.error("Nenhuma sessão ativa.");

    try {
      // Pedimos arraybuffer para conseguir manipular tanto binários (PDF) quanto texto
      const res = await axiosInstance.post(
        `${AI_API_URL}/gerar_relatorio`,
        { session_id: sessionId, message: "" },
        { responseType: "arraybuffer" }, // <- arraybuffer é mais versátil que blob aqui
      );

      const contentType = (res.headers && res.headers["content-type"]) || "";

      // === Caso venha PDF ===
      if (contentType.includes("application/pdf")) {
        const blob = new Blob([res.data], { type: contentType });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");

        // Tenta extrair filename do header Content-Disposition, se houver
        const disposition = res.headers["content-disposition"] || "";
        let filename = `${sessionId}_relatorio.pdf`;
        try {
          const match = disposition.match(
            /filename\*?=(?:UTF-8'')?["']?([^;"']+)/i,
          );
          if (match && match[1]) {
            filename = decodeURIComponent(match[1]);
          }
        } catch {
          // ignore, usa filename padrão
        }

        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);

        toast.success("Relatório PDF baixado!");
        return;
      }

      // === Caso venha texto/JSON (erro ou relatório em JSON) ===
      // Decodifica arraybuffer para string utf-8
      const decoder = new TextDecoder("utf-8");
      const text = decoder.decode(res.data);

      // Tenta parsear JSON
      let parsed;
      try {
        parsed = JSON.parse(text);
      } catch {
        parsed = null;
      }

      if (parsed && parsed.report) {
        // Servidor retornou JSON com campo 'report' (texto)
        setReport(parsed.report);
        toast.success("Relatório gerado!");
      } else {
        // Se não tiver JSON, usamos o texto cru para feedback
        const message =
          (parsed && parsed.error) ||
          text ||
          "Resposta inesperada do servidor.";
        toast.error(message);
      }
    } catch (err) {
      // axios pode lançar para erros de rede/status
      // tentamos extrair uma mensagem útil
      const msg = err?.response
        ? `Erro no servidor: ${err.response.status}`
        : `Erro: ${err.message || err}`;
      toast.error(msg);
      console.error("gerarRelatorioManual erro:", err);
    }
  };

  // ==================================
  // INICIAR TREINAMENTO
  // ==================================
  const startTraining = async () => {
    if (!jobTitle) return toast.error("Digite o nome do emprego.");

    if (file) {
      if (file.type !== "application/pdf") {
        return toast.error("Envie um arquivo PDF válido.");
      }
      if (!file.name.toLowerCase().endsWith(".pdf")) {
        return toast.error("O arquivo deve ter extensão .pdf");
      }
    }

    setReport(null);
    setInterviewComplete(false);
    setMessages([]);

    try {
      if (file) {
        const formData = new FormData();
        formData.append("cargo", jobTitle);
        formData.append("file", file);

        const response = await axiosInstance.post(
          `${AI_API_URL}/analisar_pdf`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } },
        );

        if (response.status === 200) {
          setSessionId(response.data.session_id);
          setMessages([{ role: "ai", content: response.data.initial_message }]);
          toast.success("Treinamento iniciado!");
        } else {
          toast.error(response.data.error || "Erro ao iniciar");
        }
      } else {
        const response = await axiosInstance.post(`${AI_API_URL}/chat`, {
          cargo: jobTitle,
        });

        if (response.status === 200) {
          setSessionId(response.data.session_id);
          setMessages([{ role: "ai", content: response.data.initial_message }]);
          toast.success("Treinamento iniciado!");
        } else {
          toast.error("Erro ao iniciar");
        }
      }
    } catch (err) {
      toast.error("Erro: " + err.message);
    }
  };

  // ==================================
  // ENVIAR MENSAGEM TEXTO
  // ==================================
  const sendChatMessage = async (messageContent) => {
    if (!messageContent.trim()) return;
    if (!sessionId || interviewComplete) return;

    const userMessage = messageContent.trim();
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setInputMessage("");

    try {
      const response = await axiosInstance.post(`${AI_API_URL}/chat`, {
        session_id: sessionId,
        message: userMessage,
      });

      if (response.status === 200) {
        const data = response.data;

        setMessages((prev) => [...prev, { role: "ai", content: data.reply }]);

        if (data.interview_complete) {
          setInterviewComplete(true);
          setReport(data.report);
          setSessionId(null);
          toast.success("Entrevista concluída!");
        }
      } else {
        toast.error(response.data.error || "Erro no chat.");
      }
    } catch (err) {
      toast.error("Erro: " + err.message);
    }
  };

  // ==================================
  // ÁUDIO: GRAVAR / PARAR
  // ==================================
  const startRecording = async () => {
    if (!sessionId) return toast.error("Inicie o treinamento primeiro.");

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      const chunks = [];
      const recorder = new MediaRecorder(stream);

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      recorder.onstop = async () => {
        stream.getTracks().forEach((t) => t.stop());
        const audioBlob = new Blob(chunks, { type: "audio/webm" });
        await sendAudioMessage(audioBlob);
      };

      setMediaRecorder(recorder);
      setIsRecording(true);
      recorder.start();
      toast("Gravando...", { icon: "🎤" });
    } catch {
      toast.error("Erro ao acessar microfone.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
      setMediaRecorder(null);
    }
  };

  // ==================================
  // ENVIAR ÁUDIO
  // ==================================
  const sendAudioMessage = async (audioBlob) => {
    toast("Transcrevendo áudio...", { icon: "🎧" });

    const formData = new FormData();
    formData.append("file", audioBlob, `audio_${Date.now()}.webm`);

    try {
      const response = await axiosInstance.post(
        `${AI_API_URL}/transcribe_audio`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } },
      );

      if (response.status !== 200) {
        toast.error("Erro na transcrição.");
        return;
      }

      const text = response.data.transcription;
      if (!text) return toast.error("Transcrição vazia.");

      toast.success("Áudio transcrito!");
      await sendChatMessage(text);
    } catch {
      toast.error("Erro ao transcrever áudio.");
    }

    // ENTER PARA ENVIAR
    const handleKeyPress = (e) => {
      if (e.key === "Enter") sendChatMessage(inputMessage);
    };

    // ==================================
    // RENDER
    // ==================================
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
            {/* COLUNA ESQUERDA */}
            <div className={styles.leftColumn}>
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
                    <FaUpload />{" "}
                    {file ? file.name : "Enviar Currículo (opcional)"}
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
            </div>

            {/* COLUNA DIREITA (CHAT) */}
            <div className={styles.rightColumn}>
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
                    <ChatMessage
                      key={index}
                      role={msg.role}
                      content={msg.content}
                    />
                  ))}
                </div>

                {report && <ReportDisplay report={report} />}

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
                      <button
                        className={styles.stopRecordingButton}
                        onClick={stopRecording}
                      >
                        <FaStop /> Parar
                      </button>
                    ) : (
                      <button
                        className={styles.recordButton}
                        onClick={startRecording}
                      >
                        <FaMicrophone /> Voz
                      </button>
                    )}

                    <button
                      className={styles.sendButton}
                      onClick={() => sendChatMessage(inputMessage)}
                    >
                      <FaPaperPlane />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
}
