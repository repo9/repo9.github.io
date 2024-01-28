function GUILocalization(){
    document.querySelector("#newGame").textContent = "Reset";
    document.querySelector("#reveal").textContent = "Solution";
    //document.querySelector("#hint").textContent = "hint".replace(/<br>/g, '\r\n');
    document.querySelector("option[value='beginner']").textContent = "Tall Lv";
    document.querySelector("option[value='moderate']").textContent = "Grande Lv";
    document.querySelector("option[value='hard']").textContent = "Venti Lv";
    document.querySelector("option[value='expert']").textContent = "Trenta Lv";

    document.querySelector(".aside-time #current .title").textContent = "Time";
    document.querySelector(".aside-time #record .title").textContent = "Best";
}

let Storage = {
    setValue : (key, value) => { localStorage[key] = JSON.stringify(value); },
    getValue : (key) => {
        let result = undefined;
        try {
            if (localStorage[key]) result = JSON.parse(localStorage[key]);
        } catch (e) {
            throw new StorageError(`Error in localStorage[${key}] value. ${localStorage[key]}`);
        }
        return result; 
    }
};

/**
 * StorageError
 * @param   string      _msg    Error message    
 */
class StorageError extends Error {
    constructor(_msg){
        super();
        this.name = 'StorageError';
        this.message = _msg || 'Storage Error';
        this.stack = (new Error()).stack;
    }
}

/**
 * ExceptionHandler
 * @param   object  e   Error Object
 */
function ExceptionHandler(e){
    if (e instanceof StorageError) {
        console.log(`${e.name} : ${e.message}`);
    } else {
        console.log(e);
    }
}

/**
 * MessageBox
 * @param   string  _title
 * @param   string  _msg        
 * @param   object  _buttons    [{"id":(string), "name":(string), "action":{"click":(function),...}},...]
 */
class MessageBox {
    constructor(_title, _msg, _buttons) {

        this.overlayDOM = document.querySelector('.overlay') ? document.querySelector('.overlay') : document.createElement('div');
        this.overlayDOM.className = "overlay";
        this.overlayText = document.querySelector('.overlay > .overlay-text') ? document.querySelector('.overlay > .overlay-text') : document.createElement('div');
        this.overlayText.className = "overlay-text";
        this.overlayText.textContent = _msg;
        !document.querySelector('.overlay') && this.overlayDOM.append(this.overlayText);
        let main = document.querySelector('.content');
        main.className = "content show_overlay";
        !document.querySelector('.overlay') && main.append(this.overlayDOM);


        //var btnBoxEl = document.createElement('div');
        //btnBoxEl.className = "overlay-btn-box";

        let removeBtns = document.querySelectorAll('.overlay-btn');
        for (let i = 0; i < removeBtns.length; i++) {
            this.overlayDOM.removeChild(removeBtns[i]);
            //btnBoxEl.removeChild(removeBtns[i]);
        }
        //this.overlayDOM.removeChild(btnBoxEl);

        for (let btn of _buttons) {
            if(btn.id == "buttonNo"){
                var el = document.createElement('button');
                el.className = "overlay-btn-cancel";
                el.setAttribute("id", btn.id);
                el.textContent = btn.name;
                el.onclick =  (event) => { btn.action['click'](event); };

                //btnBoxEl.append(el);

                this.overlayDOM.append(el);

            }else{
                var el = document.createElement('button');
                el.className = "overlay-btn";
                el.setAttribute("id", btn.id);
                el.textContent = btn.name;
                el.onclick =  (event) => { btn.action['click'](event); };

                //btnBoxEl.append(el);

                this.overlayDOM.append(el);

            }

        }

        //this.overlayDOM.append(btnBoxEl);
    }
    hide() {
        let main = document.querySelector('.content');
        main.className = "content";
        main.removeChild(this.overlayDOM);
    }
}

/**
 * ConfirmBox
 * @param   string      _msg
 * @param   function    _fn    
 * @param   array       _fn_args    function's _fn arguments
 */
class ConfirmBox extends MessageBox {
    constructor(_msg, _fn, ..._fn_args){
        super("Confirm that action", _msg, [{
            "id"    : "buttonYes",
            "name"  : "ok",
            "action": {
                "click" : (event) => { this.hide(); _fn(..._fn_args); }
            }
        },{
            "id"    : "buttonNo",
            "name"  : "cancel",
            "action": {
                "click" : (event) => { this.hide(); let dl = Storage.getValue("level"); document.querySelector('select').selectedIndex = dl - 1;}
            }
        }]);
    }
}

/**
 * CongratBox
 * @param   string      _msg
 * @param   function    _fn    
 * @param   array       _fn_args    function's _fn arguments
 */
