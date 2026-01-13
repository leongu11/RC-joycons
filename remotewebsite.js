

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
	console.log(event.gamepad.id)
});

//loop to check state

function pollGamepad() {
	
	const gamepads = navigator.getGamepads();
	
	//loop to check nulls and not proceed
	
	for (let gp of gamepads) {
		if (gp === null) continue;
	
	
		if (gp.id.includes("Joy-Con")) {
			const xAxis = gp.axes[0];
			const stopBut = gp.buttons[0].pressed;
			//js rounds for printing, dont use for math -- add a system which takes certain thresholds and determines direction
			console.log(xAxis.toFixed,stopBut);
		}
		//recursive-type infinite call
	}
	requestAnimationFrame(pollGamepad);
	
}

pollGamepad();
