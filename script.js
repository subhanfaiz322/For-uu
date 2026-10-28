
(function () {
  "use strict";

  var $ = function (i) {
    return document.getElementById(i);
  };

  // ===== YAHAN PHOTOS KE CAPTIONS AUR SONG TITLE CHANGE KARO =====
  // Photos: images/photo1.jpg se photo8.jpg tak
  // Song: song.mp3 ko index.html ke saath main folder mein rakho

  var CAPS = [
    "You, being you",
    "Favorite view",
    "Pure smiles",
    "Us",
    "Little moments",
    "Sunshine",
    "Together",
    "Always you"
  ];

  var SONG = "Our Song";

  var T = function (n) {
    return Array.apply(null, Array(n)).map(function (_, i) {
      return i;
    });
  };

  function toast(t) {
    var e = $("toast");
    e.textContent = t;
    e.classList.add("on");

    setTimeout(function () {
      e.classList.remove("on");
    }, 2600);
  }

  function fall(em, n) {
    for (var i = 0; i < n; i++) {
      setTimeout(function () {
        var f = document.createElement("div");
        f.className = "fall";
        f.textContent = em[Math.random() * em.length | 0];

        f.style.cssText +=
          "left:" + Math.random() * 100 +
          "vw;font-size:" + (16 + Math.random() * 22) +
          "px;animation-duration:" + (4 + Math.random() * 4) + "s";

        document.body.appendChild(f);

        setTimeout(function () {
          f.remove();
        }, 8200);
      }, i * 80);
    }
  }

  function cyc(a) {
    var k = 0;
    return function () {
      return a[k++ % a.length];
    };
  }

  // Intro screen
  setInterval(function () {
    if (!document.hidden && $("intro")) {
      fall(["🌸", "🌺"], 1);
    }
  }, 900);

  $("enter").onclick = function () {
    var i = $("intro");
    i.style.opacity = 0;
    $("app").hidden = false;

    setTimeout(function () {
      i.remove();
    }, 1000);
  };

  // Navigation
  $("burger").onclick = function () {
    $("nav").classList.toggle("on");
  };

  $("nav").onclick = function () {
    $("nav").classList.remove("on");
  };

  $("logo").onclick = function () {
    toast("You found a secret heart 💗 You’re my favorite.");
    fall(["❤", "💗"], 12);
  };

  addEventListener("scroll", function () {
    var h = document.documentElement;
    var p = scrollY / (h.scrollHeight - innerHeight);

    $("bar").style.width = (p * 100) + "%";
    $("top").style.display = scrollY > 500 ? "block" : "none";
  }, { passive: true });

  $("top").onclick = function () {
    scrollTo({ top: 0, behavior: "smooth" });
  };

  // Explore all sections for a hidden surprise
  var seen = {};
  var ids = [
    "home", "gallery", "gifts", "meter", "garden",
    "sky", "scrapbook", "quiz", "final"
  ];
  var done3 = false;

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) {
          seen[e.target.id] = 1;

          if (!done3 && Object.keys(seen).length === ids.length) {
            done3 = true;
            toast("You explored everything ✨ Here’s a shower of petals");
            fall(["🌸", "🌹", "✨", "❤"], 40);
          }
        }
      });
    }, { threshold: 0.4 });

    ids.forEach(function (i) {
      io.observe($(i));
    });
  }

  // Music player
  var a = $("aud");
  var ok = true;

  a.addEventListener("error", function () {
    ok = false;
    $("ptitle").textContent = "Add song.mp3 to play music";
  });

  $("ptitle").textContent = SONG;

  $("play").onclick = function () {
    if (!ok) {
      toast("song.mp3 wasn’t found next to index.html");
      return;
    }

    if (a.paused) {
      if (a.readyState === 0) {
        a.load();
      }

      a.play().then(function () {
        $("play").textContent = "❚❚";
        $("vinyl").classList.add("spin");
      }).catch(function () {
        toast("Couldn’t play the song");
      });
    } else {
      a.pause();
      $("play").textContent = "▶";
      $("vinyl").classList.remove("spin");
    }
  };

  a.addEventListener("timeupdate", function () {
    if (a.duration) {
      $("seek").value = a.currentTime / a.duration * 100;

      var s = a.currentTime | 0;
      $("time").textContent =
        (s / 60 | 0) + ":" + ("0" + s % 60).slice(-2);
    }
  });

  $("seek").oninput = function () {
    if (a.duration) {
      a.currentTime = $("seek").value / 100 * a.duration;
    }
  };

  $("vol").oninput = function () {
    a.volume = $("vol").value;
  };

  a.volume = 0.7;

  a.addEventListener("ended", function () {
    $("play").textContent = "▶";
    $("vinyl").classList.remove("spin");
  });

  // ===== EXACTLY 8 PHOTO FRAMES =====
  // APNI PICTURES KE NAAM YAHAN CHANGE KARO.
  // Images folder ke andar apni photos upload karna.
  // Example: "images/wania.jpg"

  var photos = [
    "assets/img  (4).jpeg", // Picture 1
    "assets/img  (6).jpeg", // Picture 2
    "assets/img  (8).jpeg", // Picture 3
    "assets/img  (5).jpeg", // Picture 4
    "assets/img  (2).jpeg", // Picture 5
    "assets/img (9).jpeg", // Picture 6
    "assets/img  (1).jpeg", // Picture 7
    "assets/img (12).jpeg"  // Picture 8
  ];

  function ph(i, cls, tag) {
    var b = document.createElement(tag || "button");

    b.className = "ph " + (cls || "");
    b.setAttribute("aria-label", "Open photo " + (i + 1));

    var u = photos[i];
    var im = new Image();

    im.onload = function () {
      b.style.backgroundImage = 'url("' + u + '")';
      b.style.backgroundSize = "cover";
      b.style.backgroundPosition = "center";
      b.textContent = "";
      b.classList.remove("miss");
    };

    im.onerror = function () {
      b.classList.add("miss");
      b.textContent = "💗";
    };

    im.src = u;
    b.dataset.i = i;

    return b;
  }

  T(8).forEach(function (i) {
    var p = document.createElement("button");

    p.className = "pl";
    p.style.setProperty(
      "--r",
      (i % 2 ? 1 : -1) * (2 + i % 3 * 2) + "deg"
    );

    p.appendChild(ph(i, "", "div"));
    p.appendChild(document.createTextNode(CAPS[i]));

    p.onclick = function () {
      lb(i);
    };

    $("polaroids").appendChild(p);
  });

  var cur = 0;

  function lb(i) {
    cur = (i + photos.length) % photos.length;

    $("lb").hidden = false;
    $("lim").innerHTML = "";
    $("lim").appendChild(ph(cur, "", "div"));
    $("lcap").textContent = CAPS[cur];
  }

  $("lx").onclick = function () {
    $("lb").hidden = true;
  };

  $("lp").onclick = function () {
    lb(cur - 1);
  };

  $("ln").onclick = function () {
    lb(cur + 1);
  };

  $("lb").onclick = function (e) {
    if (e.target === $("lb")) {
      $("lb").hidden = true;
    }
  };

  addEventListener("keydown", function (e) {
    if (!$("lb").hidden) {
      if (e.key === "ArrowRight") lb(cur + 1);
      if (e.key === "ArrowLeft") lb(cur - 1);
    }

    if (e.key === "Escape") {
      $("lb").hidden = true;
      closeM();
    }
  });

  // Popup modal
  function openM(h) {
    $("mc").innerHTML = h;
    $("modal").hidden = false;
  }

  function closeM() {
    $("modal").hidden = true;
  }

  $("mx").onclick = closeM;

  // Night sky
  function sky(el, M, n) {
    el.className = "sky";

    var h = '<div class="moon"></div><div class="cloud"></div>';
    el.innerHTML = h;

    var pts = [];

    T(9).forEach(function (j) {
      var t = j / 9 * 6.283;

      pts.push([
        50 + 16 * Math.pow(Math.sin(t), 3) * 2.4,
        46 - (
          13 * Math.cos(t) -
          5 * Math.cos(2 * t) -
          2 * Math.cos(3 * t) -
          Math.cos(4 * t)
        ) * 2.4
      ]);
    });

    for (var i = 0; i < (n || 14); i++) {
      pts.push([
        8 + Math.random() * 84,
        8 + Math.random() * 80
      ]);
    }

    var nx = cyc(M);

    pts.forEach(function (p) {
      var s = document.createElement("button");

      s.className = "st";
      s.setAttribute("aria-label", "Star");
      s.style.left = p[0] + "%";
      s.style.top = p[1] + "%";

      s.onclick = function () {
        s.classList.add("s");
        (el.nextElementSibling || {}).textContent = nx();
      };

      el.appendChild(s);
    });

    return el;
  }

  var SM = [
    "You’re the brightest star in my sky.",
    "You’re my favorite kind of magic.",
    "Thinking of you, always.",
    "You make quiet nights glow.",
    "Wherever you are feels like home.",
    "You’re my wish come true.",
    "One more star, one more smile. ⭐",
    "I’d find you in any sky."
  ];

  sky($("skybox"), SM, 18);

  // Little gifts
  var opened = {};

  var R = [
    "Your smile makes everything better.",
    "You’re my favorite person to talk to.",
    "Even ordinary moments feel special with you.",
    "I love the little things that make you, YOU.",
    "You make my heart feel at home.",
    "Your laugh is my favorite sound.",
    "You’re kind in the sweetest ways.",
    "You make me want to be better.",
    "Being around you feels easy.",
    "You’re beautiful inside and out.",
    "You make plain days brighter.",
    "You’re wonderfully you.",
    "I adore how you care.",
    "You’re my calm and my sparkle.",
    "You’re simply my favorite."
  ];

  var HM = [
    "You are loved more than you know.",
    "If I could choose again, I’d still choose you.",
    "You make my world a little more beautiful.",
    "Here’s a hug for when I can’t be there.",
    "One little reminder: you’re my favorite."
  ];

  var JM = [
    "You’re adorable.",
    "You’re my favorite hello.",
    "Sending sunshine.",
    "You’re doing great.",
    "Smile, you’re loved.",
    "You’re a gem.",
    "My heart says hi.",
    "You’re so special.",
    "Tiny love note.",
    "You’re my cozy place.",
    "You glow.",
    "You’re one of a kind.",
    "Happy thoughts, all yours.",
    "You’re sweeter than dessert.",
    "Remember: you’re wonderful.",
    "You make me smile.",
    "You’re magic.",
    "You’re worth every wait.",
    "Hugs, hugs, hugs.",
    "You’re my favorite person."
  ];

  var rm = cyc(R);
  var hm = cyc(HM);

  var G = [
    {
      n: "Reasons I Adore You",
      e: "🎁",
      f: function () {
        var k = 0;

        openM(
          '<h3>Reasons I Adore You</h3>' +
          '<div class="msg" id="a1">Tap to begin</div>' +
          '<small id="a2"></small><br>' +
          '<button class="btn" id="a3">Next reason</button>'
        );

        $("a3").onclick = function () {
          $("a1").textContent = rm();
          k++;
          $("a2").textContent = Math.min(k, 15) + " / 15";
          fall(["❤"], 3);
        };
      }
    },
    {
      n: "A Heart Full of Love",
      e: "💝",
      f: function () {
        openM(
          '<h3>A Heart Full of Love</h3>' +
          '<button class="big" id="b1">❤</button>' +
          '<div class="msg" id="b2">Tap the heart</div>'
        );

        $("b1").onclick = function () {
          var b = $("b1");

          b.classList.remove("pop");
          void b.offsetWidth;
          b.classList.add("pop");

          $("b2").textContent = hm();
        };
      }
    },
    {
      n: "Virtual Bouquet",
      e: "💐",
      f: function () {
        openM(
          '<h3>Virtual Bouquet</h3>' +
          '<div id="c1"></div>' +
          '<div class="msg" id="c2">Tap the buds 🌱</div>'
        );

        var m = cyc([
          "Roses for you.",
          "Bloom brightly.",
          "You’re my favorite flower.",
          "Always in bloom.",
          "Beauty in every petal."
        ]);

        T(5).forEach(function () {
          var b = document.createElement("button");

          b.className = "fl";
          b.textContent = "🌹";

          b.onclick = function () {
            b.classList.add("b");
            $("c2").textContent = m();
            fall(["🌸"], 4);
          };

          $("c1").appendChild(b);
        });
      }
    },
    {
      n: "Love Jar",
      e: "🫙",
      f: function () {
        openM(
          '<h3>Love Jar</h3>' +
          '<div class="jar" id="d1"></div>' +
          '<div class="msg" id="d2">Open a note</div>'
        );

        JM.forEach(function (t, i) {
          var b = document.createElement("button");

          b.textContent = i + 1;

          b.onclick = function () {
            b.textContent = "💌";
            $("d2").textContent = t;
          };

          $("d1").appendChild(b);
        });
      }
    },
    {
      n: "Our Little Universe",
      e: "🌙",
      f: function () {
        openM(
          '<h3>Our Little Universe</h3>' +
          '<div id="e1"></div><div class="msg"></div>'
        );

        sky($("e1"), SM, 10);
      }
    },
    {
      n: "Unlimited Hugs",
      e: "🤗",
      f: function () {
        var n = 0;

        openM(
          '<h3>Unlimited Hugs</h3>' +
          '<button class="big" id="h1">❤</button>' +
          '<div class="msg" id="h2">Tap for a hug</div>'
        );

        $("h1").onclick = function () {
          n++;

          $("h2").textContent =
            "🤗 Hug #" + n + " delivered. Squeeze!";

          var b = $("h1");
          b.classList.remove("pop");
          void b.offsetWidth;
          b.classList.add("pop");

          fall(["❤", "💗", "🤗"], 10);
        };
      }
    }
  ];

  G.forEach(function (g, i) {
    var b = document.createElement("button");

    b.className = "gift glass";
    b.innerHTML = "<span>" + g.e + "</span>" + g.n;

    b.onclick = function () {
      b.classList.add("shake");

      setTimeout(function () {
        b.classList.remove("shake");
      }, 500);

      g.f();

      if (!opened[i]) {
        opened[i] = 1;
        b.classList.add("done");

        var c = Object.keys(opened).length;
        $("gcount").textContent = c + " / 6 opened";

        if (c === 6) {
          var s = document.createElement("button");

          s.className = "gift glass done";
          s.innerHTML = "<span>🔓</span>Secret Gift";

          s.onclick = function () {
            cin(
              "No special occasion. I just wanted to remind you how special you are to me. ❤️",
              true
            );
          };

          $("giftrow").appendChild(s);
          $("fnote").textContent = "Everything is unlocked ❤️";
          $("fbtn").disabled = false;

          toast("A secret gift just unlocked 🔓");
        }
      }
    };

    $("giftrow").appendChild(b);
  });

  // Final cinematic surprise
  function cin(t, petals) {
    $("cmsg").textContent = t;
    $("cin").hidden = false;

    fall(
      petals
        ? ["🌸", "🌹", "❤", "✨", "🌷"]
        : ["🌸", "🌹", "❤"],
      60
    );
  }

  $("cx").onclick = function () {
    $("cin").hidden = true;
  };

  $("fbtn").onclick = function () {
    cin("Today doesn’t need a reason. You are already a reason to smile. ❤️");
  };

  $("again").onclick = function () {
    $("cin").hidden = true;
    scrollTo({ top: 0, behavior: "smooth" });
  };

  // Love meter
  var MS = [
    [0, "Slide to find out…"],
    [15, "A little bit 🙂"],
    [35, "More than coffee ☕"],
    [55, "More than all the stars ✨"],
    [75, "More than words can say 💞"],
    [95, "Almost there… 💗"],
    [100, "Even forever wouldn’t be enough. ❤️"]
  ];

  $("range").oninput = function () {
    var v = +this.value;

    $("mh").style.setProperty("--s", v);

    MS.forEach(function (m) {
      if (v >= m[0]) {
        $("mmsg").textContent = m[1];
      }
    });

    if (v == 100) {
      fall(["❤", "🌸"], 20);
    }
  };

  // Flower garden
  var FM = [
    "Bloom like you do.",
    "You make everything brighter.",
    "Grown with love.",
    "Petals for you.",
    "Sweet like you.",
    "Always in season.",
    "Soft and lovely, like you.",
    "You’re in full bloom."
  ];

  var fmm = cyc(FM);
  var fe = ["🌹", "🌷", "🌸", "🌹", "🌷", "🌺", "🌹", "🌷"];

  fe.forEach(function (e) {
    var b = document.createElement("button");

    b.className = "fl";
    b.textContent = e;

    b.onclick = function () {
      b.classList.add("b");
      $("gmsg").textContent = fmm();
    };

    $("gbox").appendChild(b);
  });

  T(8).forEach(function () {
    var f = document.createElement("i");

    f.className = "ff";
    f.style.cssText =
      "left:" + Math.random() * 95 +
      "%;top:" + Math.random() * 90 +
      "%;animation-delay:" + Math.random() * 4 + "s";

    $("gbox").appendChild(f);
  });

  setInterval(function () {
    if (
      !document.hidden &&
      innerWidth &&
      $("garden").getBoundingClientRect().top < innerHeight
    ) {
      fall(["🌸"], 1);
    }
  }, 2500);

  $("pick").onclick = function () {
    var e = fe[Math.random() * fe.length | 0];

    $("bouquet").textContent += e;
    $("gmsg").textContent = "A flower, just for you " + e;

    toast("Flower added to your bouquet 💐");
  };

  // Scrapbook
  var FC = [
    "You’re my favorite",
    "Cozy with you",
    "Tiny reminder: you’re loved",
    "Smile, please",
    "Sunshine person",
    "Stay sweet"
  ];

  var FB = [
    "I think of you often 💗",
    "Home is wherever you are",
    "You make days brighter",
    "Your smile = my favorite",
    "You light up rooms",
    "Forever my favorite"
  ];

  FC.forEach(function (t, i) {
    var b = document.createElement("button");

    b.className = "fc";
    b.innerHTML = "<i>" + t + "</i>";

    b.onclick = function () {
      var f = b.classList.toggle("f");
      b.firstChild.textContent = f ? FB[i] : t;
    };

    $("flips").appendChild(b);
  });

  $("tape").onclick = function () {
    toast("Hidden note: you are someone’s whole smile 💌");
    fall(["💌"], 8);
  };

  $("tape").onkeydown = function (e) {
    if (e.key === "Enter") {
      this.click();
    }
  };

  // Love quiz
  var Q = [
    ["Pick a perfect day", "Cozy movie night", "Sunset walk", "Sweet treats"],
    ["Pick a vibe", "Soft and sweet", "Bright and bold", "Calm and dreamy"],
    ["Pick a treat", "Chocolate", "Strawberries", "Ice cream"],
    ["Pick a season", "Spring blossoms", "Summer glow", "Cozy winter"],
    ["Pick a feeling", "Happy", "Loved", "Both ❤️"]
  ];

  var qi = 0;

  var QF = [
    "Great pick! 💗",
    "Love that! ✨",
    "Adorable choice 🌸",
    "So you! 🥰",
    "Perfect! 💖"
  ];

  function qr() {
    var b = $("qbox");

    if (qi >= Q.length) {
      b.innerHTML =
        '<h3>Result</h3>' +
        '<p>You’re 100% lovely. Every answer was the right one. 💞</p>' +
        '<button class="btn" id="qa">Play again</button>';

      $("qa").onclick = function () {
        qi = 0;
        qr();
      };

      fall(["❤"], 15);
      return;
    }

    b.innerHTML =
      "<small>Question " + (qi + 1) + " / 5</small>" +
      "<h3>" + Q[qi][0] + "</h3>" +
      Q[qi].slice(1).map(function (o) {
        return '<button class="opt">' + o + "</button>";
      }).join("");

    b.querySelectorAll(".opt").forEach(function (o) {
      o.onclick = function () {
        o.textContent = QF[qi];
        fall(["❤"], 4);

        setTimeout(function () {
          qi++;
          qr();
        }, 900);
      };
    });
  }

  qr();
})();