class CongratBox extends MessageBox {
    constructor(_msg, _fn, ..._fn_args){
        super("Acknowledge This Message", _msg, [{
            "id"    : "buttonAlertOk",
            "name"  : "OK",
            "action": {
                "click" : (event) => { _fn(..._fn_args); this.hide();}
                //"click" : (event) => { this.hide(); _fn(); }
            }
        }]);
    }
}

/**
 * GameTimer
 */
class GameTimer {
    constructor() {
        this.interval_id = null;
        this.start_time = 0;
        this.timerDOM = document.querySelector('.aside-time #current .time');
        this.recordDOM = document.querySelector('.aside-time #record .time');
        
        this.recordDOM.textContent = Storage.getValue("record_in_" + difficulty) ? this.format(Storage.getValue("record_in_" + difficulty)) : '-';
    }
    start(restore) {
        this.interval_id && clearInterval(this.interval_id);
        this.start_time = new Date().getTime();
        if (restore) {
            this.start_time -= Storage.getValue("time") || 0;
        }
        Storage.setValue("start_time", this.start_time);
        this.tick();
        this.interval_id = setInterval(function() {this.tick();}.bind(this), 1000);
        
        this.recordDOM.textContent = Storage.getValue("record_in_" + difficulty) ? this.format(Storage.getValue("record_in_" + difficulty)) : '--:--:--';
    }
    stop() {
        clearInterval(this.interval_id);
        this.tick();
        
        let time = Storage.getValue("time");
        let record = Storage.getValue("record_in_" + difficulty) || (time + 1);
        
        if (time < record) {
            record = time;
            Storage.setValue("record_in_" + difficulty, record);
            this.recordDOM.textContent = this.format(record);
        }
    }
    disable() {
        clearInterval(this.interval_id);
        this.timerDOM.textContent = '00:00:00';
    }
    tick() {
        let time = new Date().getTime() - this.start_time;
        Storage.setValue("time", time);
        this.timerDOM.textContent = this.format(time);
    }
    format(mss) {
        //mss = 18000000
        mss = Math.round(mss / 1000);
        let mins = parseInt(mss / 60);
        let secs = mss % 60;
        let hour = parseInt(mins / 60);
        if(mins >= 60){
            mins = mins % 60;
        }
        return (hour < 10 ? '0' + hour : hour) + ':'+ (mins < 10 ? '0' + mins : mins) + ':' + (secs < 10 ? '0' + secs : secs);
    }
}

/**
 * Collision checker
 */
function checkForWin() {
    let matrix = [];
    let win = true;
    for (let i = 0; i < 9; i++) {
        matrix[i] = [];
    }
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            var sq = document.querySelector(`#square_${i}_${j}`);
            var val = sq.className.indexOf('sudoku-square--static') === -1 ? parseInt(document.querySelector(`#square_${i}_${j} > .sudoku-input > .sudoku-input-value`).textContent) : parseInt(document.querySelector(`#square_${i}_${j} > .sudoku-solve`).textContent);
            matrix[i][j] = isNaN(val) ? 0 : val;
        }
    }
    let arrs = [];
    for (let i = 0; i < 9; i++) {
        let arr = [];
        for (let j = 0; j < 9; j++) {
            if (matrix[i][j] <= 0) {
                win = false;
            }
            arr.push(matrix[i][j]);
        }
        arrs.push(arr);
    }
    for (let j = 0; j < 9; j++) {
        let arr = [];
        for (let i = 0; i < 9; i++) {
            if (matrix[i][j] <= 0) {
                win = false;
            }
            arr.push(matrix[i][j]);
        }
        arrs.push(arr);
    }
    for (let iS = 0; iS < 3; iS++) {
        for (let jS = 0; jS < 3; jS++) {
            let arr = [];
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    arr.push(matrix[iS * 3 + i][jS * 3 + j]);
                }
            }
            arrs.push(arr);
        }
    }
    
    document.querySelectorAll('.error').forEach(function(square) {
        square.classList.remove('error');
    });
    let cols_clsns = {};
    let rows_clsns = {};
    for (let n = arrs.length - 1; n >= 0; n--) {
        for (let k = 1; k <= 9; k++) {
            let idx1 = arrs[n].indexOf(k);
            let idx2 = arrs[n].lastIndexOf(k);
            if (idx1 >= 0 && idx1 != idx2) {
                win = false;
                // rows handling
                if (n < 9 && (!rows_clsns[n] || rows_clsns[n].indexOf(idx1 + '_' + idx2) < 0)) {
                    document.querySelectorAll('[id^=square_' + n + ']').forEach(function(square) {
                        square.classList.add('error');
                    });
                }
                // cols handling
                if (n >= 9 && n < 18 && (!cols_clsns[n - 9] || cols_clsns[n - 9].indexOf(idx1 + '_' + idx2) < 0)) {
                    document.querySelectorAll('[id^=square_][id$=_' + (n - 9) + ']').forEach(function(square) {
                        square.classList.add('error');
                    });
                }
                // grids handling
                if (n >= 18) {
                    let _col1 = ((n - 18) % 3) * 3 + idx1 % 3;
                    let _row1 = (parseInt((n - 18) / 3)) * 3 + parseInt(idx1 / 3);
                    let _col2 = ((n - 18) % 3) * 3 + idx2 % 3;
                    let _row2 = (parseInt((n - 18) / 3)) * 3 + parseInt(idx2 / 3);
                    if (_col1 == _col2) {
                        if (!cols_clsns[_col1]) {
                            cols_clsns[_col1] = [];
                        }
                        cols_clsns[_col1].push(_row1 + '_' + _row2);
                    }
                    if (_row1 == _row2) {
                        if (!rows_clsns[_row1]) {
                            rows_clsns[_row1] = [];
                        }
                        rows_clsns[_row1].push(_col1 + '_' + _col2);
                    }
                    document.querySelectorAll('#sudokuSection' + (n - 18) + ' .sudoku-square').forEach(function(square) {
                        square.classList.add('error');
                    });
                }
            }
        }
    }
    
    return win;
}

