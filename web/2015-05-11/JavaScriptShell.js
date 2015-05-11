(function (doc) {
    var $ = function (_) {
            return doc.getElementById(_);
        },

        content = $('content'),

        input = $('input'),

        GlobalStep = [],
        GlobalFlag,

        div = doc.createElement('DIV'),

        regWhite = /\s|\f|\n|\r|\t|\v/img,

        reg = /[^\d]+/g,

        regLine = /\n/g;

    input.onkeydown = function (e) {
        e = e || window.event;

        var keyCode = e.which || e.keyCode,
            val = this.value,
            height, keyMap = {
                up: 38,
                down: 40,
                enter: 13
            },
            result;

        if (!val.replace(regWhite, '') && keyCode != keyMap.up && keyCode != keyMap.down && keyCode != keyMap.enter) {
            return;
        }

        if (e.shiftKey && keyCode == keyMap.enter) {
            height = window.getComputedStyle ? window.getComputedStyle(this, false).height
                : this.currentStyle.height;

            this.style.height = ((+height.replace(reg, '')) + 15 ) + 'px';

        } else if (val.replace(regWhite, '') && keyCode == keyMap.enter) {
            div.innerHTML = '<p><span>&lt;</span><span class="output">' + val.replace(regLine, '<br>') + '</span></p>';

            content.appendChild(div.firstChild);
            this.style.height = '30px';
            GlobalStep.push(val);

            try{
                result = window[window.execScript ? 'execScript' : 'eval'](val);
                div.innerHTML = '<p><span>&gt;</span><span class="output">' + result + '</span></p>';

                content.appendChild(div.firstChild);
            } catch(e) {
                div.innerHTML = '<p style="color:red;"><span>&gt;</span><span class="output">' + e.message + '</span></p>';

                content.appendChild(div.firstChild);
                console.dir(e);
            }
            this.value = div.innerHTML = '';
        } else if (keyCode == keyMap.up) {
            GlobalFlag = GlobalFlag === undefined ? (GlobalStep.length == 0 ? 0 :  GlobalStep.length - 1) : (GlobalFlag == 1 ? 0 : GlobalFlag - 1) ;

            this.value = GlobalStep[GlobalFlag] || '';
        } else if (keyCode == keyMap.down) {
            //GlobalFlag = GlobalFlag === undefined ? (GlobalStep.length - 1) : (GlobalFlag - 1 > 0 ? ) ;
        } else {
            this.value = '';
        }
    };

    $('clearConsoleLog').click(function(){
        content.innerHTML = '';
    });

    /**
     *当页面被激活的时候，或者页面被点击的时候，textarea均获取焦点
     * */
    window.onfocus = function(){
        input.focus();
    }
})(document);