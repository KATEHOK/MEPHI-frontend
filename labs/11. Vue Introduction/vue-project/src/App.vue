<script setup>

  import { ref } from 'vue'
  import Clicker from './components/Clicker.vue'
  import CustomClicker from './components/CustomClicker.vue'

  const task4 = '4. Сделайте в созданном проекте тот же кликер, но на этот раз с применением Composition Api и Single File Components.'
  const task5 = '5. Созданный кликер оформите в виде компонента <Clicker /> и выведите на страницу 100 таких кликеров с использованием v-for. Каждый кликер должен работать независимо от других.'
  const task6 = '6. Для компонента <Clicker /> Реализуйте prop с названием amount, который будет указывать, сколько очков за раз должно прибавляться при клике.'
  const task7 = '7. Для компонента <Clicker /> сделайте так, чтобы кнопка для клика была кастомизируемой и передавалась из родительского компонента между <Clicker> и <Clicker />. То есть все то, что передается между открывающим и закрывающим тегами компонента должно использоваться кликером как кнопка и быть кликабельным.'
  const task8 = '8. Для компонента <Clicker /> реализуйте событие “button-clicked”, которое будет генерироваться при каждом клике. Чтобы родительский компонент, использующий <Clicker/>, в свою очередь смог установить обработчик на это событие.'
  const task9 = '9. Теперь при создании 100 кликеров задайте для каждого кликера обработчик события “button-clicked”, при котором через alert бы выводился следующий текст “Clicker <n> clicked!”, где <n> - номер кликера от 1 до 100.'

  const amount = ref(1)

  const onClickAlert = function (e, count) { alert(`Clicker ${count} clicked! Count ${e}`) }

</script>

<template>
  
  <p>{{ task4 }}</p>
  <Clicker :amount="1"/>

  <p>{{ task5 }}</p>
  <ol>
    <li v-for="n in 100"><Clicker :amount="n"/></li>
  </ol>

  <p>{{ task6 }}</p>
  <input type="number" v-model="amount">
  <Clicker :amount="amount"/>

  <p>{{ task7 }}</p>
  <CustomClicker :amount="amount">
    <button>Click here</button>
  </CustomClicker>

  <p>{{ task8 }}</p>
  <Clicker :amount="amount" @userClick="(count) => { console.log(`Clicked: ${count}`) }"/>

  <p>{{ task9 }}</p>
  <ol>
    <li v-for="n in 100"><Clicker :amount="1" @userClick="(e) => onClickAlert(e, n)"/></li>
  </ol>

</template>

