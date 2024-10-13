let btn=document.querySelector("#btn")
let content=document.querySelector("#content")
let voice=document.querySelector("#voice")


function speak(text){
    let text_speak=new SpeechSynthesisUtterance(text)
    text_speak.rate=1
    text_speak.pitch=1
    text_speak.volume=1
    text_speak.lang="en-IN"
    window.speechSynthesis.speak(text_speak)
}

function wishMe(){
    let day=new Date()
    let hours=day.getHours()
    if(hours>=0 && hours<12){
        speak("Good Morning Sir")
    }
    else if(hours>=12 && hours <16){
        speak("Good Afternoon Sir")
    }else{
        speak("Good Evening Sir")
    }
}// Function to request microphone access
async function requestMicrophoneAccess() {
    try {
        // Request access to the microphone
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        
        // If permission is granted, handle the audio stream
        console.log('Microphone access granted:', stream);
        
        // You can now use the stream for audio processing
        // For example, you can create an AudioContext or attach the stream to an audio element
        
    } catch (error) {
        // Handle the error if permission is denied or there's an issue
        console.error('Error accessing microphone:', error);
        if (error.name === 'NotAllowedError') {
            alert('Microphone access denied. Please check your browser settings.');
        } else {
            alert('An error occurred while trying to access the microphone.');
        }
    }
}

// Call the function to request microphone access
requestMicrophoneAccess();

window.addEventListener('load',()=>{
    wishMe()
})
let speechRecognition= window.SpeechRecognition || window.webkitSpeechRecognition
let recognition =new speechRecognition()
recognition.onresult=(event)=>{
    let currentIndex=event.resultIndex
    let transcript=event.results[currentIndex][0].transcript
    content.innerText=transcript
    takeCommand(transcript.toLowerCase())
}

btn.addEventListener("click",()=>{
    recognition.start()
    btn.style.display="none"
    voice.style.display="block"
})
function takeCommand(message){
    btn.style.display="flex"
    voice.style.display="none"
    if(message.includes("hello")||message.includes("hey")){
        speak("hello sir,what can i help you?")
    }
    else if(message.includes("who are you")){
        speak("i am boojo, a virtual assistance created by tushar sir")
    }else if(message.includes("open youtube")){

        speak("opening youtube...")
        window.open("https://www.youtube.com","_blank")
    }
    if(message.includes("kya khaye ho babu")||message.includes("kuch khaye ho babu")){
        speak("haaan maama chocolate khaye h") 

}
else if(message.includes("open calculator")){

    speak("opening calculator sir...")
    window.open("calculator://")
}
else if(message.includes("open instagram")){

    speak("opening instagram sir...")
    window.open("https://instagram.com","_blank")

}else if(message.includes("open facebook")){

        speak("opening facebook sir...")
        window.open("https://facebook.com","_blank")

    }else if(message.includes("open google")){

        speak("opening google sir...")
        window.open("https://www.google.com","_blank")
    }
    else{
        let finalText="this what i found on internet regarding" + message.replace("bujo","") || message.replace("bujjo","")
        speak(finalText)
        window.open(`https://www.google.com/search?q=${message.replace("bujo","")||message.replace("bujjo","")}`)
    }

}
