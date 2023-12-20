<h2>Игра "Угадай число" в виде TCP-сервиса с использованием ZMQ</h2>

<h4>Программа Game-Client загадывает случайное число в заданном диапазоне.</h4>
<ol>
  <li>при запуске принимает два числа (диапазон), например:
    <p>> node game-client 1 100</p>
  </li>
  <li>из данного диапазона выбирает случайное число, например 42</li>
  <li>посылает JSON-сообщение на Game-Server вида {"range": "min-max"}, например {"range": "1-100"}</li>
  <li>
    принимает JSON-сообщение от Game-Server вида {"answer": число}, например {"answer": 25}
    <ul>
      <li>если пришедшее число меньше загаданного, то посылает JSON-сообщение на Game-Server вида {"hint": "more"}</li>
      <li>если пришедшее число больше загаданного, то посылает JSON-сообщение на Game-Server вида {"hint": "less"}</li>
      <li>если пришедшее число равно загаданному, то игра заканчивается</li>
    </ul>  
  </li>
  <li>должен вести лог ответов сервера в консоли</li>
</ol>
 
<h4>Программа Game-Server пытается отгадать число с помощью подсказок.</h4>
<ol>
  <li>
    при запуске выводит сообщение о готовности, например:
    <p>> node game-server<br>
        Готов к игре...</p>
  </li>
  <li>принимает JSON-сообщение от Game-Client о диапазоне чисел, в котором загадано число, например {"range": "1-100"}</li>
  <li>посылает JSON-сообщение на Game-Client вида {"answer": число}, например {"answer": 25}</li>
  <li>принимает корректирующие JSON-сообщения от Game-Client вида {"hint": "more"} или {"hint": "less"}</li>
  <li>должен вести лог сообщений клиента в консоли</li>
</ol>
