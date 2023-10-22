let speech = new SpeechSynthesisUtterance();
let voices = [];
let voiceSelect = document.querySelector("select");
let playButton = document.querySelector("button");

// Nova variável para armazenar a voz selecionada
let selectedVoice = null;

window.speechSynthesis.onvoiceschanged = () => {
    voices = window.speechSynthesis.getVoices();

    // Atualiza a voz selecionada para a primeira voz disponível
    selectedVoice = voices[0];

    voices.forEach((voice, i) => (voiceSelect.options[i] = new Option(voice.name, i)));
};

voiceSelect.addEventListener("change", () => {
    // Atualiza a voz selecionada para a voz selecionada pelo usuário
    selectedVoice = voices[voiceSelect.value];
});

playButton.addEventListener("click", function() {
    if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
        playButton.innerHTML = '<i class="fas fa-play"></i>  Speech';
    } else {
        speech.text = document.querySelector("textarea").value;

        // Define a voz da SpeechSynthesisUtterance para a voz selecionada
        speech.voice = selectedVoice;

        window.speechSynthesis.speak(speech);
        playButton.innerHTML = '<i class="fas fa-stop"></i>  Speech';

        speech.onend = function() {
            playButton.innerHTML = '<i class="fas fa-play"></i>  Speech';
        };
    }
});
