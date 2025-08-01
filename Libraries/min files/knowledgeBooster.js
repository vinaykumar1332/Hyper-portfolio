function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
  var e = document.querySelector(".dark-mode-toggle i");
  document.body.classList.contains("dark-mode")
    ? (e.classList.remove("fa-moon"), e.classList.add("fa-sun"))
    : (e.classList.remove("fa-sun"), e.classList.add("fa-moon"));
}
function showContent(e) {
  let t = document.querySelectorAll(".content-box");
  t &&
    t.length > 0 &&
    t.forEach((e) => {
      e.style.display = "none";
    });
  let a = document.getElementById(e);
  a && (a.style.display = "block");
}
document.addEventListener("DOMContentLoaded", function () {
  let e = document.querySelectorAll(".show-more-btn");
  e.forEach((e) => {
    e.addEventListener("click", function () {
      let e = this.previousElementSibling,
        t = this.querySelector(".chevron");
      "none" === e.style.display || "" === e.style.display
        ? ((e.style.display = "block"),
          (this.innerHTML = 'Show Less <span class="chevron">&#x25B2;</span>'),
          t.classList.add("rotate"))
        : ((e.style.display = "none"),
          (this.innerHTML = 'Show More <span class="chevron">&#x25BC;</span>'),
          t.classList.remove("rotate"));
    });
  });
});
const DATA_API = "../Json/pdfData.json";
let pdfData;
const maxLikes = 50,
  likedCards = new Set(JSON.parse(localStorage.getItem("likedCards")) || []);
