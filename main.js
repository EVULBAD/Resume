window.onload = async function() {
    // Declarations.
    let fakeLoading = document.querySelector(".load"),
        skipTyping = false,
        typedMsg = new TypeIt(".faketype", {
        strings: " <span style='color:#F9F1A5'>cd</span> c:/Users/ddohy/Documents/Portfolio & nav.ps1",
        lifeLike: true,
        speed: 15,
        afterStep: function() {
            if (skipTyping) {
                document.querySelector(".faketype").innerHTML = " <span style='color:#F9F1A5'>cd</span> c:/Users/ddohy/Documents/Portfolio & nav.ps1"
            }
        },
        afterComplete: function (instance) {
            instance.destroy();
        }
    })
    
    // Functions.
    function skipEvent() {
        skipTyping = true;
        clearTimeout(currentWait)
        fakeLoading.innerHTML = '<br><br>Initializing nav.ps1...<br>Initialized.<br><br>Opening default file...<br>"basics.txt" successfully opened.<br><br>1. <a href="#">basics.txt</a><br>2. <a href="#">education_and_skills.txt</a><br>3. <a href="#">projects.exe</a><br><br>Which file would you like to view next? Please click or type selection.<span id="inputfocus"> <input id="userInput" type="text"></input><span class="flashing">|</span></span>'
        document.getElementById("userInput").focus();
        removeListeners();
    }

    function removeListeners() {
        document.removeEventListener("keyup", spaceEventHandler);
        document.removeEventListener("touchstart", touchEventHandler);
    }

    function wait(ms) {
        return new Promise(resolve => {
            if (skipTyping) {
                resolve();
            } else {
                this.currentWait = setTimeout(resolve, ms)
            }
        });
    }

    function resizeInput() {
        this.style.width = this.value.length + "ch";
    }

    function focusCursor() {
        document.getElementById("userInput").focus();
    }

    function getFile(input) {
        if (input === "1") {
            return "basics.txt"
        } else if (input === "2") {
            return "educations_and_skills.txt"
        } else if (input === "3") {
            return "projects.exe"
        } else {
            return false
        }
    }

    // Animation-cancelling event handlers.
    const spaceEventHandler = event => {
        if (event.code === "Space") {
            skipEvent();
            removeListeners()
        }
    };
    
    const touchEventHandler = event => {
        skipEvent();
        removeListeners()
    };

    const enterEventHandler = event => {
        if (event.code === "Enter") {
            let val = document.getElementById("userInput").value
            val = getFile(val)
            console.log(val)
        }
    };

    // Animation-cancelling event listeners.
    document.addEventListener("keyup", spaceEventHandler)
    document.addEventListener("touchstart", touchEventHandler)

    // Text input .
    const checkInputInterval = setInterval(() => {
        let input = document.getElementById("userInput"),
            inputFocus = document.getElementById("inputfocus");

        if (input) {
            input.addEventListener("input", resizeInput);
            inputFocus.addEventListener("click", focusCursor)
            document.addEventListener("keyup", enterEventHandler)
            resizeInput.call(input);
            clearInterval(checkInputInterval);
        }
    }, 100);

    await wait(1000)
    if (!skipTyping) {
        typedMsg.go();
    }
    await wait(2500);
    fakeLoading.innerText = "\n\nInitializing nav.ps1..."
    await wait(1000)
    fakeLoading.innerText += "\nInitialized."
    fakeLoading.innerText += "\n\nOpening default file..."
    await wait(1500)
    fakeLoading.innerHTML += '<br>"basics.txt" successfully opened.<br><br>1. <a href="#">basics.txt</a><br>2. <a href="#">education_and_skills.txt</a><br>3. <a href="#">projects.exe</a><br><br>Which file would you like to view next? Please click or type selection.<span id="inputfocus"> <input id="userInput" type="text"></input><span class="flashing">|</span></span>'

    document.getElementById("userInput").focus();
    setTimeout(removeListeners, 5000)
}