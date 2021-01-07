import createElement from './utils';

export default class Game {
    constructor(num, size) {
        this.num = num;
        this.empty = {
            value: 0,
            top: num - 1,
            left: num - 1
        };
        this.picSize = size;
        this.turn = 0;
        this.pics = [];
        this.audio = true;
        this.paused = false;
        this.time = {
            min: 0,
            sec: 0
        };
    }

    init() {
        if (localStorage.getItem('save')) {
            const obj = JSON.parse(localStorage.getItem('time'));
            const local = JSON.parse(localStorage.getItem('save'));
            this.empty = local[local.length-1];
            this.turn = obj.turn;
        }

        const fieldBlock = createElement('div', 'field-block');
        const field = createElement('div', 'field');

        const pics = [];
        pics.push(this.empty);

        let numbers = [...Array(this.num*this.num-1).keys()];
        function sortArr(arr) {
            return arr.sort(()=>Math.random()-0.5);
        }
        
        sortArr(numbers);
        while (!this.validation(numbers)) {
            sortArr(numbers);
        }

        const backgrounds = [];
        const leftArr = [];
        const topArr = [];

        if(!this.newSize) {
            if (localStorage.getItem('save') !== null){
                numbers = [];
                JSON.parse(localStorage.getItem('save')).forEach(num => {
                    if (num.element)  {
                        numbers.push(+num.value);
                     } else {
                        numbers.push(null);
                     }
                    leftArr.push(num.left);
                    topArr.push(num.top);
                })
            } 
        }

        for (let i = 0; i < this.num; i += 1) {
            for(let j = 1; j <= this.num; j += 1) {
                backgrounds.push(`top ${(-i) * this.picSize}px right ${j * this.picSize}px`);
            }
        }
        for (let i = 0; i < numbers.length; i += 1) {
            const value = numbers[i] !== null ? numbers[i] : 'exception';
            const pic = createElement('div', 'pic', value + 1);
            pic.setAttribute('id', numbers[i]);
            pic.setAttribute('draggable', 'true');
            pic.style.backgroundPosition = value !== 'exception' ? backgrounds[value] : 'none';
            pic.style.width = `${this.picSize}px`;
            pic.style.height = `${this.picSize}px`;
            
            const left = localStorage.getItem('save') ? leftArr[i] : i % this.num;
            const top = localStorage.getItem('save') ? topArr[i] : (i - left) / this.num;

            if (value!=='exception'){
                pics.push({
                value,
                left,
                top,
                element: pic
                })
            }

            pic.style.left = `${left * this.picSize}px`;
            pic.style.top = `${top * this.picSize}px`;
            if (value !== 'exception') {
                field.append(pic);
            }
            pic.addEventListener('click', ()=> {
                this.move(pics, i + 1);
            })

            pic.addEventListener('dragstart', ()=>{
                pic.classList.add('draggable');
            });

            pic.addEventListener('dragend', ()=>{
                this.move(pics, i + 1);
                pic.classList.remove('draggable');
            })
        }
        
        fieldBlock.append(field);
        document.body.prepend(fieldBlock);
        this.pics = pics;
    }

    move (pics, index) {
        localStorage.removeItem('save');
        localStorage.removeItem('time');
        const pic = pics[index];
        const leftDiff = Math.abs(this.empty.left - pic.left);
        const topDiff = Math.abs(this.empty.top - pic.top);

       if (leftDiff + topDiff > 1) {
           return;
       }
        
         pic.element.style.left = `${this.empty.left * this.picSize}px`;
         pic.element.style.top = `${this.empty.top * this.picSize}px`;

         const emptyLeft = this.empty.left;
         const emptyTop = this.empty.top;
         this.empty.left = pic.left;
         this.empty.top = pic.top;
         pic.left = emptyLeft;
         pic.top = emptyTop;

         this.createMusic();
         this.turn = +this.turn + 1;

         pics = pics.slice(1);
         const isFinished = pics.every((elem) => {
            return elem.value === elem.top * this.num + elem.left;
         })

         if (isFinished) {
            this.finishGame();
        }   
         this.pics = pics;
     }

    validation(arr) {
        let sum = 0;
        for (let i = 0; i < arr.length; i += 1) {
            let count = 0;
            for (let j = i + 1; j < arr.length; j += 1) {
                if (arr[i] + 1 > arr[j] + 1) {
                    count += 1;
                }
            }
            sum += count;  
        }
        sum += this.num;
        return  sum%2 === 0;
    }

    createMusic() {
        if(!this.audio) return;
        const audio = new Audio();
        audio.src = './audio/18-1.wav';
        audio.play();
    }

    finishGame() {
        const finishMessage = createElement('div', 'finish', `Ура! Вы решили головоломку за ${this.time.min}:${this.time.sec} и ${this.turn} ходов`);
        const close = createElement('div', 'close', 'x');
        finishMessage.appendChild(close);
        document.body.appendChild(finishMessage);

        close.addEventListener('click', ()=>{
            finishMessage.style.display = 'none';
        })

        let leader = localStorage.getItem('finishedTable') ? localStorage.getItem('finishedTable') : '';
            leader += `${this.turn} `;
        localStorage.setItem('finishedTable',  leader);
        this.turn = 0;
        this.time.min = 0;
        this.time.sec = 0;
    }
}