async function fetchAndStoreData() {
  if (localStorage.getItem("pdfData"))
    (pdfData = JSON.parse(localStorage.getItem("pdfData"))), populateCards();
  else
    try {
      let e = await fetch("../Json/pdfData.json");
      if (!e.ok) throw Error("Network response was not ok");
      let t = await e.json();
      (pdfData = t.pdfFilesData),
        localStorage.setItem("pdfData", JSON.stringify(pdfData)),
        populateCards();
    } catch (a) {
      console.error("Error fetching data:", a);
    }
}
function clearStorage() {
  localStorage.removeItem("pdfData"),
    sessionStorage.removeItem("cookieConsent"),
    console.log("Storage cleared");
}
function createCard(e, { title: t, description: a, category: s }) {
  let o = document.createElement("div");
  return (
    o.classList.add("card"),
    o.setAttribute("data-id", e),
    o.setAttribute("data-category", s),
    (o.innerHTML = `
    <div class="card-image-wrapper">
        <img src="" data-src="../Assets/images/${s}.jpg" class="lazy-load" alt="${t}" width="600" height="400" style="aspect-ratio: 3 / 2;">
    </div>
    <div class="content">
        <h2 class="card-h2">${t}</h2>
        <p class="card-p">${a}</p>
        <div class="card-btn-container">
  <button class="view-btn">
    <i class="fa-regular fa-eye"></i>
    <span class="btn-text">Preview</span>
  </button>
  <button class="Download-pdf-btn">
    <span class="btn-text">Download</span>
    <i class="fa-solid fa-download"></i>
  </button>
</div>
        <div class="like-container">
            <button role="button" aria-label="Like button" class="like-btn-wrapper">
                <i class="fa fa-heart like-btn" aria-hidden="true"></i>
            </button>
        </div>
    </div>
`),
    o
  );
}
function shuffleCards(e) {
  let t = Array.from(e.children);
  for (let a = t.length - 1; a > 0; a--) {
    let s = Math.floor(Math.random() * (a + 1));
    [t[a], t[s]] = [t[s], t[a]];
  }
  t.forEach((t) => e.appendChild(t));
}
function updateLikeState() {
  document.querySelectorAll(".card").forEach((e) => {
    let t = e.getAttribute("data-id"),
      a = e.querySelector(".like-btn");
    a.classList.toggle("liked", likedCards.has(t));
  });
}
function populateCards(e = "all") {
  if (!pdfData || "object" != typeof pdfData) return;
  let t = document.getElementById("cardContainer");
  if (!t) return;
  t.innerHTML = "";
  let a =
    "liked" === e
      ? Object.entries(pdfData).filter(([e]) => likedCards.has(e))
      : Object.entries(pdfData);
  a.forEach(([e, a]) => {
    let s = createCard(e, a);
    s.querySelector(".view-btn")?.addEventListener("click", (t) => {
      t.stopPropagation(), openPDF(e);
    }),
      s.querySelector(".Download-pdf-btn")?.addEventListener("click", (t) => {
        t.stopPropagation(), downloadPDfUrl(e);
      }),
      t.appendChild(s);
  }),
    shuffleCards(t),
    updateLikeState(),
    lazyLoadInstance(),
    imageLoadOnCategory(),
    filterCards();
}
function handleLike(e) {
  let t = e.closest(".card"),
    a = t.getAttribute("data-id");
  if (likedCards.has(a)) likedCards.delete(a);
  else if (likedCards.size < 50) likedCards.add(a);
  else {
    showToast("Maximum number of likes reached");
    return;
  }
  localStorage.setItem("likedCards", JSON.stringify([...likedCards])),
    updateLikeState();
}
function imageLoadOnCategory() {
  let e = document.querySelectorAll(".card"),
    t = {
      html: "../Assets/images/html-css.jpg",
      javascript: "../Assets/images/javascript.jpeg",
      react: "../Assets/images/react.png",
      dsa: "../Assets/images/dsa.jpeg",
      sql: "../Assets/images/sql.png",
      python: "../Assets/images/python.png",
      mongodb: "../Assets/images/mongodb.jpeg",
      git: "../Assets/images/Git&Github.png",
      sysdesign: "../Assets/images/system design.jfif",
      testing: "../Assets/images/testing.png",
      Nodejs: "../Assets/images/node-js.webp",
      angular: "../Assets/images/angularjs.png",
      docker: "../Assets/images/docker.png",
      java: "../Assets/images/java.jpeg",
      ai: "../Assets/images/AI.webp",
    };
  e.forEach((e) => {
    let a = e.getAttribute("data-category"),
      s = e.querySelector("img.lazy-load");
    if (t[a]) {
      let o = t[a];
      s.setAttribute("data-src", o);
    }
  });
}
function openPDF(e) {
  let t = pdfData[e]?.url,
    a = document.getElementById("pdfIframe"),
    s = document.getElementById("pdfOverlay"),
    o = document.body,
    l = document.querySelector(".scroll-top-container");
  if (t && a && s) {
    console.log("Setting iframe src to:", t),
      (a.src = t),
      (s.style.display = "flex"),
      (o.style.overflow = "hidden"),
      (l.style.display = "none"),
      console.log(t);
    let n = new URLSearchParams(window.location.search);
    n.set("pdf", e);
    let i = `${window.location.origin}${
      window.location.pathname
    }?${n.toString()}`;
    window.history.pushState({ path: i }, "", i),
      console.log("URL updated:", i);
  } else
    console.error("No PDF URL found for ID:", e),
      showToast("Sorry, File is not available");
}
function downloadPDfUrl(e) {
  if (!pdfData[e]) {
    console.error("Invalid fileId or pdfData not defined.");
    return;
  }
  let t = "true" === localStorage.getItem("isLoggedIn");
  if (!t) {
    let a = confirm(
      "Please log in to download the PDF. Do you want to log in?"
    );
    a && showLoginOverlay();
    return;
  }
  let s = pdfData[e].url.replace("/preview", "/edit");
  s
    ? (console.log("Opening modified PDF URL in a new tab:", s),
      window.open(s, "_blank"))
    : console.error("Failed to modify PDF URL.");
}
function closePDF() {
  let e = document.getElementById("pdfOverlay"),
    t = document.getElementById("pdfIframe"),
    a = document.body,
    s = document.querySelector(".scroll-top-container");
  e &&
    t &&
    ((e.style.display = "none"),
    (s.style.display = "block"),
    (t.src = ""),
    a && ((a.style.overflow = "visible"), console.log("close pdf")));
  let o = new URLSearchParams(window.location.search);
  o.delete("pdf");
  let l = window.location.origin + window.location.pathname,
    n = `${l}?${o.toString()}`;
  window.history.pushState({ path: n }, "", n);
}
function showToast(e) {
  let t = document.getElementById("toast-container");
  if (!t) {
    console.error("Toast container not found!");
    return;
  }
  let a = document.createElement("div");
  a.classList.add("toast");
  let s = document.createElement("span");
  s.classList.add("toast-message"), (s.textContent = e);
  let o = document.createElement("div");
  o.classList.add("progress-bar");
  let l = document.createElement("div");
  l.classList.add("progress-bar-fill"),
    o.appendChild(l),
    a.appendChild(s),
    a.appendChild(o),
    t.appendChild(a),
    a.classList.add("show");
  let n = 0,
    i = setInterval(() => {
      (n += 1),
        (l.style.width = `${n}%`),
        n >= 100 &&
          (clearInterval(i),
          a.classList.remove("show"),
          setTimeout(() => {
            t.removeChild(a);
          }, 300));
    }, 30);
}
function filterCards() {
  let e = document.querySelector(".search-bar"),
    t = document.getElementById("filterOptions"),
    a = document.getElementById("cardContainer"),
    s = document.getElementById("cardCount");
  if (!e || !t || !a || !s) {
    console.error("Search input, filter select, or card container not found!");
    return;
  }
  let o = e.value.toLowerCase(),
    l = t.value,
    n = a.getElementsByClassName("card"),
    i = 0;
  Array.from(n).forEach((e) => {
    let t = e.querySelector("h2").textContent.toLowerCase(),
      a = e.getAttribute("data-category"),
      s = t.includes(o);
    s && ("all" === l || a === l)
      ? ((e.style.display = "block"), i++)
      : (e.style.display = "none");
  }),
    (s.innerHTML = ` Results: ${i}`);
  let r = document.querySelector("#results"),
    d = r.querySelector("#no-results-message"),
    c = document.querySelectorAll(".search-text-drop");
  0 === i
    ? d &&
      ((d.style.display = "block"),
      (r.style.display = "block"),
      (c.style.display = "none"))
    : d && ((d.style.display = "none"), (r.style.display = "none"));
}
function lazyLoadInstance() {
  let e = document.querySelectorAll(".lazy-load"),
    t = new IntersectionObserver((e, t) => {
      e.forEach((e) => {
        if (e.isIntersecting) {
          let a = e.target;
          (a.src = a.dataset.src),
            a.classList.remove("lazy-load"),
            t.unobserve(a);
        }
      });
    });
  e.forEach((e) => {
    t.observe(e);
  });
}
document.addEventListener("DOMContentLoaded", () => {
  fetchAndStoreData();
  let e = document.getElementById("sortOptions");
  populateCards(e.value),
    document.body.addEventListener("click", (e) => {
      e.target.classList.contains("like-btn") && handleLike(e.target);
    }),
    e.addEventListener("change", (e) => {
      let t = e.target.value;
      "sort" !== t && populateCards(t);
    });
}),
  document.addEventListener("DOMContentLoaded", () => {
    let e = document.getElementById("mainFilterOptions"),
      t = document.getElementById("filterOptions"),
      a = document.getElementById("resetButton"),
      s = document.querySelectorAll(".card");
    if (!e || !t || !a) {
      console.error("One or more filter elements not found");
      return;
    }
    let o = {
      frontend: [
        { value: "html", text: "HTML & CSS" },
        { value: "javascript", text: "JavaScript" },
        { value: "react", text: "React JS" },
        { value: "angular", text: "Angular" },
      ],
      backend: [
        { value: "Nodejs", text: "Node.js" },
        { value: "java", text: "Java" },
        { value: "python", text: "Python" },
      ],
      database: [
        { value: "sql", text: "SQL" },
        { value: "mongodb", text: "MongoDB" },
        { value: "firebase", text: "Firebase" },
      ],
      devops: [
        { value: "docker", text: "Docker" },
        { value: "kubernetes", text: "Kubernetes" },
        { value: "jenkins", text: "Jenkins" },
      ],
      other: [
        { value: "dsa", text: "DSA" },
        { value: "git", text: "Git" },
        { value: "bash", text: "Bash" },
        { value: "sysdesign", text: "System Design" },
        { value: "testing", text: "Testing" },
        { value: "ai", text: "AI" },
      ],
      Artificial_Intelligence: [{ value: "ai", text: "AI" }],
    };
    function l(e = "select", t = "all") {
      s.forEach((a) => {
        let s = a.getAttribute("data-category"),
          o = a.getAttribute("data-subcategory") || s;
        a.style.display =
          ("select" === e || s === e) && ("all" === t || "all" === t || o === t)
            ? "block"
            : "none";
      });
    }
    function n(e) {
      (t.innerHTML = ""),
        t.appendChild(new Option("All Technologies", "all")),
        o[e]
          ? (o[e].forEach(({ value: e, text: a }) => {
              let s = new Option(a, e);
              t.appendChild(s);
            }),
            (t.style.display = "inline-block"),
            (a.style.display = "inline-block"))
          : ((t.style.display = "none"), (a.style.display = "none"));
    }
    function i(e, t) {
      let a = new URLSearchParams();
      "select" !== e && a.set("category", e),
        "all" !== t && a.set("subcategory", t);
      let s = `${window.location.pathname}?${a.toString()}`;
      window.history.pushState({ category: e, subcategory: t }, "", s),
        console.log("URL updated:", s);
    }
    function r() {
      let a = e.value;
      n(a), l(a, t.value), i(a, t.value);
    }
    function d() {
      let a = t.value;
      l(e.value, a), c(a), i(e.value, a);
    }
    function c(e) {
      let t = document.querySelector(".resultsCategory");
      t
        ? (t.textContent = "all" === e ? "All Technologies" : e)
        : console.warn("Results category element not found");
    }
    function u() {
      (e.value = "select"),
        (t.innerHTML = '<option value="all">All Technologies</option>'),
        (t.style.display = "none"),
        (a.style.display = "none"),
        l(),
        i("select", "all");
    }
    function p() {
      let a = new URLSearchParams(window.location.search),
        s = a.get("category") || "select",
        o = a.get("subcategory") || "all";
      (e.value = s), n(s), (t.value = o), l(s, o), c(o);
    }
    p(),
      e.addEventListener("change", r),
      t.addEventListener("change", d),
      a.addEventListener("click", u);
  }),
  document.addEventListener("DOMContentLoaded", updateNavbar),
  document.addEventListener("DOMContentLoaded", () => {
    populateCards(),
      document
        .querySelector(".search-bar")
        ?.addEventListener("input", filterCards),
      document
        .getElementById("filterOptions")
        ?.addEventListener("change", filterCards),
      document.getElementById("loadMoreBtn")?.addEventListener("click", () => {
        currentPage++, showCards();
      });
  }),
  document.addEventListener("DOMContentLoaded", function () {
    let e = document.querySelector(".search-bar"),
      t = document.getElementById("filterOptions"),
      a = document.getElementById("cardContainer"),
      s = document.getElementById("cardCount");
    function o() {
      var o;
      let l = e.value.toLowerCase(),
        n = t.value,
        i = a.getElementsByClassName("card"),
        r = 0;
      for (let d of i) {
        let c = d.textContent.toLowerCase(),
          u = d.getAttribute("data-category"),
          p = c.includes(l),
          g = "all" === n || u === n;
        p && g
          ? ((d.style.display = "block"), r++)
          : (d.style.display = "none");
      }
      (o = r), (s.textContent = ` Results : ${o}`);
    }
    e.addEventListener("input", o), t.addEventListener("change", o), o();
  }),
  document
    .querySelectorAll(".main-filter-options, .filter-options")
    .forEach((e) => {
      e.addEventListener("click", function () {
        this.classList.toggle("open");
      });
    });
