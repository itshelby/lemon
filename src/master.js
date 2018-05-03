class Lemon {
  constructor (start, go, minute, ai) {
    this.time = document.getElementById(start)
    this.start = document.getElementById(go)
    this.ai = document.getElementById(ai)

    this.minutes = minute
    this.seconds = 60

    this.testNotify()

    this.start.onclick = () => {
      if (this.start.innerHTML === '行こう') {
        this.cut()
        this.start.innerHTML = 'リセット'
      } else {
        this.start.innerHTML = '行こう'
        this.cutReset()
      }
    }
  }

  cut () {
    this.cutFix()

    this.timer = setInterval(() => {
      this.cutHTML()

      if (this.seconds === 0) {
        this.minutes--
        this.seconds = 60
      
      }
      this.seconds--

      if (this.minutes < 0) {
        clearInterval(this.timer)
        this.audio()
        this.notify()
        this.start.innerHTML = '行こう'
        this.time.innerHTML = '25:00'
        this.minutes = 25
        this.seconds = 60
      }
    }, 1000)
  }

  cutFix () {
    this.minutes -= 1
    this.seconds -= 1
  }

  cutHTML () {
    if (this.minutes < 10) {
      if (this.seconds >= 10) this.time.innerHTML= '0' + this.minutes + ':' + this.seconds
      if (this.seconds < 10) this.time.innerHTML= '0' +this.minutes + ':0' + this.seconds
    } else {
      if (this.seconds >=10) this.time.innerHTML= this.minutes + ':' + this.seconds
      if (this.seconds < 10) this.time.innerHTML= this.minutes + ':0' + this.seconds
    }
  }

  cutReset () {
    clearInterval(this.timer)
    this.time.innerHTML = '25:00'
    this.minutes = 25
    this.seconds = 60
  }

  testNotify () {
    if (Notification.premission !== 'denied') {
      Notification.requestPermission(function(premission) {
        console.log('Success')
        return true
      })
    }
  }

  notify () {
    let notifycation = new Notification('こけの一年岩をとおす', {
      dir: 'auto',
      icon: "https://pp.userapi.com/c840234/v840234665/302df/EFnxoLbHk_Y.jpg",
      body: '前進'
    })
  }

  audio () {
    this.ai.play()
  }
}

let lemon = new Lemon('clock-timer', 'button-start', 25, 'ai')
