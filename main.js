window.onload = async function() {
    let fakeLoading = document.querySelector(".load"),
        skipTyping = false,
        typedMsg = new TypeIt(".faketype", {
        strings: " <span style='color:#F9F1A5'>cd</span> c:/Users/ddohy/Documents/Portfolio & nav.ps1",
        lifeLike: true,
        speed: 15,
        cursor: false,
        afterStep: function() {
            if (skipTyping) {
                document.querySelector(".faketype").innerHTML = " <span style='color:#F9F1A5'>cd</span> c:/Users/ddohy/Documents/Portfolio & nav.ps1"
            }
        }
    })
    
    function skipEvent() {
        skipTyping = true;
        clearTimeout(currentWait)
        fakeLoading.innerHTML = '<br><br>Initializing nav.ps1...<br>Initialized.<br><br>Opening default file...<br>"basics.txt" successfully opened.<br><br>1. <a href="/">basics.txt</a><br>2. <a href="/">education_and_skills.txt</a><br>3. <a href="/">projects.exe</a><br><br>Which file would you like to view next? Please click or type selection. <input id="userInput" type="text"></input><span class="flashing">|</span>'
    }

    function removeListeners() {
        document.removeEventListener('keyup', spaceEventHandler);
        document.removeEventListener('touchstart', touchEventHandler);
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
        console.log("resizeInput call.")
        this.style.width = this.value.length + "ch";
    }

    const spaceEventHandler = event => {
        if (event.code === 'Space') {
            skipEvent();
            removeListeners()
        }
    };
    
    const touchEventHandler = event => {
        skipEvent();
        removeListeners()
    };

    document.addEventListener('keyup', spaceEventHandler)
    document.addEventListener('touchstart', touchEventHandler)
    
    setTimeout(removeListeners, 5000)

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
    fakeLoading.innerHTML += '<br>"basics.txt" successfully opened.<br><br>1. <a href="/">basics.txt</a><br>2. <a href="/">education_and_skills.txt</a><br>3. <a href="/">projects.exe</a><br><br>Which file would you like to view next? Please click or type selection. <input id="userInput" type="text"></input><span class="flashing">|</span>'

    setInterval(() => {
        let input = document.querySelector("#userInput");
        if (input) {
            input.addEventListener("input", resizeInput);
            resizeInput.call(input);
        }
    }, 100);
}