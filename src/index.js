import Field from './Field';
import './styles/scss.scss';
import topMenu from './topMenu';
import modal from './modal';

let field = new Field(4, 100);
let obj = {};
if (localStorage.getItem('time')) {
    obj = JSON.parse(localStorage.getItem('time'));
}
let sec = obj.sec || 0;
let min = obj.min || 0;

function createPuzzle() {
    field.init();
    document.querySelector('.field-block').prepend(topMenu);
    document.querySelectorAll('.pic').forEach(pic=>{
        pic.addEventListener('click', () => {
            document.querySelector('.turn span').innerHTML = field.turn;
        })
        pic.addEventListener('dragend', () => {
            document.querySelector('.turn span').innerHTML = field.turn;
        })
    })
    document.querySelector('.audio').innerHTML =  'volume_up';
    document.querySelector('.turn span').innerHTML = field.turn;
}

function timer() {
    setInterval(()=>{
        if (!field.paused) {
        sec = +sec + 1;
        if (sec < 10) {
            sec =`0${sec}`;
        } 
        if (sec > 59) {
            min = +min + 1;
            sec = '00';
        }
        field.time.min = min;
        field.time.sec = sec;
        document.querySelector('.timer span').innerHTML =`${min}:${sec}`;
    }
    },1000);
}

createPuzzle();
timer();

document.querySelector('.audio').addEventListener('click', () => {
    field.audio = !field.audio;
    document.querySelector('.audio').innerHTML = field.audio ? 'volume_up' : 'volume_off';
})

document.body.append(modal);

document.querySelector('.menu').addEventListener('click', () => {
    document.querySelector('.field-block').classList.add('dark')
    document.querySelector('.timer');
    field.paused = true;
    modal.style.display = 'flex';

    const submit = document.querySelector('.input-form');
    submit.addEventListener('click', (e)=>{
        let size;
            switch(+e.target.id) {
                case 3: size = 150;
                break;
                case 6: size = 70;
                break;
                case 7: size = 65;
                break;
                case 8: size = 60;
                break;
                default: size = 100;
                break;
            }
        field = new Field(+e.target.id, size);
        modal.style.display = 'none';
        document.querySelector('.field-block').remove();
        createPuzzle();
        sec = 0;
        min = 0;
        document.querySelector('.turn span').innerHTML = 0;
        field.paused = false;
    })

    document.querySelector('.newGame').addEventListener('click', ()=>{
        field = new Field(field.num, field.picSize);
        modal.style.display = 'none';
        document.querySelector('.field-block').remove();
        createPuzzle();
        sec = 0;
        min = 0;
        field.turn = 0;
        document.querySelector('.turn span').innerHTML = 0;
        field.paused = false;
    })

})

document.querySelector('.save').addEventListener('click', ()=>{
        const fullPics = [...field.pics, field.empty];
        localStorage.setItem('save', JSON.stringify(fullPics));
        const objTime = {sec, min, 'turn': document.querySelector('.turn span').innerHTML};
        localStorage.setItem('time', JSON.stringify(objTime));
        document.querySelector('.modal').style.display = 'none';
        document.querySelector('.field-block').classList.remove('dark');
        field.paused = false;
})


