import { useState } from "react";
import toast from "react-hot-toast";

export default function useAudioRecorder(onAudioReady) {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      const chunks = [];
      const recorder = new MediaRecorder(stream);

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      recorder.onstop = () => {
        stream.getTracks().forEach((t) => t.stop());
        const audioBlob = new Blob(chunks, { type: "audio/webm" });
        if (onAudioReady) {
          onAudioReady(audioBlob);
        }
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

  return { isRecording, startRecording, stopRecording };
}
