const channelId = "UCJ6sOzgtvuCtnxb37xYWKiw";
const apiKey = "AIzaSyBunP_5CVz0l8hckYgrv1yZ5Aw5UVl1OBI"; 

async function carregarVideo() {
    const videoContainer = document.getElementById("video-container");

    try {
        const liveURL = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&eventType=live&type=video&key=${apiKey}`;
        const liveResponse = await fetch(liveURL);
        const liveData = await liveResponse.json();

        if (liveData.items && liveData.items.length > 0) {
            const liveId = liveData.items[0].id.videoId;
            videoContainer.innerHTML = `
                <iframe width="100%" height="400" src="https://www.youtube.com/embed/${liveId}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                <p style="text-align:center; color:green;">🔴 Ao Vivo</p>
            `;
        } else {
            const lastVideoURL = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=1&order=date&type=video&key=${apiKey}`;
            const lastResponse = await fetch(lastVideoURL);
            const lastData = await lastResponse.json();

            if (lastData.items && lastData.items.length > 0) {
                const videoId = lastData.items[0].id.videoId;
                videoContainer.innerHTML = `
                    <iframe src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                    <p style="text-align:center; color:gray;">⚪ Última Transmissão</p>
                `;
            } else {
                videoContainer.innerHTML = "<p>Nenhum vídeo encontrado no canal.</p>";
            }
        }
    } catch (erro) {
        console.error("Erro ao carregar o vídeo:", erro);
        videoContainer.innerHTML = "<p>Erro ao carregar vídeo. Tente novamente mais tarde.</p>";
    }
}

document.addEventListener("DOMContentLoaded", carregarVideo);