/**
 * initEmptyGameBoard
 */
function initEmptyBoard() {
    Storage.setValue("isInitSudoku", true);
    let divs = document.getElementById("sudoku").getElementsByTagName("DIV");
    for (let i = 0; i < divs.length; i++) {
        if (divs[i].className.indexOf("sudoku-square") !== -1) {
            let sp = divs[i].getElementsByTagName("DIV");
            let sps = sp[1].getElementsByTagName("DIV");
            for (let div of sps) {
                div.textContent = "";
            }
            sp[1].setAttribute("tabindex", -1);
        }
    }
}

/**
 * fillVisibleSudokuSquare
 * @param   DOM     sqDOM   sudoku square DOM element
 */
function fillVisibleSudokuSquare(sqDOM) {
    sqDOM.className = "sudoku-square sudoku-square--static";
    sqDOM.getElementsByTagName("DIV")[1].removeAttribute("tabindex");
}

/**
 * selectSudokuSquare
 * @param   EVENT   event   click event
 * @param   DOM     sqDOM   sudoku square DOM element
 */
function selectSudokuSquare(event, sqDOM) {
    hint && (hint.removeChild(hint.querySelector('.sudoku-hint')), hint = null);
    /*
    document.getElementById("hintDiv").style.display = "none";
    document.getElementById("hintUpDiv").style.display = "none";
    */
    sqDOM || (sqDOM = event.target.parentNode);
    if (!win && sqDOM.className.indexOf("sudoku-square--static") === -1) {
        selectedSquare = sqDOM.closest(".sudoku-square");
        event && event.target.focus();
    }
}

/**
 * newGenerateSudokuBoard
 */
function newGenerateSudokuBoard() {
    this.limit = 10000;

    this.numbers = () =>
        new Array(9)
        .join(" ")
        .split(" ")
        .map((num, i) => i + 1);

    this.randomRow = () => {
        let row = [];
        let numbers = this.numbers();
        while (row.length < 9) {
            let index = Math.floor(Math.random() * numbers.length);
            row.push(numbers[index]);
            numbers.splice(index, 1);
        }
        return row;
    }

    this.result = new Array(9 * 9)
        .join(" ")
        .split(" ")
        .map(entry => null);

    this.map = new Array(9 * 9)
        .join(" ")
        .split(" ")
        .map(path => this.randomRow());

    this.stack = [];

    this.toRows = function(arr) {
        let row = 0;
        let asRows = new Array(9)
            .join(" ")
            .split(" ")
            .map(row => []);

        for (let [index, entry] of arr.entries()) {
            asRows[row].push(entry);

            if (!((index + 1) % 9)) {
                row += 1;
            }
        }

        return asRows;
    }

    this.validate = function(map, number, index) {
        let rowIndex = Math.floor(index / 9);
        let colIndex = index % 9;

        let row = map.slice(rowIndex * 9, 9 * (rowIndex + 1));

        let col = map.filter((e, i) => i % 9 === colIndex);

        let boxRow = Math.floor(rowIndex / 3);
        let boxCol = Math.floor(colIndex / 3);

        let box = map.filter((e, i) =>
            Math.floor(Math.floor(i / 9) / 3) === boxRow &&
            Math.floor((i % 9) / 3) === boxCol
        );

        return {
            row: {
                first: row.indexOf(number),
                last: row.lastIndexOf(number)
            },
            col: {
                first: col.indexOf(number),
                last: col.lastIndexOf(number)
            },
            box: {
                first: box.indexOf(number),
                last: box.lastIndexOf(number)
            }
        };
    }

    this._validate = function(map, index) {
        if (!map[index].length) {
            return false;
        }

        this.stack.splice(index, this.stack.length);

        let path = map[index];
        let number = path[path.length - 1];

        let didFoundNumber = this.validate(this.stack, number, index);

        return (
            didFoundNumber.col.first === -1 &&
            didFoundNumber.row.first === -1 &&
            didFoundNumber.box.first === -1
        );
    }

    this._generate = function(map, index) {
        if (index === 9 * 9) {
            return true;
        }

        if (--this.limit < 0) {
            return false;
        }

        var path = map[index];

        if (!path.length) {
            map[index] = this.numbers();
            map[index - 1].pop();
            return false;
        }

        let currentNumber = path[path.length - 1];

        if (!this._validate(map, index)) {
            map[index].pop();
            map[index + 1] = this.numbers();
            return false;
        } else {
            this.stack.push(currentNumber);
        }

        for (let number of path.entries()) {
            if (this._generate(map, index + 1)) {
                this.result[index] = currentNumber;
                return true;
            }
        }

        return false;
    }

    if (this._generate(this.map, 0)) {
        return this.toRows(this.result);
    } else {
        return null;
    }
}

