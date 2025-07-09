const channelId = "UCJ6sOzgtvuCtnxb37xYWKiw";
const apiKey = "AIzaSyBunP_5CVz0l8hckYgrv1yZ5Aw5UVl1OBI";

async function carregarVideo() {
  const videoContainer = document.getElementById("video-container");

  try {
    // 1. Buscar vídeo AO VIVO
    const liveURL = `https://www.googleapis.com/youtube/v3/search?part=snippet,id&channelId=${channelId}&eventType=live&type=video&key=${apiKey}`;
    const liveResponse = await fetch(liveURL);
    const liveData = await liveResponse.json();
    console.log("Resposta ao vivo:", liveData);

    if (
      liveData.items &&
      liveData.items.length > 0 &&
      liveData.items[0].id &&
      liveData.items[0].id.videoId
    ) {
      const liveId = liveData.items[0].id.videoId;
      videoContainer.innerHTML = `
        <iframe width="100%" height="400" src="https://www.youtube.com/embed/${liveId}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
        <p style="text-align:center; color:green; font-weight: bold;">🔴 AO VIVO</p>
      `;
      return; // Sai da função pois já carregou o vídeo ao vivo
    }

    // 2. Se não tem vídeo ao vivo, buscar o último vídeo postado
    const lastVideoURL = `https://www.googleapis.com/youtube/v3/search?part=snippet,id&channelId=${channelId}&maxResults=1&order=date&type=video&key=${apiKey}`;
    const lastResponse = await fetch(lastVideoURL);
    const lastData = await lastResponse.json();
    console.log("Resposta último vídeo:", lastData);

    if (
      lastData.items &&
      lastData.items.length > 0 &&
      lastData.items[0].id &&
      lastData.items[0].id.videoId
    ) {
      const videoId = lastData.items[0].id.videoId;
      videoContainer.innerHTML = `
        <iframe width="100%" height="400" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
        <p style="text-align:center; color:gray; font-weight: bold;">⚪ Última Transmissão</p>
      `;
    } else {
      // Nenhum vídeo encontrado
      videoContainer.innerHTML = "<p style='text-align:center; color:#777;'>Nenhum vídeo encontrado no canal.</p>";
    }
  } catch (erro) {
    console.error("Erro ao carregar o vídeo:", erro);
    videoContainer.innerHTML = "<p style='text-align:center; color:red;'>Erro ao carregar vídeo. Tente novamente mais tarde.</p>";
  }
}

document.addEventListener("DOMContentLoaded", carregarVideo);
