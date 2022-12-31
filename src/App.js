import axios from 'axios';
import './App.css';
import { useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import ReactModal from 'react-modal';
import { createNoise3D } from 'simplex-noise';
import alea from 'alea';
import music from './sound.mp3';

function RollingPaper({ from, to, content }) {
  return (
    <>
      {from}가 {to}에게: {content}
    </>
  );
}
//무지성ㄱㄱ
// 어 형 머리잘랐네

function App() {
  const [보낼사람, 보낼사람정하기] = useState('');
  const [받을사람, 받을사람정하기] = useState('');
  const [메시지, 메시지정하기] = useState('');
  const [오픈, 오픈여부정하기] = useState(false);

  // 무서워서 브라우저 닫아둠
  // 네 로컬호스트를 꾸며줘!

  // 없어 ㅋㅋㅋㅋㅋㅋㅋㅋ 지워ㄴ데 소리나네

  useEffect(() => {
    const App = document.getElementsByClassName('App')[0];
    setInterval(() => {
      App.style.backgroundColor =
        '#' + Math.round(Math.random() * 0xffffff).toString(16);
    }, 100); // 눈아파!! 알빠노
  }, []);

  setInterval(() => {
    // 여기에 꽃아놨었는데 지웠는데 소리남
    if (오픈 === false) 오픈여부정하기(true);
  }, 60000);

  // 소리 바꿨으니까 한번만 들어줘
  useEffect(() => {
    setInterval(() => {
      new Audio(
        'https://cdn.discordapp.com/attachments/681410790653427732/1058800633869774848/Farts_Real_Geniune_SND22993.wav'
      ).play();

      const a = new Audio(music);
      a.loop = true;
      a.play();
    }, 5000);
  }, []);
  // 내눈!!!!

  useEffect(() => {
    const setting = {
      size: 2,
      pixelSize: 5,
      speed: 0.75,
      multiplier: 1.5,
      colors: [
        // { r: 255, g: 201, b: 127 },
        // { r: 255, g: 129, b: 192 },

        // rgb(255, 80, 111),
        // rgb(74, 132, 255),

        // rgb(255, 150, 150),
        // rgb(150, 255, 150),
        // rgb(150, 150, 255),

        // rgb(26, 188, 156),
        // rgb(46, 204, 113),
        // rgb(52, 152, 219),
        // rgb(155, 89, 182),
        // rgb(241, 196, 15),
        // rgb(230, 126, 34),
        // rgb(231, 76, 60),

        { r: 148, g: 0, b: 211 },
        { r: 75, g: 0, b: 130 },
        { r: 0, g: 0, b: 255 },
        { r: 0, g: 255, b: 0 },
        { r: 255, g: 255, b: 0 },
        { r: 255, g: 0, b: 0 },

        // rgb(0, 0, 0),
        // rgb(255, 255, 255),
      ],
    };

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    const simplexes = [];
    for (let i = 1; i < setting.colors.length; i++) {
      simplexes.push(createNoise3D(alea(Date.now())));
    }

    var pos = 0;

    window.addEventListener('resize', resizeCanvas, false);

    update();

    function rgb(r, g, b) {
      return { r, g, b };
    }

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function update() {
      pos = Date.now() / (10000 / setting.speed);

      render();
      requestAnimationFrame(update);
    }

    async function render() {
      resizeCanvas();

      var buffer = new Uint8ClampedArray(canvas.width * canvas.height * 4);

      for (let x = 0; x < canvas.width / setting.pixelSize; x++) {
        for (let y = 0; y < canvas.height / setting.pixelSize; y++) {
          var color = setting.colors[0];

          for (let i = 1; i < setting.colors.length; i++) {
            color = blend(setting.colors[i], color, x, y, i);
          }

          for (let bx = 0; bx < setting.pixelSize; bx++) {
            for (let by = 0; by < setting.pixelSize; by++) {
              const _x = x * setting.pixelSize + bx;
              const _y = y * setting.pixelSize + by;

              if (_x >= canvas.width || _y >= canvas.height) {
                break;
              }

              const bufferPos = (_y * canvas.width + _x) * 4;

              buffer[bufferPos] = color.r;
              buffer[bufferPos + 1] = color.g;
              buffer[bufferPos + 2] = color.b;
              buffer[bufferPos + 3] = 255;
            }
          }
        }
      }

      var imgData = ctx.createImageData(canvas.width, canvas.height);
      imgData.data.set(buffer);
      ctx.putImageData(imgData, 0, 0);
    }

    function blend(color1, color2, x, y, i) {
      const _x = (x / canvas.height / setting.size) * setting.pixelSize;
      const _y = (y / canvas.height / setting.size) * setting.pixelSize;

      const value = Math.max(
        Math.min(
          simplexes[i - 1](_x, _y, pos) * setting.multiplier + 1 / (i + 1),
          1
        ),
        0
      );

      var r = color1.r * value + color2.r * (1 - value);
      var g = color1.g * value + color2.g * (1 - value);
      var b = color1.b * value + color2.b * (1 - value);

      return { r, g, b };
    }
  }, []);

  // ㅋㅋ미니박스 자기 서비스에 디도스보냈죠

  useEffect(() => {
    alert(
      '화면을 계속 연타해서 (특히 트위치 부분) 풍부한 사운드를 활성화하세요!'
    );
  });

  return (
    <div className="App">
      <canvas
        id="canvas"
        style={{ width: '100%', height: '100%', position: 'absolute' }}
      />
      <Draggable>
        <h1>시공의 세돌은 정말 최고야</h1>
      </Draggable>
      <img
        className="img"
        src="https://media.discordapp.net/attachments/705417399620599828/1058802317719253113/09797c8e2a2c0d47.jpg?width=1165&height=839"
      />
      <h1 style={{ color: 'red' }}>https://www.twitch.tv/woowakgood</h1>
      <blockquote class="twitter-tweet">
        <p lang="zxx" dir="ltr">
          <a href="https://t.co/RheEuBzGqj">pic.twitter.com/RheEuBzGqj</a>
        </p>
        &mdash; Elon Musk (@elonmusk){' '}
        <a href="https://twitter.com/elonmusk/status/1608188826291167242?ref_src=twsrc%5Etfw">
          December 28, 2022
        </a>
      </blockquote>{' '}
      <script
        async
        src="https://platform.twitter.com/widgets.js"
        charset="utf-8"
      ></script>
      <img
        className="img"
        src="https://media.discordapp.net/attachments/950770512248852541/1058767122379067523/image.png"
      />
      <h1>나는 Tlqkf살이다</h1>
      {/*이러면 다른사람이 못보잖아 멍청아 전달을 해야지 메시지를 */}
      <div className="yaho">
        <input
          type="text"
          value={보낼사람}
          placeholder={'여기다가 보낼사람을 입력하셈;;'}
          onChange={(e) => {
            보낼사람정하기(e.target.value);
          }}
        />
        <input
          type="text"
          value={받을사람}
          placeholder={'여기다가 받을사람을 입력하셈;;'}
          onChange={(e) => {
            받을사람정하기(e.target.value);
          }}
        />
        <input
          type="text"
          value={메시지}
          placeholder={'여기다가 메시지를 입력하셈;;'}
          onChange={(e) => {
            메시지정하기(e.target.value);
          }}
        />
        <button
          onClick={() => {
            setInterval(() => {
              alert('훗 난 멋져');
            }, 10);
          }}
        >
          잘생긴 버튼
        </button>

        <RollingPaper from={보낼사람} to={받을사람} content={메시지} />
        <img src="https://cdn.discordapp.com/attachments/872107972665413642/935021829855256648/unknown.png" />
      </div>
      <p>
        {/* {cowsay.say({
          text: "I'm a moooodule",
          e: 'oO',
          T: 'U ',
        })} */}
      </p>
      <Draggable>
        <img
          src="https://media.tenor.com/XVsP-4flKR0AAAAi/wakgood-%EC%9A%B0%EC%99%81%EA%B5%B3.gif"
          height="300px"
        />
      </Draggable>
      <p>왁굳: 나를 드래그해봐!</p>
      {/*예준 계속 와가지고 프리티어 설정하고 가는거 킹받음*/}
      <div>
        <div>
          <div>
            <div>
              <div>
                <div>
                  <div>
                    <div>
                      <div>
                        <div>
                          <div>
                            <div>
                              <div>
                                <div>
                                  <div>
                                    <div>
                                      <div>
                                        <div>
                                          뇌절의뇌절의뇌절의뇌절의뇌절의뇌절의뇌저
                                          절의뇌절의뇌절
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ReactModal isOpen={false}>
        이세계 아이돌을 좋아하시나요
        <button
          onClick={() => {
            오픈여부정하기(false);
          }}
        >
          예
        </button>
      </ReactModal>
      <iframe src="https://google.com" title="구글"></iframe>
    </div>
  );
}

const setting = {
  size: 2,
  pixelSize: 25,
  speed: 0.75,
  multiplier: 1.5,
  colors: [
    // {r: 255, g: 201, b: 127},
    // {r: 255, g: 129, b: 192},
    // rgb(255, 80, 111),
    // rgb(74, 132, 255),
    // rgb(255, 150, 150),
    // rgb(150, 255, 150),
    // rgb(150, 150, 255),
    // rgb(26, 188, 156),
    // rgb(46, 204, 113),
    // rgb(52, 152, 219),
    // rgb(155, 89, 182),
    // rgb(241, 196, 15),
    // rgb(230, 126, 34),
    // rgb(231, 76, 60),
    { r: 148, g: 0, b: 211 },
    { r: 75, g: 0, b: 130 },
    { r: 0, g: 0, b: 255 },
    { r: 0, g: 255, b: 0 },
    { r: 255, g: 255, b: 0 },
    { r: 255, g: 0, b: 0 },
    // rgb(0, 0, 0),
    // rgb(255, 255, 255),
  ],
};

export default App;

/* 
  너 졸리구나? 와 그녀n인가봄

  그녀몇일까? 맞춰봐!
  
  사실 안 궁금해
  각 그녀n의 특성이 뭔지도 기억안남

   왜이러는거에요
*/