/**
 * createNewGame
 */
function createNewGame() {
    messageBox && messageBox.hide();
    messageBox = null;
    win = false;
    Storage.setValue("win", win);
    selectedSquare = false;
    Storage.setValue("inNuSudoku", {});
    hint && (hint.removeChild(hint.querySelector('.sudoku-hint')), hint = null);
    // generate data for sudoku numbers
    // generate const basic table 
    var a = newGenerateSudokuBoard();
    z = [];
    if (!a) {
        // use old generator of Sudoku board
        for (a = [], c = 0; 9 > c; c++) {
            a[c] = [];
            for (var b = 0; 9 > b; b++) {
                var d = b + 1 + 3 * c + Math.floor(c / 3) % 3;
                9 < d && (d %= 9);
                0 == d && (d = 9);
                a[c][b] = d
            }
        }
        // swap raws in const basic table randomly
        // b uses for more swap operations
        for (c = 0; 9 > c; c += 3) {
            for (b = 0; 3 > b; b++) {   
                row1 = Math.floor(3 * Math.random());
                for (row2 = Math.floor(3 * Math.random()); row2 == row1;) row2 = Math.floor(3 * Math.random());
                row1 += c;
                row2 += c;
                d = [];
                d = a[row1];
                a[row1] = a[row2];
                a[row2] = d
            }
        }
        // swap cols in swap-raws basic table randomly
        // b uses for more swap operations
        for (c = 0; 9 > c; c += 3) {
            for (b = 0; 3 > b; b++) {
                col1 = Math.floor(3 * Math.random());
                for (col2 = Math.floor(3 * Math.random()); col2 == col1;) col2 = Math.floor(3 * Math.random());
                col1 += c;
                col2 += c;
                for (d = 0; d < a.length; d++) tmpMatrixValue = a[d][col1], a[d][col1] = a[d][col2], a[d][col2] = tmpMatrixValue
            }
        }
    }
    // GameBoard squares
    for (var c = 0; c < a.length; c++) {
        for (var b = 0; b < a[c].length; b++) {
            var d = document.getElementById("square_" + c + "_" + b),
                e = d.getElementsByTagName("DIV"),
                g = e[0];
            g.textContent = a[c][b];
            d.className = "sudoku-square";
            d.onclick = selectSudokuSquare;
            z.push(d)
        }
    }
    document.all ? document.body.onkeydown = onKeyDownSudokuSquare : document.documentElement.onkeydown = onKeyDownSudokuSquare;
    document.all ? document.body.onkeyup = onKeyUpSudokuSquare: document.documentElement.onkeyup = onKeyUpSudokuSquare;
    initEmptyBoard();
    for (c = 0; 30 > c; c++) {
        b = Math.ceil(9 * Math.random());
        for (d = Math.ceil(9 * Math.random()); d == b;) d = Math.ceil(9 * Math.random());
        e = [];
        g = [];
        for (a = 0; a < z.length; a++) {
            var n = z[a].getElementsByTagName("DIV")[0];
            n.textContent == b && e.push(n);
            n.textContent == d && g.push(n)
        }
        for (a = 0; a < e.length; a++) e[a].textContent = d, g[a].textContent = b
    }
    c = [];
    for (a = 0; 9 > a; a++) {
        for (b = 0; 9 > b; b++) { 
            d = document.getElementById("square_" + a + "_" + b).getElementsByTagName("DIV")[0];
            c[b + 9 * a] = d.textContent;
        }
    }
    Storage.setValue("allNumbersSudoku", c);

    // autoselect visible sudoku numbers depending on the difficulty level
    a = [];
    c = [];
    b = [];
    d = [];
    e = 5;
    0 >= difficulty && (difficulty = 1);
    1 == difficulty && (e = 4);
    for (g = 0; g < difficulty_visible_num[difficulty]; g++) {
        do {
            var n =
                Math.floor(9 * Math.random()),
                t = Math.floor(9 * Math.random()),
                p = document.getElementById("square_" + n + "_" + t),
                q = p.parentNode.id,
                i = p.getElementsByTagName("DIV")[0];
            b[i.textContent] || (b[i.textContent] = 0);
            d[q] || (d[q] = 0)
        } while (a[n + "_" + t] || b[i.textContent] > 3 + Math.ceil(difficulty / 2) || d[q] >= e);
        a[n + "_" + t] = !0;
        c[c.length] = n + "_" + t;
        b[i.textContent] || (b[i.textContent] = 0);
        b[i.textContent]++;
        d[q]++;
        fillVisibleSudokuSquare(p)
    }
    Storage.setValue("viNuSudoku", c);
    timer.start();
}

