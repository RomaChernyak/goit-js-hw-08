import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);
const STORAGE_KEY = 'videoplayer-current-time';
const pauseTimeByDefault = 0;

console.log(iframe);
console.log(player);

const onPlay = data => {
    // console.log(data);
    const { seconds } = data;
    localStorage.setItem(STORAGE_KEY, seconds);
};

player.on('timeupdate', throttle(onPlay, 1000));

const pausePlayer = localStorage.getItem(STORAGE_KEY);

player.setCurrentTime(pausePlayer || pauseTimeByDefault);