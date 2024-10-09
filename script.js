var nextLineIdx = 0
var lastTime = -1
var times = []
var promptHidden = false

function getNext() {
	// Log times
	if (nextLineIdx > lines.length) {
		return;
	}

	const currTime = Date.now()
	if (nextLineIdx > 0) times.push(currTime - lastTime)
	lastTime = currTime

	if (nextLineIdx == lines.length) {
		// Raise complete flag
		$("#completeOverlay").show()
		$("#copybutton").removeAttr("disabled");
		$('#chatboxedge')[0].scrollTop = 0
		nextLineIdx++
		return;
	}

	// Display next
	const line = lines[nextLineIdx++]
	$("#chatbox").append(`<div class="chatmessage"><div class="chatspeaker">${line.speaker}</div><div class="chatcontent">${line.content}</div></div>`)
	$("#chatboxedge").animate({
		scrollTop: $('#chatboxedge')[0].scrollHeight - $('#chatboxedge')[0].clientHeight
	}, 100);
}

function copyResult() {
	navigator.clipboard.writeText(times.join('\n'))
}

function reset() {
	nextLineIdx = 0
	lastTime = -1
	times = []
	$("#completeOverlay").hide()
	$("#copybutton").attr("disabled", true)
	$("#chatbox").empty()
}

function togglePrompts() {
	if (promptHidden) {
		$("#prompts").hide()
	}
	else {
		$("#prompts").show()
	}
	promptHidden = !promptHidden
}

$(document).ready(() => {
	reset()
})