function onKeyUpSudokuSquare(a) {
    selectedSquare && selectedSquare.focus();
}
/**
 * onKeyDownSudokuSquare
 * @param   EVENT   a       keydown event 37 - arrow left, 38 - arrow up, 39 - arrow right, 40 - arrow down, 46 - delete, 8 - backspace, 96-105 - numpad0-numpad9, 48-57 - 0-9
 */
function onKeyDownSudokuSquare(a) {
    hint && (hint.removeChild(hint.querySelector('.sudoku-hint')), hint = null);
    let c = Storage.getValue("inNuSudoku");
    document.all && (a = event);
    if (selectedSquare && !win) {
        // check win condition
        a.keyCode ? code = a.keyCode : a.which && (code = a.which);
        var a = selectedSquare.getElementsByTagName("DIV")[1],
            b = selectedSquare.id.split("_"),
            d = b[1] / 1,
            b = b[2] / 1,
            e = false;
        var cell = a.closest(".sudoku-input");
        let cell_change = cell.getElementsByTagName("div")[0];
        let cell_notes = [a.getElementsByTagName("div")[1], a.getElementsByTagName("div")[2], a.getElementsByTagName("div")[3],a.getElementsByTagName("div")[4],a.getElementsByTagName("div")[5],a.getElementsByTagName("div")[6],a.getElementsByTagName("div")[7],a.getElementsByTagName("div")[8],a.getElementsByTagName("div")[9]];
        if (39 == code && 8 > b && (e = document.getElementById("square_" + d + "_" + (b + 1))))
            for (; 8 > b && e.className.indexOf('sudoku-square--static') !== -1;) b += 1, e = document.getElementById("square_" + d + "_" + b);
        if (37 == code && 0 < b) {
            e = document.getElementById("square_" + d + "_" + (b - 1));
            for (; 0 < b && e.className.indexOf('sudoku-square--static') !== -1;) b -= 1, e = document.getElementById("square_" + d + "_" + b);
        }
        if (38 == code && 0 < d && (e = document.getElementById("square_" + (d - 1) + "_" + b)))
            for (; 0 < d && e.className.indexOf('sudoku-square--static') !== -1;) d -= 1, e = document.getElementById("square_" + d + "_" + b);
        if (40 == code && 8 > d && (e = document.getElementById("square_" + (d + 1) + "_" + b)))
            for (; 8 > d && e.className.indexOf('sudoku-square--static') !== -1;) d += 1, e = document.getElementById("square_" + d + "_" + b);
        var cell2 = e;
        if (46 == code || 8 == code) {  //delete
            if (noteMode) {
                if (8 == code) {
                    let arre = ["", "", "", "", "", "", "", "", ""];
                    let count = 0;
                    //for (let i = 0; i < cell_notes.length && i < 4; i++) {
                    for (let i = 0; i < cell_notes.length && i < 9; i++) {
                        arre[i] = cell_notes[i].textContent;
                        if (arre[i] != "") {
                            count++;
                        }
                    }
                    //for (let i = 3; i >= 0; i--) {
                    for (let i = 8; i >= 0; i--) {
                        if (cell_notes[i].textContent != "") {
                            cell_notes[i].textContent = "";
                            arre[i] = "";
                            count--;
                            break;
                        }
                    }
                    (count > 0) ? c[d + "_" + b] = arre : delete c[d + "_" + b];
                    Storage.setValue("inNuSudoku", c);
                } else {
                    for (let div of cell_notes) {
                        div.textContent = "";
                    }
                    delete c[d + "_" + b];
                    Storage.setValue("inNuSudoku", c);
                }
            } else {
                delete c[d + "_" + b];
                Storage.setValue("inNuSudoku", c);
                cell_change.textContent ="";
                checkForWin(), 8 == code;
            }
            return !1;
        }
        96 < code && 105 >= code && (code -= 48);
        if (48 < code && 57 >= code) {  //input number
            e = String.fromCharCode(code);
            if (noteMode) {
                // TODO: add new mechanics with notes HERE
                cell_change.textContent = "";
                let arre = ["", "", "", "", "", "", "", "", ""];
                let idx = -1;
                let remove = false;
                let count = 0;

                for (let i = 8; i >= 0; i--) {
                    if (cell_notes[i].textContent == e) {
                        arre[i] = "";
                        cell_notes[i].textContent = "";

                    } else if (cell_notes[i].textContent == "") {

                        if((i+1) == e){
                            cell_notes[i].textContent = (i+1);
                            arre[i] = e;
                        }

                    } else {
                        arre[i] = cell_notes[i].textContent;
                    }
                }
                c[d + "_" + b] = arre;

                Storage.setValue("inNuSudoku", c)
                checkForWin()
                return !1;
            } else {
                for (let div of cell_notes) {
                    div.textContent = "";
                }
                cell_change.textContent = e;
                c[d + "_" + b] = e;
                Storage.setValue("inNuSudoku", c)
            }
        }
        c = document.getElementById("sudoku").getElementsByTagName("DIV");
        a = !0;
        for (d = 0; d < c.length; d++){
            if ((0 <= c[d].className.indexOf("sudoku-square") && c[d].className.indexOf("sudoku-square--static") === -1) && (b = c[d].getElementsByTagName("DIV"), b[0].textContent != b[1].textContent)) {
                a = !1;
                break
            }
        }
        cell2 && cell2.className.indexOf('sudoku-square--static') !== -1 && (cell2 = false);
        cell.focus();
        cell2 && cell2.getElementsByTagName("DIV")[1].focus();
        cell2 && selectSudokuSquare(false, cell2);
        if ((a || checkForWin()) && (win = true, Storage.setValue("win", win), timer.stop(), messageBox = new CongratBox("Congratulations!", createNewGame), () => {messageBox = null})) {
            try { SocialModuleInstance && SocialModuleInstance.showSocial()}catch(e){}
        }
    }
}


