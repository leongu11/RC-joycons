//website side

const pitch = document.getElementById("pitch");
const throttle = document.getElementById("throttle");

pitch.addEventListener("input", send);
throttle.addEventListener("input",send);

function send() {

	const pitchVal = parseInt(pitch.value);
	const throttleVal = parseInt(throttle.value);
	console.log(pitchVal,throttleVal);
	
}

//controllerside


window.addEventListener("gamepadconnected", (event) => {
	console.log("gamepad connected");
	console.log(event.gamepad.id);
});

//websocket


const ws = new WebSocket("ws://10.0.0.238:5432");

ws.addEventListener('open', () => {
	console.log('connected to server');
});
const wsFlag = false

//for reconnections etcs ty stackoverflow
function readyState() {
	if (ws.readyState === ws.OPEN) {
		return true
	}
	//make new
	else if (ws.readyState === ws.CLOSED && wsFlag === false) {
		let ws = new WebSocket("ws://10.0.0.238:5432");
		ws.addEventListener('open', () => {
			console.log('reconnecting');
		});
		return false;
	}
}

//loop to check state

function pollGamepad() {
	
	const gamepads = navigator.getGamepads();
	
	//loop to check nulls and not proceed
	
	for (let gp of gamepads) {
		if (gp === null) continue;
	
	
		if (gp.id.includes("Joy-Con")) {
			const xAxis = gp.axes[0];
			const yAxis = gp.axes[1];
			const stopBut = gp.buttons[0].pressed;
			//js rounds for printing, dont use for math -- add a system which takes certain thresholds and determines direction
			//update the web w/thresholds
			
			//pitch
			if (xAxis>0.5) {
				document.getElementById('pitch').value = 1;
			}
			else if (xAxis<-0.5) {
				document.getElementById('pitch').value = -1;
			}
			
			else {
				document.getElementById('pitch').value = 0;
			}
			//throttles
			if (yAxis>0.5) {
				document.getElementById('throttle').value --;
			}
			
			else if (yAxis<-0.5) {
				document.getElementById('throttle').value ++;
			}
			
			if (readyState()) {
				motorData = [document.getElementById('throttle').value,document.getElementById('pitch').value,stopBut]
				ws.send(JSON.stringify(motorData));
			}
			
			else {
				console.log("BAD");
			}
		}
		//recursive-type infinite call
	}
	requestAnimationFrame(pollGamepad);
	
}

pollGamepad();


