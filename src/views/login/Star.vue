<template>
  <div class="content-box">
    <div class="g-container">
      <div class="g-group">
        <div class="item item-right"></div>
        <div class="item item-left"></div>
        <div class="item item-top"></div>
        <div class="item item-bottom"></div>
        <div class="item item-middle"></div>
      </div>
      <div class="g-group">
        <div class="item item-right"></div>
        <div class="item item-left"></div>
        <div class="item item-top"></div>
        <div class="item item-bottom"></div>
        <div class="item item-middle"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@function randomNum($max, $min: 0, $u: 1) {
  @return ($min + random($max)) * $u;
}

@function randomColor() {
  @return rgb(randomNum(255), randomNum(255), randomNum(255));
}

@function shadowSet($maxWidth, $maxHeight, $count) {
  $shadow: 0 0 0 0 randomcolor();

  @for $i from 0 through $count {
    $x: #{random(10000) / 10000 * $maxWidth};
    $y: #{random(10000) / 10000 * $maxHeight};

    $shadow: $shadow, #{$x} #{$y} 0 #{random(5)}px randomcolor();
  }

  @return $shadow;
}

.content-box {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 0;
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #000;
  opacity: 0.6;
}

.g-container {
  position: relative;
  margin: auto;
  animation: hueRotate 20s infinite linear;
  perspective: 5px;
  perspective-origin: 50% 50%;
}

.g-group {
  position: absolute;
  top: -50vh;
  left: -50vw;
  width: 100vw;
  height: 100vh;
  animation: move 8s infinite linear;
  transform-style: preserve-3d;
}

.g-group:nth-child(2) {
  animation: move 8s infinite linear;
  animation-delay: -4s;
}

.item {
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(#05040a, #03010e);
  background-size: cover;
  opacity: 1;
  animation: fade 8s infinite linear;
  animation-delay: 0;
}

.item::after {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 1px;
  height: 1px;
  border-radius: 50%;
  content: '';
  box-shadow: shadowset(100vw, 100vh, 500);
}

.g-group:nth-child(2) .item {
  animation-delay: -4s;
}

.item-right {
  transform: rotateY(90deg) translateZ(500px);
}

.item-left {
  transform: rotateY(-90deg) translateZ(500px);
}

.item-top {
  transform: rotateX(90deg) translateZ(500px);
}

.item-bottom {
  transform: rotateX(-90deg) translateZ(500px);
}

.item-middle {
  transform: rotateX(180deg) translateZ(1000px);
}

@keyframes move {
  0% {
    transform: translateZ(-200px) rotate(0deg);
  }

  100% {
    transform: translateZ(150px) rotate(0deg);
  }
}

@keyframes fade {
  0% {
    opacity: 0.2;
  }

  25%,
  60% {
    opacity: 1;
  }

  100% {
    opacity: 0.2;
  }
}

@keyframes hueRotate {
  0% {
    filter: hue-rotate(0);
  }

  100% {
    filter: hue-rotate(360deg);
  }
}
</style>