//numberpad
function btnNumber(val){

    hint && (hint.removeChild(hint.querySelector('.sudoku-hint')), hint = null);
    let c = Storage.getValue("inNuSudoku");
    document.all && (a = event);
    if (selectedSquare && !win) {

        var a = selectedSquare.getElementsByTagName("DIV")[1],
        b = selectedSquare.id.split("_"),
        d = b[1] / 1,
        b = b[2] / 1,
        e = false;
        var cell = a.closest(".sudoku-input");
        let cell_change = cell.getElementsByTagName("div")[0];
        let cell_notes = [a.getElementsByTagName("div")[1], a.getElementsByTagName("div")[2], a.getElementsByTagName("div")[3],a.getElementsByTagName("div")[4],a.getElementsByTagName("div")[5],a.getElementsByTagName("div")[6],a.getElementsByTagName("div")[7],a.getElementsByTagName("div")[8],a.getElementsByTagName("div")[9]];
        if (8 > b && (e = document.getElementById("square_" + d + "_" + b)))
            for (; 8 > b && e.className.indexOf('sudoku-square--static') !== -1;) e = document.getElementById("square_" + d + "_" + b);
        if (0 < b) {
            e = document.getElementById("square_" + d + "_" + b);
            for (; 0 < b && e.className.indexOf('sudoku-square--static') !== -1;) e = document.getElementById("square_" + d + "_" + b);
        }
        if (0 < d && (e = document.getElementById("square_" + d + "_" + b)))
            for (; 0 < d && e.className.indexOf('sudoku-square--static') !== -1;) e = document.getElementById("square_" + d + "_" + b);
        if (8 > d && (e = document.getElementById("square_" + d + "_" + b)))
            for (; 8 > d && e.className.indexOf('sudoku-square--static') !== -1;) e = document.getElementById("square_" + d + "_" + b);
        var cell2 = e;

        e = val;

        if(e == 0) {  //delete
            if (noteMode) {

                    for (let div of cell_notes) {
                        div.textContent = "";
                    }
                    delete c[d + "_" + b];
                    Storage.setValue("inNuSudoku", c);
                
            } else {
                delete c[d + "_" + b];
                Storage.setValue("inNuSudoku", c);
                cell_change.textContent ="";
                checkForWin();
            }
            return !1;
        }

        if(e>0 && e<10){
            if (noteMode) {
                // TODO: add new mechanics with notes HERE
                cell_change.textContent = "";
                let arre = ["", "", "", "", "", "", "", "", ""];
                let idx = -1;
                let remove = false;
                let count = 0;

                for (let i = 8; i >= 0; i--) {
                    if (cell_notes[i].textContent == e) {
                        arre[i] = "";
                        cell_notes[i].textContent = "";

                    } else if (cell_notes[i].textContent == "") {

                        if((i+1) == e){
                            cell_notes[i].textContent = (i+1);
                            arre[i] = e;
                        }

                    } else {
                        arre[i] = cell_notes[i].textContent;
                    }
                }
                c[d + "_" + b] = arre;
                cell.focus();
                Storage.setValue("inNuSudoku", c);
                checkForWin();
                selectedSquare && selectedSquare.focus();  //select box
                return !1;
            } else {
                for (let div of cell_notes) {
                    div.textContent = "";
                }
                cell_change.textContent = e;
                c[d + "_" + b] = e;
                Storage.setValue("inNuSudoku", c);
            }
        }
        c = document.getElementById("sudoku").getElementsByTagName("DIV");
        a = !0;
        for (d = 0; d < c.length; d++){
            if ((0 <= c[d].className.indexOf("sudoku-square") && c[d].className.indexOf("sudoku-square--static") === -1) && (b = c[d].getElementsByTagName("DIV"), b[0].textContent != b[1].textContent)) {
                a = !1;
                break
            }
        }
        cell2 && cell2.className.indexOf('sudoku-square--static') !== -1 && (cell2 = false);
        cell.focus();
        cell2 && cell2.getElementsByTagName("DIV")[1].focus();
        cell2 && selectSudokuSquare(false, cell2);
        if ((a || checkForWin()) && (win = true, Storage.setValue("win", win), timer.stop(), messageBox = new CongratBox("Congratulations!", createNewGame), () => {messageBox = null})) {
            try { SocialModuleInstance && SocialModuleInstance.showSocial()}catch(e){}
        }

    }

}

