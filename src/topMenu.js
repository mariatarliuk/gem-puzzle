const topMenu = document.createElement('div')
        topMenu.classList.add('top-menu');

    const turn = document.createElement('div');
        turn.classList.add('turn')

    const turnSpan = document.createElement('span');
        turn.innerHTML = 'Ходы: ';
        turn.append(turnSpan);
        topMenu.append(turn);

    const audioIcon = document.createElement('i')
        audioIcon.classList.add('material-icons' ,'audio');
        topMenu.append(audioIcon);

    const menu = document.createElement('div')
        menu.classList.add('menu');
        menu.innerHTML = 'Меню'
        topMenu.append(menu);

    const time = document.createElement('div');
    const timeSpan = document.createElement('span');
        time.classList.add('timer')
        time.innerHTML = 'Время: '
        timeSpan.innerHTML = '0:00'
        time.append(timeSpan)
    topMenu.append(time)

    export default topMenu;