(function() {
	
    var loginScreen = document.getElementById('login_screen');
    var loginField = document.getElementById('login_field');

    var desktopScreen = document.getElementById('desktop_screen');
    var leftCodeText = document.getElementById('leftCodeText');
    var typingContainer = document.getElementById('typingContainer');
    var typeAreaText = document.getElementById('typeAreaCode');

    var leftCodeContents;
    var typeAreaPos = 0;
    var typingContainerActive = false;

    //Initilise
    function init(){
        loginField.focus();
        window.addEventListener('keypress', passwordEntered);
    }

    function passwordEntered(e){
        if(e.keyCode == 13){
            exitLogin();
            activateDesktop();
        }
    }

    function exitLogin(){
        hide(loginScreen);
    }

    function activateDesktop(){
        show(desktopScreen);
        startCodeScroll();
        startTextType();
        typeAreaText.focus();
    }

    //Text type
    function startTextType(){
        window.addEventListener('keypress',keyboardPressed);
        typingContainerActive = true;
        showTextType();
    }

    function showTextType(){
        typingContainer.classList.remove('hidden');
        typeAreaText.focus();
    }

    function hideTextType(){
        typingContainer.classList.add('hidden');
    }

    function keyboardPressed(e){
        /*
        lastKeycodePressed = e.keyCode;

        if(lastKeycodePressed == 13){
            if(typingContainerActive){
                showTextType();
            } else {
                hideTextType();
            }

            typingContainerActive = toggleBoolean(typingContainerActive);
            lastKeycodePressed = 0;
        }
        */

        if(typingContainerActive){
            updateCodeArea();
            animateKeyboard(e.keyCode);
        }
    }

    function updateCodeArea(){
        typeAreaText.innerHTML += leftCodeContents[typeAreaPos] + '<br />';
        typeAreaText.scrollTop = typeAreaText.scrollHeight;

        if(typeAreaPos > leftCodeContents.length) {
            typeAreaPos = 0;
        } else {
            typeAreaPos++;
        }
    }

    function animateKeyboard(keyCode){
        var key = document.getElementsByClassName(keyCode);
        if(key[0]){
            if(hasClass(key[0],'pressed')){
                key[0].classList.remove('pressed');
                key[0].classList.add('repressed');
            } else if(hasClass(key[0],'repressed')){
                key[0].classList.add('pressed');
                key[0].classList.remove('repressed');
            } else {
                key[0].classList.add('pressed');
            }
        }
    }

    //Code Scroll
    function startCodeScroll(){
        getFile('./assets/data/code.txt', putFile);
    }

    function putFile(contents){
        var bufferText = contents;
        leftCodeContents = bufferText.split('\n');
        var codePushInterval = setInterval( pushCode, 200);
    }

	function pushCode(){
		if(Math.random() >= 0.4){
			leftCodeText.innerHTML += leftCodeContents[randInt(leftCodeContents.length)] + '<br />';
			leftCodeText.scrollTop = leftCodeText.scrollHeight;
		}
	}

    //Misc
    function show(obj){
        if(obj){
            obj.classList.remove('hidden');
        }
    }

    function hide(obj){
        if(obj){
            obj.classList.add('hidden');
        }
    }

	function randInt(max){
		return Math.floor(Math.random() * Math.floor(max));
	}

    function hasClass(el, cls) {
        return el.className && new RegExp("(\\s|^)" + cls + "(\\s|$)").test(el.className);
    }

    function getFile(filePath, callback){
        var xhr = new XMLHttpRequest();
        xhr.open('GET', filePath, true);
        xhr.onreadystatechange = function(){
            if(this.readyState == 4) return;
            if(this.status !== 200) return;
            callback(this.responseText);
            return;
        };
        xhr.send();
    }

    function toggleBoolean(bool){
        if(bool === true){
            return false;
        } else {
            return true;
        }
    }

    //Init
    init();

})();