/**
 * loadExistingGame
 */
function loadExistingGame() {
    let allNS = Storage.getValue("allNumbersSudoku");
    for (let i = 0; i < allNS.length; i++) {
        let b = document.getElementById("square_" + Math.floor(i / 9) + "_" + i % 9);
        let d = b.getElementsByTagName("DIV");
        let e = d[0];
        e.textContent = allNS[i];
        b.onclick = selectSudokuSquare;
    }
    document.all ? document.body.onkeydown = onKeyDownSudokuSquare : document.documentElement.onkeydown = onKeyDownSudokuSquare;
    document.all ? document.body.onkeyup = onKeyUpSudokuSquare: document.documentElement.onkeyup = onKeyUpSudokuSquare;
    initEmptyBoard();
    difficulty <=0 && (difficulty = 1);
    let visibleNS = Storage.getValue("viNuSudoku");
    for (let i = 0; i < visibleNS.length; i++) {
        let b = document.getElementById("square_" + visibleNS[i]);
        fillVisibleSudokuSquare(b);
    }
    let inNS = Storage.getValue("inNuSudoku");
    for (let i in inNS) { 
        b = document.getElementById("square_" + i);
        if (Array.isArray(inNS[i])) {
            //for (let j = 0; j < inNS[i].length && j < 4; j++) {
            for (let j = 0; j < inNS[i].length && j < 9; j++) {
                b.getElementsByTagName("DIV")[3 + j].textContent = inNS[i][j] == 0 ? "" : inNS[i][j];
            }
        } else {
            b.getElementsByTagName("DIV")[2].textContent = inNS[i]
        }
    };
    let dl = Storage.getValue("level");
    // TODO : SET LEVEL DIFFICULTY
    document.querySelector('select').selectedIndex = dl - 1;

    /*
    switch(Storage.getValue("theme")) {
        case 'dark':
            //chrome.browserAction.setIcon({ path : 'icons/icon-dark128.png'});
            document.querySelector("#themes-dark").className = "themes-btn themes-btn--active";
            document.querySelector("#themes-white").className = "themes-btn";
            document.querySelector(".extension_wrapper").className = "extension_wrapper theme-dark";
            break;
        case 'white':
        default:
            //chrome.browserAction.setIcon({ path : 'icons/icon-white128.png'});
            document.querySelector("#themes-white").className = "themes-btn themes-btn--active";
            document.querySelector("#themes-dark").className = "themes-btn";
            document.querySelector(".extension_wrapper").className = "extension_wrapper theme-white";
            break;

    }
    */
    checkForWin();
    timer.start(true);
}

/**
 * restartGame
 * @param   integer     _difficulty     difficulty level
 * @param   DOM         _difficultyDOM  difficulty level DOM element
 */