const scrollToTopBtn = document.getElementById("scrollToTopBtn");
function updateNavbar() {
  let e = "true" === localStorage.getItem("isLoggedIn"),
    t = document.querySelector(".nav-link.login");
  if (e) {
    let a = localStorage.getItem("username");
    (t.textContent = `Hello 👤, ${a} `), t.classList.add("active");
  } else (t.textContent = "Login"), t.classList.remove("active");
}
function showLoginOverlay() {
  let e = "true" === localStorage.getItem("isLoggedIn");
  if (e) {
    let t = confirm("You are already logged in. Do you want to logout?");
    t &&
      (localStorage.removeItem("isLoggedIn"),
      localStorage.removeItem("username"),
      showNotification("You have successfully logged out.", "success"),
      updateNavbar());
    return;
  }
  if (!document.getElementById("loginOverlayParent")) {
    let a = document.createElement("div");
    (a.id = "loginOverlayParent"),
      (a.className = "overlay-parent"),
      (a.innerHTML = `
            <div id="loginOverlayParent" class="overlay-parent visible">
                <div class="overlay-container">
                    <div class="overlay">
                        <button class="close-btn" onclick="closeLoginOverlay()">
                            <i class="fa fa-window-close" aria-hidden="true"></i>
                        </button>
                        <div class="overlay-content">
                            <form id="loginForm" class="login-form" onsubmit="validateLogin(event)">
                                <h2>Login</h2>
                                <div class="input-group">
                                    <i class="fa fa-user input-icon"></i>
                                    <input type="text" id="username" placeholder="Username or Email" required="">
                                </div>
                                <div class="input-group">
                                    <i class="fa fa-lock input-icon"></i>
                                    <input type="password" id="password" placeholder="Password" required="">
                                </div>
                                <p id="loginErrorMessage" class="error-msg hidden"></p>
                                <button type="submit" class="btn-primary">Login</button>
                            </form>
                            <div class="admin-msg">
                                <h4>
                                    Please contact admin for download access 
                                    <i class="fa-solid fa-arrow-up-right-from-square"></i>
                                    <a href="https://vinaykumar1332.github.io/Hyper-portfolio/#contact"> Click here</a>
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `),
      document.body.appendChild(a),
      setTimeout(() => a.classList.add("visible"), 10);
  }
}
function closeLoginOverlay() {
  let e = document.getElementById("loginOverlayParent");
  e.classList.remove("visible"), setTimeout(() => e.remove(), 500);
}
function closeLoginOverlay() {
  let e = document.getElementById("loginOverlayParent");
  e && (e.classList.remove("visible"), setTimeout(() => e.remove(), 500));
}
function openLoginOverlay() {
  let e = document.getElementById("loginOverlayParent");
  e.classList.add("active");
}
async function validateLogin(e) {
  e.preventDefault();
  let t = document.getElementById("username").value.trim(),
    a = document.getElementById("password").value.trim(),
    s = document.getElementById("loginErrorMessage");
  try {
    let o = await fetch("../Json/loginData.json");
    if (!o.ok) throw Error("Unable to fetch user data.");
    let l = await o.json(),
      n = l.find((e) => e.username === t && e.password === a);
    n
      ? (localStorage.setItem("isLoggedIn", "true"),
        localStorage.setItem("username", n.username),
        updateNavbar(),
        s.classList.add("hidden"),
        showNotification("You have successfully logged in!", "success"),
        closeLoginOverlay())
      : showNotification(
          "Invalid username or password. Please try again.",
          "error"
        );
  } catch (i) {
    console.error("Error fetching or processing user data:", i),
      showNotification("An error occurred. Please try again later.", "error");
  }
}
function showNotification(e, t) {
  let a = document.querySelector(".overlay-container");
  if (!a) {
    console.error("Overlay container not found");
    return;
  }
  let s = document.createElement("div");
  s.classList.add("notification--login-overlay", t),
    (s.textContent = e),
    a.appendChild(s),
    s &&
      (setTimeout(() => {
        s.classList.add("show");
      }, 100),
      setTimeout(() => {
        s.classList.remove("show"),
          s &&
            setTimeout(() => {
              s.remove();
            }, 500);
      }, 3e3));
}
window.addEventListener("scroll", () => {
  scrollToTopBtn &&
    (window.scrollY > 300
      ? (scrollToTopBtn.style.display = "block")
      : (scrollToTopBtn.style.display = "none"));
}),
  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }),
  document.addEventListener("DOMContentLoaded", () => {
    let e = localStorage.getItem("cookieConsent");
    if (!e) {
      let t = `
        <div class="cookie-popup" id="cookiePopup">
            <p>We use cookies to improve your experience. By using our website, you agree to our cookie policy <i class="fa-solid fa-cookie"></i>.</p>
            <div class="button-group">
                <button class="accept" id="acceptCookies"><i class="fa-solid fa-check"></i> Accept</button>
                <button class="reject" id="rejectCookies"><i class="fa-solid fa-x"></i> Decline</button>
            </div>
        </div>
    `;
      document.body.insertAdjacentHTML("beforeend", t);
      let a = document.getElementById("acceptCookies"),
        s = document.getElementById("rejectCookies");
      a.addEventListener("click", () => o("accepted")),
        s.addEventListener("click", () => o("rejected"));
    }
    function o(e) {
      localStorage.setItem("cookieConsent", e), l();
    }
    function l() {
      let e = document.getElementById("cookiePopup");
      e && (e.style.display = "none");
    }
  });
function createFeedPopup() {
  let e = localStorage.getItem("feed_popup_closed");
  if (e) return;
  let p = document.createElement("div");
  (p.className = "feed-popup"),
    (p.innerHTML = `
          <div class="popup-content" onclick="window.location.href='../Pages/Blog.html'">
            <p>🔥 New Feeds Available! Click to Explore →</p>
          </div>
          <button class="popup-close" aria-label="Close Feed Popup">&times;</button>
        `),
    document.body.appendChild(p),
    p.querySelector(".popup-close").addEventListener("click", () => {
      p.remove(), localStorage.setItem("feed_popup_closed", "true");
    });
}
window.addEventListener("load", () => {
  setTimeout(createFeedPopup, 5e3);
});