function restartGame(_difficulty, _difficultyDOM) {
    let difficultyDOMs = _difficultyDOM.parentNode.parentNode.getElementsByTagName("A");
    for (let i = 0; i < difficultyDOMs.length; i++) difficultyDOMs[i].style.fontWeight = "normal";
    _difficultyDOM.style.fontWeight = "bold";
    difficulty = _difficulty;
    Storage.setValue("level", _difficulty);
    createNewGame();
}

/**
 * switchDifficulty
 * @param   integer     _difficulty     difficulty level
 * @param   DOM         _difficultyDOM  difficulty level DOM element
 */
function switchDifficulty(_difficulty, _difficultyDOM) {
    //restartGame(_difficulty, _difficultyDOM);
    win ? restartGame(_difficulty, _difficultyDOM) : new ConfirmBox("start the game again?", restartGame, _difficulty, _difficultyDOM);
}

let z = [];
let difficulty = Storage.getValue("level") || 1; // difficulty level
let difficulty_visible_num = [36, 36, 34, 32, 31, 30];
let win = Storage.getValue("win") || false; // victory flag
let selectedSquare;
let hint = null;
let messageBox = null;
let timer = null;
let noteMode = Storage.getValue("noteMode") || false;

// <div class="sudoku-hint"><span>Попробуйте тут</span></div>
function getHint(val) {
    let hintDOM = document.createElement('div');
    hintDOM.className = "sudoku-hint";
    hintDOM.textContent = val;
    return hintDOM;
}



(() => {
    timer = new GameTimer();
    GUILocalization();
    document.querySelector("#reveal").onclick = (event) => {
        hint && (hint.removeChild(hint.querySelector('.sudoku-hint')), hint = null);
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                var d = document.querySelector("#square_" + i + "_" + j);
                d.className = "sudoku-square sudoku-square--static";
            }
        }
        Storage.setValue("isInitSudoku", false);
        // global variable BOOLEAN
        win = true;
        Storage.setValue("win", win);
        timer.disable();
    }
    document.querySelector("#newGame").onclick = (event) => { createNewGame(); }
    //document.querySelector("#htu_nm").onclick = (event) => { document.querySelector(".htu_notes").classList.toggle('show');}
    //document.querySelector(".close").onclick = (event) => { document.querySelector(".htu_notes").classList.toggle('show');}

    document.querySelector("#notes").className = `btn-number btn-notes${noteMode ? '--active': ''}`;
    document.querySelector("#notes").onclick = (event) => {
        noteMode = !noteMode;
        Storage.setValue("noteMode", noteMode);
        document.querySelector("#notes").className = `btn-number btn-notes${noteMode ? '--active': ''}`;
    }

    document.querySelector("#hint").onclick = (event) => {
        hint && (hint.removeChild(hint.querySelector('.sudoku-hint')), hint = null);
        let g = 0;
        let f = false;
        let k = 0;
        for (let p = 0; p < 9; p++) {
            for (let q = 0; q < 9; q++) {
                let i = document.getElementById("square_" + p + "_" + q);
                if (i.className.indexOf("sudoku-square--static") === -1) {
                    var l = i.getElementsByTagName("DIV");
                    if (!(l[0].textContent == l[2].textContent)) {
                        // "This one wrong"
                        i.append(getHint(i.firstElementChild.textContent));
                        i.getElementsByTagName("DIV")[1].focus();
                        selectedSquare = i.closest(".sudoku-square");
                        hint = i;
                        return;
                    }
                }
            }
        }
    };

    document.querySelector('select').onchange = (event) => { 
        switch(event.target.value) {
            case 'beginner':
                switchDifficulty(1, event.target);
                break;
            case 'moderate':
                switchDifficulty(2, event.target);
                break;
            case 'hard':
                switchDifficulty(3, event.target);
                break;
            case 'expert':
                switchDifficulty(4, event.target);
                break;
            default:
                switchDifficulty(1, event.target);
                break;       
        } 
    }


    Storage.getValue("isInitSudoku") ? loadExistingGame() : (createNewGame(), Storage.setValue("isInitSudoku", true));

    /*
    document.querySelector("#themes-white").onclick = (event) => {
        document.querySelector("#themes-white").className = "themes-btn themes-btn--active";
        document.querySelector("#themes-dark").className = "themes-btn";
        document.querySelector(".extension_wrapper").className = "extension_wrapper theme-white";
        Storage.setValue("theme", "white");
    }
    document.querySelector("#themes-dark").onclick = (event) => {
        document.querySelector("#themes-dark").className = "themes-btn themes-btn--active";
        document.querySelector("#themes-white").className = "themes-btn";
        document.querySelector(".extension_wrapper").className = "extension_wrapper theme-dark";
        Storage.setValue("theme", "dark");
    }
    */
})()